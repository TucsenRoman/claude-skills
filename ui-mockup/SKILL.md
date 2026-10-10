---
name: ui-mockup
description: Build and show UI so the user can judge it — design options built from directions, PNG boards and close-ups rendered in a headless browser, live labs with a shared control panel for tuning values (presets for tokens, stress data, copy and motion), a before/after slider, phone frames with safe-area controls, shareable Artifacts, inline visuals, Figma, and files (HTML, SVG, PDF). Use whenever options, a design, a fix, or a mock needs to be seen rather than described; other skills (ui-direction, ui-review, ui-review-deep, ui-codify, ui-copy) call it to present their work.
---

# ui-mockup

The one place that builds mocks and decides how UI gets shown. Pick the format by what the user needs to do with it, build it, look at it yourself, then send it.

| The user needs to… | Format | How |
|---|---|---|
| Compare options, or see a fix before and after | PNG board (default) | [modes/board.md](modes/board.md) |
| Judge a small detail (an icon, an outline, a number) | 2x close-up | [modes/board.md](modes/board.md) |
| Tune anything live: find the right numbers, tune tokens or motion, break it with extreme data, edit wording in place | Lab (custom controls, or the tokens, stress data, copy and motion presets) | [modes/lab.md](modes/lab.md) |
| Spot what changed between two versions | Before/after slider | [modes/compare.md](modes/compare.md) |
| Check a phone layout: safe areas, notches, exact fidelity, or the app can't run | Phone frame | [modes/phone-frame.md](modes/phone-frame.md) |
| Share it, come back to it, or view it on a phone | Artifact | [modes/share.md](modes/share.md) |
| Understand a flow or structure, not a finished look | Inline visual | [modes/share.md](modes/share.md) |
| Have it in Figma, or as a file to keep | Figma, HTML, SVG, PDF | [modes/share.md](modes/share.md) |

Modes combine: a lab inside a phone frame, A/B on any lab. See [MIXING.md](MIXING.md).

## Building options from directions
`ui-direction` calls this with directions in words (name, axis, a few lines, any aesthetic), the inventory path, and explore or refine. Build them as mocks; options stay on boards for viewing.
- **Explore (default):** 2 to 3 rough options. Builders run on a faster model (`model: "sonnet"` on the Agent call) and are told: one pass, no polishing, do NOT screenshot or verify your own work, report in under 60 words. About 2 minutes per option; the job is to show a direction, not finish it.
- **Refine:** only the option the user picked. Full fidelity, strongest model, its own render checks.
- **One check, done once.** Builders never self-verify in Explore. You render everything and run the keep-list check yourself, once.
- **Variants of one thing go to one agent.** When options differ along one dimension (saturation, density, a color, a component state), give a single agent the shared template and have it emit every variant. One agent per option only when options differ in layout or concept.
- **Mocks first, real code only for the pick.** Even inside a locked system, explore as quick HTML mocks built from the project's real tokens (resolve them to plain CSS variables first). Real-code variants are slower, need a device, and hot-reload can wedge mid-build. Only when a mock can't show the difference (real data, real gestures), build variants in code: [GUIDE.md](GUIDE.md) section 7.
- **Every option honors the keep-list.** Signature components appear as themselves, not generic stand-ins. Real content from the product, never lorem ipsum.
- **Taste:** marketing pages follow [GUIDE.md](GUIDE.md) (layout, type, color, imagery, motion, copy). A named look uses its aesthetic: [minimalist](aesthetics/minimalist.md), [high-end](aesthetics/high-end.md), [brutalist](aesthetics/brutalist.md), [scroll-heavy marketing](aesthetics/scroll-marketing.md). App UI inside an established system: plain judgment plus the foundations (it beat both style guides in testing). The project's foundations always win.
- **Banned looks** (the user calls these "AI sloppy"; avoid unless they ask): tiny monospaced small-caps labels with numbered rows and thin-bordered tiles everywhere ("terminal chic" dashboards); cream background + soft serif with color-highlighted numbers, sparkle-icon suggestion chips, and an "insight" sentence atop every card; purple-blue gradients; glassmorphism everywhere. Brief every builder with these bans.
- **Send to the lab:** when the user names an option ("send B to the lab"), open it in a [lab](modes/lab.md).

## Rules
- Build mocks from the project's real tokens, fonts, and content (load `ui-foundations`), starting from the latest approved mock of that screen when there is one.
- Light and dark both, unless the project has one theme.
- Look at every render before sending it. Retake anything that caught a loading state, an overlay, or the wrong screen.
- Send results as they finish; don't hold a finished option back waiting for a slower one.
- Ask for a pick, plus anything to carry over from the options that lost. For options from `ui-direction`, hand the pick back to it for the direction note.
