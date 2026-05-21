# PeakPath — Build Spec

Detailed specification for the chosen concept. No code yet. Decisions are stated explicitly with `Decision:` so you can override any of them before we build.

---

## 1. Product identity

**Name:** PeakPath
**Tagline:** *"Every sale is a step up."*
**Voice:** Confident, warm, second-person. Speaks to the agent like a coach who's seen their numbers. Never corporate, never patronizing.
- ✅ "You're $340 from your stretch goal — three more demos closes it."
- ❌ "Performance metrics indicate proximity to objective threshold."

**Personas (runtime-switchable, see §16):**

> **Alex Chen** *(default)* — Regional Sales Rep, West Coast territory. 2 years on the team. Currently #6 on the regional leaderboard. Closes ~14 deals/month. Checks the app between client visits, often one-handed on a phone, sometimes on a laptop at a coffee shop between meetings. Pronouns: he/him.

> **Maya Patel** — Same role, same region, same tenure, same numbers. Pronouns: she/her. Different avatar. Allows the reviewer to flip the persona in settings and see the app speak naturally for either user.

**Data is shared across both personas** — only name, avatar, and pronouns swap. The narrative arc, programs, leaderboard position, and numbers stay identical. This keeps the content workload tractable while making the inclusivity gesture genuine rather than tokenistic.

Every screen, every number, every empty state assumes the active persona. Copy strings template the name and pronouns rather than hardcoding "Alex".

---

## 2. Brand system

### 2.1 Color — two themes

**Decision:** ship both dark and light, user-switchable in settings (see §16). Dark is the default and the primary design target; light is a careful translation, not a recolor.

**Brand accents (identical across both themes):**

| Token | Hex | Use |
|---|---|---|
| `accent-indigo` | `#6366F1` | Primary brand |
| `accent-magenta` | `#D946EF` | Gradient mid |
| `accent-coral` | `#FB7185` | Gradient end / celebration |
| `accent-emerald` | `#10B981` | Positive deltas, success |
| `accent-amber` | `#F59E0B` | Streak / warning |

**Signature gradient:** `linear-gradient(135deg, #6366F1 0%, #D946EF 50%, #FB7185 100%)` — works on both themes. Used on: hero number, progress ring stroke, primary CTA, active tier badge, achievement glow.

**Dark theme (cockpit):**

| Token | Hex | Use |
|---|---|---|
| `bg-base` | `#0A0A12` | App background — near-black, slight blue cast |
| `bg-elevated` | `#13131F` | Card base before glass effect |
| `bg-surface` | `rgba(255,255,255,0.04)` | Glassmorphism card fill |
| `border-subtle` | `rgba(255,255,255,0.08)` | Hairline card borders |
| `text-primary` | `#F5F5FA` | Body |
| `text-muted` | `#8B8B9E` | Secondary labels |

**Light theme (daylight):**

| Token | Hex | Use |
|---|---|---|
| `bg-base` | `#F7F7FB` | App background — warm off-white with a hint of cool |
| `bg-elevated` | `#FFFFFF` | Card base |
| `bg-surface` | `#FFFFFF` | Solid card fill (NO glassmorphism in light theme — see note) |
| `border-subtle` | `rgba(15,15,30,0.08)` | Hairline card borders |
| `text-primary` | `#0F0F1E` | Body |
| `text-muted` | `#6B6B7E` | Secondary labels |
| `shadow-card` | `0 1px 2px rgba(15,15,30,0.04), 0 8px 24px rgba(15,15,30,0.06)` | Replaces glass depth |

**Important light-theme note:** glassmorphism doesn't translate to light backgrounds — it looks dingy. Light theme uses **solid white cards with soft layered shadows** to convey depth. The cards still have the same border radius (20px), same accent gradients, same animations. The brand reads as continuous; the surface treatment changes.

Implementation: CSS custom properties on `:root` with `[data-theme="light"]` overrides. Tailwind v4 `@theme` block exposes them. `next-themes` handles toggle + persistence + system-preference detection + no-flash hydration.

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

Top nav (persistent on both): logo · "Today" · "Programs" · "Leaderboard" (greyed/disabled, signals product depth without building it) · settings (gear icon) · avatar.

Clicking the gear icon opens the settings dropdown (theme toggle + persona switch — see §16).

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

## 6. Mock data + copy

Two files. Realistic numbers, no `Lorem` anywhere. Both are generated offline via the invisible-AI workflow (see §15) using a story bible as context, then hand-edited.

**`lib/data.ts`** — all numeric state and structured records:

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

