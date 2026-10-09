# Motion review
Distilled from Emil Kowalski's review-animations skill (MIT). Use when a change includes animation, gestures, or haptics.

1. Justified: names a purpose.
2. Frequency-appropriate: none on keyboard/100+/day.
3. Easing: ease-out or strong custom curve; never ease-in.
4. Duration: UI under 300ms unless justified.
5. Origin: from trigger (modals exempt); never `scale(0)`.
6. Interruptible: transitions or springs, not keyframes, for rapid/gesture motion.
7. GPU only: transform + opacity; native work stays on the UI thread.
8. Hover gated on web; press-based on native.
9. Asymmetric: deliberate phase slow, system response snappy.
10. Cohesion: matches product personality (crisp dashboard, bouncier playful app); shared tokens, not near-duplicate curves.

**Escalation triggers** (flag on sight): `transition: all`; `scale(0)` or pure-fade entrance with no transform; ease-in or weak built-in easing; animation on keyboard/100+/day action; UI over 300ms unexplained; center origin on anchored popover; keyframes on toasts/toggles; layout-property animation; Motion shorthands under load; parent CSS var driving child transforms; ungated hover; symmetric press/hold timing; everything-at-once where stagger belongs; native: `PanResponder`, `setState` in gesture/scroll, `scheduleOnRN` per frame, shared value in render, `entering` on virtualized rows, JS-rebuilt screen transitions, sliding tabs, distance-only dismissal, hard stop at boundary, haptic per frame.

**Fix preference**: delete > reduce > fix easing > fix origin > make interruptible > move to GPU/UI thread > asymmetric timing > polish (blur, stagger, `@starting-style`).

**Block** on any feel-breaking regression (ease-in, `scale(0)`, motion on high-frequency/keyboard actions, easy-to-fix non-GPU animation). Feel-check what code can't settle: play at 2-5x duration or frame by frame, flick/interrupt/reverse on a real device, look again the next day.

