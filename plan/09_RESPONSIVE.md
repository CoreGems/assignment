# 09 — Responsive pass

**Goal:** the app works and looks polished at 375px, 768px, 1280px, 1920px.
**Time budget:** 20 min
**Prerequisites:** [08_LIGHT_THEME_POLISH](08_LIGHT_THEME_POLISH.md) done.
**Outputs:** no horizontal scroll at any breakpoint, mobile bottom nav works, all interactions usable on touch.

---

## Tasks

### 1. Walk the breakpoints (10 min)

Use DevTools responsive mode. Test in order:

**1920px:** content shouldn't sprawl — `max-w-7xl` cap is in the layout. Verify whitespace feels intentional, not empty.

**1280px:** the target. Should look as drawn in §4.1 / §5.1 of the spec.

**768px (iPad):**
- Hero card and goal ring stack vertically
- Programs row keeps grid (2x2) or starts horizontal scroll
- Stats grid on detail page goes 2x2 instead of 4x1
- Path viz stays horizontal, scales down
- Top nav stays at top, settings popover still fits

**375px (iPhone SE):**
- Single column everywhere
- Top nav collapses to: logo + settings + avatar (drop the link buttons)
- Add bottom tab bar: Today | Programs | Leaderboard (greyed) | Settings
- Hero counter shrinks to ~48px (still impressive, not overflowing)
- Goal ring shrinks to ~160px diameter
- Programs row becomes snap-scroll carousel with peeking next card
- Slider on detail page has comfortable touch target (≥44px tall)
- Settings popover becomes a bottom sheet, not a top popover

### 2. Touch interactions (5 min)

- Slider: drag works with finger
- Cards: hover states don't get stuck (they don't on real mobile, but emulator can confuse)
- Tooltips: tap to show on mobile (shadcn handles this if `delayDuration={0}`)
- Bottom tab bar safe-area padding: `pb-[env(safe-area-inset-bottom)]`

### 3. Performance check (5 min)

- Open Lighthouse in DevTools, run on `/` in mobile mode
- Targets: Performance ≥90, Accessibility ≥95, Best Practices = 100, SEO ≥90
- If perf drops below 90, usual culprits:
  - Unoptimized DiceBear SVGs (oversized)
  - Framer Motion running animations on tab background (use `whileInView` to lazy-trigger)
  - Large font files (subset Inter/Space Grotesk to Latin only via `next/font` config)

---

## Definition of done

- [ ] No horizontal scroll at any breakpoint between 320px and 1920px
- [ ] Bottom tab bar appears <768px, top nav above
- [ ] Mobile settings opens as bottom sheet
- [ ] Slider works with touch
- [ ] All tap targets ≥44x44px
- [ ] Lighthouse mobile: Perf ≥90, A11y ≥95
- [ ] Tested at 375 / 768 / 1280 / 1920

---

## Gotchas

- Don't use `vh` for layout heights — broken on mobile Safari with URL bar. Use `dvh` or `svh`.
- Bottom tab bar must clear iOS home indicator with safe-area padding
- Horizontal scroll containers need `-mx-4` + `px-4` trick to bleed scroll past the gutter
- shadcn Sheet works as a bottom sheet via `side="bottom"`

---

**Next:** [10_COPY_EDITING_PASS.md](10_COPY_EDITING_PASS.md)
