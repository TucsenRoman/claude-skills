---
name: ui-loop
description: High-stakes design loop — set a measurable bar from a reference, then cycle a builder and three fresh-context critics until all pass. Use only when the user asks for the loop or the gauntlet, or accepts it when offered for a piece that has to be great (homepage, onboarding, launch screen). Costs many times a normal build; never run it unasked.
---

# ui-loop

Four phases: interview, preflight, teardown, loop. Don't skip ahead, and don't start building during phases 1 to 3.

## 1. Interview
Ask these together, then wait:
1. What are you building, and how big?
2. Name something that already does this brilliantly: a site, a video, a doc, anything you can open. "Skip" is fine.

The design system and files come from `ui-foundations`; load it instead of asking. If the piece is a redesign, run `ui-direction`'s inventory step; the keep-list is binding.

A vague bar ("Apple's website", "good SaaS design") is the number one reason this fails: the critic invents a comparison and approves everything on round one. Push once for the specific page or file. On "skip", propose three candidate bars, one line each on why, and wait; if there's no answer, take the hardest.

## 2. Preflight
A check, not a question. Report in one block before any work:
- Fetch the bar now (screenshot the URL or read the file). If it's blocked or missing, ask for another.
- Confirm you can render the output: `ui-mockup` for web and HTML, emulator screenshots for Expo.
- Confirm the input files exist.

Print what works, what's missing, and **which critic goes blind** if something is missing. Never carry on quietly with a critic that can't see.

## 3. Teardown
Turn the reference into binary tests a critic can check by looking: run `ui-codify` on it and use its tests as the bar. If a dna spec for this look already exists, reuse it. Mechanisms, not adjectives ("headline is 5x body size, three type sizes total", not "feels premium"). Show the bar to the user before continuing.

## 4. Loop
Split the goal into the smallest pieces that can be judged on their own, usually three or four; every extra piece multiplies the run. For each piece, a builder, then three critics, each in fresh context with no knowledge of how the builder worked:

| Critic | Judges against | Model |
|---|---|---|
| Brief | The stated goal; ignores aesthetics. Includes the regression check: every keep-list item present, no signature element swapped for a generic one | Fast |
| System | The project's foundations only | Fast |
| Craft | The bar's tests, plus a blind side-by-side with the reference (labels stripped): which is better, and the single biggest gap | Strongest available, always |

- The builder works as `ui-build` does: the project's real components and tokens.
- Write each critic's brief yourself for this goal; don't reuse generic wording.
- Critics judge rendered output, never code. Reading the implementation makes them grade intent instead of result.
- Binary verdicts, not scores; scores drift upward. Critics are harsh; praise isn't useful.
- All three must pass. Any fail goes back to the builder with the single biggest gap named.
- No fixed round count. The exit is winning, or the user stopping it.

Keep a progress file (or an Artifact if the user wants to watch remotely): each piece's status, each critic's verdict, the gap history, the round count.

## Cost
Before starting, say plainly that each round runs four agents, and ask for a round ceiling to check in at. There's no reliable token count, so show rounds and pieces instead. Past the ceiling, pause and ask.

## What breaks this
A vague bar. The builder judging its own work. A soft critic. A fixed round count. Over-specifying: every extra instruction is one fewer decision the model makes with its own judgment.

When the loop exits, recommend `ui-feel` and `ui-review`.
