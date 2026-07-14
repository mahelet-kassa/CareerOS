---
title: Database Schema & ERD
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Database Schema & ERD

Reference for the CareerOS data model. The **source of truth is the Flyway
migrations** in `apps/core-api/src/main/resources/db/migration/`; this page
explains and visualizes them. When they diverge, the migrations win — update this
page.

## Current schema (V1)

The foundation deliberately ships with only `users` — every future entity hangs
off it. The `vector` (pgvector) extension is enabled up front so later migrations
can add embedding columns/tables without an infrastructure change.

```mermaid
erDiagram
    users {
        UUID id PK "default gen_random_uuid()"
        TEXT email UK "not null"
        TEXT auth_provider "not null, default 'password'"
        TIMESTAMPTZ created_at "not null, default now()"
        TIMESTAMPTZ updated_at "not null, default now()"
    }
```

### `users`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK, `gen_random_uuid()` |
| `email` | TEXT | unique, not null; indexed (`idx_users_email`) |
| `auth_provider` | TEXT | `'password'` \| `'google'` \| `'github'`; default `'password'` |
| `created_at` | TIMESTAMPTZ | default `now()` |
| `updated_at` | TIMESTAMPTZ | default `now()` |

## Conventions

- **UUID primary keys** (`gen_random_uuid()`) — no sequential/guessable IDs.
- **`TIMESTAMPTZ`** for all timestamps (always timezone-aware).
- **`created_at` / `updated_at`** on every table.
- **pgvector** enabled from V1; embeddings will live in their **own isolated
  table** (see [data lifecycle](data-lifecycle.md) and
  [RAG pipeline](../04-ai/rag-pipeline.md)) so the vector store can be swapped
  later.

## Planned tables (target model)

A **single RDS PostgreSQL** instance owns all domain data, with pgvector for
embeddings. As modules land ([backend](../02-backend/overview.md)), the model
grows toward:

```mermaid
erDiagram
    users ||--o{ profiles : has
    profiles ||--o{ experiences : contains
    profiles ||--o{ education : contains
    profiles ||--o{ skills : contains
    profiles ||--o{ evidence_items : "source-attributed facts"
    users ||--o{ job_postings : captures
    users ||--o{ applications : tracks
    job_postings ||--o| applications : "for"
    applications ||--o{ application_events : "append-only history"
    applications ||--o{ documents : "generated, versioned"
    profiles ||--o{ match_analyses : "vs postings (cached)"
    job_postings ||--o{ match_analyses : "vs profile (cached)"

    users { UUID id PK }
    profiles { UUID id PK  UUID user_id FK  int version }
    experiences { UUID id PK  UUID profile_id FK }
    education { UUID id PK  UUID profile_id FK }
    skills { UUID id PK  UUID profile_id FK }
    evidence_items { UUID id PK  UUID profile_id FK  TEXT source }
    job_postings { UUID id PK  UUID user_id FK  JSONB extracted }
    applications { UUID id PK  UUID user_id FK  UUID posting_id FK  TEXT status }
    application_events { UUID id PK  UUID application_id FK  TEXT type }
    documents { UUID id PK  UUID application_id FK  JSONB fact_lineage  int version }
    match_analyses { UUID id PK  UUID profile_id FK  UUID posting_id FK }
    embeddings { UUID id PK  TEXT entity_type  UUID entity_id  vector embedding  TEXT model }
```

### Table roles

| Table | Role |
|---|---|
| `users` | Account (implemented, V1). |
| `profiles` | Master profile; versioned (feeds match cache keys). |
| `experiences` / `education` / `skills` | Structured profile detail. |
| `evidence_items` | **Source-attributed facts** (from resume/GitHub) — the anchor for evidence-constrained generation. |
| `job_postings` | Raw text + AI-extracted requirements (JSONB). |
| `applications` | Pipeline state per applied posting. |
| `application_events` | **Append-only** outcome history (feeds insights). |
| `documents` | Generated resumes/cover letters, **versioned, with fact-lineage** (JSONB). |
| `match_analyses` | Cached per `(profile_version, posting_hash)`. |
| `embeddings` | `entity_type`, `entity_id`, `vector`, **`model` tag** — isolated for swap/re-embed. |

### Schema conventions (from the architecture doc)

- **JSONB** for AI-extracted payloads (schema evolves fast); **typed columns** for
  anything queried or joined.
- **Append-only events** for anything analytics will ever touch.
- **Soft deletes** except the GDPR hard-delete path.
- **Model-tag** on embeddings enables re-embedding migrations without a redesign.

> This is the **planned** direction, not yet migrated. Each table arrives via its
> own Flyway migration and this page is updated in the same PR.

## Related

- [Migrations](migrations.md) · [Data lifecycle & PII](data-lifecycle.md) · [Backend](../02-backend/overview.md)
