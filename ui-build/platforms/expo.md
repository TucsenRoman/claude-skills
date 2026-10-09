# Building for Expo / React Native

Distilled from: adapt-native, typeset, layout (Impeccable, Apache-2.0); mobile-native (Emil Kowalski's skills, MIT). mobile-native is written for web on phones; its CSS fixes live in `web.md`, and only the principles that carry over to native are here.

## Native is not a reflowed website
Porting web to native means reconforming, not reflowing:
- Web navigation -> the platform's navigation model (tab bar, stack with back, sheets).
- HTML-shaped controls -> platform controls.
- Hover affordances -> touch-first ones. Nothing may depend on hover.
- px type -> Dynamic Type (iOS) / sp (Android) scaling.

## iOS <-> Android: translate idioms, don't transplant
| iOS | Android |
|---|---|
| Tab bar | Navigation bar / rail / drawer |
| Edge-swipe back, back chevron | Predictive Back gesture / button |
| Switch, segmented control, system pickers | Material switch, chips, Material pickers |
| Action sheet | Bottom sheet / Material dialog |
| SF Symbols, SF Pro | Material Symbols, Roboto |
| Semantic system colors, materials | Material color roles, tonal elevation |
| System push/sheet transitions | Container transform, shared-axis, fade-through |

Rebuild navigation and controls in each platform's vocabulary; carry the brand's expressive layer (palette intent, type accent, motion personality) through theming. A project with its own locked system (custom sheets, cards) keeps its signature components on both platforms; translate only the platform-owned parts (back behavior, system pickers, transitions).

## Phone -> tablet, orientation, foldables
- Restructure, don't stretch. A scaled-up phone UI on a tablet is the failure mode.
- Drive structure from size classes (iOS) / window size classes (Android), never device-model checks. Split View and multi-window can hand you a phone-width window on a tablet; size-class layout handles both.
- Use the width: master-detail, multi-column grids, popovers where the phone used sheets. Tab bar may become a sidebar (iPad); navigation bar becomes a rail or drawer (Android expanded).
- Landscape restructures (side-by-side panes, moved controls); never clip or letterbox. Lock orientation only when the task truly needs it, never to dodge a layout bug.
- Foldables: react to posture and hinge via window size classes; test folded, unfolded, tabletop.
- Never hide core functionality on the smaller form.

## Insets and system chrome
- Respect safe areas and window insets in every configuration: notch, Dynamic Island, home indicator, status bar, hinge, keyboard.
- Paint edge to edge; pad content, not the background, away from the insets. Fixed headers, tab bars, toasts, and sheets are the ones that need it.
- Status bar style follows the theme (light and dark each), matched to the color at the top of the screen.

## Touch feel
- Feedback lands on press-in, not on release; release-only feedback reads as lag.
- Text that is a control (buttons, tabs, chips, handles) isn't selectable; content text (amounts, references, errors) stays selectable.
- Nested scrollers (a sheet's list, a horizontal strip in a vertical page) must not chain scroll into the screen behind; a gesture surface owns only its axis, so the cross-axis still scrolls the page.
- Custom controls: the drag completes, a cross-axis swipe scrolls past it, and a drag along its axis moves the control.

## Type and layout on native
- Follow platform text scaling; keep repeated roles identical across screens.
- Spacing from the project's scale; `gap` for sibling rhythm.
- Dense product screens stay spatially predictable; structure changes with size class, not with ad-hoc offsets.

## Verify
- Simulators/emulators for breadth, real hardware for truth: posture, gestures, keyboard, and performance need a device.
- At least one phone and one tablet per shipped platform, both orientations, split-screen where supported.
- Say what produced the evidence (simulator, Expo Go, device) and what stayed untested.
