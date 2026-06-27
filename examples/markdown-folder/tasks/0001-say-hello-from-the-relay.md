---
id: TASK-0001
title: Say hello from the relay
status: ready
priority: low
deadline:
project: agent-relay
tags: [smoke-test]
source_queue: markdown
external_url:
owner: human
next_actor: agent
claimed_by:
claimed_at:
dependencies: []
blocked_reason:
created: 2026-06-26
updated: 2026-06-26
---

# Say Hello From The Relay

## 1. Outcome

Prove an agent can claim a task, do a tiny piece of work, leave a receipt, and stop without needing private chat context.

## 2. Owner / Next Actor

Next actor: any participating agent.

## 3. Source Material

- `AGENTS.md`
- `templates/receipt.md`
- `templates/queue.md`

## 4. Context / Decisions So Far

This is the smoke test. Do not expand scope. Do not set up integrations. Do not publish anything.

## 5. Allowed Actions

- Mark this task claimed.
- Write a one-sentence hello in the receipt.
- Move the task to done or set status to done.

## 6. Stop Rules / Human Gates

Stop if you cannot edit the queue or leave a receipt.

Do not modify any files outside this example queue.

## 7. Done Evidence / Receipt

A receipt exists in `examples/markdown-folder/receipts/` and another person or agent can tell what happened without reading the chat.
