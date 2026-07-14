---
title: Backend Coding Standards
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# Backend Coding Standards

> **Status: stub.** Codify conventions as patterns emerge; keep this short and
> enforceable (prefer automated checks over prose).

## Established so far

- **Java 21**, Spring Boot 3.
- **Flyway owns the schema**; JPA is `validate` only.
- **`open-in-view: false`** — map entities to DTOs explicitly; no lazy loading at
  the controller layer.
- **Deny-by-default security** — endpoints authenticated unless explicitly public.

## To define

- Layering (controller → service → repository) and where business rules live.
- DTO / mapping strategy.
- Validation approach (`spring-boot-starter-validation`).
- Naming conventions, package structure within a module.
- Nullability / `Optional` usage.
- Formatting/linting tool (e.g. Spotless) wired into CI.

## Related

- [Module boundaries](module-boundaries.md) · [Error handling](error-handling.md)
