---
title: Operations Runbook
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# Operations Runbook

The "how do I..." guide for operating CareerOS in production. A runbook is what
separates a production system from a demo — it turns 2am panic into a checklist.

> **Status: stub.** Grow this as real operations begin (Milestone 6). Add an
> entry the first time you hit any incident.

## Common tasks (to fill in)

- How to check service health (probes, dashboards).
- How to read logs / find a request by correlation ID.
- How to run/verify a database migration in production.
- How to rotate secrets.
- How to scale `ai-service` / workers under load.

## Incident playbooks (to fill in)

| Symptom | Likely cause | First actions |
|---|---|---|
| AI features failing, CRUD fine | LLM provider degraded | Confirm via provider status; verify core unaffected (NFR-R1); enable fallback |
| Slow API p95 | DB contention / N+1 | Check metrics, slow query log |
| Retrieval slow (>200ms p95) | pgvector index/scale | Check index; consider [ADR-001](../07-decisions/README.md) revisit |
| Queue backing up | Worker down / poison message | Check workers, DLQ |

## Escalation

- Solo project: escalation is "me." Document dependencies (provider status pages,
  cloud console) here so future-you (or a teammate) has the links.

## Related

- [Observability](../01-architecture/observability.md) · [Infrastructure](infrastructure.md) · [Deployment](../08-engineering/deployment.md)
