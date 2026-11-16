# Notion design sources

Checked 2026-10-31. Everything is paraphrased unless in quotation marks. At most one direct quote per source.

Tags:
- `first-party`: Notion's own page, or a Notion person's words in a transcript or a named interview.
- `first-party, reported`: a Notion person's words as quoted or relayed by someone else's article.
- `third-party`: someone outside Notion describing it.

## How far to trust this

**Solid (their own words, read in full or close to it):**
- Blocks as the single unit. Data model post, help pages, Zhao on Decoder.
- LEGO and "bricks, not features" as the way they fight bloat. Decoder transcript, which I read in full.
- The app avoids bright colors. One sentence in Notion's brand campaign post.
- Muradov's role and the move from black and white to color in advertising.

**Thin, so do not overstate:**
- **Neutral so users' content carries the color: I found no Notion person saying this.** Notion says it avoids bright colors in the app, but gives no reason. The "content carries the color" reason comes only from third-party writers. See Inference.
- **Hiding controls until hover: Notion documents the behavior but I found no stated reason.** "Progressive disclosure" is a term from third-party writers, not one I found Notion using.
- **Icons and covers: help pages say what they do and why they help a reader. I found no designer explaining the choices.**
- **Motion: I found nothing first-party at all.**
- **The 2023-2025 design updates: I found no Notion post explaining a visual redesign.** The nearest is the Config 2026 talk, which I could not watch.

**How the reading was done:**
- Most pages were read through a summarising fetch tool, so quotes other than Decoder's came through it. Check the wording against the URL before publishing any quote.
- I read the Decoder transcript and the Community Brand Guidelines directly as page text.
- Old statements may be out of date. Dates are given so you can judge.

**One practical warning:** Notion's Community Brand Guidelines prohibit copying its look and feel or imitating its visual identity in your own marks or product. That text concerns people using Notion's brand elements. For this exercise, borrow the thinking and do not reuse its marks or illustrations. This is not legal advice.

## Principles in plain words

### 1. One unit for everything
Text, images, list items, database rows and whole pages are all blocks. Each has an ID, a type and properties, plus pointers to its contents and parent.
- Jake Teton-Landis, Notion engineering, 2021: "Everything you see in Notion is a block." https://www.notion.com/blog/data-model-behind-notion `first-party`
- Help center: "bottomless bin of building blocks". https://www.notion.com/help/what-is-a-block `first-party`

### 2. Add a brick, not a feature
When asked about bloat, Zhao said more power does need more things. The classic route adds a fixed feature; they try to add a piece that works for many jobs. He says about 20 to 30 pieces sit at the core of knowledge work, and they try to make each friendly and hand it over alone or in a package.
- Ivan Zhao, Decoder, 2025-08-11. https://www.theverge.com/decoder-podcast-with-nilay-patel/756736/notion-ceo-ivan-zhao-productivity-software-design-ai-interview `first-party`

### 3. A new piece can damage the whole, so think system first
- Ivan Zhao, fireside chat recap, 2025-08-01: "When you add a new LEGO brick, it might pollute the whole thing". https://designerfounders.substack.com/p/ivan-zhao-notion `first-party, reported`

### 4. Tools you can reshape, not sealed apps
Zhao's image is hard plastic against LEGO, and an avocado cutter against a kitchen knife: the knife gains from the user's technique. The lineage he names is the computing pioneers of the 1960s and 70s.
- Decoder: "each application is kind of like a mini-prison of computing". Same URL as 2. `first-party`
- Ness Labs Q&A, about 2021 (date inferred): "Most software these days are like toasters." Calls Engelbart Notion's patron saint. https://nesslabs.com/notion-featured-tool `first-party`
- About page names Kay, Engelbart and Nelson. https://www.notion.com/about `first-party`
- Station F interview, 2021: "We want to make Notion so powerful that everyone can make their own software." https://stationf.co/news/interview-with-ivan-zhao-co-founder-and-ceo-of-notion/ `first-party`

### 5. Bricks for builders, boxes for everyone else
A blank page intimidates people. Zhao's answer is ready-made "boxes" that still come apart, so people can change the parts they dislike. He accepts that not everyone is a builder: builders set it up for their teammates.
- Ivan Zhao, Decoder. Same URL as 2. `first-party`
- Ness Labs: templates as LEGO starter kits. Same URL as 4. `first-party`
- Lenny's Podcast page, 2025-03-06, editor's summary: start simple, add advanced features gradually. https://www.lennysnewsletter.com/p/inside-notion-ivan-zhao `third-party` summary of a first-party interview; no transcript visible to me.

