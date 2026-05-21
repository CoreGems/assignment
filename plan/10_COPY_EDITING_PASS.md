# 10 — Copy editing pass (NON-NEGOTIABLE)

**Goal:** make the copy read like a human wrote it, not an LLM. This is the entire reason the invisible-AI strategy works.
**Time budget:** 15 min
**Prerequisites:** [09_RESPONSIVE](09_RESPONSIVE.md) done, app is fully functional.
**Outputs:** every visible string has been read aloud and revised where needed.

---

## Tasks

### 1. Walk every surface (10 min)

Open the running app. Open every screen. Open the settings popover. Hover every tooltip. Trigger the slider tier-crossing.

Read every visible string **out loud**. If it sounds robotic, rewrite it.

### 2. Tells to hunt

| Tell | Example | Fix |
|---|---|---|
| Over-balance | "Not just earning, but achieving" | "You're earning more than last May." |
| Hedging | "You might want to consider..." | "Focus on Renewals this week." |
| Generic inspiration | "Your journey to success!" | "Three closes = Gold tier." |
| Suspicious parallel | "Track, measure, achieve" | "Track your bonuses." |
| Synonyms for simple words | "commence", "utilize", "leverage" | "start", "use", "use" |
| Three-item lists by default | "Faster, smarter, better" | Pick the one that's true. |
| Em-dash overuse — like this — | One em-dash per page max | Use commas, periods, or semicolons. |
| Polite hedging in CTAs | "If you'd like, view details" | "View details" |
| AI's favorite words | "delve", "tapestry", "navigate", "robust" | Just delete or replace. |

### 3. Inject specificity

Anywhere a string is generic, swap in a real number from `lib/data.ts`:

- "Great progress!" → "$340 from Gold."
- "You're doing well." → "You're up 23% YoY."
- "Keep it up!" → "Three more closes."
- "Welcome back!" → "Back from lunch?" (be playful where it fits)

### 4. Contractions

LLMs default to formal. Humans say:
- "you are" → "you're"
- "it is" → "it's"
- "let us" → "let's"
- "do not" → "don't"

Find-replace pass through `lib/copy.ts`.

### 5. Personality calibration

The brand voice is "confident, warm, second-person, never corporate, never patronizing" (spec §1).

Test each string against:
- Would a friend coaching you over coffee say this? If no → rewrite.
- Does it sound like LinkedIn? → rewrite.
- Does it talk down to the user ("Great job!")? → rewrite.

### 6. Both personas

Swap to Maya in settings. Re-read everything. Anything that's gendered or assumes "Alex" should already be templated — verify.

---

## Definition of done

- [ ] Every visible string read aloud
- [ ] At least 5 strings rewrote during this pass
- [ ] No `delve`, `tapestry`, `navigate`, `robust`, `seamless`, `leverage`, `utilize` anywhere
- [ ] All contractions normalized
- [ ] Both personas read naturally
- [ ] At least one string makes you smile a little (personality landed)

---

## Why this matters

The invisible-AI strategy depends on this step. If you skip it, reviewers won't know it's AI but they'll feel something is "off" — and "off" is the worst signal a UX-focused submission can send. A 15-min editing pass is the difference between "competent prototype" and "this person really cares".

---

**Next:** [11_DEPLOY_AND_TUNNEL.md](11_DEPLOY_AND_TUNNEL.md)
