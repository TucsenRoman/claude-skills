# Building UI well

Distilled from: pick-ui-library, ask-sonner (Emil Kowalski's skills, MIT); redesign-existing-projects (Taste, MIT); typeset, layout, colorize, adapt, adapt-native, optimize (Impeccable, Apache-2.0).

Everything here yields to the project's own foundations (tokens, DESIGN.md, signature components) and the redesign inventory. Platform specifics: `platforms/web.md`, `platforms/expo.md`.

## Typography
Improve type inside the established identity; replacing families is a new direction, not a build task.

Before editing, name: the roles the screen needs (heading, body, label, metadata, data), the contrast between them, the reading measure and density, and which faces and weights are authoritative.

- Fewest roles and families that make hierarchy unmistakable. A second family needs a job only it can do.
- Hierarchy from size, weight, space, and tone together, not size alone. Adjacent roles too close in size or weight can't carry different jobs.
- A deliberate role scale, not arbitrary values. Repeated roles stay identical across screens and states. Name roles by purpose, not value.
- Body floor: 16px on web unless a dense role or platform convention justifies less.
- Prose measure 45-75 characters (about 65 is a good target). Wider lines need more line height.
- Tune line height to the face, width, and language, not a universal ratio.
- Light text on dark surfaces: slightly more line height, a touch more tracking, one step more weight if the face needs it.
- Tabular figures for numbers in data (`tabular-nums`). Use code and label features where the content benefits.
- Display headings: larger, tighter tracking, lower line height. Small caps and labels: positive tracking.
- Weights beyond 400/700: Medium (500) and SemiBold (600) give quieter hierarchy steps.
- Prefer sentence case over all-caps subheads and Title Case headers.
- Orphans: `text-wrap: balance` (headings) or `text-wrap: pretty` (prose).
- Paragraph rhythm: spacing or first-line indent, not both.
- Marketing display type may scale with space; product and reading surfaces stay spatially predictable.
- Load only the faces and weights used; avoid invisible text and reflow on load.

Check: primary, secondary, body, and metadata are recognizable without reading the words; long headings and narrow containers don't break.

## Layout and spacing
Diagnose the structure before moving boxes. Name the primary reading or task path, what groups and what separates, what leads and what supports, the density, and how it changes across sizes.

- Squint test: with detail blurred, the primary element, secondary element, and major groups still read in order.
- Group by meaning. Proximity first; add containers or decoration only when proximity can't do it.
- Rhythm comes from contrast between tight and generous intervals. One spacing value repeated everywhere flattens everything.
- A documented spacing scale, no one-off values. A 4-unit base gives the middle steps an 8-only scale misses.
- Hierarchy follows product priority, not framework defaults. Repeated cards or columns only when the items really are equivalent.
- Density fits use frequency and decision complexity: operate/read surfaces get predictable, stable structure; persuasive surfaces may go asymmetric.
- `gap` for sibling rhythm over child margins.
- Depth (shadow, elevation) only when it clarifies state or hierarchy. Cards exist only when elevation communicates something.
- Radius: tighter on inner elements, softer on containers.
- Side-by-side items (cards, pricing columns): align shared parts across items; pin CTAs to the card bottom; feature lists start at the same Y.
- Optical correction after rendering: icons beside text, play glyphs in circles, and text in buttons often need 1-2px; bottom padding often wants slightly more than top.
- Constrain content width on wide screens (around 1200-1440px container).
- Responsive change is structural: reorder, collapse, reflow, reveal by importance. Prefer container-aware components when one component lives in several contexts.
- Variation is not a goal. Repetition aids recognition; break it only when content or priority changes.

## Color application
Color encodes hierarchy, meaning, and atmosphere. Keep confirmed brand and semantic colors; don't swap the visual world while "adding color".

- Build roles, not swatches: canvas and elevated surfaces; primary and secondary text; action and selection; borders and separators; success, warning, error, info; data categories or scales if needed.
- Primitive values plus semantic tokens; theme changes remap semantic roles.
- Product/operate surfaces: color mainly marks action, selection, status, and wayfinding. Rarity gives an accent its force.
- Let the strongest color own a deliberate region or role rather than scattering small accents. Don't spend the primary action's color on decoration.
- One accent beats several. Keep accents below about 80% saturation so they sit with the neutrals.
- One gray family. Tint neutrals with the brand hue only when it creates cohesion; plain neutral gray is valid.
- On colored surfaces, derive secondary text from the surface or foreground hue, not a washed-out generic gray.
- Avoid pure #000 backgrounds; use off-black or tinted dark (for example #0a0a0a, #121212).
- Dark mode is composed, not inverted: design surface elevation and contrast explicitly.
- No lone dark section in a light page (or the reverse). Need contrast? Use a deeper shade of the same palette.
- Shadows: one consistent light direction; tint them toward the background hue instead of plain black.
- Data: separate series by lightness, chroma, shape, or label, not hue alone.
- New web palettes: OKLCH. Ramps vary lightness and drop chroma near white and black. Prefer explicit colors over stacked translucent overlays.
- Choose hue from product meaning and direction, never a default category association.

## Responsive adaptation
Adaptation is rethinking the experience for the new context, not scaling pixels.

- Assess source (what it assumed: screen, input, connection) and target (device, input, orientation, posture, glance vs focused use). List what won't fit, won't work, or is inappropriate there.
- Phone: single column, vertical stacking, full-width components, bottom navigation, sheets instead of dropdowns, controls in thumb reach, progressive disclosure, shorter copy.
- Tablet: two columns, side panels, master-detail, adapt to orientation; support touch and pointer; denser than phone.
- Desktop: multi-column, persistent side nav, several panels at once, max-width (don't stretch to 4K), hover for extra info, shortcuts, context menus, drag and drop, multi-select.
- Same information architecture across contexts.
- Never hide core functionality on small screens; if it matters, make it work.
- Don't forget landscape. Don't lock orientation to dodge a layout bug.
- Branch on capability (input type, size class), never device model or user agent. Touch and mouse are not exclusive.
- Don't assume desktop means a powerful device.
- Custom controls (sliders, drag surfaces, scroll strips): the drag must complete, a cross-axis swipe over it must scroll the page, and a drag along its axis must move the control. Screenshots verify layout, never a gesture; say what produced the evidence.
- Test on real devices; emulation misses touch, CPU, keyboard, and browser chrome. Include an older, cheaper phone.

## Performance basics
Find the actual bottleneck, fix it, measure before and after. Don't optimize what isn't slow; fix the biggest problem first.

- Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1; 16ms per frame (60fps).
- Animate `transform` and `opacity` for movement. Don't casually animate `width`, `height`, `top`, `left`, margins. Blur, filters, masks, and shadows are fine when they earn it; keep the painted area small and isolated.
- `will-change` sparingly, only for known expensive work.
- Long lists: virtualize (1,000+ rows: don't render directly).
- Don't load everything: paginate APIs, request only needed fields.
- Lazy-load heavy, non-critical components and below-fold media; never lazy-load above-the-fold content.
- Images: right-sized for display, modern formats, 80-85% quality is usually imperceptible; reserve their space (dimensions or `aspect-ratio`).
- Fonts: only the weights used; subset where possible.
- Don't inject content above existing content (layout shift).
- Minimize re-renders; memoize expensive components and computations; debounce or throttle expensive handlers.
- Optimistic UI for slow round-trips.
- Measure on real, slower devices and throttled networks, not fast desktop Chrome.

## Redesigning without losing the product
Scan, diagnose, fix. Work with the existing stack; improve what's there, don't rewrite.

- Start from the inventory: every feature and signature element defaults to keep. The audit below hunts generic patterns, it never overrides the project's foundations.
- Don't migrate frameworks or styling libraries. Check the dependency file before importing anything, and the Tailwind version (v3 vs v4) before touching config.
- Small, reviewable changes; test after each.
- Fix order (impact vs risk): type, color cleanup, hover and press states, layout and spacing, generic components, loading/empty/error states, final type and spacing polish.

Generic patterns worth replacing (when foundations allow):
- Purple/blue "AI gradient"; several accents; mixed warm and cool grays.
- Three equal feature cards in a row; everything centered and symmetric; equal heights forced on uneven content; uniform radius everywhere.
- Generic card (border + shadow + white). Always one filled plus one ghost button: add text links or a tertiary style.
- Modals for simple actions: prefer inline editing, slide-overs, expanding sections.
- Pill "New"/"Beta" badges, accordion FAQs, 3-card testimonial carousels, sun/moon toggle, 4-column footer link farms.
- Cliche icon metaphors (rocket for launch, shield for security); mixed stroke widths: standardize one.
- Arbitrary z-index like 9999: use a z-index scale. Inline styles mixed with classes: move into the styling system.

Missing states and dead ends to add:
- Skeletons shaped like the layout instead of generic spinners; a composed empty state; inline form errors (never `window.alert()`).
- Press feedback (`scale(0.98)` or `translateY(1px)`); hover states where hover exists.
- Active item marked in navigation; a way back from every page; links to `#` either made real or visibly disabled.
- Client-side validation; a branded 404; favicon; title/description/og meta; privacy and terms links.

Content: realistic, specific data (47.2%, not 50%); no Lorem Ipsum, "John Doe", or "Acme"; no "Elevate", "Seamless", "Unleash"; no exclamation marks on success; direct errors, not "Oops!". Copy follows the project's voice (`ui-copy`).

## Choosing UI libraries
- Identify the task, not the library named. Check `package.json` first: if a listed library is installed, use it; if a competitor is, flag it but don't churn the dependency unasked.
- Recommend one library, not a menu. If the task isn't on the list, say you've left it.

| Task | Pick |
|---|---|
| Unstyled primitives (dialog, popover, menu, select) | base-ui |
| Command menu | cmdk |
| Toasts | Sonner |
| OTP / code input | input-otp |
| Control panels / tweak GUIs | Leva (dialkit alt) |
| Springs, layout, enter/exit animation | motion (plain CSS for simple hover/fade) |
| Animated numbers | NumberFlow |
| Charts | recharts; Liveline only for live, time-scrolling data |
| Drag and drop | dnd kit |
| Long lists / big tables | Virtuoso |
| Shared state | zustand |
| Conditional classes | clsx; cva when a component has real variants |
| Theme switching without flash | next-themes |

Mismatches to catch: hand-rolled toasts; div dropdowns with manual focus handling; numbers animated by re-rendering text; 1,000+ rows rendered directly; prop-drilled shared state; nested className ternaries.

## Toasts (Sonner)
- One `<Toaster />`, mounted once at the root (Next.js: `layout.tsx`). A second one duplicates every toast; a conditional one drops them.
- `toast()` is client-only. From a server action, return the result and toast on the client.
- Calls: `toast('Title', { description })`; `toast.success/error/info/warning`; `toast.promise(p, { loading, success, error })` (success/error can be functions of the result); `toast.loading()` then update by id; `toast.custom((t) => ...)` for headless.
- Update: call again with the same `id` (`toast.success('Uploaded', { id })`). Persist: `duration: Infinity` (default 4000ms). Dismiss: `toast.dismiss(id)` or all.
- Action button closes the toast unless `onClick` calls `event.preventDefault()`. `onDismiss` (close/swipe) and `onAutoClose` (timeout) are separate.
- Styling ladder, climb only as needed: defaults (+ `richColors` for colored success/error) -> `toastOptions.style` -> `classNames` per part (each needs `!important`) -> headless `toast.custom()` wrapped in your own `toast()` helper. Many `!important`s means go headless. A design-system toast should be headless.
- `theme` defaults to `'light'` and ignores the OS: pass `theme="system"` or the resolved theme.
- Multiple toasters: give each an `id` and target with `toasterId`, or every toaster renders the toast.
- Fixes: toast behind a modal or clipped -> move the Toaster to the document root outside any transformed/overflow ancestor. Fires twice in dev -> StrictMode effect; fire from the handler or pass a stable `id`. Unstyled entirely -> import `sonner/dist/styles.css`. Stuck loading -> the promise never settles. Edge spacing: `offset` (default 32px) and `mobileOffset` (<600px, default 16px).
