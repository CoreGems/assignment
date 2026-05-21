"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  DollarSign,
  Trophy,
  BadgeCheck,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";
import { data } from "@/lib/data";
import { copy } from "@/lib/copy";
import { relativeTime } from "@/lib/utils";
import type { ActivityIconKey } from "@/lib/types";

const iconMap: Record<ActivityIconKey, React.ComponentType<{ className?: string }>> = {
  "check-circle": CheckCircle2,
  "dollar-sign": DollarSign,
  trophy: Trophy,
  badge: BadgeCheck,
  "trending-up": TrendingUp,
  users: Users,
  target: Target,
};

const colorMap: Record<ActivityIconKey, string> = {
  "check-circle": "text-accent-emerald",
  "dollar-sign": "text-accent-emerald",
  trophy: "text-accent-amber",
  badge: "text-accent-magenta",
  "trending-up": "text-accent-indigo",
  users: "text-accent-coral",
  target: "text-accent-indigo",
};

export function ActivityFeed() {
  const recent = data.activity.slice(0, 5);
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface p-6"
    >
      <h2 className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-4">
        {copy.activity.sectionTitle}
      </h2>
      <ul className="space-y-3">
        {recent.map((event) => {
          const Icon = iconMap[event.iconKey];
          const color = colorMap[event.iconKey];
          return (
            <li key={event.id} className="flex items-start gap-3">
              <div className={`mt-0.5 ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-text-primary leading-snug">{event.text}</p>
                <p className="text-xs text-text-muted mt-0.5">
                  {relativeTime(event.ts)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
