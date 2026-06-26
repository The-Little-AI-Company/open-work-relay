---
workflow_id: WORKFLOW-BRANDING-001
name: Branding And Content Review
family: branding
status: draft
created: 2026-06-26
updated: 2026-06-26
---

# Branding And Content Review

## Purpose

Turn a draft, launch post, positioning statement, or public page into platform-appropriate content without unsupported claims or off-brand language.

## Trigger

A draft needs to be adapted, reviewed, or prepared for a public surface.

## Inputs

- Required source: draft or source notes.
- Optional source: brand rules, proof links, platform constraints, audience.
- Queue record: content/branding task.
- Human context: publish approval and sensitive boundaries.

## Steps

1. Identify Audience And Platform
   - Action: name who the piece is for and where it will appear.
   - Output: audience/platform statement.
   - Verifier: platform is explicit.

2. Extract Claims
   - Action: list claims that need support.
   - Output: claim checklist.
   - Verifier: every factual claim has a source or gets softened/removed.

3. Shape Draft
   - Action: adapt the piece to platform and audience.
   - Output: revised draft.
   - Verifier: draft fits the platform.

4. Apply Voice Rules
   - Action: remove generic AI/corporate language and fix tone.
   - Output: cleaned draft.
   - Verifier: banned phrases and unsupported claims are checked.

5. Stop Before Publishing
   - Action: leave draft and receipt for human approval.
   - Output: review-ready artifact.
   - Verifier: status is `review`, not `done`, unless publishing was explicitly allowed.

## Allowed Autonomous Actions

- revise draft,
- create platform variants,
- check claims,
- suggest headline options,
- leave receipt.

## Human Gates

- publishing,
- sending to a person,
- adding sensitive personal details,
- making claims without source,
- changing positioning strategy.

## Stop Rules

- Stop if a claim lacks evidence.
- Stop if brand rules conflict.
- Stop before publishing.
- Stop if platform context is missing.

## Done Evidence

- revised draft,
- claim check notes,
- platform fit notes,
- receipt,
- next actor for approval.
