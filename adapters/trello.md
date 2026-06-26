# Adapter: Trello

Use Trello when the user wants a visual Kanban board.

## Best For

- visual planning,
- household workflows,
- lightweight team coordination,
- users who think in cards.

## Required Access

The agent needs one of:

- Trello API access,
- browser automation with explicit permission,
- manual human card updates.

## Queue Mapping

| Relay Concept | Trello |
| --- | --- |
| Queue | board |
| Task | card |
| Status | list |
| Claim | member plus card comment |
| Receipt | card comment |
| Done | Done list |

## Recommended Lists

- Ready
- Claimed
- Working
- Needs Input
- Review
- Done
- Parked

## Card Body

Put the seven-part task record in the card description.
