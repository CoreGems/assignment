"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { data } from "@/lib/data";
import { copy } from "@/lib/copy";
import { usePersona } from "@/lib/persona-context";
import { cn } from "@/lib/utils";

export function RankWidget() {
  const { persona } = usePersona();
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface p-6 flex flex-col"
    >
      <h2 className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-3">
        {copy.rank.sectionTitle}
      </h2>

      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-display text-5xl text-brand-gradient tabular-nums leading-none">
          #{data.rank.current}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/30 px-2 py-0.5 rounded-full">
          <TrendingUp className="w-3 h-3" />
          {copy.rank.deltaUp(data.rank.delta)}
        </span>
      </div>

      <p className="text-xs text-text-muted mb-3">{data.rank.region} region</p>

      <ul className="space-y-1.5 mt-auto">
        {data.leaderboard.map((entry) => {
          const isCurrent = entry.isCurrentUser;
          const name = isCurrent ? persona.fullName : entry.name;
          const avatar = isCurrent ? persona.avatarSrc : entry.avatarSrc;
          return (
            <li
              key={entry.rank}
              className={cn(
                "flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm",
                isCurrent && "bg-bg-surface border border-border-emphasis",
              )}
            >
              <span
                className={cn(
                  "tabular-nums text-xs w-5 text-right font-medium",
                  isCurrent ? "text-text-primary" : "text-text-muted",
                )}
              >
                {entry.rank}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt=""
                className="w-6 h-6 rounded-full bg-bg-base"
              />
              <span
                className={cn(
                  "truncate flex-1 text-sm",
                  isCurrent ? "text-text-primary font-medium" : "text-text-muted",
                )}
              >
                {name}
              </span>
              {isCurrent && (
                <span className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
                  {copy.rank.youLabel}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
