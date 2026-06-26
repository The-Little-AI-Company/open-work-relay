---
workflow_id: WORKFLOW-CLIENT-001
name: Client Call Follow-Up
family: client-follow-up
status: draft
created: 2026-06-26
updated: 2026-06-26
---

# Client Call Follow-Up

## Purpose

Turn a client call transcript and decision summary into a safe follow-up draft that preserves the promise boundary and stops before sending.

## Trigger

A client call, scoping conversation, or product discussion ends and needs a follow-up.

## Inputs

- Required source: call transcript or notes.
- Required source: decision summary.
- Optional source: calendar constraints, project notes, previous commitments.
- Queue record: follow-up task.
- Human context: approval rules and what must not be overstated.

## Steps

1. Attach Transcript
   - Action: link or summarize the call transcript.
   - Output: source section.
   - Verifier: transcript or "transcript unavailable" is recorded.

2. State Decision
   - Action: identify what was decided.
   - Output: decision summary.
   - Verifier: decision is tied to source material.

3. Preserve Promise Boundary
   - Action: state what the follow-up must not overpromise.
   - Output: promise boundary.
   - Verifier: risky claims are flagged.

4. Draft Follow-Up
   - Action: draft the follow-up message.
   - Output: unsent draft.
   - Verifier: draft is clearly marked unsent.

5. Flag Judgment
   - Action: list anything requiring human judgment.
   - Output: review notes.
   - Verifier: open judgment points are explicit.

6. Stop Before Send
   - Action: pause for human approval.
   - Output: stop block and receipt.
   - Verifier: status is `review` or `needs-input`, not sent.

## Allowed Autonomous Actions

- read transcript,
- summarize decision,
- draft follow-up,
- flag judgment points,
- leave receipt.

## Human Gates

- sending the follow-up,
- making promises,
- changing project scope,
- committing calendar time,
- quoting price or timeline.

## Stop Rules

- Stop if transcript/source is missing.
- Stop if the decision is ambiguous.
- Stop if the draft would promise scope, price, or timing.
- Stop before sending.

## Done Evidence

- decision summary,
- unsent follow-up draft,
- judgment flags,
- stop reason,
- receipt.
