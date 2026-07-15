import type { Metadata } from "next";
import { Briefcase } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Jobs" };

export default function JobsPage() {
  return (
    <>
      <PageHeader
        title="Jobs"
        description="Captured postings with match scores, evidence, and gaps."
      />
      <EmptyState
        icon={Briefcase}
        title="No jobs captured"
        description="Paste a job posting URL or text and the AI extracts title, company, skills, and requirements. (US-B1)"
      />
    </>
  );
}
