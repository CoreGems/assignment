import { GreetingStrip } from "@/components/dashboard/greeting-strip";
import { EarningsHero } from "@/components/dashboard/earnings-hero";
import { GoalRing } from "@/components/dashboard/goal-ring";
import { ProgramsRow } from "@/components/dashboard/programs-row";
import { RankWidget } from "@/components/dashboard/rank-widget";
import { AchievementsRow } from "@/components/dashboard/achievements-row";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default function Home() {
  return (
    <div className="space-y-8">
      <GreetingStrip />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EarningsHero />
        </div>
        <div>
          <GoalRing />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgramsRow />
        </div>
        <div>
          <RankWidget />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <AchievementsRow />
        <ActivityFeed />
      </div>
    </div>
  );
}