Numbers tuned so they feel real and tell a story: Alex is mid-pack, on a good streak, one Gold tier away from a noticeable payout bump. Reviewers should sense a narrative. The story bible (§15) is what keeps the numbers across all 12 months, 6 weeks, 6 programs, and 8 activity entries coherent rather than randomly scattered.

**`lib/copy.ts`** — every visible string in the app, organized by surface:

```
greetings: { byTimeOfDay: string[], byStreak: string[] }   // rotate per session
tooltips: { [metricKey]: string }                          // one per metric
tierDescriptions: { bronze, silver, gold, platinum: string }
milestoneCelebrations: { onCross: (tier) => string }       // for slider crossing
emptyStates: { [surface]: string }
achievementCopy: { [achievementId]: { name, flavor, criteria } }
```

Hand-edit every string after generation. The LLM gets you 90%; your edits are what makes it not-AI.

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

## 10. Build order (estimated ~5 hours — superseded by `plan/` files)

> **Note:** As of the §14 + §15 additions (theme switching + persona switching + sequential plan files), this section is a *summary*. The authoritative step-by-step lives in the `plan/` directory at repo root, one file per phase. Use that during execution. The summary below is kept for spec coherence.

1. **0:00–0:10** — Write the **story bible** for Alex (see §15). 1 page of Markdown that frames every subsequent generation. Stays in `dev/` or outside the repo entirely.
2. **0:10–0:25** — Scaffold Next.js, install deps, set up Tailwind tokens + fonts, base layout shell
3. **0:25–0:50** — Generate `lib/data.ts` via LLM using the story bible as context. Paste, eyeball every number, hand-tune the 5–10 that feel off.
4. **0:50–1:35** — Dashboard: hero card + ring + signature entrance animation
5. **1:35–2:00** — Dashboard: programs row, rank widget, achievements, activity feed. Generate `lib/copy.ts` strings as each surface comes online (tooltips, empty states, achievement names). Hand-edit each.
6. **2:00–2:30** — Program detail screen: path viz + projection slider + trend + milestones. Generate milestone copy + tier descriptions + slider-crossing celebrations the same way.
7. **2:30–2:45** — DiceBear avatars wired in for Alex + 5 leaderboard peers. Lucide-icons-in-gradient-circles for badges.
8. **2:45–3:00** — Responsive pass, mobile fixes
9. **3:00–3:10** — **Copy editing pass** — read every visible string aloud, rewrite anything that sounds robotic or generic. *This is where invisible AI either lands or doesn't.*
10. **3:10–3:20** — `npm run build && npm start` locally, launch `cloudflared` tunnel, smoke-test the public URL on phone + laptop
11. **3:20–3:35** — Write `README.md` with design notes (the assignment asks for this) + how to spin the tunnel back up

**Cuts if running long, in order:** DiceBear avatars (fall back to initials in gradient circles) → achievements row → activity feed → 6-week bar chart. Hero + ring + path viz + projection slider are non-negotiable.

**No cuts on the copy editing pass.** A rushed copy pass undoes the entire invisible-AI strategy.

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
- [ ] `.env` confirmed gitignored (it already is — see `.gitignore` line 69); `OPENAI_API_KEY` never leaves the local machine
- [ ] `openai` package NOT in `package.json` (used only at dev time via `npx` or a sibling scratch script — never a runtime dep)
- [ ] No `app/api/*` route proxies to an LLM; no client code references `OPENAI_API_KEY`
- [ ] Story bible and any AI-generation scratch scripts excluded from the final repo (or left in `dev/` with `dev/` in `.gitignore`)

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

## 13. Invisible-AI content workflow

The running app exposes **no AI surface** — no chat, no synthetic voice, no AI labels, no streaming text, no `openai` runtime dependency. AI is used exclusively as an offline content production tool. The `OPENAI_API_KEY` lives in `.env` (already gitignored at `.gitignore:69`) and is touched only during development.

### 13.1 The story bible

A single 1-page Markdown file (e.g., `dev/story-bible.md`) that frames every subsequent generation. Never shipped. Pasted into the LLM prompt context for every data/copy generation.

Includes:
- Alex's full persona: role, region, tenure, what they sell, who they sell to
- Narrative arc across the last 12 months (concretely: "slow March because long-running deal closed but pipeline thinned", "strong April: rebuilt pipeline + landed two renewals", "accelerating May: currently #6, up 2 spots, on track to hit Gold tier in Q2 Enterprise Renewals if they close 3 more deals")
- Tone guide for all copy ("confident, warm, second-person, never corporate, never patronizing — see §1")
- Constraints ("never fabricate company names that exist; never use real customer names; numbers must be self-consistent across all surfaces")

