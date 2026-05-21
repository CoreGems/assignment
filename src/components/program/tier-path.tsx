"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Tier, TierName } from "@/lib/types";

type Props = {
  tiers: Tier[];
  currentEarned: number;
  highlightTier: TierName;
};

const fmtUSD0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function TierPath({ tiers, currentEarned, highlightTier }: Props) {
  const max = tiers[tiers.length - 1].threshold;
  const min = 0;
  const total = max - min;
  const positions = tiers.map((t) => ({
    ...t,
    pct: (t.threshold - min) / total,
  }));
  const earnedPct = Math.min(1, Math.max(0, (currentEarned - min) / total));

  return (
    <div className="relative w-full pt-2 pb-12">
      <div className="relative h-2 rounded-full bg-bg-base/60 border border-border-subtle overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${earnedPct * 100}%` }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 bg-brand-gradient"
        />
      </div>

      {/* Node markers */}
      {positions.map((p) => {
        const reached = currentEarned >= p.threshold;
        const isHighlight = p.name === highlightTier;
        return (
          <div
            key={p.name}
            className="absolute -translate-x-1/2"
            style={{ left: `${p.pct * 100}%`, top: "calc(0.5rem - 6px)" }}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                reached
                  ? "bg-brand-gradient border-transparent"
                  : "bg-bg-elevated border-border-emphasis",
              )}
            >
              {isHighlight && reached && (
                <span className="absolute -inset-1 rounded-full bg-brand-gradient opacity-40 blur-md animate-pulse" />
              )}
            </div>
            <div className="absolute top-7 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <p
                className={cn(
                  "text-xs font-medium",
                  reached ? "text-text-primary" : "text-text-muted",
                )}
              >
                {p.name}
              </p>
              <p className="text-[10px] text-text-muted tabular-nums">
                {fmtUSD0(p.threshold)}
              </p>
            </div>
          </div>
        );
      })}

      {/* Current position marker */}
      <div
        className="absolute -translate-x-1/2"
        style={{ left: `${earnedPct * 100}%`, top: "calc(0.5rem - 9px)" }}
      >
        <div className="relative w-6 h-6">
          <span className="absolute inset-0 rounded-full bg-brand-gradient opacity-50 blur-md animate-pulse" />
          <span className="absolute inset-1 rounded-full bg-brand-gradient border-2 border-bg-base" />
        </div>
      </div>
    </div>
  );
}
