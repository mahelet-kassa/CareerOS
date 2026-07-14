---
title: Architecture Decision Records
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Architecture Decision Records (ADRs)

ADRs capture **significant, hard-to-reverse decisions and the reasoning behind
them** — the context that's most expensive to lose. They are the highest-value,
lowest-effort documentation a project can keep.

> **Location note:** the ADR files themselves live in `docs/adr/` (as promised in
> the repo README convention). This page is the index and the process. New ADRs
> go in `docs/adr/`.

## Principles

- Write an ADR **when you make the decision**, not months later.
- ADRs are **immutable once `Accepted`.** You don't rewrite them — you write a new
  ADR that **supersedes** the old one, and mark the old one `Superseded by ADR-N`.
- One decision per ADR. Keep it short: context → decision → consequences.
- Format: [MADR](https://adr.github.io/madr/)-style Markdown.

## Index

| ADR | Title | Status | Date |
|---|---|---|---|
| [001](../adr/001-monolith-plus-ai-service.md) | Modular monolith (Spring Boot) + one AI service (Node), not microservices | Accepted | 2026-07-14 |
| [002](../adr/002-managed-auth.md) | Managed auth (Cognito/Auth0) + Spring resource server, not custom auth | Accepted | 2026-07-14 |
| [003](../adr/003-evidence-constrained-generation.md) | Evidence-constrained generation + hybrid matching (structural, not prompt-based) | Accepted | 2026-07-14 |

## When does something need an ADR?

Yes, if it's costly to reverse or shapes the system: architecture style, datastore
choice, auth model, service boundaries, API versioning scheme, embedding/vector
strategy, deployment topology.

No, if it's easily reversible or local: naming, formatting, a single endpoint's
shape.

## Template

Copy this into `docs/adr/<nnn>-<slug>.md`:

```markdown
# ADR <nnn>: <short decision title>

Date: YYYY-MM-DD · Status: Proposed | Accepted | Superseded by ADR-<n>

## Context
<The forces at play: technical, product, team, constraints. Why a decision is needed now.>

## Decision
<The choice made, stated plainly.>

## Consequences
- (+) <positive outcome>
- (−) <cost / trade-off accepted>
- Revisit triggers: <measurable conditions that would reopen this>
```

## Related

- [Architecture overview](../01-architecture/overview.md) · [Principles & constraints](../01-architecture/principles-and-constraints.md)
