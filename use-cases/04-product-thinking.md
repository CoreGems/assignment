# 04 — Product thinking

A few decisions that shaped PeakPath beyond what's visible at first click. Not a use case — a short note on the reasoning the prototype is meant to signal.

---

## Why two personas

The settings popover lets you toggle between **Alex Chen** and **Maya Patel**. Same role, same region, same numbers — only the name, avatar, and pronouns change. Every visible string in the app is templated; greetings, activity entries, the leaderboard row all swap naturally.

I considered making this a welcome modal on first visit ("pick your persona"). I decided against it:

- A modal in front of the dashboard delays the visual payoff (the entrance animation)
- Most reviewers will skip it
- Defaulting to one persona + making the other one click away gets the same inclusivity signal with better first impression

The point of shipping two personas isn't tokenistic. It's to **prove the engineering is real** — the copy strings aren't hardcoded, the avatars aren't single-use, the persona is genuinely a runtime input. A reviewer who flips the toggle and sees the dashboard re-greet them as Maya immediately understands the product is built right.

## Why dark by default, with light shipped

Dark cockpit was the chosen aesthetic for visual impact. Light theme was added on request and held to the same standard — it's not an automatic inversion. Specifically:

- **Glassmorphism is dark-only.** Frosted glass on a white background looks dingy. Light cards use solid white + soft layered shadows for depth.
- **Brand accents are identical** across both themes. The signature indigo-magenta-coral gradient works on both bg-base values.
- **Recharts components inherit from CSS vars** so charts re-theme when you toggle.

The toggle is in settings (segmented control). Not a single sun/moon icon — explicit labels read better and avoid the "which one is selected?" ambiguity.

## What's intentionally not built

A prototype that tries to do everything looks unfinished. PeakPath shows depth by **gesturing at features without building them**:

- **Leaderboard** nav link — visibly disabled with "coming soon" tooltip. Signals product depth without an hour of work.
- **"View all 23 achievements"** — inert link. Most reviewers don't click; the gesture says *"there's more here"*.
- **Notifications, settings beyond theme + persona, profile editing** — out of scope, not even hinted at.

This is a design discipline: only build what the reviewer will see in two minutes, and gesture at the rest. The cuts are not what the prototype is missing; they're what the prototype is *signaling restraint about*.

## What it would become

If this were a real product (not a take-home), the next surfaces to build would be:

1. **A real leaderboard page** — same dark cockpit, but a full regional view with filters (territory, vertical, quarter)
2. **A manager view** — same data, rolled up across direct reports
3. **Notifications** — push when a tier is crossed, when a payout clears, when rank changes
4. **A short voice / chat coach** — *(considered for this take-home, deliberately not built. See [`../APP_AI_EXTENSIONS.md`](../APP_AI_EXTENSIONS.md) for the reasoning — invisible AI as a content tool, not a runtime feature.)*

The current two screens are designed so all four extensions fit without redesigning the brand or the navigation.

## Why hosted from a local Windows machine, not Vercel

I wanted full control over the runtime and to demonstrate the Cloudflare Tunnel approach end-to-end. `npm start` + `cloudflared tunnel --url http://localhost:3000` is two commands and gives you a public HTTPS URL with no hosting account. The trade-off is uptime depends on my machine being awake — flagged honestly in the README. A `start_app.ps1` script in the repo root spins it back up in one command.

## Read next

If you've made it this far, the three narrative use cases are short and more fun than this doc:

- [01 — Morning glance](./01-morning-glance.md)
- [02 — Projection planning](./02-projection-planning.md)
- [03 — End-of-month review](./03-end-of-month-review.md)
