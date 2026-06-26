# The Human Should Not Be The Hallway

AI did not remove coordination work.

It moved a lot of it onto the person using the tools.

Claude drafts something.
Codex edits the repo.
ChatGPT reviews the argument.
A browser agent checks the page.
A teammate needs the result.

And somehow you are still the one carrying the source, the decision, the limit, the next step, and the proof from room to room.

That is prompt mode pretending to be work mode.

Prompt mode:

"Write a follow-up email."

Work mode:

"Use this transcript and decision summary. Draft the follow-up email. Do not overstate the promise. Flag anything that needs my judgment. Leave a receipt. Stop before sending."

That second one can survive a handoff.

So I made Open Work Relay.

It is a free/open kit for moving work between humans and AI agents through a shared queue. The starting patterns are client follow-up, support tickets, and schedule changes. Use a Markdown folder, GitHub Issues, Trello, Linear, Notion, or whatever your agent can actually read and write.

Every task carries:

1. Outcome
2. Owner / next actor
3. Source material
4. Context / decisions so far
5. Allowed actions
6. Stop rules / human gates
7. Done evidence / receipt

No paid gate. No hidden "real version." Just a protocol you can copy, adapt, and run.

Setup prompt:
https://github.com/The-Little-AI-Company/open-work-relay/blob/dev/prompts/open-work-relay-setup-prompt.md

Repo:
https://github.com/The-Little-AI-Company/open-work-relay
