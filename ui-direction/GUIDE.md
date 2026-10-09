# ui-direction guide: reading the brief, the unexpected

Sources: Taste skills (design-taste-frontend, gpt-taste; MIT), Impeccable new-work (Apache-2.0). Condensed and edited.

## 1. Read the brief before picking a look
- Signals, in order: page kind (landing, portfolio, pricing, editorial), the user's vibe words, references they named, audience, brand assets that already exist, quiet constraints (regulated, trust-first, kids). The audience picks the aesthetic, not your taste.
- State one line before building: "Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <aesthetic family>." Ask one question only when the read genuinely forks.
- Set three dials (1-10), and let them gate every choice below:

| Read | Variance | Motion | Density |
|---|---|---|---|
| Minimalist / calm / editorial / Linear-style | 5-6 | 3-4 | 2-3 |
| Premium consumer / Apple-like / brand | 7-8 | 5-7 | 3-4 |
| Agency / experimental / Awwwards | 9-10 | 8-10 | 3-4 |
| Default landing or marketing page | 7-9 | 6-8 | 3-5 |
| Trust-first / public sector / regulated | 3-4 | 2-3 | 4-5 |
| Redesign, preserve | match | +1 | match |
| Redesign, overhaul | +2 | +2 | match |

- What the dials mean:
  - Variance 1-3: symmetric grid, centered. 4-7: offset overlaps (`margin-top: -2rem`), mixed image ratios (4:3 beside 16:9). 8-10: masonry, `2fr 1fr 1fr` grids, big empty zones (`padding-left: 20vw`).
  - Motion 1-3: hover and press only. 4-7: fluid CSS transitions and staggered load-ins. 8-10: scroll-driven choreography, pinning, parallax.
  - Density 1-3: `py-32`-`py-48` sections. 4-7: `py-16`-`py-24`. 8-10: tight, 1px lines instead of cards.

## 2. Something unexpected (new-work process, opt-in)
Use only when the user asks for a bold or surprising identity. Extensions and new screens inside an established system inherit that system instead.

1. **Ground it.**
   - One sentence each: the product's unique mechanism, the audience's real scene, its cultural home, what this first surface must prove.
   - Name the page this category always ships and its predictable opposite; both are the rut and stay off the list.
   - If the brief paints its own picture (a metaphor, a product name), its literal reading gets at most one slot.
2. **Seven candidates** from the audience's world:
   - Visual systems, artifacts, places, rituals, notations, publications, identity programs, interfaces they read daily. A nameable abstract system (a poster school, a documentation standard) counts.
   - One line each on why it resonates and can carry the mechanism; order by resonance. Near-duplicates count once.
   - Span at least three material families; if more than three share one, dig further.
   - For app or reading surfaces, never borrow the tools the audience operates (a terminal handed to a working screen is a costume). For marketing, also ask what this would look like as a physical object, and what its world looked like before the web.
3. **Turn each into a direction:** a reusable visual world joined to a concrete first-viewport experience. Drop any that can't be truthful.
4. **Random draw.** Roll for the assigned direction among the candidates (don't just take the top of your list), then draw 1-3 challengers.
   - Fuse each challenger: it supplies form and system grammar, the product supplies every fact, clarity wins conflicts.
   - Judge it against the assigned direction on two axes only: audience identification and product clarity.
   - Verdict: wins (both axes; becomes the build candidate), competitive (one axis; stays a full alternate), declined (neither).
   - A declined challenger still donates one named discipline (a palette's total commitment, a grid's density courage), never its motifs. Write each raise as a line naming its donor.
5. **Present one hand:**
   - The assigned direction, fully committed, raises visible.
   - Winning and competitive challengers as full alternates (max 3); declined ones compact, with verdict and what was kept.
   - One "my pick" card if your top candidate wasn't drawn, with an honest risk line naming its familiarity. Never a ranked list.
   - A quiet standing exit: the category standard, played straight at full craft against 2-3 named peers. Never recommend it.
   - Re-roll in three registers the user picks: plain, safer, bolder. Re-roll yourself only on factual grounds, never taste. A user-pinned direction always beats the roll.
6. **Card anatomy:** thesis, palette, materials, first viewport, honest risk.
7. **Direction contract** before building (~150 words):
   - THESIS: the one idea this surface owns, and the category default it refuses.
   - OWN-WORLD: palette and component language, recognizable with all content removed.
   - STORY: what the visitor understands, believes, and does.
   - FIRST VIEWPORT: what is where, at what scale, where the primary action sits.
   - FORM: the chosen form and its rank on your list.
   - If a block reads like a mood, the direction isn't decided yet.
8. **Build with full commitment:**
   - Rebuild nav, buttons, inputs and links in the world's vocabulary; a stock component inside a committed form is a lapse.
   - The first viewport is a thesis, not a header. Memory test: what would a visitor describe an hour later? If the answer is a mood, it hasn't committed.
   - Prove, don't claim: show the mechanism working, with specifics a competitor couldn't paste in.
   - Build the named technique (canvas, WebGL, view transitions), not a static imitation of it.
   - Pace the scroll: a dense passage earns a quiet one; one spacing rhythm, more space above headings than below; end on a real close.
- **Self-check:**
  - AI work clusters on: cream ground plus contrast serif plus terracotta; near-black plus one neon; broadsheet hairlines plus italic serif plus tracked mono labels.
  - If someone could guess your look from the category alone, or from category plus avoidance, rework it.
  - For warm, bookish or family subjects, treat the first cream-and-serif palette as already spent; reach for the subject's saturated materials (book cloth, thread, jackets).
  - Negative constraints ("no hype") rule out devices, not energy.
