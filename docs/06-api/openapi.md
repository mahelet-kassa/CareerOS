---
title: OpenAPI Contract
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# OpenAPI Contract

> **Status: stub.** Wire up spec generation when the first domain endpoints ship.

## Plan

1. **Generate the spec** — add `springdoc-openapi` to `core-api`. It produces
   `/v3/api-docs` (JSON) and a Swagger UI at `/swagger-ui`.
2. **Publish the spec** — export the spec as a build artifact / commit it to the
   repo so it's diffable and reviewable.
3. **Generate the client** — run `openapi-typescript` (or similar) in `web` to
   produce typed client code, replacing the temporary `src/lib/api.ts`.
4. **Enforce in CI** — fail the build if the generated client is out of date
   (the contract can never silently drift — NFR-M1).

## Once generated

- Link the rendered spec / Swagger UI here.
- Embed the spec in this docs site (MkDocs supports Swagger UI plugins).

## Related

- [API overview](overview.md) · [Frontend](../03-frontend/overview.md) · [ADR-001](../07-decisions/README.md)
