---
name: next-steps
description: Turn a goal the user gives into a visual plan. Asks a few quick multiple-choice questions (AskUserQuestion, multi-select where it fits, with a custom answer always available), then lays the plan out as a picture — phases, steps, sizes, and what depends on what — and once the user approves, hands it off to `/goal` so the work runs to the finish. Use when the user types /next-steps, says "plan this", "make a plan for…", "how do I get to…", "what are the next steps for…", or gives a goal and wants the path laid out.
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

Under the picture, at most 3 lines:
1. The first step to take and why.
2. `Approve, or tell me what to change.`
3. If the plan will be shared or revisited, offer a page in one line: "Want this as a shareable page?" (then publish it as an Artifact).

## 6. Hand off to `/goal`
`/goal <condition>` is a built-in Claude Code command that keeps the session working until the condition is met. A skill can't run built-in commands, so once the user approves the plan:
- Write one `/goal` line in its own code block, ready to paste. The condition names the finished state and how to check it, drawn from their "done means" answer and the plan's steps, in one sentence (for example `/goal steps 1-6 of the plan are done: the Android build installs on my phone and PR is merged`).
- Say in one line: "Paste this to start. I'll work the steps in order and stop when I need you."
- Once the goal is set, work the steps in order, handing each to the skill that fits, and pause only at steps marked as needing the user.
