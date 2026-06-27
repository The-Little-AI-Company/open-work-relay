# Agent Relay Agent Protocol

You are operating inside a repo that uses Agent Relay.

Your job is not only to answer prompts. Your job is to move work through a visible queue with enough source, state, and receipt that another human or agent can continue without reading your private chat.

## Core Distinction

Prompt mode asks for an answer.

Work mode gives a job to a system that can:

- carry source material,
- preserve decisions,
- obey limits,
- stop at gates,
- leave evidence,
- hand off cleanly.

When a task is in the relay, treat it as work mode.

## Workflow Families

Before running meaningful work, classify the task into a workflow family.

Transcript-grounded families:

- client call / follow-up,
- support,
- schedule / pickup change.

Agent Relay extension families:

- planning,
- production,
- branding/content,
- custom.

If the workflow is missing or unclear, propose one before acting.

Use:

- `docs/specification.md`
- `templates/workflow.md`
- `examples/workflows/`

Do not force every job into the same process. A client follow-up, support ticket, and schedule change should follow the public transcript's shape closely. Planning, code edits, and brand review are Agent Relay extensions and should be proposed to the user as implementation choices.

## Before You Start

Read:

1. The task record.
2. Any linked source material.
3. The queue adapter for the current queue.
4. The latest receipt, if one exists.

Do not begin if the task lacks:

- outcome,
- source material or a statement that no source exists,
- allowed actions,
- stop rules,
- done evidence.

If any of those are missing, set the task to `needs-input` or leave a blocking question in the queue.

## Claiming Work

Before editing or doing external work:

1. Confirm the task is eligible.
2. Set status to `claimed` or the queue-native equivalent.
3. Add your agent name and timestamp.
4. Leave a short claim receipt.
5. Move to `working` only when you actually start.

If another actor has already claimed the task, do not duplicate the work.

## What To Read

Read only what the task points to, plus the minimum nearby context needed to understand it.

If you need more context, record why in the receipt.

## What To Edit

Only edit files or queue items explicitly allowed by the task.

If the task says to draft, draft. Do not publish.

If the task says to prepare a PR, prepare it. Do not merge.

If the task says to inspect, inspect. Do not change source files.

## What Not To Touch

Never do these without explicit permission:

- send email,
- publish posts,
- delete files,
- merge pull requests,
- spend money,
- change billing,
- change permissions,
- expose private data,
- rewrite the user's source material,
- invent missing facts.

## Stop Rules

Stop and set status to `needs-input` when:

- the task has conflicting instructions,
- required access is missing,
- a decision belongs to the human,
- external action would be irreversible,
- the next step would exceed the allowed scope,
- you cannot verify the result.

Ask exactly one blocking question when possible.

## Show Stop

Whenever you stop, include a stop block in the receipt or task comment:

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

The reason must be specific. "Blocked" is not enough.

## Receipts

Every meaningful state change needs a receipt.

At minimum, a receipt says:

- actor,
- workflow family,
- task,
- status change,
- sources used,
- actions taken,
- files or systems touched,
- evidence produced,
- what remains,
- next actor,
- stop state.

Use:
[`templates/receipt.md`](templates/receipt.md)

## Landing The Plane

Before ending work:

1. Update the task status.
2. Leave a receipt.
3. Link any outputs.
4. Name the next actor.
5. State whether the work is done, parked, blocked, or ready for review.

Do not end with "done" unless the done evidence exists.

## Smoke Test

To test the relay, run the task:

[`examples/markdown-folder/tasks/0001-say-hello-from-the-relay.md`](examples/markdown-folder/tasks/0001-say-hello-from-the-relay.md)

The test passes when another person or agent can understand what happened without reading the chat that ran it.
