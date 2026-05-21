# PeakPath — Invisible AI (build-time content polish)

**Constraint:** the running app must show **no AI surface** — no chat panel, no synthetic voice, no "AI-powered" labels, no streaming text effects, nothing in the repo that signals OpenAI involvement. Reviewers should believe the craft is entirely hand-made.

**Approach:** use AI exclusively as a *content production tool* during development. Generate microcopy, mock data, narrative, and assets offline. Ship the output as static JSON, static text, and static image files. Delete the AI tooling from the final repo. The deployed app has zero runtime LLM calls and no API keys.

This is the highest-leverage way to use AI under your constraint. Done well, the app feels *written by a human who really cares*, which is exactly the signal you want reviewers to read.

---

## What invisible AI buys you

The honest difference between an OK take-home and a memorable one is usually the **copy and the narrative coherence of the mock data** — and that's exactly what most candidates skimp on because writing it by hand is tedious. AI removes the tedium.

Specifically:

1. **Copy reads like a real product** — every greeting, tooltip, empty state, and microcopy line has personality and specificity instead of "Welcome back!" / "No data."
2. **Mock data tells a story** — Alex's numbers across all charts and panels connect into a believable arc (slow March, strong April, accelerating May) instead of obviously-random placeholders.
3. **Achievement/program names have character** — "Triple Threat Tuesday" instead of "Weekly Goal 1"; "Q2 Enterprise Renewals" instead of "Program A".
4. **Activity feed feels real** — "Acme renewed — your third Tuesday close this month" instead of "Deal closed".
5. **Peer names + avatars feel real** — believable names + DiceBear-generated portraits rather than "User 1, User 2, User 3".

Every one of these is silent. No reviewer will think "this was AI". They'll think "this person really polished the details."

---

## What to generate offline (concrete list)

### 1. The story bible — ~10 min
A 1-page Markdown brief describing Alex's narrative arc that you feed the LLM as context for everything else. Never shipped — lives in `dev/` or stays out of the repo.

