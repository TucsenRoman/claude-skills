# Document a design system from code

Distilled from Impeccable's `document` reference (Apache-2.0).

Use this when a codebase already ships a coherent, de-facto system but has no design doc, when the doc has gone stale, or before a big redesign to capture the current state. The doc describes what ships. It does not set a new direction.

If a design doc already exists, show it to the user first and ask: refresh, overwrite, or merge. Never overwrite silently.

If the scan finds no tokens, no components, and nothing rendered, there is nothing to document. Say so and offer the Start flow instead; don't switch on your own.

## 1. Find the assets (in this order)
1. **CSS custom properties.** Grep for `--color-`, `--font-`, `--spacing-`, `--radius-`, `--shadow-`, `--ease-`, `--duration-`. Record name, value, and defining file.
2. **Tailwind / NativeWind config.** The `theme.extend` block: colors, fontFamily, spacing, borderRadius, boxShadow.
3. **Theme objects in JS/TS.** CSS-in-JS themes, `theme.ts`, `tokens.ts`.
4. **Token files.** JSON token sets, Style Dictionary output.
5. **Core components.** Button, card, input, chip, list item, navigation, dialog or sheet. Note their variant APIs and default styles.
6. **Global stylesheet.** Base typography and color assignments usually live here.
7. **Rendered output.** If a browser or simulator is available, sample computed styles from key elements (body, headings, links, buttons, cards). This catches values the tokens miss, including hardcoded ones.

## 2. Extract, class by class
- **Color roles.** Group by job, not by hue: primary accent, any secondary or tertiary accents, neutrals (text, background, border, divider). One accent means primary + neutral; don't invent a secondary.
- **Type scale.** Map observed sizes and weights to roles (display, headline, title, body, label). Note the family stacks, the scale ratio, and any feature settings (tabular figures, width or other variable axes).
- **Spacing and layout.** Grid, container widths, breakpoints, rhythm, density.
- **Shapes.** Radius steps, corners, borders, clipping, recurring silhouettes.
- **Elevation.** The shadow vocabulary. If the system is flat and uses tonal layering instead, that's a valid answer; state it.
- **Components.** For each: radius, color assignment, padding, hover/pressed/selected/disabled treatment.
- **Patterns.** Recurring arrangements across screens: how lists, empty states, headers, sheets, and feedback are built.
- **Voice.** Read the shipped UI strings (buttons, empty states, errors). Note casing, person, length, and the recurring terms. Record what's there; don't rewrite it.

Stop at what's actually reused. A value that appears once is a one-off, not a token. Don't invent components the project doesn't have.

## 3. Resolve drift inside the code
Scans usually turn up near-duplicates: two greys a few steps apart, three radii that are meant to be one, a hardcoded hex next to the token it copies.
- Cluster near-duplicates and count usages of each.
- Propose the most-used value (or the token-backed one) as canonical, and list the stragglers with file locations.
- Ask the user before folding them. Keep a short "known drift" list in the doc for anything left unresolved.

## 4. Ask for the qualitative layer
Some things can't be extracted. Ask in at most two rounds of up to three questions, waiting between rounds:
- **North star.** One named metaphor for the whole system. Offer 2 to 3 options.
- **Overview voice.** Mood words, the aesthetic philosophy in 2 to 3 sentences, any confirmed anti-reference.
- **Color names.** Descriptive names for the key colors ("deep muted teal-navy", not "blue-800"). Suggest 2 to 3 per color.
- **Elevation stance.** Flat, layered, or lifted; are shadows ambient or structural?
- **Component feel.** One phrase ("tactile and confident" vs "refined and restrained").

## 5. Shape of the doc
Sections in this order; omit any that don't apply rather than padding them:
1. **Overview.** North star, 2 to 3 paragraphs of personality and density, then a short "Key characteristics" list.
2. **Colors.** One line on the palette's character, then primary / secondary / tertiary / neutral, each color with its descriptive name, exact value, and where and why it's used.
3. **Typography.** Families with fallbacks, one line on the pairing's character, then the hierarchy: each role with weight, size, line height, and purpose.
4. **Layout.** Grid or spatial model, containers, responsive changes, spacing rhythm.
5. **Elevation & depth.** Shadows, tonal layering, or a hybrid; each shadow role with its exact value and when to use it.
6. **Shapes.** Radius strategy, borders, clipping, recurring geometry.
7. **Components.** A character line each, then shape, colors, states, and anything distinctive. Include the product's signature components here, not just the generic primitives.
8. **Do's and don'ts.** Concrete guardrails grounded in the shipped system or a confirmed user decision, with exact values where they're established.

Voice gets its own short section (or a pointer to the project's voice doc) if the project keeps it with the design doc.

## Writing rules
- **Description first, value in parens.** "Gently curved edges (8px)", not "rounded-lg".
- **Say where and why**, not just what. Every token earns its place by its job.
- **One source of truth per value.** If a token file owns a value, the doc names it and describes its role; it doesn't restate a different number.
- **Named rules.** Short, citable doctrines ("The One Voice Rule. The accent covers a small share of any screen; its rarity is the point."). One to three per section, only where the code or the user backs them.
- **Hard language for real invariants, softer for provisional ones.**
- **A one-sentence test beats a paragraph of principle**, when the test comes from the observed system.
- **Keep it visual.** Product strategy and page-specific decisions stay out; a task-level choice is not a system-wide rule.
- **Use the project's own token names.** Don't rename to a generic scheme.

## Pitfalls
- Pasting raw class names instead of translating them into descriptions.
- Documenting every value instead of the reused ones.
- Inventing a secondary color, a component, or a shadow scale to fill a section.
- Renaming or merging sections; keep the order above so the doc stays predictable.
- Turning one screen's choices into global prohibitions.

## Finish
Show the user the full doc and point out the non-obvious calls: the color names, the north star, the named rules, any drift you folded or left open. Offer to revise any section or add patterns you missed.
