---
title: Module Boundaries
status: draft
last-reviewed: 2026-07-14
owner: Mahelet
---

# Module Boundaries

The modular monolith's value comes entirely from **enforced** boundaries. Without
enforcement, a monolith degrades into a big ball of mud and the "future
extraction seams" from [ADR-001](../07-decisions/README.md) close up.

## The rule

Modules (`auth`, `profile`, `catalog`, `tracking`) communicate only through
explicit public interfaces — never by reaching into each other's internal classes
or database tables. Each module owns its tables.

## Enforcement options (to decide)

> **Status: draft.** Pick and record the mechanism as an ADR when the first
> cross-module dependency appears.

- **Spring Modulith** — verifies module boundaries and can generate module
  documentation/diagrams from the code. Strong fit for this architecture.
- **ArchUnit tests** — assert package-dependency rules in CI.
- **Package-private visibility** — expose only interfaces at the package root.

## Ownership matrix (to fill in as modules land)

| Module | Owns tables | Public API | May depend on |
|---|---|---|---|
| auth | users, (identities) | AuthN facade | config |
| profile | profiles, resumes, embeddings | ProfileService | config, auth |
| catalog | jobs | CatalogService | config, auth |
| tracking | applications | TrackingService | config, auth, catalog |

## Related

- [Backend overview](overview.md) · [ADR-001](../07-decisions/README.md)
