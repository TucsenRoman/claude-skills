# ui-feel: Expo / React Native
Distilled from Emil Kowalski's animate-expo and apple-design skills (MIT).

**Tool, cheapest first**
| Need | Tool |
|---|---|
| State-driven, no gesture (press, toggle, color) | Reanimated CSS transition (`transitionProperty`) |
| Loop / multi-stage / on mount | Reanimated CSS animation (`animationName`) |
| Mount/unmount, list reflow | Layout animations: `entering` / `exiting` / `itemLayoutAnimation` |
| Finger or scroll-driven | `useSharedValue` + `Gesture` + `useAnimatedStyle` |
| Screen to screen | Native stack options (Expo Router); never hand-roll |
| Sheet that is its own screen | `presentation: 'formSheet'` (+ `sheetAllowedDetents`, `sheetGrabberVisible`) |
| Tab bar, menus, large title | `NativeTabs`; `Link.Menu` / `Link.Preview` (iOS); `headerLargeTitleEnabled` |
| Keyboard-following UI | `react-native-keyboard-controller` (`useReanimatedKeyboardAnimation`), never `Keyboard.addListener` + timing |
| Illustration / celebration | Lottie (never UI state); huge scenes: Skia |

**Reanimated rules**
- Reanimated, not core `Animated`. Never `PanResponder`. Helpers called from worklets need `'worklet'` as their first line.
- Shared values via `.get()` / `.set()` (compiler-safe; `set` takes a functional update). Never read or write them during render: only in worklets, handlers, effects.
- Never `setState` from a gesture or scroll handler (one render per frame = jank). Two `setState`s per press are fine.
- `scheduleOnRN(fn, ...args)` (replaces deprecated `runOnJS`) belongs in `onEnd` or a `useAnimatedReaction`, never per frame in `onUpdate`. Fire once at a threshold: `useAnimatedReaction(() => v.get() > T, (now, prev) => { if (now !== prev) ... })`.
- Layout-animation builders at module scope or in `useMemo` (e.g. `FadeInDown.duration(250).delay(index * 40)`). Never `entering` on a virtualized row (FlatList/FlashList recycle and re-fire it); animate the container, or `itemLayoutAnimation` for reflow.
- Collapsing header: fixed-height container, translate/fade the content, `Extrapolation.CLAMP` always.
- Start animations from a shared value on the UI thread.
- `transform` is an ordered array: `[{ translateY }, { scale }]` keeps translate unscaled. Measure heights with `onLayout`, never hardcode. Never animate Android `elevation` or `BlurView` intensity; crossfade a static layer.
**Gesture Handler**
- Wrap gestures in `useMemo` (rebuilding reattaches the recognizer and drops a mid-flight drag). GH v3 hooks (`usePanGesture`, `onActivate`/`onDeactivate`) manage identity themselves.
- Declare the axis: `activeOffsetY([-10, 10])` for vertical, `activeOffsetX([-10, 10])` inside scroll views, or the pan steals scrolls.
- `onStart` captures the current on-screen value (`context.set(v.get())`) so grabbing mid-animation never teleports.
- `GestureHandlerRootView` must wrap the app, or gestures silently do nothing.
**Press**: feedback on press-in, commit on press-out; `scale 0.97` in 120ms with `cubic-bezier(0.23, 1, 0.32, 1)`; `hitSlop={12}`, `pressRetentionOffset={16}`. Same scale on both platforms in a custom-designed app (ripple only for Material).
**Navigation**: hierarchy push `animation: 'default'`; abandonable task `presentation: 'modal'`; short interruption `formSheet` with detents; set `animationMatchesGesture: true` with any custom animation. formSheet on Android: max three detents, no grabber, no native headers or nested stacks; `fitToContents` needs explicitly sized content.
**Device**: Reanimated 4 needs the New Architecture. Judge feel on a release build on the slowest supported device, never Expo Go. Confirm `CADisableMinimumFrameDurationOnPhone: true` (120fps, 8ms frame budget).

## Momentum and rubber-band worklets
```js
// Where a flick would come to rest (Apple's exponential-decay form, not v²/2a).
// 0.998 = normal scroll feel, 0.99 = snappier.
function project(velocity, decelerationRate = 0.998) {
  'worklet';
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}
// The further past the edge, the less the element follows.
function rubberband(overshoot, dimension, constant = 0.55) {
  'worklet';
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
```

## Drag-to-dismiss sheet
Use `formSheet` if the sheet is its own destination; build this only inside an existing screen.
```js
const pan = useMemo(() => Gesture.Pan()
  .activeOffsetY([-10, 10])
  .onStart(() => { context.set(translateY.get()); })
  .onUpdate((e) => {
    const next = context.get() + e.translationY;
    translateY.set(next >= 0 ? next : rubberband(next, HEIGHT));
  })
  .onEnd((e) => {
    const projected = translateY.get() + project(e.velocityY);
    if (projected > HEIGHT * 0.4) {
      translateY.set(withSpring(HEIGHT, { duration: 300, dampingRatio: 1, velocity: e.velocityY,
        overshootClamping: true }, (finished) => { if (finished) scheduleOnRN(onClose); }));
    } else {
      translateY.set(withSpring(0, { duration: 300, dampingRatio: 0.8, velocity: e.velocityY }));
      scheduleOnRN(Haptics.impactAsync, Haptics.ImpactFeedbackStyle.Light);
    }
  }), [onClose]);
```
- Velocity decides via `project()`, not distance alone (a flick dismisses); release velocity goes to the spring (no seam); `overshootClamping` on dismiss, or the sheet flashes a gap.
- Backdrop derives from the same value: `interpolate(translateY.get(), [0, HEIGHT], [1, 0], Extrapolation.CLAMP)`.
- Swipe-to-delete: same shape on X, `Math.min(0, ...)`, commit with `withTiming(-WIDTH, { duration: 200, easing: EASE_OUT })`; let `itemLayoutAnimation={LinearTransition.duration(200)}` close the gap. Use `ReanimatedSwipeable` for reveal-actions rows.

## Haptics (expo-haptics)
| Moment | Call |
|---|---|
| Value ticks a step: picker, slider detent, segmented control, tab press | `selectionAsync()` |
| Snap home, sheet detent catches, drag commits, threshold armed | `impactAsync(Light)` |
| Heavy landing, destructive action fires | `impactAsync(Medium)` |
| Operation succeeded / failed | `notificationAsync(Success / Error)` |

- Same frame as the visual, at the causal moment (the detent catching, the press), not when the animation ends.
- One per user action. Never on scroll, per frame, or on an entrance the user didn't cause.
- Never the only feedback (off for many users, silent on most Android hardware). From a worklet: `scheduleOnRN(Haptics.selectionAsync)`.

