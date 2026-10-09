# ui-feel lessons

Learned from real use, not from the source guides. One line each, newest last.

- 2026-10-08 (viseez): Inside a React Native `Modal`, open and close with layout animations (`entering` / `exiting`), not a shared-value animation started from JS. The JS-started one can stall off-screen and leave an invisible sheet that swallows taps.
- 2026-10-08 (viseez): When a horizontal pan sits inside a vertical scroll, pair `activeOffsetX` with `failOffsetY`, so a vertical drag hands back to the scroll.
- 2026-10-08 (viseez): Swipe-to-change (months, pages): switch the content on release and let the new one slide in, rather than waiting for the old one to finish leaving. Waiting leaves an empty beat.
- 2026-10-08 (viseez): After the first load, keep content on screen while the next batch loads; a full-screen skeleton on every change hides the transition.
- 2026-10-08 (viseez): Read the existing motion code (shared hooks, helpers) before proposing motion. A review proposed a count-up that already existed in a hook.
