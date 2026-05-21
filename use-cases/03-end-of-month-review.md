# 03 — End-of-month review

**Persona:** Alex Chen, regional sales rep, West Coast
**Setting:** Friday afternoon, last business day of the month
**Surface:** PeakPath dashboard on a laptop, dark mode

---

It's been a month. Alex wants to look back and see what the story was — not because anyone asked, but because the data feels good when the month went well.

The dashboard loads. The **sparkline** under the YTD card tells the year's shape in one glance:

```
        ╱╲       ╱╲
       ╱  ╲     ╱  ╲╱
      ╱    ╲___╱
 ____╱        ╲
                ╲___╱╲___
```

Steady summer. Autumn kicker around September. Year-end push in November and December — those two months are clearly the high-water mark of last year. Then the Q1 reset, the **dip in March** (one big deal closed, pipeline thinned), the **April recovery**, and now May climbing back up.

Alex's eyes move to the **Activity feed** on the right:

- *Closed Acme Industries renewal — $42K. Counts toward Q2 Renewals.* — 2 hours ago
- *Hit weekly demo goal — 5 demos booked.* — yesterday
- *Payout of $1,240 processed for April commissions.* — 2 days ago
- *Rank moved from #8 to #6 on the West Coast leaderboard.* — 3 days ago
- *Unlocked Silver tier in Q2 Enterprise Renewals.* — May 11

A coherent week. Then **Recent badges** — six gradient-rimmed icons. Alex hovers the rocket: *Comeback Kid — Bounced back from a slow March with two surprise renewals. Earned Apr 29, 2026.*

That one stings in a good way. March was rough. The badge is real recognition that the recovery wasn't an accident.

Alex closes the laptop. Good month.

## Why this works

A spreadsheet of monthly commissions can't do this. The dashboard *is* a story, not a report. Three layers of narrative work together:

1. **Sparkline** — the shape of the year, no labels needed
2. **Activity feed** — the events that drove the most recent shape
3. **Achievements** — the recognition for the patterns that survived a full month

Each layer is mock data, but **the layers were generated together** (see the [story bible](../dev/story-bible.md) — actually gitignored, but conceptually) so the numbers, the events, and the badges all tell the same story. The March dip in the sparkline matches the *Comeback Kid* badge in April, which matches the *Unlocked Silver* activity entry in May.

Reviewers reading the prototype carefully notice this coherence. Most take-home dashboards have numbers that look random when you cross-check them.

## Try it

Open the [live demo](https://actress-seasons-arrived-incentive.trycloudflare.com) and look at the YTD sparkline. Then check the activity feed and the dates on the achievement badges (hover). The numbers fit together.
