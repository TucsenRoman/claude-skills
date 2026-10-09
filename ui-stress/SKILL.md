---
name: ui-stress
description: Stress-test UI with worst-case realistic data — long names, unbreakable emails, one-letter names, missing fields, huge counts, empty lists, long labels, non-Latin text, emoji — and report what breaks with a fix for each. Use when the user asks to stress-test, break, or find edge cases in a screen or component, after building data-driven UI, or before shipping lists, cards, profiles, tables, and feeds.
---

# ui-stress

Throw the realistic worst case at the UI and fix what breaks. Guide: [GUIDE.md](GUIDE.md).

## How it runs here
- Use the product's real data shapes from the project's types and database, not invented fields.
- Web: render demo and worst-case data behind the guide's toggle and check in the browser at phone and desktop widths, light and dark.
- Expo: put the worst-case data behind a dev-only toggle and check on the emulator or Expo Go; screenshot both states. Remove the toggle when done unless the user wants it kept.
- Report the breaks in the proposals table (`# | Proposed | Now | Why`, see `../SHARED.md`): Now is what breaks, Proposed is the fix. Apply what the user approves.

## Occasional modes (ask once per session before first use)
- **Stress lab** — `ui-mockup`'s stress lab: the real component with dials for extreme data, so the user finds the breaking point live. Suggest for data-heavy components (lists, cards, tables, profiles).
- **Harden** — the hardening section of [GUIDE.md](GUIDE.md): errors, loading and slow network, double-submits, overflow, cleanup. Suggest before a release.

## Next
Recommend `ui-review`.
