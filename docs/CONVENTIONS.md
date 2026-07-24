---
title: Documentation Conventions
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Documentation Conventions

The rules that keep this knowledge base trustworthy and consistent. If a rule
here conflicts with what's easy, follow the rule — stale or duplicated docs are
worse than no docs.

## 1. Docs-as-code

- Docs live in `docs/` as Markdown, versioned in git.
- A change to behavior updates the relevant doc **in the same pull request**.
  The PR template carries a "Docs updated (or N/A)" checkbox.
- Docs are reviewed like code.

## 2. Front-matter on every page

```yaml
---
title: Human-readable page title
status: current | draft | stub | stale
last-reviewed: YYYY-MM-DD
owner: <name>
---
```

`last-reviewed` is bumped whenever someone confirms the page still matches
reality — not only when the prose changes.

## 3. One canonical source per fact — link, never duplicate

If a fact (a config value, an endpoint, a decision) appears in two places, one
of them will rot. Pick the canonical home and link to it everywhere else.

## 4. Generate what you can; hand-write only judgment

- The **OpenAPI spec** is generated from `core-api` controllers.
- The **TypeScript API client** is generated from that spec.
- The **ERD** is generated/derived from the schema.

Hand-write only the *why* — rationale, trade-offs, context. Machines keep the
*what* honest.

## 5. Page types (Diátaxis)

Keep a single page to one type:

| Type | Answers | Example |
|---|---|---|
| Tutorial | "teach me by doing" | first-run local setup |
| How-to | "help me do X" | "add a Flyway migration" |
| Reference | "tell me the facts" | schema tables, NFRs |
| Explanation | "help me understand" | why the RAG pipeline is async |

## 6. Diagrams as code (Mermaid + C4)

- All diagrams are text (Mermaid) committed to git, not binary images.
- Follow the [C4 model](https://c4model.com) levels for architecture diagrams.
- Diagram source lives inline in the page, or in `docs/diagrams/` when reused.

## 7. Decisions become ADRs

Every significant, hard-to-reverse decision gets an [ADR](07-decisions/README.md)
at the moment it's made. ADRs are immutable once `Accepted`; you *supersede*
them, you don't rewrite them.

## 8. Maintenance rhythm

- **Per PR:** touch affected docs.
- **Per milestone:** review pages in the touched sections, bump `last-reviewed`
  or mark `stale`.
- **Every meaningful change ships with two doc updates in the same commit/PR:**
  1. **[Project Changelog](08-engineering/changelog.md)** — stakeholder-facing
     (what / why / status / next). Use this when briefing partners, managers, or
     interviewers who should not need to read code.
  2. **[Implementation Progress](08-engineering/implementation-progress.md)** —
     engineering journal (trade-offs, learnings, technical next steps).
- Skip the changelog only for pure chore commits with no product or process
  impact (typos, formatting). When in doubt, add an entry.
