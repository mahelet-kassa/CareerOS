import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Insights" };

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        title="Insights"
        description="What's working in your search — response rates by resume variant, seniority, and emphasis."
      />
      <EmptyState
        icon={BarChart3}
        title="Not enough data yet"
        description="Insights unlock after about 10 tracked applications with logged outcomes. (US-E1)"
      />
    </>
  );
}
