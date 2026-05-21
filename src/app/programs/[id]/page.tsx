import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { data } from "@/lib/data";
import { copy } from "@/lib/copy";
import { TierPath } from "@/components/program/tier-path";
import { ProjectionCard } from "@/components/program/projection-card";
import { StatsGrid } from "@/components/program/stats-grid";
import { WeeklyTrend } from "@/components/program/weekly-trend";
import { Milestones } from "@/components/program/milestones";

export default async function ProgramDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = data.programDetails[id];
  if (!program) notFound();

  return (
    <div className="space-y-8">
      <header>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {copy.programDetail.backLabel}
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-2">
              Active program
            </p>
            <h1 className="font-display text-3xl sm:text-4xl text-text-primary tracking-tight">
              {program.name}
            </h1>
            <p className="text-text-muted mt-2 max-w-prose">{program.blurb}</p>
          </div>
          <div className="text-right">
            <span className="inline-block text-[10px] uppercase tracking-[0.14em] text-text-muted">
              Current tier
            </span>
            <p className="font-display text-2xl text-brand-gradient">
              {program.currentTier}
            </p>
            <p className="text-xs text-text-muted">
              {copy.programs.endsIn(program.endsInDays)}
            </p>
          </div>
        </div>
      </header>

      <section className="card-surface p-6 sm:p-8">
        <h2 className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-6">
          {copy.programDetail.pathTitle}
        </h2>
        <TierPath
          tiers={program.tiers}
          currentEarned={program.currentEarned}
          highlightTier={program.currentTier}
        />
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <ProjectionCard program={program} />
        <StatsGrid stats={program.stats} />
      </div>

      <WeeklyTrend data={program.weeklyTrend} />

      <Milestones items={program.milestones} />
    </div>
  );
}
