# Preset: minimalist (editorial utility)

Source: Taste minimalist-ui (MIT). Condensed; SKILL.md banned looks and the shared GUIDE.md rules still apply.

Document-style, workspace-tool calm: warm monochrome, typographic contrast, flat bento, color only as tiny muted pastel spots.

## Type
- UI and body sans with character: SF Pro Display, Geist Sans, Switzer, Helvetica Neue. Not Inter, Roboto, Open Sans.
- Hero headings may use an editorial serif (Lyon Text) with tracking `-0.02em` to `-0.04em`, line-height 1.1. Only under GUIDE.md's serif rule, and never on a cream ground (that is the banned cream-plus-soft-serif look). Skip Instrument Serif, Newsreader, Playfair as defaults.
- Mono (Geist Mono, SF Mono, JetBrains Mono) only for code, keystrokes, and true metadata.
- Body `#111111` or `#2F3437`, line-height 1.6; secondary `#787774`. Never pure black.

## Color
- Canvas `#FFFFFF` (prefer) or `#FBFBFA`; card surface `#FFFFFF` / `#F9F9F8`.
- Borders `#EAEAEA` or `rgba(0,0,0,0.06)`.
- Pastels for tags, inline code, icon backgrounds only: red `#FDEBEC`/`#9F2F2D`, blue `#E1F3FE`/`#1F6C9F`, green `#EDF3EC`/`#346538`, yellow `#FBF3DB`/`#956400`.
- No primary-colored sections, no gradients, no neon, no glass beyond a subtle nav blur.

## Spacing and structure
- Section padding `py-24` to `py-32`; text column `max-w-4xl`/`5xl`.
- Bento: asymmetric grid, cards `1px solid #EAEAEA`, radius 8-12px max, padding 24-40px.
- Shadows effectively none (opacity under 0.05); hover lift `0 2px 8px rgba(0,0,0,0.04)` over 200ms.

## Signature moves
- Primary button: `#111111` fill, white text, radius 4-6px, no shadow; hover `#333333` or `scale(0.98)`.
- FAQ: no boxes, only `border-bottom: 1px solid #EAEAEA`, sharp `+`/`-` toggle.
- Shortcuts as `<kbd>` keys: 1px `#EAEAEA` border, radius 4px, `#F7F6F3` fill, mono.
- Software mockups in minimal window chrome: white top bar, three small light-gray dots.
- Pastel status pills (radius 9999px, `text-xs`, uppercase, `0.05em` tracking), used sparingly, never as a label on every row.
- Icons: Phosphor Bold/Fill or Radix, one stroke weight. Not Lucide, Feather, Heroicons.
- Images: desaturated, warm-toned, faint grain (`opacity: 0.04`). Illustrations: rough continuous-line ink with one offset pastel shape.
- Depth without decoration: very faint full-width imagery or a warm radial light at `opacity: 0.03`.

## Motion
- Entry: `translateY(12px)` + fade over 600ms, `cubic-bezier(0.16, 1, 0.3, 1)`; stagger `calc(var(--index) * 80ms)`.
- Press: `scale(0.98)`. Optional single ambient blob drifting 20s+ at 0.02-0.04 opacity on a fixed layer.

## Bans
- `rounded-full` on cards, large containers, or primary buttons; Tailwind `shadow-md`+; emojis; "Elevate / Seamless / Unleash" copy.
