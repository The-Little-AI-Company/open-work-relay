const http = require("node:http");

const { loadRelayDashboardData } = require("./relay-store");

function createDashboardServer({ root }) {
  return http.createServer((request, response) => {
    const url = new URL(request.url, "http://127.0.0.1");

    if (url.pathname === "/data.json") {
      const data = loadRelayDashboardData(root);
      send(response, 200, "application/json; charset=utf-8", JSON.stringify(data, null, 2));
      return;
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      const data = loadRelayDashboardData(root);
      send(response, 200, "text/html; charset=utf-8", renderDashboardHtml(data));
      return;
    }

    send(response, 404, "text/plain; charset=utf-8", "Not found");
  });
}

function renderDashboardHtml(data) {
  const attentionRows = data.attention.length
    ? data.attention.map(renderTaskStrip).join("")
    : `<div class="empty">No hard stops. The relay can move.</div>`;

  const projectLinks = data.projects.length
    ? data.projects.map(renderProjectLink).join("")
    : `<div class="empty">No projects found yet.</div>`;

  const taskRows = data.tasks.length
    ? data.tasks.map(renderTaskRow).join("")
    : `<tr><td colspan="5">No active tasks found in this relay workspace.</td></tr>`;

  const receiptRows = data.receipts.length
    ? data.receipts.slice(0, 6).map(renderReceipt).join("")
    : `<div class="receipt"><strong>No receipts yet</strong><small>Run a relay task to create proof.</small></div>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Open Work Relay Dashboard</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #151914;
        --panel: #20261f;
        --panel-2: #293129;
        --ink: #eff5ef;
        --muted: #a8b6aa;
        --line: #4d5a4e;
        --line-strong: #7d8c7f;
        --accent: #86d8b2;
        --accent-2: #8fb6e8;
        --green: #86d8a4;
        --amber: #deb15f;
        --red: #ef806f;
        --green-soft: #263c31;
        --amber-soft: #443623;
        --red-soft: #4b2a27;
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-width: 320px;
        background: var(--bg);
        color: var(--ink);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        letter-spacing: 0;
      }

      .shell {
        min-height: 100vh;
        padding: 22px;
      }

      .frame {
        max-width: 1480px;
        margin: 0 auto;
      }

      .topbar {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 18px;
        align-items: end;
        border-bottom: 2px solid var(--ink);
        padding-bottom: 14px;
        margin-bottom: 14px;
      }

      .eyebrow {
        margin: 0 0 5px;
        color: var(--muted);
        font-size: 12px;
        font-weight: 850;
        text-transform: uppercase;
      }

      h1, h2, h3, p { margin-top: 0; }
      h1 { margin-bottom: 0; font-size: clamp(28px, 3vw, 43px); line-height: 1; }
      h2 { margin-bottom: 0; font-size: 17px; line-height: 1.2; }
      h3 { margin-bottom: 7px; font-size: 14px; }

      .button {
        min-height: 38px;
        border: 1px solid var(--line-strong);
        border-radius: 4px;
        background: var(--panel);
        color: var(--ink);
        padding: 8px 11px;
      }

      .button.primary {
        border-color: var(--accent);
        background: var(--accent);
        color: var(--bg);
        font-weight: 800;
      }

      .top-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 8px;
      }

      .summary-line {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        border: 1px solid var(--line);
        background: var(--panel);
        margin-bottom: 10px;
      }

      .summary-item {
        min-height: 74px;
        border-left: 1px solid var(--line);
        padding: 12px;
      }

      .summary-item:first-child { border-left: 0; }
      .summary-item strong { display: block; font-size: 27px; line-height: 1; }
      .summary-item span { display: block; margin-top: 5px; color: var(--muted); font-size: 13px; }
      .summary-item.red { box-shadow: inset 5px 0 0 var(--red); }
      .summary-item.amber { box-shadow: inset 5px 0 0 var(--amber); }
      .summary-item.green { box-shadow: inset 5px 0 0 var(--green); }
      .summary-item.blue { box-shadow: inset 5px 0 0 var(--accent-2); }

      .layout {
        display: grid;
        grid-template-columns: 260px minmax(0, 1fr) 360px;
        gap: 10px;
      }

      .panel {
        border: 1px solid var(--line);
        background: var(--panel);
      }

      .panel-header {
        display: flex;
        min-height: 48px;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        border-bottom: 1px solid var(--line);
        padding: 10px 12px;
      }

      .panel-body { padding: 12px; }
      .rail-title { border-bottom: 1px solid var(--line); padding: 11px 12px; }

      .project-link {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 10px;
        align-items: center;
        border-bottom: 1px solid var(--line);
        color: var(--ink);
        padding: 11px 12px;
        text-decoration: none;
      }

      .project-link:first-of-type {
        background: var(--ink);
        color: var(--bg);
      }

      .project-link small, .muted, .receipt small, .task small { color: var(--muted); }
      .project-link:first-of-type small { color: rgba(21, 25, 20, 0.72); }

      .counter {
        min-width: 30px;
        border: 1px solid currentColor;
        border-radius: 999px;
        padding: 2px 8px;
        text-align: center;
        font-size: 12px;
        font-weight: 850;
      }

      table { width: 100%; border-collapse: collapse; font-size: 14px; }
      th, td { border-bottom: 1px solid var(--line); padding: 10px; text-align: left; vertical-align: top; }
      th { color: var(--muted); font-size: 12px; font-weight: 850; text-transform: uppercase; }

      .task-title { font-weight: 850; }

      .pill {
        display: inline-flex;
        align-items: center;
        min-height: 24px;
        border: 1px solid currentColor;
        border-radius: 999px;
        padding: 2px 8px;
        font-size: 12px;
        font-weight: 850;
        white-space: nowrap;
      }

      .pill.red { background: var(--red-soft); color: var(--red); }
      .pill.amber { background: var(--amber-soft); color: var(--amber); }
      .pill.green { background: var(--green-soft); color: var(--green); }
      .pill.blue { background: #263247; color: var(--accent-2); }

      .task-list { display: grid; }

      .task {
        display: grid;
        grid-template-columns: 86px minmax(0, 1fr) auto;
        gap: 10px;
        align-items: start;
        border-bottom: 1px solid var(--line);
        padding: 11px 12px;
      }

      .task:last-child { border-bottom: 0; }

      .receipt {
        border-top: 1px solid var(--line);
        padding: 10px 0;
      }

      .receipt:first-child {
        border-top: 0;
        padding-top: 0;
      }

      .receipt strong,
      .receipt small {
        display: block;
      }

      .empty {
        color: var(--muted);
        padding: 12px;
      }

      @media (max-width: 1080px) {
        .layout { grid-template-columns: 1fr; }
        .summary-line { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .summary-item:nth-child(odd) { border-left: 0; }
      }

      @media (max-width: 680px) {
        .shell { padding: 14px; }
        .topbar, .task { grid-template-columns: 1fr; }
        .top-actions { justify-content: flex-start; }
        .summary-line { grid-template-columns: 1fr; }
        .summary-item { border-left: 0; border-top: 1px solid var(--line); }
        .summary-item:first-child { border-top: 0; }
        th:nth-child(4), td:nth-child(4), th:nth-child(5), td:nth-child(5) { display: none; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <div class="frame">
        <header class="topbar">
          <div>
            <p class="eyebrow">Open Work Relay / local dashboard</p>
            <h1>Ink Console</h1>
          </div>
          <div class="top-actions" aria-label="Dashboard actions">
            <button class="button">Relay root</button>
            <button class="button">Refresh</button>
            <button class="button primary">Needs Jeff</button>
          </div>
        </header>

        <section class="summary-line" aria-label="Relay summary">
          <div class="summary-item red"><strong>${data.summary.needsJeff}</strong><span>needs Jeff</span></div>
          <div class="summary-item amber"><strong>${data.summary.review}</strong><span>review</span></div>
          <div class="summary-item green"><strong>${data.summary.ready}</strong><span>ready</span></div>
          <div class="summary-item blue"><strong>${data.summary.receipts}</strong><span>receipts</span></div>
        </section>

        <section class="layout">
          <nav class="panel" aria-label="Projects">
            <div class="rail-title">
              <p class="eyebrow">Workspace</p>
              <h2>${escapeHtml(data.root)}</h2>
            </div>
            ${projectLinks}
          </nav>

          <section class="panel">
            <div class="panel-header">
              <h2>Work queue</h2>
              <span class="pill green">${data.summary.totalTasks} active</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Work</th>
                  <th>Signal</th>
                  <th>Project</th>
                  <th>Next actor</th>
                </tr>
              </thead>
              <tbody>${taskRows}</tbody>
            </table>
          </section>

          <aside class="panel">
            <div class="panel-header">
              <h2>Spotlight</h2>
              <span class="pill red">${data.summary.needsJeff} needs Jeff</span>
            </div>
            <div class="task-list">${attentionRows}</div>
            <div class="panel-header">
              <h2>Proof trail</h2>
              <span class="pill blue">${data.summary.receipts}</span>
            </div>
            <div class="panel-body">${receiptRows}</div>
          </aside>
        </section>
      </div>
    </main>
  </body>
</html>`;
}

