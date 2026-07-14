---
title: Implementation Progress (Build Journal)
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Implementation Progress — Build Journal

A dated, append-only record of what got built, **why**, and what was learned.
This is the narrative of the project's engineering judgment over time — the single
most valuable artifact for a technical portfolio, and a useful memory aid for a
solo developer.

**How to use:** append a new entry when meaningful work lands (usually per PR or
per milestone). Newest at the top. Don't rewrite history; correct with a new
entry.

---

## 2026-07-14 · Milestone 0 — Foundation

**Shipped**
- Monorepo scaffolded: `apps/core-api` (Spring Boot 3, Java 21) and `apps/web`
  (Next.js 15 / React 19 / TS).
- Postgres 16 + pgvector via `docker-compose.yml`; healthcheck wired.
- Flyway migrations enabled; `V1__init.sql` creates `users` and enables the
  `vector` extension up front.
- `SecurityConfig`: deny-by-default, stateless, CSRF disabled (documented
  rationale — stateless JSON API).
- Actuator health + liveness/readiness probes.
- CI (GitHub Actions): `core-api` build+test and `web` lint+build on every PR.
- `HealthEndpointTest`: Testcontainers integration test booting the full app
  against real pgvector, asserting migrations run, health is public, and
  everything else is denied.
- Web home page server-renders and reads the API health endpoint (proof the two
  services are wired).
- [ADR-001](../07-decisions/README.md) recorded: modular monolith + one AI
  service, not microservices.
- Documentation space established (this knowledge base).

**Why these choices**
- *pgvector enabled at V1* so future embedding work needs no infra change.
- *Deny-by-default from day one* so every future endpoint is safe unless
  deliberately opened.
- *Testcontainers over mocks* so the schema and security posture are verified
  against the real database image.

**Learnings / notes**
- The temporary `web/src/lib/api.ts` client is intentional debt, to be replaced
  by the generated OpenAPI client (NFR-M1).

**Next**
- Real authentication (OIDC resource server).
- Begin the `profile` module (Milestone 1).

---

## Entry template

```markdown
## YYYY-MM-DD · <milestone / feature>

**Shipped**
- ...

**Why these choices**
- ...

**Learnings / notes**
- ...

**Next**
- ...
```

---

## Future Improvements

Parking lot for good ideas beyond current scope (promote to the
[roadmap](../00-product/roadmap.md) when prioritized):

- Cover-letter generation (if it slips from MVP).
- Interview prep / question generation grounded in the job + profile.
- Analytics on application funnel (where do I stall?).
- Multi-provider LLM fallback and cost dashboards.
- Dedicated vector store if pgvector hits [ADR-001](../07-decisions/README.md)
  revisit triggers.
- Data export/import portability.
