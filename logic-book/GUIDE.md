# logic-book guide

Started from viseez's goal math (2026-10-25), after rounds of "$25 + $313 doesn't make $315". Same visual priority as `brand-book`: show, don't write. Page frame, toggle and jump pills follow the brand-book guide.

## The page
One long scroll. Each section leads with one big visual; words are captions.

| Section | Show | Not |
|---|---|---|
| Opening | The book's name huge, one line on what it covers ("Every number on the goal sheets, and where it comes from"), the example it's worked with, then jump-link pills | An intro paragraph |
| Building blocks | One card per term (window, week, spending, bills, income…): the term big, a one-line definition, and a tiny visual of it (the 90-day strip with full weeks shaded; a transaction list with what counts lit and what doesn't struck) | A glossary table |
| One section per screen | The real screen (phone mock from the app's source, filled with the example's numbers), each number on it marked with a small numbered dot. Beside it, one card per dot: the number big, then its equation with the example's inputs ("$4,050 ÷ 90 × 7 = $315"), its rounding as a chip, and when it hides | A formula list without the screen |
| What adds up | Each sum as a stacked bar: parts as coloured segments, the total under a thick line, with a pass mark from the checks | Sentences saying "these should add up" |
| Rounding | A number line per rule: the raw value, the step marks, where it lands ("$312.40 → $310, to $5") | A rules table alone |
| Edge cases | A grid of small tiles: the case as a short title, a mini drawing of what the screen shows then (the hidden row, the dash, the fallback copy) | A long table |
| Open | One card per open question: what happens now, the options as side-by-side mini screens, and what deciding unblocks. Amber edge, like the widget book's "next" cards | Buried notes |
| Checks | A strip of pass/fail pills, one per check, with what it covers and the last run date | Test output |

## Rules
- **Real numbers only.** Every value on the page comes from the project's own code run on the named example (step 2). Say which example at the top. If a value only exists in a doc, label it.
- **Equations use the example's inputs**, in the order the code applies them, with the rounding step shown last. If the code caps or clamps, show the cap as its own step.
- **One definition per term.** If two screens use different versions of "the same" number, that's a finding: show both side by side in Open, never smooth it over.
- **Units like the product.** Numbers on a row with a muted unit after them ("$175/week"); sentences in plain words ("a week").
- **The screen is the index.** Readers find a number by looking at the screen they know, not by name. Keep the numbered dots in a rail beside the phone, joined by a thin line, so they never cover the screen (as on `ui-mockup`'s fix-approval board).
- **Glass sheets look like glass:** draw iOS sheets see-through over the real home screen, not as flat grey panels.
- **Phone width works:** the screen and its cards stack; no sideways scroll.
- Avoid the banned looks listed in `ui-mockup`.