Without this, every generation drifts. With it, the dashboard tells one coherent story.

### 13.2 What gets AI-generated, then hand-edited

| Surface | Generated content | Hand-edit pass |
|---|---|---|
| `lib/data.ts` — 12-month trend | 12 numbers matching the arc | Tune the dip in March, the May acceleration |
| `lib/data.ts` — programs (6) | Names, tier thresholds, end dates, payouts | Strip anything that sounds AI-generic ("Synergy Initiative") |
| `lib/data.ts` — achievements (23) | Names + flavor + criteria | Sharpen the best 5–10, leave others as filler |
| `lib/data.ts` — activity feed (8) | Specific consequential entries | Verify every entry maps to a real change in the numbers |
| `lib/data.ts` — leaderboard peers (5) | Diverse plausible names | Cross-check the rank deltas are mathematically possible |
| `lib/copy.ts` — greetings | 12+ variants by time + streak | Trim anything corny; rotate per session |
| `lib/copy.ts` — tooltips | One per metric, specific | Verify each says something the number doesn't already say |
| `lib/copy.ts` — tier descriptions | Bronze/Silver/Gold/Platinum, plain language | Tighten — these are read often |
| `lib/copy.ts` — milestone celebrations | Slider-crossing copy | Test live; if it reads cheesy, kill it |
| `lib/copy.ts` — empty states | Per-surface fallback messages | These are easy AI tells — extra editing time |
| Avatars | DiceBear seeds | DiceBear is algorithmic, not AI — no editing needed |
| Badges | Lucide icons in gradient circles | No AI involved |

### 13.3 Workflow mechanics

How you'll actually run the generation, given the key is in `.env`:

**Option 1 — sibling scratch script (recommended).** Outside the Next.js project, write a tiny `dev/generate.ts` (or `.mjs`) that reads `.env`, calls the OpenAI SDK, prints output to stdout. You run it, copy-paste the result into `lib/data.ts` or `lib/copy.ts`, hand-edit, commit only the result. The script itself stays in `dev/` and `dev/` is added to `.gitignore`. Keeps `openai` out of `package.json`.

**Option 2 — paste into the LLM chat directly.** Skip the script entirely. Paste the story bible into ChatGPT / Claude desktop / whatever you use, ask for the data structure, copy-paste back. Zero dependency footprint, zero risk of accidental key leak. Slightly slower iteration loop.

**Decision: Option 2** for this assignment. The data + copy volume is small enough that a chat session is faster than writing a script, and it leaves zero AI footprint in the repo even by accident.

### 13.4 The editing pass (non-negotiable)

After all generation is done, before deploy:

1. Open the running app on desktop. Open every surface. Read every visible string aloud.
2. Anything that sounds like AI, rewrite. Tells include:
   - Over-balanced sentences ("not just X, but also Y")
   - Synonyms where the simple word would do ("commence" instead of "start")
   - Polite hedging ("you might want to consider...")
   - Inspirational generic-isms ("Your journey to success continues!")
   - Three-item lists where two would do
3. Inject specificity wherever possible. "Great work!" → "Your demo→close rate jumped 8% this week."
4. Inject contractions where a real product would use them. AI defaults to formal; humans say "you're", "it's", "let's".

This pass takes ~10 min and is the entire reason the invisible-AI strategy works.

### 13.5 What not to do (security + tell-prevention recap)

- `openai` package must NOT appear in `package.json` (a reviewer running `cat package.json` is one of the first things that happens)
- No `app/api/*` route proxies to an LLM
- No client-side code references `OPENAI_API_KEY` or any model name
- `dev/` directory gitignored if it contains any AI scripts
- `.env` already gitignored (`.gitignore:69`); double-check before pushing
- Set an OpenAI spend cap (~$5) as a safety backstop for the dev session

---

## 14. Settings — theme + persona switching

A small surface, but disproportionately important: it's where the reviewer first interacts with the app, and it's where the inclusivity gesture (persona choice) lives.

### 14.1 Settings dropdown

Triggered by a gear icon in the top nav. Opens as a popover (shadcn `DropdownMenu` or `Popover`). Contents:

```
┌──────────────────────────────┐
│  Theme                       │
│  ○ Dark        ● Light       │  ← segmented control
├──────────────────────────────┤
│  Profile                     │
│  ● Alex Chen   ○ Maya Patel  │  ← segmented control with avatars
├──────────────────────────────┤
│  ⓘ Mock data — for demo      │
└──────────────────────────────┘
```

