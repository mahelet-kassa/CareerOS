---
title: Error Handling
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# Error Handling

> **Status: stub.** Define the consistent error contract before the first real
> endpoint ships, so clients (and the generated TS client) can rely on it.

## To define

- **Error response shape** — recommend [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457)
  (`application/problem+json`) via a `@ControllerAdvice` global handler.
- **Error taxonomy** — validation (400), auth (401/403), not-found (404),
  conflict (409), server (500), upstream/LLM failure (502/503/504).
- **AI-specific failures** — how LLM timeouts/outages surface without leaking
  provider internals; ties to NFR-R1 (never break the core).
- **Correlation IDs** — echo a request ID in errors for tracing.
- **What is logged vs. returned** — never leak stack traces or PII to clients.

## Related

- [API overview](../06-api/overview.md) · [Observability](../01-architecture/observability.md)
