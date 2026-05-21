# 01 — Scaffold

**Goal:** stand up a Next.js + Tailwind + shadcn project with fonts and design tokens wired in.
**Time budget:** 15 min
**Prerequisites:** [00_PREP](00_PREP.md) done.
**Outputs:** working Next.js dev server, design tokens in `globals.css`, fonts loaded, base layout shell.

---

## Tasks

### 1. Init project

```
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --eslint --no-turbopack
```

If the current directory is non-empty, scaffold to a temp dir and move files in. Keep `app_requirement.md`, `APP_OPTIONS.md`, `APP_OVERVIEW.md`, `APP_AI_EXTENSIONS.md`, `PEAKPATH_SPEC.md`, `plan/`, `dev/`, `.env`.

### 2. Install runtime deps

```
npm i next-themes framer-motion recharts lucide-react clsx tailwind-merge
```

### 3. Install shadcn primitives

```
npx shadcn@latest init -d
npx shadcn@latest add button card tooltip avatar slider dropdown-menu separator badge
```

Don't add primitives you won't use — adds bundle weight and clutter.

### 4. Fonts via `next/font`

In `app/layout.tsx`:
- Space Grotesk (weights 500, 700) → CSS var `--font-display`
- Inter (weights 400, 500) → CSS var `--font-body`
- Apply both via Tailwind's `font-` utilities

### 5. Design tokens

In `app/globals.css`, define both theme palettes as CSS custom properties on `:root` and `[data-theme="light"]`. Use the tables in `PEAKPATH_SPEC.md` §2.1. Expose them through Tailwind v4 `@theme` block so `bg-base`, `text-primary`, `accent-indigo` etc. work as utility classes.

Brand gradient as a reusable utility class `.bg-brand-gradient`.

### 6. Base layout shell

`app/layout.tsx`:
- `<html lang="en" suppressHydrationWarning>` (required by next-themes)
- Body uses font vars + bg-base + text-primary
- Wrap children in a future `ThemeProvider` + `PersonaProvider` (stubbed for now, real impl in step 03)
- Set page title "PeakPath — Your incentive cockpit" and favicon (use a simple gradient SVG)

### 7. Smoke test

```
npm run dev
```

Open http://localhost:3000 — should see the Next.js default starter with custom fonts applied, dark background, and no console errors.

---

## Definition of done

- [ ] `npm run dev` works, no errors in console or terminal
- [ ] Both fonts load (verify in DevTools → Network → Fonts)
- [ ] Dark background visible
- [ ] Tailwind classes like `bg-base` and `text-primary` work
- [ ] Page title and favicon set
- [ ] `package.json` does NOT contain `openai`

---

## Gotchas

- Don't `npm i openai` even "just for dev" — easy to forget to remove. Use a separate chat session for content generation (see plan/02).
- shadcn's `init` will overwrite `globals.css` — apply tokens AFTER init, not before.
- Tailwind v4 has a different `@theme` syntax than v3 — don't paste v3 config.
- `next-themes` requires `suppressHydrationWarning` on `<html>` or you'll see a hydration error on first load.

---

**Next:** [02_DATA_AND_COPY.md](02_DATA_AND_COPY.md)
