# ui-feel guide
Distilled from Emil Kowalski's skills (MIT): animate, animate-expo, animation-vocabulary, apple-design, find-animation-opportunities, improve-animations, review-animations.

## Decision order
Run in order; steps 1-2 gate everything. "Don't animate" is a valid, often best, outcome.

1. **Should it move at all? (frequency)**

| Frequency | Decision |
|---|---|
| 100+/day: keyboard shortcuts, command palette, tab switches, keyboard open/close, scrolling, settings toggles | No animation. Platform default or nothing |
| Tens/day: hover, press feedback, list navigation, row selection | Near-imperceptible only (native: under 150ms) or nothing |
| Occasional: modals, drawers, sheets, toasts | Standard animation |
| Rare / first-time: onboarding, success, empty states, celebration | The delight budget lives here |

   - Keyboard-initiated actions are a disqualifier (Raycast has no open/close animation; correct).
   - Tabs never slide: they are peers, not a hierarchy (`animation: 'none'`).
2. **Purpose**, named in one word: feedback, spatial consistency, state indication, preventing a jarring change, explanation (marketing/onboarding only), delight (rare tier only). Can't name it: don't build it. Data the user reads or acts on never moves for style.
3. **Then**: cheapest tool -> `transform` + `opacity` only -> easing + duration, or a spring if a finger is involved -> interruption (retarget from the current value) and exit (the way it entered).
4. Extend existing motion tokens; never fork a parallel system. Never invent a curve or config: use the values here.

## Easing
| Situation | Easing |
|---|---|
| Entering / exiting | ease-out |
| Moving / morphing on screen | ease-in-out |
| Hover / color change (web) | ease |
| Constant motion (marquee, progress, hold-fill) | linear |
| Default | ease-out |

