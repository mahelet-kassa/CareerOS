---
title: Component Architecture
status: current
last-reviewed: 2026-07-15
owner: Mahelet
---

# Component Architecture

How `web` is organized: routes, layouts, feature modules, and shared UI. This is
the target structure — build toward it, don't scaffold it all empty up front.

## Route map (from the MVP journey)

Next.js App Router with three route groups. Route groups keep the URL clean while
giving each surface its own layout.

```
/                        (marketing)   Landing — value prop, sign-in CTA
/login /signup /callback (auth)        OIDC flow pages (ADR-002)
/dashboard               (app)         Next-action summary, pipeline glance
/onboarding              (app)         Resume upload → GitHub connect → review (US-A1, US-A2)
/profile                 (app)         Master profile editor (US-A1)
/jobs                    (app)         Saved jobs list
/jobs/new                (app)         Paste posting text/URL (US-B1)
/jobs/[id]               (app)         Job detail + match analysis (US-B2)
/jobs/[id]/tailor        (app)         Streaming resume/cover-letter studio (US-C1, US-C2)
/applications            (app)         Tracker — kanban + list (US-D1)
/insights                (app)         Personal insights after ~10 apps (US-E1)
/settings                (app)         Account, data export/delete (US-F1)
```

Everything in `(app)` sits behind the auth guard in `(app)/layout.tsx`.

## Folder structure

Feature-based: route files stay thin (compose + fetch), the real code lives in
`features/`. A feature may import from `components/` and `lib/`, never from
another feature — cross-feature needs go through `lib/` or get promoted to
`components/shared/`.

```
apps/web/src
├── app/                      # Routes ONLY — thin server components
│   ├── (marketing)/          #   landing
│   ├── (auth)/               #   login / signup / callback
│   └── (app)/                #   authenticated shell (layout.tsx = AppShell)
├── components/
│   ├── ui/                   # shadcn/ui primitives (generated; don't hand-edit)
│   └── shared/               # app-wide composites: PageHeader, EmptyState,
│                             #   ErrorState, LoadingSkeleton, ConfirmDialog, StatusBadge
├── features/                 # One folder per domain feature
│   ├── profile/              # editor sections, review-and-correct flow
│   ├── evidence/             # GitHub import, evidence item cards
│   ├── jobs/                 # capture form, job cards, requirement list
│   ├── matching/             # score gauge, evidence matches, gap list
│   ├── tailoring/            # streaming editor, claim→fact trace, export
│   ├── tracker/              # kanban board, list view, status controls
│   └── insights/             # charts, funnel stats
│       └── <feature>/        # each contains:
│           ├── components/   #   feature components
│           ├── hooks/        #   TanStack Query hooks (useProfile, useMatch…)
│           └── types.ts      #   until generated types replace them (NFR-M1)
├── hooks/                    # cross-feature hooks (useMediaQuery, useSSE)
├── lib/                      # api client (generated), auth helpers, utils, cn()
└── styles/                   # globals.css, design tokens
```

## Component inventory

Legend: **S** = server component, **C** = client component. Rule: server by
default; go client only for interactivity, browser APIs, or streaming.

### Layout

| Component | Kind | Purpose | Reusable |
|---|---|---|---|
| `AppShell` | S | Sidebar + topbar + content area for all `(app)` routes | app-wide |
| `SidebarNav` | C | Primary nav, active-route highlight, collapse on mobile | app-wide |
| `UserMenu` | C | Avatar, settings link, sign out | app-wide |
| `PageHeader` | S | Title, description, action slot — top of every page | app-wide |

### Shared (components/shared/)

| Component | Kind | Purpose | Reusable |
|---|---|---|---|
| `EmptyState` | S | Icon + message + CTA when a list has no data | yes |
| `ErrorState` | C | Renders the API error contract; retry action | yes |
| `LoadingSkeleton` | S | Per-view skeletons (list, card, editor) | yes |
| `ConfirmDialog` | C | Destructive-action confirmation (delete data, etc.) | yes |
| `StatusBadge` | S | Colored badge for application/parse/job statuses | yes |

### Feature highlights (built per milestone, not up front)

| Component | Feature | Kind | Notes |
|---|---|---|---|
| `ResumeDropzone` | profile | C | Upload with progress; <60s parse feedback (NFR-P4) |
| `ProfileReviewWizard` | profile | C | Human-in-the-loop correction after parse — the trust moment |
| `EvidenceCard` | evidence | S | One evidence item with source attribution (GitHub/resume) |
| `JobCaptureForm` | jobs | C | Paste URL/text → extraction; react-hook-form + Zod |
| `MatchScoreCard` | matching | S | Score + rationale; links every claim to evidence |
| `GapList` | matching | S | Missing requirements with "what to emphasize" |
| `TailoringStudio` | tailoring | C | SSE token streaming into editable output (NFR-P3) |
| `ClaimTrace` | tailoring | C | Hover a bullet → see the fact ID backing it (FR-4.3) |
| `KanbanBoard` | tracker | C | Drag-and-drop pipeline; optimistic updates |
| `InsightsCharts` | insights | C | Response rates by variant/seniority/emphasis |

## State management

Per [state & data fetching](state-and-data-fetching.md): TanStack Query for all
server state; URL for view state (filters, tabs); local `useState` for component
state. **No global store** — introduce Zustand only if a concrete need appears
(candidate: the tailoring studio's draft state, decide when building Milestone 4).

## Loading / error / empty conventions

Every data view handles all three, consistently:

- **Loading** — route-level `loading.tsx` with the matching `LoadingSkeleton`.
- **Error** — route-level `error.tsx` rendering `ErrorState` from the
  [error contract](../02-backend/error-handling.md); mutations surface toasts.
- **Empty** — `EmptyState` with the next action ("Paste your first job posting").

## Accessibility baseline

The primary persona is keyboard-heavy (see [personas](../00-product/personas-and-jobs.md)):

- All interactions keyboard-reachable; visible focus rings (shadcn defaults kept).
- Kanban drag-and-drop has a keyboard/menu alternative for status changes.
- Streaming output announced via `aria-live="polite"`.
- Color never the sole signal (badges carry text); WCAG AA contrast.

## Related

- [Frontend overview](overview.md) · [Design system](design-system.md) ·
  [State & data fetching](state-and-data-fetching.md) · [User stories](../00-product/user-stories.md)
