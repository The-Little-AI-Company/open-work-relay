# Open Work Relay Specification

Version: 0.1.0

Status: draft

## 1. Intent

Open Work Relay helps humans and AI agents move work through a shared queue without making the human carry every handoff.

The system should:

- turn prompt-mode requests into work-mode task records,
- keep state in a visible queue,
- support different workflow families,
- let agents claim, pause, resume, escalate, and finish work with evidence,
- show why an agent stopped.

## 2. Core Idea

Prompt mode asks for an answer.

Work mode gives a job to a system that can carry:

- source,
- context,
- state,
- limits,
- ownership,
- stop rules,
- receipts.

Open Work Relay is the protocol between those two modes.

## 3. Core Objects

### Queue

A readable/writable place where task records live.

Supported first-class queue types:

- Markdown folder,
- GitHub Issues,
- Trello,
- Linear,
- Notion.

Other queue types are allowed if the agent can read and write them through a CLI, MCP server, API, browser automation with permission, or filesystem.

### Task

A task is the durable unit of work.

Every task must include:

1. Outcome
2. Owner / next actor
3. Source material
4. Context / decisions so far
5. Allowed actions
6. Stop rules / human gates
7. Done evidence / receipt

### Workflow

A workflow is the job-specific path a task should follow.

The relay should not force every job into the same shape. The transcript-grounded examples are client follow-up, support tickets, and schedule/pickup changes. Open-kit extensions can add planning, production, branding, or custom workflows after the core is clear.

### Receipt

A receipt is the evidence trail left by an actor after a claim, status change, handoff, stop, escalation, or completion.

Receipts must make it possible for another actor to continue without reading private chat history.

## 4. Required State Machine

Use these statuses unless the queue has native equivalents:

- `ready`
- `claimed`
- `working`
- `needs-input`
- `review`
- `done`
- `parked`

Every status change should leave a receipt.

## 5. Workflow Decomposition

Before running meaningful work, the agent should classify the job family and propose the workflow.

The agent should ask:

1. What kind of work is this?
2. What source does the work depend on?
3. What decision or output should exist at the end?
4. What can the agent do autonomously?
5. What must wait for human judgment?
6. What evidence proves the work is done?
7. Where should the receipt land?

Then the agent proposes a workflow with:

- trigger,
- inputs,
- steps,
- allowed autonomous actions,
- human gates,
- stop rules,
- evidence,
- next actor.

The user can accept, edit, or reject the proposed workflow before it becomes a reusable pattern.

## 6. Workflow Families

Workflow families fall into two groups:

- transcript-grounded examples,
- independent extensions for the open kit.

Transcript-grounded examples should stay close to the public video transcript. Extensions should be clearly treated as Open Work Relay implementation choices, not claims about any paid guide.

### Client Call / Follow-Up Workflow

Used when a client call, scoping conversation, or product discussion needs a follow-up.

Typical steps:

1. Attach transcript or notes.
2. State the decision.
3. Preserve the promise boundary.
4. Draft the follow-up.
5. Flag what needs human judgment.
6. Stop before sending.
7. Leave receipt.

Example chain:

```text
Transcript -> Decision -> Promise Boundary -> Draft Follow-Up -> Flag Judgment -> Stop Before Send
```

Stop reasons:

- transcript/source missing,
- decision ambiguous,
- draft would overpromise,
- calendar constraint unclear,
- sending requires approval.

### Support Workflow

Used for support tickets, bug reports, customer requests, community questions, or inbound help.

Typical steps:

1. Classify the ticket.
2. Attach customer or conversation history.
3. Identify known issue or prior pattern.
4. Decide whether escalation rule is met.
5. Draft response or create product task.
6. Show stop reason.
7. Leave receipt.

Example chain:

```text
Classify -> Ticket -> Attach History -> Escalate -> Product Task -> Show Stop
```

Stop reasons:

- no customer history available,
- escalation rule not met,
- product decision required,
- sending response needs approval,
- source conflicts with current docs.

### Schedule / Pickup Change Workflow

Used for schedule changes, pickup-time changes, errands, appointments, and household logistics.

Typical steps:

1. Change: identify the new constraint.
2. Check: look at calendar/tasks/context to see what shifts.
3. Draft: prepare messages and notes about what changed.
4. Pause: stop for human approval before any decision, message, booking, or cancellation.
5. Leave receipt.

Short form:

```text
Change -> Check -> Draft -> Pause
```

Stop reasons:

- calendar access missing,
- another person needs to decide,
- message would be sent externally,
- cost or travel change requires approval.
- any household decision needs human approval.

### Planning Workflow

Independent extension for the open kit.

Used for turning a fuzzy goal into tasks, issues, milestones, or a decision map.

Typical steps:

1. Restate intent.
2. Identify success criteria.
3. Surface constraints and edge cases.
4. Decompose into task slices.
5. Propose queue records.
6. Ask for approval before creating a large backlog.
7. Leave receipt.

Stop reasons:

- goal is ambiguous,
- success criteria are missing,
- priority decision belongs to human,
- creating many tasks would create noise.

### Production Work Workflow

Independent extension for the open kit.

Used for code, docs, writing, design, data cleanup, and other concrete production tasks.

Typical steps:

1. Read task and source.
2. Claim task.
3. Make one scoped change.
4. Verify through agreed gate.
5. Leave receipt.
6. Move to review or done.

Stop reasons:

- tests/checks fail and cannot be fixed within scope,
- required source is missing,
- edit would exceed allowed files,
- external publish/merge/send is required.

### Branding / Content Workflow

Independent extension for the open kit.

Used for brand positioning, public posts, launch copy, visual direction, and content packaging.

Typical steps:

1. Identify audience and platform.
2. Read source/proof.
3. Draft platform-specific output.
4. Check claims against source.
5. Apply voice/style rules.
6. Leave review notes and receipt.
7. Stop before publishing.

Stop reasons:

- claim lacks evidence,
- tone conflicts with brand rules,
- platform-specific context is missing,
- publishing requires explicit approval.

## 7. Autonomy Rules

Agents should be autonomous inside the task boundary.

Autonomous actions may include:

- reading linked sources,
- editing allowed files,
- drafting copy,
- creating queue records,
- updating status,
- leaving receipts,
- asking one blocking question,
- proposing workflow improvements.

Agents must stop before:

- sending,
- publishing,
- deleting,
- spending money,
- merging,
- changing permissions,
- deciding schedule or household changes,
- exposing private information,
- making a decision assigned to a human.

## 8. Show Stop

When an agent stops, it must show the stop reason.

Use this shape:

```md
## Stop

Status: needs-input | review | done | parked
Reason:
What I completed:
What I did not do:
What I need next:
Next actor:
Receipt:
```

The stop reason should be specific enough that another actor can resume the work.

Bad:

```text
Blocked.
```

Good:

```text
Status: needs-input
Reason: The support ticket asks for a refund, but this task only allows drafting a response. Refund approval belongs to a human.
What I completed: Classified the ticket, attached the customer history, found no matching known issue, drafted a reply.
What I need next: Approve or deny refund.
Next actor: human
Receipt: receipts/TASK-014-refund-request.md
```

## 9. Acceptance Criteria For v0

The v0 kit is usable when:

- a user can run the setup prompt,
- the prompt asks which queue they already use,
- the prompt proposes workflow families,
- a task can be represented in Markdown,
- an agent can claim a task,
- an agent can leave a receipt,
- an agent can show why it stopped,
- the smoke test can be completed without private chat context,
- the same protocol can be mapped to GitHub Issues, Trello, Linear, or Notion.
