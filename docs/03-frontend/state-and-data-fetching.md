---
title: State & Data Fetching
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# State & Data Fetching

> **Status: stub.** Establish patterns when real endpoints exist.

## Decided approach (from the architecture doc)

- **Server components for data-heavy read pages** (tracker, insights) — keeps
  tokens off the client and improves first paint. **Client components for
  interactive editors** (profile, resume editor).
- **TanStack Query** for server state. **Avoid a global store** — URL + query
  cache covers nearly everything. Zustand only if genuinely needed.
- **SSE** for AI job progress and token streaming into the resume editor — simpler
  than WebSockets through an ALB, and one-directional is all we need (NFR-P3).
- **Use the generated client** for all `core-api` calls (no hand-written fetch
  wrappers beyond the temporary `api.ts`).
- **react-hook-form + Zod** for forms/validation (Zod schemas generated from
  OpenAPI where possible).

## To decide / document

- Caching/revalidation strategy (`cache`, `revalidate`) per view.
- Mutations and optimistic updates.
- Error/loading conventions tied to the [error contract](../02-backend/error-handling.md).

## Related

- [Frontend overview](overview.md) · [API overview](../06-api/overview.md)
