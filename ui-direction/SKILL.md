---
name: ui-direction
description: Decide what a screen, page, or component should look like before building it, and present options to choose from. Use when the user wants to design, redesign, rethink, restyle, or explore a screen or page; asks for options, variants, mockups, comps, or concepts; wants a landing or marketing page; or wants a new look for an app. Inventories the current screen first so redesigns never lose features. Outputs a PNG board, a playground with dials, a phone mockup, live code variants, an Artifact, or Figma frames.
---

# ui-direction

Choose the look or structure before building. Never skip straight to code on a new screen or redesign; a small addition inside an existing screen skips this stage and goes to `ui-build`.

## 1. Foundations
Make sure `ui-foundations` has loaded this project's design source (tokens, fonts, signature list). If the project has none and this is new work, offer to start one first.

## 2. Classify the job (say which, in one line)
- **Addition inside an existing screen**: no direction needed. Hand to `ui-build`.
- **New screen inside an existing system**: options vary structure and hierarchy; the visual system stays fixed.
- **Redesign of an existing screen**: inventory first (step 3), then options.
- **Marketing page** (landing, launch, portfolio, pricing): propose the Taste mode.
- **New identity / full visual redo**: options vary the visual world too. Features still come from the inventory.

## 3. Inventory (any redesign; required)
1. See the current screen running. Web: run the project's preview and screenshot it. Expo: emulator or Expo Go screenshot (`adb exec-out screencap -p > shot.png`), or the project's documented method. Don't work from code alone.
2. List every feature, state, and action on it, plus every signature element from the foundations (custom nav, menus, sheets, headers, feedback, copy patterns).
3. Show the list. The user marks each **keep / change / cut**. The default is keep. Write the result to a scratch `inventory.md`; `ui-build` and `ui-review` use it.

## 4. Brief
Ask at most three questions together, only where the answer changes the work: what's wrong with it today, what must get better, and references they like. Skip what's already clear.

## 5. Make options
- 2 to 4 options, each on a named axis (layout, hierarchy, density, interaction model, personality). Say each axis in a phrase. Three tints of one idea are not options.
- Every option uses the project's tokens and honors the keep-list. Signature components appear as themselves, not as generic stand-ins.
- Use real content from the product, never lorem ipsum.
- **App UI**: build options in the real codebase with real components, behind a switcher (prototype mode). Use HTML mocks only for early concepts or a new identity, and resolve tokens to plain CSS variables first (see `ui-foundations`).
- **Marketing pages**: self-contained HTML is fine.
- **Banned looks** (the user calls these "AI sloppy"; avoid unless they ask): tiny monospaced small-caps labels with numbered rows and thin-bordered tiles everywhere ("terminal chic" dashboards); cream background + soft serif with color-highlighted numbers, sparkle-icon suggestion chips, and an "insight" sentence atop every card; purple-blue gradients; glassmorphism everywhere. Brief option builders with these bans.
- Default builder is your own judgment plus the foundations. Tested: on app UI inside an established system, plain judgment with accurate foundations beat both style skills.

### Speed (the user found full-polish rounds far too slow)
- **Two speeds. Explore is the default.**
  - **Explore**: 2 to 3 rough options. Builders run on a faster model (`model: "sonnet"` on the Agent call) and are told: one pass, no polishing, do NOT screenshot or verify your own work, report in under 60 words. Target about 2 minutes per option. Rough is fine; the job is to show a direction, not finish it.
  - **Refine**: only the option the user picked. Full fidelity, strongest model, its own render checks. Use it when the user asks for refinement or a direction is about to be locked.
- **One check, done once.** Builders never self-verify in Explore. You render everything with `board.sh` and run the keep-list check yourself, once.
- **Show options as they finish.** Launch builders in the background; when each one lands, render it right away and send it as a single-option board. Don't wait for the slowest builder. Send a combined board at the end only if comparing needs it.
- **Variants of one thing go to one agent.** When options differ along one dimension (saturation, density, a color, a component state), give a single agent the shared template and have it emit every variant. Use one agent per option only when options differ in layout or concept.
- **Explore in mocks, build only the pick.** Even inside a locked system, explore options as quick HTML mocks built from the project's real tokens (start from the latest approved mock of that screen), shown on a board. They take about a minute to review; real-code variants are slower to build, need a device, and hot-reload can wedge mid-build. Build in the real codebase only the option the user picked. (The user asked for this after trying both.)

## 6. Present (recommend one; the user can override)
- **PNG board** (default for comparing): `tools/board.sh --out <scratch>/board --width 390|1440 --themes light,dark A=... B=...`, then send `board-screen.png` (and `board-full.png`) to the user. Works for HTML files and running dev-server URLs. For Expo screens, screenshot each variant from the emulator and lay them out with the same tool (wrap each PNG in a tiny HTML page).
- **Close-ups for small details**: when options differ in something small (icon size, an outline, a number's style), a full board is unreadable. Crop to the changed area and render it at 2x (`--force-device-scale-factor=2`), light mode first, since that's usually where contrast problems live. Make sure the crop actually lands on the changed area before sending it.
- **Playground** (for tuning numbers): when the user is hunting for values (sizes, overlaps, thresholds, counts), give them one live mock with a dial per value instead of more boards: a slider, a live readout, and an (i) button with a one-line explanation of what it does. Include a test-data dial (for example "N items on every row") so they can reach worst cases. Show a settings box they can paste back, and make their current numbers the defaults when they pick. Rebuild the model when their answers reveal a better rule (for example "fit to width with a minimum" instead of a fixed scale).
- **Serving mocks**: the user's viewer blocks scripts in files opened from disk, so a scripted mock (playground, anything with JS) must be served over HTTP: a tiny local node server in the scratch folder, opened in the browser pane. Make mocks self-contained (inline the tokens, no required CDN script; guard optional ones). When a mock needs real data the browser can't read cross-origin (images, APIs), add a same-origin proxy route to that server so the mock shows the real behavior, not a stand-in.
- Others, as occasional modes: phone mockup, Artifact, Figma (below).
Ask for a pick plus anything to carry over from the losing options.

## 7. Hand off
Write a short direction note: the chosen option, why, what carried over, and the inventory. Recommend `ui-build`.

## Occasional modes (ask once per session before first use)
- **Marketing pages** — the taste rules in [GUIDE.md](GUIDE.md) (sections 1 to 7). Won a blind test on a landing page. Suggest for any landing, launch, portfolio, or pricing page. Project foundations still win.
- **Aesthetic presets** — when the user names a look: [minimalist](presets/minimalist.md), [high-end](presets/high-end.md), [brutalist](presets/brutalist.md), [scroll-heavy marketing](presets/scroll-marketing.md).
- **Variants in code** — section 8 of [GUIDE.md](GUIDE.md): options behind a switcher in the real codebase. Only when a mock can't show the difference (real data, real gestures); HTML mocks stay the default.
- **Phone mockup** — `ui-mockup`: a standalone HTML phone with safe-area sliders and device presets. Suggest when safe areas, notches, or exact layout fidelity matter, or when the app can't run.
- **Something unexpected** — section 9 of [GUIDE.md](GUIDE.md) (concept research, a random draw among candidates, a direction contract). Only when the user asks for a bold or surprising identity.
- **Artifact** — publish the options or the chosen direction as a shareable claude.ai page for teammates.
- **Figma** — `figma:figma-generate-design` when the user wants the result in Figma.
