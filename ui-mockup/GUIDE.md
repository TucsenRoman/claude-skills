# ui-mockup guide: building mocks with taste

Sources: Taste skills (design-taste-frontend, gpt-taste; MIT), Emil Kowalski's prototype skill (MIT). Condensed and edited; the banned looks in SKILL.md override anything here. The dials (variance, motion, density) come from `ui-direction` in the arguments; when they're missing, read them off the brief yourself.

## 1. Layout
- **Off-center by default.** Above variance 4, avoid the centered hero: split, left text with right asset, asymmetric whitespace, or a pinned structure. Centered is fine for manifesto or launch pages where the message is the design.
- **Hero fits the first viewport.**
  - Headline max 2 lines on desktop (3 at most), subtext max 20 words, CTAs visible without scrolling.
  - A 4-line headline is a font-size error: widen the container (`max-w-5xl`/`6xl`) and size down (`clamp(3rem, 5vw, 5.5rem)`).
  - Plan type size and image size together; `text-6xl/7xl` only for 3-5 word headlines. Top padding max `pt-24`.
- **Hero holds at most 4 text elements:** one optional eyebrow, headline, subtext, 1 primary + 1 secondary CTA. Logo walls, taglines under CTAs, pricing teasers, stats and avatar rows go in sections below.
- **Nav:** one line on desktop, 64-72px tall (80 max).
- **No layout family twice.** Each section layout (3-up cards, split text/image, full-width quote) appears once; 8 sections need at least 4 families. Max 2 image/text zigzags in a row.
- **No 3 equal feature cards.** Use an asymmetric grid, 2-column, pinned scroll, or horizontal scroll.
- **Bento:**
  - Exactly as many cells as content items (3 items, 3 cells); no empty corners (`grid-auto-flow: dense`, check that spans interlock).
  - 3-5 intentional cards beat 8 busy ones.
  - At least 2-3 cells carry an image, pattern or tint, not text on white.
- **Section headers:** one message. No big headline left with a small explainer floating right unless the right column carries a real visual.
- **Cards only when elevation means hierarchy;** otherwise group with space or a single divider. Shadows tinted to the background hue, never black on light.
- **One corner system per page:** all sharp, all soft (12-16px), or pill for interactives with a stated rule followed everywhere.
- **Long lists (>5 items) change component,** not length: grouped columns, card per item, tabs, scroll-snap pills, or one marquee. Never a 10-row table with a hairline under every row; spec sheets become 3-4 big display tiles plus a "full specs" disclosure.
- **Mobile collapse is explicit** per section: asymmetric layouts go single column below 768px; `min-h-[100dvh]`, never `h-screen`.

## 2. Type
- Sans display by default: Geist, Satoshi, Cabinet Grotesk, ABC Diatype, Söhne Breit, PP Neue Montreal, GT Walsheim. Inter only when the brief asks for neutral or is public-sector.
- "Creative, premium, editorial" is not a reason for a serif. A serif needs a named brand serif or a genuinely editorial/heritage subject with a stated reason for that specific face. Never Fraunces or Instrument Serif as a default.
- Faces that signal "stopped looking" on marketing pages: Fraunces, Playfair Display, Cormorant, Lora, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, DM Sans, Outfit, Plus Jakarta Sans, Instrument Sans. Using one needs a reason no other face satisfies; a subject association (books want serif, tech wants mono) is not that reason.
- Emphasis inside a headline: italic or bold of the same family, never a swapped-in serif word. Italic display with descenders needs `leading-[1.1]` and a little bottom padding.
- Headlines `tracking-tighter leading-none`; body `leading-relaxed`, max 65ch. Control hierarchy with weight and color, not only raw scale.

## 3. Color
- Pick a strategy before colors: **Restrained** (tinted neutrals + one accent), **Committed** (one saturated color covers 30-60% of the surface), **Full palette** (3-4 named roles), **Drenched** (the surface is the color). Marketing pages have permission for the bold ones; when they commit, color owns whole regions rather than scattered accents.
- Light or dark is never a default: write one sentence of physical scene (who, where, what light) and let it decide. One theme per page; sections don't invert unless one deliberate theme switch is the device.
- One accent, locked for the whole page, saturation under 80%. One gray temperature. No pure #000 or #fff.
- Banned defaults:
  - AI purple/blue glows and gradients.
  - Near-black with one neon accent and glowing edges.
  - For premium-consumer briefs: cream/bone grounds with brass/clay/oxblood accents and espresso text (e.g. `#f5f1ea`, `#b08947`, `#1a1714`).
- Rotate instead, never the same family twice running:
  - Cold luxury (silver, chrome, smoke); forest (deep green, bone, amber); black and tan.
  - Cobalt plus one neutral; terracotta and slate; olive and brick.
  - Monochrome plus one saturated pop.

