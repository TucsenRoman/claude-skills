---
name: logic-book
description: Build or refresh a project's logic as one visual page you look at instead of read — every number the product shows, what it's made of, how it rounds, what must add up, the edge cases and the open questions, drawn from the real code and worked through with real numbers. Use when the user wants a logic book, math doc, rules doc, or "how the numbers work" page; when the user and Claude keep going back and forth on a product's math; before changing a formula; or when a project's logic changes and its logic book needs a refresh.
---

# logic-book

A project's logic, shown rather than described: one scrolling page, published as an Artifact, where every number on screen is traced to its formula with a worked example. It sits beside the brand book (how it looks) and the widget book: the logic book is how it counts. A short written spec stays in the repo for code.

## Steps
1. **Load the truth from code.** Find every function that produces a number the user sees (sheets, cards, widgets, notifications). Read each one in full: inputs, window, filters, rounding, caps, when it hides. Where a written doc disagrees with the code, the code is what ships: show the code's rule and list the doc's as an open question, unless the user already decided.
2. **Work every number with real inputs.** Run the project's own functions on one fixed example (the project's sample data, or a seeded made-up history when the sample is too short), and print every value. Never compute an example by hand: the page shows what the code returns, so it can't drift from it. Keep the example script in the repo so a refresh reruns it.
3. **Prove the sums.** For every number shown as parts of a total, the page shows the parts adding up. Where the project has checks for this, run them and show the result; where it doesn't, write one with the step 2 example (`ui-mockup`-style tooling is not needed; a plain script that exits non-zero is enough).
4. **Build one HTML page** using the sections and rules in [GUIDE.md](GUIDE.md), in the project's own look (tokens, fonts, the same page frame as its brand book). [templates/example-viseez.html](templates/example-viseez.html) is a finished example to start from.
5. **Look at it once.** Serve it from a tiny local server, screenshot each section at desktop and phone width, check every number against the step 2 printout, fix, stop the server.
6. **Save and publish.** Source in the project (`LOGIC_BOOK.html` at the root, beside the brand book), the written spec next to the code's design docs. Publish as an Artifact; refresh to the same `url`.
7. **Point to it.** In the project's `CLAUDE.md`, beside the brand book line: `Logic book: <artifact url> (source: <path>)`. The written spec keeps only what code needs: one line per definition, the rounding table, the open list.

## Refresh
When a formula changes: change the code, the check and the spec in one PR, rerun the example script, update the page's numbers from the printout, and republish to the same `url`. An open question the user decides moves out of "Open" into its section, dated.

Finish with one line recommending the next step, for example "Logic book's live. Want to settle Open 1 next?"
