# 06 — Program detail (Quest)

**Goal:** build `/programs/[id]` with path visualization, projection slider (secondary signature interaction), stats, trend, and milestones timeline.
**Time budget:** 35 min
**Prerequisites:** [05_DASHBOARD_REST](05_DASHBOARD_REST.md) done.
**Outputs:** working `/programs/q2-enterprise-renewals` route, slider interaction is delightful.

---

## Tasks

### 1. Route + page shell (3 min)

`app/programs/[id]/page.tsx`:
- Server component reads param, finds program in `lib/data.ts`, returns 404 if missing
- Header strip: back link, program name, tier badge, "Ends in 23 days" countdown

### 2. Path visualization (10 min)

`components/program/tier-path.tsx`:
- Horizontal SVG track with 5 nodes (Bronze → Silver → Gold → Platinum + a 5th if relevant)
- Filled portion uses brand gradient; unfilled is `border-subtle`
- Current position marker: pulsing gradient dot with shadcn Tooltip on hover
- Each node labeled with tier name + dollar threshold beneath
- Animate fill on mount (800ms ease-out)
- Responsive: stays horizontal at all breakpoints, sized to container

### 3. Projection card with slider (12 min) — secondary signature interaction

`components/program/projection-card.tsx`:
- shadcn Slider, 0 to 10 additional deals
- Live calculation: `projectedPayout = currentPayout + (slider * avgDealCommission)`
- Big counter showing projected payout (use the same `AnimatedCounter` from plan/04)
- When slider crosses a tier threshold:
  - Tier badge above flips color (gradient swap)
  - "✨ Unlocks Gold tier" subtitle fades in (300ms)
  - Tiny haptic-feel — counter pulses (scale 1.05 → 1)
- Reset button below slider

This is the second moment a reviewer will play with — make it feel responsive (no debouncing, recalculate on every change).

### 4. Stats grid (3 min)

`components/program/stats-grid.tsx`:
- 4 cells: Deals closed (14), Avg deal size ($4,200), Conversion (31%), Days remaining (23)
- Each: big number + label below
- Tabular nums

### 5. 6-week trend chart (4 min)

`components/program/weekly-trend.tsx`:
- Recharts BarChart, 6 bars
- Bars filled with brand gradient, rounded tops (`radius={[8, 8, 0, 0]}`)
- Tooltip on hover: week label + exact $ amount
- Axis lines subtle (`stroke="var(--border-subtle)"`)
- No legend, no grid lines — minimal

### 6. Milestones timeline (3 min)

`components/program/milestones.tsx`:
- Vertical list with left rail
- Past milestones: solid gradient dot + date in text-primary
- Future milestones: outlined dot + "projected" date in text-muted
- Each entry: icon + label + date

---

## Definition of done

- [ ] Detail page accessible by clicking a program card from `/`
- [ ] Path viz animates fill on mount
- [ ] Slider interaction feels live — counter updates per drag tick, tier crossing fires correctly
- [ ] Tooltip on path viz current-position marker works
- [ ] Bar chart bars use brand gradient, rounded tops
- [ ] Milestones differentiate past vs future clearly
- [ ] Theme flip works on this page too
- [ ] No console errors

---

## Gotchas

- Slider crossing detection: compute `nextTierName` on every change, compare to previous render — animate badge only when it actually changes (not on every drag tick)
- Recharts gradient: define `<linearGradient id="..."/>` *inside* `<defs>` *inside* the chart, not as a global. IDs must be unique per chart instance.
- Path viz: stroke gradient needs `stroke="url(#brand-gradient)"` referencing a `<defs>` `<linearGradient>` declared once in the SVG itself.
- Slider value persistence: don't persist across navigations — reset on mount.

---

**Next:** [07_SETTINGS.md](07_SETTINGS.md)
