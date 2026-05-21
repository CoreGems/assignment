import { copy } from "@/lib/copy";
import type { ProgramDetail } from "@/lib/types";

const fmtUSD0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function StatsGrid({ stats }: { stats: ProgramDetail["stats"] }) {
  const items = [
    {
      label: copy.programDetail.statsLabels.dealsClosed,
      value: stats.dealsClosed.toString(),
    },
    {
      label: copy.programDetail.statsLabels.avgDealCommission,
      value: fmtUSD0(stats.avgDealCommission),
    },
    {
      label: copy.programDetail.statsLabels.conversionPct,
      value: `${stats.conversionPct}%`,
    },
    {
      label: copy.programDetail.statsLabels.daysRemaining,
      value: stats.daysRemaining.toString(),
    },
  ];

  return (
    <section className="card-surface p-6">
      <h3 className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-4">
        {copy.programDetail.statsTitle}
      </h3>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-xs text-text-muted">{item.label}</dt>
            <dd className="font-display text-2xl text-text-primary tabular-nums mt-1">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
