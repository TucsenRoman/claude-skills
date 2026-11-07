---
name: flighty-dna
description: The Flighty look and thinking as a reusable spec — a sheet over a live world, big times that turn green or red, one yellow sign, only what matters now. Use when a live, time-sensitive status screen should feel like Flighty, or when the user names Flighty as the reference. Copies the system, never Flighty's marks.
---

# flighty-dna

Flighty's system, reduced to rules that work on other content.

## Use it
1. Load the project's own foundations first (`ui-foundations`). The project's tokens, fonts and copy win; this spec supplies structure and hierarchy.
2. Put [PROMPT.md](PROMPT.md) and its reference images in the builder's brief. Never paste `dna.json` into a prompt.
3. Pick an archetype. `detail_anatomy` in [dna.json](dna.json) has exact sizes and placement at 402pt wide.
4. Translate the domain: a stage, a next action, a countdown, what changed. Design the late or broken state first.
5. Run the check: `node tools/check.mjs <file.html>`. It covers the automatic tests; the rest are in `dna.json`.

## Files
- `dna.json`: the full record, with tests and rebuild findings.
- `PROMPT.md`: the 2KB payload.
- `reference/DESIGN-SOURCES.md`: what the makers said, with sources.
- `reference/screens/`: 386 images, with `INDEX.md`. These belong to others, so they stay on this machine and out of git.
- `example/rebuild-2.html`: the spec's proof, rebuilt without seeing the original.
- `tools/measure.mjs`: color coverage for a screenshot.

## Never
Ship Flighty's name, icon, airline logos or aircraft art. The system is free to learn from; the marks aren't.
