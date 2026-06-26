# Moving AI Work From Prompt Mode To Work Mode

Many teams are not using one AI system. They are using several.

One model may be better for writing. Another may be better for coding. A browser agent may verify the result. A human still owns judgment, taste, and final approval.

The problem is the handoff.

When work moves from one tool to another, someone has to carry:

- the source material,
- the decision already made,
- the limits,
- the next owner,
- the current status,
- the evidence that the work was actually completed.

Too often, that someone is still the human.

I built Open Work Relay as a free/open starter kit for that middle layer.

The starting examples are deliberately concrete: client follow-up, support tickets, and schedule changes.

The distinction I care about is prompt mode vs work mode.

Prompt mode asks for an answer:

"Write a follow-up email."

Work mode gives a scoped job:

"Use this call transcript and decision summary. Draft the follow-up email, do not overstate the promise, flag anything that needs my judgment, leave a receipt, and stop before sending."

Open Work Relay turns that into a reusable task record:

1. Outcome
2. Owner / next actor
3. Source material
4. Context / decisions so far
5. Allowed actions
6. Stop rules / human gates
7. Done evidence / receipt

It can run in a plain Markdown folder, GitHub Issues, Trello, Linear, Notion, or another queue your agents can read and write.

The setup prompt is here:

https://github.com/The-Little-AI-Company/open-work-relay/blob/dev/prompts/open-work-relay-setup-prompt.md

The repo is here:

https://github.com/The-Little-AI-Company/open-work-relay

The core is free. Support is optional. The goal is simple: make useful AI coordination available without turning the protocol itself into a paid gate.
