import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    /** Provider access token for server-side calls to core-api. */
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
