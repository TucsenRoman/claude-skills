---
name: ui-copy
description: Write or fix UI text — labels, buttons, headers, empty states, errors, loading, onboarding, notifications, end-of-list moments — in the project's own voice. Use when writing or reviewing any user-facing copy in an app or site, when copy sounds generic, corporate, or unclear, when terms are used inconsistently, or when the user asks for wording options.
---

# ui-copy

UI text that sounds like the product and tells people what they need. The method is in [GUIDE.md](GUIDE.md); read it in full. This skill's voice rules sit on top of it.

## Steps
1. **Load the voice** from the project's foundations (`ui-foundations`: voice doc, examples of good copy, banned words). If the project has no voice doc, ask for three words and two examples of copy they like, and offer to save them to the foundations.
2. **One word per idea.** Keep a short glossary in the project's design doc: the term to use for each concept and the ones to avoid ("log in, not sign in"). Check every string against it, and add any term you settle on. Create the glossary if the project has none.
3. **Read whole flows, not isolated strings.** For each screen state, decide the one fact the user needs now, then the next action, then any context that changes the decision. Say each idea once.
4. **Rewrite by function** with clarify's rules: actions name what will happen; destructive actions name the object and the consequence; empty states say which kind of empty (first use, no results, filtered, failed, not yet) and what to do next; loading names the real operation.
5. **Errors** say what failed, why when it's known, and what to do. No jokes around money, deletion, or losing access; warmth is fine.
6. **Options where wording matters:** two or three for headers, empty states and calls to action; one for functional text (labels, errors).
7. **Voice check:** human phrases over labels; one moment of wit per screen at most; no corporate phrasing. Keep it as short as it can be without losing meaning, and check it fits at phone width.

## Report
Use the proposals table (`# | Proposed | Now | Why`, see `../SHARED.md`), one row per change, then `Reply like "1 y, 2 n"`. Apply what's approved.

| # | Proposed | Now | Why |
|---|---|---|---|
| 1 | Connect your banks once. | Link your banks once. | Glossary: connect, not link (welcome screen) |

Keep the Why cell short: the reason plus where it appears.

## Occasional modes (ask once per session before first use)
- **Copy lab** — `ui-mockup`'s copy lab: the real screen with strings editable in place, glossary flags, and a fit check at phone width. Suggest when wording is being reworked across a whole screen or flow.
- **Brand voice** — the `brand-voice:*` skills, when the project has formal brand guidelines to enforce.
