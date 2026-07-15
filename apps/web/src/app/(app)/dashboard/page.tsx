import type { Metadata } from "next";
import { Rocket } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Your next actions and pipeline at a glance."
      />
      <EmptyState
        icon={Rocket}
        title="Nothing here yet"
        description="Start by building your master profile — upload a resume and connect GitHub. (Milestone 1)"
      />
    </>
  );
}
