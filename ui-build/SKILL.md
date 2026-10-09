---
name: ui-build
description: Implement a chosen UI direction in the real codebase — screens, components, layout, styling, theming, responsive behavior. Use when building or changing UI code after a direction is set, for small UI additions and fixes inside an existing screen, or when turning a mockup or design into code. Covers web (React/Next, Tailwind) and Expo/React Native (NativeWind).
---

# ui-build

Turn the direction into shipped code, inside the project's system.

## Before writing code
- Foundations loaded (`ui-foundations`): tokens, fonts, signature components, the project's component rules.
- If `ui-direction` ran: read its direction note and `inventory.md`. Everything marked keep must exist in the result, using the project's own components.
- For a new screen or redesign with no direction yet, recommend `ui-direction` first.

## Rules
- Use the project's existing components before writing new ones. Reuse signature components as-is; never rebuild a generic copy of one.
- Tier-2 tokens only. No hardcoded colors, sizes, or fonts. If a value is missing, add a token (`ui-foundations` extend mode).
- Both themes, if the project has them. Check both before calling it done.
- Real content shapes: long names, empty states, loading, and error states exist from the first pass.
- Follow the project's CLAUDE.md conventions (class order, `gap` over margins, icon set, and so on). They beat anything here.

## Verify
- Web: run the dev preview, click through the flow, check the console, test light and dark, and phone and desktop widths.
- Expo: emulator or Expo Go per the project's instructions; say which was used.
- Compare against the chosen option (board or prototype) and the inventory. Anything dropped is a bug.

## Next
Recommend `ui-feel` if something should move or respond, `ui-stress` for data-heavy UI, then `ui-review`.

## Occasional modes (ask once per session before first use)
- **Pick a library** — the library section of [GUIDE.md](GUIDE.md): before adding a dependency for a UI primitive (toast, drawer, command menu, carousel). Suggest instead of hand-rolling one.
- **Sonner toasts** — the toasts section of [GUIDE.md](GUIDE.md): when the project uses or adds Sonner.
- **Mobile web feel** — [platforms/web.md](platforms/web.md): a web app on phones (100vh, tap highlight, input zoom, safe areas). Not for React Native, which uses [platforms/expo.md](platforms/expo.md).
- **Redesign checklist** — the redesign section of [GUIDE.md](GUIDE.md): an audit-first upgrade of an older codebase's UI. It yields to the project's foundations and the inventory.
- **Refine passes** — typography, layout, color, adaptation, or performance on their own, from the matching sections of [GUIDE.md](GUIDE.md) and `platforms/`. For hardening, run `ui-stress`. The project's foundations win where they differ.
