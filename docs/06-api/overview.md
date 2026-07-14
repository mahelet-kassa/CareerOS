---
title: API Overview
status: draft
last-reviewed: 2026-07-14
owner: Mahelet
---

# API Overview

`core-api` exposes a REST API consumed by `web` (and internally by
`ai-service`). This page holds the **conventions**; the endpoint reference is the
generated [OpenAPI spec](openapi.md).

## Conventions

| Aspect | Convention |
|---|---|
| Style | REST over HTTPS, JSON |
| Auth | Bearer token (OIDC); deny-by-default ([security](../01-architecture/security.md)) |
| Errors | Problem Details (RFC 9457) — see [error handling](../02-backend/error-handling.md) |
| IDs | UUIDs |
| Timestamps | ISO-8601 / `TIMESTAMPTZ` |
| Async ops | `202 Accepted` + job id, poll/subscribe for result |
| Versioning | to decide (URI prefix vs. header) — record as ADR |
| Pagination | to decide (cursor recommended) — record as ADR |

## Current endpoints (implemented)

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/actuator/health` | public | Liveness/readiness (probes) |
| GET | `/actuator/health/liveness` | public | Liveness probe |
| GET | `/actuator/health/readiness` | public | Readiness probe |
| * | everything else | 401 | Denied by default until authed |

## The contract is generated

Per [ADR-001](../07-decisions/README.md) and NFR-M1:

```mermaid
flowchart LR
    C[core-api controllers] -->|springdoc| S[OpenAPI spec]
    S -->|openapi-typescript| T[TS types/client in web]
```

`web`'s `src/lib/api.ts` is a **temporary hand-written stub** to be replaced by
the generated client once real endpoints exist. See [openapi.md](openapi.md).

## Related

- [OpenAPI spec](openapi.md) · [Backend](../02-backend/overview.md) · [Error handling](../02-backend/error-handling.md)
