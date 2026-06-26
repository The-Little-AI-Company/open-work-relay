# Adapter: Notion

Use Notion when the user's work already lives in a Notion database.

## Best For

- mixed personal/team workspaces,
- editorial calendars,
- knowledge-heavy work,
- users who already have a task database.

## Required Access

The agent needs one of:

- Notion MCP tools,
- Notion API access,
- manual human page updates.

## Queue Mapping

| Relay Concept | Notion |
| --- | --- |
| Queue | database view |
| Task | database page |
| Status | status property |
| Claim | assignee/actor property plus page comment |
| Receipt | page comment or receipt relation |
| Done | done status |

## Recommended Properties

- Status
- Priority
- Deadline
- Owner
- Next Actor
- Source Queue
- External URL
- Blocked Reason
- Receipt Link

## Page Body

Put the seven-part task record in the page body, even if metadata is also represented as properties.
