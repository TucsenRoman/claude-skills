---
name: brand-book
description: Build or refresh a project's brand as one visual page you look at instead of read — the logo, color, type, the product's own screens, voice, and mood, all drawn from the real code and assets. Use when the user wants a brand doc, brand guide, brand book, or style guide page, asks to "see the brand", or says a brand doc is too wordy; when ui-foundations starts or documents a design system; or when a project's brand changes and its brand book needs a refresh.
---

# brand-book

A project's brand, shown rather than described: one scrolling page, published as an Artifact, that reminds the user what they're building. Written rules stay short and only hold what code needs.

## Steps
1. **Load the truth from code.** Run `ui-foundations` (read mode): tokens, fonts, logo files, signature components, real UI copy. Where an existing brand doc disagrees with the shipped app, ask which is right. The app usually wins when the user changed it on purpose.
2. **Read the signature components' source**, not just their names: sizes, radii, colors, which text shows, what moves and what doesn't. The product section has to match the app.
3. **Build one HTML page** using the sections and rules in [GUIDE.md](GUIDE.md). Use the real logo SVGs inlined, real color values, real fonts and real copy. [templates/example-jotful.html](templates/example-jotful.html) is a finished example to start from.
4. **Look at it once.** The browser pane can't screenshot `file://` pages, so serve the file from a tiny local server (Node's `http` module is enough). Screenshot every section in both themes (flip with the toggle, then wait for the color fade to finish), check it against step 2, fix it, then stop the server.
5. **Save and publish.** Keep the source in the project (`BRAND_BOOK.html` at the root, or the project's docs folder), never only in the scratchpad, which gets cleaned out. Publish it as an Artifact. On later refreshes, publish with the existing `url` so the link stays the same.
6. **Point to it.** In the project's `CLAUDE.md` `## UI foundations` section, add `Brand book: <artifact url> (source: <path>)`. Cut the written brand doc down to what code needs: color values and names, fonts, asset files, logo rules, and open decisions. Don't repeat in words what the book shows.

## Refresh
When the brand changes (a new color, a reworked logo, a new signature component), edit the source file, recheck it (step 4), and republish to the same `url`. Update the written rules in the same pass.

Finish with one line recommending the next stage, for example "Brand book's live. Want `ui-foundations` to turn these values into a tokens file?"
