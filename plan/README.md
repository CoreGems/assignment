# PeakPath build plan

Sequential execution plan for building PeakPath. One file per phase. Each file is self-contained: prerequisites, tasks, definition of done, gotchas, next step.

| # | File | Phase | Budget |
|---|---|---|---|
| 00 | [PREP](00_PREP.md) | Story bible + locked decisions | 15 min |
| 01 | [SCAFFOLD](01_SCAFFOLD.md) | Next.js + Tailwind + shadcn + fonts | 15 min |
| 02 | [DATA_AND_COPY](02_DATA_AND_COPY.md) | Generate `lib/data.ts` + `lib/copy.ts` | 30 min |
| 03 | [LAYOUT_SHELL](03_LAYOUT_SHELL.md) | Nav, theme provider, persona context | 25 min |
| 04 | [DASHBOARD_HERO](04_DASHBOARD_HERO.md) | Hero card + ring + signature entrance | 50 min |
| 05 | [DASHBOARD_REST](05_DASHBOARD_REST.md) | Programs, rank, achievements, activity | 35 min |
| 06 | [PROGRAM_DETAIL](06_PROGRAM_DETAIL.md) | Path viz + slider + trend + milestones | 35 min |
| 07 | [SETTINGS](07_SETTINGS.md) | Theme switcher + persona toggle + dropdown | 30 min |
| 08 | [LIGHT_THEME_POLISH](08_LIGHT_THEME_POLISH.md) | Light-mode card treatments, visual QA | 30 min |
| 09 | [RESPONSIVE](09_RESPONSIVE.md) | Mobile + tablet breakpoint pass | 20 min |
| 10 | [COPY_EDITING_PASS](10_COPY_EDITING_PASS.md) | Read every string aloud, rewrite robotic | 15 min |
| 11 | [DEPLOY_AND_TUNNEL](11_DEPLOY_AND_TUNNEL.md) | Build, cloudflared, smoke test | 15 min |
| 12 | [README_AND_SUBMIT](12_README_AND_SUBMIT.md) | README + screenshots + screen recording | 20 min |

**Total: ~5 hr.**

Refer to `../PEAKPATH_SPEC.md` for design decisions. These files are *execution*; the spec is *design*.

## Cut list (if running over)

In this order:
1. **Activity feed** (-15 min) — biggest cut for least loss
2. **6-week bar chart** in program detail (-15 min) — sparkline in hero is the better story chart
3. **DiceBear avatars** (-15 min) — fall back to initials in gradient circles
4. **Light theme** (-45 min) — ship dark-only with a "light theme coming" placeholder in settings, **last resort**
5. **Maya persona** (-30 min) — ship Alex only, **last resort**

Light theme and Maya persona are last-resort cuts because they were explicit user asks.
