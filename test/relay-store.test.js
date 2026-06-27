const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const { loadRelayDashboardData } = require("../src/relay-store");

test("loads project, task, receipt, and attention summaries from a relay workspace", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "owr-store-"));
  fs.mkdirSync(path.join(root, "tasks"), { recursive: true });
  fs.mkdirSync(path.join(root, "receipts"), { recursive: true });

  fs.writeFileSync(
    path.join(root, "tasks", "task-001.md"),
    [
      "---",
      "id: TASK-001",
      "title: Choose provider boundary",
      "status: needs-input",
      "project: Obscura",
      "next_actor: Jeff",
      "updated: 2026-06-26",
      "---",
      "",
      "# Choose provider boundary",
      "",
      "## 1. Outcome",
      "",
      "Decide whether the provider route is allowed.",
      "",
      "## 6. Stop Rules / Human Gates",
      "",
      "Stop before spend or product commitment.",
    ].join("\n"),
  );

  fs.writeFileSync(
    path.join(root, "tasks", "task-002.md"),
    [
      "---",
      "id: TASK-002",
      "title: Build local dashboard",
      "status: ready",
      "project: Open Work Relay",
      "next_actor: Codex",
      "updated: 2026-06-26",
      "---",
      "",
      "# Build local dashboard",
      "",
      "## 1. Outcome",
      "",
      "A local Ink Console dashboard can open from the CLI.",
    ].join("\n"),
  );

  fs.writeFileSync(
    path.join(root, "receipts", "task-001-receipt.md"),
    [
      "---",
      "receipt_id: RECEIPT-001",
      "task_id: TASK-001",
      "actor: Claude",
      "status_from: working",
      "status_to: needs-input",
      "created: 2026-06-26",
      "---",
      "",
      "# Receipt: TASK-001",
      "",
      "## Stop Reason",
      "",
      "Provider boundary changes future spend and workflow shape.",
    ].join("\n"),
  );

  const data = loadRelayDashboardData(root);

  assert.equal(data.root, root);
  assert.deepEqual(data.summary, {
    needsJeff: 1,
    review: 0,
    ready: 1,
    receipts: 1,
    totalTasks: 2,
  });
  assert.deepEqual(
    data.projects.map((project) => [project.name, project.total, project.needsJeff, project.ready]),
    [
      ["Obscura", 1, 1, 0],
      ["Open Work Relay", 1, 0, 1],
    ],
  );
  assert.equal(data.attention[0].id, "TASK-001");
  assert.equal(data.receipts[0].taskId, "TASK-001");
  assert.equal(data.receipts[0].stopReason, "Provider boundary changes future spend and workflow shape.");
});
