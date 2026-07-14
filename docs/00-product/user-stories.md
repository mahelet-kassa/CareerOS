---
title: User Stories
status: current
last-reviewed: 2026-07-14
owner: Mahelet
source: docs/product/02_MVP_Specification.docx (migrated)
---

# User Stories

User stories translate [requirements](requirements.md) into units of work with
acceptance criteria. Format: *"As a ___, I want ___, so that ___."*

## Epic A — Onboarding & master profile

### US-A1 · Import resume once
> As a job seeker, I upload my resume and get an editable structured profile, so I
> never re-type my history again.

- **Serves:** FR-2.1, FR-2.3
- **Acceptance:**
  - PDF and DOCX accepted, up to 10 MB.
  - Parse completes < 60 s with progress feedback (NFR-P4); failure gives an
    actionable message.
  - Extracted experience/education/skills are editable; user confirms before use.
- **Status:** planned

### US-A2 · Connect GitHub for evidence
> As a job seeker, I connect GitHub so my real work backs up my claims.

- **Serves:** FR-2.2, FR-2.5 — repos/languages/activity become source-attributed
  **evidence items**.
- **Status:** planned

## Epic B — Jobs & match analysis

### US-B1 · Capture a job
> As a job seeker, I paste a posting (text or URL) and the system extracts title,
> company, skills, and requirements.

- **Serves:** FR-3.1 · **Status:** planned

### US-B2 · See match & gaps
> As a job seeker, I paste a job posting and see how well I match and what's
> missing, so I stop wasting applications.

- **Serves:** FR-3.2 · depends on [matching](../04-ai/matching.md) · **Status:** planned

## Epic C — Tailoring (AI)

### US-C1 · Provably-true tailored resume
> As a job seeker, I generate a tailored resume where every bullet is true, so I'm
> never caught inflating.

- **Serves:** FR-4.1, FR-4.3
- **Acceptance:**
  - Generation uses only retrieved facts; each bullet references a fact ID.
  - The validator rejects unsupported claims and retries (structural guardrail).
  - First token streams in < 3 s (NFR-P3); result is editable.
  - Export to PDF and DOCX (FR-4.5).
- **Status:** planned

### US-C2 · Tailored cover letter
> As a job seeker, I generate a cover letter tailored to a job.

- **Serves:** FR-4.2 · **Status:** planned

## Epic D — Tracking

### US-D1 · Track application status
> As a job seeker, I track every application in one pipeline, so nothing falls
> through the cracks.

- **Serves:** FR-5.1, FR-5.2 — kanban + list, notes, reminders. · **Status:** planned

## Epic E — Outcomes & insights

### US-E1 · Log outcomes and learn
> As a job seeker, I log outcomes and see which approaches get interviews, so my
> search improves over time.

- **Serves:** FR-6.1, FR-6.2 — append-only events; insights after ~10 applications.
- **Status:** planned

## Epic F — Data ownership

### US-F1 · Export / delete my data
> As a user, I can export or delete all my data, because it's my career, not yours.

- **Serves:** FR-7.1, FR-7.2 · **Status:** planned

## Epic G — Platform (foundational)

### US-G1 · Secure by default
> As the system owner, I want every endpoint denied unless explicitly public.

- **Serves:** FR-1.3, NFR-S1 · **Status:** ✅ done (`SecurityConfig`)

### US-G2 · Health & readiness
> As an operator, I want liveness/readiness probes, so deploys roll safely.

- **Serves:** NFR-R3 · **Status:** ✅ done (Actuator probes)

## Related

- [Requirements](requirements.md) · [MVP Scope](mvp-scope.md) · [Roadmap](roadmap.md)
