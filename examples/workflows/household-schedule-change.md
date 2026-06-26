---
workflow_id: WORKFLOW-SCHEDULE-001
name: Schedule / Pickup Change
family: schedule-change
status: draft
created: 2026-06-26
updated: 2026-06-26
---

# Schedule / Pickup Change

## Purpose

Handle a changed appointment, pickup, delivery, errand, or household constraint without making one person carry every downstream update. The agent may check and draft, but approval stays human.

## Trigger

A household time, appointment, pickup, or obligation changes.

## Inputs

- Required source: the changed time or commitment.
- Optional source: calendar, messages, task list, transport rules, contact list.
- Queue record: schedule-change task.
- Human context: who can approve messages or bookings.

## Steps

1. Change
   - Action: state what changed.
   - Output: change summary.
   - Verifier: old/new value or "old value unknown" is recorded.

2. Check
   - Action: look at calendar, tasks, notes, or provided context to see what shifts.
   - Output: affected commitments, people, times, travel, messages, and tasks.
   - Verifier: each affected item has a source or is marked unknown.

3. Draft
   - Action: draft messages and notes about what changed and what the human needs to decide.
   - Output: unsent drafts and decision notes.
   - Verifier: drafts are clearly marked unsent.

4. Pause
   - Action: stop for human approval before deciding, sending, booking, or canceling.
   - Output: approval question and recommendation if useful.
   - Verifier: status is `needs-input` or `review`.

5. Leave Receipt
   - Action: record what changed and what waits on approval.
   - Output: receipt.
   - Verifier: next actor is named.

## Allowed Autonomous Actions

- read linked calendar/task sources,
- list conflicts,
- draft messages,
- propose options,
- make notes about what changed,
- leave receipt.

## Human Gates

- sending messages,
- booking/canceling appointments,
- spending money,
- changing another person's plan.
- deciding whether the proposed change is good.

## Stop Rules

- Stop if calendar access is missing.
- Stop if another person needs to decide.
- Stop before deciding, sending, booking, or canceling.
- Stop if cost, transport, or care constraints are unclear.

## Done Evidence

- change summary,
- dependency list,
- draft messages/options,
- approval pause,
- stop reason,
- receipt.
