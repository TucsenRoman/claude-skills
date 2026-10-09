---
name: ui-feel
description: How the UI feels to use, for web and Expo/React Native — motion, transitions, gestures, sheets, springs, easing, haptics, sound, and press feedback. Use when adding or changing animation or haptics, when something should "feel alive", "feel native" or more tactile, when reviewing or auditing motion or feedback, when asking what could animate or buzz, when motion stutters or feels off, or when naming a motion effect.
---

# ui-feel

How the UI responds to the user: motion, gestures, haptics, sound, press feedback. Decisions in the order that makes them feel right. Uses Emil Kowalski's guides; they are the specialists here, and Impeccable's `animate` is not used.

## Route by job
| Job | Guide |
|---|---|
| Build an animation (web) | [sources/animate/GUIDE.md](sources/animate/GUIDE.md) + its RECIPES.md |
| Build an animation (Expo / React Native: Reanimated, Gesture Handler, haptics) | [sources/animate-expo/GUIDE.md](sources/animate-expo/GUIDE.md) + its RECIPES.md |
| Review motion on a specific change or component | [sources/review-animations/GUIDE.md](sources/review-animations/GUIDE.md) + STANDARDS.md |

Pick by platform from the foundations. A project with both web and Expo uses the guide for the code being touched.

## Rules
- **Haptics and sound are part of the feel.** On native, pair a haptic with the physical moments: a light tap for selecting, a firmer one for committing or snapping into place, a warning buzz only for errors. Never on scroll or on something that fires constantly. The Expo guide covers the API (`expo-haptics`). Sound only where the product already uses it.
- Use the project's motion tokens (durations, easings) if it has them; add them via `ui-foundations` if it doesn't.
- Signature interactions (the product's own sheets, menus, FAB, press feedback) keep their feel. Change them only with the user's OK.
- Before judging or adding motion, read the motion code that already exists (hooks, shared helpers, not just the component), so you never propose what is already built.
- Verify on a device or emulator for Expo, and in the browser for web. Motion can't be judged from code. The emulator confirms motion runs; how fast it feels gets judged on a real phone.

## Next
Recommend `ui-review` when done.

## Occasional modes (ask once per session before first use)
- **Find opportunities** — [sources/find-animation-opportunities/GUIDE.md](sources/find-animation-opportunities/GUIDE.md): read-only scan for places that should move, and places that shouldn't. Suggest when the user says the app feels static or flat.
- **Motion audit** — [sources/improve-animations/GUIDE.md](sources/improve-animations/GUIDE.md): codebase-wide audit with prioritized fix plans. Suggest for "improve the animations" across an app.
- **Apple-style physics** — [sources/apple-design/GUIDE.md](sources/apple-design/GUIDE.md): springs, momentum, interruptible gestures, materials and depth. Suggest for gesture-driven or sheet-heavy UI.
- **Name that effect** — [sources/animation-vocabulary/GUIDE.md](sources/animation-vocabulary/GUIDE.md): when the user describes a motion without knowing its name.
