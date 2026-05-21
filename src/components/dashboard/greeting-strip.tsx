"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";
import { usePersona } from "@/lib/persona-context";
import { pickGreeting, copy } from "@/lib/copy";
import { data } from "@/lib/data";
import { useMemo } from "react";

const monthDay = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export function GreetingStrip() {
  const { persona } = usePersona();
  const greeting = useMemo(() => {
    const now = new Date(data.todayISO);
    const seed = Math.floor(Math.random() * 6);
    return pickGreeting(
      { persona, hour: now.getHours(), streakWeeks: data.streak.weeks },
      seed,
    );
  }, [persona]);

  const payoutDate = monthDay.format(new Date(data.nextPayout.dateISO));
  const daysUntilPayout = Math.ceil(
    (new Date(data.nextPayout.dateISO).getTime() -
      new Date(data.todayISO).getTime()) /
      86400000,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6"
    >
      <div className="flex items-center gap-3 flex-wrap">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={persona.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-2xl sm:text-3xl text-text-primary tracking-tight"
          >
            {greeting}
          </motion.h1>
        </AnimatePresence>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-accent-amber/40 text-accent-amber bg-accent-amber/10">
          <Flame className="w-3.5 h-3.5" />
          {copy.hero.streakLabel(data.streak.weeks)}
        </span>
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm bg-bg-surface border border-border-subtle text-text-primary self-start sm:self-auto">
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
        </span>
        <span className="text-text-muted">
          {copy.hero.payoutCountdown(daysUntilPayout, payoutDate)}
        </span>
      </div>
    </motion.div>
  );
}
