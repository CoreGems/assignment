# PeakPath — Build Spec

Detailed specification for the chosen concept. No code yet. Decisions are stated explicitly with `Decision:` so you can override any of them before we build.

---

## 1. Product identity

**Name:** PeakPath
**Tagline:** *"Every sale is a step up."*
**Voice:** Confident, warm, second-person. Speaks to the agent like a coach who's seen their numbers. Never corporate, never patronizing.
- ✅ "You're $340 from your stretch goal — three more demos closes it."
- ❌ "Performance metrics indicate proximity to objective threshold."

**Persona we design for:**
> **Alex Chen** — Regional Sales Rep, West Coast territory. 2 years on the team. Currently #6 on the regional leaderboard. Closes ~14 deals/month. Checks the app between client visits, often one-handed on a phone, sometimes on a laptop at a coffee shop between meetings.

Every screen, every number, every empty state assumes Alex. Concrete > generic.

---

## 2. Brand system

### 2.1 Color
**Decision: dark cockpit base.** Light theme not included in v1 (cost vs. value doesn't pay back in 2–3 hours).

| Token | Hex | Use |
|---|---|---|
| `bg-base` | `#0A0A12` | App background — near-black, slight blue cast |
| `bg-elevated` | `#13131F` | Card base before glass effect |
| `bg-glass` | `rgba(255,255,255,0.04)` | Glassmorphism card fill |
| `border-subtle` | `rgba(255,255,255,0.08)` | Hairline card borders |
| `text-primary` | `#F5F5FA` | Body |
| `text-muted` | `#8B8B9E` | Secondary labels |
| `accent-indigo` | `#6366F1` | Primary brand |
| `accent-magenta` | `#D946EF` | Gradient mid |
| `accent-coral` | `#FB7185` | Gradient end / celebration |
| `accent-emerald` | `#10B981` | Positive deltas, success |
| `accent-amber` | `#F59E0B` | Streak / warning |

**Signature gradient:** `linear-gradient(135deg, #6366F1 0%, #D946EF 50%, #FB7185 100%)`
Used on: hero number, progress ring stroke, primary CTA, active tier badge, achievement glow.

### 2.2 Typography
- **Display / numbers:** Space Grotesk (700, 500) — geometric, slightly mechanical, great for large counters.
- **Body / UI:** Inter (500, 400) — neutral, legible at small sizes.
- **Scale:** 12 / 14 / 16 / 20 / 28 / 40 / 64 px. Hero earnings counter is 64.
- **Tabular numerals** on every $ value so counters don't jitter.

### 2.3 Spacing & shape
- 4-px base grid. Component padding always a multiple of 4.
- Card radius: `20px` (large, friendly). Pills: fully rounded. Avatars: circle.
- Card elevation = border + 1px inner highlight (`inset 0 1px 0 rgba(255,255,255,0.06)`) + soft shadow `0 8px 32px rgba(0,0,0,0.4)`. No drop shadows on the dark background — depth comes from layering glass.

### 2.4 Motion
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (gentle ease-out) for entrances; `cubic-bezier(0.4, 0, 0.2, 1)` for hovers.
- Durations: 150ms (hover), 400ms (entrance), 1200ms (counter tick-up).
- Library: Framer Motion for orchestration, Tailwind transitions for hover micro-states.

### 2.5 Iconography
Lucide icons. Single weight, 1.5px stroke. Never colored — they inherit text or accent color.

---

## 3. Information architecture

Two screens only. Routing:
- `/` → Dashboard (Today)
- `/programs/[id]` → Program detail (Quest view)

Top nav (persistent on both): logo · "Today" · "Programs" · "Leaderboard" (greyed/disabled, signals product depth without building it) · avatar.

---

## 4. Screen 1 — Dashboard ("Today")

### 4.1 Layout grid
Desktop (≥1024px): 12-col grid, 24-px gutter, max-width 1280.
Mobile (<768px): single column, 16-px gutter.

```
┌─────────────────────────────────────────────────────────────┐
│  [Greeting + Streak pill]                  [Payout countdown]│  ← hero strip
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────── HERO CARD (8 col) ────────┐ ┌── RING (4) ─┐│
│   │  YTD Earnings  $48,320  ↑ 23%         │ │   Monthly   ││
│   │  ████████████░░░░░  animated counter  │ │   Goal 72%  ││
│   │  Sparkline of last 12 mo              │ │             ││
│   └───────────────────────────────────────┘ └─────────────┘│
│                                                              │
│   ┌─ ACTIVE PROGRAMS (8 col, horizontal scroll) ──┐ ┌RANK─┐│
│   │ [card] [card] [card] [card] →                  │ │ #6  ││
│   │  tier progress bars                            │ │ ▲2  ││
│   └────────────────────────────────────────────────┘ └─────┘│
│                                                              │
│   ┌── ACHIEVEMENTS (6 col) ──┐ ┌── ACTIVITY FEED (6 col) ──┐│
│   │ recent badges row         │ │ timeline of last events    ││
│   └──────────────────────────┘ └────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Component breakdown

**A. Hero strip**
- Left: "Good afternoon, Alex" + streak pill ("🔥 12 weeks above target")
- Right: "Next payout in 4 days — May 25" with subtle pulsing dot

**B. Earnings hero card** *(signature surface)*
- 64px gradient-text counter, animates from 0 → 48,320 on mount (1.2s, ease-out)
- Delta chip: "↑ 23% vs last year"
- 12-month sparkline (Recharts area with gradient fill matching brand)
- "View breakdown →" link to program detail

**C. Monthly goal ring**
- SVG ring, stroke uses brand gradient
- Animates from 0 → 72% on mount
- Center: big 72%, subtitle "$8,640 / $12,000"
- Tooltip on hover: days remaining in month

**D. Active programs row**
- 4 cards, horizontal scroll on mobile, grid on desktop
- Each card: program name, tier badge (Bronze/Silver/Gold/Platinum with matching gradient intensity), tier progress bar, current payout
- Hover: card lifts 4px, border brightens, gradient border-glow
- Click: routes to `/programs/[id]`

**E. Rank widget**
- Big "#6" + "↑ 2 this week" delta in emerald
- Mini avatars of agents ranked #4, #5, **#6 (you)**, #7, #8 with names truncated

**F. Achievements row**
- 5 recent badges as circular gradient-rimmed icons
- Hover: tooltip with badge name + date earned
- "View all 23 →"

**G. Activity feed**
- 4–5 items, icon + line of text + relative timestamp
- "🏆 Unlocked Silver tier in Q2 Renewals · 2h ago"
- "💰 Payout of $1,240 processed · yesterday"
- "🎯 Hit weekly demo goal · 2 days ago"

### 4.3 Empty / loading states
Not needed (mock data is always populated) — but skeleton shimmers on mount for 400ms to make the counter animation feel intentional rather than slow.

---

## 5. Screen 2 — Program Detail ("Quest")

A single active program, deeply visualized. We'll feature **"Q2 Enterprise Renewals"**.

### 5.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back            Q2 ENTERPRISE RENEWALS                    │
│  Tier: SILVER (gradient badge) · Ends in 23 days             │
├─────────────────────────────────────────────────────────────┤
│  ┌─ PATH VISUALIZATION (full width) ──────────────────────┐ │
│  │  ●━━━━━●━━━━━●━━━━━◉━ ─ ─ ○ ─ ─ ─ ○                     │ │
│  │  Bronze Silver  ◀ you ▶   Gold    Platinum               │ │
│  │  $500  $1,500   $2,400    $5,000  $10,000                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ PROJECTION CARD (6 col) ─┐ ┌─ STATS (6 col) ────────┐  │
│  │ "What if I close..."       │ │ Deals closed:     14    │  │
│  │ [slider: +0 to +10 deals]  │ │ Avg deal size: $4,200   │  │
│  │ Projected payout: $3,840   │ │ Conversion:      31%    │  │
│  │ → unlocks GOLD tier        │ │ Days remaining:  23     │  │
│  └────────────────────────────┘ └─────────────────────────┘  │
│                                                              │
│  ┌─ 6-WEEK TREND (full width) ────────────────────────────┐ │
│  │ Bar chart: earnings per week, gradient bars             │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ MILESTONES TIMELINE (full width) ─────────────────────┐ │
│  │ ✓ First deal closed       Apr 3                          │ │
│  │ ✓ Hit 5-deal milestone    Apr 18                         │ │
│  │ ✓ Silver tier unlocked    May 11                         │ │
│  │ ◯ 20-deal milestone       projected May 28               │ │
│  │ ◯ Gold tier unlocked      projected Jun 4                │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Components

**A. Path visualization** — *secondary signature interaction*
- Horizontal track with 5 nodes (tiers)
- Filled portion uses brand gradient; unfilled is `border-subtle`
- Current position marker: pulsing gradient dot with tooltip
- Animates fill on mount (800ms)

**B. Projection card**
- Slider 0–10 additional deals
- Counter updates in real-time as user drags
- When slider crosses a tier threshold, the tier name badge changes color and a subtle "✨ unlocks Gold" appears
- **This is where we show off interactivity** — a reviewer can play with it

**C. Stats grid** — four big numbers, label below each, tabular.

**D. Trend chart**
- Recharts bar chart, 6 bars, gradient fill, rounded tops
- Hover: tooltip with exact $ and week

**E. Milestones timeline**
- Past = solid gradient dot, future = outlined dot
- Past milestones have date, future have "projected" date in muted text

---

## 6. Mock data shape

Single `lib/data.ts` file. Realistic numbers, no `Lorem` anywhere.

```
agent = { name, role, region, avatar, rank, rankDelta }
ytd = { earnings, deltaPct, monthlyTrend: number[12] }
monthlyGoal = { current, target, daysLeft }
streak = { weeks, type: 'above-target' }
nextPayout = { date, amount }
programs = [
  { id, name, tier, tierProgress, payout, endsInDays, gradient },
  ... 4–6 of them
]
programDetail = {
  ...program,
  tiers: [{ name, threshold, payout }, ...5],
  currentPosition,
  stats: { dealsClosed, avgDealSize, conversion, daysRemaining },
  weeklyTrend: number[6],
  milestones: [{ label, date, status: 'done'|'projected' }, ...]
}
achievements = [{ name, icon, earnedAt }, ...23]
activity = [{ icon, text, ts }, ...8]
leaderboardNeighbors = [{ rank, name, avatar }, ...5]
```

Numbers tuned so they feel real and tell a story: Alex is mid-pack, on a good streak, one Gold tier away from a noticeable payout bump. Reviewers should sense a narrative.

---

## 7. Responsive behavior

| Breakpoint | Behavior |
|---|---|
| ≥1280px | Full grid as drawn |
| 1024–1279 | Same grid, tighter gutters |
| 768–1023 | Hero stacks above ring; programs scroll horizontally; activity moves below achievements |
| <768px | Single column, hero shrinks to 40px, ring sits below hero, programs become snap-scroll carousel, nav collapses to bottom tab bar |

Test in browser at 375 (iPhone SE), 768 (iPad), 1280 (laptop), 1920 (monitor).

---

## 8. The one signature interaction

**Decision: the earnings counter + ring + sparkline orchestrated entrance.**

On dashboard mount:
1. (0ms) Skeleton shimmer placeholders fade in
2. (200ms) Counter starts ticking from $0
3. (400ms) Ring stroke begins drawing
4. (600ms) Sparkline area chart sweeps left-to-right
5. (1200ms) All three settle at final values simultaneously
6. (1300ms) Delta chips fade in last

This is the moment a reviewer will screen-record. Everything else is polished but quieter.

**Secondary interaction:** the projection slider on the Quest screen (deliberately invites play).

---

## 9. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Fastest path to Vercel deploy; routing for two screens |
| Styling | Tailwind v4 | Speed + design tokens via CSS vars |
| Components | shadcn/ui (selectively: Card, Button, Tooltip, Avatar, Slider) | Pre-styled accessible primitives we restyle |
| Charts | Recharts | Easiest gradient fills, good enough for sparkline + bar |
| Motion | Framer Motion | Counter, ring, entrance orchestration |
| Icons | lucide-react | Tree-shakeable, consistent stroke |
| Fonts | next/font (Space Grotesk + Inter) | No FOUT, self-hosted |
| Deploy | Local `next start` on Windows + Cloudflare Tunnel | Run the production build locally and expose it via `cloudflared` — no hosting account, no platform lock-in, public HTTPS URL for the reviewer. See §13. |

No state management library. No CMS. No backend. All data static in `lib/data.ts`.

---

## 10. Build order (estimated 2.5 hours)

1. **0:00–0:15** — Scaffold Next.js, install deps, set up Tailwind tokens + fonts, base layout shell
2. **0:15–0:30** — Mock data file with realistic numbers
3. **0:30–1:15** — Dashboard: hero card + ring + signature entrance animation
4. **1:15–1:40** — Dashboard: programs row, rank widget, achievements, activity feed
5. **1:40–2:10** — Program detail screen: path viz + projection slider + trend + milestones
6. **2:10–2:25** — Responsive pass, mobile fixes
7. **2:25–2:35** — `npm run build && npm start` locally, launch `cloudflared` tunnel, smoke-test the public URL on phone + laptop
8. **2:35–2:50** — Write `README.md` with design notes (the assignment asks for this) + how to spin the tunnel back up

**Cuts if running long, in order:** activity feed → achievements row → projection slider → 6-week bar chart. Hero + ring + path viz are non-negotiable.

---

## 11. Deliverable checklist

- [ ] Public Cloudflare Tunnel URL pasted into submission (with note: live while host machine is online)
- [ ] GitHub repo public, clean commits
- [ ] `README.md` covers: design approach, key UI/UX decisions, assumptions, how to run locally, how to relaunch the tunnel
- [ ] Screenshots in README (desktop + mobile) — bulletproof against the tunnel being offline at review time
- [ ] Short screen-recording of the signature animation (Loom/GIF) embedded in README — also bulletproofs offline review
- [ ] Favicon + page title set (small detail, big signal)
- [ ] No console errors, no Lighthouse red flags
- [ ] Works in latest Chrome, Safari, Firefox

---

## 12. Local deploy + Cloudflare Tunnel (Windows)

Goal: serve the production build from the Windows machine and hand the reviewer a public HTTPS URL — without buying hosting or configuring DNS.

### 12.1 One-time setup

**Install `cloudflared`** (pick one):
- `winget install --id Cloudflare.cloudflared` *(recommended — uses Windows Package Manager, gets onto PATH cleanly)*
- `scoop install cloudflared` if you use Scoop
- Direct `.msi` from `github.com/cloudflare/cloudflared/releases` and run the installer

Verify in a fresh PowerShell window: `cloudflared --version`

### 12.2 Two tunnel modes — decision

| Mode | URL | Persistent? | Needs Cloudflare account? | Needs a domain? |
|---|---|---|---|---|
| **Quick tunnel** | `https://<random-words>.trycloudflare.com` | No — new URL each restart | No | No |
| **Named tunnel** | `https://peakpath.yourdomain.com` (or any subdomain you control) | Yes — same URL across restarts | Yes (free tier) | Yes (must be on Cloudflare DNS) |

**Decision: Quick tunnel.**
For a take-home submission the reviewer opens within a day or two, the random `trycloudflare.com` URL is fine and saves ~15 min of account/DNS config. If you already have a domain on Cloudflare, the named tunnel is a tiny upgrade — note it as a stretch.

### 12.3 Launch sequence (each session)

Open **two PowerShell windows** in the project directory.

**Window 1 — Next.js production server:**
```
npm run build
npm start                       # serves on http://localhost:3000
```
(`npm start` runs `next start`, which is the production server. Don't ship `next dev` — slower, ugly dev overlays, hot-reload warnings.)

**Window 2 — Cloudflare tunnel:**
```
cloudflared tunnel --url http://localhost:3000
```
Cloudflared prints a banner with the public URL — copy the `https://...trycloudflare.com` line. That's the link you share.

### 12.4 Operational caveats (call these out in the README)

- **Demo is live only while your machine is awake.** Set Windows power plan to never sleep while the tunnel is running, or warn the reviewer of a viewing window.
- **Bandwidth comes from your connection.** Fine for an assignment — keep image assets reasonable.
- **URL rotates on restart.** If the tunnel drops, you get a new URL. Mitigated by: (a) the README screenshots, (b) the screen-recording, (c) reviewer can just clone and `npm start` locally if the live URL is dead.
- **Firewall:** Windows Defender may prompt the first time `cloudflared` runs. Allow it on Private networks only.
- **No auth needed on the Next.js side** — Cloudflare terminates TLS and proxies to localhost over the tunnel. The local port is not exposed to the public internet directly.

### 12.5 Optional polish: one-command launcher

A `start-demo.ps1` script at repo root that runs `npm start` and `cloudflared` in parallel, prints the URL, and tears both down on Ctrl+C. Cheap to write, makes the README instructions a single line. Adding it is a nice "attention to detail" signal.

---

## 13. Open questions for you

1. **Persona name** — keep "Alex Chen" or change?
2. **Featured program name** — "Q2 Enterprise Renewals" or something more specific to a real industry vertical (SaaS, insurance, retail, telecom)?
3. **Submission target** — is there a specific company/role this is going to? That might shift accent color or vertical-specific copy.
4. **Repo + Vercel** — is the GitHub repo for this assignment already set up, or do I create one when the time comes?

Answer those when you're ready and I'll incorporate them, then we move to build.
