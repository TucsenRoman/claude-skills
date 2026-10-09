---
name: ui-sync
description: Learn from the upstream skills the ui- stages draw on (Emil Kowalski's skills, Taste, Impeccable). Shows what changed upstream since the last review and proposes what each stage should absorb into its GUIDE.md. Use when the user asks to update, sync, or refresh the design skills, or to check what's new upstream.
disable-model-invocation: true
---

# ui-sync

The stages learn from outside skills without copying them. This skill watches those repos and turns new upstream ideas into proposals.

## Steps
1. Run `bash ~/.claude/skills/ui-sync/tools/sync.sh`. For each repo it reports `same` or `CHANGED`, then lists per stage which watched files changed (`stage <- path`), any `MISSING` paths, and `NEW (unwatched)` upstream skills. Diffs land in the temp folder it prints.
2. For each stage with changes, read the diffs and that stage's `GUIDE.md`, `platforms/`, and `LESSONS.md`. Keep only what would change what the stage builds or how it judges: new rules, better values, new techniques. Skip rewording, tool-specific instructions, and anything the stage's lessons already overrule.
3. Propose the absorptions in the proposals table: Proposed is the line to add or change in the stage's guide, Now is what the guide says today, Why names the upstream source and the gain.
4. For each **NEW** upstream skill, say in one line whether a stage should watch it, and add it to `sources.json` if the user agrees. For each **MISSING** path, find where it moved and fix `sources.json`.
5. Apply what's approved, credit the source at the top of the guide if it's new, and log it in the stage's `CHANGES.md`.
6. Run `bash ~/.claude/skills/ui-sync/tools/sync.sh --mark` so the next run only shows newer changes.

Nothing upstream is ever copied into a skill wholesale.
