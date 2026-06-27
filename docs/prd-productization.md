# PRD: Agent Relay Productization

Version: 0.1.0
Status: draft
Created: 2026-06-26
Owner: Jeff

## 1. Problem

AI users already work across multiple agents (Claude, Codex, ChatGPT, browser agents) and multiple tools. The weak point is not the model — it is the handoff. Humans become the copy-paste layer between agents, losing source material, decisions, limits, and evidence at every transition.

Agent Relay solves this by turning handoffs into visible task records that carry source, state, limits, ownership, and receipts through a shared queue.

The kit exists today as a starter pack plus first local product slice (spec, CLI, dashboard, templates, adapters, workflow examples, smoke test). This PRD defines the path from starter kit to a useful product.

## 2. Target Users

### Primary

- **Solo builders and indie hackers** who use 2+ AI agents and lose context between them.
- **Small teams (2-10 people)** who mix human and AI work and need a shared queue that both can read/write.
- **Consultants and agencies** who hand work between AI drafting, human review, and client delivery.

### Secondary

- **Open-source maintainers** who want agent-friendly issue queues.
- **Households** managing logistics (schedules, errands, appointments) with AI assistance.
- **Vertical markets** (legal intake, real-estate transactions, support teams) that need structured handoff patterns.

## 3. Current State (v0.1.0)

What exists:

- Formal specification (`docs/specification.md`)
- Setup prompt that interviews the user and emits a configured relay (`prompts/agent-relay-setup-prompt.md`)
- `AGENTS.md` protocol block
- Templates: task, receipt, workflow, queue
- Adapters: Markdown folder, GitHub Issues, Trello, Linear, Notion
- 5 workflow examples: client follow-up, support, schedule change, planning, branding
- Smoke test (happy path only)
- Content drafts for blog, X, LinkedIn, Substack
- Publishing plan with canonical URLs

What is missing (gaps):

1. **Onboarding friction.** A user must read the README, find the setup prompt, paste it, answer 11 questions, pick a queue, and manually wire `AGENTS.md`. Too many steps for a product.
2. **No automation.** The protocol is carried entirely by agent discipline. No CLI, daemon, or watcher enforces the state machine.
3. **No validation layer.** Nothing checks that tasks have all seven parts, that receipts match tasks, that status transitions are legal, or that `needs-input` tasks contain a blocking question.
4. **No dashboard or visibility.** No personal project view shows what is claimed, blocked, done, stale, or in-flight.
5. **No packaged starter.** The markdown-folder adapter is described but not scaffolded as a copy-paste-ready project.
6. **No multi-agent coordination.** No locking, heartbeat, or stale-claim recovery. Two agents can grab the same task.
7. **Support link is a TODO.** `README.md` still says "Support link: TODO."

## 4. Product Vision

**The core stays free and open (MIT). The product is the simplest useful layer for continuation: automation, validation, visibility, and coordination.**

Product boundary correction: Agent Relay should not drop handoff prompts, planning documents, or session handoff files into normal project docs. By default, relay state lives outside project repos in a user-level relay workspace, with records linked to the projects they coordinate. A project should only receive local relay files when the user explicitly opts into a project-local `work-relay/` folder. Product planning artifacts stay outside downstream projects.

The first real product surface is a personal dashboard for the user's projects. It should make the user's active relay work visible across projects without turning every repo into a paperwork dump.

Chosen dashboard direction: Ink Console. The dashboard should feel like a dense local operations console: dark working surface, strong status signals, project rail, work queue, human-attention spotlight, and proof trail.

Named install correction: users install a relay workspace with their own name and chosen folder. The product can be distributed as `npx @the-little-ai-company/agent-relay init "Client Ops Relay" --root ./client-ops-relay`; the generated dashboard should show the relay's configured name rather than hard-coding "Agent Relay" as the workspace identity.

Naming correction: Agent Relay is the only public name. The unscoped npm package name `agent-relay` is already taken, so the publishable package name is `@the-little-ai-company/agent-relay` while the installed command is still `agent-relay`.

Open-core shape:

