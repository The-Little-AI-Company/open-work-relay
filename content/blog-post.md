# Agent Relay: A Free Handoff Kit For AI Agents

Most of the pain in AI work is not the model.

It is the handoff.

One tool drafts. Another edits. Another reviews. A browser agent checks the page. A human makes the call. Somewhere between those steps, the source gets dropped, the limits get fuzzy, and the next agent has to ask the human to become the hallway again.

Agent Relay is my attempt to make that hallway visible.

The first patterns are grounded in the public examples: client follow-up, support tickets, and schedule changes.

It is a local-first kit built around a shared task record:

1. Outcome
2. Owner / next actor
3. Source material
4. Context / decisions so far
5. Allowed actions
6. Stop rules / human gates
7. Done evidence / receipt

The point is simple: prompt mode asks for an answer. Work mode gives a job to a system that can carry state, stop, resume, and show evidence.

You can use Agent Relay with a plain Markdown folder, GitHub Issues, Trello, Linear, Notion, or another queue your agents can actually read and write.

Start with the setup prompt:

https://github.com/The-Little-AI-Company/agent-relay/blob/dev/prompts/agent-relay-setup-prompt.md

The repo is here:

https://github.com/The-Little-AI-Company/agent-relay

The core is free. If it helps, there will be a support link. That is not a gate. It is just a way to help keep the URLs, servers, tools, and hours paid for.
