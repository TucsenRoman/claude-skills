---
name: skill-tailor
description: Review how skills held up in real use and refine them with the user, in quick yes/no decisions. Use when the user asks to review, audit, tune, or improve a skill; at the start of a session to sweep recent sessions for skill friction the user shouldn't have to spot themselves; the moment the user overrides or corrects a skill, or says a skill's output or process isn't working. Rebuilds context from the skill's files, past session transcripts, and saved preferences, then asks about each change before editing anything.
---

# skill-tailor

Turn evidence from real use into a better skill. The user decides every change; this skill's job is to find what's worth deciding and make each decision take seconds.

## Keep it fast and light
The user should read and approve the whole thing in seconds.
- Findings go in the proposals table (`# | Proposed | Now | Why`, see `../SHARED.md`): Proposed is the new instruction, Now is what the skill says today, Why is the evidence in a few words. No quotes or background.
- Then one line telling them how to answer, for example `Reply like "1 y, 2 n, 3 y"`.
- Details (evidence, exact wording of the edit) only when the user asks about a number.
- Same for the final report: a few short lines.

## Two ways in
- **Named** (`/skill-tailor ui-review`): review that skill.
- **Sweep** (`/skill-tailor` with no name, usually at the start of a session): find the skills that need attention, so the user never has to notice friction themselves. Look at sessions since the skill's last commit in the skills repo (or the last two weeks), find where the user overrode or corrected a skill, and list the skills with friction, one line each and most friction first. Then review the one the user picks, or all of them in a row. If nothing turned up, say so in one line and stop.

**Standing permission:** while this skill runs, Claude may ask the user about any instruction in the skill under review: whether it still holds, which side wins in a conflict, and whether to change it. Asking is expected, not an interruption. Editing is not covered: nothing under `~/.claude/skills/`, no CLAUDE.md, and no memory changes until the user approves that specific change.

## 1. Pick the skill
- From the arguments, or from the sweep. Mid-session with no name, use the skill that was just used.
- Locate everything it owns: `SKILL.md`, the files it links (guides, tools, templates), and its `LESSONS.md`.
- Note what's not its own: older copies of outside guides under `sources/`. Changes go in the skill's own files, not in those copies.

## 2. Rebuild context
Assume no memory of earlier sessions. Gather evidence, and note the date of each piece:
- **The skill itself**: read `SKILL.md` and the linked files in full. Check the skills repo's git log for it so you don't redo a recent change.
- **Past use**: search session transcripts for the skill's name and for "Launching skill: <name>", plus any former names (check the skills repo's git log) (`mcp__ccd_session_mgmt__search_session_transcripts` when available, otherwise grep `~/.claude/projects/*/*.jsonl`). Read the user's messages around each use. That's where overrides and complaints live.
- **The current session**, if the skill was used in it.
- **Saved preferences**: feedback memories in `~/.claude/projects/*/memory/`, the global `~/.claude/CLAUDE.md`, and the CLAUDE.md of projects where the skill ran.
- **Neighbors**: skills it hands off to or shares a job with, for overlaps and contradictions.

Keep this proportionate: a handful of real uses is enough. Stop gathering when new evidence stops changing the picture.

## 3. Find the friction
Only what the evidence shows. Each finding gets a category:
- **Override**: the user corrected, reversed, or rejected what the skill had Claude do.
- **Conflict**: the skill says one thing; a user preference, project rule, or another skill says another.
- **Dead weight**: a step that was skipped, didn't apply, or that the user called noise.
- **Gap**: Claude had to improvise something the skill didn't cover, and it worked (a technique, a workaround, an output format).
- **Failure**: the instruction was followed and the result was bad (wrong tool, broke, too slow).
- **Stale**: a path, tool, command, or version that no longer exists. Verify before reporting.

For each one, capture what happened (a short quote or paraphrase, with the session date), what the skill says now, and the smallest change that would have prevented the problem. If there's no evidence for a hunch, leave it out, or list it separately as a question.

## 4. Ask
Present the findings ranked by impact (overrides and conflicts first), in the short format above. The user answers yes, no, or a tweak per number, all in one reply.
- For a conflict, ask which side wins before drafting the edit. Sometimes the fix belongs on the other side (the project rule or the other skill), and that's a separate approval.
- When a finding is really a user preference that reaches beyond this skill, offer to save it where it belongs: a memory, the user's own CLAUDE.md, or the project's CLAUDE.md. When it's a convention every skill should follow (an output format, a shared step), put it in `../SHARED.md` so the skills stay self-contained.
- Don't edit anything until the answers are in.

## 5. Apply
- Edit in place, in the skill's existing voice and structure. Prefer replacing an instruction over adding next to it. Delete what's obsolete; a skill should get sharper, not longer.
- Keep the frontmatter `description` accurate, since that's what decides when the skill fires. Update it if the skill's scope changed.
- Commit each applied change to the skills repo with a one-line why.
- Re-read the edited skill end to end for contradictions you just introduced.

## 6. Report
A few short lines: what changed, what was declined, what's still open. If a change needs trying in real use before it's trusted, say so in one line.

## Rules
- Evidence over opinion. A finding without a source is a question, not a change.
- One decision per change; the user never approves a bundle blind.
- Small, reversible edits, one commit each.
- Never edit a copied outside guide; change the skill that loads it.
