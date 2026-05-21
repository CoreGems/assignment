"use client";

import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Flame,
  Trophy,
  Rocket,
  Target,
  Zap,
  Crown,
  Medal,
  Sparkles,
  Swords,
  Compass,
  Star,
  Shield,
  Diamond,
  TrendingUp,
  CalendarCheck,
  Users,
  Gift,
  Leaf,
  Handshake,
  Mountain,
} from "lucide-react";
import { data } from "@/lib/data";
import { copy } from "@/lib/copy";
import type { AchievementIconKey, Achievement } from "@/lib/types";

const iconMap: Record<AchievementIconKey, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  trophy: Trophy,
  rocket: Rocket,
  target: Target,
  zap: Zap,
  crown: Crown,
  medal: Medal,
  sparkles: Sparkles,
  swords: Swords,
  compass: Compass,
  star: Star,
  shield: Shield,
  diamond: Diamond,
  "trending-up": TrendingUp,
  "calendar-check": CalendarCheck,
  users: Users,
  gift: Gift,
  leaf: Leaf,
  handshake: Handshake,
  mountain: Mountain,
};

const fmtDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function AchievementsRow() {
  const recent = [...data.achievements]
    .sort((a, b) => (a.earnedAt < b.earnedAt ? 1 : -1))
    .slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface p-6"
    >
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium">
          {copy.achievements.sectionTitle}
        </h2>
        <button className="text-xs text-text-muted hover:text-text-primary transition-colors">
          {copy.achievements.viewAll(data.achievements.length)}
        </button>
      </div>

      <Tooltip.Provider delayDuration={150}>
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {recent.map((ach) => (
            <BadgeIcon key={ach.id} achievement={ach} />
          ))}
        </div>
      </Tooltip.Provider>
    </motion.section>
  );
}

function BadgeIcon({ achievement }: { achievement: Achievement }) {
  const Icon = iconMap[achievement.iconKey];
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className="relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo rounded-full">
          <div className="p-[2px] rounded-full bg-brand-gradient">
            <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center">
              <Icon className="w-5 h-5 text-text-primary" />
            </div>
          </div>
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          sideOffset={8}
          className="card-surface px-3 py-2 max-w-[220px] text-xs z-50"
        >
          <p className="font-medium text-text-primary">{achievement.name}</p>
          <p className="text-text-muted mt-0.5">{achievement.flavor}</p>
          <p className="text-text-muted mt-1.5 text-[10px] uppercase tracking-[0.12em]">
            {copy.achievements.earnedOn(fmtDate.format(new Date(achievement.earnedAt)))}
          </p>
          <Tooltip.Arrow className="fill-bg-elevated" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
