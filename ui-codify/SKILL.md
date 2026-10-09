---
name: ui-codify
description: "Codify one design the user loves (any medium) into a reusable spec: measured ratios, coverage, bans, pass/fail tests, a capped 2KB prompt payload and a full dna.json record, validated by rebuilding the original from the spec alone. Use when the user names a reference they want to capture or match, when ui-foundations starts a design system from a reference, or when ui-review-deep needs a measurable bar."
---

# Design DNA

Codify one design into a permanent, reusable skill. Not just for "designs" — this applies to anything built: a website, poster, motion graphic, carousel, or deck. Same system, same file, same tests. The format is an output, not the subject.

Run this as a forensics analyst, not a fan. Your job is not to praise or describe the design in front of you — it is to reduce it to the smallest set of rules that reproduces its identity on completely different content, forever, across any medium. Treat the design as evidence, not a brief.

## The standard

A specification that cannot fail is not a specification. Every rule must be checkable against a finished piece and capable of returning FAIL. If a rule could be satisfied by a bad copy, it isn't a rule yet.

## What actually carries a design's identity

1. **Relationships, not values.** "Headline is 96px" is nearly worthless. "Headline is 8x body, never under 6x" is the identity. Style lives in ratios between elements.
2. **Proportions of colour, not just colour.** The same three hex codes at 60/30/10 vs 90/8/2 are two different designs. Always record coverage percentage per role.
3. **The one weird move.** Almost every great design breaks its own system exactly once (type crossing an image, a rule overshooting its margin, a clipped numeral). It's the highest-information element and the first thing mechanical extraction loses. Find it, name it, give it its own slot.
4. **Refusals, not just permissions.** Listing six colours implies six are allowed. If the real design uses one accent on 3% of the canvas, the content IS the refusal. Write refusals down.
5. **Absence is design.** No shadows, no icons, no curves, nothing centred — record what's missing with the same care as what's present.
6. **Named layouts, not just styling.** Without named layouts, output #8 won't match output #1 as a set — consistent styling, inconsistent structure reads as sloppy.

## Two documents, not one

- `dna.json` — the exhaustive record, for you and build tools. Any size. Never pasted into a prompt.
- `PROMPT.md` — the model-facing payload. **Hard cap: 2KB.** Compliance drops as constraint count rises, and content buried mid-document is recovered far worse than content at either end (Lost in the Middle). Style substantially resists verbal description — route it through the reference image (near-free via decoupled cross-attention), not more words. Always attach the reference image, first.

## Run this in seven steps, showing your work at each

### Step 1 — Observe, don't interpret
Flat inventory of literal, measured observations: sampled hex colours + canvas coverage %, count of type sizes/weights/accent uses, largest:smallest type ratio, margins as % of canvas, texture/grain/edges/image treatment, and what's absent. No judgement yet.

### Step 2 — Debate it with yourself
Run two opposed internal loops:
- **Maximalist**: argue for writing everything down exhaustively — anything omitted gets improvised, and improvisation is where the look dies.
- **Minimalist**: argue that identity lives in 3-9 moves plus a wall of bans, and that matching every value can still look generic; attack the maximalist list for trivia.

Adjudicate per property: "if I changed this value, would the output stop looking like the reference?" Yes = load-bearing, keep. No = trivia, drop from the prompt (may stay in dna.json). Resolve by keeping BOTH documents — exhaustive record for dna.json, capped payload for PROMPT.md — not a single compromise document.

