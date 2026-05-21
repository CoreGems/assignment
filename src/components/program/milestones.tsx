import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import type { Milestone } from "@/lib/types";

export function Milestones({ items }: { items: Milestone[] }) {
  return (
    <section className="card-surface p-6">
      <h3 className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-4">
        {copy.programDetail.milestonesTitle}
      </h3>
      <ol className="relative pl-6">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border-subtle" />
        {items.map((m) => (
          <li key={m.id} className="relative pb-4 last:pb-0">
            <span
              className={cn(
                "absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2",
                m.status === "done"
                  ? "bg-brand-gradient border-transparent"
                  : "border-border-emphasis bg-bg-base",
              )}
            />
            <p
              className={cn(
                "text-sm leading-tight",
                m.status === "done" ? "text-text-primary" : "text-text-muted",
              )}
            >
              {m.label}
            </p>
            <p
              className={cn(
                "text-xs mt-0.5 tabular-nums",
                m.status === "done" ? "text-text-muted" : "text-text-muted/70",
              )}
            >
              {m.date}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
