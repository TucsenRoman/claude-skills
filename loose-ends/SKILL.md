---
name: loose-ends
description: Find and clear the loose ends in a repo or the dev folder — uncommitted work, unpushed or unmerged branches, open PRs, stashes, dead worktrees, stray folders and cleanup notes — then work through them one at a time. Use when the user asks "any loose ends?", "what's left hanging", "clean up", or wants to tidy a project before moving on.
---

# loose-ends

Sweep for unfinished business, list it, then clear it one item at a time with the user.

## 1. Sweep
In the current repo (or each repo under the dev folder, if the user asks wide):
- Uncommitted or untracked changes (`git status`), and who made them if you can tell.
- Branches not pushed, or pushed but not merged; open PRs (`gh pr list`) and their check status.
- Stashes (`git stash list`) and worktrees (`git worktree list`), including ones whose folder is gone.
- Stray folders and files that don't belong to any project, and any cleanup or TODO notes the project keeps.

## 2. List
One numbered list, most important first, one short line each: what it is and what you'd do with it ("3. `fix/sheet-close` pushed, not merged, checks green: merge?"). No paragraphs. If nothing turned up, say so in one line.

## 3. Work it one at a time
- Take the user's pick (or the top item), do it, report in a line, move to the next.
- **Say what a thing is before deleting it**: what it does or holds, how old it is, whether anything uses it. Wait for a yes on every delete.
- Commits and merges follow `ship`. Locked folders: find what holds them (a running server, an open session) and say so, rather than forcing it.
