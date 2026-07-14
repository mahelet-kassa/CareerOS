---
title: User Stories
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# User Stories

User stories translate [requirements](requirements.md) into units of work with
explicit acceptance criteria. Format: *"As a ___, I want ___, so that ___."*

Each story links back to the functional requirement (FR) it serves and carries a
status.

## Epic A — Onboarding & profile

### US-A1 · Import resume once
> As a job-seeking engineer, I want to upload my resume and have it parsed into a
> structured profile, so that I never re-enter my history.

- **Serves:** FR-2.2, FR-2.1
- **Acceptance:**
  - Given a PDF resume, when I upload it, then experience/skills/education are
    extracted into editable structured fields.
  - Parsing happens asynchronously and I'm shown progress ([FR-4.4]).
  - I can correct any parsed field.
- **Status:** planned

### US-A2 · Manual profile editing
> As a user, I want to edit my structured profile, so that it accurately
> reflects my experience.

- **Serves:** FR-2.1 · **Status:** planned

## Epic B — Jobs

### US-B1 · Save a job
> As a user, I want to save a job posting (title, company, description, URL), so
> that I can act on it later.

- **Serves:** FR-3.1 · **Status:** planned

### US-B2 · See my fit for a job
> As a user, I want to see how well my profile matches a saved job, so that I can
> prioritize where to apply.

- **Serves:** FR-3.2 · depends on RAG ([AI](../04-ai/rag-pipeline.md)) · **Status:** planned

## Epic C — Tailoring (AI)

### US-C1 · Tailored resume
> As a user, I want a resume tailored to a specific job and grounded in my real
> experience, so that I can apply quickly and honestly.

- **Serves:** FR-4.1, FR-4.3
- **Acceptance:**
  - Generation is grounded in retrieved profile data; no fabricated experience.
  - First token streams to the UI in < 3 s (NFR-P3).
  - I can regenerate and edit the result.
- **Status:** planned

### US-C2 · Tailored cover letter
> As a user, I want a cover letter tailored to a job, so that I don't write one
> from scratch.

- **Serves:** FR-4.2 · **Status:** planned

## Epic D — Tracking

### US-D1 · Track application status
> As a user, I want to move an application through statuses (saved → applied →
> interviewing → offer/rejected), so that I know where each stands.

- **Serves:** FR-5.1 · **Status:** planned

### US-D2 · Pipeline view
> As a user, I want to see all my applications in one view, so that I can manage
> my pipeline without a spreadsheet.

- **Serves:** FR-5.2 · **Status:** planned

## Epic E — Platform (foundational, cross-cutting)

### US-E1 · Secure by default
> As the system owner, I want every endpoint denied unless explicitly public, so
> that new endpoints are safe by default.

- **Serves:** FR-1.3, NFR-S1 · **Status:** ✅ done (`SecurityConfig`)

### US-E2 · Health & readiness
> As an operator, I want liveness/readiness probes, so that deploys roll safely.

- **Serves:** NFR-R3 · **Status:** ✅ done (Actuator probes)

## Related

- [Requirements](requirements.md) · [MVP Scope](mvp-scope.md) · [Roadmap](roadmap.md)
