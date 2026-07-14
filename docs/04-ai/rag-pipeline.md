---
title: RAG Pipeline
status: draft
last-reviewed: 2026-07-14
owner: Mahelet
---

# RAG Pipeline

Retrieval-Augmented Generation is how CareerOS keeps AI output **grounded** in
the user's real experience (FR-4.3). This page explains the pipeline; the
sequence diagrams live in [AI overview](overview.md).

## Why RAG here

The user's career history can be large and specific. Rather than stuffing
everything into every prompt (costly, lossy, and it drifts), we **retrieve** the
most relevant pieces for the task at hand and ground the LLM on those.

## Pipeline stages

```mermaid
flowchart LR
    subgraph Ingest (async)
        A[Resume / profile text] --> B[Chunk]
        B --> C[Embed]
        C --> D[(pgvector<br/>embeddings table)]
    end
    subgraph Query (sync)
        E[Task: tailor to job X] --> F[Embed query]
        F --> G[Similarity search top-k]
        D --> G
        G --> H[Assemble grounded prompt]
        H --> I[LLM generate]
    end
```

### 1. Chunking
Split profile/resume content into semantically meaningful units (roles, bullet
points, skills). Chunk size/overlap: **to tune** — record the choice.

### 2. Embedding
Generate vectors per chunk via the embedding model. Stored in an **isolated**
pgvector table (see [data lifecycle](../05-data/data-lifecycle.md)) so the
embedding store can be swapped later without touching domain tables.

### 3. Retrieval
Embed the query (e.g., the job description), run pgvector similarity search for
top-k chunks. Target: **p95 < 200 ms** (NFR-P2) — breaching this sustained is an
[ADR-001](../07-decisions/README.md) revisit trigger.

### 4. Grounded generation
Assemble a prompt combining the job, the retrieved chunks, and instructions;
generate with streaming. Output must be traceable to retrieved sources.

## Decisions to record (as ADRs when made)

- Embedding model + dimensionality.
- Chunking strategy and parameters.
- Distance metric + index type (HNSW/IVFFlat) and tuning.
- top-k and re-ranking (if any).
- How groundedness is verified (see [evals](prompts-and-evals.md)).

## Related

- [AI overview](overview.md) · [Prompts & evals](prompts-and-evals.md) · [Schema](../05-data/schema.md)
