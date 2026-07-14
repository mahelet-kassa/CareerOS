---
title: Migrations (Flyway)
status: current
last-reviewed: 2026-07-14
owner: Mahelet
---

# Migrations — Flyway

Every schema change is a **forward-only Flyway migration** (NFR-M2). This is a
hard project convention.

## Rules

1. **Never edit an applied migration.** Once a migration has run anywhere, it's
   immutable. Fix mistakes with a *new* migration.
2. **Flyway owns the schema, not Hibernate.** `spring.jpa.hibernate.ddl-auto=validate`
   — the ORM validates against the schema but never mutates it.
3. **One logical change per migration**, named clearly.
4. **Update [schema.md](schema.md) in the same PR** as the migration.

## Location & naming

```
apps/core-api/src/main/resources/db/migration/
└── V<version>__<description>.sql      e.g. V1__init.sql
```

- `V` = versioned (runs once, in order).
- Double underscore separates version from description.

## How to add a migration

1. Create `V<n>__<what>.sql` (n = next integer).
2. Write forward-only SQL (add/alter; avoid destructive drops without a plan).
3. Run locally: `./gradlew bootRun` (Flyway applies on startup) or run the tests
   — Testcontainers applies migrations against real pgvector.
4. Update [schema.md](schema.md) and its ERD.

## Testing

Integration tests (`HealthEndpointTest`) boot the app against the real
`pgvector/pgvector:pg16` image and apply all migrations, so a broken migration
fails CI. See [testing strategy](../08-engineering/testing-strategy.md).

## Applied migrations

| Version | Description | Notes |
|---|---|---|
| V1 | `init` | `users` table; enables `vector` extension |

## Related

- [Schema & ERD](schema.md) · [Backend](../02-backend/overview.md)
