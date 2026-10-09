# Lab

A live mock with controls beside it, for when the user is tuning rather than choosing: hunting for numbers, tuning tokens, finding where data breaks something, or judging wording in place. One lab, one shared panel; switch on the presets the question needs and add custom controls for anything else.

## The panel
Every lab uses [tools/panel.js](../tools/panel.js) and [tools/panel.css](../tools/panel.css), so labs look and work the same for anyone with this skill. Don't hand-build controls. Usage is at the top of `panel.js`. It gives you:
- **Header icons:** theme (light/dark), edit text, select an element, and copy (the badge counts changes; the tooltip says what it copies).
- **Groups** that collapse, each with an "N changed" count, and a **Changed only** filter.
- **Rows:** slider plus type-in number, toggle, segmented select, or color (light and dark side by side, each with a hex field). An (i) button with a one-line explanation. A ↺ on changed rows resets them.
- **Quick picks:** pass the project's tier-1 primitives as `palette`; clicking a color shows them as chips, and picked tokens paste back by name (`mist[500]`), not hex.
- **Element select:** map selectors in the mock to the controls they use (`inspect.map`); clicking an element highlights its rows.
- **Text editing:** click any text in the mock to rewrite it; edits mirror to the twin (the other side of a before/after) and paste back as `"old" → "new"`.
- **Frame sizing:** device presets plus custom width × height. Default to the narrowest phone the project supports; that's where most things break.
- **Warnings:** `check(state)` returns visible problems, shown under the bar.

## Presets
Ready-made control sets, including motion. Use one, several, or none.
- **Tokens** (`ui-foundations`): a sample screen built from the project's signature components, every color, type step, radius and spacing value as a control, a before/after slider against the shipped tokens, and paste-back in the project's token-source format (then regenerate the outputs). Warn when a color pair stops reading or two scale steps collapse.
- **Stress data** (`ui-stress`): dials for the data, not the design. Text length from 1 character to absurd; item count from 0 to thousands; numbers from 0 to 9 figures and negative; missing fields; emoji, non-Latin and right-to-left text; long unbroken strings (emails, URLs, IDs); slow-loading and error states. Use `ui-stress`'s test values, not random text. Outline anything that overflows, wraps badly or gets cut off, list it in the warnings ("Title overflows at 46 characters"), and paste back the exact data that broke it as a test case.
- **Copy** (`ui-copy`): text editing on, a switch for every state of the screen (empty, loading, error, success), words the project's glossary rules out underlined with the preferred term on hover, and paste-back as the proposals table (# | Proposed | Now | Why).
- **Motion** (`ui-feel`): a Replay button that plays the interaction (or the real gesture: make the element draggable so the user feels the follow, release and settle); controls for duration, easing (preset curves plus custom cubic-bezier), spring (damping ratio and duration, or stiffness and damping), distance, stagger and delay; a 1x / 0.5x / 0.25x select that scales every duration so easing and overshoot show; and "repeat 10x" for interactions people do all day. Build from the project's motion tokens and `ui-feel`'s guide. For async review, capture a frame strip through the board tool, or on native record the device (`adb shell screenrecord`). The emulator and a slow machine distort timing: tune here, confirm the feel on a real phone.

## Custom controls
Anything else is a lab with its own controls (the logo stack's size, overlap and max per day was one). Include one control that reaches the worst case (for example "N items on every row"). When the user's answers reveal a better rule (for example "fit to width with a minimum" instead of a fixed scale), rebuild the model rather than adding dials.

## Rules
- **Paste-back:** `output(state)` returns the changes in the project's own format. When the user picks, make their numbers the defaults.
- **A/B:** two copies side by side, each with its own settings; or a before/after slider ([compare.md](compare.md)) against what ships.
- **Serve with [tools/serve.js](../tools/serve.js):** `node ~/.claude/skills/ui-mockup/tools/serve.js <scratch-folder> 5178`. It serves the folder with real MIME types and maps `/tools/` to this skill, so pages load `/tools/panel.js`. Open it in the browser pane; files opened from disk often block scripts. Keep the mock itself self-contained: inline the tokens, no required CDN script.
- **Real data through a proxy:** when the mock needs data the browser can't read cross-origin (images, APIs), add a same-origin proxy route to that server so it shows the real behavior, not a stand-in.
- Don't switch on presets just because they exist: each one is more for the user to read.
