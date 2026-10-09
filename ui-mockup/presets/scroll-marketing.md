# Preset: scroll-heavy marketing (GSAP)

Source: Taste gpt-taste (MIT), with the GSAP pin patterns from Taste design-taste-frontend (MIT). Condensed; the banned looks in ui-mockup's SKILL.md and its GUIDE.md still apply.

Cinematic, award-site pacing: wide editorial type, sections as chapters, scroll-driven pinning and reveals.

## Variety first
- Before building, deliberately pick (don't take the first option): 1 hero layout, 1 type stack (Satoshi, Cabinet Grotesk, Geist; never Inter), 3 components from the arsenal below, 2 scroll paradigms. Never ship the same combination twice in a row.

## Page shape (AIDA)
- Distinctive nav (minimal split nav, or a floating pill: solid, not glass), then Attention (hero), Interest (bento or typographic features), Desire (pinned or scrubbed scroll section), Action (large high-contrast CTA, clean footer).
- Section padding `py-32 md:py-48`: each section a distinct chapter.

## Hero
- H1 never more than 2-3 lines: ultra-wide container (`max-w-5xl`/`6xl`/`w-full`) and `clamp(3rem, 5vw, 5.5rem)`.
- Layouts: cinematic center (wide centered text, exactly two CTAs, full-bleed photo with a dark radial wash); artistic asymmetry (text left, a floating image overlapping from bottom right); editorial split (text left, image right, big negative space).
- No floating badges on the text, no pill tags under it, no stats in the hero.

## Components
- **Inline images in headings:** small pill-shaped photos inside the H1 (`inline-block w-24 h-10 rounded-full align-middle bg-cover`).
- **Horizontal accordion:** vertical slices that widen on hover to reveal image and text.
- **Marquee:** one per page, large type or real logos.
- **Testimonials:** overlapping portraits beside a short quote, subtle arrows.
- **Bento:** 3-5 cards, `grid-auto-flow: dense`, spans verified to leave no empty cell.

## Scroll paradigms
- **Pinned split:** section title pinned left (`pin: true`) while a gallery scrolls up on the right.
- **Image scale and fade:** images enter at `scale: 0.8` to 1.0; on exit darken and fade to `opacity: 0.2`.
- **Scrubbed text reveal:** paragraph words go from opacity 0.1 to 1 in sequence with scroll.
- **Card stack:** cards pin at `start: "top top"` and stack; each earlier card shrinks (~0.92) and dims as the next arrives.
- **Horizontal pan:** pin the wrapper at `"top top"`, scrub the track `x` by `scrollWidth - innerWidth`, `end: +=distance`, `scrub: 1`.
- Hover: images and cards `scale-105` over 700ms ease-out inside `overflow-hidden`.

## Imagery and ground
- Photos matched to the vibe, treated (`grayscale`, `mix-blend-luminosity`, `contrast-125`) so they don't read as stock.
- Grounds get depth from photography, grain, or dark overlays; no purple-blue mesh gradients.
- Wrap the page in `overflow-x-hidden` so off-screen animation never adds a horizontal scrollbar.

## Bans
- Meta labels ("SECTION 01", "QUESTION 05", "ABOUT US"); illegible button text; 4+ line headlines; empty bento cells.
