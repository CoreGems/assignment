# PeakPath — What this app does

A one-page plain-language explainer. No design jargon, no implementation detail. Suitable for the top of the README or a stakeholder intro slide.

---

## In one sentence

**PeakPath is a personal dashboard that shows sales reps and field agents how much they're earning, what they need to do to earn more, and where they stand against their peers — in real time.**

---

## The problem it solves

Companies with sales teams or field agents pay people partly in salary and partly in **bonuses** tied to performance. Each company runs several bonus programs at once, each with its own rules, tiers, deadlines, and payouts.

The people *earning* this money usually have **no clear picture** of:

- How much they've earned so far this year
- When they'll get paid next, and how much
- Which bonus program is worth focusing on this week
- How close they are to unlocking a higher tier
- How they're ranking compared to peers

Today, this information lives in spreadsheets, PDFs from finance, and emails — often weeks out of date. Reps guess. Engagement drops. Companies lose top performers because they don't *feel* the reward they're actually earning.

---

## What PeakPath shows the user

Two screens, designed for an agent named Alex who checks the app between meetings.

### 1. Dashboard ("Today")
At a glance, Alex sees:

- **Total earnings this year** — animated counter, with year-over-year change
- **This month's goal progress** — a ring filling toward 100%
- **Next payout** — date and amount, counting down
- **Active bonus programs** — cards showing each program, current tier, and progress to the next tier
- **Rank** — position on the regional leaderboard, with nearby peers
- **Streak and recent achievements** — badges earned, momentum signals
- **Activity feed** — every recent event that affected earnings ("payout processed", "tier unlocked", "deal counted")

### 2. Program Detail ("Quest")
Tap any program to see:

- **The tier path** — Bronze → Silver → Gold → Platinum, with Alex's current position marked
- **A "what if" projection slider** — drag to ask *"if I close N more deals, what do I earn?"* and watch the number recalculate live, with visual feedback when crossing into a new tier
- **Stats** — deals closed, average deal size, conversion rate, days remaining
- **6-week trend** — how earnings are tracking week over week
- **Milestones timeline** — past achievements and projected future ones, dated

---

## Why these specific features

| Feature | Why it exists |
|---|---|
| Animated earnings counter | Money is emotional — a static number is a fact, an animated counter is a feeling of momentum |
| Tier path visualization | Reps think in tiers ("am I Silver yet?"), not raw dollars — the path makes the bonus structure legible |
| Projection slider | Answers the #1 question every rep actually has: *"what do I need to do to earn more?"* |
| Leaderboard with neighbors | Sales culture is competitive — showing rank with peers (not just #1) keeps mid-pack reps engaged |
| Streak and badges | Borrowed from Duolingo/Strava — habit-forming, disproportionate motivational lift for low render cost |
| Activity feed | Closes the loop between *doing the work* and *seeing the reward* — the faster this loop, the more motivating |

---

## Who it's for

**End user:** sales reps, field agents, service techs, retail associates — anyone whose pay includes a meaningful variable component tied to measurable activity.

**Buyer:** the VP of Sales or Head of Revenue Operations at the company employing those agents. They have three problems PeakPath addresses:

1. Reps churn because they don't *feel* rewarded for the work they do
2. Reps focus on the wrong programs because nobody explains the math
3. Existing incentive tools look like enterprise spreadsheets reps refuse to open

PeakPath's pitch: *"Give your reps clarity and a sense of momentum, and they'll sell more. Here's a beautiful app they'll actually open."*

---

## What this app is NOT

- **Not a CRM** — doesn't log deals, manage pipeline, or track contacts
- **Not a commission calculation engine** — assumes the math happens upstream in a system of record; PeakPath consumes the results
- **Not a manager tool** — designed for the individual contributor, not their boss
- **Not a learning platform** — no training content, no quizzes
- **Not built for this assignment** — this prototype is the *visual layer*; in a real product the data would come from APIs into systems like Salesforce, SAP Commissions, Xactly, or CaptivateIQ

---

## Category

This product would compete in **Sales Performance Management (SPM)** / **Incentive Compensation Management (ICM)** — a category dominated by Xactly, CaptivateIQ, Performio, Varicent, and SAP Commissions. PeakPath's differentiation in that landscape would be the consumer-grade UX layer: most incumbents have powerful back-office calculation engines but rep-facing dashboards that feel like 2012 enterprise software.
