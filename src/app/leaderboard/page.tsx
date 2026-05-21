"use client";

import { motion } from "framer-motion";
import { Crown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { data } from "@/lib/data";
import { copy } from "@/lib/copy";
import { usePersona } from "@/lib/persona-context";
import { cn } from "@/lib/utils";
import type { LeaderboardEntry } from "@/lib/types";

const fmtUSD0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export default function LeaderboardPage() {
  const { persona } = usePersona();
  const all = data.leaderboard;
  const top3 = all.slice(0, 3);
  const rest = all.slice(3);

  function display(e: LeaderboardEntry) {
    return {
      name: e.isCurrentUser ? persona.fullName : e.name,
      avatar: e.isCurrentUser ? persona.avatarSrc : e.avatarSrc,
    };
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-10">
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-2"
      >
        <p className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium">
          {copy.leaderboard.pageEyebrow}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-text-primary tracking-tight">
          {copy.leaderboard.pageTitle}
        </h1>
        <p className="text-text-muted">{copy.leaderboard.pageSubtitle}</p>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-3"
      >
        <h2 className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium">
          {copy.leaderboard.podiumLabel}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3.map((entry, idx) => {
            const d = display(entry);
            return (
              <PodiumCard
                key={entry.rank}
                position={entry.rank}
                rankColor={
                  idx === 0
                    ? "from-amber-300 via-amber-400 to-amber-600"
                    : idx === 1
                      ? "from-slate-200 via-slate-300 to-slate-500"
                      : "from-amber-700 via-amber-600 to-amber-900"
                }
                name={d.name}
                avatar={d.avatar}
                territory={entry.territory}
                ytdEarnings={entry.ytdEarnings ?? 0}
                delta={entry.delta ?? 0}
              />
            );
          })}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="card-surface overflow-hidden"
      >
        {/* Header row */}
        <div className="hidden sm:grid grid-cols-[3rem_2.5rem_1fr_8rem_5rem_5rem] items-center gap-3 px-5 py-3 border-b border-border-subtle text-[11px] uppercase tracking-[0.12em] text-text-muted font-medium">
          <div>{copy.leaderboard.tableHeaderRank}</div>
          <div />
          <div>{copy.leaderboard.tableHeaderName}</div>
          <div>{copy.leaderboard.tableHeaderTerritory}</div>
          <div className="text-right">
            {copy.leaderboard.tableHeaderEarnings}
          </div>
          <div className="text-right">
            {copy.leaderboard.tableHeaderDelta}
          </div>
        </div>

        <ul>
          {rest.map((entry) => {
            const d = display(entry);
            return (
              <LeaderboardRow
                key={entry.rank}
                rank={entry.rank}
                name={d.name}
                avatar={d.avatar}
                territory={entry.territory ?? "—"}
                ytdEarnings={entry.ytdEarnings ?? 0}
                delta={entry.delta ?? 0}
                isCurrent={entry.isCurrentUser}
              />
            );
          })}
        </ul>
      </motion.section>
    </div>
  );
}

function PodiumCard({
  position,
  rankColor,
  name,
  avatar,
  territory,
  ytdEarnings,
  delta,
}: {
  position: number;
  rankColor: string;
  name: string;
  avatar: string;
  territory?: string;
  ytdEarnings: number;
  delta: number;
}) {
  return (
    <div className="card-surface p-5 flex flex-col items-center text-center gap-3 relative overflow-hidden">
      <div className="flex items-center gap-2">
        <Crown className={cn("w-4 h-4 bg-clip-text", `text-transparent bg-gradient-to-br ${rankColor}`)} />
        <span
          className={cn(
            "font-display text-3xl tabular-nums leading-none bg-clip-text text-transparent bg-gradient-to-br",
            rankColor,
          )}
        >
          #{position}
        </span>
      </div>
      <div className="p-[2px] rounded-full bg-brand-gradient">
        <div className="w-16 h-16 rounded-full bg-bg-elevated overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <p className="font-display text-base text-text-primary">{name}</p>
        {territory && (
          <p className="text-xs text-text-muted">{territory}</p>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-xl text-brand-gradient tabular-nums">
          {fmtUSD0(ytdEarnings)}
        </span>
        <DeltaChip value={delta} />
      </div>
    </div>
  );
}

function LeaderboardRow({
  rank,
  name,
  avatar,
  territory,
  ytdEarnings,
  delta,
  isCurrent,
}: {
  rank: number;
  name: string;
  avatar: string;
  territory: string;
  ytdEarnings: number;
  delta: number;
  isCurrent?: boolean;
}) {
  return (
    <li
      className={cn(
        "grid grid-cols-[2.5rem_2.5rem_1fr_auto_auto] sm:grid-cols-[3rem_2.5rem_1fr_8rem_5rem_5rem] items-center gap-3 px-5 py-3 border-b border-border-subtle last:border-b-0",
        isCurrent && "bg-bg-surface border-l-2 border-l-accent-magenta",
      )}
    >
      <span
        className={cn(
          "tabular-nums font-medium text-sm",
          isCurrent ? "text-brand-gradient" : "text-text-muted",
        )}
      >
        #{rank}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatar}
        alt=""
        className="w-9 h-9 rounded-full bg-bg-base"
      />
      <div className="min-w-0 flex items-center gap-2">
        <span
          className={cn(
            "truncate text-sm",
            isCurrent ? "text-text-primary font-medium" : "text-text-primary",
          )}
        >
          {name}
        </span>
        {isCurrent && (
          <span className="text-[10px] uppercase tracking-[0.12em] font-medium text-brand-gradient">
            {copy.leaderboard.youChip}
          </span>
        )}
      </div>
      <div className="hidden sm:block text-sm text-text-muted truncate">
        {territory}
      </div>
      <div className="text-right tabular-nums text-sm font-medium text-text-primary">
        {fmtUSD0(ytdEarnings)}
      </div>
      <div className="hidden sm:flex justify-end">
        <DeltaChip value={delta} />
      </div>
    </li>
  );
}

function DeltaChip({ value }: { value: number }) {
  if (value === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-text-muted">
        <Minus className="w-3 h-3" />
        {copy.leaderboard.deltaFlat}
      </span>
    );
  }
  if (value > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-emerald">
        <TrendingUp className="w-3 h-3" />
        {copy.leaderboard.deltaUp(value)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-coral">
      <TrendingDown className="w-3 h-3" />
      {copy.leaderboard.deltaDown(Math.abs(value))}
    </span>
  );
}
