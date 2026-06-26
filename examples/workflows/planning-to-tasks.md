---
workflow_id: WORKFLOW-PLANNING-001
name: Planning To Tasks
family: planning
status: draft
created: 2026-06-26
updated: 2026-06-26
---

# Planning To Tasks

## Purpose

Turn a fuzzy idea into a small set of queue-ready tasks without creating noise.

## Trigger

The user describes a goal, feature, project, or workflow that is not yet broken into executable work.

## Inputs

- Required source: user's goal or idea.
- Optional source: existing docs, repo state, constraints, examples.
- Queue record: planning task.
- Human context: priority, appetite, deadline.

## Steps

1. Restate Intent
   - Action: summarize the real goal in one or two sentences.
   - Output: intent statement.
   - Verifier: user can reject or edit it.

2. Define Success
   - Action: name checkable success criteria.
   - Output: success criteria.
   - Verifier: criteria are observable.

3. Surface Constraints
   - Action: list constraints, risks, and edge cases.
   - Output: constraint list.
   - Verifier: no obvious unknown is hidden.

4. Slice Work
   - Action: propose small tasks.
   - Output: task list.
   - Verifier: each task has outcome and done evidence.

5. Ask Before Bulk Creation
   - Action: ask before creating many queue records.
   - Output: approval question.
   - Verifier: no noisy backlog is created without consent.

6. Leave Receipt
   - Action: record decisions and next actor.
   - Output: receipt.
   - Verifier: next task is named.

## Allowed Autonomous Actions

- summarize,
- propose tasks,
- draft queue records,
- create one starter task if explicitly allowed,
- leave receipt.

## Human Gates

- choosing priority,
- approving a large backlog,
- changing project scope,
- committing to deadline.

## Stop Rules

- Stop if intent is unclear.
- Stop if success criteria are missing.
- Stop before creating many tasks.
- Stop if the plan implies a commitment the user has not approved.

## Done Evidence

- intent statement,
- success criteria,
- task slice list,
- approval question or created task,
- receipt.
