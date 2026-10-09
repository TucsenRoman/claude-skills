---
name: ui-foundations
description: Load, start, or extend a project's design system before any UI work — tokens, type, color, spacing, voice, and the product's signature components. Use at the start of any UI, design, styling, or screen work in a project; when the user wants to start or set up a design system, design tokens, a theme, or a style guide; when adding or changing tokens; or when written design docs and code may disagree. Also codifies a reference design the user loves into reusable rules (`ui-codify`).
---

# ui-foundations

The project's design truth, loaded before anything gets designed or built. Three jobs: **read** (most runs), **start**, **extend**.

## Where foundations live
Every project records its design source in its `CLAUDE.md` under a `## UI foundations` section:

```markdown
## UI foundations
- Tokens: <path to the source of truth, and how outputs are generated>
- Docs: <design system / voice docs: repo files, Notion pages, Figma>
- Fonts: <heading / body / mono, and where they're loaded>
- Platforms: <web / Expo / both>
- Signature: <components and interactions that define this product; never swap for generic ones>
- Drift: <known mismatches between docs and code, and which one wins>
```

If the section is missing, build it (read mode, step 5) and show it to the user before writing it.

## Read (default, every UI task)
1. Read the project's `## UI foundations` section if present, and follow its pointers.
2. Otherwise discover: token files (`tokens.ts`, `tokens.css`, `tailwind.config.*`, `theme.*`, CSS custom properties), font loading (layouts, `global.css`, font assets), component library folders, and design docs (`DESIGN.md`, `docs/design*`, Notion or Figma links in CLAUDE.md).
3. **Drift check.** Compare what the docs say with what the code ships: fonts, brand colors, radii, token names. Code is what users see; docs are what was intended. List every mismatch and ask the user which is right. Never silently pick one. Record the answer under `Drift`.
4. **Signature inventory.** List the components and interactions that make this product recognizable (custom nav, menus, headers, sheets, feedback, copy patterns). Read them from the code, not from guesses. Confirm the list with the user once; it becomes the keep-list every redesign respects.
5. Summarize the loaded foundations in at most 8 lines, then hand back to the calling stage.

Token files written for a build tool may not work raw. Example: CSS inside Tailwind's `@theme` is ignored by a plain browser. When a stage needs tokens outside the build (HTML mocks, boards), resolve them into plain `:root` variables first, and say so.

## Start (no design system yet)
1. Ask, together, then wait: what the product is and who it's for; the feel in three words; one or two references the user loves (a site, an app, a screenshot); platforms (web, Expo, both); and light only or light + dark.
2. If they named a reference, offer `ui-codify` (occasional mode) to turn it into measurable rules first.
3. Build the token system on the pattern in [templates/tokens-starter.md](templates/tokens-starter.md): three tiers (primitives, then semantic, then component), light and dark values for every semantic token, one source file that generates every platform output.
4. Write a one-page design doc next to it: type scale, spacing scale, radii, elevation, color usage rules, voice in three lines, and do/don't examples.
5. Add the `## UI foundations` section to the project's CLAUDE.md.
6. Recommend `ui-direction` to try the system on a first real screen.

## Extend
Adding or changing tokens: keep the tiers (components use tier 2 only), add both theme values, regenerate the outputs, and grep for places the change touches. Never hardcode a value to dodge adding a token.

## Occasional modes (ask once per session before first use)
- **`ui-codify`**: codify one reference design into ratios, bans, and pass/fail tests, validated by rebuilding the original. Suggest when the user names a reference they want to capture, or before `ui-review-deep`.
- **Document from code**: write a design doc from an existing codebase that has a de-facto system but no docs. Follow [GUIDE.md](GUIDE.md) for the analysis steps, writing to the project's own doc location.
- **User research**: when the user wants to understand their users before setting the system, use the `design:user-research` or `design:research-synthesis` skills if available.
