# Adapter: Linear

Use Linear when a team already manages product or engineering work there.

## Best For

- product teams,
- sprint planning,
- agent queues connected through Linear MCP or API access,
- work that needs assignment and status visibility.

## Required Access

The agent needs one of:

- Linear MCP tools,
- Linear API access,
- manual human issue updates.

## Queue Mapping

| Relay Concept | Linear |
| --- | --- |
| Queue | team issue list or view |
| Task | Linear issue |
| Status | workflow status |
| Claim | assignee plus comment |
| Receipt | issue comment |
| Done | done workflow status |

## Recommended Statuses

Use native statuses if they exist. Otherwise create equivalents:

- Ready
- Claimed
- Working
- Needs Input
- Review
- Done
- Parked

## Notes

Linear works well when the queue already has team ownership. Do not make Linear mandatory for solo users.
