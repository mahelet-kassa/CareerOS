import type { Metadata } from "next";
import { Settings } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Account, connections, and data ownership — export or delete everything."
      />
      <EmptyState
        icon={Settings}
        title="Settings arrive with auth"
        description="Account management, GitHub connection, and data export/delete land once authentication ships. (US-F1)"
      />
    </>
  );
}
