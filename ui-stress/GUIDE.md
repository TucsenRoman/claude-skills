# ui-stress guide

Distilled from break-ui (Emil Kowalski's skills, MIT) and harden (Impeccable, Apache-2.0).

## Rules for the data
- Plausible or schema-backed, never random. `aaaa…` and 5,000-char names prove nothing. Use a value a real user could produce, or the real limit from the schema, DB column, API type, or `maxLength`. No limit found is itself a finding ("unbounded").
- Note where front and back disagree (50-char input, 255-char column): longer values will arrive via import or API.
- Change the data, not the component. Worst case enters at the same boundary as demo data (fixture, mock, props, API stub). Never hand-edit markup or CSS to cause a break.
- Spread failures across the first rows (row 1 long name, row 2 long email, row 3 one-letter name), as real data does.
- Count every rendered value: header counts, relative times, badge/status text, data-driven button labels, avatars, and the list's length.
- Use `example.com`, `example.org` or `.test` for emails and URLs.

## Worst-case catalog

**Names:** `Aleksandra Wiśniewska-Kowalczyk` (long, hyphen breaks line) · `Christopher Alexander Montgomery III` (naive initials `CI`) · `Konstantin Oberhauser-Wettstein` · `Jo` · `J` · `Ólafur Darri Ólafsson` (accented capital, sort) · `Đặng Thị Ngọc Hân` (stacked diacritics clipped) · `王秀英` (no spaces, one "word") · `نور الهدى عبد الرحمن` (RTL, icons land wrong side without `dir="auto"`) · `Seán O'Brien-Ó Súilleabháin` (apostrophe: escaping, search) · `María José de la Cruz y Fernández` (lowercase particles, last-name sort) · `dana` (initials still uppercase) · `🦊 Fox` (`.charAt(0)` gives `�`) · `👩🏽‍💻 Priya` (ZWJ, `.length` 7+, slicing splits it) · `  Sam   Lee ` (stray spaces) · missing name, email only.

**Emails, URLs, IDs** (unbreakable, nowhere to wrap): `bartholomew.fitzgerald@northwind-industries-holdings.example.com` · `a@b.co` · `first.last+billing-notifications@example.com` (validation rejecting `+`) · `ops@sub.department.region.example.co.uk` · `https://example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved` · `9f8e7d6c-5b4a-4c3d-8e2f-1a0b9c8d7e6f` · `Q3 Board Deck — FINAL (revised) v12 [approved by legal].pdf` · `IMG_20250914_183022_HDR_portrait_edited_edited.HEIC` · `@a` / `@thisisaverylongusernamethatisallowed`.

**Labels and copy from data:** `Senior Product Design Engineer, Platform Infrastructure` (3 lines in a secondary slot) · `Invitation expired 12 days ago` (badge wraps or squeezes name) · `Benachrichtigungseinstellungen` (30 chars, no spaces) · `Paramètres de confidentialité et de sécurité` (copy runs ~30% longer) · twelve tags on one item (needs `+8`) · tag `customer-feedback-from-enterprise-onboarding` · `Untitled` / `""` / `"   "` (zero-height row) · `<script>alert(1)</script>`, `&amp;`, `**bold**` (must render literally) · newline in a single-line field · a 2,000-char pasted description.

**Numbers and money:** `0` (empty bar, divide by zero) · `1` ("1 members") · `1284` (needs `1,284`) · `1000000` (badge width; `1M` where precision doesn't matter) · `12345678.9` → `$12,345,678.90` overflowing totals · `-42.5` (sign, red, accounting parens) · `0.1 + 0.2` → `0.30000000000000004` · `142%` / `-3%` (bars past bounds) · `null` / `undefined` / `NaN` rendered literally · `1.284` in de-DE vs `1,284` in en-US · live `99` → `100` (width jump).

**Collections:** 0 items (does an empty state exist?) · 1 item (lonely grid, "1 of 1") · exactly page size and page size + 1 (empty page 2, "Showing 40 of 40") · 1,000+ unpaginated (scroll, memory, "Showing 40 of 1,284") · one item 10× the others (rows stretch) · identical names.

**Time:** now ("0 seconds ago", not "just now") · 12 days / 11 months / 3 years ago (switch to absolute after about a week) · future ("-3 days ago") · `1970-01-01` (zero timestamp as a real date) · `2025-12-31T23:30:00-08:00` (different day in UTC vs local) · `1,284 hours` (never rolls up to days).

**Images:** avatar URL that 404s · no avatar (fallback size parity) · 4000×200 and 200×4000 images (distortion, card blowout) · transparent or dark logo on dark mode · slow image (layout shift).

**States:** loading · API error · partial data (optional fields mixed across rows) · every enum status in one list · no permission (does the row keep its layout?) · the current user in the list ("You", self-actions).

**Extra fixtures beyond the worst case:** Empty, One (every count at 1), Huge (realistic upper bound).

## Where it breaks and the fix

| What you see | Cause | Fix |
|---|---|---|
| Avatar or icon squished to an oval | Flex child shrinking | `flex-shrink: 0` on fixed-size boxes |
| Text overflows instead of wrapping/truncating | Flex/grid child `min-width: auto` | `min-width: 0` (grid: `minmax(0, 1fr)`) |
| Email/URL runs past the edge | No break points | `overflow-wrap: anywhere` |
| Trailing action pushed off or clipped | Middle took all the space | `min-width: 0` middle, `flex-shrink: 0` action |
| Badge wraps to two lines | Badge allowed to shrink | `white-space: nowrap; flex-shrink: 0`; decide what yields |
| Avatar adrift beside a 3-line name | `align-items: center` | Top-align once text can wrap |
| Last row cut mid-glyph | Fixed height, no affordance | Visible scroll or fade mask |
| Heading breaks mid-word | `word-break: break-all` | `overflow-wrap: anywhere` |
| Wrong initials (`J`, `CI`, `�`) | `.split(' ')[0][0]` | Graphemes via `Intl.Segmenter`, first + last word, fallback icon |
| Orphaned `—` or empty line | Placeholder for missing optional field | Omit the line, or reserve height on purpose |
| "1 members", "0 member" | Hardcoded plural | `Intl.PluralRules` or per-count strings |
| Numbers jitter, columns misalign | Proportional figures | `font-variant-numeric: tabular-nums` |
| `1284`, `1,284.000000001`, `NaN` | Raw number | `Intl.NumberFormat` with locale; guard null |
| Long button label overflows | Fixed-width button | Content width plus `min-width`, never fixed `width` |
| Diacritics or Thai/Vietnamese clipped | Tight line-height + `overflow: hidden` | Looser line-height, don't clip text boxes |
| Broken-image icon | No `onError` fallback | Initials fallback; `object-fit: cover` |
| Truncated text with no way to read it | Ellipsis only | Tooltip/`title` plus full value in a detail view |
| 1,000 rows stutter | Every row rendered | Virtualize or paginate, and say which |
| Raw `<b>`, `&amp;`, `**text**` | Wrong escaping layer | Escape once at render; never inject user HTML |
| Dates/relative times wrong | Hand-built strings | `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat` |
| Image layout shift | No dimensions | Fixed size or `aspect-ratio` |

**Truncate, wrap, or clamp (per field, never globally):**
- Wrap what identifies the item (names, detail titles). Two lines fine; four means the column is too narrow.
- End-truncate secondary metadata where the start carries meaning (role, preview), always with a way to see it all.
- Middle-truncate when items differ at the end: file names, emails sharing a domain, paths, hashes.
- Clamp (`line-clamp: 2`) multi-line previews in cards to keep heights predictable.
- Never truncate numbers, amounts, dates, or anything compared.

## Where to look
- The component's real container width, then 320px and the widest layout. Also a full-width component reused in a ~280px column; at 2560px, lines too long or content stranded.
- Dark mode (hardcoded colors, invisible borders and logos).
- RTL wrapper (`dir="rtl"`) if supported: chevrons, padding, trailing-action order; prefer logical properties (`margin-inline-start`).
- Touch: hover-only actions (the ••• on hover) are unreachable.
- After fixes, flip through every state including Demo: a worst-case fix must not regress the demo. Keep the worst-case fixture as the regression test.

## Hardening beyond data
**Errors**
- [ ] Network failure, timeout and offline each show what happened plus a Try again; no raw `TypeError` text, no generic "Error occurred".
- [ ] API status handled: 400 validation errors, 401 to login, 403 permission message, 404 not-found state, 429 rate-limit message, 500 generic error with support route.
- [ ] Form errors inline by the field, specific, suggest a correction, and keep the user's input.
- [ ] One failing component doesn't block the whole interface.

**Loading and slow network**
- [ ] Initial load, pagination load and refresh each have a state; skeletons match the final layout; spinners don't shift content.
- [ ] Throttled to 3G: images load progressively, skeletons show, optimistic updates roll back on failure.
- [ ] Empty, no-results and no-notifications states each give a clear next action.

**Concurrency and gestures**
- [ ] Submit tapped 10 times fast sends once (disable while pending); races and conflicts resolve.
- [ ] Drag surfaces: a second finger mid-drag, scroll-cancel (`pointercancel`), lost capture, release outside, or window blur each end the drag cleanly, and the next drag works without reload.

**Overflow and input**
- [ ] No fixed widths on text containers; leave ~30-40% room for longer text.
- [ ] Inputs have length limits matching the backend; server validates too; `+` and accents accepted.
- [ ] Inputs at 16px or larger on mobile (iOS Safari zooms focused inputs under 16px).
- [ ] Permission states: can't view, can't edit, read-only, each explained.

**Cleanup**
- [ ] Listeners, subscriptions, timers and pending requests cleared on unmount; search debounced, scroll handlers throttled.
