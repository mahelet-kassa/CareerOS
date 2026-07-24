---
title: Project Changelog
status: current
last-reviewed: 2026-07-24
owner: Mahelet
audience: stakeholders
---

# Project Changelog

A **stakeholder-facing** record of what shipped, why it matters, and what comes
next. Written so you can brief non-technical partners without reading the code.

> **How we keep this honest:** every meaningful change (feature, infrastructure
> decision, milestone) gets an entry **in the same commit / PR** as the work.
> Newest entries at the top. Do not rewrite history — correct with a new entry.

**Related (deeper / more technical):**

- [Implementation Progress](implementation-progress.md) — engineering build journal
  (trade-offs, learnings, next technical steps)
- [Roadmap](../00-product/roadmap.md) — milestone plan
- Live docs site: <https://mahelet-kassa.github.io/CareerOS/>

## Entry template (copy for each change)

```markdown
## YYYY-MM-DD · Short title

**Audience summary**
1–3 sentences a stakeholder can quote: what changed and why it matters to the product.

**What shipped**
- Bullet list of concrete deliverables (features, docs, infra).

**Why it matters**
- Product / risk / portfolio impact in plain language.

**Status**
- Done | In progress | Blocked (and on what)

**Next**
- Immediate follow-ups stakeholders should expect.
```

---

## 2026-07-24 · Local full-stack runnable + Gradle wrapper

**Audience summary**  
CareerOS can now be run end-to-end on a developer machine: database in Docker,
API (Spring Boot), and web app (Next.js). Local setup is documented so demos
and development no longer depend only on CI.

**What shipped**
- Committed the **Gradle wrapper** for `core-api` (consistent builds locally and
  in CI — no reliance on whatever Gradle version happens to be installed).
- Mapped local Docker Postgres to host port **5433** so it does not conflict with
  other Postgres installs developers may already have.
- Confirmed Auth0 as the identity provider in [ADR-002](../adr/002-managed-auth.md)
  (GitHub social login without custom auth infrastructure).
- Introduced this **Project Changelog** for stakeholder communication.

**Why it matters**
- Reduces “works on my machine / only in CI” risk.
- Makes demos and onboarding predictable.
- Separates *stakeholder updates* (this page) from *engineering journal* detail.

**Status**  
Done for local runtime. Sign-in still needs an Auth0 tenant configured
(env vars) before login works in the browser.

**Next**
- Create Auth0 application (email + Google + GitHub sign-in) and verify login.
- Close Milestone 0, then start Milestone 1 — master profile + resume upload.

---

## 2026-07-15 · Authentication foundation (managed identity)

**Audience summary**  
Users will sign in through a managed identity provider (Auth0), not a
home-grown password system. Career history is too sensitive to improvise auth.

**What shipped**
- API validates secure login tokens (JWT / OIDC resource server).
- Web app runs the standard browser login flow (Auth.js); sessions in secure
  cookies, not browser storage hackable by scripts.
- Login page and route protection for the app shell.
- Decision recorded: Auth0, with GitHub evidence import kept as a *separate*
  connection in a later milestone (see ADR-002).

**Why it matters**
- Security posture suitable for PII and career data from day one.
- Innovation budget stays on the AI product, not on reinventing login.

**Status**  
Code wired. Provider tenant (Auth0 dashboard + env vars) still required.

**Next**  
Configure Auth0 and prove end-to-end sign-in.

---

## 2026-07-15 · App shell and documentation site

**Audience summary**  
The product has a navigable UI skeleton mapped to the MVP journey, and a public
engineering documentation site stakeholders and interviewers can browse.

**What shipped**
- Web UI foundation (Tailwind + shadcn/ui): landing page + app shell with
  Dashboard, Profile, Jobs, Applications, Insights, Settings.
- Each empty screen names the user story it will fulfill — a living roadmap in
  the product itself.
- Docs published at <https://mahelet-kassa.github.io/CareerOS/> (auto-updates on
  push to `main`).

**Why it matters**
- Makes progress visible without requiring a finished feature set.
- Documentation is a portfolio and stakeholder artifact, not an afterthought.

**Status**  
Done for foundation; feature screens still placeholders.

**Next**  
Auth tenant, then profile / resume upload (Milestone 1).

---

## 2026-07-14 · Project foundation (Milestone 0, partial)

**Audience summary**  
The repository, database, API skeleton, CI, and security baseline exist so every
later feature lands on a production-minded platform.

**What shipped**
- Monorepo: Spring Boot API + Next.js web app.
- Postgres + pgvector via Docker; schema migrations (Flyway).
- Deny-by-default API security; health checks for safe deploys.
- CI builds and tests on every push.
- Architecture decisions recorded (modular monolith + separate AI service).

**Why it matters**  
Avoids rebuilding the foundation later under schedule pressure.

**Status**  
Mostly done; auth tenant still open (see later entries).

**Next**  
Auth completion → master profile.
