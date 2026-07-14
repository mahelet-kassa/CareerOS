---
title: Infrastructure
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# Infrastructure

The deployed topology and cloud resources. Requirement: run within a solo-project
budget (NFR-C2).

## Local (implemented)

- `docker-compose.yml` runs Postgres 16 + pgvector locally with a healthcheck and
  a persistent volume (`pgdata`). Local credentials are clearly marked "local
  only — never reuse in deployed envs."

## Deployed (to design)

> **Status: stub.** Design at Milestone 6. Signals in the codebase (readiness
> probes, CI comments referencing ECS/ALB) suggest a containerized cloud target.

### To document
- **Compute** — where `core-api`, `web`, `ai-service`, and workers run.
- **Database** — managed Postgres with pgvector; backups, sizing.
- **Queue** — SQS (per [ADR-001](../07-decisions/README.md)) + DLQ.
- **Networking** — load balancer, TLS, private/internal service-to-service.
- **Secrets** — secret store integration.
- **Cost** — expected monthly cost and the levers to control it.

### Topology diagram (to add)

```
[ to add: Mermaid deployment/topology diagram ]
```

## Related

- [Deployment](../08-engineering/deployment.md) · [Runbook](runbook.md) · [Tech stack](../01-architecture/tech-stack.md)
