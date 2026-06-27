# Agent Relay Product Principles

Agent Relay exists to let agents continue project work without making the human rehydrate context by hand.

The least complex useful version is:

1. A named relay workspace.
2. Task records that say what to do, what source matters, what is allowed, when to stop, and what proves done.
3. Receipt records that say what happened, what changed, why the actor stopped, and who acts next.
4. A CLI that creates and inspects the workspace.
5. A local dashboard that shows status, blockers, and proof without becoming a project-management app.

Everything else is optional until these five pieces are insufficient.

## Context Rule

Agent Relay should reduce agent context, not increase it.

An agent should not need to read a whole chat, a whole repo, or a pile of generated handoff docs. The task record should point to the minimum source. The latest relevant receipts should carry continuation state. If a task cannot be resumed from those records, the task is too vague or the receipt is missing proof.

## Irreducible Objects

### Relay Workspace

The relay workspace is the deep module. Its interface is small: `relay.json`, `tasks/`, `receipts/`, and `done/`.

The implementation can later gain validation, locking, adapters, sync, or a hosted dashboard. Those should not change what a basic agent needs to understand.

### Task

A task is the contract for work.

Minimum fields:

- outcome,
- source material,
- allowed actions,
- stop rules,
- done evidence,
- status,
- next actor.

### Receipt

A receipt is the continuation packet.

Minimum fields:

- actor,
- task,
- sources used,
- actions taken,
- evidence,
- stop reason,
- next actor.

## Non-Goals

- No second public name.
- No generated session handoff documents in project repos.
- No requirement to switch project-management tools.
- No database before files are insufficient.
- No hosted account before local continuation works.
- No agent memory layer that hides state from the user.

## First Build Shape

The first product should stay local:

```bash
agent-relay init "Client Ops Relay" --root ./client-ops-relay
agent-relay dashboard --root ./client-ops-relay
```

The dashboard should answer three questions:

1. What can move?
2. What needs the human?
3. What proof exists?
