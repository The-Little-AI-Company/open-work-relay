---
workflow_id: WORKFLOW-SUPPORT-001
name: Support Ticket Escalation
family: support
status: draft
created: 2026-06-26
updated: 2026-06-26
---

# Support Ticket Escalation

## Purpose

Turn an inbound support ticket into either a safe response draft, a product task, or a human escalation.

## Trigger

A support ticket, customer email, community report, or bug report enters the queue.

## Inputs

- Required source: ticket text.
- Optional source: customer history, previous tickets, docs, known issues, product roadmap.
- Queue record: support task.
- Human context: escalation rules and approval limits.

## Steps

1. Classify
   - Action: classify the ticket as question, bug, billing, feature request, complaint, or unknown.
   - Output: classification label.
   - Verifier: classification is written in the task or receipt.

2. Attach History
   - Action: attach or summarize relevant customer/conversation history.
   - Output: history section.
   - Verifier: source links or "history unavailable" is recorded.

3. Check Known Issue
   - Action: compare against docs, known issues, or prior tickets.
   - Output: match/no-match.
   - Verifier: linked known issue or explicit no-match.

4. Escalate If Needed
   - Action: apply escalation rule.
   - Output: escalation decision.
   - Verifier: reason is recorded.

5. Create Product Task If Needed
   - Action: create or draft a product task only when escalation rule is met.
   - Output: task link or task draft.
   - Verifier: product task includes source ticket and reason.

6. Show Stop
   - Action: explain where the agent stopped and why.
   - Output: stop block and receipt.
   - Verifier: next actor is named.

## Allowed Autonomous Actions

- classify ticket,
- summarize history,
- draft response,
- draft product task,
- update task status,
- leave receipt.

## Human Gates

- sending response,
- issuing refund,
- promising timeline,
- changing product priority,
- escalating to legal/security,
- exposing private customer data.

## Stop Rules

- Stop if customer history is unavailable and needed.
- Stop if the response would make a promise.
- Stop if refund, legal, security, or product-priority approval is required.
- Stop if the ticket cannot be classified.

## Done Evidence

- classification,
- history attachment or unavailable note,
- response draft or product task,
- stop reason,
- receipt.

## Receipt Requirements

The receipt must include:

- classification,
- source ticket,
- history sources,
- known issue match,
- escalation decision,
- product task link if created,
- stop reason,
- next actor.
