---
title: Roadmap
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Roadmap

A living, milestone-based plan. Dates are intentionally omitted for a solo
project; sequencing and dependency are what matter. Update as milestones land and
mirror completed work in
[Implementation Progress](../08-engineering/implementation-progress.md).

## Milestone 0 — Foundation ✅ (in progress → mostly done)

The skeleton everything hangs off.

- [x] Monorepo: `core-api` (Spring Boot) + `web` (Next.js)
- [x] Postgres 16 + pgvector via Docker Compose
- [x] Flyway migrations wired; `V1` users table
- [x] Deny-by-default security; health/readiness probes
- [x] CI (build + test + lint) on every PR
- [x] Testcontainers integration test against real pgvector
- [ ] Real authentication (OIDC resource server)

## Milestone 1 — Profile

- [ ] `profile` module: structured profile CRUD (FR-2.1)
- [ ] Resume upload endpoint + storage
- [ ] Web: profile create/edit UI

## Milestone 2 — AI service & parsing

- [ ] `ai-service` (Node/TS) scaffolded (per [ADR-001](../07-decisions/README.md))
- [ ] SQS + worker for async resume parsing (FR-2.2, FR-4.4)
- [ ] Embeddings written to isolated pgvector table
- [ ] Generated OpenAPI → TypeScript client pipeline

## Milestone 3 — Jobs & RAG

- [ ] `catalog` module: save jobs (FR-3.1)
- [ ] RAG retrieval over profile (FR-3.2)
- [ ] Fit assessment

## Milestone 4 — Tailoring (the payoff)

- [ ] Grounded, streaming resume generation (FR-4.1, FR-4.3)
- [ ] Cover letter generation (FR-4.2)
- [ ] Prompt + eval harness ([AI evals](../04-ai/prompts-and-evals.md))

## Milestone 5 — Tracking

- [ ] `tracking` module: application lifecycle (FR-5.1)
- [ ] Pipeline view (FR-5.2)

## Milestone 6 — Productionize

- [ ] Deployment pipeline + IaC ([deployment](../08-engineering/deployment.md))
- [ ] Observability: logs/metrics/traces (NFR-M4)
- [ ] Data export/delete (FR-6.1, FR-6.2)
- [ ] Runbook ([operations](../09-operations/runbook.md))

## Beyond MVP

Tracked in [Future Improvements](../08-engineering/implementation-progress.md#future-improvements).
