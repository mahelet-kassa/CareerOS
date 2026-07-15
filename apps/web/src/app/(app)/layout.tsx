import Link from "next/link";
import type { ReactNode } from "react";

import { SidebarNav } from "@/components/layout/sidebar-nav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r bg-sidebar md:flex md:flex-col">
        <div className="flex h-14 items-center border-b px-5">
          <Link href="/dashboard" className="text-base font-semibold tracking-tight">
            CareerOS
          </Link>
        </div>
        <SidebarNav />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
