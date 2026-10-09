# Expo / native checks
Distilled from Impeccable's audit (Apache-2.0). Technical checks for a release pass.

## Performance
- Launch: no heavy work before the first frame.
- Long content virtualized (FlatList / FlashList), keyed and memoized; no needless re-renders.
- No synchronous work in scroll or gesture paths; watch for dropped frames at 60/120 Hz.
- Thumbnails decoded at thumbnail size and cached, not full-size images.
- JS bundle free of unused dependencies.

## Theming
- No raw hex in components; tokens or semantic colors only.
- Dark appearance designed, not a quick invert; every value updates on theme switch.
- Android 12+ Dynamic Color: if used, a static fallback scheme exists.
- No hand-rolled materials where system materials or tonal elevation are expected.

## Platform conformance (does it read as native or as a ported website?)
- System gestures intact: iOS edge-swipe back, Android predictive Back not hijacked.
- Insets respected: notch, Dynamic Island, home indicator, status bar, keyboard.
- Navigation follows the platform; no iOS patterns forced on Android or the reverse; no overloaded tab bar.
- No web-shaped controls: HTML-style buttons, custom toggles, hover-dependent affordances.
- One icon set (SF Symbols / Material Symbols or the project's own), not a mix.

## Adaptivity
- Tablet is not a stretched phone layout; size classes used.
- Landscape works or is locked for a stated reason.
- Inputs never sit behind the keyboard.
- iPad Split View / Android multi-window and foldable posture changes don't break layout.
