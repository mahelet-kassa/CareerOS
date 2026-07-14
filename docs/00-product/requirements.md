---
title: Requirements (Functional & Non-Functional)
status: current
last-reviewed: 2026-07-14
owner: Mahelet
source: docs/product/02_MVP_Specification.docx (migrated)
---

# Requirements

Canonical **reference** for what CareerOS must do (functional) and how well
(non-functional / NFRs). Stated so they can be verified. Priority uses
[MoSCoW](https://en.wikipedia.org/wiki/MoSCoW_method): **M**ust / **S**hould /
**C**ould / **W**on't (this cycle).

## Functional requirements

### FR-1 · Accounts & authentication
| ID | Requirement | Priority |
|---|---|---|
| FR-1.1 | A user can create an account (email/password) and authenticate. | Must |
| FR-1.2 | Support Google OAuth and GitHub OAuth (GitHub also grants evidence import). | Must |
| FR-1.3 | The API denies all requests by default; only explicitly public routes are open. | Must |
| FR-1.4 | Account settings; data export and account/data deletion (GDPR). | Must |

> Status: FR-1.3 **implemented** (`SecurityConfig`). Auth via managed provider — see [ADR-002](../adr/002-managed-auth.md).

### FR-2 · Master profile (import once)
| ID | Requirement | Priority |
|---|---|---|
| FR-2.1 | Upload a resume (PDF **or DOCX**, ≤10 MB); AI parses it into structured data. | Must |
| FR-2.2 | Connect GitHub; import repos, languages, and activity as **evidence items**. | Must |
| FR-2.3 | User reviews and corrects parsed data (human-in-the-loop). | Must |
| FR-2.4 | The master profile (experience, education, skills, evidence) is the single source of truth for generation. | Must |
| FR-2.5 | Every profile fact is **source-attributed** (traceable to resume text or GitHub). | Must |

### FR-3 · Job capture & match analysis
| ID | Requirement | Priority |
|---|---|---|
| FR-3.1 | Capture a job by pasting text or a URL; AI extracts title, company, skills, requirements. | Must |
| FR-3.2 | Produce a **match analysis**: score + matched evidence + gap list + "what to emphasize," with rationale. | Must |
| FR-3.3 | Match analyses are cached per `(profile_version, posting_hash)`. | Should |

### FR-4 · Tailoring & generation (AI)
| ID | Requirement | Priority |
|---|---|---|
| FR-4.1 | Generate a resume tailored to a job; **every bullet references a supporting fact ID**. | Must |
| FR-4.2 | Generate a tailored cover letter. | Must |
| FR-4.3 | A validator **rejects any output whose claims lack a supporting fact** (structural anti-fabrication). | Must |
| FR-4.4 | Long-running AI work never blocks the request/response cycle. | Must |
| FR-4.5 | Edit and export generated documents to **PDF and DOCX**. | Must |

### FR-5 · Application tracking
| ID | Requirement | Priority |
|---|---|---|
| FR-5.1 | Track an application through a status pipeline (applied → screen → interview → offer/rejected). | Must |
| FR-5.2 | See all applications in one view (**kanban + list**); notes and reminders. | Must |
| FR-5.3 | Applications are auto-added to the tracker on generation. | Should |

### FR-6 · Outcomes & insights (the moat)
| ID | Requirement | Priority |
|---|---|---|
| FR-6.1 | Log outcomes per application via an append-only event history. | Must |
| FR-6.2 | After ~10 applications, show **personal insights** (e.g. response rate by resume variant, seniority, skill emphasis). | Must |

### FR-7 · Data ownership
| ID | Requirement | Priority |
|---|---|---|
| FR-7.1 | Export all user data (machine-readable). | Must |
| FR-7.2 | Delete account and all associated data across DB, S3, vectors, and events. | Must |

## Non-functional requirements (NFRs)

### Performance
| ID | Requirement |
|---|---|
| NFR-P1 | Transactional (CRUD) API endpoints respond p95 < 300 ms. |
| NFR-P2 | pgvector similarity retrieval p95 < 200 ms (breach is an [ADR-001](../07-decisions/README.md) revisit trigger). |
| NFR-P3 | AI generation streams first token to the user in < 3 s (SSE). |
| NFR-P4 | Resume parsing completes < 60 s with progress feedback. |
| NFR-P5 | Match score drift within ±5 on identical input (eval-enforced). |

### Reliability & availability
| ID | Requirement |
|---|---|
| NFR-R1 | LLM provider latency/failure never takes down the transactional core. |
| NFR-R2 | Async jobs are idempotent, retried with backoff, and use DLQs with alerting. |
| NFR-R3 | Liveness/readiness probes back safe rolling deploys. |

### Security & privacy
| ID | Requirement |
|---|---|
| NFR-S1 | Deny-by-default authorization; per-user data scoping enforced in one place (repo-layer / RLS) — IDOR is the top risk. |
| NFR-S2 | Secrets in a secret store; never committed. |
| NFR-S3 | Encrypt at rest (KMS) and in transit; field-level encryption for the most sensitive PII. |
| NFR-S4 | Treat job postings as untrusted input; prompt-injection filtering before any generation context. |
| NFR-S5 | Audit log on auth and data-export events; ClamAV virus-scan on uploads. |

### Scalability
| ID | Requirement |
|---|---|
| NFR-SC1 | All services stateless on ECS Fargate; horizontal scaling is configuration. |
| NFR-SC2 | Queues absorb AI burstiness; workers autoscale on queue depth. |
| NFR-SC3 | Embeddings isolated (with model tag) so a vector-store swap is a migration, not a redesign. |

### Maintainability & operability
| ID | Requirement |
|---|---|
| NFR-M1 | The Java↔TypeScript API contract is generated from OpenAPI, never hand-maintained. |
| NFR-M2 | Every schema change is a forward-only Flyway migration. |
| NFR-M3 | CI green (build + tests + lint + evals) before merge to `main`. |
| NFR-M4 | Structured logs, metrics, traces per service. |

### Cost
| ID | Requirement |
|---|---|
| NFR-C1 | Track LLM cost per user per feature; cache cacheable results; route by task. |
| NFR-C2 | Enforce generation quotas/rate limits (abuse = the LLM bill). |

## Traceability

Requirements map to [User Stories](user-stories.md), are scoped in
[MVP Scope](mvp-scope.md), sequenced in the [Roadmap](roadmap.md), and their
decisions recorded as [ADRs](../07-decisions/README.md).
