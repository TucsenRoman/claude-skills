---
name: dna-instagram
description: Instagram's UI as a reusable spec — a white or midnight page, a 1px photo grid, one gradient avatar ring, one indigo button, sheets over content. Use when a social or collection screen (profiles, circles, photo grids, comments, chat) should feel like Instagram, or when the user names Instagram as the reference. Copies the system, never Instagram's marks.
---

# dna-instagram

Instagram's system, reduced to rules that work on other content. Core reference #2 for Gift Circle (Life360 is #1).

## Use it
1. Load the project's own foundations first (`ui-foundations`). The project's tokens, fonts and copy win; this spec supplies structure and hierarchy.
2. Put [PROMPT.md](PROMPT.md) and its two reference images in the builder's brief. Never paste `dna.json` into a prompt.
3. Pick an archetype. Anatomy and measurements at 375px are in [dna.json](dna.json).
4. For Gift Circle, read `gift_circle_translation` in `dna.json`: circle page, ring, grid, claim sheet.
5. Run the check: `node tools/check.mjs <file.html>`. It covers the automatic tests; T8, T10, T11, T12 are read by eye.

## Files
- `dna.json`: the full record, with tests, inferred values and rebuild findings.
- `PROMPT.md`: the 2KB payload.
- `reference/screens/`: `web-profile-light.jpg` and `web-profile-dark.jpg` (instagram.com mobile web, 375px) and `appstore-01..08.jpg` (official App Store images, 455.0.0). They belong to others, so they stay on this machine and out of git.
- `example/rebuild-2.html`: the spec's proof, built from the spec alone, round 2 (rebuild-1.html is round 1, before the fixes).

## Not the same as
The Amazon gift-card texture pack. That is a separate set of patterns for covers and empty states; it never goes on chrome.

## Never
Ship Instagram's name, glyph, wordmark or Instagram Sans. The system is free to learn from; the marks aren't. The ring may be reused as an idea, in Gift Circle's own colours.
