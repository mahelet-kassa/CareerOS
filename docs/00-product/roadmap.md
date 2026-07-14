---
title: Roadmap
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Roadmap

A living, milestone-based plan (~3 months to production quality, solo). Sequencing
and dependency matter more than dates. Mirror completed work in
[Implementation Progress](../08-engineering/implementation-progress.md).

## Milestone 0 — Foundation ✅ (mostly done)

- [x] Monorepo: `core-api` (Spring Boot) + `web` (Next.js)
- [x] Postgres 16 + pgvector via Docker Compose
- [x] Flyway migrations; `V1` users table
- [x] Deny-by-default security; health/readiness probes
- [x] CI (build + test + lint) on every PR
- [x] Testcontainers integration test against real pgvector
- [ ] Managed auth (Cognito/Auth0 OIDC) + Spring resource server ([ADR-002](../adr/002-managed-auth.md))

## Milestone 1 — Master profile

- [ ] `profile` module: structured profile CRUD (FR-2.4)
- [ ] Resume upload → S3 (presigned) → parse pipeline ([resume processing](../04-ai/resume-processing.md))
- [ ] GitHub OAuth import → evidence items (FR-2.2)
- [ ] Human-in-the-loop review UI

## Milestone 2 — AI service, workers & embeddings

- [ ] `ai-service` (Node/TS) scaffolded ([ADR-001](../07-decisions/README.md))
- [ ] SQS + workers for parsing / embedding (FR-4.4, NFR-R2)
- [ ] Embeddings (with model tag) in isolated pgvector table
- [ ] Generated OpenAPI → TypeScript client pipeline (NFR-M1)

## Milestone 3 — Jobs & matching

- [ ] `catalog` module: capture jobs, extract requirements (FR-3.1)
- [ ] 3-stage match analysis: filters → hybrid retrieval → LLM adjudication ([matching](../04-ai/matching.md))
- [ ] Cached analyses per `(profile_version, posting_hash)`

## Milestone 4 — Tailoring (the payoff)

- [ ] Evidence-constrained, streaming resume generation (FR-4.1, FR-4.3)
- [ ] Cover-letter generation (FR-4.2)
- [ ] PDF/DOCX export (FR-4.5)
- [ ] Prompt + eval harness in CI ([evals](../04-ai/prompts-and-evals.md))

## Milestone 5 — Tracking

- [ ] `tracking` module: application lifecycle, kanban + list (FR-5.1/5.2)
- [ ] Append-only application events

## Milestone 6 — Outcomes & insights (the moat)

- [ ] Outcome logging (FR-6.1)
- [ ] Personal insights view (FR-6.2)

## Milestone 7 — Productionize

- [ ] AWS deployment + IaC ([deployment](../08-engineering/deployment.md))
- [ ] Observability: logs/metrics/traces (NFR-M4)
- [ ] Data export/delete across DB + S3 + vectors + events (FR-7)
- [ ] Runbook ([operations](../09-operations/runbook.md))

## Beyond MVP

Tracked in [Future Improvements](../08-engineering/implementation-progress.md#future-improvements)
and gated by the reasoning in [Market & Competition](market-and-competition.md).
