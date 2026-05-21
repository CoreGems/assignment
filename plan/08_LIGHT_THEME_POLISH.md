# 08 — Light theme polish

**Goal:** make light theme look as considered as dark, not like an inversion.
**Time budget:** 30 min
**Prerequisites:** [07_SETTINGS](07_SETTINGS.md) done, theme toggle works.
**Outputs:** light theme passes a visual QA — no contrast issues, no glass-on-white ugliness, brand still reads.

---

## Tasks

### 1. Flip to light and walk both screens (5 min)

Open settings → Light. Walk through:
- Dashboard hero
- Programs row
- Rank widget
- Achievements
- Activity feed
- Program detail (path viz, slider, stats, chart, milestones)
- Settings popover itself

Note every issue. Common ones:
- Glassmorphism cards look dingy → replace with solid white + shadow
- Gradient text loses contrast against white → check legibility, add subtle text-shadow if needed
- Border `rgba(255,255,255,0.08)` is invisible on white → token swaps to `rgba(15,15,30,0.08)` (already in plan/02 tokens, verify it switches via CSS var)
- Recharts axis lines + tooltips inherit dark colors → bind to CSS vars

### 2. Card surface treatment (10 min)

In light theme, cards should:
- Solid white bg (`bg-elevated`)
- 1px hairline border (`border-subtle`)
- Layered soft shadow (`shadow-card` token from spec §2.1)
- Hover lift uses shadow-elevation increase, not border brightness
- Remove `backdrop-blur-*` Tailwind classes in light theme — wrap in `dark:backdrop-blur-md` so it only applies in dark

Add a `<Card>` wrapper component that handles both treatments via theme-aware classes.

### 3. Gradient + accent legibility check (5 min)

- 64px hero counter on white — usually fine, but check at smallest font sizes too
- Tier badges — make sure Bronze (warm) and Silver (cool) read on both bgs
- Emerald delta chips on white — verify contrast ratio ≥ 4.5:1 (WCAG AA)
- Amber streak flame — same

If anything fails, slightly darken the accent in light theme via a `--accent-emerald-light` variant.

### 4. Recharts theming (5 min)

Pass theme-aware colors to chart components:
- `stroke` → CSS var
- Tooltip `contentStyle` → bg-elevated + border-subtle + text-primary
- Gradient stops can stay the same — work on both bgs

### 5. Settings popover in light (3 min)

- White card with shadow, not glass
- Segmented control: inactive segment is muted gray, active is gradient fill
- Hairlines visible

### 6. Loading / focus states (2 min)

Quick pass on focus rings — must be visible on both themes. Use `focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-base`.

---

## Definition of done

- [ ] All cards on both screens render correctly in light theme
- [ ] No glass-on-white anywhere
- [ ] Brand gradient still reads on white
- [ ] All charts pick up theme-aware colors
- [ ] WCAG AA contrast for primary text + delta chips
- [ ] Settings popover looks intentional in light, not ported
- [ ] Toggle between themes 5 times in a row — no flickers, no layout shifts

---

## Gotchas

- `dark:` Tailwind prefix works against the `data-theme="dark"` attribute if you configure Tailwind v4 to use it as the dark-mode strategy — verify in your config
- Some shadcn components ship with hardcoded `bg-white/5` etc. — override in your component or local utility classes
- DiceBear avatars with transparent backgrounds bleed the page bg through — usually fine, but if avatar style has a subtle shadow it may look off

---

**Next:** [09_RESPONSIVE.md](09_RESPONSIVE.md)
