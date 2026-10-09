# UI review guide
Distilled from Emil Kowalski's emil-design-eng (MIT) and Impeccable's critique, audit and polish (Apache-2.0).

Motion rules live in [motion.md](motion.md); this guide adds only the values and craft checks it doesn't carry.

## 1. The craft bar

Finished UI is the sum of details nobody consciously notices: when something works exactly as assumed, the user moves on without a thought. Judge the aggregate, not single pixels; small misses compound.

### Press and state feedback
- Every pressable gives instant press feedback: scale 0.95-0.98 (0.97 is the default), 160ms ease-out on the transform.
- Every control has default, pressed/active, disabled, loading, error and success behavior where it can be in that state. Hover exists on web only.
- Entering elements start from scale 0.9 or higher plus opacity, never from nothing.
- A crossfade that still looks like two objects swapping: add `blur(2px)` during the transition (keep blur under 20px; heavy blur is costly, worst in Safari).

### Motion values (rules in motion.md)
| Element | Duration |
|---|---|
| Press feedback | 100-160ms |
| Tooltips, small popovers | 125-200ms |
| Dropdowns, selects | 150-250ms |
| Modals, drawers | 200-500ms |
| Marketing / explanatory | can be longer |

| Use | Curve |
|---|---|
| Enter/exit, UI response | `cubic-bezier(0.23, 1, 0.32, 1)` (strong ease-out) |
| On-screen move/morph | `cubic-bezier(0.77, 0, 0.175, 1)` (strong ease-in-out) |
| iOS-like drawer | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Hover / color change | `ease` |
| Constant motion (marquee, progress) | `linear` |

- Frequency decides whether to animate: 100+/day none; tens/day remove or drastically reduce; occasional (modals, drawers, toasts) standard; rare/first-time may add delight.
- Valid purposes: spatial consistency, state indication, explanation, feedback, preventing jarring appear/disappear. "Looks cool" on a frequent element is not one.
- Springs: prefer `duration 0.5, bounce 0.2` style config; bounce 0.1-0.3 and only for drag-to-dismiss or playful moments.
- Stagger: 30-80ms between items; never block interaction while it plays.
- Hold-to-confirm: 2s linear fill on press, 200ms ease-out snap back on release.
- Tooltips: delay the first; once one is open, adjacent ones open instantly with no animation.
- Perceived speed counts as much as real speed: a faster spinner makes loading feel faster; a 180ms select feels more responsive than a 400ms one.

### Gestures
- Dismiss on velocity, not distance alone: dismiss when distance passes the threshold OR velocity (distance / ms) exceeds ~0.11.
- Past a boundary, damp: the further the drag, the less the element moves. No hard walls.
- Capture the pointer once a drag starts; ignore extra touch points mid-drag (finger switch must not make it jump).
- Handle edge cases invisibly: pause timers when the app/tab is hidden, keep hover/hit state across gaps between stacked items.

### Defaults and cohesion
- Good defaults beat options: the shipped easing, timing and look must already be excellent.
- Motion, visuals, naming and copy should share one personality: crisp and fast for a dashboard or finance tool, bouncier only where the product is playful. Shared tokens, no near-duplicate values.
- Decoration (mouse-tracking, tilt, springy flourishes) fits decorative surfaces; on functional data (a balance, a chart) no animation is better.

## 2. Critique heuristics

Judge the rendered screen, then ask of every finding: what is wrong, why it hurts the user, and the concrete fix. No "consider exploring".

### Specificity (judge first)
- Could an unrelated product ship this screen unchanged? If yes, it is generic: name the interchangeable choices and the missed chances for product character.
- Structure copied from a category template (stock hero, stock card grid, stock tab bar) counts against it even when tidy.

### Hierarchy and focus
- One focal point: the most important thing is the most visible. Then 2-3 secondary elements; everything else muted.
- Failure mode "noise floor": every element at the same weight, nothing leads.
- The primary task and current state are obvious within 5 seconds without flattening everything to equal weight.
- Natural reading order: top-to-bottom, leading-edge priority matches importance.

