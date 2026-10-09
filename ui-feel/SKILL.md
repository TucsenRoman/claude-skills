---
name: ui-feel
description: How the UI feels to use, for web and Expo/React Native — motion, transitions, gestures, sheets, springs, easing, haptics, sound, and press feedback. Use when adding or changing animation or haptics, when something should "feel alive", "feel native" or more tactile, when asking what could animate or buzz, when motion stutters or feels off, or when naming a motion effect.
---

# ui-feel

How the UI responds to the user: motion, gestures, haptics, sound, press feedback.

## Read first
- [GUIDE.md](GUIDE.md): whether something should move at all, easing, duration budgets, springs, physics, where to add or remove motion, and effect names.
- The platform you're touching: [platforms/web.md](platforms/web.md) or [platforms/expo.md](platforms/expo.md).
- [LESSONS.md](LESSONS.md): what real use has taught. It beats the guide where they differ.

## Rules
- **Haptics and sound are part of the feel.** On native, pair a haptic with the physical moments: a light tap for selecting, a firmer one for committing or snapping into place, a warning buzz only for errors. Never on scroll or on something that fires constantly. Sound only where the product already uses it.
- Use the project's motion tokens (durations, easings) if it has them; add them via `ui-foundations` if it doesn't.
- Signature interactions (the product's own sheets, menus, FAB, press feedback) keep their feel. Change them only with the user's OK.
- Before judging or adding motion, read the motion code that already exists (hooks, shared helpers, not just the component).
- To explore or tune motion before building it, use `ui-mockup`'s lab with the motion preset (controls, slow motion, side-by-side).
- Verify on a device or emulator for Expo, and in the browser for web. Motion can't be judged from code. The emulator confirms motion runs; how fast it feels gets judged on a real phone.

## Next
Recommend `ui-review` when done; it checks motion against its motion standards.
