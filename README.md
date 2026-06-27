# Agent Relay

Agent Relay is a local dashboard and relay workspace for moving work between people and AI agents without losing the source, limits, status, or receipt.

It is built on the free/open Open Work Relay protocol. The protocol stays open and inspectable; Agent Relay is the product surface that makes it usable.

It starts from a simple idea:

> Prompt mode asks an AI for an answer. Work mode gives a job to a system that can carry state, stop, resume, and show evidence.

Most AI users are already working across several tools. Claude might draft. Codex might edit files. ChatGPT might review. A browser agent might verify. A teammate might own the final call. The weak point is not the model. The weak point is the handoff.

Agent Relay turns the handoff into a visible task record.

## What This Is

This repo is the starter kit:

- a setup prompt,
- an `AGENTS.md` protocol block,
- a formal specification,
- a task template,
- a workflow template,
- a receipt template,
- a Markdown-folder queue,
- adapter notes for GitHub Issues, Trello, Linear, and Notion,
- a smoke test,
- platform-specific launch drafts.

There is no app to install in v0. Use the queue you already have, or start with a plain folder.

## What This Is Not

- Not another private assistant.
- Not a replacement for judgment.
- Not a required project-management tool.
- Not a hidden paid protocol.
- Not a clone of anyone else's paid guide.

Agent Relay is an independent product built around a public problem: humans should not be the copy-paste path between agents.

## Quick Start

1. Open the setup prompt:
   [`prompts/open-work-relay-setup-prompt.md`](prompts/open-work-relay-setup-prompt.md)
2. Paste it into the AI agent you want to configure.
3. Answer the setup questions.
4. Pick your primary queue:
   - plain Markdown folder,
   - GitHub Issues,
   - Trello,
   - Linear,
   - Notion,
   - or another reachable queue.
5. Let the agent propose workflow families for your real work.
6. Add the generated protocol to your repo's `AGENTS.md`.
7. Run the smoke test:
   [`examples/markdown-folder/tasks/0001-say-hello-from-the-relay.md`](examples/markdown-folder/tasks/0001-say-hello-from-the-relay.md)

## Local Dashboard

The first product surface is a local personal dashboard for the user's projects.

Create a named relay workspace wherever you want it:

```bash
node bin/agent-relay.js init "Client Ops Relay" --root ./client-ops-relay
```

With the published package, that becomes:

```bash
npx open-work-relay init "Client Ops Relay" --root ./client-ops-relay
```

Then open the dashboard for that relay:

```bash
node bin/agent-relay.js dashboard --root ./client-ops-relay
```

The dashboard uses the relay's configured name, so the user sees "Client Ops Relay" or whatever they named it, not a hard-coded product label.

The dashboard uses the Ink Console direction: project visibility, work status, human attention, and receipts in one local browser view.

If no `--root` is provided during init, relay state still lives outside project repos by default:

```text
~/.agent-relay/
  client-ops-relay/
    relay.json
    tasks/
    receipts/
    done/
```

Use a different workspace when testing:

```bash
node bin/agent-relay.js dashboard --root ./scratch-relay --port 8788
```

## Prompt Mode Vs Work Mode

Prompt mode:

```text
Write a follow-up email.
```

Work mode:

```text
Use the client-call transcript and the decision summary. Draft the follow-up email, do not overstate the promise, flag anything that needs my judgment, leave a receipt, and stop before sending.
```

The second version is work. It has source material, boundaries, ownership, evidence, and a stop rule.

Read more:
[`docs/prompt-mode-vs-work-mode.md`](docs/prompt-mode-vs-work-mode.md)

## Transcript-Grounded Workflows

The relay should not make every job look identical, but the first examples should stay close to the public transcript.

The transcript-grounded workflow families are:

- client call / follow-up,
- support ticket,
- schedule / pickup change.

Examples:

- [`examples/workflows/client-call-follow-up.md`](examples/workflows/client-call-follow-up.md)
- [`examples/workflows/support-escalation.md`](examples/workflows/support-escalation.md)
- [`examples/workflows/household-schedule-change.md`](examples/workflows/household-schedule-change.md)

Open-kit extensions can add planning, production, branding/content, or custom workflows after the core is clear.

Extension examples:

- [`examples/workflows/planning-to-tasks.md`](examples/workflows/planning-to-tasks.md)
- [`examples/workflows/branding-content-review.md`](examples/workflows/branding-content-review.md)

Formal spec:
[`docs/specification.md`](docs/specification.md)

Source grounding:
[`docs/source-grounding.md`](docs/source-grounding.md)

## The Seven-Part Task Record

Every task uses the same core shape:

1. Outcome
2. Owner / next actor
3. Source material
4. Context / decisions so far
5. Allowed actions
6. Stop rules / human gates
7. Done evidence / receipt

Optional metadata helps agents pick the right task:

- priority,
- deadline,
- project,
- tags,
- source queue,
- external issue URL or ID,
- dependencies,
- blocked reason.

See:
[`templates/task.md`](templates/task.md)

Workflow template:
[`templates/workflow.md`](templates/workflow.md)

## The State Machine

Use these statuses unless your queue has native equivalents:

- `ready`
- `claimed`
- `working`
- `needs-input`
- `review`
- `done`
- `parked`

Every status change should leave a short receipt.

See:
[`templates/receipt.md`](templates/receipt.md)

## Show Stop

When an agent stops, it should say why.

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

The stop reason matters because the next person or agent should be able to resume without guessing.

## Queue Adapters

The protocol is queue-agnostic. The queue only has to be readable and writable by the human or agent doing the work.

Adapters:

- [`adapters/markdown-folder.md`](adapters/markdown-folder.md)
- [`adapters/github-issues.md`](adapters/github-issues.md)
- [`adapters/trello.md`](adapters/trello.md)
- [`adapters/linear.md`](adapters/linear.md)
- [`adapters/notion.md`](adapters/notion.md)

Markdown is the universal fallback because it is transparent, portable, and easy for any agent to inspect.

## Support

The core kit is free because useful AI knowledge should travel.

If this saves you a subscription or a few hours of copy-paste work, consider supporting Jeff's work. The URLs, servers, tools, and hours still cost real money.

Support link: TODO

## Relationship To Other Work

This project was sparked by public discussion about AI agent handoffs and the real pain of moving work across Claude, Codex, ChatGPT, OpenClaw, Hermes, browser agents, and team tools.

No paid material was used to build this kit. The transcript-grounded patterns are documented in [`docs/source-grounding.md`](docs/source-grounding.md). The queue adapters, templates, and TLAC packaging are independent open implementation choices.

## License

MIT. Use it, adapt it, teach it, remix it.
