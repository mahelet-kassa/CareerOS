---
title: System Design (Deep Dive)
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# System Design (Deep Dive)

> **Status: stub.** Expand as subsystems land. The high-level view is in
> [Architecture Overview](overview.md); this page holds the deeper design
> reasoning, scaling posture, and failure handling.

## To document here

- **Component-level design (C4 L3)** for each `core-api` module as it's built.
- **Async processing design** — SQS topology, worker idempotency, retry/backoff,
  dead-letter handling (NFR-R2).
- **Streaming design** — how AI tokens stream from `ai-service` through
  `core-api` to the Next.js client.
- **Scaling posture** — what scales horizontally (`ai-service`, workers) vs.
  vertically (Postgres), and the [ADR-001](../07-decisions/README.md) revisit
  triggers.
- **Failure modes & degradation** — behavior when the LLM provider is slow/down,
  when the queue backs up, when pgvector is slow.
- **Consistency model** — where eventual consistency is acceptable (embeddings)
  vs. required (application status).

## Template for each subsystem

```
### <Subsystem>
- Responsibility:
- Inputs / outputs:
- Data owned:
- Failure modes & handling:
- Diagram (Mermaid):
```
