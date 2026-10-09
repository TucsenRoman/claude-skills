---
name: ui-stress
description: Stress-test UI with worst-case realistic data — long names, unbreakable emails, one-letter names, missing fields, huge counts, empty lists, long labels, non-Latin text, emoji — and report what breaks with a fix for each. Use when the user asks to stress-test, break, or find edge cases in a screen or component, after building data-driven UI, or before shipping lists, cards, profiles, tables, and feeds.
---

# ui-stress

Throw the realistic worst case at the UI and fix what breaks. Guide: [sources/break-ui/GUIDE.md](sources/break-ui/GUIDE.md).

## How it runs here
- Use the product's real data shapes from the project's types and database, not invented fields.
- Web: render demo and worst-case data behind the guide's toggle and check in the browser at phone and desktop widths, light and dark.
- Expo: put the worst-case data behind a dev-only toggle and check on the emulator or Expo Go; screenshot both states. Remove the toggle when done unless the user wants it kept.
- Report the breaks in the proposals table (`# | Proposed | Now | Why`, see `../SHARED.md`): Now is what breaks, Proposed is the fix. Apply what the user approves.

## Occasional modes (ask once per session before first use)
- **Harden** — [sources/harden/GUIDE.md](sources/harden/GUIDE.md) (from Impeccable): production hardening beyond data (error states, i18n, overflow, offline). Suggest before a release.

## Next
Recommend `ui-review`.
