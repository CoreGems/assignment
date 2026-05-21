export type TierName = "Bronze" | "Silver" | "Gold" | "Platinum";

export type Tier = {
  name: TierName;
  threshold: number;
  payout: number;
};

export type MonthlyPoint = { month: string; value: number };
export type WeeklyPoint = { week: string; value: number };

export type ProgramSummary = {
  id: string;
  name: string;
  shortName: string;
  blurb: string;
  currentPayout: number;
  currentTier: TierName;
  nextTier: TierName | null;
  progressToNextTier: number;
  endsInDays: number;
  isFeatured?: boolean;
};

export type ProgramDetail = ProgramSummary & {
  tiers: Tier[];
  currentEarned: number;
  stats: {
    dealsClosed: number;
    avgDealCommission: number;
    conversionPct: number;
    daysRemaining: number;
  };
  weeklyTrend: WeeklyPoint[];
  milestones: Milestone[];
};

export type Milestone = {
  id: string;
  label: string;
  date: string;
  status: "done" | "projected";
};

export type AchievementIconKey =
  | "flame"
  | "trophy"
  | "rocket"
  | "target"
  | "zap"
  | "crown"
  | "medal"
  | "sparkles"
  | "swords"
  | "compass"
  | "star"
  | "shield"
  | "diamond"
  | "trending-up"
  | "calendar-check"
  | "users"
  | "gift"
  | "leaf"
  | "handshake"
  | "mountain";

export type Achievement = {
  id: string;
  name: string;
  flavor: string;
  earnedAt: string;
  iconKey: AchievementIconKey;
};

export type ActivityIconKey =
  | "check-circle"
  | "dollar-sign"
  | "trophy"
  | "badge"
  | "trending-up"
  | "users"
  | "target";

export type ActivityEvent = {
  id: string;
  iconKey: ActivityIconKey;
  text: string;
  ts: string;
  programId?: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  avatarSrc: string;
  isCurrentUser?: boolean;
};

export type PeakpathData = {
  todayISO: string;
  ytd: {
    earnings: number;
    deltaPct: number;
    monthlyTrend: MonthlyPoint[];
  };
  monthlyGoal: {
    current: number;
    target: number;
    daysLeft: number;
  };
  streak: {
    weeks: number;
  };
  nextPayout: {
    dateISO: string;
    amount: number;
  };
  rank: {
    current: number;
    delta: number;
    region: string;
  };
  programs: ProgramSummary[];
  programDetails: Record<string, ProgramDetail>;
  achievements: Achievement[];
  activity: ActivityEvent[];
  leaderboard: LeaderboardEntry[];
  featuredProgramId: string;
};
