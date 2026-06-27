const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const HUMAN_ACTOR_PATTERN = /\b(jeff|human|owner|user)\b/i;
const NEEDS_INPUT_STATUSES = new Set(["needs-input", "blocked"]);
const REVIEW_STATUSES = new Set(["review"]);
const READY_STATUSES = new Set(["ready"]);
const DONE_STATUSES = new Set(["done"]);

function defaultRelayRoot() {
  return process.env.OPEN_WORK_RELAY_HOME || path.join(os.homedir(), ".open-work-relay");
}

function ensureRelayWorkspace(root = defaultRelayRoot()) {
  for (const folder of ["tasks", "receipts", "done"]) {
    fs.mkdirSync(path.join(root, folder), { recursive: true });
  }
}

function loadRelayDashboardData(root = defaultRelayRoot()) {
  const tasks = readTaskRecords(path.join(root, "tasks"));
  const doneTasks = readTaskRecords(path.join(root, "done")).map((task) => ({
    ...task,
    status: task.status === "unknown" ? "done" : task.status,
  }));
  const activeTasks = tasks.filter((task) => !DONE_STATUSES.has(task.status));
  const receipts = readReceiptRecords(path.join(root, "receipts"));
  const projects = summarizeProjects(activeTasks);
  const attention = activeTasks
    .filter((task) => task.needsJeff || REVIEW_STATUSES.has(task.status))
    .sort(compareTasksByAttention);

  return {
    root,
    summary: {
      needsJeff: activeTasks.filter((task) => task.needsJeff).length,
      review: activeTasks.filter((task) => REVIEW_STATUSES.has(task.status)).length,
      ready: activeTasks.filter((task) => READY_STATUSES.has(task.status)).length,
      receipts: receipts.length,
      totalTasks: activeTasks.length,
    },
    projects,
    tasks: activeTasks.sort(compareTasksByAttention),
    doneTasks,
    receipts,
    attention,
  };
}

function readTaskRecords(folder) {
  return readMarkdownFiles(folder).map(({ filePath, content }) => {
    const parsed = parseMarkdownRecord(content);
    const frontMatter = parsed.frontMatter;
    const status = normalizeStatus(frontMatter.status);
    const nextActor = stringValue(frontMatter.next_actor || frontMatter.nextActor || "");
    const title = stringValue(frontMatter.title || parsed.title || path.basename(filePath, ".md"));
    const id = stringValue(frontMatter.id || path.basename(filePath, ".md"));

    return {
      id,
      title,
      status,
      project: stringValue(frontMatter.project || "Unassigned"),
      nextActor: nextActor || "Unassigned",
      updated: stringValue(frontMatter.updated || frontMatter.created || ""),
      filePath,
      excerpt: firstMeaningfulParagraph(parsed.body),
      needsJeff: NEEDS_INPUT_STATUSES.has(status) || HUMAN_ACTOR_PATTERN.test(nextActor),
    };
  });
}

function readReceiptRecords(folder) {
  return readMarkdownFiles(folder)
    .map(({ filePath, content }) => {
      const parsed = parseMarkdownRecord(content);
      const frontMatter = parsed.frontMatter;
      const id = stringValue(frontMatter.receipt_id || frontMatter.id || path.basename(filePath, ".md"));

      return {
        id,
        taskId: stringValue(frontMatter.task_id || frontMatter.taskId || ""),
        actor: stringValue(frontMatter.actor || ""),
        statusFrom: stringValue(frontMatter.status_from || ""),
        statusTo: stringValue(frontMatter.status_to || ""),
        created: stringValue(frontMatter.created || ""),
        filePath,
        stopReason: extractSection(parsed.body, "Stop Reason") || firstMeaningfulParagraph(parsed.body),
      };
    })
    .sort((a, b) => b.created.localeCompare(a.created));
}

function summarizeProjects(tasks) {
  const projects = new Map();

  for (const task of tasks) {
    const current =
      projects.get(task.project) ||
      {
        name: task.project,
        total: 0,
        needsJeff: 0,
        review: 0,
        ready: 0,
        working: 0,
        latestReceipt: "",
      };

    current.total += 1;
    if (task.needsJeff) current.needsJeff += 1;
    if (REVIEW_STATUSES.has(task.status)) current.review += 1;
    if (READY_STATUSES.has(task.status)) current.ready += 1;
    if (task.status === "working" || task.status === "claimed") current.working += 1;
    projects.set(task.project, current);
  }

  return [...projects.values()].sort((a, b) => {
    return (
      b.needsJeff - a.needsJeff ||
      b.review - a.review ||
      b.ready - a.ready ||
      a.name.localeCompare(b.name)
    );
  });
}

function readMarkdownFiles(folder) {
  if (!fs.existsSync(folder)) {
    return [];
  }

  return fs
    .readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => {
      const filePath = path.join(folder, entry.name);
      return {
        filePath,
        content: fs.readFileSync(filePath, "utf8"),
      };
    });
}

function parseMarkdownRecord(content) {
  const frontMatter = {};
  let body = content;

  if (content.startsWith("---")) {
    const close = content.indexOf("\n---", 3);
    if (close !== -1) {
      const frontMatterText = content.slice(3, close).trim();
      body = content.slice(close + 4).trimStart();

      for (const line of frontMatterText.split(/\r?\n/)) {
        const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (!match) continue;
        frontMatter[match[1]] = parseScalar(match[2]);
      }
    }
  }

  return {
    frontMatter,
    body,
    title: extractTitle(body),
  };
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }
  return stripQuotes(trimmed);
}

function stripQuotes(value) {
  return value.replace(/^["']|["']$/g, "");
}

function extractTitle(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function extractSection(body, heading) {
  const lines = body.split(/\r?\n/);
  const headingPattern = new RegExp(`^##\\s+${escapeRegex(heading)}\\s*$`, "i");
  const start = lines.findIndex((line) => headingPattern.test(line.trim()));

  if (start === -1) {
    return "";
  }

  const sectionLines = [];
  for (const line of lines.slice(start + 1)) {
    if (/^##\s+/.test(line.trim())) {
      break;
    }
    sectionLines.push(line);
  }

  return firstMeaningfulParagraph(sectionLines.join("\n"));
}

function firstMeaningfulParagraph(body) {
  return (
    body
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && !line.startsWith("---"))[0] || ""
  );
}

function normalizeStatus(status) {
  return stringValue(status).trim().toLowerCase() || "unknown";
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stringValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value == null ? "" : String(value);
}

function compareTasksByAttention(a, b) {
  return taskRank(a) - taskRank(b) || a.project.localeCompare(b.project) || a.id.localeCompare(b.id);
}

function taskRank(task) {
  if (task.needsJeff) return 0;
  if (REVIEW_STATUSES.has(task.status)) return 1;
  if (task.status === "working" || task.status === "claimed") return 2;
  if (READY_STATUSES.has(task.status)) return 3;
  return 4;
}

module.exports = {
  defaultRelayRoot,
  ensureRelayWorkspace,
  loadRelayDashboardData,
  parseMarkdownRecord,
};
