# Adapter: Markdown Folder

Markdown folder is the universal fallback for Agent Relay.

## Best For

- solo builders,
- small teams,
- repos,
- Obsidian vaults,
- local-first workflows,
- users who want no new service.

## Required Access

The agent needs filesystem access to:

- read task files,
- edit task front matter,
- create receipt files,
- move completed task files if allowed.

## Queue Mapping

| Relay Concept | Markdown Folder |
| --- | --- |
| Queue | `work-relay/tasks/` |
| Task | one Markdown file |
| Status | front matter `status` |
| Claim | front matter `claimed_by` and `claimed_at` |
| Receipt | file in `work-relay/receipts/` |
| Done | move to `work-relay/done/` or set `status: done` |

## Notes

Use this first when you are unsure. It is inspectable, portable, and easy to back up.
