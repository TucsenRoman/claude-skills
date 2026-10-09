---
name: prog-rep
description: Give a short progress report on the work in this session. Covers what's done, in progress, blocked, open PRs, and anything waiting on the user. Use when the user types /prog-rep, says "progress report", "status?", "where are we", or "what's left".
---

# Progress report

The user wants a snapshot they can read in 20 seconds, not a replay of the session.

## Gather (quickly, read-only)
- The task list or plan agreed in this conversation. What was asked for, and what's finished?
- If in a git repo: `git status --short`, the current branch, and open PRs (`gh pr list --author @me --state open`) with their check status (`gh pr checks <n>`).
- Anything you're waiting on: user approvals, sign-ins, failing checks, background jobs.

Don't start new work while reporting. If you were mid-task, finish the current tool call, report, then continue.

## Format
1. **One line up top:** the overall state (e.g. "3 of 5 done, 1 blocked on you").
2. **A table:** `Item | Status | Notes`, with status as ✅ Done / ⏳ In progress / ⚠️ Problem / 🛑 Blocked on you / ⬜ Not started. Link PRs as markdown links.
3. **Needs you:** a short list of exactly what the user must do (approve PR #n, run a command, answer a question). If nothing, say "Nothing, I'm continuing."
4. **Next:** one line on what you're doing next.

Keep it under ~15 lines. Plain words, no jargon without a short explanation. After reporting, carry on with the next step unless the user needs to decide something.
