# Building for the web

Distilled from: adapt, optimize (Impeccable, Apache-2.0); mobile-native (Emil Kowalski's skills, MIT); redesign-existing-projects (Taste, MIT).

## Responsive CSS
- Mobile-first: base styles for narrow, layer up with `min-width` queries.
- Breakpoints come from where the content breaks, not device sizes. Three usually suffice (640, 768, 1024px). Use `clamp()` for fluid values between them.
- Container queries when a component lives in several contexts.
- CSS Grid for multi-column structure instead of flexbox percentage math. Relative units (`%`, `rem`, `max-width`) over hardcoded pixel widths.
- `display: none` still downloads; don't hide heavy content as a responsive strategy.
- Tables become cards on phones (`display: block` plus `data-label`); `<details>/<summary>` for collapsible sections; navigation goes drawer -> compact horizontal -> full with labels.
- Semantic structure: `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`, not div soup.

## Input capability, not screen size
- Gate hover styles: `@media (hover: hover) and (pointer: fine)`. Tailwind v4 `hover:` already compiles to `(hover: hover)`; in v3 set `future.hoverOnlyWhenSupported`.
- Never make hover the only way to reach something. Give every tappable element an `:active` state.
- `(pointer: coarse)` for touch-specific sizing. Never branch on user agent.

## Phone web (feel installed, not embedded)
| Symptom | Fix |
|---|---|
| Hover stuck after tap | Hover only inside the capability query above |
| Gray/blue flash on tap | `html { -webkit-tap-highlight-color: transparent }`, then add `:active` states |
| Wrong height, bottom bar under the URL bar | `100dvh` for app shells, drawers, bottom-pinned UI; `min-height: 100svh` for heroes (no shift mid-scroll); never `100vh` |
| Page zooms into inputs | Inputs at 16px minimum (`@media (pointer: coarse)` if desktop wants smaller); don't use `maximum-scale=1` |
| Tap feels laggy | `touch-action: manipulation` on controls; feedback on `:active` / `pointerdown`, not `click`; 100-160ms ease-out |
| Pull-to-refresh hijacks an app | `overscroll-behavior: none` on `html, body`; `contain` on inner scrollers. Never `touchmove` + `preventDefault()` |
| Content stops at the notch | `viewport-fit=cover` meta plus `env(safe-area-inset-*)` on fixed headers, tab bars, toasts, sheets; `max(1rem, env(safe-area-inset-bottom))` or `env(..., 0px)` in calc. Without the meta tag `env()` is 0 |
| Long-press selects button text | `user-select: none; -webkit-user-select: none; -webkit-touch-callout: none` on controls only, never `body` |
| Carousel drags the page | `touch-action: pan-y` on a horizontal gesture surface, `pan-x` on a vertical one, `none` only if it owns every axis. Native scroll carousels: `scroll-snap-type: x mandatory` + `scroll-snap-align: start` |
| Status bar wrong color | `theme-color` meta per `prefers-color-scheme`, matching the top of the page (header, not brand). Next.js: `viewport` export `themeColor`. Class-based themes update it in JS |

Baseline for a phone-facing app: viewport `width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content` (keyboard resizes layout on Android Chrome); per-scheme `theme-color`; `-webkit-text-size-adjust: 100%`; the tap-highlight, overscroll, 16px input, and control `touch-action`/`user-select` rules above. Drop `overscroll-behavior: none` on documents where pull-to-refresh is welcome.

Inputs: `inputmode="numeric"` for codes, `"decimal"` for amounts; `type="email"`/`"tel"`; `autocapitalize="none"` and `autocorrect="off"` for usernames and codes; `enterkeyhint="send"`/`"search"`/`"done"`.

None of these reproduce in device emulation. Run the dev server on `0.0.0.0`, open it by LAN IP on a real phone (Safari Develop menu, `chrome://inspect`), test with the keyboard open, once in landscape, and as an installed PWA if that's a target. Say which fixes were verified from code only.

## Web performance
- Images: WebP/AVIF; `srcset` with `w` descriptors plus `sizes`; `<picture>` only for different crops; `loading="lazy"` below the fold only; set dimensions or `aspect-ratio` to avoid CLS.
- JS: route- and component-level code splitting; dynamic import (`lazy()`) for heavy components such as charts; remove unused dependencies and third-party scripts.
- CSS: remove unused CSS; `contain` on independent regions; `content-visibility: auto` for long off-screen sections.
- Fonts: `font-display: swap` (or `optional`), subset with `unicode-range`, preload critical fonts, load only used weights.
- Rendering: batch DOM reads before writes (no read-write-read thrash); flatter, smaller DOM; `requestAnimationFrame` for JS animation; `IntersectionObserver` instead of scroll handlers for visibility.
- LCP: optimize the hero image, inline critical CSS, preload key resources, server-render. INP: break up long tasks, defer non-critical JS, move heavy work to workers. CLS: reserve space, never inject above existing content.
- Network: compression, HTTP caching headers, CDN for static assets, prefetch likely next pages, SVG sprites for icons.
- Test on a low-end Android with throttled network, not just a flagship iPhone.

## Smaller web rules
- `scroll-behavior: smooth` for anchor jumps.
- Arbitrary `z-index: 9999` -> a z-index scale in the theme.
- Pages have `<title>`, description, and `og:image`.
