---
name: accessibility-sweep
description: Opt-in accessibility pass on a screen or app — contrast, touch targets, screen-reader labels, focus order, reduced motion, text scaling. Use only when the user asks for an accessibility or a11y check, before a store submission that requires one, or when they ask whether something is accessible. Never runs as part of other UI stages.
---

# accessibility-sweep

Accessibility lives here and only here. The other `ui-` stages skip it; this runs when the user asks.

## Check
Render the screen (light and dark) the way `ui-review` does, then check:
- **Contrast:** text against its background (AA: 4.5:1 body, 3:1 large text and meaningful icons). Use the project's contrast script if it has one.
- **Touch targets:** at least 44pt (iOS) / 48dp (Android); web at least 24px with spacing.
- **Labels:** every icon-only button and image that carries meaning has a screen-reader name; decorative ones are hidden.
- **Reading order:** web focus order and visible focus; native screen-reader order and grouping.
- **Motion:** movement respects reduced motion (keep fades, drop slides and springs).
- **Text scaling:** layout survives the largest system text size without clipping.

## Report
Use the proposals table (`# | Proposed | Now | Why`, see `../SHARED.md`), one row per issue, worst first, then `Reply like "1 y, 2 n"`. Apply what's approved, re-render, confirm in a line.
