# Skills

A set of Claude Code skills for designing and building UI, plus a few that keep the skills themselves improving. Nothing here depends on another skill being installed.

## Install
1. Put this folder at `~/.claude/skills/` (or merge it into yours).
2. Add this line to `~/.claude/CLAUDE.md`, so the shared conventions load in every session:
   ```
   @~/.claude/skills/SHARED.md
   ```
3. Put your own preferences in your CLAUDE.md after that line. They win over `SHARED.md`.

## What's inside

**UI stages** (see the table in `SHARED.md` for how they hand off)
- `ui-foundations` — load, start, or extend a project's design system
- `ui-direction` — decide the look before building; boards, playgrounds, phone mockups
- `ui-build` — implement the chosen direction
- `ui-feel` — motion, gestures, haptics, press feedback
- `ui-stress` — worst-case data
- `ui-review` — regression check, critique, polish
- `ui-copy` — UI text in the project's voice
- `ui-loop` — opt-in builder + critics cycle for high-stakes screens
- `ui-codify` — turn a design you love into measurable rules and tests
- `ui-mockup` — standalone HTML phone frame with safe areas and device presets
- `ui-sync` — watch the upstream skills and propose what each stage should learn
- `accessibility-sweep` — accessibility pass, only when asked

**Skills that improve the skills**
- `skill-tailor` — refines a skill when it gets overridden or isn't working
- `skill-mason` — spots habits you keep repeating and proposes new skills for them

**Everyday**
- `ping-me` — push notification to your phone when a task finishes or gets blocked
- `prog-rep` — short progress report on the session

Each skill keeps a `CHANGES.md` (what changed and why, so reviews don't repeat old decisions) and may keep a `LESSONS.md` (what real use taught). See "How a skill is laid out" in `SHARED.md`.

## Shared conventions
`SHARED.md` holds what every skill follows: the UI stage table and rules, how source guides are used, the proposals table (`# | Proposed | Now | Why`), and when `skill-tailor` and `skill-mason` speak up.

## Sources and credits
Skills learn from outside skills without depending on them: each stage's `GUIDE.md` is distilled from the sources below and credits them at the top, and `ui-sync` watches those repos and proposes what to absorb when they change (`ui-sync/sources.json` lists what each stage watches). Some stages still hold older full copies in `sources/` until they're distilled. Sources and their licenses:
- [Emil Kowalski's skills](https://github.com/emilkowalski/skills) (MIT): animation, review, stress, prototyping, and UI-library guides
- [Taste](https://github.com/Leonxlnx/taste-skill) (MIT): marketing-page and aesthetic-preset guides
- [Impeccable](https://github.com/pbakaus/impeccable) by Paul Bakaus (Apache-2.0): clarify, critique, audit, polish, harden, document, new-work, and refine guides (typeset, layout, colorize, adapt, optimize)


