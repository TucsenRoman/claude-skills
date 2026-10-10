---
name: ship
description: Take the current change from working tree to merged PR in any repo. Branch, commit, push, open a PR, check CI, ask Approve/Deny, merge, and update main. Use when the user types /ship, says "ship it", "push it", "make a PR and merge", "merge into main and push", or a change is ready to land.
---

# Ship

Ship the change that is in progress (or the one described in the arguments) as a PR, and merge it only after the user approves.

## 1. Scope the change
- Run `git status` and `git diff`. Commit **only** files that belong to this change. If other uncommitted work is present that you didn't make in this session, leave it out and say so.
- Never commit `.env*`, keys or tokens. Scan the staged diff for secrets before committing.
- Verify the change the way the project's CLAUDE.md says (its preview, device, or tests). Follow its rules for database changes.

## 2. Branch and commit
- If on the main branch, create a branch: `feat/…`, `fix/…`, `chore/…` or `docs/…`, named after the change.
- Conventional commit message (`fix(web): …`), with a body that explains **why**. End it with the attribution line from the system reminder.

## 3. PR
- Push, then `gh pr create --base <main branch>` with:
  - **What changed** (bullets)
  - **Why**
  - **Verified** (what you actually checked, and how)
  - **Notes for review** (anything surprising, and anything left out on purpose)
  - The attribution footer from the system reminder
- If `gh` isn't on PATH, use `"/c/Program Files/GitHub CLI/gh.exe"`.

## 4. Checks
- In the Claude desktop app: bind the PR with the `ccd_pr` tools (`get_status`, then `bind_pr` if it isn't listed) and let the app watch CI; offer Auto-fix. Don't poll CI yourself there.
- Elsewhere: `gh pr checks <n> --watch --interval 15`.
- **If a check fails:** read the logs, fix the problem, push again. Don't ask to merge a red PR.

## 5. Approve or deny
Ask with `AskUserQuestion`, one question, header `Merge PR #<n>`:
- The question: the PR title, one plain line on what it does, and the check status.
- Options: **Approve & merge** / **Deny**. If the PR has a database migration, add **Merge only** (don't apply to the DB).

Never merge without the click.

## 6. Merge and sync
- On approve: `gh pr merge <n> --merge`, then switch to the main branch and pull.
- If a migration needs applying, follow the project's CLAUDE.md for it.
- Report in 2–4 lines: what merged, what's live, and anything left over.
- If the user asked to be pinged (`ping-me`), send one push notification at the approval step and one when done.