- **Free / open:** spec, templates, adapters, setup prompt, markdown-folder adapter, CLI core, local personal dashboard.
- **Paid tier (subscription):** hosted sync, multi-agent coordination, receipt sync to GitHub/Linear/Notion, team settings, alerts.
- **Paid packs:** vertical workflow templates for specific industries.
- **Services:** paid setup and onboarding for teams.

Irreducible product shape:

- named relay workspace,
- task records,
- receipt records,
- CLI,
- local dashboard.

Agent Relay should reduce agent context, not increase it. Agents should resume from task records, latest relevant receipts, and linked sources instead of reading whole chats or generated handoff documents.

## 5. Product Phases

### Phase 1: Make the kit copy-paste usable

Goal: a new user goes from zero to a working relay folder in one command.

Requirements:

- P1-1: A one-command scaffolder (`npx @the-little-ai-company/agent-relay init "Relay Name" --root <folder>` or equivalent) that creates a ready-to-use named relay workspace at the folder the user chooses. If `--root` is omitted, it creates a named folder under the user-level relay home. It may offer an explicit `--local` option later to create `work-relay/tasks/`, `work-relay/receipts/`, and `work-relay/done/` inside the current project, but local project files are opt-in. It must not copy handoff prompts, PRDs, planning docs, or session handoff files into the target project.
- P1-2: Fill in the support link (GitHub Sponsors, Buy Me a Coffee, or Stripe).
- P1-3: Add a second smoke-test task that exercises a blocked path (agent hits a stop rule, leaves a `needs-input` receipt) so people see the full loop.
- P1-4: Write a quickstart that is shorter than the current README (3 steps max to first running task).

Success criteria:

- A non-technical user can run one command and have a working relay folder.
- Both smoke tests (happy path + blocked path) pass without private chat context.

### Phase 2: Thin CLI that validates and inspects

Goal: the relay feels like a system, not a document.

Requirements:

- P2-1: `agent-relay status` — list tasks by status, flag stale claims, show blocked tasks and their blocking questions.
- P2-2: `agent-relay validate` — check every task has all seven parts, every receipt matches a task, every status transition is legal, every `needs-input` task has a blocking question.
- P2-3: `agent-relay new` — scaffold a task from the template with front matter pre-filled (ID auto-increment, dates, status `ready`).
- P2-4: `agent-relay receipt` — scaffold a receipt linked to a task.
- P2-5: `agent-relay claim <task-id>` — mark a task claimed with actor name and timestamp.
- P2-6: `agent-relay done <task-id>` — move a task to done, require a receipt to exist first.
- P2-7: CLI works on markdown folder as the universal layer; queue-specific adapters (GitHub, Linear) plug in via a provider interface.

Success criteria:

- `validate` catches a task missing the outcome section.
- `validate` catches a receipt with no matching task.
- `validate` catches an illegal status transition (e.g., `ready` directly to `done`).
- `status` shows a stale claim (claimed > 24h with no receipt).

### Phase 3: Multi-agent guardrails

Goal: two agents do not collide, and stale work surfaces automatically.

Requirements:

- P3-1: Stale-claim detection — a task `claimed` for > N hours (configurable, default 24h) with no receipt gets flagged and optionally re-opened.
- P3-2: Claim lock via front-matter heartbeat — `claimed_at` timestamp plus `heartbeat_at` that agents update while working.
- P3-3: `agent-relay health` — relay health check that surfaces: tasks stuck in `working` with no recent receipt, tasks in `needs-input` with no blocking question, stale claims, orphaned receipts.
- P3-4: Optional claim file (`.relay/locks/`) for environments where front-matter race conditions are a concern.

Success criteria:

- Two agents attempting to claim the same task: second agent gets a clear "already claimed by X" message.
- A task claimed 48h ago with no receipt appears in `health` output as stale.
- A `needs-input` task with no blocking question appears in `health` output.

### Phase 4: Hosted sync and team dashboard (the subscription surface)

Goal: hosted visibility and coordination across any queue type, from a browser, after the local personal dashboard proves the loop.

Requirements:

- P4-1: Hosted dashboard reads any connected queue (user relay workspace, project-local markdown folder, GitHub Issues, Linear) and renders a kanban view by status.
- P4-2: Blocked-task alerts — surface tasks in `needs-input` with their blocking questions.
- P4-3: Receipt timeline — show the receipt trail for any task.
- P4-4: Agent activity — show which agents claimed/completed/stopped what, and when.
- P4-5: Receipt sync — post receipts back to the source queue (GitHub comment, Linear issue update, Notion page append).
- P4-6: Team settings — who can claim, who must approve, per-workflow stop rules.
- P4-7: Alerts — stale claims, blocked tasks, tasks approaching deadlines.

Success criteria:

- A user can connect project relays and see all active work in one dashboard.
- A team can connect a GitHub repo and see all relay tasks in a shared dashboard.
- A receipt created in the dashboard syncs back as a GitHub comment.
- A blocked task triggers an alert without manual checking.

### Phase 5: Marketplace / vertical packs

Goal: buyers in specific industries get pre-built workflows instead of authoring from scratch.

Requirements:

- P5-1: A pack format — a bundle of workflow templates, task templates, adapter configs, and an `AGENTS.md` block tailored to a vertical.
- P5-2: First packs: legal intake, real-estate transaction, agency client onboarding, support team triage, household logistics.
- P5-3: Pack install command — `agent-relay install pack <name>` drops the pack into the relay folder.
- P5-4: Pack listing on the hosted dashboard or a simple registry.

Success criteria:

- A legal team can install the legal-intake pack and have a working relay with legal-specific workflows in under 5 minutes.
- A pack can be authored by a third party and installed via the same mechanism.

## 6. Business Model

| Layer | Price | What you get |
|---|---|---|
| Core method (spec, templates, adapters, CLI core) | Free / MIT | The full relay method, usable on any queue |
| Local personal dashboard | Free / MIT | Personal project visibility over the user's relay workspace |
| Hosted sync + team coordination | Subscription (TBD pricing) | Cloud sync, team settings, alerts, external queue sync |
| Vertical workflow packs | Paid per pack or bundle | Pre-built workflows for specific industries |
| Setup and onboarding services | One-time fee per engagement | White-glove relay setup for a team |

The core is free because useful AI knowledge should travel. The product is convenience, visibility, and coordination.

## 7. Non-Goals (for now)

- Not building a new project-management tool. The relay uses existing queues.
- Not replacing human judgment. The protocol explicitly routes decisions to people.
- Not a hosted AI agent. The relay coordinates agents that already exist; it does not run them.
- Not a paywall on the core method. The spec, templates, and adapters remain free forever.
- Not filling projects with handoff documents. The relay's state belongs in the selected queue, not as stray planning or handoff docs in an app repo.

## 8. Open Questions

- OQ-1: Resolved for the first product slice: Node.js CLI, because `npx` is the lowest-friction route to one-command setup.
- OQ-2: Resolved for the first product slice: default named installs to `~/.agent-relay/<relay-slug>`, with `AGENT_RELAY_HOME` and `--root` overrides.
- OQ-3: What is the pricing model for the subscription tier? (Per-seat, per-team, flat?)
- OQ-4: Should the CLI support `--json` output for agent consumption, so agents can self-check relay state programmatically?
- OQ-5: Should there be an `agent-relay daemon` that watches the queue and auto-flags stale claims in real time, or is the CLI poll model sufficient?

## 9. Technical Assumptions

- The CLI is a single binary or script with no heavy runtime dependencies.
- The default markdown-folder queue lives in a named user-level relay workspace outside project repos; project-local `work-relay/` folders are opt-in.
- The markdown-folder queue is the universal layer; all other queue types are adapters on top.
- Task and receipt records are user/work queue data, not product-planning documents. They should live under the configured queue root unless an external queue adapter owns them.
- The local personal dashboard reads queue state through the same adapter interface as the CLI.
- The hosted dashboard is a later web app that syncs or reads queue state through the same adapter interface.
- Receipts are the source of truth for "what happened"; task status is derived from the latest receipt.

## 10. Success Metrics

| Metric | Phase 1 target | Phase 4 target |
|---|---|---|
| Time from install to first task | < 5 minutes | < 2 minutes |
| Smoke test pass rate (no chat context) | 100% | 100% |
| GitHub stars | 500 | 5,000 |
| Paying teams | — | 50 |
| Monthly active relays | 100 | 1,000 |