### 6. How it feels is part of how it works
Zhao compares this to people caring how a hammer feels or a knife cuts.
- Ivan Zhao, Figma blog, 2019: "Design means everything here". https://figma.com/blog/design-on-a-deadline-how-notion-pulled-itself-back-from-the-brink-of-failure/ `first-party, reported`
- Ivan Zhao, Possible, about 2026 (AI transcript): keeps beautiful, comfortable objects like Eames chairs around so the team designs timeless software, and wants tools to be fun. Quote: "Software UI is kind of just like a language." Conventions are learned, and one company cannot easily change them. https://www.possible.fm/podcasts/ivan/ `first-party`
- Decoder: Kyoto's craft people as an inspiration, for caring about the work itself. Same URL as 2. `first-party`

### 7. Enduring, not novel
- Randy Hunt, Head of Design, 2024: the product should be enduring and inevitable, exciting yet "free of novelty". https://www.notion.com/blog/meet-randy `first-party`

### 8. Make the plain path great, and ignore the clever
Zhao is skeptical of clever design and pushes for stripping things down to the path most people take. His test is whether someone drunk could understand it, because real users are tired and distracted.
- Ivan Zhao, recap. Same URL as 3. `first-party, reported`
- **A real tension:** Hunt, in the same post as 7, says edge cases handled elegantly make the product feel right without the user feeling accommodated. Zhao says designers spend too much time on them. Both are Notion leaders. Treat it as open.

### 9. Try many, then choose
Zhao's philosophy is to go wild with variations, then test with teammates. He says taste can grow, including by studying typography. Past explorations are kept for new hires to read.
- Ivan Zhao, Figma blog. Same URL as 6. `first-party, reported`

### 10. Words come early
Hunt says concepts often begin as written descriptions of how something should look, behave and feel, and he ties that back to the editor.
- Same URL as 7. `first-party`

### 11. Speed and reliability count as design
- Randy Hunt, Design Week, 2025-07-07: calls these "invisible features". Only the opening was readable; the rest is paywalled. https://www.designweek.co.uk/a-lot-of-this-is-about-rituals-an-hour-with-notion-design-chief-randy-hunt/ `first-party`

### 12. Product and brand stay close
- Akshay Kothari, co-founder: "I think we've tried hard to keep them tight." He credits Zhao's personal involvement; the office is meant to feel like the product. https://www.knuckleup.co/episodes/akshay-kothari `first-party`

### 13. Primitives keep their value in the AI era
Simon Last says models and embeddings are new primitives, while databases, UI and permissions remain essential. Blocks form a tree with nesting rules. He thinks an empty chat box suits most users poorly, since they want specific problems solved.
- Simon Last, AI & I, 2024-11-07: "all the primitives still matter". https://every.to/podcast/transcript-of-how-notion-cofounder-simon-last-builds-ai-for-millions-of-users.md `first-party`
- Zhao's Dec 2025 essay is about AI as a new material and has no UI guidance. It ends on McLuhan's idea that tools shape us. https://www.notion.com/blog/steam-steel-and-infinite-minds-ai `first-party`

## Concrete decisions

### Color
- The app avoids bright colors; the ads add bold yellow, blue and red because black and white did not stand out in busy cities. Katie Chang's post, 2024-07-10: "we refrain from using bright colors within the Notion app". https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign `first-party`
- Original branding and illustrations were all black and white. Same post. `first-party`
- Users color their own content: text and background colors via the A menu or `/red`; callouts have backgrounds. https://www.notion.com/help/customize-and-style-your-content `first-party`
- High contrast mode added 2026-07-30. https://www.notion.com/releases/2026-07-30 `first-party`
- The office bans green furniture because the rest of the palette works once green is gone. This is about a room, not the UI. Zhao, recap, same URL as 3. `first-party, reported`
- Around Oct 2021, an unannounced brighter palette met community backlash and was revised several times. No Notion statement. https://redgregory.substack.com/p/notions-new-color-palette-a-rollercoaster `third-party`
- The brand uses no brand color, and the product has a 10-color palette for light and dark. No Notion source cited. https://designcompass.org/en/2025/01/20/notion/ `third-party`

