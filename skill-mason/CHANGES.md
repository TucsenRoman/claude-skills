# skill-mason changes

- 2026-10-08: Created as the counterpart to skill-tailor: observes repeated philosophies, workflows, and formats, and proposes new skills.
  Why: the user wants repeated patterns turned into skills to save time, recommended first with a very brief ask.
- 2026-10-08: Added a "mute" answer (mute / not now / later / skip): puts a proposal off for the current session only, logged as `muted`, not a decline.
  Why: the user won't always want to decline an idea outright, only defer it.
- 2026-10-08: Added a Watching section to LEDGER.md so one-off patterns carry their count across sessions; Claude may update the ledger without asking. Stale entries drop after 60 days.
  Why: passive mode had no way to know a pattern was seen in an earlier session, so the "2+ sessions" bar couldn't work outside a sweep.
- 2026-10-08: Added "mute all": no asks for the rest of the session, watch list still updates, explicit /skill-mason still runs.
  Why: user wants to silence it when heads-down.
- 2026-10-08: declined: cap passive mode at one ask per session.
- 2026-10-08: Proposals use the shared table (# | Proposed | Now | Why) from the global CLAUDE.md.
  Why: user asked for one side-by-side format across every skill that proposes changes.
- 2026-10-08: Fires as a listener: logs a pattern when noticed and proposes the moment it clears the bar, not at task wrap-up.
  Why: user wants skill-tailor and skill-mason to behave like listener events.
