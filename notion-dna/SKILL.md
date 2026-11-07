---
name: notion-dna
description: Notion's thinking as a reusable spec — one block for everything, a quiet monochrome frame, and color that belongs to the user's content. Use when building pages, rosters, lists or customizable group spaces that should feel like Notion, or when the user names Notion as the reference. Learns the system; never copies Notion's marks or look wholesale.
---

# notion-dna

Notion's system, reduced to rules that work on other content.

## Use it
1. Load the project's own foundations first (`ui-foundations`). The project's tokens and copy win; this spec supplies structure and restraint.
2. Put [PROMPT.md](PROMPT.md) and its reference images in the builder's brief. Never paste `dna.json` into a prompt.
3. Pick an archetype. `page_anatomy` in [dna.json](dna.json) has sizes and placement.
4. Before adding anything, ask whether it can be an existing block.
5. Run the check: `node tools/check.mjs <file.html>`. It covers the automatic tests; the rest are in `dna.json`.

## Pairing with flighty-dna
On Loop'd, use this for what a group builds and `flighty-dna` for live status. Inside a Notion-style page, a live piece follows Flighty.

## Files
- `dna.json`: the full record, with tests and rebuild findings.
- `PROMPT.md`: the 2KB payload.
- `reference/DESIGN-SOURCES.md`: what the makers said, with sources.
- `reference/screens/`: 361 images, with `INDEX.md`. These belong to others, so they stay on this machine and out of git.
- `example/`: the spec's rebuilds, made without seeing the original.
- `tools/measure.mjs`: color coverage for a screenshot.

## Never
Ship Notion's name, logo, typeface or illustrations. Its brand guidelines prohibit copying its look and feel, so combine these rules with your own identity.
