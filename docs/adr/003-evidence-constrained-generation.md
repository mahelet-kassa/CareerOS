# ADR 003: Evidence-constrained generation + hybrid matching (structural, not prompt-based)

Date: 2026-07-14 · Status: Accepted

## Context

The seeker-copilot market is flooded with commoditized "LLM wrapper" tools that
generate plausible but unverifiable resume content ("AI slop"). Employer-side
machine screening is rising. CareerOS's durable differentiation is producing the
**application that is provably true** — every claim traceable to a real,
source-attributed fact. Prompt-only instructions ("don't make things up") are not
a reliable guarantee.

Separately, matching a profile to a posting must be accurate, cheap, and stable:
pure-LLM scoring is costly, slow, and unstable; pure-vector similarity cannot weigh
must-have vs. nice-to-have or reason about seniority.

## Decision

- **Evidence-constrained generation.** The LLM receives **only retrieved,
  source-attributed facts** and must reference a **fact ID per bullet**. A
  **validator rejects any output whose claims lack a supporting fact ID** and
  retries with feedback. The guardrail is **structural, not prompt-based**.
- **Hybrid, three-stage matching:** (1) hard filters, (2) hybrid retrieval
  (vector similarity + BM25 keyword), (3) LLM adjudication over top-k with
  structured output (weighted score, cited evidence, gaps).
- **Evals as gates.** Golden-set evals (parsing accuracy, fabrication rate, match
  stability within ±5) run in CI; prompt changes are treated like migrations.

## Consequences

- (+) A defensible, contrarian position ("provably true") aligned with where
  machine screeners are heading.
- (+) Each matching stage is independently testable; score drift is bounded.
- (−) More engineering than a single generation prompt (retrieval, validation,
  eval harness) — accepted as the core moat.
- Revisit triggers: validator false-reject rate harms UX, or eval costs become
  prohibitive.

## Related

- [AI overview](../04-ai/overview.md) · [RAG pipeline](../04-ai/rag-pipeline.md) · [Matching](../04-ai/matching.md) · [Prompts & evals](../04-ai/prompts-and-evals.md)
