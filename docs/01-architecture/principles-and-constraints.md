---
title: Principles & Constraints
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Principles & Constraints

The non-negotiables that every design decision is checked against. Follows the
[arc42](https://arc42.org) "constraints" and "solution strategy" sections.

## Architecture principles

1. **Minimize moving parts.** One engineer operates this. At most: two services,
   workers, one database.
2. **Isolate risk.** The transactional core is boring and reliable; the AI layer
   is where we take risks. LLM failure never breaks CRUD (NFR-R1).
3. **One source of truth per fact.** In code (`core-api` owns all writes) and in
   docs (link, don't duplicate).
4. **Grounded over generative.** AI output is anchored to real user data via
   retrieval.
5. **Generate the contract.** The Java↔TypeScript API contract is generated, not
   hand-written (NFR-M1).
6. **Forward-only schema.** Every schema change is a Flyway migration; applied
   migrations are immutable (NFR-M2).
7. **Secure by default.** Deny-by-default authorization; secrets never in git.
8. **Prove it end-to-end first.** Thin vertical slice before breadth.

## Constraints

| Type | Constraint |
|---|---|
| Team | Single senior full-stack engineer |
| Budget | Solo-project infrastructure budget (NFR-C2) |
| Languages | Java (core), TypeScript (web + AI) — deliberately two, no more |
| Data | Single Postgres + pgvector datastore |
| Process | CI green before merge; ADRs for significant decisions |

## Revisit triggers

Architecture is reassessed (per [ADR-001](../07-decisions/README.md)) when:

- pgvector p95 retrieval > 200 ms sustained, or
- embedding rows exceed ~1M, or
- a second engineer joins a bounded context.
