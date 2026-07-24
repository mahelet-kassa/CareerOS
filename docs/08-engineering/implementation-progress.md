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

## 2026-07-24 · Local full stack + Gradle wrapper + stakeholder changelog

**Shipped**
- Gradle wrapper (`gradlew` / 8.10) committed under `apps/core-api`; CI now runs
  `./gradlew build` instead of a pinned system Gradle.
- Docker Compose publishes Postgres on host **5433** (container still 5432) to
  avoid collisions with a pre-existing Windows Postgres on 5432.
- [ADR-002](../adr/002-managed-auth.md) amended: provider fixed to **Auth0**
  (native GitHub IdP; Cognito would have needed a custom OIDC shim).
- New stakeholder [Project Changelog](changelog.md); conventions require a
  changelog + journal entry on every meaningful change.

**Why these choices**
- *Wrapper in-repo* removes "which Gradle?" drift between laptops and CI.
- *5433 mapping* keeps CareerOS portable without forcing developers to uninstall
  unrelated local databases.
- *Separate changelog vs journal* so outside stakeholders get plain-language
  updates without drowning in engineering detail.

**Learnings / notes**
- On this machine Oracle TNSLSNR owns port 8080 — run `core-api` with
  `SERVER_PORT=8081` and point `apps/web/.env.local` `API_BASE_URL` at it
  (local-only; not committed).

**Next**
- Auth0 tenant + env vars; verify login round trip.
- Milestone 1: profile module.

---

## 2026-07-15 · Auth wiring — OIDC resource server + Auth.js code flow

**Shipped**
- `core-api` is now a stateless OAuth2 **resource server** (ADR-002):
  `spring-boot-starter-oauth2-resource-server` added, `SecurityConfig` validates
  bearer JWTs via JWKS discovered from `OIDC_ISSUER_URI`. Health stays public;
  everything else still denied by default.
- `web` runs the OIDC **authorization-code flow** via Auth.js v5: generic OIDC
  provider from env vars (works with Cognito or Auth0 unchanged), JWT sessions
  in httpOnly cookies, access token exposed server-side for core-api calls.
- Middleware guards all `(app)` routes → redirects to `/login` with a
  `callbackUrl`. Login page + `UserMenu` (sign in/out) in the app shell.
- `.env.example` documents required auth env vars.

**Why these choices**
- *Provider-agnostic issuer discovery* so the Cognito-vs-Auth0 call (ADR-002
  leaves both open) is a config change, not a code change.
- *Guard passes through while unconfigured* so the shell stays browsable in
  local dev before a tenant exists — safe because core-api denies all data
  requests regardless.

**Learnings / notes**
- Auth.js needs `AUTH_SECRET` at runtime; an insecure fallback keeps dev/CI
  builds green and MUST be overridden in production (flagged in `.env.example`).

**Next**
- Create the provider tenant (Cognito user pool or Auth0 app) with Google +
  GitHub connections, set env vars, verify the full round trip end-to-end.
- Then Milestone 1: the `profile` module.

---

## 2026-07-15 · Frontend foundation — component architecture + app shell

**Shipped**
- [Component architecture](../03-frontend/component-architecture.md) promoted
  from stub to current: route map for the MVP journey, feature-based folder
  structure, component inventory (server/client split), loading/error/empty
  conventions, accessibility baseline.
- Tailwind CSS v4 + shadcn/ui installed in `web` (button, card, badge, skeleton,
  separator primitives; neutral theme with light/dark tokens).
- App Router restructured into route groups: `(marketing)` landing page and
  `(app)` authenticated shell with sidebar navigation.
- Placeholder pages for all six MVP surfaces (dashboard, profile, jobs,
  applications, insights, settings), each with `PageHeader` + `EmptyState`
  pointing at the user story it will serve.
- Docs site deployed to GitHub Pages: <https://mahelet-kassa.github.io/CareerOS/>.

**Why these choices**
- *Feature-based folders with routes-stay-thin* so domain code is testable and
  routes are just composition — the structure scales without churn.
- *No global store* reaffirmed; TanStack Query + URL state until a concrete need
  (candidate: tailoring draft state, Milestone 4).
- *Empty states name their user story* so the skeleton doubles as a map of what
  to build next.

**Learnings / notes**
- Evaluated pivoting to Vite + Supabase + Vercel (external planning prompt);
  decided to keep Next.js + Spring Boot + AWS — Milestone 0 is already shipped
  and the ADR trail is the portfolio's differentiator. Adopted the prompt's
  step-by-step method instead.

**Next**
- Managed auth (ADR-002) to close out Milestone 0, then the `profile` module
  (Milestone 1) with resume upload behind the `(app)` shell.

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
