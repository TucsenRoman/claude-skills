# ui-feel: web
Distilled from Emil Kowalski's animate skill (MIT).

| Need | Tool |
|---|---|
| Hover, press, color, class/attribute toggle | CSS transition |
| Entry on mount, no JS state | `@starting-style` (fallback: `data-mounted` set in `useEffect`) |
| Predetermined motion while the page is busy | CSS animation (off main thread) |
| Programmatic, no library | WAAPI `element.animate()` |
| Springs, layout, exit, gesture-driven | Motion |

- **Transitions, not keyframes**, for anything triggered rapidly (toasts, toggles): transitions retarget, keyframes restart from zero. Never `transition: all`; name the properties.
- Motion `x`/`y`/`scale` shorthands drop frames under load: use `animate={{ transform: "translateX(100px)" }}`. Never drive a child transform via a CSS variable on the parent (recalcs every child); set `element.style.transform` directly.
- Gate hover motion: `@media (hover: hover) and (pointer: fine)` (touch fires false hovers).
- `clip-path: inset()` is the sanctioned extra property: reveals (`inset(0 0 100% 0)` -> `inset(0 0 0 0)`), hold-to-confirm overlay (`inset(0 100% 0 0)`), tab color change (duplicate the tab list, clip the active-styled copy, 250ms ease-in-out).
- Scroll reveal: marketing only, fire once (`useInView({ once: true, margin: "-100px" })`).
- Web drag: pointer capture once dragging; ignore extra touch points (`if (isDragging) return`); dismiss if distance passes threshold OR `Math.abs(distance)/elapsedMs > 0.11`.

