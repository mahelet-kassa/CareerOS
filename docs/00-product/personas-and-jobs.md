---
title: Personas & Jobs-to-be-Done
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Personas & Jobs-to-be-Done

CareerOS targets one primary persona at launch. Keeping the persona narrow keeps
the domain model and AI behavior opinionated.

## Primary persona — "Sam, the active job-seeking engineer"

| Attribute | Detail |
|---|---|
| Role | Software engineer (mid to senior), 2–10 yrs experience |
| Context | Actively applying to 5–30 roles over a few months |
| Technical comfort | High — expects a fast, keyboard-friendly, no-nonsense tool |
| Pain | Repetitive resume tailoring, lost track of applications, weak targeting |
| Motivation | Land a better role with less wasted effort and more signal |

### Sam's jobs-to-be-done

Framed as [JTBD](https://jtbd.info) statements — *"When ___, I want to ___, so I
can ___."*

1. **When** I find a promising job posting, **I want to** capture it and
   understand how well I fit, **so I can** decide whether it's worth applying.
2. **When** I decide to apply, **I want to** generate a resume and cover letter
   tailored to that posting from my real experience, **so I can** apply quickly
   without lying or starting from scratch.
3. **When** I've applied somewhere, **I want to** track its status and next
   step, **so I can** stay on top of my pipeline without a spreadsheet.
4. **When** I set up the tool, **I want to** import my career history once,
   **so I can** stop re-entering the same information everywhere.

## Secondary / future personas (not served at MVP)

- **The passive/exploring engineer** — not actively applying, wants to keep
  materials warm. Future.
- **The career-switcher** — needs heavier guidance on positioning. Future.

## How personas drive the build

| JTBD | Drives | Docs |
|---|---|---|
| Import history once | `profile` module, resume parsing (AI) | [Backend](../02-backend/overview.md), [AI](../04-ai/overview.md) |
| Understand fit | `catalog` module, RAG retrieval | [AI RAG pipeline](../04-ai/rag-pipeline.md) |
| Tailor materials | AI generation grounded in profile | [AI overview](../04-ai/overview.md) |
| Track applications | `tracking` module | [Backend](../02-backend/overview.md) |

## Related

- [Product Vision](vision.md)
- [User Stories](user-stories.md)
