---
title: State & Data Fetching
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# State & Data Fetching

> **Status: stub.** Establish patterns when real endpoints exist.

## Principles (proposed)

- **Read on the server** where possible (server components) — keeps tokens off
  the client and improves first paint.
- **Use the generated client** for all `core-api` calls (no hand-written fetch
  wrappers beyond the temporary `api.ts`).
- **Stream AI responses** to the UI for perceived speed (NFR-P3).

## To decide / document

- Client-state library (if any) vs. server components + `fetch` cache.
- Caching/revalidation strategy (`cache`, `revalidate`).
- Mutations and optimistic updates.
- Error/loading conventions tied to the [error contract](../02-backend/error-handling.md).

## Related

- [Frontend overview](overview.md) · [API overview](../06-api/overview.md)