Tiny "ⓘ" footer makes it explicit that data is illustrative.

### 14.2 Theme switching

- Library: `next-themes`
- Default: system preference, falling back to dark
- Persisted: `localStorage` key `peakpath-theme`
- No-flash hydration: `next-themes` provides a script that sets the theme before first paint
- Transition: 200ms cubic-bezier ease on `background-color` + `color` for body and cards. Avoid transitioning border-color (causes flicker on hairlines).
- Toggle UI: segmented control, not a single toggle — explicit options read better than a sun/moon icon

### 14.3 Persona switching

- State: React context `PersonaProvider` wrapping the app
- Persisted: `localStorage` key `peakpath-persona` with values `"alex" | "maya"`
- Default: `"alex"` (no welcome modal — keep it frictionless)
- What changes on switch:
  - Display name in greetings, activity feed, tooltips
  - Pronouns where copy uses them
  - Avatar (DiceBear seed swap)
  - That's it — every number stays the same
- Implementation: copy strings are templated, e.g., `` `Good morning, ${persona.firstName}` ``, never hardcoded
- Animation on switch: subtle 300ms fade on the avatar and greeting line. No jarring full-page re-render.

### 14.4 Why no "welcome modal" to pick persona on first visit

Considered and rejected. A modal in front of the dashboard delays the visual payoff (the hero entrance animation) and adds a step the reviewer didn't ask for. Default to Alex, make Maya one click away. Same inclusivity signal, better first impression.

### 14.5 Avatar generation

DiceBear `avataaars-neutral` or `personas` style with deterministic seeds:
- Alex: seed `alex-chen-peakpath`
- Maya: seed `maya-patel-peakpath`
- Leaderboard peers: seeded by name

Generated client-side via the DiceBear HTTP API or pre-downloaded as SVGs in `/public/avatars/`. Decision: **pre-download as SVGs** — avoids a network call on every render and keeps the app working offline.

---

## 15. Build plan — sequential files

Detailed step-by-step execution plan lives in the `plan/` directory at repo root, broken into one Markdown file per phase. The phases are designed to be picked up and executed independently — each file states its prerequisites, tasks, definition of done, and what comes next.

```
plan/
  00_PREP.md                — story bible + locked decisions
  01_SCAFFOLD.md            — Next.js + Tailwind + shadcn + fonts
  02_DATA_AND_COPY.md       — generate lib/data.ts + lib/copy.ts
  03_LAYOUT_SHELL.md        — nav, theme provider, persona context
  04_DASHBOARD_HERO.md      — hero card + ring + signature entrance
  05_DASHBOARD_REST.md      — programs row + rank + achievements + activity
  06_PROGRAM_DETAIL.md      — path viz + projection slider + trend + milestones
  07_SETTINGS.md            — theme switcher + persona toggle + dropdown UI
  08_LIGHT_THEME_POLISH.md  — light-mode card treatments + visual QA both modes
  09_RESPONSIVE.md          — mobile + tablet breakpoint pass
  10_COPY_EDITING_PASS.md   — non-negotiable polish step
  11_DEPLOY_AND_TUNNEL.md   — build, cloudflared, smoke test
  12_README_AND_SUBMIT.md   — README + screenshots + screen recording
```

**Revised total estimate: ~5 hours.** This exceeds the original 2–3 hr brief by ~2 hr, driven by:
- Light theme parity (+45 min vs. dark-only)
- Settings UI + persona switching (+45 min vs. single persona)
- Invisible-AI content workflow (+60 min vs. hand-written placeholders)

Cuts that get it back to ~4 hr if needed (in order): activity feed (-15), 6-week bar chart on detail page (-15), DiceBear avatars (use initials in gradient circles, -15), Maya persona (-30, defeats the point but it's the biggest single cut).

---

## 16. Open questions for you

1. ~~**Persona name**~~ — **Resolved.** Alex Chen + Maya Patel, runtime-switchable (§14).
2. **Featured program name** — "Q2 Enterprise Renewals" or something more specific to a real industry vertical (SaaS, insurance, retail, telecom)?
3. **Submission target** — is there a specific company/role this is going to? That might shift accent color or vertical-specific copy.
4. **Repo + tunnel** — is the GitHub repo for this assignment already set up, or do I create one when the time comes? (Cloudflare tunnel approach already locked, see §12.)
5. **Maya Patel** — happy with that name, or want to substitute another? Easy to swap before content generation starts.

Answer those when you're ready and I'll incorporate them, then we start working through `plan/00_PREP.md`.
