# PeakPath

**A gamified incentive-tracking dashboard for sales and field agents.** Track earnings, hit tiers, and stay one step ahead of every payout.

## About this submission

This is my response to the short UI/UX prototype exercise sent as part of the evaluation process. The brief asked for a modern web portal for field / sales / service agents to track incentives, performance, and engagement — scoped to 1–2 responsive screens and roughly 2–3 hours of effort. The full brief is preserved at [`app_requirement.md`](./app_requirement.md).

What I built: **PeakPath**, a four-screen prototype — **Dashboard**, **Program Detail**, **Leaderboard**, and an in-app **Rules** explainer — with a dark cockpit aesthetic, full light theme, and two switchable personas (Alex Chen / Maya Patel). Front-end only, mock data, no backend. Hosted from my local Windows machine via Cloudflare Tunnel so you can click and try it before reading any code.

> The brief asked for 1–2 screens. Started there, then added the Leaderboard (because the dashboard's rank widget begged for a click-through) and the in-app Rules page (so a non-domain reviewer can orient without leaving the app). Each addition justified itself against the use case rather than being there to pad the submission.

## Live demo

🔗 **<https://actress-seasons-arrived-incentive.trycloudflare.com>**

> ⚠️ This is a Cloudflare quick tunnel from a local Windows machine. The URL may rotate if the tunnel restarts, and the demo is live only while my machine is awake. If the link is down when you visit, see [Run locally](#run-locally) — the repo builds and runs in under a minute.

## Screenshots

| Dashboard (dark) | Program detail (dark) |
| --- | --- |
| _to be added_ | _to be added_ |

| Dashboard (light) | Mobile |
| --- | --- |
| _to be added_ | _to be added_ |

## Use cases — read these next

The fastest way to understand the prototype is to see it through the eyes of the people who'd use it. Four short reads in [`use-cases/`](./use-cases/):

- **[01 — Morning glance](./use-cases/01-morning-glance.md)** — Alex on a Tuesday morning, 9 seconds on a phone. Why the dashboard is glanceable.
- **[02 — Projection planning](./use-cases/02-projection-planning.md)** — Maya plans next week using the projection slider. The secondary signature interaction in action.
- **[03 — End-of-month review](./use-cases/03-end-of-month-review.md)** — How the dashboard reads as a *story*, not a report. Why the mock data is coherent across surfaces.
- **[04 — Product thinking](./use-cases/04-product-thinking.md)** — Why two personas, why dark by default, what's intentionally not built, what this becomes at scale.

## What it does

PeakPath gives a sales rep or field agent a personal view of:

- **YTD earnings** with year-over-year delta and a 12-month trend sparkline
- **Monthly goal progress** as an animated ring
- **Active incentive programs** — each card shows current tier, progress to the next tier, and earned-so-far
- **Regional rank** with the four neighbors above and below (and a click-through to the full leaderboard)
- **Recent achievement badges** with hover-revealed flavor text
- **Activity feed** of the most recent events that moved the numbers

Plus three secondary surfaces:

- **Program detail ("Quest" view)** — full tier path, a live **"what if I close N more deals?" projection slider**, weekly trend bar chart, milestones timeline
- **Leaderboard** — top-3 podium cards (gold / silver / bronze rank colors) above a 17-row table of the rest of the region, current user highlighted
- **Rules** — in-app explainer answering "what is this?" for a reviewer who isn't familiar with the SPM/ICM category

Every screen supports switching between **two personas** (Alex Chen / Maya Patel — runtime toggle in settings) and two **themes** (dark / light — segmented control in settings).

## Design approach

The brief weighted creativity, branding, and UX craft. Three concept directions were considered (a gamified "Strava-meets-Duolingo" angle, a clean enterprise-analytics angle, and a mobile-first motivational angle). The gamified direction won because the assignment explicitly rewards visual punch, and the use case — reps tracking their own incentive earnings — naturally benefits from the dopamine-loop framing.

### Brand
- Dark cockpit aesthetic as the default. Near-black background with a single signature gradient (indigo → magenta → coral) applied to the moments that matter: the hero earnings number, the goal-ring stroke, tier badges on active programs, and the projection-slider crossing animation.
- Glassmorphism cards in dark theme. **Light theme uses solid white cards with soft layered shadows** — glassmorphism on white looks dingy.
- Typography: **Space Grotesk** for display + numbers, **Inter** for body. Tabular numerals across every dollar value so animated counters never jitter.

### The signature interaction
The dashboard's **orchestrated entrance** is the moment a reviewer notices. On mount:

1. Greeting + payout pill fade in (200ms)
2. Earnings counter ticks from $0 → $48,320 (400ms start, 1s duration)
3. Goal ring stroke fills 0 → 72% (600ms start, 1s duration)
4. Sparkline area chart sweeps left-to-right (600ms start, 900ms duration)
5. Delta chips fade in last (1400ms)

Everything respects `prefers-reduced-motion`.

### The secondary interaction
The **projection slider** on the program detail page. Drag it to see "if I close 3 more deals, here's my new payout." When the slider crosses a tier threshold, the projected number pulses and a "✨ Unlocks Gold tier" badge fades in. Deliberately invites play — most reviewers will land there and start dragging.

### Personas
The persona switch (Alex Chen ↔ Maya Patel) is real, not cosmetic — every copy string is templated so greetings, activity entries, and the leaderboard row all swap naturally. Data is shared; only name, avatar, and pronouns change. Small inclusivity gesture, real engineering.

## Tech stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind v4** with custom design tokens via `@theme`
- **Radix UI** primitives for the slider, popover, and tooltip
- **Recharts** for the sparkline and weekly trend
- **Framer Motion** for entrance choreography and counter
- **lucide-react** for icons
- **next-themes** for dark ↔ light with no-flash hydration
- **DiceBear** (pre-downloaded SVGs in `/public/avatars`) for persona + leaderboard avatars

No backend, no API routes, no auth, no analytics. All state in `lib/data.ts` and `lib/copy.ts`. Theme + persona preferences persist to `localStorage`.

## Assumptions

- Numbers are mock — in production they'd come from a system of record like Salesforce, SAP Commissions, Xactly, or CaptivateIQ.
- Single agent view; manager / admin perspectives are out of scope.
- "Today" is fixed at May 21, 2026 throughout the app, so relative timestamps and screenshots stay stable.
- No auth, per the brief.

## What's intentionally not built

To keep the prototype tight while signaling product depth:

- **"View all 23 achievements"** — inert link; the 5 most recent are interactive on the dashboard, and the rest exist in the data file
- **Filters on the leaderboard** — single regional view; territory / period filters would be one screen away
- **Manager / admin perspective** — same data rolled up across direct reports, plus payout-approval flows
- **Persistence beyond `localStorage`** — slider position resets on reload, no real backend
- **Notifications, profile editing, settings beyond theme + persona** — out of scope

## Run locally

```bash
git clone <repo-url>
cd <repo>
npm install
npm run dev          # http://localhost:3000
# or for production:
npm run build && npm start
```

Node 20+ recommended. No environment variables required.

## How to relaunch the Cloudflare tunnel

The repo ships a one-command launcher that kills anything on port 3000 + any existing cloudflared, then starts both fresh in their own PowerShell windows and prints the public URL:

```powershell
.\start_app.ps1
```

Manual two-window equivalent:

```powershell
# in one window:
npm start

# in another:
cloudflared tunnel --url http://localhost:3000
```

cloudflared on Windows: `winget install --id Cloudflare.cloudflared`. The tunnel URL prints to stdout — copy and share. URL rotates on every restart.

## Repo structure

```
src/
  app/
    layout.tsx              # ThemeProvider + PersonaProvider + TopNav
    page.tsx                # Dashboard
    programs/[id]/page.tsx  # Quest view
    leaderboard/page.tsx    # Top-3 podium + table of ranks 4–20
    rules/page.tsx          # In-app explainer
  components/
    nav/                    # top-nav + logo
    settings/               # theme + persona popover
    dashboard/              # hero, ring, programs, rank, achievements, activity
    program/                # tier-path, projection slider, trend, milestones, stats
    ui/                     # animated-counter (shared)
  lib/
    data.ts                 # all numbers (20-entry leaderboard included)
    copy.ts                 # all visible strings, templated by persona name
    types.ts
    persona-context.tsx
    utils.ts
public/
  avatars/                  # 21 DiceBear SVGs (Alex, Maya, 19 leaderboard peers)
plan/                       # build-plan history (00_PREP through 12_README)
use-cases/                  # 4 narrative docs for the recruiter
start_app.ps1               # one-command launcher: kills + restarts server + tunnel
```
