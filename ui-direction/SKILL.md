---
name: ui-direction
description: Brainstorm what a screen, page, or component should be before anything is drawn or built — a conversation about directions, not mockups. Use when the user wants to design, redesign, rethink, restyle, or explore a screen or page; wants ideas or directions; wants a landing or marketing page; or wants a new look for an app. Inventories the current screen first so redesigns never lose features. When it's time to see the ideas, it hands them to ui-mockup.
---

# ui-direction

A brainstorm, in words. Work out what to make with the user: what's wrong today, what must survive, and which directions are worth seeing. Never mock or build anything here. When ideas need to be seen, hand them to `ui-mockup`. A small addition inside an existing screen skips this stage and goes to `ui-build`.

## 1. Foundations
Make sure `ui-foundations` has loaded this project's design source (tokens, fonts, signature list). If the project has none and this is new work, offer to start one first.

## 2. Classify the job (say which, in one line)
- **Addition inside an existing screen**: no direction needed. Hand to `ui-build`.
- **New screen inside an existing system**: directions vary structure and hierarchy; the visual system stays fixed.
- **Redesign of an existing screen**: inventory first (step 3), then directions.
- **Marketing page** (landing, launch, portfolio, pricing): read the brief with [GUIDE.md](GUIDE.md) section 1.
- **New identity / full visual redo**: directions vary the visual world too. Features still come from the inventory.

## 3. Inventory (any redesign; required)
1. See the current screen running. Web: run the project's preview and screenshot it. Expo: emulator or Expo Go screenshot (`adb exec-out screencap -p > shot.png`), or the project's documented method. Don't work from code alone.
2. List every feature, state, and action on it, plus every signature element from the foundations (custom nav, menus, sheets, headers, feedback, copy patterns).
3. Show the list. The user marks each **keep / change / cut**. The default is keep. Write the result to a scratch `inventory.md`; `ui-mockup`, `ui-build` and `ui-review` use it.

## 4. Brief
Ask at most three questions together, only where the answer changes the work: what's wrong with it today, what must get better, and references they like. Skip what's already clear. If the project follows a benchmark product, have `ui-mockup` show that product's matching real screens before brainstorming. For marketing pages, state the read and set the three dials (variance, motion, density) from [GUIDE.md](GUIDE.md) section 1.

**Logo or app icon:** before any mark is drawn, have `ui-mockup` show 10 to 20 real icons as a numbered board, and have the user pick. In the same message, ask the finish once (flat, Apple-dimensional, realistic object), pointing at icons from the board, and hold it for every round after. Draw only from the picks, in that finish. Lit marks drawn in SVG are fine. If the user says a round "looks great" but rejects it, ask whether they mean the idea or the rendering.

## 5. Brainstorm directions
- 2 to 4 directions, each on a named axis (layout, hierarchy, density, interaction model, personality), in one line each: the idea and what changes. Details (what stays, references) only when asked. Three tints of one idea are not directions.
- Every direction honors the keep-list. Signature components stay themselves.
- A look the user names can be one of `ui-mockup`'s aesthetics (minimalist, high-end, brutalist, scroll-heavy marketing); name it in the direction.
- End every list of directions with "Mock these?" as the default next step. Merging, dropping or sharpening happens if the user asks for it instead.

## 6. Go visual (the default next step)
On a yes (or "show me", "mock it"), call `ui-mockup` with arguments:
- the screen, and explore (rough, the default) or refine (the pick, full fidelity);
- each direction: name, axis, its line from step 5 plus anything the talk added, any aesthetic;
- the inventory path (keep-list), and the dials for marketing pages.

`ui-mockup` builds and shows them and asks for the pick. Come back here if the pick reopens the brainstorm.

## 7. Hand off
Write a short direction note: the chosen direction, why, what carried over from the others, and the inventory. Recommend `ui-build`.

## Occasional modes (ask once per session before first use)
- **Something unexpected** — [GUIDE.md](GUIDE.md) section 2 (concept research, a random draw among candidates, a direction contract). Only when the user asks for a bold or surprising identity. The contract goes to `ui-mockup` as the direction.
