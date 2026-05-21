import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Trophy,
  Flame,
  DollarSign,
} from "lucide-react";

export const metadata = {
  title: "Rules — PeakPath",
};

export default function RulesPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-14 pb-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium">
          About PeakPath
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-text-primary tracking-tight">
          How this <span className="text-brand-gradient">works</span>
        </h1>
        <p className="text-text-muted text-lg leading-relaxed max-w-2xl">
          A short field guide to what PeakPath is, the mechanics it tracks, and how
          a working sales rep actually uses it.
        </p>
      </header>

      <Section title="What this is — and what it isn't">
        <p>
          PeakPath looks playful: badges, tier paths, streaks, a leaderboard.
          That's intentional, and it's worth being clear about what those things
          mean here.
        </p>
        <p>
          <strong className="text-text-primary">
            This isn't a game.
          </strong>{" "}
          It's a real-money dashboard for people whose pay is partly variable —
          sales reps, field agents, service techs, retail associates — whose
          income depends on hitting specific targets each month. The activity
          being tracked (closing deals, hitting renewal targets, moving customers
          to higher plans) is the same activity that puts money in their bank
          account. Everything on screen reflects accrued or projected commission.
        </p>
        <p>
          The gamified surface is a deliberate design choice — the same one
          Strava made for running and Duolingo made for language learning. The
          underlying activity is real; the motivational layer makes the data
          actually get looked at.
        </p>
        <div className="card-surface p-5 mt-6">
          <p className="text-xs uppercase tracking-[0.14em] text-text-muted font-medium mb-4">
            Same pattern
          </p>
          <ComparisonTable />
        </div>
      </Section>

      <Section title="The core idea">
        <p>
          Companies with sales teams or field agents pay people partly in salary
          and partly in <em>variable comp</em> — bonuses tied to performance. A
          company will typically run several bonus programs at once, each with
          its own rules, tiers, deadlines, and payouts.
        </p>
        <p>
          The problem is that the people earning this money usually have no
          clear picture of how much they've earned, when they'll get paid next,
          which program is worth focusing on this week, or how close they are
          to unlocking a higher tier. The data lives in spreadsheets and PDFs
          from finance, weeks out of date. Reps guess. Engagement drops.
          Companies lose top performers because they don't <em>feel</em> the
          reward they're actually earning.
        </p>
        <p>
          PeakPath is the personal view that closes that gap. Real-time, on
          their phone, designed to make a 9-second glance between meetings
          satisfying instead of stressful.
        </p>
      </Section>

      <Section title="Key concepts">
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <Concept
            icon={Trophy}
            title="Programs"
            body="A specific bonus structure with a name, a deadline, and tier thresholds. A typical company runs 5–15 in parallel. Each program card on the dashboard is one."
          />
          <Concept
            icon={TrendingUp}
            title="Tiers"
            body="Within a program, payouts step up as you cross thresholds — Bronze → Silver → Gold → Platinum. Higher tiers unlock bigger bonuses. The tier path on the program detail page makes the structure legible."
          />
          <Concept
            icon={DollarSign}
            title="Payouts"
            body="When a tier is reached or a commission accrues, money moves from 'projected' to 'cleared' and lands in the next monthly payout. The countdown at the top of the dashboard tracks the next one."
          />
          <Concept
            icon={Flame}
            title="Streaks"
            body="Counted in calendar weeks above your weekly target. Borrowed straight from fitness apps because the loop works: consistent activity is what wins quarters, and the streak makes consistency visible."
          />
        </div>
      </Section>

      <Section title="How people actually use it">
        <UseCase
          tag="Morning glance"
          summary="Between client visits, on a phone."
          body={
            <>
              A rep pulls into the next meeting&apos;s parking lot, opens the app,
              and gets the three things that matter in under ten seconds:
              streak, YTD earnings, monthly goal ring. Walks into the call
              feeling oriented.
            </>
          }
        />
        <UseCase
          tag="Projection planning"
          summary="Friday afternoon, deciding what to grind on next week."
          body={
            <>
              Click any program card → drag the slider on the detail page to
              ask{" "}
              <em>&quot;if I close N more deals, what do I earn?&quot;</em> When
              the projected payout crosses a tier threshold, the tier badge
              flips and an &quot;Unlocks Gold&quot; animation fires. That moment
              is the answer to the rep&apos;s most common question.
            </>
          }
        />
        <UseCase
          tag="End-of-month review"
          summary="Reading the dashboard as a story, not a report."
          body={
            <>
              The YTD sparkline shows the shape of the year — the slow month,
              the recovery, the climb. The activity feed lists the events that
              drove those shapes. The badges recognize the patterns that
              survived. Together they tell a coherent story without anyone
              writing a report.
            </>
          }
        />
      </Section>

      <Section title="What to try in this prototype">
        <ul className="space-y-3">
          <TryItem
            label="Open the settings popover (gear icon, top right)"
            do="Toggle Dark / Light. Toggle Alex Chen / Maya Patel. Both swaps are real — copy and avatar update everywhere."
          />
          <TryItem
            label="Watch the dashboard entrance animation"
            do="The counter, ring, and sparkline orchestrate on a single 1.4s timeline. Refresh the page to see it again."
          />
          <TryItem
            label="Click any program card"
            do="The detail page has the projection slider. Drag it past +6 deals and watch the tier-crossing celebration."
          />
          <TryItem
            label="Hover any achievement badge"
            do="Tooltip with name + flavor + earned date. All 23 are named individually."
          />
          <TryItem
            label="Resize the window"
            do="Below 768px the layout reflows for mobile — bottom nav coming in a later pass, but the screens hold up."
          />
        </ul>
      </Section>

      <div className="card-surface p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-display text-xl text-text-primary">
            Ready to look around?
          </p>
          <p className="text-text-muted text-sm mt-1">
            Head back to the dashboard or jump into a program.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/programs/q2-enterprise-renewals"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-emphasis text-text-primary text-sm font-medium hover:bg-bg-surface transition-colors"
          >
            Featured program
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl text-text-primary tracking-tight">
        {title}
      </h2>
      <div className="space-y-4 text-text-muted leading-relaxed">{children}</div>
    </section>
  );
}

