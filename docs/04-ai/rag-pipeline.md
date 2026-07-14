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

### 3. Retrieval (hybrid)
**Hybrid retrieval = vector similarity + BM25 keyword** over source-attributed
facts. Vectors catch semantics; keywords catch exact-tech requirements vectors
blur. Target: **p95 < 200 ms** (NFR-P2) — breaching this sustained is an
[ADR-001](../07-decisions/README.md) revisit trigger. The full three-stage
scoring flow is in [Matching](matching.md).

### 4. Constrained generation (the guardrail)
The LLM receives **only the retrieved facts** as source material and must
reference **fact IDs per bullet**. A **validator rejects any output whose claims
lack a supporting fact ID** and retries with feedback. This is a **structural
guardrail, not a prompt** — the core anti-slop mechanism
([ADR-003](../adr/003-evidence-constrained-generation.md), FR-4.3). Generation
streams via SSE (first token < 3 s, NFR-P3).

## Decisions to record (as ADRs when made)

- Embedding model + dimensionality.
- Chunking strategy and parameters.
- Distance metric + index type (HNSW/IVFFlat) and tuning.
- top-k, hybrid weighting (vector vs. BM25), and re-ranking (if any).
- How groundedness/fabrication is verified (see [evals](prompts-and-evals.md)).

## Related

- [AI overview](overview.md) · [Prompts & evals](prompts-and-evals.md) · [Schema](../05-data/schema.md)
