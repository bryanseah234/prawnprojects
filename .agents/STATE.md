# STATE

Updated 2026-09-10 SGT. Task: portfolio upkeep and removal of browser account access.

## Current work

- Isolated branch `maintenance/prawn-projects-20260910` starts from fresh `origin/main` (`2eeaa55`). Original local edits are preserved.
- Public production baseline reproduced an authenticated browser request to Vercel's project API and only 20 rendered project links. Credential presence was recorded as a boolean; values were not captured in reports.
- A fresh hosting inventory contains 26 deployed public projects and one undeployed project. The replacement bundles an explicit public catalog and compiles Tailwind with the existing design tokens.
- Five catalog tests pass, covering unsafe links, private metadata, duplicate entries, alias selection and inventories larger than one API page. All 26 public links passed HTTP checks. TypeScript and the production build passed with synthetic credential markers absent from the output. Desktop/mobile checks passed for all links, keyboard navigation, Prawn styles and page width, with zero account API or runtime compiler requests.
- The exposed credential needs revocation after checking other consumers. The replacement requires no account credential; older bundles may still contain the old one.

## Next steps

Publish the reviewed commit, verify both public domains and record the deployment. Keep credential revocation open until verified. If a UI regression needs repair, retain the public catalog; do not restore the former browser account integration as a rollback.

## Earlier handoff

The previous MOLT continuity proof remains documented in `handoffs/2026-08-11-075711-molt-wrapup-proof.md` and `handoffs/2026-08-09-molt-proof-seed.md`.
