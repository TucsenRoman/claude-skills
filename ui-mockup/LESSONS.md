# ui-mockup lessons

- 2026-10-10: Options that differ only over time (Loop'd's landing intro) look identical on a board, which renders the final state; asking for a pick by option name confused the user. Use the synced scrubber, with one plain sentence per option.
- 2026-10-10: A CSS gradient on text (background-clip: text) spans the element's box, not the letters. On a block element it stretched across the page and the Jotful wordmark showed only its first color. Use inline-block, and copy an SVG userSpaceOnUse gradient with em-based color stops.
- 2026-10-10: App Store screenshots: App Store Connect's required iPhone slot is now 6.1"/6.3" (1206x2622 or 1179x2556); it rejects 1320x2868 there. Claude's in-app browser can't upload local files (no file picker access, page CSP blocks localhost), so the user drags them in or Chrome's file_upload is used.
- 2026-10-10: Highlight outlines on a before/after board come from measured positions (the UI tree or pixel coordinates), then get checked in the render; hand-placed circles landed off-center and read as a bug in the UI.
