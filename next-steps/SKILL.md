---
name: next-steps
description: Turn a goal the user gives into a visual plan. Asks a few quick multiple-choice questions (AskUserQuestion, multi-select where it fits, with a custom answer always available), then lays the plan out as a picture — phases, steps, sizes, and what depends on what — and once the user approves, keeps working through it on its own (like `/goal`) until it's done or needs the user. Use when the user types /next-steps, says "plan this", "make a plan for…", "how do I get to…", "what are the next steps for…", or gives a goal and wants the path laid out.
hooks:
  Stop:
    - hooks:
        - type: command
          command: node "$HOME/.claude/skills/next-steps/keep-going.js"
---

# Next steps

The user gives a goal; you give back a plan they can see at a glance, shaped by their own answers.

## 1. Get the goal
Use the goal passed with the command. If there isn't one, ask in one line: "What's the goal?" and wait.

## 2. Look around (quick, read-only)
Only enough to ask good questions: the repo state, the project's `CLAUDE.md`, and its plan (`TODO.md` or the planning docs it names). Don't start any work.

## 3. Ask with AskUserQuestion
One call, 2 to 4 questions, each with 2 to 4 options. Pick the questions that would change the plan, for example:
- **Scope:** which parts are in (multi-select).
- **Priority:** what matters most (speed, polish, cost, learning).
- **Constraints:** deadline, platforms, things not to touch (multi-select).
- **Done means:** how they'll know it's finished.

Rules:
- Set `multiSelect: true` whenever the choices aren't mutually exclusive.
- Put your recommended option first and add "(Recommended)" to its label.
- Don't add an "Other" option; the tool adds a custom-answer box on its own. Mention it in the question if a custom answer is likely ("…or describe your own").
- Short labels, plain words, a one-line description each.

If an answer opens a real gap, ask one follow-up round at most.

## 4. Build the plan
- 2 to 4 **phases**, each with 2 to 5 **steps**. Number the steps across the whole plan (1, 2, 3…).
- Each step gets a size (S / M / L), what it depends on, and the skill that will do it when one fits (`ui-` stages, `ship`, `loose-ends`).
- Mark anything that needs the user (an approval, a sign-in, a decision).
- Respect their answers: anything they left out of scope stays out.

## 5. Show it visually
Draw the plan inline with the visualize tools (load `read_me` first, `diagram` module). Layout: phases as columns or lanes left to right, step cards inside each with number, title, and size, arrows for dependencies, and steps that need the user in a distinct style. Both light and dark themes must read well. No paragraphs inside the picture.

Under the picture, at most 2 lines: the first step and why, and (if the plan will be shared or revisited) "Want this as a shareable page?" (then publish it as an Artifact).

Then ask for approval with AskUserQuestion: "Start this plan?" with "Approve and start (Recommended)" and "Change something". The custom-answer box covers anything else.

## 6. Run it to the finish (no pasting)
The Stop hook in the frontmatter (`keep-going.js`) works like `/goal`: it keeps the session from ending while the approved plan has open steps.

On approval, write `~/.claude/next-steps/active-plan.json`:
```json
{ "goal": "the goal", "cwd": "the working directory", "approved": true,
  "steps": [{ "n": 1, "title": "step title", "status": "todo" }] }
```
Status is one of `todo`, `doing`, `done`, `skipped`, `needs-user`, `blocked`. Only one plan is active at a time; a new approved plan replaces the file. Then start step 1 right away.

While working:
- Do the steps in order, handing each to the skill that fits. Update the step's status in the file the moment it changes.
- When a step needs the user (an approval, a sign-in, a decision), set it to `needs-user`, ask, and stop; the hook lets the session end there. When they answer, set it back to `doing` and carry on.
- If the plan changes, rewrite the steps in the file.
- When every step is `done` or `skipped`, delete the file and say so in one line. A closing "report to the user" step counts as done once you're writing that report, so mark it and delete the file before you send it.
- To stop early (the user says stop, or the goal turns out impossible), set `approved` to false and say why.

The hook gives up on its own after 60 nudges, or 4 in a row on the same step, and writes `stoppedBecause` in the file. If that happens, tell the user which step got stuck.

The hook registers when the skill is invoked. If the skill's frontmatter was edited in this session, the hook may not be live until a new session; say so in one line before starting.

After changing `keep-going.js`, run `node test-keep-going.js` (next to it); every case must pass. It points the hook at a temp plan through `NEXT_STEPS_PLAN`; don't fake `HOME` to test it (auto mode blocks that). Write test plans with `node`, not a bash heredoc, which mangles Windows backslashes in `cwd` and makes the hook silently allow the stop.
