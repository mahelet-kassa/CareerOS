---
title: Requirements (Functional & Non-Functional)
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Requirements

This page is the canonical **reference** for what CareerOS must do (functional)
and how well it must do it (non-functional / NFRs). Requirements are stated so
they can be verified.

Priority uses [MoSCoW](https://en.wikipedia.org/wiki/MoSCoW_method): **M**ust /
**S**hould / **C**ould / **W**on't (this cycle).

## Functional requirements

### FR-1 · Accounts & authentication
| ID | Requirement | Priority |
|---|---|---|
| FR-1.1 | A user can create an account and authenticate. | Must |
| FR-1.2 | Support password and OAuth providers (Google, GitHub). | Should |
| FR-1.3 | The API denies all requests by default; only explicitly public routes are open. | Must |

> Status: FR-1.3 is **implemented** (`SecurityConfig` deny-by-default). FR-1.1/1.2 pending.

### FR-2 · Profile & career history
| ID | Requirement | Priority |
|---|---|---|
| FR-2.1 | A user can create a structured profile (experience, skills, education). | Must |
| FR-2.2 | A user can upload a resume (PDF) and have it parsed into structured data. | Must |
| FR-2.3 | The profile is the single source of truth for AI-generated materials. | Must |

### FR-3 · Job catalog
| ID | Requirement | Priority |
|---|---|---|
| FR-3.1 | A user can save a job (title, company, description, URL). | Must |
| FR-3.2 | The system assesses fit between a job and the user's profile. | Should |

### FR-4 · Tailoring & generation (AI)
| ID | Requirement | Priority |
|---|---|---|
| FR-4.1 | Generate a resume tailored to a saved job, grounded in the user's real history. | Must |
| FR-4.2 | Generate a cover letter tailored to a saved job. | Should |
| FR-4.3 | Generated content must be traceable to source profile data (no fabrication). | Must |
| FR-4.4 | Long-running AI work does not block the request/response cycle. | Must |

### FR-5 · Application tracking
| ID | Requirement | Priority |
|---|---|---|
| FR-5.1 | A user can track an application's status through a defined lifecycle. | Must |
| FR-5.2 | A user can see all applications in one view. | Must |

### FR-6 · Data ownership
| ID | Requirement | Priority |
|---|---|---|
| FR-6.1 | A user can export all their data. | Should |
| FR-6.2 | A user can delete their account and all associated data. | Must |

## Non-functional requirements (NFRs)

NFRs are what separate a production system from a demo. Each is measurable.

### Performance
| ID | Requirement |
|---|---|
| NFR-P1 | Transactional (CRUD) API endpoints respond p95 < 300 ms. |
| NFR-P2 | pgvector similarity retrieval p95 < 200 ms (breach is an ADR-001 revisit trigger). |
| NFR-P3 | AI generation streams first token to the user in < 3 s. |

### Reliability & availability
| ID | Requirement |
|---|---|
| NFR-R1 | LLM provider latency or failure never takes down the transactional core. |
| NFR-R2 | Async jobs (parsing, embedding) are retried and survive worker restarts. |
| NFR-R3 | Liveness/readiness probes back safe rolling deploys. |

### Security & privacy
| ID | Requirement |
|---|---|
| NFR-S1 | Deny-by-default authorization; least privilege. |
| NFR-S2 | Secrets are never committed; injected via environment/secret store. |
| NFR-S3 | PII is identified and covered by the [data lifecycle](../05-data/data-lifecycle.md) policy. |
| NFR-S4 | All external traffic over TLS. |

### Scalability
| ID | Requirement |
|---|---|
| NFR-SC1 | `ai-service` is stateless and horizontally scalable. |
| NFR-SC2 | Embeddings are isolated so a dedicated vector store is a migration, not a redesign. |

### Maintainability & operability
| ID | Requirement |
|---|---|
| NFR-M1 | The Java↔TypeScript API contract is generated, never hand-maintained. |
| NFR-M2 | Every schema change is a forward-only Flyway migration. |
| NFR-M3 | CI must be green (build + tests + lint) before merge to `main`. |
| NFR-M4 | Structured logs, metrics, and traces exist for every service. |

### Cost
| ID | Requirement |
|---|---|
| NFR-C1 | LLM usage is measured per feature; caching reduces redundant calls. |
| NFR-C2 | Infrastructure runs within a solo-project budget. |

## Traceability

Requirements map to [User Stories](user-stories.md) and are realized per the
[Roadmap](roadmap.md). Decisions that shape these requirements are recorded as
[ADRs](../07-decisions/README.md).
