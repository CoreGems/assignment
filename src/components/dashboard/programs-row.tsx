"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { data } from "@/lib/data";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import type { ProgramSummary, TierName } from "@/lib/types";

// Tier chip colors use the brand accents so they read on both themes.
// Bronze/Silver lean muted, Gold/Platinum lean toward the brand gradient.
const tierClasses: Record<TierName, string> = {
  Bronze:
    "bg-accent-amber/12 text-accent-amber border-accent-amber/30",
  Silver:
    "bg-text-muted/10 text-text-primary border-border-emphasis",
  Gold:
    "bg-accent-amber/15 text-accent-amber border-accent-amber/40",
  Platinum:
    "bg-accent-indigo/12 text-accent-indigo border-accent-indigo/40",
};

const fmtUSD0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function ProgramsRow() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-display text-base uppercase tracking-[0.14em] text-text-muted font-medium">
          {copy.programs.sectionTitle}
        </h2>
      </div>
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
        {data.programs.slice(0, 6).map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </motion.section>
  );
}

function ProgramCard({ program }: { program: ProgramSummary }) {
  const tierChip = tierClasses[program.currentTier];
  return (
    <Link
      href={`/programs/${program.id}`}
      className={cn(
        "card-surface p-5 min-w-[260px] md:min-w-0 snap-start flex flex-col gap-4 group transition-all duration-200 hover:-translate-y-1 hover:border-border-emphasis",
        program.isFeatured && "ring-1 ring-accent-magenta/30",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {program.isFeatured && (
            <span className="inline-block text-[10px] uppercase tracking-[0.14em] font-medium text-brand-gradient mb-1">
              {copy.programs.featuredBadge}
            </span>
          )}
          <h3 className="font-display text-base text-text-primary leading-tight truncate">
            {program.name}
          </h3>
          <p className="text-xs text-text-muted mt-1 line-clamp-2">
            {program.blurb}
          </p>
        </div>
        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors flex-shrink-0" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span
            className={cn(
              "inline-flex px-2 py-0.5 rounded-full border text-[11px] font-medium",
              tierChip,
            )}
          >
            {copy.programs.tierProgress(program.currentTier, program.nextTier)}
          </span>
          <span className="text-text-muted tabular-nums">
            {copy.programs.endsIn(program.endsInDays)}
          </span>
        </div>

        <div className="relative h-1.5 rounded-full overflow-hidden bg-bg-base/60">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${program.progressToNextTier * 100}%` }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full bg-brand-gradient rounded-full"
          />
        </div>
      </div>

      <div className="flex items-baseline justify-between border-t border-border-subtle pt-3 mt-auto">
        <span className="text-[11px] text-text-muted uppercase tracking-[0.1em]">
          {copy.programs.payoutLabel}
        </span>
        <span className="font-display text-lg text-text-primary tabular-nums">
          {fmtUSD0(program.currentPayout)}
        </span>
      </div>
    </Link>
  );
}
