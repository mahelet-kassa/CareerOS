import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

import { auth, oidcConfigured, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

/** Server component: shows the signed-in user and sign-out, or a sign-in link. */
export async function UserMenu() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Button variant="outline" size="sm" asChild>
        <Link href="/login">
          <LogIn aria-hidden="true" />
          {oidcConfigured ? "Sign in" : "Auth setup"}
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="max-w-45 truncate text-sm text-muted-foreground">
        {session.user.email ?? session.user.name}
      </span>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit" variant="ghost" size="sm">
          <LogOut aria-hidden="true" />
          Sign out
        </Button>
      </form>
    </div>
  );
}