> *Alex Chen, regional sales rep, West Coast, 2 years on the team, sells unified-communications SaaS to mid-market companies. Slow March (closed a long-running deal but pipeline thinned), strong April (rebuilt pipeline + landed two renewals), accelerating May (currently #6 regional, up 2 spots, on track to hit Gold tier in Q2 Enterprise Renewals if they close 3 more deals).*

Every subsequent generation references this brief, which is why the numbers + copy will feel coherent rather than random.

### 2. Mock data in `lib/data.ts` — ~20 min
Generate via LLM, paste in, hand-tune. Specifically:

- **YTD monthly trend (12 numbers)** that match the arc: dip in March, recovery in April, climb in May
- **6-week per-program trend (6 numbers per program)** that tell the same micro-story
- **6 program names + descriptions + tier thresholds** (realistic for UC/SaaS sales: "Q2 Enterprise Renewals", "New Logo Acceleration", "Channel Partner Boost", "Healthcare Vertical Expansion", "Premium Tier Upsell", "Q1 → Q2 Carryover Bonus")
- **23 achievement names + earned dates + criteria** with personality ("First Blood" for first deal of quarter, "Comeback Kid" for recovering from a down month, "Triple Threat" for 3 closes in a week)
- **5 leaderboard peer names** that sound plausibly diverse + their rank deltas
- **Activity feed: 8 entries** each one specific and consequential, not "Deal closed"

### 3. Microcopy library — ~15 min
A single `lib/copy.ts` file with every visible string in the app:

- **Greetings** by time of day + streak state (12+ variants that rotate randomly per session, so reviewers refreshing see different ones)
- **Tooltip text** for every metric, written tightly and specifically
- **Empty / fallback states** ("No achievements this week — your last one was 4 days ago, the streak is still alive")
- **Tier descriptions** that explain Bronze/Silver/Gold/Platinum in plain language
- **Milestone celebration copy** for when the projection slider crosses a tier

Hand-edit the output. The LLM gets you 90% there; your edits are what make it not-AI.

### 4. Avatars + badge artwork — ~15 min
- **Avatars** via DiceBear API (`https://api.dicebear.com/...`) — deterministic, look hand-styled, no AI fingerprints
- **Badges** as small SVG icons, gradient-rimmed, generated offline. Could use AI image gen for inspiration, then redraw as clean SVG. Or just use Lucide icons in branded gradient circles.

### 5. Hero illustration (optional) — ~10 min
If the dashboard needs a single decorative element (e.g., empty-state of the leaderboard nav), one abstract SVG. Hand-make or use a public source. AI-image-gen for this is detectable — skip it.

---

## What NOT to do

To keep AI invisible, **avoid** all of these in the shipped app:

| Anti-pattern | Why it's a tell |
|---|---|
| Chat panel or "Ask PeakPath" UI | Most obvious AI signal |
| Synthetic-voice playback (even pre-recorded MP3) | TTS voices are recognizable; reads as AI |
| "AI Coach" / "Smart Insights" / "✨ AI" labels | Self-reports the feature |
| Streaming/typing text animations | Signature LLM UX |
| Loading state with "thinking…" copy | Same |
| Generative image backgrounds | AI-art artifacts are increasingly recognizable |
| `openai` package in `package.json` | First thing a reviewer would `cat` |
| Any `app/api/*` route that proxies to a model | Same — code review tell |
| `.env.example` with `OPENAI_API_KEY` | Same |
| Suspiciously perfect / sterile copy across the app | Hand-edit everything |

---

## Workflow during build

Practical sequence:

1. **(15 min, before coding)** Write the story bible. Have a 5-min back-and-forth with an LLM to refine Alex's arc until it feels believable.
2. **(during data setup)** Generate `lib/data.ts` with the LLM. Paste, eyeball every number, hand-tune the ones that feel "off."
3. **(during build, as components come online)** Generate microcopy on demand — when you build the activity feed, ask the LLM for 8 entries that match the story bible; when you build tooltips, ask for one per metric.
4. **(during final polish)** Re-read every visible string out loud. If anything sounds robotic or generic, rewrite it. **This is the step most candidates skip and where invisible-AI either lands or doesn't.**

The LLM is a copywriter and a data fabricator. You're the editor. The editing pass is what makes it look human.

---

## Effort vs. impact

| Investment | Lift |
|---|---|
| Story bible (10 min) | High — sets up everything else to be coherent |
| Generated `data.ts` (20 min) | Highest — distinguishes serious submission from generic dashboard |
| Microcopy library (15 min) | High — most reviewers register polish here even if they don't articulate why |
| Avatars + badges (15 min) | Medium — fills out the visual density |
| **Total** | **~60 min extra** on top of the original 2.5-hr plan |

This fits the budget. The dropped items from the original spec (activity feed, achievements row) **come back in** because we now have great content for them — the content was the bottleneck, not the engineering.

---

## What changes in the rest of the spec

If you green-light this approach, I'll update `PEAKPATH_SPEC.md` with:

1. New §15 covering the offline content workflow + story bible
2. Updated §6 (mock data shape) to reference `lib/copy.ts` alongside `lib/data.ts`
3. Updated §10 build order to insert the 10-min story-bible step at the front
4. No changes to interactions, no changes to architecture, no new dependencies

The runtime stack stays exactly as it was: Next.js + Tailwind + shadcn + Recharts + Framer Motion. Nothing AI-related ships.

---

## Open question for you

Confirm direction:

- **A — Adopt invisible-AI workflow** (story bible + generated data + microcopy library + DiceBear avatars). +~60 min. Recommended.
- **B — Adopt only the data/microcopy parts**, skip avatars + badges (use Lucide-only). +~45 min. Safer.
- **C — Skip entirely, write all copy and data by hand.** +0 min but copy quality will be noticeably lower.

Say which and I'll fold into `PEAKPATH_SPEC.md`.
