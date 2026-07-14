---
title: Deployment
status: draft
last-reviewed: 2026-07-14
owner: Mahelet
---

# Deployment

Target: **AWS ECS Fargate** behind an ALB (topology in
[infrastructure](../09-operations/infrastructure.md)). Detailed pipeline is
finalized at Milestone 7 (Productionize).

## Release units

Separate container images / ECS services, deployed independently:

| Image | Scales on |
|---|---|
| `web` (Next.js) | request traffic |
| `core-api` (Spring Boot) | request traffic |
| `ai-service` (Node/TS) | request traffic (streaming) |
| `workers` (SQS consumers) | **queue depth**, not request traffic |

`ai-service` and `workers` may share codebases but run as separate ECS services.

## To document (Milestone 7)

- **Environments** — local / staging / production; config per environment.
- **Build & release** — image tagging and promotion; CI → registry → ECS.
- **Infrastructure as code** — the topology as IaC.
- **Database migrations in deploy** — Flyway runs on startup; forward-only; plan
  how migrations interact with rolling deploys and rollback.
- **Health checks** — liveness/readiness probes (already implemented) driving safe
  rolling deploys (NFR-R3).
- **Secrets** — injected via Secrets Manager, never in images or git (NFR-S2).

## Related

- [Infrastructure](../09-operations/infrastructure.md) · [Runbook](../09-operations/runbook.md) · [Observability](../01-architecture/observability.md)