function Concept({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="card-surface p-5 space-y-2">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-brand-gradient">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-display text-base text-text-primary">{title}</h3>
      </div>
      <p className="text-sm text-text-muted leading-relaxed">{body}</p>
    </div>
  );
}

function UseCase({
  tag,
  summary,
  body,
}: {
  tag: string;
  summary: string;
  body: React.ReactNode;
}) {
  return (
    <div className="card-surface p-5 space-y-2">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-[11px] uppercase tracking-[0.14em] font-medium text-brand-gradient">
          {tag}
        </span>
        <span className="text-sm text-text-primary font-medium">{summary}</span>
      </div>
      <p className="text-sm text-text-muted leading-relaxed">{body}</p>
    </div>
  );
}

function TryItem({ label, do: action }: { label: string; do: string }) {
  return (
    <li className="flex items-start gap-3">
      <ArrowRight className="w-4 h-4 text-accent-magenta mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm text-text-primary font-medium">{label}</p>
        <p className="text-sm text-text-muted leading-relaxed mt-0.5">{action}</p>
      </div>
    </li>
  );
}

function ComparisonTable() {
  const rows = [
    {
      tool: "Strava",
      real: "Running, cycling",
      game: "Segments, badges, kudos, leaderboards",
    },
    {
      tool: "Duolingo",
      real: "Learning a language",
      game: "XP, streaks, leagues, hearts",
    },
    {
      tool: "LinkedIn",
      real: "Professional networking",
      game: "Profile completeness, All-Star status",
    },
    {
      tool: "PeakPath",
      real: "Selling for commission",
      game: "Tiers, badges, streaks, projection slider",
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-[auto_1fr_1.4fr] gap-x-4 gap-y-2 text-sm">
      <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted font-medium">
        Tool
      </div>
      <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted font-medium">
        Real activity
      </div>
      <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted font-medium">
        Game-like layer
      </div>
      {rows.map((r) => (
        <div key={r.tool} className="contents">
          <div
            className={`font-medium ${
              r.highlight ? "text-brand-gradient" : "text-text-primary"
            }`}
          >
            {r.tool}
          </div>
          <div className="text-text-muted">{r.real}</div>
          <div className="text-text-muted">{r.game}</div>
        </div>
      ))}
    </div>
  );
}