### Step 3 — Codify into dna.json
Fill these keys (omit any that truly don't apply):

- `meta`: name, slug, source, captured date, medium_of_origin, not_copied (real logos/licensed photos — copy the system, never the marks)
- `soul`: one_line (≤160 chars, concrete nouns), 3-5 adjectives, lineage, read_distance, energy (density/variance/contrast/warmth, 1-10 each)
- `palette`: colors[] (role, hex, descriptive name — never a token name), coverage % per role summing to ~100, banned behaviours
- `type`: families[] (role, family, required fallback, weights), scale (display_to_body_ratio, steps, max_sizes_per_frame), treatment (tracking, leading, case, measure, numerals)
- `space`: grid, margin_pct, gutter_pct, alignment, rhythm, negative_space, safe_area — all as percentages so one spec drives multiple formats
- `surface`: texture, edges, elevation, imagery treatment, iconography
- `signatures[]`: 3-9 named moves, each written as a ratio/relationship (move, how, when, never)
- `weird_move`: the single system break — its own key, deliberately
- `archetypes[]`: named layouts (id, purpose, anatomy, content_shape)
- `motion`: easing, durations, entrances, never_moves, reduced_motion fallback (omit for static work)
- `voice`: register, sentence length, headline shape, banned words
- `bans[]`: minimum 5, written as absolutes
- `tests[]`: minimum 8, binary and measurable (see Step 4)
- `reconstruction`: attempted, gaps_found, passes (filled in Step 5)

### Step 4 — Write tests that can fail
8-12 binary, measurable checks. Good examples: "accent colour covers under 8% of canvas", "no more than 3 type sizes in one frame", "largest:smallest type ratio above 6:1", "smallest type ≥28px at 1080px width", "the weird move is present exactly once", "body copy under 65 characters per line". Not tests: "feels premium", "looks clean" — if two people could disagree on the answer, it isn't a test. Mark which ones a script could decide automatically.

### Step 5 — Reconstruct and diff (do not skip)
Rebuild the original reference using only dna.json, without looking at the reference while building. Put the rebuild beside the original and list every difference. Every difference is a field the spec forgot — fold it back into dna.json and go again. Repeat until a stranger couldn't tell the copy from the original. Expect two or three rounds; expect the gaps to be things that felt obvious. A spec never used to rebuild its own source has never been tested.

### Step 6 — Emit the skill
Write a folder named after `meta.slug`:
```
<slug>/
  SKILL.md        how to use this style
  PROMPT.md       the 2KB payload — what actually goes in a context window
  dna.json        the full record — never pasted into a prompt
  reference/      the original, kept forever
  example/        one worked output, the canonical proof
  tools/check.py  the automatable tests, exits non-zero on failure
```
Order PROMPT.md exactly like this (attention is strongest at both ends, weakest in the middle):
1. Reference image, attached and named first
2. soul.one_line
3. The weird move, alone, unmissable
4. The 3-9 signature moves, as ratios
5. The bans, as absolutes
6. Palette and type — roles and coverage only, not a full ramp
7. Archetype names and when to use each
8. The self-check, last

Nothing else belongs in PROMPT.md — if a fact doesn't change the output from three metres away, it lives in dna.json only. To add a tenth signature, delete one; the cap forces the decision instead of shipping indecision.

End PROMPT.md with: "Before returning any output, run every test in the self-check. Name each test and its result. If any fails, repair the output and run them again. Never return output with a failing test and a note explaining it away."

### Step 7 — Report uncertainty
List every value that was inferred rather than measured, and every rule under 70% confidence. These are where the style will drift first.

## Rules for the analyst

- Never invent a value you could measure; if you can't measure it, mark it inferred.
- Never copy a real logo, wordmark, licensed photo, or proprietary typeface — record in `meta.not_copied` and substitute; reproduce the system, never the marks.
- Use descriptive colour names ("dusty plum"), never systematic ones ("accent-500") — image/video models can't read token names.
- Every font family needs a fallback; a silently substituted font is the most common quiet failure.
- When output looks generic, add a ban rather than another positive rule — a prohibition steers harder than a permission, and one ban can rule out an entire space in a single line.
- One skill per style. Never merge two identities into one spec — the average of two good designs is a bad design.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Matches every value, still generic | Too few or too many named moves | Cut to 3-9, write as ratios |
| Drifts to stock AI look | Not enough bans | Bans should outnumber positive style rules |
| Outputs in a set don't match each other | No named layouts | Add archetypes |
| Accent reads as a theme | No coverage percentages | Add them |
| Works on one format, breaks on another | Pixel values in spacing | Convert to percentages |
| Inconsistent rule compliance run to run | Prompt over 2KB cap | Cut it down |
| Best rule gets ignored | Buried mid-document | Move to top or bottom |
| Fine but forgettable | No weird move identified | Find the one system break |
| Spec feels done, output still wrong | Step 5 skipped | Rebuild the original from the spec and diff |

## Usage

Run `ui-review-deep` (or otherwise pick a winning design). Point `/ui-codify` at it. The output is a new named skill folder capturing that look as a command, not a memory — reusable on new content in any medium.