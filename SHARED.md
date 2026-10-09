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
| `ui-direction` | Brainstorm the look or structure in words before anything is drawn; hands directions to `ui-mockup` when it's time to see them. |
| `ui-build` | Implement the chosen direction in the real codebase. |
| `ui-feel` | How the UI feels: motion, gestures, haptics, sound, press feedback (web and Expo/React Native). |
| `ui-stress` | Worst-case data: long names, empty lists, huge counts. |
| `ui-review` | One pass: regression check, design critique, polish. |
| `ui-copy` | UI text, checked against the project's voice. |
| `ui-review-deep` | The deep version: a builder and three critics in rounds until all pass. Opt-in only. |
| `ui-codify` | Turn a reference design into measurable rules and tests. Used by `ui-foundations` and `ui-review-deep`. |
| `ui-mockup` | Builds and shows UI: options from directions, PNG boards, close-ups, live labs with controls, phone frames, Artifacts, inline visuals, Figma. Other stages call it. |
| `accessibility-sweep` | Accessibility pass. Runs only when the user asks for one. |

- **Foundations first.** Before any UI work in a project, load its design source (`ui-foundations`). If none exists, offer to create one before building.
- **Recommend; don't make the user remember.** When UI work starts without a named stage, say which stage applies and use it. After a stage finishes, recommend the next one in one line (for example "Built. Want a `ui-stress` pass?").
- **Occasional modes: ask once per session.** Each stage lists occasional modes. When one fits, propose it in one line and wait for a yes before its first use in a session. After a yes, use it freely; after a no, don't suggest it again this session.
- **Keep what makes the product the product.** A redesign starts from an inventory of the current screen's features and signature elements, and the default for each is keep. Never drop a feature or swap a signature component for a generic one without the user's explicit OK. `ui-review` checks this.
- **Order of authority.** The user's own rules and the project's design system beat every skill. Then the stage skill. Then any source guide it loads.
- **Speed first.** UI exploration defaults to fast: 2 to 3 rough options on a faster model, no builder self-verification, one render and check by you, options shown as each one finishes, variants of one thing from a single agent, and options explored as quick HTML mocks (even in a locked system) with only the picked option built in real code. Full polish only for the option the user picked. Details in `ui-mockup`.
- **Accessibility lives in `accessibility-sweep`.** The other stages leave it out. Problems anyone can see (something vanishing into its background) are design issues; raise them as such.

## How a skill is laid out
- `SKILL.md`: when to use it and the steps. Short.
- `GUIDE.md`: the technique, distilled from outside skills it learned from, credited at the top. Platform-specific parts go in `platforms/` (for example `platforms/expo.md`); variants of a technique in their own folder (for example `presets/`).
- `LESSONS.md`: what real use taught, one dated line each. It beats `GUIDE.md` where they differ. The skill writes its own lessons: when a session teaches it something about its technique (a bug pattern, a value that works, a trap), it adds a dated line before it finishes and says so in one line.

## Skills calling skills
Any skill may call another skill by name whenever the job needs it (for example `ui-direction` calls `ui-mockup` to build and show its directions). A skill that must not be called by others says so on the first line under its title: `Not called by other skills.` That should be rare; list any here so it stays visible:
- (none yet)

Calling a skill is fine; reading another skill's files directly is not. Conventions every skill shares live here.

## Where the guides came from
Each `GUIDE.md` started from outside skills (Emil Kowalski's, Taste, Impeccable), distilled and credited at the top. They were starting points; the guides now grow from real use through each skill's `LESSONS.md`, not from upstream.

## Proposals for the user to approve
Any list of proposed changes (copy, review fixes, stress breaks, skill edits, new skills) goes in one table, then `Reply like "1 y, 2 n"`:

| # | Proposed | Now | Why |
|---|---|---|---|
| 1 | the change | what's there today | the reason, in a few words, plus where |

## Improving the skills
`skill-tailor` and `skill-mason` are listeners: they fire when their event happens, in your next reply, not at the end of the task. Finish the current step first, then add the proposal at the end of that reply (the table, or one line). Never interrupt a tool sequence, and never edit before a yes.
- **`skill-tailor` events:** the user overrides or corrects what a skill had you do; a skill conflicts with their rules or another skill; or the user says a skill's output or process isn't working ("too long", "we need something better", skipping its review). Propose the fix for that skill right away. A fix that applies to many skills goes in this file or in each skill, so every skill still works on its own.
- **`skill-mason` events:** a philosophy, workflow, or output format the user restates that no skill, rule, or memory covers yet. Log it to the watch list in its `LEDGER.md` when you notice it; the moment it clears the bar (2+ sessions, or 3+ times in one), propose a new skill in one line, for example `Pattern: X (4x). Build "name"? y/n`. Check its `LEDGER.md` first so declined ideas don't come back; "mute" defers one for this session only, "mute all" silences it for the session. Never build before a yes.
