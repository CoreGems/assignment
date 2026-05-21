# App Concept Options

Three different directions for the field/sales agent incentives portal. Each is scoped to 1–2 screens and fits the 2–3 hour budget. Pick one (or mix elements) before we start coding.

---

## Option 1 — "PeakPath" — Gamified Journey

**Vibe:** Strava-meets-Duolingo for sales agents. Bright, energetic, motivational.

**Branding direction**
- Bold gradient palette: electric indigo → magenta → coral accents
- Rounded geometric type (e.g. Plus Jakarta Sans / Space Grotesk)
- Soft glassmorphism cards on a dark "cockpit" background
- Micro-animations: counters tick up, progress rings animate on load, badge "pop" on hover

**Screen 1 — Dashboard ("Today")**
- Hero: animated YTD earnings counter + "Next payout in 4 days" pill
- Big circular progress ring: monthly goal completion %
- Streak tracker (e.g. "12 weeks above target") with flame icon
- Leaderboard widget — agent's rank in region with avatars of neighbors
- Active programs as swipeable cards with "tier progress" bars (Bronze → Silver → Gold)
- Recent badge earned, with confetti micro-interaction

**Screen 2 — Program Detail**
- "Quest"-style breakdown of one incentive program
- Milestones along a visual path/timeline (locked → in-progress → unlocked)
- Projected payout calculator: slider to "what if I sell N more units?"
- Trend sparkline of last 6 weeks
- Tips card: "Top performers in your region do X"

**Strengths:** Highest visual wow factor. Best showcase of creativity and front-end polish.
**Risk:** Can feel "toy-ish" for enterprise buyers if overcooked. Keep animations tasteful.

---

## Option 2 — "Ledger" — Executive / Analytics-First

**Vibe:** Linear-meets-Stripe-Dashboard. Clean, dense, professional. Trustworthy.

**Branding direction**
- Monochrome base (off-white / near-black) with a single accent color (e.g. emerald or cobalt)
- Inter or IBM Plex Sans, generous whitespace, hairline dividers
- Subtle data-viz: small multiples, sparklines, sober bar charts (Recharts/Visx style)
- No gradients, no glass — flat, crisp, high-contrast

**Screen 1 — Dashboard**
- Top KPI strip: YTD Earnings · This Month · Projected Bonus · Rank
- Earnings trend line (12-month) with payout markers
- Compact table: Active Programs with progress %, payout, end date
- Goal completion mini-bars per category (New accounts, Renewals, Upsell)
- Upcoming payout card with date + amount + breakdown

**Screen 2 — Performance Breakdown**
- Filterable by quarter/program/territory
- Stacked bar: earnings by source over time
- Tier-progress visualization (where you sit on the commission curve)
- Drill-down table: every qualifying transaction with status

**Strengths:** Reads as "real product." Strong signal for UI polish, data density, attention to detail. Ages well.
**Risk:** Less "creative" wow — relies entirely on craft, typography, spacing.

---

## Option 3 — "Pulse" — Mobile-First Motivational Companion

**Vibe:** Like a fitness app for your paycheck. Field agents check it on their phone between visits.

**Branding direction**
- Warm, optimistic palette: deep navy + sunrise orange + cream
- Large touch targets, thumb-zone navigation, bottom tab bar
- Friendly tone in copy: "Nice work, Alex — you're $340 from your stretch goal"
- Lottie/SVG illustrations for empty states and milestones

**Screen 1 — Home (mobile-first, scales up to desktop)**
- Personalized greeting + today's snapshot card
- "Progress to next payout" hero ring with $ amount
- Story-style horizontal scroll of active programs (tap to open)
- Activity feed: "You unlocked Silver tier", "New program available", "Payout processed"
- Quick actions: log activity, view leaderboard, see history

**Screen 2 — Incentive Detail**
- Full-bleed program header with image + tier
- Progress visualization with "what counts" explainer
- Earnings-so-far + projection-if-current-pace
- Achievement timeline showing milestones already hit
- Share / celebrate button (mock)

**Strengths:** Best showcase of responsive design + interaction quality. Empathetic to the actual user (field agent on a phone).
**Risk:** Mobile-first means desktop view needs care so it doesn't look empty on a 1440px monitor.

---

## My recommendation

**Option 1 (PeakPath)** for maximum impact in a portfolio-style review — the assignment explicitly calls out "creativity," "branding," and "visual design quality" as evaluation criteria, and gamified incentive UX is on-brand for the actual problem domain.

**Option 2 (Ledger)** if you suspect the reviewers skew enterprise/B2B and will reward restraint over flash.

**Hybrid worth considering:** PeakPath's energy on the dashboard + Ledger's rigor on the detail page — proves range in one submission.

---

## Cross-cutting decisions to lock before building

1. **Stack** — Next.js + Tailwind + shadcn/ui + Recharts is the fastest path to polish; deploy to Vercel.
2. **Persona** — pick one fictional agent ("Alex Chen, Regional Sales Rep, West Coast") and design everything for them. Concrete > generic.
3. **Mock data** — write a single `data.ts` with realistic numbers (no `$1,234,567.89` placeholders). Real-feeling data sells the design.
4. **Dark mode** — pick one and commit. Doing both well doubles the work.
5. **Responsive breakpoints** — design mobile + desktop only; skip tablet-specific layouts.
6. **One signature interaction** — pick a single moment to polish (animated counter, ring fill, badge unlock). Reviewers remember one thing.
