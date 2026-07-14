---
title: Prompts & Evals
status: stub
last-reviewed: 2026-07-14
owner: Mahelet
---

# Prompts & Evals

> **Status: stub.** Build out when the first generation flow lands. Treating
> prompts and evals as first-class engineering artifacts is what separates a
> reliable AI feature from a demo.

## Prompt strategy (to document)

- Prompt templates, versioned in the repo (prompts are code).
- System vs. task prompts; how retrieved context is injected.
- Guardrails against prompt injection (job descriptions are untrusted input).
- Output format contracts (structured output / JSON where needed).

## Eval harness (to build)

- **Golden set** of (input → expected-quality) examples.
- **Groundedness checks** — does output only use retrieved facts? (FR-4.3)
- **Regression evals** run in CI when prompts/models change.
- Metrics: groundedness, relevance, format validity, latency, cost.

## Guardrails

- Input sanitization for untrusted text.
- Output validation before it reaches the user.
- No fabrication of experience the user doesn't have.

## Related

- [RAG pipeline](rag-pipeline.md) · [Model strategy](model-strategy.md)
