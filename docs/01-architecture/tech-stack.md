---
title: Technology Stack
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Technology Stack

Canonical list of technologies, versions, and **why each was chosen**. Versions
here should match the build files; if they drift, the build files win — update
this page.

## At a glance

| Layer | Technology | Version | Source of truth |
|---|---|---|---|
| Core API | Spring Boot (Java) | 3.3.5 / Java 21 | `apps/core-api/build.gradle.kts` |
| Build (API) | Gradle (Kotlin DSL) | 8.10 | `apps/core-api` wrapper |
| Web | Next.js | ^15.3 | `apps/web/package.json` |
| UI runtime | React | ^19 | `apps/web/package.json` |
| Language (web) | TypeScript | ^5.5 | `apps/web/tsconfig.json` |
| Node runtime | Node.js | 22+ | CI / README |
| Database | PostgreSQL | 16 | `docker-compose.yml` |
| Vector search | pgvector | pg16 image | `docker-compose.yml` |
| Migrations | Flyway | (Boot-managed) | `build.gradle.kts` |
| Testing (API) | JUnit 5 + Testcontainers | (Boot-managed) | `build.gradle.kts` |
| CI | GitHub Actions | — | `.github/workflows/ci.yml` |
| AI service (planned) | Node/TypeScript | ~Wk 2 | [ADR-001](../07-decisions/README.md) |
| Queue (planned) | AWS SQS | — | [ADR-001](../07-decisions/README.md) |

## Rationale

### Spring Boot (Java 21) for `core-api`
Mature, boring-in-the-good-way platform for transactional workloads. First-class
security, data/JPA, validation, and Actuator (health/probes) out of the box.
Java 21 for virtual threads and modern language features. This is the reliable
core that must never go down.

### Next.js + React (TypeScript) for `web`
Server-side rendering for fast first paint, a single language across UI and the
future AI service, and a strong ecosystem. The App Router (Next 15 / React 19)
gives server components and streaming — useful for streaming AI output later.

### PostgreSQL 16 + pgvector
One datastore for both relational data and embeddings avoids operating a
separate vector DB early. Embeddings are isolated to their own table so a future
dedicated vector store is a migration, not a redesign (see
[ADR-001](../07-decisions/README.md) and [data lifecycle](../05-data/data-lifecycle.md)).

### Flyway for migrations
Versioned, forward-only, in-repo schema changes. Hibernate `ddl-auto` is set to
`validate` — the schema is owned by Flyway, never by the ORM. See
[migrations](../05-data/migrations.md).

### Testcontainers for integration tests
Tests run against the **same** `pgvector/pgvector:pg16` image as production, with
real Flyway migrations applied — high-fidelity confidence, no mocking the DB. See
[testing strategy](../08-engineering/testing-strategy.md).

### Node/TypeScript for `ai-service` (planned)
LLM tooling and streaming ergonomics are strongest in the JS ecosystem, and it
shares a language with the web client. Kept stateless so it scales horizontally
and its failures are isolated from the core (NFR-R1, NFR-SC1).

## The generated contract

The Java↔TypeScript boundary is **generated, never hand-maintained** (NFR-M1):
`core-api` produces an OpenAPI spec, from which the web client's TypeScript types
are generated. See [API overview](../06-api/overview.md). Today's
`apps/web/src/lib/api.ts` is a temporary hand-written stub, explicitly to be
replaced.

## Version policy

- Pin major versions; take minor/patch updates deliberately.
- Bumps that change behavior get a note in
  [Implementation Progress](../08-engineering/implementation-progress.md) and, if
  significant, an [ADR](../07-decisions/README.md).
