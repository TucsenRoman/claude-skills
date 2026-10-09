# Phone frame

The source can be a Figma frame, a running screen (emulator or Expo Go screenshot plus its code), or a direction chosen in `ui-direction`. With no Figma, take exact values from the project's tokens and component code.

Turn a Figma mobile-screen design into a self-contained HTML file that:

- Reproduces the screen pixel-for-pixel (colors, type, spacing, radii — not just "close enough")
- Lets the user drag sliders / pick device presets to stress-test safe-area insets (notch, Dynamic Island, home-button, no-insets) live, without touching a simulator
- Is fully interactive where cheap to make it so (option toggles, disabled states, button presses) so the mockup *feels* like the real screen, not a flat image

The output is a deliverable the user opens, drags sliders on, and iterates against — not documentation.

**Default to one screen.** Build exactly the screens the user asked about — usually that's a single screen, and a single phone frame is the right output. Only render multiple frames when the user explicitly names more than one screen, asks about a flow/transition, or the screens genuinely need to be seen together. Don't invent a second screen to make the artifact look more complete; an unnecessary extra frame is wasted work and dilutes what the user wanted to look at.

## When to use this vs. just editing app code

Use this skill when the ask is "let me see/test this layout" — the user doesn't have the app running, wants to iterate faster than a simulator rebuild allows, or wants to hand a designer/PM something clickable. If the user's real goal is "fix my component's code to match Figma," do that directly in the app's source files — this skill is for the standalone testing artifact, not a substitute for the real implementation. The two often go together (verify fidelity, fix the code, regenerate the mockup to confirm) but are separate outputs.

## Step 1 — Get exact values, not eyeballed ones

Never guess spacing, color, or type from a screenshot glance. Pull real numbers:

1. **Prefer the Figma MCP tools** (`get_design_context`, `get_metadata`, `get_screenshot`, `get_variable_defs`) if connected. Get the node ID from the user's Figma URL (`?node-id=X-Y` in the URL maps to node `X:Y`).
2. **If Figma MCP is rate-limited or unavailable**, fall back to Chrome browser automation on an open Figma tab:
   - Use `tabs_context_mcp` to find the tab, `computer` for clicks/screenshots.
   - **Single clicks re-select the top-level frame.** To drill into nested layers (a specific text node, an icon inside a button, a checkbox inside a row), use `double_click` on the same canvas coordinate — often 2-3 times in sequence to get past each nesting level. This is far more reliable than `alt+click` in practice.
   - After selecting a layer, use `shift+2` ("zoom to selection") to fit it to the viewport before reading its Position/Typography/Fill panel on the right — reading values at 12% zoom from a screenshot is unreliable; reading them after zooming to the actual node is not.
   - Watch for **decoy/duplicate frames**: design files accumulate unused iterations with identical names. Confirm you're inspecting the frame that's actually visible in the live design (e.g. by selecting a parent frame, hitting "zoom to selection", and checking the outline lines up with the visible spread) before trusting a layer's numbers — don't just trust the first layer-panel match for a given name.
   - Get exact pixel values for: fill/stroke colors (hex), font family + weight + size + line-height, corner radius, padding, gap, and each element's X/Y position relative to its parent frame.
3. **Cross-check against the app's existing design-token system** (theme file, Tailwind config, CSS variables) if the user has one — note where Figma's literal values diverge from tokens, since matching pixel-for-pixel sometimes means intentionally using a literal hex over a semantic token (flag this trade-off to the user rather than silently picking one).
4. Note explicitly which line breaks in text are **hard breaks in the design** (reproduce literally, e.g. `\n` or a `<br>`) versus incidental wrapping — don't reproduce the latter with a width hack that happens to wrap in the same place, since it'll break at other viewport widths.

## Step 2 — Build the HTML

Single self-contained file: inline all CSS/JS, load fonts via `<link>` (Google Fonts or similar) rather than bundling font files, use `data:` URIs for any images.

**Safe-area testing harness** — this is the point of the artifact, don't skip it:

```css
:root {
  --safe-top: 59px;    /* live-adjustable */
  --safe-bottom: 34px;
}
.screen {
  padding-top: calc(var(--safe-top) + <the app's own extra top offset>);
  padding-bottom: calc(var(--safe-bottom) + <the app's own extra bottom offset>);
}
```

Drive `--safe-top`/`--safe-bottom` from `<input type="range">` sliders plus device-preset buttons (Dynamic Island ~59/34, older notch ~47/34, home-button ~20/0, no-insets 0/0 — confirm current values for the target OS rather than trusting these blindly, safe-area conventions do shift). Show a hatched overlay band for the raw inset region so the user can see what's reserved versus what the extra offset adds on top.

**Phone frame chrome**: fixed-size div (e.g. 402×874 for a common design width) with rounded corners, drop shadow, and a home-indicator bar, on a neutral checkered backdrop so the transparent/edge areas read clearly.

**Multi-screen flows** *(skip entirely unless the user asked for more than one screen — see "Default to one screen" above)*: lay the frames out side by side.

Most multi-screen mockups need nothing more than that. The one case that needs care is a **background asset that bleeds across page boundaries** (a decorative line, an illustration spanning a pager) — comparatively rare, so don't go looking for one. If a design does have it: render the asset as its own absolutely-positioned SVG *inside each phone frame*, at the coordinate offset the real app would show for that page — not stretched, and not redrawn per-screen. Each offset is the previous frame's offset minus one page width; getting this wrong pushes the asset off-canvas entirely, so verify in Step 3 that it's actually visible in *every* frame. Set the phones flush (a thin dashed seam, not a wide margin) so the asset reads as one continuous strand crossing the boundary, matching how a real pager renders it — one shared asset translating behind clipped viewports, not N independent copies.

**Interactivity**: wire up anything cheap — option selection state, disabled/enabled button states, back-navigation between mocked screens — with plain JS. No frameworks, no build step; this has to open by double-clicking the file or via a quick preview, nothing else.

## Step 3 — Verify before delivering

Screenshot the HTML yourself before handing it over — don't ship unverified output:

```bash
~/.claude/skills/ui-mockup/tools/board.sh --out <scratch-dir>/mockup-check --width 1000 --themes light,dark Mockup=/path/to/mockup.html
```

Then Read `<scratch-dir>/mockup-check/board-full.png`. For interactive checks (sliders, presets), open the file in the built-in browser pane instead.

Look at the screenshot. Compare it against the Figma screenshot from Step 1 side by side — check spacing, alignment, line breaks, and colors again now that it's rendered, not just authored. Fix what's off, re-screenshot, repeat until it matches.

## Step 4 — Deliver

Send the HTML file to the user. If the environment supports persisting it as a revisitable artifact (the user will open it more than once, tweak it, or share it) rather than a one-off preview, do that too — otherwise a plain file delivery is enough. Tell the user what the sliders/presets do in one line; don't re-describe the whole layout, they can see it.

## Common mistakes this skill exists to avoid

- Eyeballing spacing/colors from a screenshot instead of reading exact values off the design file
- Treating incidental text wrapping and intentional hard line-breaks the same way
- Building the mockup without safe-area controls, which defeats the actual purpose (checking layout survives different device insets)
- Building a multi-screen flow when the user asked about one screen — or inventing a cross-screen bleeding asset because this doc mentions them. Both are occasional cases, not the default shape of the work.
- (Only when a cross-screen asset genuinely exists) stretching/duplicating it per screen instead of positioning one shared asset correctly per viewport
- Shipping without rendering and looking at the actual output