### Type
- A page offers exactly three fonts: Default, Serif, Mono. Also a small text toggle. Same help URL as Color. `first-party`
- That is the only first-party type decision I found. No Notion explanation of the typefaces was found.
- Reported but not official, and conflicting: Inter on the website and Articulat CF for the wordmark (Design Compass, above); custom lettering for the wordmark (https://madegooddesigns.com/notion-font/, search snippet only); "Notion Sans" (fan pages; another blog says no such public typeface exists, https://www.designyourway.net/blog/what-font-does-notion-use/, snippet only); Lyon for marketing headings (snippet only, unconfirmed). All `third-party`.

### Icons
- 2019: the new-user home screen is minimal with a few icons that the writer links to Susan Kare; Zhao calls the feel very Windows 95. The Kare link is the writer's. Same URL as 6. `first-party, reported`
- Page icons can be emoji, Notion's icon set, or an upload, with 280 x 280 advised; uploads can become workspace emoji. Help page as above and https://www.notion.com/help/guides/page-icons-and-covers `first-party`
- The design system team standardized thousands of icons. See Config talk in Sources. `third-party` digest of a first-party talk.

### Illustration
- Roman Muradov drew the original illustrations when Notion had a few employees. He says the minimal, gestural style stood out against the vector art of the time, and people told him they came to Notion for it. Campaign post, above. `first-party`
- The 2024 campaign moved from distant, full-body scenes to close-ups of minds at work, with Picasso, Rube Goldberg and Saul Steinberg as references. Worked with the agency BUCK. Tagline "Think it. Make it." Same post. `first-party`
- Early on, Muradov hand-drew staff avatars, and the site used caricatures of the founders rather than photos. Kothari, same URL as 12. `first-party`
- Muradov teaches a Skillshare class with a Notion case study; only its listing surfaced. https://www.skillshare.com/en/classes/Brand-Illustration-Create-Unforgettable-Stylized-Brand-Imagery/1636459821 `first-party`, not watched.

### Layout and structure
- Indenting is structural: it changes which block holds another. Each block type shows its children its own way: lists indent, toggles hide, pages open. Data model post. `first-party`
- A block keeps its data when its type changes ("Turn into"). Data model post and what-is-a-block page. `first-party`
- Full width is an opt-in toggle. Same help URL as Color. `first-party`

### Revealing controls
Stated as behavior only, with no reason given:
- Top of page on hover: "Add icon", "Add cover". Over a cover: "Change cover". Over a block: `+` and `⋮⋮`. Help URL as above. `first-party`
- Inline database: "hidden until you hover over it". https://www.notion.com/help/intro-to-databases `first-party`
- `/` shows content types. What-is-a-block page. `first-party`
- Third-party naming of this as progressive disclosure: https://www.925studios.co/blog/notion-design-breakdown and https://blog.mikenjuki.com/i-used-notion-for-years-before-i-understood-why-it-worked/ `third-party`

### Customization
- Icons and covers make pages less plain, easier to scan and easier to find later: "turn a text-heavy document into something more digestible". Guide URL as above. `first-party`
- Covers: gallery, upload, link or Unsplash, 1,500 px wide or more. Help URL as above. `first-party`
- Build your own workspace from building blocks. About page. `first-party`

### Motion
Nothing first-party. The only numbers I saw (0.15s hover fade) are a third-party author's own sample code, not a measurement: https://blakecrosley.com/guides/design/notion `third-party`

### What they refuse
- Fixed, single-purpose features where a reusable piece would do. Decoder. `first-party`
- Software that dictates how people must work. Ness Labs. `first-party`
- Novelty. Hunt, same URL as 7. `first-party`
- Bright color in the app. Campaign post. `first-party`
- Separating engineering and design: "we refuse to treat engineering and design as separate jobs". https://www.notion.com/blog/meet-max-schoening-notion-cto `first-party`. Zhao also says on Decoder that they hire designers who can code.
- Copying its look and feel, for brand users. https://notion.notion.site/Community-Brand-Guidelines-18f5953621fe406f935cac095063462f `first-party`
- Not for the product: Kothari says Zhao often used his veto to hold out for great hires. Same URL as 12. `first-party`

## Inference (mine, not their words)

- **Neutral so content carries color.** Facts: the app avoids bright color, users get a color menu, every page can carry its own icon and cover. A fair reading is that the chrome stays quiet so the user's choices stand out. No Notion source I found says that is why.
- **Hiding controls keeps the page like a document.** Facts: controls appear on hover, and Zhao wants things stripped down. The link between them is mine.
- **Customization sits in small, bounded slots.** Three fonts, a fixed color menu, one icon, one cover. This resembles the "friendly bricks" idea, but I found no one saying the limits are deliberate.
- **The brand can be loud where the product is quiet.** The campaign post shows the split. The rule is my framing.
- **Few pieces, many uses is also a test.** A new element could be judged by how many jobs it does. This extends Zhao's words on bloat; it is not a stated Notion test.

## Claims I could not verify, do not repeat as fact

- **"Beauty isn't decoration...", and "does this make Notion more powerful without making it more complicated".** Founderboat attributes these ideas to the Decoder interview, but they are not in the Verge transcript I read, and its date differs. https://founderboat.pages.dev/interviews/2025-08-15-ivan-zhao-notion
- **"No final pixel-perfect design... 90% perfect" and "golden path".** From a search snippet only. The article I opened does not confirm these as his terms.
- **The Japanese concept "ma", and the blank-sheet-of-paper origin.** One blog, no citations. It also calls the drunk test internal heuristics; Zhao's drunk line is real (recap), the formal heuristic is not confirmed.
- **Software that recedes so people focus on thinking.** Search snippet only.
- **Hover as a stated Notion rule.** One Medium critique reportedly says so, and it blocked me (403).
- **Reverse-engineered token sheets** (shadcn.io, webdesignhot, open-design.ai, refero, colorpalettegenerator, ggprompts). Not opened, unofficial.

## Every source checked

### Read: first-party (21)
1. Campaign post, Chang, Muradov, Giampietro, 2024: see Color
2. Data model post, Teton-Landis, 2021: see 1
3. What is a block: see 1
4. About page: see 4
5. Customize and style help: see Color
6. Page icons and covers guide: see Icons
7. Intro to databases help: see Revealing controls
8. Welcome Randy, Kothari and Hunt, 2024: see 7
9. Meet Max Schoening: see Refuse
10. Steam, Steel, and Infinite Minds, Zhao, 2025: see 13
11. High contrast release, 2026: see Color
12. Community Brand Guidelines: see Refuse (rules on usage, no color or type specs)
13. Decoder, Zhao, read in full: see 2
14. Figma blog, Zhao quoted, 2019: see 6
15. Ness Labs Q&A, Zhao: see 4
16. Designer Founders recap, Zhao quoted, 2025: see 3
17. Possible, Zhao, AI transcript: see 6
18. AI & I, Simon Last, 2024: see 13
19. Knuckle Up, Kothari: see 12
20. Design Week, Hunt, partly paywalled: see 11
21. Station F, Zhao, 2021: see 4

### Read: third-party
- Lenny's Podcast page (editor's summary): see 5
- Design Compass, 925 Studios, Mike Njuki, Blake Crosley, Red Gregory: above. All have weak or no sourcing.
- Roger Wong on Decoder: https://rogerwong.me/2025/08/notion-ceo-ivan-zhao-wants-you-to-demand-better-from-your-tools (useful only for the original link)
- Growthmates page, Randy Hunt, 2024: https://www.growthmates.news/p/notion-method-how-to-do-more-with . Host's summary only, including a "Simplicity and Systems Thinking" chapter. Audio not heard.
- Design Systems News issue 220: https://news.design.systems/issues/220 . Digest of the Config talk.

