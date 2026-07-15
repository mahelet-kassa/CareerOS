import NextAuth from "next-auth";

/**
 * Auth.js v5, running the OIDC authorization-code flow against the managed
 * provider (Cognito/Auth0 — ADR-002). Provider-agnostic: point OIDC_ISSUER_URI
 * at any spec-compliant issuer and endpoints are discovered automatically.
 *
 * Sessions are JWTs in httpOnly, secure cookies (never localStorage). The
 * provider's access token is kept in the session so server-side code can call
 * core-api with a bearer token.
 */
export const oidcConfigured = Boolean(
  process.env.OIDC_ISSUER_URI &&
    process.env.OIDC_CLIENT_ID &&
    process.env.OIDC_CLIENT_SECRET,
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Fallback keeps local dev and CI builds working before a provider tenant
  // exists. Production must set AUTH_SECRET (see .env.example).
  secret: process.env.AUTH_SECRET ?? "insecure-dev-secret-set-AUTH_SECRET",
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: oidcConfigured
    ? [
        {
          id: "oidc",
          name: "CareerOS",
          type: "oidc",
          issuer: process.env.OIDC_ISSUER_URI,
          clientId: process.env.OIDC_CLIENT_ID,
          clientSecret: process.env.OIDC_CLIENT_SECRET,
        },
      ]
    : [],
  callbacks: {
    jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
