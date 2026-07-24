# ADR 002: Managed auth (Auth0) + Spring resource server, not custom auth

Date: 2026-07-14 · Status: Accepted · Amended: 2026-07-15 (provider fixed to Auth0)

## Context

CareerOS holds career histories and PII, so authentication bugs are existential.
The product needs email/password + Google + GitHub sign-in (GitHub also grants the
evidence-import scope). The build is done by one senior full-stack engineer with a
fixed innovation budget that is better spent on the AI pipeline than on
reimplementing refresh-token rotation and JWKS handling.

## Decision

- **Buy, don't build.** Use a managed OIDC provider for email/password, Google,
  and GitHub sign-in.
- **Provider: Auth0** (amended 2026-07-15). Deciding factor: Cognito has no
  native GitHub federation — GitHub is OAuth2-only (no `id_token`), so Cognito
  would need a self-hosted OIDC shim, which is exactly the kind of auth
  infrastructure this ADR exists to avoid. Auth0 supports GitHub natively.
- **GitHub sign-in ≠ GitHub evidence import.** Sign-in requests minimal scopes.
  The profile module (Milestone 1) implements a separate app-level "Connect
  GitHub" OAuth grant with `repo`-read scopes and its own stored token, because
  IdP-brokered tokens are not suitable for long-lived data-import access.
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
- (−) Auth0 adds a vendor and a bill that grows with MAUs (free tier covers MVP
  scale). Accepted because custom auth is the wrong risk here.
- Revisit triggers: provider cost becomes material at scale, or a hard product
  requirement the provider cannot meet.

## Related

- [Security architecture](../01-architecture/security.md)
