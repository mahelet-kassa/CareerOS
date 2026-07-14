---
title: Deployment
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# Deployment

> **Status: stub.** Fill in at Milestone 6 (Productionize). CI hints in the code
> (`application.yml` probes, `ci.yml` comments) point toward an ECS/ALB-style
> target.

## To document

- **Environments** — local / staging / production; config per environment.
- **Build & release** — container images for `core-api`, `web`, `ai-service`;
  tagging and promotion.
- **Infrastructure as code** — the topology (see [infrastructure](../09-operations/infrastructure.md)).
- **Database migrations in deploy** — Flyway runs on startup; forward-only.
- **Health checks** — liveness/readiness probes (already implemented) driving
  safe rolling deploys (NFR-R3).
- **Secrets** — injected via secret store, never in images or git (NFR-S2).
- **Rollback** — strategy and how migrations interact with rollback.

## Deployment diagram (to add)

```
[ to add: Mermaid deployment diagram —
  load balancer → web / core-api / ai-service → managed Postgres+pgvector, SQS ]
```

## Related

- [Infrastructure](../09-operations/infrastructure.md) · [Runbook](../09-operations/runbook.md) · [Observability](../01-architecture/observability.md)
