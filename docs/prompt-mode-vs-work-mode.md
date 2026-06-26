# Prompt Mode Vs Work Mode

Most AI coordination pain starts when we confuse an answer with work.

## Prompt Mode

Prompt mode asks for an output inside one chat.

Examples:

```text
Write a follow-up email.
```

```text
Summarize this support ticket.
```

```text
Help me change my schedule.
```

Prompt mode is fine for quick answers. It breaks down when the answer has to move to another person, another agent, or another system.

## Work Mode

Work mode gives the next actor a job that can survive the handoff.

Examples:

```text
Use the client-call transcript and the decision summary. Draft the follow-up email, do not overstate the promise, flag anything that needs my judgment, leave a receipt, and stop before sending.
```

```text
Classify this support ticket, attach the customer history, identify whether it matches a known issue, create a product task only if it meets the escalation rule, and show exactly where you stopped.
```

```text
The pickup time changed. Check what it affects, draft the two messages that might be needed, and wait for approval before anything leaves the system.
```

## The Difference

Prompt mode optimizes for the current answer.

Work mode optimizes for continuity.

Work mode needs:

- source material,
- context,
- allowed actions,
- stop rules,
- ownership,
- status,
- done evidence.

That is why Open Work Relay is built around a task record instead of a better prompt alone.
