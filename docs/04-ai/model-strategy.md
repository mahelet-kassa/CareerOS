---
title: Model Strategy
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# Model Strategy

> **Status: stub.** Decide and record as an ADR when the AI service is built.

## To decide / document

- **Providers & models** — generation model(s), embedding model, and why.
- **Abstraction** — a provider-agnostic interface so models can be swapped
  (cost/quality) without touching callers.
- **Fallback** — behavior when the primary provider is degraded (NFR-R1).
- **Caching** — cache embeddings and (where safe) generations to cut cost
  (NFR-C1).
- **Cost controls** — per-feature usage metering, budgets, rate limits.
- **Data handling** — provider data-retention settings; no training on user data.

## Related

- [AI overview](overview.md) · [RAG pipeline](rag-pipeline.md) · [Requirements — cost](../00-product/requirements.md)
