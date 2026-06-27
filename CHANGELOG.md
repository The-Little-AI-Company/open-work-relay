# Changelog

## 2026-06-27

- Renamed the product surface to Agent Relay while keeping Open Work Relay as the protocol/spec language.
- Added an `agent-relay` CLI alias alongside the existing package slug.
- Changed the default local workspace home to `~/.agent-relay`, with `OPEN_WORK_RELAY_HOME` kept as a legacy fallback.

## 2026-06-26

- Added `open-work-relay init <name> --root <folder>` so users can create named relay workspaces wherever they want.
- Updated the dashboard to display the relay's configured name from `relay.json`.
- Started the local dashboard product slice with a Node CLI and Ink Console direction.
- Added `open-work-relay dashboard` for serving a read-only local dashboard from a user-level relay workspace.
- Added behavior tests for relay workspace loading and dashboard HTML serving.
- Created initial public starter kit.
- Added setup prompt.
- Added task and receipt templates.
- Added Markdown folder queue template.
- Added adapters for GitHub Issues, Linear, Trello, and Notion.
- Added smoke-test task and receipt.
- Added draft launch articles for blog, X/Twitter, LinkedIn, and Substack.
- Added source-grounding notes to distinguish transcript-grounded patterns from Open Work Relay extensions.
