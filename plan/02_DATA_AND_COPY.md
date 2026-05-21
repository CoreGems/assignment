# 02 — Data + Copy generation

**Goal:** produce `lib/data.ts` and `lib/copy.ts` with content that feels hand-crafted, using the invisible-AI workflow.
**Time budget:** 30 min
**Prerequisites:** [01_SCAFFOLD](01_SCAFFOLD.md) done, `dev/story-bible.md` exists.
**Outputs:** `lib/data.ts`, `lib/copy.ts`, `lib/types.ts`, all hand-edited.

---

## Tasks

### 1. Define the types first (5 min)

In `lib/types.ts`, write the TypeScript shape from `PEAKPATH_SPEC.md` §6:

```
Persona, Theme, Agent, Program, ProgramDetail, Tier, Milestone,
Achievement, ActivityEvent, LeaderboardEntry, YtdState, MonthlyGoal,
Streak, NextPayout
```

Types lock the shape so the LLM generation stays consistent and TypeScript will catch any drift when you paste in.

### 2. Generate `lib/data.ts` (10 min)

Open a fresh chat with your LLM of choice (NOT integrated into the codebase — paste & copy).

Prompt structure:
1. Paste the entirety of `dev/story-bible.md`
2. Paste the TypeScript types from `lib/types.ts`
3. Ask for a single TypeScript constant `peakpathData: { ... }` that:
   - Matches the types exactly
   - Tells the story bible's narrative through the numbers
   - Includes 12 monthly trend points, 6 programs (one featured: "Q2 Enterprise Renewals"), 23 achievements, 8 activity feed entries, 5 leaderboard peers
   - Uses tabular-friendly numbers (no `1234567.89` — use `48320` etc.)

**Personas**: data file exports both personas:

```ts
export const personas = {
  alex: { firstName: 'Alex', lastName: 'Chen', pronouns: { subject: 'he', object: 'him', possessive: 'his' }, avatarSeed: 'alex-chen-peakpath' },
  maya: { firstName: 'Maya', lastName: 'Patel', pronouns: { subject: 'she', object: 'her', possessive: 'her' }, avatarSeed: 'maya-patel-peakpath' },
}
```

Paste the result. Then **hand-edit**:
- March dip — make sure it's clearly visible in the trend
- May acceleration — the last 3 numbers should climb
- Featured program tier progress — must be late-Silver, close to Gold (so the projection slider in step 06 has somewhere meaningful to go)
- Strip any number that ends in `000` or `500` (looks placeholder-y) and replace with believable values like `48320`, `1840`, `42150`

### 3. Generate `lib/copy.ts` (10 min)

Same chat session, new prompt:
- "Now generate every visible copy string for the app. Output as a TypeScript constant `copy: { ... }`."
- Include: greetings (12+ variants by time-of-day × streak state), tooltips (one per metric), tier descriptions, milestone celebration copy, empty states, achievement names + flavor + criteria

**Critical: every string that mentions the user must template the name**, e.g.:

```ts
greetings: {
  morningStreak: (name: string) => `Good morning, ${name} — you're on a 12-week tear`,
  ...
}
```

NOT hardcoded "Alex".

### 4. Hand-edit copy (5 min)

Read every greeting and tooltip out loud. Anything that sounds AI:
- Over-balanced sentences ("not just X, but also Y")
- Hedging ("you might consider")
- Generic inspiration ("Your journey continues")
- Suspiciously parallel structure

Rewrite. Be ruthless. The copy-editing pass in plan/10 is for final polish; this is the first cut.

---

## Definition of done

- [ ] `lib/types.ts` exports all needed types, no `any`
- [ ] `lib/data.ts` compiles, matches types
- [ ] `lib/data.ts` numbers tell the story bible's arc (eyeball the 12-month trend)
- [ ] `lib/copy.ts` exports name-templated strings, NOT hardcoded persona names
- [ ] At least 3 copy strings rewritten by hand from the LLM output
- [ ] No `openai` import anywhere
- [ ] `dev/` not committed

---

## Gotchas

- LLMs love round numbers — hunt them down and replace
- LLMs love three-item lists — cut to two when possible
- If TypeScript complains about the pasted data, fix the *data*, not the types — types are the source of truth
- Don't generate avatar URLs yet — those come in step 03 (DiceBear setup)

---

**Next:** [03_LAYOUT_SHELL.md](03_LAYOUT_SHELL.md)
