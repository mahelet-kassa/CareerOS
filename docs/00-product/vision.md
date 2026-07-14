---
title: Product Vision
status: current
last-reviewed: 2026-07-14
owner: Mahelet
source: docs/product/01_Product_Strategy.docx (migrated)
---

# Product Vision

## The one-liner

**"Everything between 'I want a new job' and 'I signed the offer,' in one place,
with an AI that knows your whole career."**

CareerOS is the **system of record for an individual's career**. Job boards own
listings, LinkedIn owns the professional-network graph, and ATS vendors own the
employer's pipeline — but **nobody owns the job seeker's side of the table**.
Today that side is a spreadsheet, five browser tabs, and a ChatGPT window.

## The product vs. the byproduct

- **The product** is the workspace where a job search actually gets *run*.
- **The byproduct** — accrued by running the search there — is a living,
  structured, evidence-backed career record that **compounds in value between
  searches**.

"Operating System" is the *destination, not the wedge*. We win the workflow
first; the platform is earned, not launched.

## Strategic sequencing

Sequencing matters more than the feature list:

1. **Sell the workflow first** — a sharp, single-player tool a job seeker adopts
   during a pain spike.
2. **Accrue the data second** — proprietary, cross-platform *outcome* data that
   no competitor holds.
3. **Earn the two-sided network last** — the recruiter side is a venture-scale
   layer that only becomes possible after seeker-side density exists.

## What actually differentiates this

Every individual feature already exists somewhere. Durable differentiation comes
from three things incumbents structurally cannot or will not do (see
[Market & Competition](market-and-competition.md)):

1. **The outcome loop.** Closed-loop data linking *profile → application variant
   → result*. Logging outcomes is nearly effortless and immediately valuable
   ("resumes emphasizing X get you 2.4× more interviews"). Proprietary data
   nobody else captures, because seekers apply across many sites and never report
   back.
2. **Evidence-constrained AI.** Every generated bullet must trace to a verifiable
   fact in the profile (GitHub activity, artifacts, prior text). In a market
   flooded with AI slop, *"the application that is provably true"* is the
   contrarian, durable position — and what machine screeners will learn to
   reward. This is a **structural guardrail**, not a prompt (see
   [AI overview](../04-ai/overview.md)).
3. **Career continuity.** The profile compounds between searches instead of dying
   with the job hunt — converting a churny tool into a system of record and
   enabling win-back economics.

## Who it's for

The beachhead is a **mid-level software engineer (2–8 yrs), actively searching**,
running 40–100 applications. See [Personas & JTBD](personas-and-jobs.md). Expand
to adjacent roles (PM, data, design) only after winning this niche.

## Guiding principles

- **Grounded, not generative-for-its-own-sake.** Output is anchored to the user's
  real, source-attributed facts via retrieval.
- **Human-in-the-loop is a feature, not a compromise.** Users review and correct
  AI-parsed data; it builds trust.
- **The candidate owns their data.** Portable, exportable, deletable (GDPR
  export/delete in v1).
- **Boring where it counts.** The transactional core is reliable; the AI is where
  we take risks ([ADR-001](../07-decisions/README.md)).
- **Ship a thin slice end-to-end** before going wide ([MVP Scope](mvp-scope.md)).

## Non-goals (for now)

See [What NOT to build](market-and-competition.md#what-not-to-build-initially) for
the reasoned list. In short: no recruiter side, no auto-apply, no networking/social,
no LinkedIn integration, no mobile app, no portfolio-verification service — yet.

## Related

- [Market & Competition](market-and-competition.md) · [Personas & JTBD](personas-and-jobs.md)
- [Requirements](requirements.md) · [MVP Scope](mvp-scope.md) · [Roadmap](roadmap.md)
