---
name: skill-mason
description: Spot philosophies, rules, and workflows the user keeps repeating that no skill covers yet, and propose turning them into a new skill. Use when the user asks to find, suggest, or build a new skill from their habits; at the start of a session to sweep recent sessions for repeated patterns; or when a task wraps up and the user restated something they've said before. Always recommends in one line and waits for a yes before building anything.
---

# skill-mason

Turn what the user keeps repeating into a skill, so they stop having to repeat it. `skill-tailor` sharpens skills that exist; this one proposes skills that don't. The user decides; this skill's job is to notice and make the decision take one word.

## Keep it fast and light
- **The ask is one line.** Pattern, evidence count, proposed name. For example:
  `Pattern: you've asked for a before/after table on every refactor (4x, 3 sessions). Build "refactor-recap"? y/n`
- Several at once: the proposals table (`# | Proposed | Now | Why`, see `../SHARED.md`) (Now = what happens today without the skill), then `Reply like "1 y, 2 n"`.
- Details (quotes, dates, the draft outline) only when the user asks about a number.
- Ask at the end of a task, never mid-task.

## Answers
- **Yes** ("y", "yes", "build it"): build it (see Build).
- **No** ("n", "no", "decline"): log as `declined`. Don't raise it again (see The bar).
- **Mute** ("mute", "not now", "later", "skip", "ask me another time", or similar): drop it for the rest of this session only. Log as `muted`; it is not a decline, so it can come back in any later session as long as it still clears the bar.
- **Mute all** ("mute all", "mute mason", "no more today", or similar): no more asks of any kind for the rest of this session. Keep updating the watch list quietly. An explicit `/skill-mason` still runs.

## Two ways in
- **Passive** (`../SHARED.md` points here): during normal work, note when the user states a philosophy, workflow, or format worth tracking. When the task wraps up, check it against the watch list in `LEDGER.md`: new patterns get added, known ones get their count bumped. Once a pattern clears the bar below, make the one-line ask.
- **Sweep** (`/skill-mason`, usually at the start of a session): search sessions since the last `LEDGER.md` entry (or the last two weeks) for repeated patterns, list the ones that clear the bar, most time saved first. If nothing turned up, say so in one line and stop.

## What counts as a pattern
- **Philosophy**: a principle the user restates in different words ("ship the ugly version first", "never mock the database").
- **Workflow**: the same multi-step sequence the user walks Claude through again (release steps, a review ritual, a setup routine).
- **Format**: the same output shape requested again (a report layout, a summary style, a naming scheme).
- **Correction across contexts**: the same fix applied to different work that no single skill owns.

## The bar
Propose only when all of these hold:
- **Repeated**: seen in 2+ sessions, or 3+ times in one.
- **Not covered**: no existing skill, CLAUDE.md rule, or memory already handles it. If a skill almost covers it, that's `skill-tailor` territory (a Gap); hand it over instead.
- **Skill-sized**: it's a procedure or a bundle of rules with judgment in it. A single one-line rule belongs in CLAUDE.md or a memory, so offer that instead, in one line.
- **Not declined**: check `LEDGER.md`. Don't re-raise a declined pattern unless it has kept recurring since (3+ new times), and then say so. A `muted` pattern is fair game again in any session after the one where it was muted.

**Standing permission:** Claude may ask the user about any pattern it spotted, and may update `LEDGER.md` (the watch list and decision lines) without asking. Building is not covered: nothing under `~/.claude/skills/`, no CLAUDE.md, and no memory changes until the user says yes to that specific proposal.

## Build (after a yes)
1. **Gather**: pull the evidence (the user's own words across sessions) so the skill states their philosophy, not a generic version of it.
2. **At most one question**, and only if the evidence leaves something genuinely open (for example, which of two conflicting versions wins). Otherwise just build.
3. **Write** `~/.claude/skills/<name>/SKILL.md` in the voice of the user's other skills: short, direct, rules over prose. Frontmatter `description` says what it does and when it fires, with the trigger phrases the user actually used.
4. **Wire it in** only if it belongs to a family (for example, a new `ui-` stage goes in the table in `../SHARED.md`). That edit is part of the yes; mention it in the ask.
5. **Start its `CHANGES.md`** with the date and one line on where it came from (the evidence).
6. **Report** in two lines: what was built, and how it fires. Suggest a `skill-tailor` after it's seen some real use.

## LEDGER.md
This skill's memory between sessions, in two parts:
- **Watching**: patterns seen but not yet over the bar, so counts carry across sessions. One line each: pattern · kind · count · sessions seen · first and last date · one short quote. Edit these lines in place as counts grow. A pattern stays here while muted, so its count keeps building. Drop a line once it's decided (built, declined, redirected, saved as rule), or when it hasn't been seen in 60 days.
- **Decisions**: every proposal's outcome, one line: date, pattern, name, outcome (`built`, `declined`, `muted`, `redirected to skill-tailor`, `saved as rule`). Append, never rewrite. A muted pattern that comes back gets a new line, so the ledger shows how many times it was put off.

## Rules
- Evidence over hunches. A pattern without repeats is not a pattern.
- Recommend first, always. Never build, scaffold, or "draft just in case" before a yes.
- One proposal per decision; the user never approves a bundle blind.
- Smallest home wins: rule before memory before skill.
