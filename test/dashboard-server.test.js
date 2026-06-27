const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const { createDashboardServer } = require("../src/dashboard-server");

test("serves the Ink Console dashboard with relay task data", async (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "owr-dashboard-"));
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
      "Resolve provider scope before spend.",
    ].join("\n"),
  );

  const server = createDashboardServer({ root });
  t.after(() => server.close());

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();

  const response = await fetch(`http://127.0.0.1:${port}/`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Ink Console/);
  assert.match(html, /Obscura/);
  assert.match(html, /Choose provider boundary/);
  assert.match(html, /needs Jeff/i);
});
