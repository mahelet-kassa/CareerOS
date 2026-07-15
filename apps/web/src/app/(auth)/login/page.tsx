import type { Metadata } from "next";
import { LogIn, Wrench } from "lucide-react";
import Link from "next/link";

import { oidcConfigured, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign in to CareerOS</CardTitle>
          <CardDescription>
            Your career data stays yours — export or delete it any time.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {oidcConfigured ? (
            <form
              action={async () => {
                "use server";
                await signIn("oidc", { redirectTo: callbackUrl ?? "/dashboard" });
              }}
            >
              <Button type="submit" className="w-full">
                <LogIn aria-hidden="true" />
                Continue
              </Button>
            </form>
          ) : (
            <div className="flex items-start gap-3 rounded-md border bg-muted/50 p-4 text-sm text-muted-foreground">
              <Wrench className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <p>
                No OIDC provider configured yet. Set{" "}
                <code className="font-mono text-xs">OIDC_ISSUER_URI</code>,{" "}
                <code className="font-mono text-xs">OIDC_CLIENT_ID</code> and{" "}
                <code className="font-mono text-xs">OIDC_CLIENT_SECRET</code>{" "}
                (see <code className="font-mono text-xs">.env.example</code> and
                ADR-002).
              </p>
            </div>
          )}
          <Button variant="ghost" asChild className="w-full">
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
