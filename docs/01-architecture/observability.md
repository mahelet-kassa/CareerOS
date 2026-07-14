---
title: Observability
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# Observability

How we know what the system is doing in production. Requirement: NFR-M4.

## Current (implemented)

- **Health & readiness:** Spring Boot Actuator exposes `/actuator/health` with
  liveness and readiness probes enabled (`application.yml`) — used by
  load-balancer/orchestrator health checks (NFR-R3).

## To document here

> **Status: stub.** Fill in as each pillar is implemented.

- **Logging** — structured (JSON) logs, correlation/request IDs across
  `web → core-api → ai-service`, log levels, PII scrubbing.
- **Metrics** — Actuator/Micrometer metrics, key SLOs (API p95, retrieval p95,
  AI first-token latency), LLM cost/usage counters (NFR-C1).
- **Tracing** — distributed traces spanning the request path including async
  queue hops.
- **Alerting** — what pages a human, and the thresholds tied to the NFRs.
- **Dashboards** — the golden-signals view per service.

## SLO targets (from NFRs)

| Signal | Target |
|---|---|
| Transactional API latency | p95 < 300 ms |
| pgvector retrieval | p95 < 200 ms |
| AI first token | < 3 s |

## Related

- [Requirements — NFRs](../00-product/requirements.md)
- [Runbook](../09-operations/runbook.md)
