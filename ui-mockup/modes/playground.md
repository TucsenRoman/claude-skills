# Playground

One live mock with a control per value, for when the user is hunting for numbers (sizes, overlaps, thresholds, counts) rather than choosing between finished options.

## The shared panel
Every lab (playground, token, motion, stress, copy) uses the same control panel, so labs look and work the same for anyone with this skill: [tools/panel.js](../tools/panel.js) and [tools/panel.css](../tools/panel.css). Don't hand-build controls. Usage is at the top of `panel.js`. It gives you:
- **Header icons:** theme (light/dark), edit text, select an element, and copy (the badge counts changes; the tooltip says what it copies).
- **Groups** that collapse, each with an "N changed" count, and a **Changed only** filter.
- **Rows:** slider plus type-in number, toggle, segmented select, or color (light and dark side by side, each with a hex field). An (i) button with a one-line explanation. A ↺ on changed rows resets them.
- **Quick picks:** pass the project's tier-1 primitives as `palette`; clicking a color shows them as chips, and picked tokens paste back by name (`mist[500]`), not hex.
- **Element select:** map selectors in the mock to the controls they use (`inspect.map`); clicking an element highlights its rows.
- **Text editing:** click any text in the mock to rewrite it; edits mirror to the twin (the other side of a before/after) and paste back as `"old" → "new"`.
- **Frame sizing:** device presets plus custom width × height.
- **Warnings:** `check(state)` returns visible problems, shown under the bar.

## Rules
- **Test-data control:** include one that reaches the worst case (for example "N items on every row").
- **Paste-back:** `output(state)` returns the changes in the project's own format. When the user picks, make their numbers the defaults.
- **Rebuild the model** when their answers reveal a better rule (for example "fit to width with a minimum" instead of a fixed scale).
- **Serve with [tools/serve.js](../tools/serve.js):** `node ~/.claude/skills/ui-mockup/tools/serve.js <scratch-folder> 5178`. It serves the folder with real MIME types and maps `/tools/` to this skill, so pages load `/tools/panel.js`. Open it in the browser pane; files opened from disk often block scripts. Keep the mock itself self-contained: inline the tokens, no required CDN script.
- **Real data through a proxy:** when the mock needs data the browser can't read cross-origin (images, APIs), add a same-origin proxy route to that server so it shows the real behavior, not a stand-in.
