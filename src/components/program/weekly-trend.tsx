"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { copy } from "@/lib/copy";
import type { ProgramDetail } from "@/lib/types";

const fmtUSD0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function WeeklyTrend({ data }: { data: ProgramDetail["weeklyTrend"] }) {
  return (
    <section className="card-surface p-6">
      <h3 className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-4">
        {copy.programDetail.trendTitle}
      </h3>
      <div className="h-48 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="weekly-bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-magenta)" />
                <stop offset="100%" stopColor="var(--accent-indigo)" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <RechartsTooltip
              cursor={{ fill: "var(--bg-surface)" }}
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
            <Bar
              dataKey="value"
              fill="url(#weekly-bar)"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
