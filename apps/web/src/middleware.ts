import { NextResponse } from "next/server";

import { auth, oidcConfigured } from "@/auth";

/**
 * Guards all (app) routes. Until an OIDC provider is configured via env vars,
 * the guard is a pass-through so the shell stays browsable in local dev —
 * core-api still denies everything by default, so no data is exposed.
 */
export default auth((req) => {
  if (!oidcConfigured) return NextResponse.next();

  if (!req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/profile/:path*",
    "/jobs/:path*",
    "/applications/:path*",
    "/insights/:path*",
    "/settings/:path*",
  ],
};
