# skill-tailor changes (renamed from skill-sweep 2026-10-08; from skill-review 2026-10-07)

- 2026-10-07: Findings, questions and reports are one short line each, answered in one reply ("1 y, 2 n").
  Why: the user skipped the first review's output as too long; they want to read and approve in seconds.
- 2026-10-07: Added sweep mode (`/skill-review` with no name, at the start of a session) to find skills with friction across recent sessions.
  Why: the user doesn't want to have to notice conflicts and overrides themselves.
- 2026-10-08: Renamed from skill-sweep to skill-tailor.
  Why: match the role-noun naming of skill-mason; tailor adjusts what exists, mason builds new.
- 2026-10-08: Proposals use the shared table (# | Proposed | Now | Why) from the global CLAUDE.md.
  Why: user asked for one side-by-side format across every skill that proposes changes.
- 2026-10-08: Fires as a listener: in the next reply when the user overrides a skill or says its output or process isn't working, not at task wrap-up.
  Why: "we should improve the display output" slipped past because the rule only fired on overrides at wrap-up.
