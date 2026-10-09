---
name: ui-mockup
description: Show UI to the user so they can judge it — PNG boards and close-ups rendered in a headless browser, live labs with a shared control panel for tuning values (presets for tokens, stress data, copy and motion), a before/after slider, phone frames with safe-area controls, shareable Artifacts, inline visuals, Figma, and files (HTML, SVG, PDF). Use whenever options, a design, a fix, or a mock needs to be seen rather than described; other skills (ui-direction, ui-review, ui-review-deep, ui-codify, ui-copy) call it to present their work.
---

# ui-mockup

The one place that decides how UI gets shown. Pick the format by what the user needs to do with it, build it, look at it yourself, then send it.

| The user needs to… | Format | How |
|---|---|---|
| Compare options, or see a fix before and after | PNG board (default) | [modes/board.md](modes/board.md) |
| Judge a small detail (an icon, an outline, a number) | 2x close-up | [modes/board.md](modes/board.md) |
| Tune anything live: find the right numbers, tune tokens, break it with extreme data, edit wording in place | Lab (custom controls, or the tokens, stress data and copy presets) | [modes/lab.md](modes/lab.md) |
| Judge or tune how something moves (timing, easing, springs, gestures) | Lab with the motion add-on | [modes/motion.md](modes/motion.md) |
| Spot what changed between two versions | Before/after slider | [modes/compare.md](modes/compare.md) |
| Check a phone layout: safe areas, notches, exact fidelity, or the app can't run | Phone frame | [modes/phone-frame.md](modes/phone-frame.md) |
| Share it, come back to it, or view it on a phone | Artifact | [modes/share.md](modes/share.md) |
| Understand a flow or structure, not a finished look | Inline visual | [modes/share.md](modes/share.md) |
| Have it in Figma, or as a file to keep | Figma, HTML, SVG, PDF | [modes/share.md](modes/share.md) |

Modes combine: a lab inside a phone frame, A/B on any lab. See [MIXING.md](MIXING.md).

## Rules
- Build mocks from the project's real tokens, fonts, and content (load `ui-foundations`), starting from the latest approved mock of that screen when there is one.
- Light and dark both, unless the project has one theme.
- Look at every render before sending it. Retake anything that caught a loading state, an overlay, or the wrong screen.
- Send results as they finish; don't hold a finished option back waiting for a slower one.
- Ask for a pick, plus anything to carry over from the options that lost.