## 4. Imagery and assets
- Marketing pages are visual products: even a minimal page needs 2-3 real images. A text-plus-gradient-blob hero is a placeholder, not a hero.
- Source order: image-generation tool; then real photos (`picsum.photos/seed/<descriptive-seed>/<w>/<h>` as placeholder); then labeled empty slots and a list for the user.
- Treat stock so it stops looking like stock: grayscale, luminosity blend, raised contrast, matched to the vibe. One decisive photo of the subject's physical object beats five generic ones.
- No div-built fake screenshots, dashboards or terminals. Show the real UI, a generated image, a real mini component, or skip the preview.
- Logo walls: real SVG logos only, no category label under each, placed under the hero. Invented brands get a simple monogram mark, not a styled text name.
- No hand-drawn decorative SVG illustrations or hand-rolled icon paths; one icon family, one stroke width (Phosphor, Hugeicons, Radix, Tabler; Lucide only if already in the project).
- Author the content: realistic names, entries, prices you can stand behind. Demonstration data is design material (label it as sample); commercial claims are never invented.

## 5. Motion for marketing
- Every animation answers "what does this communicate": hierarchy, story sequence, feedback, or state change. "Looks cool" is not an answer. If motion can't be built properly, drop to a clean static page rather than half-built ScrollTriggers.
- Motion claimed is motion shown: above motion 4, the hero enters, key sections reveal, CTAs respond to press.
- Entry reveal: `opacity 0 + translateY(12-24px)` to rest over ~600ms, `cubic-bezier(0.16, 1, 0.3, 1)`, staggered ~60-100ms per item.
- Max one marquee per page. Pin and scrub patterns must pin at `start: "top top"`: a sticky stack pins every card but the last and shrinks the previous card as the next arrives; a horizontal pan pins the wrapper and scrubs the track by `scrollWidth - innerWidth`.
- Animate transform and opacity only; never listen to window scroll (use ScrollTrigger, IntersectionObserver, or CSS scroll timelines). Grain overlays on a fixed, pointer-events-none layer only.
- No custom cursors, no infinite loops on informational cards, no gradient text on large headers, no outer glows.

## 6. Copy and anti-patterns (marketing)
- Section shape: headline of 8 words or fewer, sub-paragraph of 25 words or fewer, one visual or one CTA.
- One label per CTA intent across the page ("Get started" everywhere, not also "Try free"); primary CTA 1-3 words, never wraps on desktop; button text must stay visibly legible on its fill.
- Quotes max 3 lines, attributed with name and role.
- No em-dashes or en-dash separators anywhere visible; use periods, commas, colons, hyphens.
- Banned tells:
  - Eyebrows above every section: max 1 per 3 sections, hero counts. Usually the headline alone is enough.
  - Section-number labels (`001 · Capabilities`, `01 / 4` on tiles, "Step 1 / 2 / 3"). The step's verb is the label.
  - Version or BETA stamps in the hero; version footers on marketing pages.
  - Middle-dot chains (max 1 per line); decorative status dots (only for real live state).
  - Pills or captions laid over photos; fake photo credits ("Plate 03 · House archive").
  - Decorative crosshairs or hairline grids; a mono-caps word strip along the hero bottom; rotated vertical text.
  - Locale, time or weather strips; scroll cues of any kind.
  - Micro-meta sentences under headings; poetic labels ("Field notes", "Quietly trusted by").
  - Filled-track progress bars as comparisons.
  - Filler verbs (elevate, seamless, unleash, next-gen); placeholder names (John Doe, Acme, Nexus); fake-precise numbers.
- Re-read every visible string before calling it done; replace cute-but-wrong lines with plain ones.
- Redesigns: modernize in this order and stop when the brief is met: type, spacing, color, motion, hero recomposition, full block replacement. Never silently change routes, nav labels, form fields, logo, or legal copy.

## 7. Variants in code (prototype method)
- One piece per run. If the ask spans a screen, pick the highest-leverage piece and offer the rest as follow-ups. Restate the brief in one sentence.
- Recon first: stack, tokens, personality (it bounds how far the boldest variant goes), and where the piece sits.
- Default 3 variants, max 5. Each gets a direction name (Quiet, Editorial, Dense; never A/B/C) and a stated axis. If two differ only in accent or copy, they are one; replace it. If two converge during the build, cut one and say so.
- Every variant fully works with real content, and meets the motion craft bar: `ease-out` on entrances (never `ease-in`), UI motion under 300ms, correct `transform-origin`, transform/opacity only.
- Isolated surface (`/prototypes/<slug>` route or one self-contained HTML file); production code never imports it.
- Show one variant at a time, full size, in realistic context (a toast over a page, a card among siblings). Switching is instant, no transition.
- The picker is fixed harness chrome, never styled with project tokens:
  - Dark pill fixed bottom-center: `rgba(10,10,10,.82)`, `blur(12px)`, radius 999px, 28px items, 13px system font.
  - Sliding highlight on the active item (250ms, `cubic-bezier(0.23,1,0.32,1)`); moves to the top when the variant lives at the bottom (toast, sheet, dock).
  - Keys `1-N` and arrows switch, `R` replays entrances (replay button only if something animates), `?v=N` persists the choice across reload.
- Present a table: variant, axis, when it wins, its cost. Don't pre-pick; if asked, answer from product personality and frequency of use.
- On a pick: integrate following project conventions, then delete the prototype surface. "Riff <variant>" runs a new round diverging around it.
