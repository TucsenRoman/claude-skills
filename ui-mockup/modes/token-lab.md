# Token lab

Live controls for a design system's tokens, applied to a sample screen built from the project's real components, for tuning the system rather than one screen. Used by `ui-foundations`.

- **Controls per tier-2 token group:** colors (with light and dark edited separately, side by side), type scale (base size and ratio, or each step), spacing scale, radii, elevation.
- **The sample screen** uses the project's signature components (its card, its list rows, its buttons, its sheet), so changes are judged on the product, not a generic kit.
- **Guard rails shown, not enforced:** flag when a color pair becomes hard to read or two steps of the scale collapse into each other, as visible design problems.
- **A/B** against the current tokens.
- **Output:** the changed tokens as a diff in the project's token-source format, ready to paste into it (then regenerate the outputs).
- Built on the shared panel (see [playground.md](playground.md)): colors get the quick picks from the project's primitives, element select maps each part of the sample screen to its tokens, text editing doubles as a quick copy check.
- Serve it with `tools/serve.js` like the playground.
