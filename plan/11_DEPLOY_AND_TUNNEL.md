# 11 — Deploy + tunnel

**Goal:** ship the production build locally and expose a public Cloudflare Tunnel URL.
**Time budget:** 15 min
**Prerequisites:** [10_COPY_EDITING_PASS](10_COPY_EDITING_PASS.md) done, copy is polished.
**Outputs:** running `next start` on `:3000`, public `https://*.trycloudflare.com` URL, smoke-tested on phone + laptop.

---

## Tasks

### 1. Production build (3 min)

```
npm run build
```

Watch for warnings. Common issues:
- Unused variable warnings in `lib/data.ts` — clean up
- TypeScript errors — fix, don't disable
- Image optimization warnings — for DiceBear SVGs in `/public`, fine
- "Module not found" — check imports, especially shadcn paths

Should end with green output and route summary.

### 2. Verify gitignore + secrets (1 min)

```
git status
```

Confirm `.env`, `dev/`, `node_modules/`, `.next/` are NOT in untracked files. If `.env` appears in `git status`, STOP — fix `.gitignore` before proceeding. (Should already be safe per `.gitignore:69`.)

```
grep -r "OPENAI" src/ app/ lib/ components/ 2>/dev/null
```

Should return nothing. If anything matches, you have an AI tell to remove before deploy.

### 3. Start production server (2 min)

In PowerShell window 1:
```
npm start
```

Should serve on `http://localhost:3000`. Open in browser, verify:
- Hero entrance animation runs
- Both screens load
- Theme + persona toggles work
- No console errors in production mode (errors that didn't appear in dev sometimes appear here)

### 4. Launch Cloudflare tunnel (2 min)

If `cloudflared` not installed yet:
```
winget install --id Cloudflare.cloudflared
```

In PowerShell window 2:
```
cloudflared tunnel --url http://localhost:3000
```

Wait for the banner. Copy the `https://<random>.trycloudflare.com` URL.

### 5. Smoke test from another device (5 min)

Open the trycloudflare URL on:
- Your phone (mobile experience, real touch interactions)
- A second browser / incognito window (no localStorage means you see default state — Alex + dark)

Run through:
- [ ] Hero animation
- [ ] Toggle theme → light, both screens
- [ ] Toggle persona → Maya, verify name + avatar updates
- [ ] Navigate to a program → slider works → tier-crossing fires
- [ ] Back to dashboard
- [ ] Bottom tab bar on phone

### 6. Save the URL

Note the trycloudflare URL somewhere safe. It rotates if the tunnel restarts, so:
- If shipping NOW: drop into the README + submission immediately
- If shipping later: write a `start-demo.ps1` (spec §12.5) that you can run to bring it back up, accepting a new URL each time

### 7. Spend cap reminder (1 min)

Even though there's no runtime OpenAI usage, double-check your OpenAI account dashboard:
- Spend cap set to ~$5
- Confirm no anomalous usage from the dev session generating content

---

## Definition of done

- [ ] `npm run build` produces clean output, no errors
- [ ] No `OPENAI` references anywhere in shipped source
- [ ] `npm start` serves the production build
- [ ] Cloudflare tunnel running, public URL copied
- [ ] App tested on phone via the tunnel URL
- [ ] App tested in incognito (defaults verified)
- [ ] URL noted for submission

---

## Gotchas

- `next start` requires `next build` first — don't skip
- Windows Defender may prompt on first `cloudflared` run — allow on Private networks only
- If port 3000 is busy, change with `npm start -- -p 3001` and update the tunnel URL accordingly
- Don't close the PowerShell windows — the tunnel dies and you get a new URL on restart
- If laptop sleeps, tunnel dies. Set power plan to never sleep while sharing.

---

**Next:** [12_README_AND_SUBMIT.md](12_README_AND_SUBMIT.md)
