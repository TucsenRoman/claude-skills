# PNG board

Render options side by side as images: the default for comparing.

- Run `~/.claude/skills/ui-mockup/tools/board.sh --out <scratch>/board --width 390|1440 --themes light,dark A=<file or URL> B=...`, then send `board-screen.png` (and `board-full.png` for long pages). It takes HTML files and running dev-server URLs, renders in a headless browser sandbox, and handles narrow widths, forced themes, and settling animations.
- **Native screens:** screenshot each variant from the emulator or device, wrap each PNG in a tiny HTML page, and lay them out with the same tool.
- **Close-ups for small details:** when options differ in something small (icon size, an outline, a number's style), a full board is unreadable. Crop to the changed area at 2x (`--force-device-scale-factor=2`), light mode first, where contrast problems usually live. Check the crop actually lands on the changed area before sending it.
- **Options that differ over time:** a board shows each page's final state, so an intro or a transition looks identical across options. Use the [synced scrubber](lab.md#synced-scrubber); for a quick look, capture each option at the scrubber's marks with `?t=` (`A-0.3s=opt-A.html?t=0.3`).
- **Before/after:** the same layout with two columns, Now and Proposed, for a fix that changes how something looks.
- Look at every image before sending it. Retake anything that caught a loading state, an overlay, or the wrong screen.
