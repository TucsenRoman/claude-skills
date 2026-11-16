---
name: build-engine
description: Design and build an engine — one piece of a product's logic that is the single source of truth for one job (deciding what every transaction is, storing and turning over months, a nightly sweep). Covers naming it, pressure-testing the design before code, its spec doc, its procedure diagram, building it with a check script, testing on real data, and wiring it into the logic book and Notion. Use when the user says "build an engine", "we need an engine for…", names a new engine, describes a model on a whiteboard, or asks "is the engine I described effective enough?".
---

# build-engine

An engine owns one job, and nothing else in the product decides that job on its own (user, 2026-11-11: "nothing should independently say what a transaction is, pathfinder determines it"). Built from Pathfinder and the Almanac Model (Bookkeeper, Archivist, Sweep) in viseez.

## 1. Pin down the job
- Restate the engine in a few plain lines: what goes in, what it decides, what comes out, when it runs, and which engines come before and after it. When the user shares a whiteboard or their own description, say back how you read it and ask "is this accurate?" before going on.
- Name what it replaces. Every place that decides this job today has to read from the engine instead.
- Where it lives: above the apps that use it (shared logic), never inside one app.

## 2. Pressure-test before code
- Walk real cases through it with real numbers from the product's data. Give your honest verdict on whether it's effective enough, before anyone asks.
- Edge cases: list them, then sort them into handle now, user steps in, or too rare to bother. Say each sort out loud. Skip edge cases with an obvious answer; don't explain them (user: "why did you even bother telling me that").
- The engine never guesses. When it can't know, the user steps in (links another account, pairs by hand), and the engine says so.
- MVP first: cut anything beyond the core job and note it under Open.

## 3. Name it
- A role with a plain job, in the same family as the others: Pathfinder, Bookkeeper, Archivist, Sweep. Not abstract, not generic ("daily", "streaks", "compactor" were all turned down).
- Give 3 to 5 options in one line each; the user picks. Use the name everywhere: code folder, route, job, monitor, docs.

## 4. Spec doc
`docs/<ENGINE>.md` at the repo root, not under one app. Layout: what it is (date decided, date live), Terms, the procedure step by step, Edge cases (with their sort), Open (decide before building). A model with several engines gets one doc with a section per engine.

## 5. Procedure diagram
- Draw it the way the user draws: mechanical step boxes that say what happens, every split labeled with its question and both answers, loops shown as a dashed path back, Lucide icons, square brackets for the parts.
- Show the whole engine on its own diagram; anything another engine handles becomes a one-word box pointing to that engine.
- Show it with `ui-mockup` and iterate until the user can trace one real transaction through it.

## 6. Build
- Show the core rule's code before the build when it's small ("show me the code").
- Ship it with a check script that runs real worked examples (`npx tsx <engine>.check.ts`), and run it before every PR.
- Storage: check the database actually matches the model (what's kept, for how long, what's turned over). Name the migration in the PR.
- Scheduled engines: one plainly named job, a secret on the route, and an error monitor on its schedule (Sentry cron monitor).
- Ship with `ship`.

## 7. Prove it on real data
Run it on dev, then on production when the user is the only user (they've said yes before). Report what it decided for a few real rows in plain words.

## 8. Wire it in
- `logic-book`: add or refresh the engine's section with a worked example.
- Notion: update the Product page for the engine and the Product index, unasked. New open items go to Tasks.
- The project's CLAUDE.md: one line pointing at the spec and the check command.
- If the engine starts storing or sending new data, recheck the privacy answers (App Store, Plaid) and say what changed.

## Rules
- Plain words and a worked example over jargon. Explain a term before using it.
- One engine per run. A model with several engines gets built engine by engine, in the order data flows.
