# Web checks
Distilled from Impeccable's audit (Apache-2.0). Technical checks for a release pass.

## Performance
- No layout reads/writes interleaved in loops (layout thrash).
- Blur, filter and shadow effects bounded.
- `will-change` only as a targeted hint on a known expensive animation, never broad or left on at rest.
- Images lazy-loaded and sized; no unused imports or dependencies; no needless re-renders.

## Theming
- No hard-coded colors; right token type in the right place.
- Dark mode complete; every value updates on theme switch.

## Responsive
- No fixed widths that break narrow viewports; no horizontal scroll.
- Breakpoints cover mobile, intermediate and wide.
- Touch gestures actually work: sliders, drag surfaces and scroll strips need `touch-action` on pointer-event drag surfaces, no mouse-only handlers, and drag state cleared on cancel, lost capture or blur. Say what produced the evidence (emulated viewport, synthesized touch, physical device) and what stayed untested.

## Implementation integrity
- Repeated shortcuts or decorative patterns that drift from the design system, or structure interchangeable with an unrelated product, are findings; verify each in context and drop false positives.
