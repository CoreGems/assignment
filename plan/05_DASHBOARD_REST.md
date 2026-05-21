# 05 — Dashboard rest

**Goal:** complete the dashboard with active programs row, rank widget, achievements, and activity feed.
**Time budget:** 35 min
**Prerequisites:** [04_DASHBOARD_HERO](04_DASHBOARD_HERO.md) done.
**Outputs:** complete `/` page matching the §4.1 wireframe in `PEAKPATH_SPEC.md`.

---

## Tasks

### 1. Active programs row (12 min)

`components/dashboard/programs-row.tsx`:
- Desktop: 4-col grid
- Mobile: horizontal snap-scroll carousel
- Each `ProgramCard`:
  - Program name (truncate if long)
  - Tier badge (Bronze/Silver/Gold/Platinum) — gradient intensity scales with tier
  - Tier progress bar with gradient fill, current amount / next-tier threshold
  - Current payout in tabular
  - Hover: 4px lift + brighter border (CSS transition)
  - Click: routes to `/programs/[id]`

Featured program (Q2 Enterprise Renewals) gets a subtle gradient border outline.

### 2. Rank widget (5 min)

`components/dashboard/rank-widget.tsx`:
- Big "#6" in gradient text
- Delta chip "↑ 2 this week" in emerald
- 5 mini-avatars in a vertical list: ranks #4, #5, **#6 (current persona)**, #7, #8
- Names truncated to 15 chars
- Current persona row highlighted with subtle gradient bg

### 3. Achievements row (5 min)

`components/dashboard/achievements-row.tsx`:
- Horizontal row of 5 most recent badges
- Each badge: circular icon in gradient ring (Lucide icon + colored bg)
- Hover: shadcn Tooltip with name + flavor + earned date
- "View all 23 →" link at end (routes nowhere or a `/achievements` placeholder)

### 4. Activity feed (8 min)

`components/dashboard/activity-feed.tsx`:
- Vertical list of 5 most recent events from `lib/data.ts`
- Each entry: icon (Lucide, accent color) + text + relative timestamp ("2h ago", "yesterday")
- Use `Intl.RelativeTimeFormat` for the timestamp
- No avatars in feed — entries are about Alex/Maya's own activity, not peers

### 5. Layout the bottom half

In `app/page.tsx`, place programs row + rank widget in row 2, achievements + activity in row 3. Use the §4.1 grid from the spec.

---

## Definition of done

- [ ] Programs row scrolls horizontally on mobile, grid on desktop
- [ ] Featured program visibly distinguished
- [ ] Rank widget highlights current persona row
- [ ] Achievements row tooltips work
- [ ] Activity feed timestamps are relative and update naturally
- [ ] Page is "complete" — no obvious gaps below the hero
- [ ] All copy comes from `lib/copy.ts`, no hardcoded strings

---

## Gotchas

- Horizontal scroll on mobile needs `overflow-x-auto` + `snap-x snap-mandatory` + child `snap-start`
- `Intl.RelativeTimeFormat` needs a base date — use a fixed "today" date in `lib/data.ts` so timestamps are stable in screenshots
- Don't fetch DiceBear avatars on every render — use pre-downloaded SVGs in `/public/avatars/` (plan/07 has the script; for now, hotlink is fine)

---

**Next:** [06_PROGRAM_DETAIL.md](06_PROGRAM_DETAIL.md)
