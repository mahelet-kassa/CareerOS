# ADR 002: Managed auth (Cognito/Auth0) + Spring resource server, not custom auth

Date: 2026-07-14 · Status: Accepted

## Context

CareerOS holds career histories and PII, so authentication bugs are existential.
The product needs email/password + Google + GitHub sign-in (GitHub also grants the
evidence-import scope). The build is done by one senior full-stack engineer with a
fixed innovation budget that is better spent on the AI pipeline than on
reimplementing refresh-token rotation and JWKS handling.

## Decision

- **Buy, don't build.** Use a managed OIDC provider — **Amazon Cognito** (or
  Auth0 if its DX cost outweighs the savings) — for email/password, Google, and
  GitHub.
- **Web** runs the OIDC authorization-code flow (Auth.js). Tokens are stored in
  **httpOnly, secure cookies**, never `localStorage`.
- **`core-api`** is a stateless **OAuth2 resource server** validating JWTs via
  **JWKS**.
- **`ai-service`** trusts only `core-api` (service-to-service auth via IAM/OIDC),
  never end-user tokens directly.

## Consequences

- (+) Auth-critical primitives (rotation, MFA, social login) are maintained by a
  specialist, reducing existential risk.
- (+) Frees the one engineer to spend effort on the differentiating AI pipeline.
- (−) Cognito's developer experience is famously rough; Auth0 costs more. Accepted
  because custom auth is the wrong risk here.
- Revisit triggers: provider cost becomes material at scale, or a hard product
  requirement the provider cannot meet.

## Related

- [Security architecture](../01-architecture/security.md)
