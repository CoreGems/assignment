"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { data } from "@/lib/data";
import { copy } from "@/lib/copy";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const fmtUSD0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function EarningsHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface p-6 sm:p-8 relative overflow-hidden"
    >
      <div className="grid sm:grid-cols-[1fr_auto] gap-6 sm:gap-8 items-start">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-3">
            {copy.hero.ytdLabel}
          </p>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-display text-5xl sm:text-6xl text-brand-gradient tabular-nums leading-none">
              <span className="opacity-60">$</span>
              <AnimatedCounter to={data.ytd.earnings} duration={1.0} delay={0.4} />
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/30 px-2 py-1 rounded-full"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              {copy.hero.ytdDelta(data.ytd.deltaPct)}
            </motion.span>
          </div>

          <Link
            href="/programs/q2-enterprise-renewals"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            {copy.hero.viewBreakdown}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="mt-8 h-28 -mx-2">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ResponsiveContainer width="100%" height={112}>
            <AreaChart
              data={data.ytd.monthlyTrend}
              margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-magenta)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--accent-indigo)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent-indigo)" />
                  <stop offset="50%" stopColor="var(--accent-magenta)" />
                  <stop offset="100%" stopColor="var(--accent-coral)" />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" hide />
              <YAxis hide domain={[0, "dataMax + 1000"]} />
              <RechartsTooltip
                cursor={{ stroke: "var(--border-emphasis)", strokeDasharray: 3 }}
                contentStyle={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 12,
                  fontSize: 12,
                  color: "var(--text-primary)",
                  boxShadow: "var(--shadow-card)",
                }}
                formatter={(value) => [fmtUSD0(Number(value) || 0), "Earned"]}
                labelStyle={{ color: "var(--text-muted)", marginBottom: 4 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="url(#hero-line)"
                strokeWidth={2.5}
                fill="url(#hero-area)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.section>
  );
}
