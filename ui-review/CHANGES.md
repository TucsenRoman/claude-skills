# ui-review changes

- 2026-10-07: Removed the accessibility step (and a11y from Impeccable audit use).
  Why: user said they don't care about accessibility or screen readers; contrast numbers were noise.
- 2026-10-07: Visual fixes get a quick mock or before/after crop before applying.
  Why: the viseez week-line fix shipped without one and came out too subtle.
- 2026-10-07: Render full, empty and worst-case states with realistic data; use sample/stress data when the account is empty; list unreviewed states.
  Why: the viseez review couldn't see a populated month (bank disconnected, sample needed sign-out).
- 2026-10-07: Check each capture before judging; retake loading/overlay/wrong-screen shots.
  Why: several viseez captures caught a skeleton, the dev menu, or a mis-tapped sheet.
- 2026-10-07: Declined: "write rules set during a review into the project's design doc" as a standard step.
- 2026-10-08: Speed and lag are judged on a real phone, not the emulator (this machine is slow).
  Why: a 1-2s sheet delay in review turned out to be the computer, not the app.
- 2026-10-08: When driving an emulator, wait for the expected screen (UI tree check) before each tap.
  Why: blind taps into a loading app left it three times and opened the home screen's search.
- 2026-10-08: Proposals use the shared table (# | Proposed | Now | Why) from the global CLAUDE.md.
  Why: user asked for one side-by-side format across every skill that proposes changes.
