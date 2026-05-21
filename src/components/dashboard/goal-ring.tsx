"use client";

import { motion } from "framer-motion";
import { data } from "@/lib/data";
import { copy } from "@/lib/copy";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const fmtUSD0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function GoalRing() {
  const { current, target, daysLeft } = data.monthlyGoal;
  const pct = current / target;
  const size = 220;
  const stroke = 16;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface p-6 sm:p-8 flex flex-col items-center justify-center text-center"
    >
      <p className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-4">
        {copy.ring.label}
      </p>

      <div
        className="relative"
        style={{ width: size, height: size }}
        title={copy.ring.tooltip(daysLeft)}
      >
        <svg width={size} height={size}>
          <defs>
            <linearGradient id="goal-ring-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent-indigo)" />
              <stop offset="50%" stopColor="var(--accent-magenta)" />
              <stop offset="100%" stopColor="var(--accent-coral)" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--border-subtle)"
            strokeWidth={stroke}
            fill="none"
          />
          {/* Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#goal-ring-gradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - pct) }}
            transition={{ duration: 1.0, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl text-brand-gradient tabular-nums leading-none">
            <AnimatedCounter
              to={Math.round(pct * 100)}
              duration={1.0}
              delay={0.6}
              format={(n) => `${Math.round(n)}%`}
            />
          </span>
          <span className="text-xs text-text-muted mt-2 tabular-nums">
            {copy.ring.detail(fmtUSD0(current), fmtUSD0(target))}
          </span>
        </div>
      </div>

      <p className="text-xs text-text-muted mt-4">{copy.ring.tooltip(daysLeft)}</p>
    </motion.section>
  );
}
