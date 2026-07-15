import type { Metadata } from "next";
import { UserRound } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Master profile"
        description="Your structured career history — every generated document traces back here."
      />
      <EmptyState
        icon={UserRound}
        title="No profile yet"
        description="Upload your resume and the AI will build an editable structured profile you review and correct. (US-A1)"
      />
    </>
  );
}
