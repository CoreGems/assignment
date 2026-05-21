# 07 — Settings (theme + persona switching)

**Goal:** wire the settings gear in the nav to a real popover that toggles theme and persona.
**Time budget:** 30 min
**Prerequisites:** [06_PROGRAM_DETAIL](06_PROGRAM_DETAIL.md) done, ThemeProvider + PersonaProvider from plan/03 in place.
**Outputs:** working settings dropdown, theme + persona instantly switch across the app, no flicker.

---

## Tasks

### 1. Settings dropdown UI (10 min)

`components/nav/settings-menu.tsx`:
- Trigger: gear icon button (Lucide `Settings`) in top nav
- shadcn `DropdownMenu` or `Popover` — popover gives more layout control
- Width ~280px, glass in dark / white card in light
- Three sections separated by hairline:
  - **Theme** label + segmented control (Dark | Light)
  - **Profile** label + segmented control (Alex Chen | Maya Patel) with mini avatars
  - **Footer:** info icon + "Mock data — for demo"

Segmented control = two pill-shaped buttons in a track, active one filled with brand gradient.

### 2. Theme toggle wiring (5 min)

- `const { theme, setTheme } = useTheme()` from `next-themes`
- Active segment reflects current theme
- On click: `setTheme('dark' | 'light')`
- Add `transition-colors duration-200` to body so the swap is smooth (already on cards from plan/01)

### 3. Persona toggle wiring (10 min)

- `const { persona, setPersona } = usePersona()`
- On click: `setPersona('alex' | 'maya')` → updates context + localStorage
- Subscribe affected components (greeting strip, activity feed, avatar) — they should re-render automatically since they consume context

**Subtle animation on swap:**
- Greeting line and avatar in the nav fade out (150ms) → swap value → fade in (150ms)
- Use `AnimatePresence` from Framer Motion with `mode="wait"`

### 4. Avatar pre-download (5 min)

To avoid hotlinking DiceBear at runtime and to make the app screenshot-stable:

- Pre-download each avatar SVG to `/public/avatars/`:
  - `alex.svg` (seed `alex-chen-peakpath`)
  - `maya.svg` (seed `maya-patel-peakpath`)
  - `peer-1.svg` … `peer-5.svg` for leaderboard
- Use DiceBear web UI or a one-off `curl` per file (do this once, not as a build step)
- Update `lib/data.ts` to reference local paths

This keeps the app working offline and removes a third-party dependency from runtime.

---

## Definition of done

- [ ] Gear icon opens dropdown, click-outside closes it
- [ ] Theme segment matches actual current theme on first open
- [ ] Theme switch instantly applies, persists across reloads
- [ ] Persona segment matches current persona
- [ ] Persona switch updates greeting, nav avatar, activity feed entries
- [ ] Persona swap has a subtle fade animation, not a jarring re-render
- [ ] All avatar images load from `/public/avatars/` — no DiceBear hotlinks
- [ ] No layout shift when popover opens/closes
- [ ] Works keyboard-accessibly (tab to open, arrow keys to navigate)

---

## Gotchas

- `useTheme()` returns `undefined` on first SSR render. Show a placeholder segment state until mounted, or render the menu only client-side.
- Persona change doesn't trigger a full re-render — components must actually call `usePersona()` not destructure once at module load
- DiceBear SVGs have inline styles — if they look off in light theme, regenerate with the `personas` style or strip background fills

---

**Next:** [08_LIGHT_THEME_POLISH.md](08_LIGHT_THEME_POLISH.md)
