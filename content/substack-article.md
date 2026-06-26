# The Human Should Not Be The Hallway

There is a difference between asking an AI for an answer and giving work to a system.

Most of us blur that line because the chat box makes everything look the same.

You type something in. The model gives something back. Maybe the answer is good. Maybe it is not. Either way, if the work has to move anywhere else, the chat box stops being enough.

That is the part I care about.

Claude can draft. Codex can edit files. ChatGPT can review. A browser agent can check whether the page rendered. A teammate can own the final decision. Those are all useful pieces.

The pain is the space between them.

That space still tends to be a person.

The person carries the transcript. The person remembers the decision. The person tells the next model what not to touch. The person explains why the last agent stopped. The person audits whether "done" means done or just "the model stopped talking."

That is not automation.

That is the human acting as the hallway between tools.

## Prompt Mode

Prompt mode asks for an answer.

```text
Write a follow-up email.
```

That is fine when the output begins and ends in one chat.

It is not fine when the email depends on a client call, a decision, a promise you do not want to overstate, a calendar constraint, and an approval gate before anything gets sent.

Prompt mode gives you output.

It does not necessarily give you work someone else can pick up.

## Work Mode

Work mode gives a job to a system that can carry state.

```text
Use the client-call transcript and the decision summary. Draft the follow-up email, do not overstate the promise, flag anything that needs my judgment, leave a receipt, and stop before sending.
```

That is different.

It has source material. It has context. It has allowed actions. It has a stop rule. It has a receipt.

Another person or agent can pick it up without reading the whole private chat.

That is the shift Open Work Relay is trying to make easier.

## The Task Record

Open Work Relay is built around a seven-part task record:

1. Outcome
2. Owner / next actor
3. Source material
4. Context / decisions so far
5. Allowed actions
6. Stop rules / human gates
7. Done evidence / receipt

That is the core.

You can add metadata like priority, deadline, tags, dependencies, and an external issue URL. Those help with sorting and selection. But the seven-part record is what keeps the work alive across a handoff.

## The Queue Does Not Have To Be Fancy

The queue can be a Markdown folder.

It can be GitHub Issues.

It can be Trello.

It can be Linear.

It can be Notion.

It can be anything your agents and people can actually read and write.

The queue is not the product. The queue is where the handoff lands.

The important part is that the next actor can see:

- what needs to happen,
- who owns it,
- what source matters,
- what has already been decided,
- what is allowed,
- when to stop,
- what evidence proves completion.

## Different Work Needs Different Workflows

The task record stays consistent.

The workflow does not have to.

The clearest examples from the public video are client follow-up, support, and schedule changes.

Client follow-up might look like this:

```text
Transcript -> Decision -> Promise Boundary -> Draft Follow-Up -> Flag Judgment -> Stop Before Send
```

Support might look like this:

```text
Classify -> Attach History -> Check Known Issue -> Escalate -> Product Task -> Show Stop
```

Household logistics might look like this:

```text
Change -> Check -> Draft -> Pause
```

That pause is not decoration. If a pickup time changes, the agent can notice the new constraint, check the calendar, draft the message, and write notes about what shifted. It should not decide for the household. It should pause so the human can approve the change.

Those are the core patterns.

Open Work Relay can extend the same method to other work families, but those extensions should be named as extensions.

Branding work might look like this:

```text
Identify Audience -> Extract Claims -> Shape Draft -> Apply Voice Rules -> Stop Before Publishing
```

The point is not to make a giant automation machine on day one.

The point is to make the work explicit enough that an agent can act autonomously inside the boundary, then show why it stopped.

## Receipts Matter

I do not want to ask the agent whether it did the thing.

I want the work to leave a trail.

A receipt says:

- who acted,
- what status changed,
- what sources were used,
- what actions were taken,
- what files or systems were touched,
- what evidence was produced,
- what remains,
- who acts next.

This is how "done" stops meaning "go audit it yourself."

## Why This Is Free

I am not interested in making the basic coordination pattern a paid secret.

If the protocol helps people stop copy-pasting state between AI tools, it should be available. People should be able to copy it, adapt it, teach it, and run it in whatever stack they already use.

That does not mean the work costs nothing.

URLs cost money. Tools cost money. Time costs money. Maintenance costs money.

So the plan is simple: the kit is free, and support is optional.

If it helps, kick in what feels fair. If you cannot, still use it.

That is the line.

Support is not access control.

## Start Here

The setup prompt is the easiest entry point:

https://github.com/The-Little-AI-Company/open-work-relay/blob/dev/prompts/open-work-relay-setup-prompt.md

The repo is here:

https://github.com/The-Little-AI-Company/open-work-relay

Start with the smoke test. Make one task called "Say hello from the relay." Have an agent claim it, do one tiny action, leave a receipt, and stop.

If another person or agent can understand what happened without reading the chat, the relay works.
