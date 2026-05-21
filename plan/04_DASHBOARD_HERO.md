# 04 — Dashboard hero (the signature interaction)

**Goal:** build the earnings hero card + monthly goal ring + greeting strip, with the orchestrated entrance animation that's the app's wow moment.
**Time budget:** 50 min
**Prerequisites:** [03_LAYOUT_SHELL](03_LAYOUT_SHELL.md) done.
**Outputs:** `/` page renders the top half of the dashboard with the signature animation.

---

## Tasks

### 1. Greeting strip (8 min)

`components/dashboard/greeting-strip.tsx`:
- Left: greeting from `lib/copy.ts` (rotates per session based on time of day + streak)
- Streak pill: "🔥 12 weeks above target" — gradient border, amber flame icon
- Right: next-payout pill "Next payout in 4 days — May 25" with a subtle pulsing dot (CSS animation)
- Uses `usePersona()` to get the name

### 2. Earnings hero card (20 min)

`components/dashboard/earnings-hero.tsx`:
- Large card, glassmorphism in dark / solid white + shadow in light
- 64px gradient-text counter for YTD earnings — use `bg-clip-text` on `.bg-brand-gradient`
- Below: delta chip "↑ 23% vs last year" in emerald
- Right or below: 12-month sparkline (Recharts AreaChart) with gradient fill
- Footer link: "View breakdown →" (routes to `/programs/[featured-id]`)

**Counter component** (`components/ui/animated-counter.tsx`):
- Accepts `from`, `to`, `duration`, `format`
- Uses Framer Motion's `animate` + `useMotionValue` + `useTransform`
- Tabular numerals via Tailwind `tabular-nums`
- Respects `prefers-reduced-motion` (skip to final value)

### 3. Monthly goal ring (12 min)

`components/dashboard/goal-ring.tsx`:
- SVG ring, ~200px diameter
- Background stroke: `border-subtle`
- Foreground stroke: `url(#brand-gradient)` (define `linearGradient` once in a top-level SVG defs file or inline)
- Animate `stroke-dashoffset` from `circumference` to `circumference * (1 - progress)` on mount
- Center: big "72%" + subtitle "$8,640 / $12,000"
- Tooltip on hover (shadcn Tooltip): "9 days remaining in May"

### 4. Orchestrated entrance (10 min)

The signature interaction — see `PEAKPATH_SPEC.md` §8.

`components/dashboard/dashboard-entrance.tsx` wrapper or `framer-motion` `useAnimate` orchestration:

| t (ms) | Event |
|---|---|
| 0 | Skeleton placeholders visible |
| 200 | Greeting + payout pills fade in (300ms ease-out, y: 8 → 0) |
| 400 | Counter starts ticking 0 → 48,320 (duration 1000ms) |
| 600 | Ring stroke begins drawing (duration 1000ms) |
| 800 | Sparkline area sweeps left-to-right (duration 800ms) |
| 1400 | Delta chips fade in (300ms) |

All on a single timeline. If you can, factor into a `useEntrance()` hook so it's reusable.

**Respect `prefers-reduced-motion`** — skip the timeline, show final state immediately.

---

## Definition of done

- [ ] Hero strip renders with greeting + streak + payout countdown
- [ ] Hero card shows YTD with animated counter, delta chip, sparkline
- [ ] Goal ring animates fill on mount, shows percent + dollar subtitle
- [ ] Entrance choreography runs once on mount, settles cleanly
- [ ] Counter does not jitter (tabular nums applied)
- [ ] Works in both themes (manual flip via localStorage)
- [ ] `prefers-reduced-motion: reduce` → final state with no animation
- [ ] No layout shift during entrance

---

## Gotchas

- Recharts SVG gradients need unique IDs per page or they collide between charts
- Counter format must handle commas, dollar sign, and respect locale (`Intl.NumberFormat('en-US')`)
- Don't trigger entrance animation on tab refocus — only on initial mount
- Glassmorphism backdrop-filter is expensive — apply only to surfaces, not full-screen

---

**Next:** [05_DASHBOARD_REST.md](05_DASHBOARD_REST.md)
