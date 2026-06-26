# Adapter: GitHub Issues

Use GitHub Issues when the work already lives in a repo or when coding agents need a public queue.

## Best For

- open-source projects,
- code tasks,
- public roadmaps,
- tasks that should become pull requests.

## Required Access

The agent needs one of:

- GitHub CLI access through `gh`,
- GitHub MCP tools,
- GitHub API access,
- manual human issue updates.

## Queue Mapping

| Relay Concept | GitHub Issues |
| --- | --- |
| Queue | issue list |
| Task | issue body |
| Status | labels or project status |
| Claim | assignee plus claim comment |
| Receipt | issue comment |
| Done | close issue after evidence exists |

## Recommended Labels

- `relay:ready`
- `relay:claimed`
- `relay:working`
- `relay:needs-input`
- `relay:review`
- `relay:done`
- `relay:parked`

## Issue Body

Use the seven-part task record in the issue body.

If using GitHub Projects, mirror the state machine there too.
