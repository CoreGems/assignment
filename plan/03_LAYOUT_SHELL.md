# 03 — Layout shell

**Goal:** wire up the nav, ThemeProvider, PersonaProvider, and base layout so dashboard work can begin.
**Time budget:** 25 min
**Prerequisites:** [02_DATA_AND_COPY](02_DATA_AND_COPY.md) done.
**Outputs:** working ThemeProvider + PersonaProvider, top nav rendering on every route, base page layout.

---

## Tasks

### 1. ThemeProvider (5 min)

`app/providers.tsx`:
- Wrap `next-themes` `ThemeProvider` with `attribute="data-theme"`, `defaultTheme="dark"`, `enableSystem={true}`, `storageKey="peakpath-theme"`
- Mount in `app/layout.tsx` between body and children

### 2. PersonaProvider (10 min)

`lib/persona-context.tsx`:
- React context with `{ persona: 'alex' | 'maya', setPersona, current: Persona }`
- Default `'alex'`
- Persists to `localStorage` key `peakpath-persona`
- Reads from localStorage on mount with hydration-safe pattern (return default during SSR, swap on client mount)
- Export `usePersona()` hook

Mount inside `ThemeProvider` in `app/providers.tsx`.

### 3. Top nav (10 min)

`components/nav/top-nav.tsx`:
- Logo (text wordmark "PeakPath" with gradient accent on the "P") on the left
- Nav links: "Today" (active on `/`), "Programs" (active on `/programs/*`), "Leaderboard" (disabled, muted color, `cursor-not-allowed`, tooltip "Coming soon")
- Right side: settings gear icon (placeholder for now, real impl in plan/07), avatar (DiceBear URL from `current.avatarSeed`)
- Sticky top, glassmorphism in dark / solid white with shadow in light
- Responsive: collapses to bottom tab bar below 768px (just rendering for now, polish in plan/09)

### 4. Page shell

`app/layout.tsx` final structure:
```
<html data-theme="dark"> (managed by next-themes)
  <body>
    <Providers>
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {children}
      </main>
    </Providers>
  </body>
</html>
```

### 5. Smoke test

- `/` shows nav + "Hello PeakPath" placeholder
- Refresh — theme persists from localStorage
- DevTools → Application → Local Storage → see `peakpath-theme` and `peakpath-persona`
- No hydration warnings

---

## Definition of done

- [ ] Nav renders on every route
- [ ] Avatar in nav reflects current persona
- [ ] Theme toggle (manual via DevTools `localStorage.setItem('peakpath-theme', 'light')` + refresh) flips the CSS vars correctly
- [ ] Persona swap (manual via DevTools `localStorage.setItem('peakpath-persona', 'maya')` + refresh) changes the avatar
- [ ] Zero hydration warnings in console
- [ ] "Leaderboard" link visibly disabled + tooltipped

---

## Gotchas

- next-themes flashes the wrong theme without the `<script>` it injects — make sure `suppressHydrationWarning` is on `<html>`
- React context with `localStorage` will SSR-mismatch unless you guard with `typeof window !== 'undefined'` AND swap value after mount
- Don't put `usePersona()` in the layout file — it forces the whole tree client-side. Put a thin client wrapper around just the consumers.

---

**Next:** [04_DASHBOARD_HERO.md](04_DASHBOARD_HERO.md)