function renderProjectLink(project) {
  return `<a class="project-link" href="#">
  <span>${escapeHtml(project.name)}<br /><small>${project.needsJeff} needs Jeff / ${project.ready} ready</small></span>
  <strong class="counter">${project.total}</strong>
</a>`;
}

function renderTaskRow(task) {
  return `<tr>
  <td>${escapeHtml(task.id)}</td>
  <td><span class="task-title">${escapeHtml(task.title)}</span><br /><small>${escapeHtml(task.excerpt)}</small></td>
  <td>${renderStatusPill(task)}</td>
  <td>${escapeHtml(task.project)}</td>
  <td>${escapeHtml(task.nextActor)}</td>
</tr>`;
}

function renderTaskStrip(task) {
  return `<div class="task">
  <strong>${escapeHtml(task.id)}</strong>
  <div><span class="task-title">${escapeHtml(task.title)}</span><br /><small>${escapeHtml(task.project)} / ${escapeHtml(task.nextActor)}</small></div>
  ${renderStatusPill(task)}
</div>`;
}

function renderReceipt(receipt) {
  const title = receipt.taskId || receipt.id;
  const detail = [receipt.actor, receipt.stopReason].filter(Boolean).join(" - ");
  return `<div class="receipt"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(detail || "Receipt recorded")}</small></div>`;
}

function renderStatusPill(task) {
  if (task.needsJeff) return `<span class="pill red">needs Jeff</span>`;
  if (task.status === "review") return `<span class="pill amber">review</span>`;
  if (task.status === "ready") return `<span class="pill green">ready</span>`;
  if (task.status === "working" || task.status === "claimed") return `<span class="pill blue">${escapeHtml(task.status)}</span>`;
  return `<span class="pill blue">${escapeHtml(task.status)}</span>`;
}

function send(response, status, contentType, body) {
  response.writeHead(status, {
    "content-type": contentType,
    "cache-control": "no-store",
  });
  response.end(body);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = {
  createDashboardServer,
  renderDashboardHtml,
};
