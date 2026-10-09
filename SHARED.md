# Shared conventions

Rules every skill in this folder follows. Load this file in every session by adding one line to your `~/.claude/CLAUDE.md`:

```
@~/.claude/skills/SHARED.md
```

Your own preferences go in your CLAUDE.md after that line; where they conflict with this file, yours win.

## UI work: the `ui-` stages
All UI and design work goes through these skills, in every project.

| Stage | Job |
|---|---|
| `ui-foundations` | Read, start, or extend the project's design system. Runs before any other stage. |
| `ui-direction` | Decide the look or structure before building, and present options. |
| `ui-build` | Implement the chosen direction in the real codebase. |
| `ui-feel` | How the UI feels: motion, gestures, haptics, sound, press feedback (web and Expo/React Native). |
| `ui-stress` | Worst-case data: long names, empty lists, huge counts. |
| `ui-review` | One-pass critique: regression check, design critique, polish. |
| `ui-copy` | UI text, checked against the project's voice. |
| `ui-loop` | High-stakes builder + critics cycle. Opt-in only. |
| `ui-sync` | Refresh the guides inside these skills from their upstream sources. |
| `accessibility-sweep` | Accessibility pass. Runs only when the user asks for one. |

- **Foundations first.** Before any UI work in a project, load its design source (`ui-foundations`). If none exists, offer to create one before building.
- **Recommend; don't make the user remember.** When UI work starts without a named stage, say which stage applies and use it. After a stage finishes, recommend the next one in one line (for example "Built. Want a `ui-stress` pass?").
- **Occasional modes: ask once per session.** Each stage lists occasional modes. When one fits, propose it in one line and wait for a yes before its first use in a session. After a yes, use it freely; after a no, don't suggest it again this session.
- **Keep what makes the product the product.** A redesign starts from an inventory of the current screen's features and signature elements, and the default for each is keep. Never drop a feature or swap a signature component for a generic one without the user's explicit OK. `ui-review` checks this.
- **Order of authority.** The user's own rules and the project's design system beat every skill. Then the stage skill. Then any source guide it loads.
- **Speed first.** UI exploration defaults to fast: 2 to 3 rough options on a faster model, no builder self-verification, one render and check by you, options shown as each one finishes, variants of one thing from a single agent, and options explored as quick HTML mocks (even in a locked system) with only the picked option built in real code. Full polish only for the option the user picked. Details in `ui-direction`.
- **Accessibility lives in `accessibility-sweep`.** The other stages leave it out. Problems anyone can see (something vanishing into its background) are design issues; raise them as such.

## Source guides
Skills learn from outside skills by keeping copies of their guides in `sources/` (refreshed by `ui-sync`, credited in the README). Nothing here depends on another skill being installed.
- Skip a guide's "Initial Response" preamble; the stage skill already set the context.
- Ignore a guide's references to its original tools (its own slash commands, CLIs, or scripts). Follow the stage skill instead.

## Proposals for the user to approve
Any list of proposed changes (copy, review fixes, stress breaks, skill edits, new skills) goes in one table, then `Reply like "1 y, 2 n"`:

| # | Proposed | Now | Why |
|---|---|---|---|
| 1 | the change | what's there today | the reason, in a few words, plus where |

## Improving the skills
`skill-tailor` and `skill-mason` are listeners: they fire when their event happens, in your next reply, not at the end of the task. Finish the current step first, then add the proposal at the end of that reply (the table, or one line). Never interrupt a tool sequence, and never edit before a yes.
- **`skill-tailor` events:** the user overrides or corrects what a skill had you do; a skill conflicts with their rules or another skill; or the user says a skill's output or process isn't working ("too long", "we need something better", skipping its review). Propose the fix for that skill right away. A fix that applies to many skills goes in this file or in each skill, so every skill still works on its own.
- **`skill-mason` events:** a philosophy, workflow, or output format the user restates that no skill, rule, or memory covers yet. Log it to the watch list in its `LEDGER.md` when you notice it; the moment it clears the bar (2+ sessions, or 3+ times in one), propose a new skill in one line, for example `Pattern: X (4x). Build "name"? y/n`. Check its `LEDGER.md` first so declined ideas don't come back; "mute" defers one for this session only, "mute all" silences it for the session. Never build before a yes.
