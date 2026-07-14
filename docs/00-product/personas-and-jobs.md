---
title: Personas & Jobs-to-be-Done
status: current
last-reviewed: 2026-07-14
owner: Mahelet
source: docs/product/01_Product_Strategy.docx (migrated)
---

# Personas & Jobs-to-be-Done

CareerOS targets one sharply-defined beachhead persona at launch. A narrow
persona keeps the domain model and AI behavior opinionated.

## Primary persona — "the actively-searching engineer"

| Attribute | Detail |
|---|---|
| Role | Software engineer, **2–8 years** experience, mid-level |
| Situation | **Actively searching** (laid off or upgrading) |
| Volume | Running **40–100 applications** |
| Current stack | A spreadsheet, ChatGPT, LinkedIn, and several job boards |
| Technical comfort | High — expects a fast, keyboard-friendly, no-nonsense tool |
| Evidence source | **Has a GitHub account** — verifiable work backing their claims |

### Why this beachhead
- Highest tool-adoption velocity.
- **GitHub provides verifiable evidence** — enables the anti-slop, "provably true"
  positioning.
- Acute, high-volume pain.
- Demonstrated willingness to pay for career tools.
- Dense referral networks — engineers job-hunt in cohorts, especially during
  layoff waves.

## Jobs-to-be-Done

Framed as [JTBD](https://jtbd.info): *"When ___, I want to ___, so I can ___."*

1. **When** I start a search, **I want to** import my resume and GitHub once into
   a structured master profile, **so I can** stop re-typing my history everywhere.
2. **When** I find a posting, **I want to** see how well I match and what's
   missing, **so I can** stop wasting applications on poor fits.
3. **When** I apply, **I want to** generate a resume/cover letter where every
   claim is provably true, **so I can** never be caught inflating.
4. **When** I've applied, **I want to** track every application in one pipeline,
   **so I can** let nothing fall through the cracks.
5. **When** I've applied enough, **I want to** see which approaches get
   interviews, **so I can** improve my search over time.

## Secondary / future personas (not served at MVP)

- Adjacent roles — **PM, data, design** — expansion after winning engineers.
- The passive/exploring professional (keep materials warm between searches).
- The career-switcher (heavier positioning guidance).

## How personas drive the build

| JTBD | Drives | Docs |
|---|---|---|
| Import resume + GitHub once | `profile`, resume parsing, GitHub import | [Backend](../02-backend/overview.md), [Resume processing](../04-ai/resume-processing.md) |
| See fit + gaps | `catalog`, match analysis | [Matching](../04-ai/matching.md) |
| Provably-true tailoring | evidence-constrained generation | [AI overview](../04-ai/overview.md) |
| Track applications | `tracking` | [Backend](../02-backend/overview.md) |
| Outcome insights | outcome logging + analytics | [Requirements](requirements.md) |

## Related

- [Vision](vision.md) · [Market & Competition](market-and-competition.md) · [User Stories](user-stories.md)
