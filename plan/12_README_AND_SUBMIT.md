# 12 — README + submit

**Goal:** write the README + bulletproof the submission against the tunnel being offline at review time, then submit.
**Time budget:** 20 min
**Prerequisites:** [11_DEPLOY_AND_TUNNEL](11_DEPLOY_AND_TUNNEL.md) done.
**Outputs:** `README.md`, screenshots in `/docs`, screen recording, submission sent.

---

## Tasks

### 1. Screenshots (5 min)

Take 4 screenshots at high resolution:
1. Dashboard, dark, desktop (~1440px window)
2. Dashboard, light, desktop
3. Program detail, dark, desktop (with slider mid-drag if possible)
4. Mobile (375px DevTools), dark, dashboard

Save to `/docs/screenshots/`. Compress with TinyPNG or similar — keep under 500KB each.

### 2. Screen recording (5 min)

30–60 second clip. Use Windows Game Bar (Win+G) or ScreenToGif.

Sequence:
1. Land on dashboard (catches the signature entrance animation)
2. Hover a program card
3. Click into program detail
4. Drag the projection slider through a tier crossing
5. Back to dashboard
6. Open settings → switch to light theme
7. Switch persona to Maya
8. End

Export as MP4 or GIF. If GIF, optimize aggressively — README inline GIFs >5MB hurt the load.

Save to `/docs/peakpath-demo.gif`.

### 3. README (8 min)

`README.md` at repo root. Lead with content from `APP_OVERVIEW.md` (one-sentence pitch + problem statement), then:

```markdown
# PeakPath

[One-sentence pitch from APP_OVERVIEW]

[Embedded demo GIF]

## Live demo
https://<your-trycloudflare-url>

⚠️ Note: this is a Cloudflare quick tunnel from my local machine. The URL may rotate, and the demo is live only while my machine is awake. Screenshots and the demo GIF below are the canonical record. If the link is down when you visit, see "Run locally" below.

## Screenshots
[4 screenshots inline]

## Design approach
- Concept: "PeakPath" — gamified Strava-meets-Duolingo dashboard for sales agents tracking incentive programs
- Persona: Alex Chen (default) + Maya Patel — runtime-switchable in settings (small but real inclusivity gesture)
- Dark cockpit aesthetic with brand gradient (indigo → magenta → coral); full light theme also shipped, toggle in settings
- The signature interaction is the orchestrated dashboard entrance: counter, ring, sparkline all animate to final values on a single 1.4s timeline
- The secondary interaction is the projection slider on the program detail page — drag to see "what if I close N more deals?" with live tier-crossing feedback

## Key UI/UX decisions
- [3–5 bullets explaining choices reviewers might question — e.g. why glassmorphism only in dark, why no welcome modal for persona, why no real leaderboard page]

## Assumptions
- All numbers are mock; in production they'd come from a system of record like Salesforce, SAP Commissions, Xactly
- Single agent view; manager / admin views out of scope
- No auth (per brief)

## Tech stack
- Next.js 15 (App Router), TypeScript
- Tailwind v4, shadcn/ui
- Recharts (charts), Framer Motion (animations), lucide-react (icons), next-themes (theme switching)
- DiceBear (avatars, pre-downloaded as SVG)

## Run locally
[npm install / npm run dev / npm start commands]

## What's not built (intentionally)
[List the disabled "Leaderboard" link, "View all 23 achievements" link, anything else that signals product depth without burning hours]
```

### 4. Final submission (2 min)

Compose the submission with:
- Live demo URL (with the caveat about it being local)
- GitHub repo URL
- The demo GIF (inline if email/Slack allows; linked otherwise)
- Brief note: "Two screens, dark+light themes, two switchable personas, polished mock data and copy. 1–2 min to walk through if you want a tour."

If submitting via email, attach the README PDF as well in case the GitHub link is blocked by their network.

---

## Definition of done

- [ ] 4 screenshots in `/docs/screenshots/`
- [ ] Demo GIF in `/docs/peakpath-demo.gif`, under 5MB
- [ ] `README.md` covers: pitch, demo URL, screenshots, design approach, decisions, assumptions, stack, run instructions, intentional exclusions
- [ ] Submission sent with link + repo + GIF
- [ ] Tunnel still running at submission time (or you've noted the caveat)
- [ ] You're proud of the link you sent

---

## Gotchas

- README screenshots are easy to forget to update if you tweak the design after taking them — take them last
- The Cloudflare URL rotates; the README link will go stale if you restart. Mention in the README how to spin it back up.
- GitHub auto-renders README GIFs but caps inline file size — if >5MB, link to `/docs/peakpath-demo.gif` instead of embedding
- Don't forget to push the final commit before submitting

---

**Done.**
