---
name: ui-review
description: One-pass review of built UI before shipping — regression check against the original screen, design critique, and polish (ui-review-deep is the multi-round version for high-stakes screens). Use when the user asks to review, critique, polish, audit, or sanity-check a screen or UI change, asks "does this look right", or a UI change is about to ship or go into a PR.
---

# ui-review

One pass over rendered output, ending in a ranked list of fixes. Judge what's on screen, not the code's intentions.

## 1. Render it
Screenshot the result at the project's real sizes, in light and dark: the web preview, or the emulator / Expo Go for native. Cover the states that matter with realistic data: full, empty, and worst case. If the real account can't show one, use the project's sample or stress data (never sign the user out to get there without asking), and list any state you couldn't review. Wait for the loaded state and look at each capture before judging it; retake any that caught a loading screen, an overlay, or the wrong screen. When driving an emulator or device, wait until the expected screen is on screen before each tap (check the UI tree, not a fixed sleep); a tap into a still-loading app can land on the home screen. Judge speed and lag on a real phone; emulators and dev machines can lag on their own. If there was an original (a redesign), render it too and put the two side by side with `ui-mockup`.

## 2. Regression check (first, always, for any redesign)
Compare against the `inventory.md` from `ui-direction`, or build one from the original screen if none exists. Fail the review if any of these happened without the user's OK:
- a feature, state, or action was dropped;
- a signature component was replaced by a generic one (a plain tab bar where the product has its own, a stock menu where it has a custom one);
- the screen got blander: identity, personality, or density lost for no stated reason.
List each with where it went missing.

## 3. Design critique
- Foundations compliance: tokens only, fonts, radii, spacing scale, both themes.
- Hierarchy: is the most important thing the most visible? One focal point per screen.
- Voice: copy matches the project's voice doc (or hand to `ui-copy`).
- Craft: alignment, spacing rhythm, states (empty, loading, error).
- Motion: when the change includes animation, gestures, or haptics, check it against [motion.md](motion.md).
Use [GUIDE.md](GUIDE.md) as the craft bar, plus [platforms/web.md](platforms/web.md) or [platforms/expo.md](platforms/expo.md) for the platform.

## 4. Report
Rank fixes by severity: regressions first, then broken, then wrong, then polish. Use the proposals table (`# | Proposed | Now | Why`, see `../SHARED.md`), one row per fix; put the severity in Why. For a fix that changes how something looks, show a quick mock or before/after crop before applying; other fixes apply directly. Apply what the user approves, re-render, and confirm.

## Occasional modes (ask once per session before first use)
- **Deep critique** — the critique heuristics in [GUIDE.md](GUIDE.md), applied flow by flow. Suggest for a major screen or flow.
- **Audit** — the performance and platform checks in `platforms/`. Suggest before a release.
- **Polish** — the polish checklist in [GUIDE.md](GUIDE.md). Suggest after fixes land, right before shipping.
- **Untested:** none of these modes have been compared head-to-head yet. Note in the report which mode found what, so the user can judge their value.
