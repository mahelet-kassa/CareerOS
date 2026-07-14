---
title: Model Strategy
status: draft
last-reviewed: 2026-07-14
owner: Mahelet
source: docs/product/03_Technical_Architecture.docx (migrated)
---

# Model Strategy

## Model routing (by task)

Route each task to the cheapest model that does the job well:

| Task | Model tier |
|---|---|
| Resume extraction, embeddings | Cheap/fast (e.g. `gpt-4o-mini` class) |
| Match reasoning (adjudication) | Strongest |
| Resume/cover-letter generation | Strongest |

Track **cost per user per feature** (NFR-C1) and enforce **quotas/rate limits**
(abuse = the LLM bill, NFR-C2).

## Provider abstraction

A **thin provider abstraction** over the LLM API — *not for elegance, for the day
a better/cheaper model ships.* Start with the OpenAI API.

## Data handling

- **Zero-data-retention** flags enabled; **user data never used for training.**
- Document provider retention settings alongside the
  [data lifecycle](../05-data/data-lifecycle.md).

## To decide / record as ADRs

- Concrete model choices + dimensionality for embeddings.
- Fallback behavior when the primary provider is degraded (NFR-R1).
- Caching strategy for embeddings and (where safe) generations.

## Related

- [AI overview](overview.md) · [RAG pipeline](rag-pipeline.md) · [Requirements — cost](../00-product/requirements.md)