### Cognitive load
- Working memory holds about 4 items. At each decision point count options/actions/facts: ≤4 fine, 5-7 group or disclose progressively, 8+ overloaded.
- Actions: 1 primary, 1-2 secondary, the rest in a menu. Top-level nav ≤5 items.
- Chunk content into groups of ≤4; group by proximity, shared surface, or border.
- One decision at a time; sequence steps instead of read + decide + navigate at once.
- No memory bridges: never make the user carry info from one screen to act on another. Co-locate what a decision needs; avoid hopping between sheets/tabs to gather it.
- Show current location (active tab, selected state, progress).
- 4+ failures on this list = high load, critical.

### Clarity and real-world match
- Plain domain language; define unavoidable terms inline. Labels taken literally still mean the right thing.
- Icons are recognizable; icon-only controls are a risk where meaning isn't obvious.
- Next step after any action is unambiguous; success is confirmed.

### Consistency
- Same action, same UI, same result everywhere. Same gesture, same behavior.
- Same-role text uses the same style; one icon family, stroke and size.
- Terminology, capitalization and punctuation match across screens.
- Matches neighboring flows: routing, save behavior, disclosure, optimistic vs pessimistic updates.

### Status, control and errors
- Every async action shows progress; every save/submit/delete confirms.
- Exits everywhere: cancel on sheets and forms, back to safety, easy clear for filters/search/selection, undo where possible.
- Destructive actions confirm; inputs are constrained (pickers over free text) and defaulted sensibly. No redundant confirmations on low-risk actions.
- Errors: plain language, name the exact problem, offer the fix, appear next to the source, never wipe user input.

### Emotional journey
- Peak-end: the best moment and the final moment of a flow carry the impression; check both.
- Find the valleys (waiting, failure, empty) and add reassurance at high-stakes moments (money, deletion, connecting accounts).

### Edge paths (the user who probes)
- 0 items, 1 item, 1000 items, very long text, emoji, pasted junk.
- Empty states give guidance, not just "No results".
- Refresh, back, or app-switch mid-flow keeps state; interruption doesn't lose progress.
- Nothing appears to work while silently failing; errors leave the UI usable.
- Primary actions sit in the thumb zone (bottom half) on phones; selection over typing.

## 3. Polish checklist

Polish refines; it never sneaks in a redesign. If the concept is wrong, say so and recommend a redesign instead.

### Classify drift before fixing
| Kind | Fix at |
|---|---|
| Missing token | add a token (only if genuinely reusable) |
| One-off implementation | swap in the shared component |
| Conceptual mismatch | flag: flow/IA/hierarchy differs from comparable areas |
| Local defect | fix in place |

### Fix order
1. Broken or blocked tasks, data loss, misleading state.
2. Missing loading, empty, error, success, disabled, permission states.
3. Flow, hierarchy, responsive and design-system drift.
4. Visual and motion inconsistencies.
5. Code and asset cleanup.
Bring the whole path to one bar; don't perfect one corner and leave the rest.

### Pass
- [ ] Aligned to grid and spacing scale; optical alignment fixed, not just mathematical.
- [ ] Related items grouped tight, distinct groups separated generously.
- [ ] Same-role type consistent; wrapping, measure and long strings hold.
- [ ] Semantic color tokens only; colors mean the same thing in light and dark.
- [ ] Icons: one family, matched weight and size, optically centered.
- [ ] Images: fixed aspect ratio, no layout shift on load.
- [ ] Every state present and styled (see fix order 2).
- [ ] Long, missing, offline, slow and permission-limited content checked where the product can hit it.
- [ ] Arrival, transitions, empty and recovery paths connect; no screen feels isolated.
- [ ] Copy consistent; claims unchanged without asking.
- [ ] No debug output, dead code, unused imports, obsolete styles, polish-made duplicates.
- [ ] Every supported size checked, not just the current screenshot.
- [ ] Console clean; no dropped frames on interaction.
- [ ] Final diff has no accidental churn or temp artifacts.

### Feel-check what code can't settle
- Play animations at 2-5x duration or frame by frame: do colors blend or show two states? Is the origin right? Are opacity, transform and color in sync?
- Gestures on a real device, not only an emulator.
- Look again the next day.

Platform technical checks: [platforms/expo.md](platforms/expo.md), [platforms/web.md](platforms/web.md).
