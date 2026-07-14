# ADR 001: Modular monolith (Spring Boot) + one AI service (Node), not microservices

Date: 2026-07-14 · Status: Accepted

## Context

CareerOS is built by one senior full-stack engineer. The system has two workload shapes:
transactional CRUD (profiles, jobs, applications) and AI orchestration (parsing, RAG,
generation) which is I/O-bound, bursty, streaming-heavy, and fails in LLM-specific ways.

## Decision

- `core-api` (Spring Boot, Java 21): single modular monolith owning auth, all domain
  entities, and the only database write path. Internal packages (`profile`, `catalog`,
  `tracking`) with enforced boundaries — these are future extraction seams.
- `ai-service` (Node/TypeScript, added ~Week 2): stateless LLM orchestration. Talks to
  core-api over authenticated internal REST; never owns domain data.
- Async work (resume parsing, embeddings) goes through SQS; nothing blocks on an LLM call.
- PostgreSQL + pgvector as the single datastore, embeddings isolated in one table so a
  dedicated vector DB swap later is a migration, not a redesign.

## Consequences

- (+) One engineer operates at most four moving parts: two services, workers, one DB.
- (+) LLM latency/failures are isolated from the transactional core.
- (−) Two languages is real overhead; mitigated by generating the TypeScript client from
  core-api's OpenAPI spec — the contract is generated, never hand-maintained.
- Revisit triggers: pgvector p95 retrieval > 200 ms sustained, >1M embedding rows, or a
  second engineer joining a bounded context.
