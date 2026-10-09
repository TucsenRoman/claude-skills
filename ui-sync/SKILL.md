---
name: ui-sync
description: Update the design guides inside the ui-* skills from their upstream repos (Emil Kowalski's skills, Taste, Impeccable's reference guides). Use when the user asks to update, sync, or refresh the design skills, or to check for new versions.
disable-model-invocation: true
---

# ui-sync

## Steps
1. Dry run first and show the result: `bash ~/.claude/skills/ui-sync/tools/sync.sh --dry-run`. It lists updated guide folders, upstream folders that went missing, and new upstream skills not mapped yet.
2. With the user's OK, run it for real (no flag).
3. For each **NEW upstream skill**, read it and recommend which `ui-` stage it belongs in, if any. Add accepted ones to `sources.json` and to that stage's SKILL.md as an occasional mode.
4. For each **MISSING** entry, find where it moved upstream and fix `sources.json`.
5. Skim the diffs of updated guides for changes to how they work (new steps, renamed files that stage routers link to). Fix broken links in the stage SKILL.md files.
6. Report: what changed, anything that needs a decision.

Only the copied upstream guides are synced; the skills themselves are never overwritten.
