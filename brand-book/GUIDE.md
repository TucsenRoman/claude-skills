# brand-book guide

Learned from building Jotful's brand book (2026-10-10). The user's reaction to the old brand doc: "I should see the brand, not read it."

## The page
One long scroll. Every section has one big visual and at most one sentence. If something can be shown, don't write it.

| Section | Show | Not |
|---|---|---|
| Opening | The logo large, the wordmark huge, and the one-line brand promise | A title and an intro paragraph |
| Logo | The logo on light, on dark, as the app icon, then a row at real pixel sizes, smallest allowed first | A table of variants |
| Logo rules | The real logo, mini, broken each way the rules forbid (stretched, rotated, mirrored, shadowed, recolored, faded), each with a small ✕ | Bullet points of don'ts |
| Wordmark | The wordmark large, with its colors named in order beneath it | A spec sentence |
| Color | Big swatches sized by how much of a screen each color gets, plus a usage bar. Tap a swatch to copy its value | Equal tiles in a table |
| Type | A big specimen in each face, set in a real product line, then the app's actual size steps, each in a real string | "Aa" grids and a weights table |
| Product | A phone mock of the real main screen beside callouts for the signature features (the keep-list), plus the empty state | Screenshots with arrows |
| Voice | "Says / not this" pairs: the product's real lines next to crossed-out generic app copy. Then the feel words as pills, each with its opposite struck through | Adjective lists |
| Ending | A mood moment from the brand's own world (Jotful: the moth on dark, drawn to a lamp glow) with mood words for future imagery | A credits footer |

## Rules
- **Real everything.** Logo paths inlined from the project's SVGs, exact color values, the project's fonts, copy taken from the code. Never invent product copy for the product section; the voice section may write the generic "not this" lines.
- **Match the app, detail by detail.** Before drawing a component, read its source: padding, radius, font size, which state shows at rest, what animates. Don't animate what the app keeps still. Don't add controls it doesn't have.
- **Gradient text** (`background-clip: text`) spans the element's box, not the letters. Make it `inline-block`. To copy an SVG gradient set in user space, put the color stops in `em`, scaled from the app's numbers (Jotful: a 150px gradient on 34px text becomes stops at 0, 2.12em and 4.41em).
- **Icons:** draw the app's real icons as inline SVG. Text stand-ins like "···" break when the encoding is off.
- **Light/dark toggle:** a round button fixed to the bottom-right corner, remembered per viewer. It starts from the viewer's system theme. Brand swatches never flip; only the page's surfaces, text, phone mock and theme-aware logo do. If the product is light only, label the dark values as a proposal on the page.
- **Hero logo:** use the app-avatar variant of the mark (Jotful: the loop moth), with its body and loop following the theme.
- **One bold moment.** Keep motion to a gentle float on the logo, and respect reduced motion.
- **Avoid the banned looks** listed in `ui-mockup` (terminal-chic tiles, sparkle chips, purple-blue gradients, glass), unless the brand itself uses them.
- **Phone width works:** grids collapse to one or two columns, with no sideways scroll.
