# ui-feel changes

- 2026-10-07: Renamed from ui-motion to ui-feel; scope now includes haptics, sound and press feedback, with a short haptics rule.
  Why: user wanted the name to cover haptics and other sensory feedback, not just motion.
- 2026-10-08: Removed "reduced motion is handled in every change"; accessibility moved to its own opt-in skill (`accessibility-sweep`).
  Why: conflicted with the user's no-accessibility rule.
- 2026-10-08: Read existing motion code (hooks, shared helpers) before reviewing or proposing motion.
  Why: the viseez motion review proposed a card count-up that already existed in a shared hook.
- 2026-10-08: The emulator confirms motion runs; feel and speed are judged on a real phone.
  Why: same slow-machine finding as ui-review.
- 2026-10-08: Distilled 7 copied guides (2,394 lines) into GUIDE.md (121) + platforms/web.md + platforms/expo.md; sources/ removed. Motion review standards moved to ui-review/motion.md. Added LESSONS.md.
  Why: sources were bloated and mostly unread; review belongs to ui-review; real-use lessons kept separate from upstream technique.
