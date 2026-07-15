import { ArrowRight, FileCheck2, GitBranch, Target } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getApiHealth } from "@/lib/api";

const pillars = [
  {
    icon: FileCheck2,
    title: "Provably true resumes",
    description:
      "Every generated bullet traces back to a fact in your profile. No inflation, ever.",
  },
  {
    icon: GitBranch,
    title: "Evidence from real work",
    description:
      "Connect GitHub so repos, languages, and activity back up your claims.",
  },
  {
    icon: Target,
    title: "Learn what works",
    description:
      "Track every application and see which approaches actually get interviews.",
  },
] as const;

export default async function LandingPage() {
  const health = await getApiHealth();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-12 px-6 py-16">
      <div className="flex flex-col items-center gap-6 text-center">
        <Badge variant="outline" className="gap-1.5">
          <span
            className={
              health.status === "UP"
                ? "size-2 rounded-full bg-emerald-500"
                : "size-2 rounded-full bg-red-500"
            }
            aria-hidden="true"
          />
          core-api {health.status}
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Your AI job-search copilot
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          CareerOS turns your real experience into tailored, trustworthy
          applications — and shows you what&apos;s working.
        </p>
        <Button asChild size="lg">
          <Link href="/dashboard">
            Open the app
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-3">
        {pillars.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  );
}
