---
title: Data Lifecycle & PII
status: draft
last-reviewed: 2026-07-14
owner: Mahelet
---

# Data Lifecycle & PII

How user data enters, lives in, and leaves the system. CareerOS holds sensitive
career data, so this is a first-class concern (NFR-S3, FR-6).

## Data classification

| Data | Sensitivity | Notes |
|---|---|---|
| Email, identity | PII | auth |
| Resume / profile (experience, education) | PII, sensitive | core asset |
| Uploaded resume files | PII | raw storage |
| Embeddings | Derived from PII | isolated table |
| Jobs saved | Low | user-provided |
| Applications | Personal | pipeline state |

## Embeddings isolation

Embeddings live in a **dedicated table**, separate from domain tables. Rationale
([ADR-001](../07-decisions/README.md)):

- A future swap to a dedicated vector DB is a migration, not a redesign.
- Regenerating embeddings (new model) doesn't touch domain data.
- Deleting a user cascades cleanly to their vectors.

## Retention & deletion (to finalize)

> **Status: draft.** Finalize before handling real user data.

- **Account deletion (FR-6.2):** hard-delete user + all owned rows (profiles,
  files, embeddings, jobs, applications).
- **Export (FR-6.1):** machine-readable export of all user-owned data.
- **Raw file retention:** decide how long uploaded resumes are kept.
- **LLM provider data:** ensure no training on user data; document provider
  retention (see [model strategy](../04-ai/model-strategy.md)).

## Related

- [Schema](schema.md) · [Security](../01-architecture/security.md) · [RAG pipeline](../04-ai/rag-pipeline.md)
