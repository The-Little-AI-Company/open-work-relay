---
receipt_id: RECEIPT-0001
task_id: TASK-0001
actor: example-agent
status_from: ready
status_to: done
created: 2026-06-26
---

# Receipt: TASK-0001

## Actor

example-agent

## Status Change

`ready` -> `done`

## Sources Used

- `AGENTS.md`
- `templates/receipt.md`
- `examples/markdown-folder/tasks/0001-say-hello-from-the-relay.md`

## Actions Taken

- Read the smoke-test task.
- Confirmed scope was limited to the example queue.
- Left this receipt.

## Files Or Systems Touched

- `examples/markdown-folder/receipts/0001-say-hello-from-the-relay-receipt.md`

## Evidence Produced

Hello from the relay.

## What Remains

Nothing for the smoke test.

## Next Actor

Human reviewer.

## Stop State

done
