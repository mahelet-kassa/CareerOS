# CareerOS

AI career platform — single-player job-search copilot for software engineers.
Monorepo: Spring Boot core API + Next.js web app.

## Structure

```
apps/core-api    Spring Boot 3 (Java 21) — domain API: auth, profiles, jobs, tracking
apps/web         Next.js (TypeScript) — web client
docs/            Engineering knowledge base (see docs/README.md)
docs/adr         Architecture decision records
```

Full project documentation — vision, requirements, architecture, data, API, AI,
and engineering process — lives in [`docs/`](docs/README.md). It's authored as
docs-as-code (Markdown + Mermaid) and published with MkDocs Material (`mkdocs.yml`).

## Local development

Prereqs: Java 21, Node 22+, Docker.

```bash
# 1. Database (Postgres 16 + pgvector)
docker compose up -d

# 2. API — first time only: generate the Gradle wrapper
cd apps/core-api
gradle wrapper --gradle-version 8.10   # requires a local Gradle once; wrapper is committed after
./gradlew bootRun                       # http://localhost:8080/actuator/health

# 3. Web
cd apps/web
npm install
npm run dev                             # http://localhost:3000
```

## Testing

```bash
cd apps/core-api && ./gradlew test     # integration tests use Testcontainers (needs Docker)
cd apps/web && npm run lint && npm run build
```

## Conventions

- Every schema change is a Flyway migration in `apps/core-api/src/main/resources/db/migration`. Never edit an applied migration.
- Every significant architectural decision gets an ADR in `docs/adr`.
- CI must be green before merge to `main`.
