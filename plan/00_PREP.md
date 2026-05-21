# 00 — Prep

**Goal:** lock the narrative and content seed before any code or generation begins.
**Time budget:** 15 min
**Prerequisites:** `PEAKPATH_SPEC.md` reviewed and approved.
**Outputs:** `dev/story-bible.md` (gitignored), persona + theme defaults confirmed.

---

## Tasks

### 1. Create `dev/` directory and add to `.gitignore`

Append to `.gitignore`:
```
# Local dev scratch — never shipped
dev/
```

### 2. Write `dev/story-bible.md`

One page of Markdown the LLM will use as context for every subsequent generation. Cover:

- **Personas** (both): Alex Chen and Maya Patel — same role, region, tenure, numbers, only the surface differs
- **Role context**: regional sales rep, West Coast, sells unified-communications SaaS to mid-market companies (50–500 seats). 2 years tenure.
- **Narrative arc (12 months)**:
  - Jan–Feb: steady, mid-pack
  - Mar: dip — closed a long-running deal but pipeline thinned
  - Apr: strong recovery — rebuilt pipeline + landed two renewals
  - May (current): accelerating — currently #6 regional, up 2 spots, on track for Gold tier in Q2 Enterprise Renewals if 3 more closes happen
- **Tone guide**: confident, warm, second-person; never corporate, never patronizing (echoes spec §1)
- **Constraints**:
  - Never use real customer/company names — invent ones that *sound* like real B2B SaaS customers (e.g., "Acme", "Northwind", "Globex"-tier)
  - Numbers must be self-consistent across all 12 months, 6 weeks, 6 programs, 8 activity entries
  - Activity feed entries must each correspond to a believable change in a number visible elsewhere

### 3. Confirm decisions (no action needed — just read and proceed)

- Stack: Next.js 15 (App Router) + Tailwind v4 + shadcn/ui + Recharts + Framer Motion + lucide-react + next-themes
- Personas: Alex Chen (default) + Maya Patel
- Themes: dark (default) + light, segmented control in settings
- Deploy: local `next start` + Cloudflare quick tunnel
- AI: build-time content only, paste into LLM chat, **no `openai` runtime dep**

---

## Definition of done

- [ ] `dev/` directory exists and is gitignored
- [ ] `dev/story-bible.md` written, ~1 page, covers all four sections above
- [ ] No code changes yet, no `package.json` yet

---

## Gotchas

- Don't skip the story bible — every downstream generation gets worse without it
- Don't put the story bible in `app/` or `lib/` — it must not ship
- If you're tempted to write code in this step, stop — the next step is for scaffolding

---

**Next:** [01_SCAFFOLD.md](01_SCAFFOLD.md)
