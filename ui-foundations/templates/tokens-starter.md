# Token system starter

A proven shape (from Loop'd's v2 system). Adapt names to the project; keep the structure.

## Tiers
1. **Primitives**: raw values only, as ramps per hue (`50`…`950`) plus a neutral ramp. Never used by components.
2. **Semantic**: named by job, referencing primitives. Every one has a light and a dark value. Components use only this tier.
3. **Component**: only genuine deviations (`--button-primary-bg` when it differs from `--color-action`). Keep this tier small.

## Semantic set (starting point)
- Surfaces: `page`, `inset`, `subtle`, `surface`, `raised`, `overlay`, `ink`
- Text: `primary`, `secondary`, `muted`, `faint`, `disabled`, `on-action`, `on-ink`, `brand`
- Borders: `hairline`, `edge`, `edge-strong`, `focus`
- Action: `action`, `action-hover`, `action-active`, `action-disabled`, `selected`, `on-selected`
- Feedback: `danger`, `success`, `warning`, each with `-surface` and `-edge`
- Product accents: one group per content type the product has, each with text, `-surface`, `-edge`
- Non-color: font families (heading, body, mono), type scale, spacing scale (4px base), radii, elevation, motion durations and easings, z-layers

## Source of truth
One typed file (for example `tokens.ts`) exports primitives, then `light` and `dark` maps of the semantic tokens. A generator script writes:
- `tokens.css`: `:root` light values, `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])`, and `[data-theme="dark"]` for a manual toggle
- Tailwind/NativeWind theme mappings so utilities like `bg-page` and `text-primary` exist
- A JS subset for places that need raw values (icon color props)

Run the generator before dev and build (`predev`, `prebuild`). Never hand-edit generated output.

## Rules to copy into the project's CLAUDE.md
- Components use tier 2 only. Never hardcode a hex; add a token.
- Both themes or it is not done.
- Contrast: text tokens pass WCAG AA on the surfaces they're used on.
