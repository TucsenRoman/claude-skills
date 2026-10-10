# Aesthetic: brutalist (Swiss industrial print)

Source: Taste industrial-brutalist-ui (MIT). Condensed; the banned looks in ui-mockup's SKILL.md and its GUIDE.md still apply. The source's second mode, "Tactical Telemetry / CRT terminal" (dark, all-monospace, bracketed labels, scanlines), is omitted: it produces the user's banned "terminal chic" look.

1960s corporate identity and machinery manuals: raw, rigid, typographic. Type is the structure; imagery is secondary.

## Type
- Macro headers: heavy neo-grotesk (Neue Haas Grotesk Black, Archivo Black, Roboto Flex Heavy, Monument Extended). `clamp(4rem, 10vw, 15rem)`, tracking `-0.03em` to `-0.06em`, line-height 0.85-0.95, uppercase. Letters form solid blocks.
- Oversized numerals or letterforms that bleed off the viewport, set against large calculated empty space.
- Small text: a technical sans or mono at 10-14px, tracking `0.05-0.1em`. Keep it to real metadata, not a label on every block.
- Rare textural serif (EB Garamond, Times) only when degraded by halftone or 1-bit dithering, to contrast the clean sans.

## Color (light substrate only)
- Background `#F4F4F0` or `#EAE8E3` (unbleached paper).
- Ink `#050505` to `#111111`.
- One accent: hazard red `#E61919` or `#FF2A2A`, for thick structural rules, strike-throughs, vital highlights.
- No gradients, soft shadows, or translucency.

## Structure
- Strict CSS grid; elements anchor to tracks, nothing floats.
- Visible compartments: 1-2px solid rules, full-width horizontal rules between units. Razor-thin dividers via `display: grid; gap: 1px` over a contrasting parent fill.
- Bimodal density: tight clusters of data against vast empty fields framing the giant type.
- Border radius 0 everywhere.

## Signature moves
- Registration, copyright and trademark marks (®, ©, ™) used as structural shapes.
- Thick warning stripes, barcode-like repeated vertical lines.
- Halftone or dithered images (`mix-blend-mode: multiply` over an SVG dot pattern).
- One global low-opacity noise layer for physical grain.

## Bans (to stay out of terminal chic)
- No dark CRT mode, scanlines, phosphor glow, terminal green.
- No ASCII bracket framing (`[ LABEL ]`), no fake unit IDs or revision strings, no crosshairs at every intersection.
- No numbered rows of thin-bordered tiles with tiny mono caps labels.
