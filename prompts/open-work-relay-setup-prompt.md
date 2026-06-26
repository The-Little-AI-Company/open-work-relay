# Open Work Relay Setup Prompt

Use this prompt to set up a queue and handoff protocol for a specific person, team, project, or household.

```text
You are setting up Open Work Relay for me.

Open Work Relay is a free/open handoff protocol. Its job is to help humans and AI agents move work through a shared queue without losing:
- source material,
- decisions already made,
- allowed actions,
- stop rules,
- ownership,
- status,
- done evidence.

Do not assume a specific queue tool. Ask me where my backlog already lives and configure the relay around that.

Supported queue choices:
1. Plain Markdown folder
2. GitHub Issues
3. Trello
4. Linear
5. Notion
6. Other, if you can explain how agents can read/write it through a CLI, MCP server, API, or filesystem

First, ask me these setup questions one at a time:

1. What is the primary queue for this relay?
2. Do you have secondary backlog sources that should be scanned or linked?
3. Which agents or tools will participate?
4. For each agent, what can it read?
5. For each agent, what can it edit or create?
6. What must agents never touch?
7. Where should receipts be left?
8. What counts as done?
9. When should an agent stop and ask for human input?
10. Is this relay for solo work, household work, team work, client work, or another context?
11. What kinds of work should this relay handle? Start with transcript-grounded examples like client call follow-up, support, and schedule changes. Then add user-specific families such as planning, production work, branding/content, or custom only if useful.

After setup, produce:

1. Queue configuration
   - primary queue,
   - secondary sources,
   - done/archive location,
   - receipt location,
   - required labels/statuses.

2. The task schema
   Every task must include:
   - Outcome
   - Owner / next actor
   - Source material
   - Context / decisions so far
   - Allowed actions
   - Stop rules / human gates
   - Done evidence / receipt

   Optional metadata:
   - priority,
   - deadline,
   - project,
   - tags,
   - source queue,
   - external issue URL or ID,
   - dependencies,
   - blocked reason.

3. The state machine
   Use these statuses unless the user's queue requires equivalent native names:
   - ready
   - claimed
   - working
   - needs-input
   - review
   - done
   - parked

4. Workflow families
   Propose reusable workflows for the user's real work.
   Each workflow must include:
   - trigger,
   - inputs,
   - steps,
   - allowed autonomous actions,
   - human gates,
   - stop rules,
   - done evidence,
   - receipt requirements.

   Transcript-grounded families to consider first:
   - client call / follow-up,
   - support,
   - schedule / pickup change.

   Open-kit extension families to consider only if useful:
   - planning,
   - production work,
   - branding/content,
   - custom.

   Do not force every job into the same workflow.

5. The AGENTS.md protocol block
   It must tell participating agents:
   - what to read,
   - what to edit,
   - what not to touch,
   - how to classify the workflow family,
   - how to propose a workflow,
   - how to claim work,
   - how to avoid double work,
   - when to stop,
   - how to ask a blocking question,
   - what evidence to leave,
   - how to hand off,
   - how to land the plane cleanly.

6. A smoke test
   Create or describe a task called "Say hello from the relay."
   The task passes when:
   - an agent can claim it,
   - the queue shows it moved to working,
   - the agent leaves a short output,
   - the agent leaves a receipt,
   - the task moves to done,
   - another person or agent can understand what happened without reading a chat transcript.

Rules:
- Do not invent queue access that does not exist.
- Do not require the user to switch tools unless their current tool cannot support a readable/writable queue.
- Do not hide the core protocol behind a paywall.
- Do not send messages, publish, delete, merge, or make irreversible changes without explicit permission.
- If the next step is blocked, leave the exact blocking question in the task and set status to needs-input.
- If work finishes, leave a receipt before stopping.
- Whenever you stop, show the stop reason, what was completed, what was not done, what is needed next, and the next actor.
```
