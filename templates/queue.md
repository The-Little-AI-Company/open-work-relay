# Markdown Queue Template

Use this when you want Open Work Relay without a separate project-management tool.

## Folder Shape

```text
work-relay/
  tasks/
    0001-example-task.md
  receipts/
    0001-example-task-receipt.md
  done/
    0001-example-task.md
```

## Rules

1. New work starts in `tasks/`.
2. Each task uses `templates/task.md`.
3. Each meaningful state change gets a receipt in `receipts/`.
4. Completed work moves to `done/` only after the done evidence exists.
5. Agents may only claim tasks with `status: ready`.
6. Agents must not claim a task already claimed by another actor.
7. Blocked tasks stay in `tasks/` with `status: needs-input` and a blocking question.

## Selecting Work

Pick the highest-priority task that is:

- `status: ready`,
- not claimed,
- not blocked,
- within the actor's allowed scope,
- possible to verify.
