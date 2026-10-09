---
name: ui-loop
description: High-stakes design loop — set a measurable bar from a reference, then cycle a builder and three fresh-context critics until all pass. Use only when the user asks for the loop or the gauntlet, or accepts it when offered for a piece that has to be great (homepage, onboarding, launch screen). Costs many times a normal build; never run it unasked.
---

# ui-loop

The original method is in [sources/design-loop/GUIDE.md](sources/design-loop/GUIDE.md). Run its four phases (interview, preflight, teardown, loop) with these changes:

- **Interview**: question 3 (files to work from) is answered by `ui-foundations`. Load it instead of asking. If the piece is a redesign, run `ui-direction`'s inventory step; the keep-list is binding.
- **Preflight**: rendering uses `~/.claude/skills/ui-direction/tools/board.sh` (web and HTML) or emulator screenshots (Expo). Image-generation tools are not required.
- **Teardown**: instead of a quick `bar.md`, run design-dna on the reference ([../ui-foundations/sources/design-dna/GUIDE.md](../ui-foundations/sources/design-dna/GUIDE.md)) and use its binary tests as the bar. If the user already has a dna spec for this look, reuse it.
- **Builder**: works as `ui-build` does: the project's real components and tokens, the keep-list honored.
- **Critics** (fresh context each round, judging rendered output only, never the code):
  - **Brief critic**: does it do the job? Includes the regression check: every keep-list item present, no signature element swapped for a generic one.
  - **System critic**: the project's foundations, not a generic `design-system.md`.
  - **Craft critic**: the dna tests plus a blind side-by-side with the reference. Always the strongest model available.
- **Progress**: keep a progress file (or an Artifact if the user wants to watch remotely) with each piece's status, each critic's verdict, the gap history, and the round count.
- **Cost**: before starting, say plainly that each round runs four agents, and ask for a round ceiling to check in at.

When the loop exits, recommend `ui-feel` and `ui-review` as usual.
