"use client";

import * as Slider from "@radix-ui/react-slider";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProgramDetail, TierName } from "@/lib/types";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const fmtUSD0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

function findTier(amount: number, tiers: ProgramDetail["tiers"]): TierName {
  let current: TierName = tiers[0].name;
  for (const t of tiers) {
    if (amount >= t.threshold) current = t.name;
  }
  return current;
}

export function ProjectionCard({ program }: { program: ProgramDetail }) {
  const [additional, setAdditional] = useState(0);
  const max = 10;

  const projected = useMemo(
    () => program.currentEarned + additional * program.stats.avgDealCommission,
    [additional, program.currentEarned, program.stats.avgDealCommission],
  );

  const projectedTier = findTier(projected, program.tiers);
  const crossedUp =
    projectedTier !== program.currentTier &&
    program.tiers.findIndex((t) => t.name === projectedTier) >
      program.tiers.findIndex((t) => t.name === program.currentTier);

  return (
    <section className="card-surface p-6">
      <h3 className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-1">
        {copy.programDetail.projectionTitle}
      </h3>

      <div className="flex items-baseline gap-3 mt-3 mb-1">
        <motion.span
          key={projected}
          initial={{ scale: 1 }}
          animate={crossedUp ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl text-brand-gradient tabular-nums leading-none"
        >
          {fmtUSD0(projected)}
        </motion.span>
        <span className="text-xs text-text-muted">{copy.programDetail.projectedPayout}</span>
      </div>

      <AnimatePresence mode="wait">
        {crossedUp && (
          <motion.p
            key={projectedTier}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-1 mt-2 text-sm text-accent-magenta font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {copy.programDetail.crossingCelebration(projectedTier)}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-6 space-y-3">
        <div className="flex items-baseline justify-between text-xs text-text-muted">
          <span>{copy.programDetail.projectionSlider}</span>
          <span className="tabular-nums text-text-primary font-medium text-sm">
            +{additional}
          </span>
        </div>
        <Slider.Root
          value={[additional]}
          onValueChange={([v]) => setAdditional(v)}
          min={0}
          max={max}
          step={1}
          className="relative flex items-center select-none touch-none w-full h-6"
        >
          <Slider.Track className="bg-bg-base/60 border border-border-subtle relative grow rounded-full h-1.5">
            <Slider.Range className="absolute bg-brand-gradient rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-brand-gradient rounded-full shadow-lg shadow-accent-magenta/30 ring-2 ring-bg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo"
            aria-label="Additional deals"
          />
        </Slider.Root>

        <button
          type="button"
          onClick={() => setAdditional(0)}
          className={cn(
            "inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors",
            additional === 0 && "opacity-40 pointer-events-none",
          )}
        >
          <RotateCcw className="w-3 h-3" />
          {copy.programDetail.resetProjection}
        </button>
      </div>
    </section>
  );
}
