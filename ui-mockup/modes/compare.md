# Before/after slider

Old and new versions of the same screen stacked, with a divider the user drags across to sweep between them. Small changes are easier to spot in a sweep than in two side-by-side images. Used by `ui-review`.

- Render both at the same size, theme, and data; they must line up pixel for pixel or the sweep shows noise.
- A switch for light and dark, and one to flip instantly (tap to toggle) for changes too small to sweep.
- Optional: highlight changed regions (a pixel diff overlay) for reviews with many small changes.
- For a static handoff, fall back to a PNG board with Now and Proposed columns.
