---
name: ui-stress
description: Stress-test UI with worst-case realistic data — long names, unbreakable emails, one-letter names, missing fields, huge counts, empty lists, long labels, non-Latin text, emoji — plus a logic pass that checks every computed number on screen against the app's math, and report what breaks with a fix for each. Use when the user asks to stress-test, break, or find edge cases in a screen or component, after building data-driven UI, or before shipping lists, cards, profiles, tables, and feeds.
---

# ui-stress

Throw the realistic worst case at the UI and fix what breaks. Guide: [GUIDE.md](GUIDE.md).

## How it runs here
- Use the product's real data shapes from the project's types and database, not invented fields.
- Web: render demo and worst-case data behind the guide's toggle and check in the browser at phone and desktop widths, light and dark.
- Expo: put the worst-case data behind a dev-only toggle and check on the emulator or Expo Go; screenshot both states. Remove the toggle when done unless the user wants it kept.
- Logic pass, whenever the screen shows computed numbers (totals, goals, streaks, suggestions): check each one against the app's own math and source data with hard cases (zero, negative, refunds, missing history, goals that clash). A wrong or impossible number is a break (user, 2026-10-24: "make sure it's displaying truly accurate numbers").
- Report the breaks in the proposals table (`# | Problem | Context | Why | Now | Proposed`, see `../SHARED.md`): Now is what breaks, Proposed is the fix. Apply what the user approves.

## Occasional modes (ask once per session before first use)
- **Stress lab** — `ui-mockup`'s lab with the stress data preset: the real component with dials for extreme data, so the user finds the breaking point live. Only when the user wants to find limits by hand; by default the table from the real screen is the result. Don't pitch it after a report.
- **Harden** — the hardening section of [GUIDE.md](GUIDE.md): errors, loading and slow network, double-submits, overflow, cleanup. Suggest before a release.

## Next
Recommend `ui-review`.
