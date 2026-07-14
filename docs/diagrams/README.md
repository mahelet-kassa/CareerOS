---
title: Diagrams
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Diagrams

Diagrams are **code**, not binary images (see
[conventions](../CONVENTIONS.md#6-diagrams-as-code-mermaid--c4)).

- **Default:** inline [Mermaid](https://mermaid.js.org) in the page where the
  diagram is discussed (renders on GitHub and in the MkDocs site).
- **This folder:** for diagram sources that are **reused** across pages or are
  large enough to warrant their own file (`*.mmd`).

## Diagram inventory

| Diagram | Type | Lives in |
|---|---|---|
| System context (C4 L1) | graph | [architecture/overview](../01-architecture/overview.md) |
| Containers (C4 L2) | graph | [architecture/overview](../01-architecture/overview.md) |
| core-api components (C4 L3) | graph | [architecture/overview](../01-architecture/overview.md), [backend/overview](../02-backend/overview.md) |
| ERD | erDiagram | [data/schema](../05-data/schema.md) |
| Resume parse (async) | sequence | [ai/overview](../04-ai/overview.md) |
| Tailored generation (streaming) | sequence | [ai/overview](../04-ai/overview.md) |
| RAG pipeline | flowchart | [ai/rag-pipeline](../04-ai/rag-pipeline.md) |
| Auth flow | flowchart | [architecture/security](../01-architecture/security.md) |
| CI pipeline | flowchart | [engineering/development-workflow](../08-engineering/development-workflow.md) |
| Test pyramid | flowchart | [engineering/testing-strategy](../08-engineering/testing-strategy.md) |
| Deployment topology | *to add* | [operations/infrastructure](../09-operations/infrastructure.md) |
