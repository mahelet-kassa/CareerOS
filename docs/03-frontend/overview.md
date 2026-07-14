---
title: Frontend Overview (web)
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Frontend Overview — `web`

`web` is the Next.js (TypeScript) client. It's the only user-facing surface and
talks to `core-api` over REST using a generated client.

## Stack

- **Next.js ^15.3** (App Router) + **React 19** + **TypeScript ^5.5**.
- Server components + SSR for fast first paint; **SSE** for streaming AI output.
- **TanStack Query** for server state; **Tailwind + shadcn/ui**;
  **react-hook-form + Zod** (planned — see [design system](design-system.md),
  [state & data fetching](state-and-data-fetching.md)).
- Source of truth: `apps/web/package.json`, `tsconfig.json`.

## Current state (implemented)

- App Router skeleton: `src/app/layout.tsx`, `src/app/page.tsx`.
- Home page server-renders and calls `core-api`'s health endpoint as a
  liveness proof-of-wiring.
- `src/lib/api.ts` — a **temporary, hand-written** typed client. It exists only
  until the generated client replaces it (see below).

```
apps/web/src
├── app/
│   ├── layout.tsx        # root layout
│   └── page.tsx          # home (server component; reads API health)
└── lib/
    └── api.ts            # TEMP client → to be generated from OpenAPI
```

## The generated API client (planned, important)

Per [ADR-001](../07-decisions/README.md) and NFR-M1, the Java↔TypeScript contract
is **generated, never hand-maintained**: `core-api` emits an OpenAPI spec →
TypeScript types/client are generated for `web`. The current `api.ts` is a
deliberate placeholder. See [API overview](../06-api/overview.md).

## Rendering & data-fetching strategy

- Prefer **server components** for data reads (secrets/tokens stay server-side).
- Use **streaming** for AI-generated content so users see first tokens fast
  (NFR-P3).
- Details: [state-and-data-fetching](state-and-data-fetching.md).

## To document as UI is built

- [Component architecture](component-architecture.md)
- [Design system](design-system.md)
- Auth handling on the client (token storage, protected routes).

## Related

- [Architecture overview](../01-architecture/overview.md) · [API](../06-api/overview.md)
