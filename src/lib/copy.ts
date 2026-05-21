// Every visible string. Templated for persona name where used.
// Hand-edited — do not regenerate without re-editing.

import type { Persona } from "./persona-context";
import type { TierName } from "./types";

type GreetingCtx = {
  persona: Persona;
  hour: number;
  streakWeeks: number;
};

// A small pool of greetings. Rotates per visit so the dashboard
// doesn't feel canned after the third refresh.
const greetingPool = (ctx: GreetingCtx): string[] => {
  const { persona, hour, streakWeeks } = ctx;
  const name = persona.firstName;
  const timeWord =
    hour < 5 ? "evening" : hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

  return [
    `Good ${timeWord}, ${name}.`,
    `Welcome back, ${name}.`,
    `${name} — you're on a ${streakWeeks}-week tear.`,
    `Back from lunch, ${name}?`,
    `${name}, May's lining up nicely.`,
    `Hey ${name} — three closes from Gold.`,
  ];
};

export function pickGreeting(ctx: GreetingCtx, seed = 0): string {
  const pool = greetingPool(ctx);
  return pool[seed % pool.length];
}

export const copy = {
  brand: {
    name: "PeakPath",
    tagline: "Every sale is a step up.",
  },

  nav: {
    today: "Today",
    programs: "Programs",
    rules: "Rules",
    leaderboard: "Leaderboard",
    leaderboardDisabled: "Leaderboard view — coming soon",
    settings: "Settings",
  },

  hero: {
    streakLabel: (weeks: number) => `${weeks}-week streak above target`,
    payoutCountdown: (days: number, dateLabel: string) =>
      `Next payout in ${days} days — ${dateLabel}`,
    ytdLabel: "YTD earnings",
    ytdDelta: (pct: number) => `↑ ${pct}% vs last year`,
    viewBreakdown: "View breakdown →",
  },

  ring: {
    label: "Monthly goal",
    detail: (current: string, target: string) => `${current} of ${target}`,
    tooltip: (daysLeft: number) => `${daysLeft} days left in May`,
  },

  programs: {
    sectionTitle: "Active programs",
    tierProgress: (current: TierName, next: TierName | null) =>
      next ? `${current} → ${next}` : `${current} — maxed`,
    featuredBadge: "Featured",
    endsIn: (days: number) => `Ends in ${days} days`,
    payoutLabel: "Earned so far",
  },

  rank: {
    sectionTitle: "Regional rank",
    deltaUp: (n: number) => `↑ ${n} this week`,
    deltaDown: (n: number) => `↓ ${n} this week`,
    deltaFlat: "Holding steady",
    youLabel: "you",
  },

  achievements: {
    sectionTitle: "Recent badges",
    viewAll: (total: number) => `View all ${total} →`,
    earnedOn: (date: string) => `Earned ${date}`,
  },

  activity: {
    sectionTitle: "Activity",
  },

  tierDescriptions: {
    Bronze: "The starting tier. Closes count from the first deal.",
    Silver: "You're in the rhythm. Bonus payouts begin.",
    Gold: "Real money. Most reps cap out here.",
    Platinum: "Top of the leaderboard territory.",
  } satisfies Record<TierName, string>,

  programDetail: {
    backLabel: "← Back to dashboard",
    pathTitle: "Tier path",
    youAreHere: "You are here",
    projectionTitle: "What if you close...",
    projectionSlider: "Additional deals",
    projectedPayout: "Projected payout",
    crossingCelebration: (tier: TierName) => `Unlocks ${tier} tier`,
    resetProjection: "Reset",
    statsTitle: "This quarter",
    statsLabels: {
      dealsClosed: "Deals closed",
      avgDealCommission: "Avg commission",
      conversionPct: "Demo → close",
      daysRemaining: "Days left",
    },
    trendTitle: "Last 6 weeks",
    milestonesTitle: "Milestones",
    projectedPrefix: "Projected",
  },

  settings: {
    title: "Settings",
    themeLabel: "Theme",
    themeDark: "Dark",
    themeLight: "Light",
    profileLabel: "Profile",
    footerNote: "Mock data — for demo",
  },

  tooltips: {
    monthlyGoal: "Sum of every commission earned this calendar month.",
    ytd: "Year-to-date commissions. Includes payouts already processed and accruals not yet paid.",
    rank: "Updated nightly from regional sales data.",
    streak: "Counted in calendar weeks. Resets at midnight Sunday.",
    nextPayout: "Cleared commissions consolidated into your monthly payout.",
  },

  emptyStates: {
    noAchievementsThisWeek:
      "No badges this week — your streak's still alive though.",
  },
};