- **Never ease-in on UI.** It delays the moment the user watches. ease-out at 200ms feels faster than ease-in at 200ms.
- Built-in easings are too weak. Use:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* strong ease-out for UI */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* iOS-like drawer/sheet */
```
Reanimated: `Easing.bezier(...)` with the same numbers. Need another curve: take it from easing.dev or easings.co, don't hand-roll.

## Duration budgets
UI stays under 300ms. A 180ms dropdown feels more responsive than a 400ms one.

| Element | Web | Native |
|---|---|---|
| Press feedback | 100-160ms | 100-150ms (120ms typical) |
| Toggle, chip, small state change | - | 150-200ms |
| Tooltip, small popover | 125-200ms | - |
| Dropdown, select | 150-250ms | - |
| Modal, drawer, sheet | 200-500ms | spring, ~300ms perceived |
| Toast | 400ms `ease` (Sonner) | enter 300ms, exit 250ms (~20% faster) |
| Screen transition | - | platform default (iOS push 350ms); don't override |
| Marketing / explanatory | can be longer | - |

- Stagger: 30-80ms between items (40ms typical). Longer feels slow, shorter reads as simultaneous. Never blocks interaction.
- After the first tooltip opens, neighbours open instantly (no delay, 0ms).
- Asymmetric timing where the user decides: hold-to-confirm 2s linear on press, 200ms ease-out on release.

## Springs
Use for: drags with momentum, anything a finger touches, interruptible/reversible gestures, "alive" elements, decorative mouse-tracking.

| Interaction | Reanimated | Apple (damping / response) |
|---|---|---|
| Default settle, no overshoot | `{ duration: 400, dampingRatio: 1 }` | 1.0 / 0.4 (move, PiP) |
| Snap back / reposition after drag | `{ duration: 400, dampingRatio: 0.8, velocity }` | 0.8 / 0.4 (rotation) |
| Sheet, drawer | `{ duration: 300, dampingRatio: 0.8, velocity }` | 0.8 / 0.3 |
| Must not pass a hard edge | add `overshootClamping: true` | - |

- Web (Motion): `{ type: "spring", duration: 0.5, bounce: 0.2 }`; critically damped default `{ type: 'spring', bounce: 0, duration: 0.4 }`; physics form `{ mass: 1, stiffness: 100, damping: 10 }`. Prefer the two-parameter form.
- Bounce 0.1-0.3, only when the gesture carried momentum (flick, throw, drag release). Overshoot on a menu that faded in feels wrong; on a flicked card it feels right.

## Physicality and properties
- Never `scale(0)`. Start from `scale(0.9-0.97)` + `opacity: 0`.
- Press: `scale(0.97)` (range 0.95-0.98). `scale` takes label and icons along, which reads as physical.
- Popovers, menus, tooltips scale from the trigger (`transform-origin: var(--transform-origin)`). Modals are exempt: centered.
- Enter and exit along the same path. Mirror easing on reversible transitions.
- Translate in percentages (`translateY(100%)` = own height), not hardcoded px.
- Layout props (width/height/margin/padding/top/left/flex/gap) re-layout every frame. Exceptions: accordion `height` (keep it short; measure, don't animate to `auto`); native absolutely positioned, childless elements (tab pill, progress fill), where `width` keeps the corner radius `scaleX` would smear.
- Blur to mask a crossfade that double-exposes: `filter: blur(2px)` + opacity 0.7 during the transition; keep blur under 20px. Opacity vs height in entering lists has no formula: tune by eye.


## Apple-style physics
- Respond on press-down, not release; strip debounces and waits from the input path. Track 1:1 during the gesture, respecting the grab offset.
- Interruptible always: never lock input mid-transition; start new motion from the live (presentation) value, not the target.
- Velocity handoff at release; if an API wants relative velocity: `gestureVelocity / (target - current)`.
- Commit vs reverse by velocity sign and projected endpoint; snap to the target nearest the projection.
- Springs over durations for anything touchable; carry velocity through retargets (no "brick wall" on reversal). Split 2D motion into independent X and Y springs.
- ~10px hysteresis before committing to a drag direction; detect gestures in parallel, cancel losers once intent is clear. Rubber-band at edges: friction, not a wall.
- Intermediate frames hint toward the outcome (grow toward the finger). Multimodal: causality, harmony (same frame), utility (meaningful moments only).

## Find opportunities
Restraint first: at most 5-7 for an app, fewer for one view; always name what was rejected and why.
- **Helps**: pressables with no press state; teleporting state (conditional renders, content swaps, snapping accordions, non-high-frequency list add/remove); panels with no spatial link to their trigger; dismissables exiting a different way than they entered; occasional group entrances that pop in at once (stagger); draggables that snap with no physics; destructive one-click actions (hold-to-confirm); rare high-emotion moments rendered flat (first run, empty state, success).
- **Remove**: keyboard-initiated or 100+/day actions; tab switches; lists scrolled past all day; decoration on data being read (charts, balances); scroll reveal on functional UI; "looks cool" outside the rare tier.


## Vocabulary
| Name | Meaning |
|---|---|
| Scale in | Grows from smaller to full size, usually with a fade |
| Pop in | Appears with a slight overshoot |
| Reveal | Uncovered gradually via clip-path or mask |
| Stagger | Items animate one after another with a small delay |
| Origin-aware | Grows out of its trigger, not its own center |
| Crossfade | One fades out as another fades in, same spot |
| Morph | One shape turns into another (Dynamic Island) |
| Shared element transition | Element travels and transforms into its new position (thumbnail to card) |
| Layout animation | Size/position change animates instead of snapping |
| Press feedback | Subtle scale-down on press |
| Hold to confirm | Fill progresses while the button is held |
| Swipe to dismiss | Drag off-screen to close |
| Rubber-banding | Resistance and snap-back past a boundary |
| Shake / Wiggle | Side-to-side jitter for an error |
| Spring / Bounce | Physics-driven motion; overshoot then settle |
| Momentum / Velocity | Motion carrying speed from a drag into the next animation |
| Interruptible | Can be redirected mid-flight |
| Number ticker | Digits roll or count to a value (use tabular figures) |

## Platforms
- Web: [platforms/web.md](platforms/web.md)
- Expo / React Native: [platforms/expo.md](platforms/expo.md)
