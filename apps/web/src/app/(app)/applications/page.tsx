import type { Metadata } from "next";
import { KanbanSquare } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Applications" };

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        title="Applications"
        description="Every application in one pipeline — applied, screen, interview, offer."
      />
      <EmptyState
        icon={KanbanSquare}
        title="Pipeline is empty"
        description="Generate a tailored resume for a job and the application lands here automatically. (US-D1)"
      />
    </>
  );
}
