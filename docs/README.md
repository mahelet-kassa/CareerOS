---
title: CareerOS Documentation
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# CareerOS — Engineering Documentation

The living technical knowledge base for CareerOS: an AI career platform and
single-player job-search copilot for software engineers.

This space documents **how CareerOS is built, and why** — from product vision to
runtime operations. It is written as [docs-as-code](08-engineering/development-workflow.md):
plain Markdown living beside the source, reviewed in the same pull requests as the
code it describes, and published as a browsable site.

> **New here?** Read [Product Vision](00-product/vision.md), then
> [Architecture Overview](01-architecture/overview.md). That's the 15-minute
> orientation to the whole system.

## Map of the space

| Section | What lives here |
|---|---|
| [00 · Product](00-product/vision.md) | Vision, personas, requirements, user stories, MVP scope, roadmap — the *why* and *what* |
| [01 · Architecture](01-architecture/overview.md) | System-level design, C4 diagrams, tech stack, security, observability |
| [02 · Backend](02-backend/overview.md) | `core-api` (Spring Boot) module map, boundaries, standards |
| [03 · Frontend](03-frontend/overview.md) | `web` (Next.js) architecture, components, data fetching |
| [04 · AI](04-ai/overview.md) | `ai-service` orchestration, RAG pipeline, prompts, evals, model strategy |
| [05 · Data](05-data/schema.md) | Database schema, ERD, migrations, data lifecycle |
| [06 · API](06-api/overview.md) | REST conventions, versioning, the generated OpenAPI contract |
| [07 · Decisions](07-decisions/README.md) | Architecture Decision Records (ADRs) |
| [08 · Engineering](08-engineering/development-workflow.md) | Workflow, testing strategy, build journal, deployment |
| [09 · Operations](09-operations/runbook.md) | Runbook, infrastructure topology |

## How this documentation is organized

Pages follow three complementary conventions used by professional engineering
teams. See [Documentation Conventions](CONVENTIONS.md) for the full standard.

- **[Diátaxis](https://diataxis.fr)** for page *type* — tutorial, how-to,
  reference, or explanation. We don't mix types on one page.
- **[arc42](https://arc42.org)** for the *architecture* section skeleton.
- **[C4 model](https://c4model.com)** for diagrams — Context → Container →
  Component → Code, rendered as [Mermaid](https://mermaid.js.org).

## Page status legend

Every page carries front-matter with a `status`:

| Status | Meaning |
|---|---|
| `current` | Accurate and reviewed against the code |
| `draft` | Being written; may be incomplete |
| `stub` | Placeholder/template — content pending the relevant milestone |
| `stale` | Known to be out of date; do not trust until reviewed |

## Contributing

Documentation changes ship in the **same pull request** as the code they
describe. See [Development Workflow](08-engineering/development-workflow.md) and
[Documentation Conventions](CONVENTIONS.md).
