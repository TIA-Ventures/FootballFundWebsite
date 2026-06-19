# Frosinone — archived (temporarily hidden while the deal is confidential)

On 2026-06-19 every public mention of **Frosinone Calcio** was removed from the
site and replaced with a generic, embargoed **"Italy (target)"** treatment
(modeled on the Spain target). This folder holds everything needed to bring
Frosinone back. Files end in `.bak` so they are excluded from the build/type-check
until restored.

## What's archived here

| File | Original location |
| --- | --- |
| `deep-dive-page.tsx.bak` | `src/app/portfolio/frosinone/page.tsx` |
| `FrosinoneTimeline.tsx.bak` | `src/components/FrosinoneTimeline.tsx` |
| `FrosinoneRevenueChart.tsx.bak` | `src/components/FrosinoneRevenueChart.tsx` |
| `frosinone-calcio.png` | `public/frosinone-calcio.png` |
| `track-record-frosinone-calcio.png` | `public/track-record/frosinone-calcio.png` |

## Easiest restore (git)

The removal was a single commit. To bring everything back at once:

```bash
git log --oneline            # find the "Hide Frosinone / Italy target" commit
git revert <that-commit-sha> # re-introduces Frosinone, then resolve as needed
```

## Manual restore

1. Move the archived files back to their original locations and drop the `.bak`
   suffix (see table above). For example:

   ```bash
   cd web
   mkdir -p src/app/portfolio/frosinone
   git mv src/_saved/frosinone/deep-dive-page.tsx.bak src/app/portfolio/frosinone/page.tsx
   git mv src/_saved/frosinone/FrosinoneTimeline.tsx.bak src/components/FrosinoneTimeline.tsx
   git mv src/_saved/frosinone/FrosinoneRevenueChart.tsx.bak src/components/FrosinoneRevenueChart.tsx
   git mv src/_saved/frosinone/frosinone-calcio.png public/frosinone-calcio.png
   git mv src/_saved/frosinone/track-record-frosinone-calcio.png public/track-record/frosinone-calcio.png
   ```

2. Revert the "Italy (target)" edits back to Frosinone in these files
   (the original Frosinone content is in git history if you need the exact text):
   - `src/app/portfolio/page.tsx` — listing card (`num`, `href`, `status`, `logo`, `name`, `loc`, `note`, `founded`, `link`) and re-add the `frosinone` crest branch + the `"frosinone"` value to the `logo` union type.
   - `src/components/HomeHero.tsx` — club card #2.
   - `src/components/Topbar.tsx` — desktop dropdown + mobile sublink (`/portfolio/italy` → `/portfolio/frosinone`).
   - `src/components/ClaraVistaMapLegacy.tsx` — the `PORTFOLIO` map entry, the `pp-row`, and the legacy club card.
   - `src/components/TrackRecord.tsx` — the entry (re-add `logo` + restore `status`/`name`/`href`/`description`).
   - `src/components/SelectionScorecard.tsx` — rename the `italy` key back to `frosinone`.
   - `src/app/globals.css` — re-add the `.cc-logo img.frosinone-crest` / `.pclub-logo img.frosinone-crest` rules.
   - `src/app/portfolio/italy/page.tsx` — restore to the redirect stub (or remove) if `/portfolio/italy` is no longer wanted.

3. `npm run build` to confirm.
