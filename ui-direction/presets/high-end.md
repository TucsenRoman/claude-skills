# Preset: high-end (agency finish)

Source: Taste high-end-visual-design (MIT). Condensed; SKILL.md banned looks and the shared GUIDE.md rules still apply. The source's "Ethereal Glass" (glowing purple orbs, blurred black cards) and "Editorial Luxury" (cream plus serif) archetypes are omitted: both land in the user's banned looks.

Expensive-feeling, physical, machined: Soft Structuralism. Silver-grey or white grounds, massive bold grotesk, airy floating components, very diffused ambient shadows.

## Type
- Geist, Clash Display, Plus Jakarta Sans (or a face with more point of view, per GUIDE.md). Not Inter, Roboto, Arial, Open Sans, Helvetica.
- Display sizes massive; the layout breathes around them.

## Color and surface
- Silver-grey or white background. No harsh dark shadows (`shadow-md`, `rgba(0,0,0,0.3)`) and no generic 1px gray borders: hairlines are `ring-1 ring-black/5` or `white/10`.
- Optional grain `opacity-[0.03]` on a fixed, pointer-events-none layer.

## Spacing and layout
- Sections `py-24` to `py-40`. Nothing below `py-24`.
- Layout archetypes (pick one): asymmetric bento (`col-span-8 row-span-2` beside stacked `col-span-4`); Z-axis cascade (cards overlapping like physical objects, some at `-2deg`/`3deg`, flattened below 768px); editorial split (huge type on the left half, scrollable image pills or staggered cards on the right).
- No edge-to-edge sticky navbar; no symmetric 3-column grid without large gaps.

## Signature moves
- **Double bezel:** never set a card flat on the ground. Outer shell (`bg-black/5`, hairline ring, `p-1.5`/`p-2`, `rounded-[2rem]`) holding an inner core with its own fill, inner highlight `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`, and concentric radius `rounded-[calc(2rem-0.375rem)]`.
- **Button in button:** pill CTA (`rounded-full px-6 py-3`); a trailing arrow sits in its own circle (`w-8 h-8 rounded-full bg-black/5`) flush right. On hover the circle shifts `translate-x-1 -translate-y-[1px]` and scales 105; the button presses to `scale-[0.98]`.
- **Island nav:** a floating pill detached from the top (`mt-6 mx-auto w-max rounded-full`). The hamburger lines rotate into an X; the menu opens full-screen with links sliding up from `translate-y-12 opacity-0`, staggered 100/150/200ms. Blur only on this fixed nav and overlay, nowhere else.
- Icons ultra-light (Phosphor Light, Remix Line), never thick Lucide, FontAwesome, Material.
- Eyebrow pills are allowed only within GUIDE.md's one-per-three-sections cap.

## Motion
- Everything springs: `duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`. Never `linear` or `ease-in-out`, never instant state swaps.
- Scroll entry: `translate-y-16 blur-md opacity-0` to rest over 800ms+, via IntersectionObserver or `whileInView`.

## Test
- Reads as a premium agency build, not a template with nice fonts.