### Could not reach or use
- **Config 2026 talk, "Everyone's still eating: building Notion's design system", Tamara Chu and Shauna Sapper.** Best unread source. Video page opened but no transcript: https://www.youtube.com/watch?v=u7_Qof3AJ1g . Session page returned 404 on fetch, though search showed it: team formed 2025, refactoring visual foundations, thousands of icons, moving to CSS variables. https://config.figma.com/san-francisco/session/9bbf68e9-0644-48df-9b6c-f4ad1827a146/
- **Dive Club, Ryo Lu, Feb 2024.** Show notes confirm a section on how Notion thinks about its design system, but no transcript. https://www.audioscrape.com/podcast/dive-club/episode/ryo-lu-systems-thinking-for-product-designers-52328 and https://www.youtube.com/watch?v=iZrh91dBb8Y (not opened)
- **Dialectic, Ryo Lu, Dec 2025.** Transcript page came back empty: https://dialectic.fm/ryo-lu
- **Notion logo page.** Did not render, even in the browser. A search snippet said mono black and white variants are for limited-color situations; treat as unconfirmed. https://notion.notion.site/Logos-6331ef1fc18241f8bae8a4b923b05ce4
- **Trademark guidelines.** Did not render. Snippet only: wordmark and black-and-white cube logo are key assets. https://notion.notion.site/Notion-Trademark-Usage-Guidelines-9826313c686a4f6e9d8a48347162714b
- **Metacast Decoder page and Medium critique:** 403. https://medium.com/@yolu.x0918/a-breakdown-of-notion-how-ui-design-pattern-facilitates-autonomy-cleanness-and-organization-84f918e1fa48
- **InVision interview:** redirects to Miro, gone. https://invisionapp.com/inside-design/ivan-zhou-notion-interview
- **Notion blog design topic page:** https://www.notion.com/blog/topic/design showed no design posts, only recent AI and engineering ones.
- **Releases page:** https://www.notion.com/releases showed only recent entries, so older visual changes were not checked.
- **Boorghani Decoder mirror:** 404. Replaced by the Verge original.
- **Lenny's Newsletter on Brian Lovin and Claude Code, 2026:** https://www.lennysnewsletter.com/p/i-havent-written-a-single-line-of . Reachable but nothing on design criteria.

### Looked for and not found
- Design Details episode with a Notion designer
- A Roman Muradov interview specifically about Notion, other than the campaign post
- Any Simon Last statement about visual design
- A published Notion color, type or motion spec
