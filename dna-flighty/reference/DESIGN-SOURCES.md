# Flighty: what its makers have said about design

Researched 2026-10-31. Paraphrased; at most one short quote per source.

**Tags**
- `first-party`: Flighty's own pages, or Ryan Jones's words (his posts, a transcript, or quotes attributed to him in an article).
- `third-party`: anyone else's words, including narration in Apple's articles.

**How far to trust this**
- Pages were mostly read through a summarising fetch tool, not line by line. The two X posts were read directly. Recheck any quote against the source before reusing it word for word.
- Dates matter: most of the design reasoning is from 2022 to 2023. The newest long interviews (Stratechery 2025, Layovers 2026) could not be read.

## Verdict on the two recalled claims

| Claim | Verdict | Evidence |
|---|---|---|
| Built to work like a departure board | **Verified, with limits.** | Jones says it about the Dynamic Island and Live Activities, and offers boards as a guide: one line per flight. Nothing found says the whole app was designed as a board. |
| "Boring" reliable design | **Half verified; reword it.** | The real phrase is "almost boringly obvious", and it is about clarity under stress. He does not say "boring" about reliability. Accuracy and trust are a separate point (P4). |

## 1. Principles

**P1. It should feel obvious, because travel is stressful.** The app should work so well that it seems almost too obvious to mention.
- Ryan Jones: "almost boringly obvious". `first-party`
- https://developer.apple.com/news/?id=970ncww4 (Behind the Design, 2023-06-05)

**P2. Borrow from the airport; don't invent.** Airport signage is the "real-world analogy". Jones calls the one-line-per-flight board a good guide, since airports spent about 50 years working out what matters most.
- Ryan Jones, same Apple article. `first-party`
- Before departure, the Dynamic Island works "like a departure sign at a big airport". `first-party` https://developer.apple.com/news/?id=mis6swzt (Spotlight on: The Dynamic Island, 2022-10-28)
- Jones's product name for it: "your personal flight status board". `first-party` https://x.com/rjonesy/status/1584613473962455040
- Apple's award page also credits the familiar airport signage conventions. `third-party` https://developer.apple.com/design/awards/2023/

**P3. Be at its best when things go wrong.** Jones says the app must shine when travel breaks down, and that Flighty is at its best in irregular operations (the industry term for disrupted travel). The design had to allow for every storm, equipment fault and late plane.
- Ryan Jones, both Apple articles above. `first-party`

**P4. Trust is the product; there are no second chances.** A wrong delay time can mean the user deletes the app. For the same reason, Flighty could not launch as a bare-bones first version, so it took a long time to reach a full-featured release.
- Ryan Jones. `first-party` https://launchedfm.com/episode/79-flighty-ryan-jones (Launched ep. 79, transcript)

**P5. Keep the information there, so people stop checking.** The comfort of information always being there replaces repeatedly looking up gates and seats, and replaces listening out for notifications. Jones says this lowers travel anxiety.
- Ryan Jones, both Apple articles above. `first-party`

**P6. Show what matters now; drop what's finished.** Content changes with the stage of the flight. The departure gate goes away once the plane has left.
- Ryan Jones and Apple's narration. `first-party` https://developer.apple.com/news/?id=mis6swzt

**P7. Assume the connection will die.** Jones says to assume that once someone takes off, you won't see them again until they land. Flighty prepares to go offline at pushback.
- Ryan Jones. `first-party` https://developer.apple.com/news/?id=mis6swzt

**P8. Simple is the hard part.** Jones: "simple means very, very difficult".
- `first-party` https://share.transistor.fm/s/4c633044/transcript.txt (Launched ep. 79 transcript file)

**P9. Take on the details so the traveller doesn't have to.** The founders' manifesto, signed Ryan, Markus and Francesc: "We'll worry about the details." It also says they obsess over the little things and want to keep the wonder of flying.
- `first-party` https://www.flighty.com/about

**P10. Professional data, in a form people understand.** Flighty's phrase is "pilot-grade data". The press page calls the interface comforting and easy to use.
- `first-party` https://flighty.com/ and https://flighty.com/press

**P11. Decide as users of the product.** The test: if we were users of Flighty, what would we want? Jones says this now drives whether to ship new platform features on day one.
- Ryan Jones. `first-party` https://launchedfm.com/episode/79-flighty-ryan-jones

**P12. Make things worth sharing.** Build features people want to pass on. The Passport had to look good enough that sharing it doesn't feel like bragging.
- Ryan Jones. `first-party` https://launchedfm.com/episode/79-flighty-ryan-jones
- Recap: `third-party` https://www.revenuecat.com/blog/growth/ryan-jones-flighty-launched-podcast-2025

## 2. Concrete decisions

### Live Activities and Dynamic Island
- **Layout by stage:** before departure, one line per flight, board-style. After pushback, progress bars and counters. `first-party` (Apple Spotlight)
- **Smallest size:** a simple circular chart of the flight's duration, which needs no live connection. Apple's narration, with Jones quoted around it. `first-party` (Apple Spotlight, Behind the Design)
- **Launch contents:** delays, gate changes, status, countdown, go to gate. `first-party` https://x.com/rjonesy/status/1584607888731164673
- **Why it fits:** Jones: "really shines in time-sensitive stressful moments". `first-party` https://techcrunch.com/2022/09/08/flightys-app-will-bring-flight-tracking-and-more-to-your-ios-16-lock-screen/
- **Airlines copied it:** Jones says several airlines later followed its interaction and visual approach. His claim, not independently checked. `first-party` (Launched)

### Lock Screen and widgets
- **Context states:** 15 states surface the right detail at the right time, such as terminal, gate, boarding time, check-in code, seat and baggage claim, across all three widget sizes. Reported by TechCrunch from Flighty. `first-party` (via press)
- **No unlock needed:** key details can be read without opening the app. `first-party` (via TechCrunch)
- **Offline in flight:** the progress bar shows time to landing with no Wi-Fi. `first-party` (via TechCrunch, and the X launch post)

### Color
- **Only one first-party statement found:** the launch post lists the Always-On Display as "glanceable colors". `first-party` https://x.com/rjonesy/status/1584607888731164673
- **No maker has explained the palette** in anything I could read. Apple's Behind the Design article does not discuss color.
- **Status colors, third-party readings only:**
  - Green on time, amber delayed, red cancelled, from the marketing site's CSS: `#039855`, `#F79009`, `#D92D20`. Not the app. `third-party` https://github.com/educlopez/design-bites/blob/main/design-mds/flighty.com/DESIGN.md
  - A similar set with blue for boarding, from the author's own Swift code. A reconstruction, not Flighty's values. `third-party` https://blakecrosley.com/guides/design/flighty
  - Status is shown mainly through text color, which becomes unreadable under StandBy's red night tint. `third-party` https://joshncampbell.com/flighty-on-standby-night-mode-indicators-concept/
- **Brand color:** Mobbin lists a blue `#0099ff` and black. `third-party` https://mobbin.com/colors/brand/flighty-llc

### Type
- **No first-party statement found.** The point sizes on blakecrosley.com are that author's code. Don't treat them as Flighty's spec. `third-party`

### The map
- **Almost nothing from the makers.** Apple's narration credits detailed live maps, and Friends' Flights shows others' trips on a globe. No reasoning found. `third-party` (Apple Behind the Design)

### Notifications
- **Speed:** alerts are presented as the fastest available, ahead of airline announcements and gate agents. `first-party` https://flighty.com/
- **Timing:** the manifesto stresses timely alerts, citing gate changes airlines fail to announce. `first-party` https://www.flighty.com/about
- **Prediction:** tracks the inbound plane from 25 hours out, and predicts delays up to 6 hours before the airline. `first-party` https://flighty.com/
- **Origin:** a six-hour delay in Fort Lauderdale in 2018, when Jones saw the data to predict it was already public. `first-party` https://simpleflying.com/flighty-app-interview/
- **Less listening out:** Jones contrasts the Dynamic Island with always having to listen for alerts. `first-party` (Apple Spotlight)

### Airport boards as rival as well as model
- The homepage says: "Never stop and stare at a flight board again." The manifesto calls boards unreliable. `first-party` https://flighty.com/ and https://www.flighty.com/about

### Process
- **20 ideas:** the team makes 20 design ideas in the concept phase, sized to fit one sheet of paper, and avoids existing asset libraries because they invite old ideas. Jones says ideas past the sixth or seventh that seem likely to look bad often work. `first-party` (Apple Behind the Design)
- **Beta:** pilots logged events with precise timestamps during beta. `first-party` (Simple Flying). The beta ran 18 months with frequent flyers and pilots. `third-party` https://mercury.com/blog/flighty-app-case-study
- **Passport:** designer Markus pushed the concept and the holographic look. (The Launched transcript summary spells it "Marcus"; the manifesto signs "Markus".) A 2022 Wrapped-style recap failed; the 2023 Passport worked. The blacklight detail took months. `first-party` (Launched); the months detail is `third-party` (RevenueCat)
- **Icon:** BasicAppleGuy's flip-board icon was a personal project that the team then invited for v2.9. It is an alternate icon drawn from airport boards, not a Flighty brief. `third-party` https://basicappleguy.com/basicappleblog/boardy

### What they refuse to do
All from Jones, `first-party`, in Launched unless noted.
- **Paid acquisition:** tried three times; it pulled attention from the product and roughly broke even.
- **Basic App Store search ads:** they don't run them. Apple Search Ads goes through a specialist (`third-party` recap, RevenueCat).
- **Unclear A/B tests:** tests only count if the result is a clear win; otherwise they use their own judgment.
- **Bare-bones launch:** Jones says Flighty can't work as a minimum version.
- **Ads in the free tier:** coverage describes the free tier as ad-free. `third-party` (9to5Mac, not opened)

**Searched for, not found:** any statement refusing a design pattern, such as "we never do X" on screen. Their stated refusals are about growth and process, not interface.

## 3. Inference (mine, not their words)

- **The board is a format, not a data source.** They copy its one-line layout while calling physical boards unreliable. So: borrow how it reads, and beat it on truth.
- **Calm is the goal behind most principles.** P1, P3, P5 and P6 all target travel stress. Jones never states that as a single rule.
- **Disruption is the design's main case, not its edge case.** Follows from P3, plus the offline planning in P7.
- **Status color probably works as the main signal.** Based on "glanceable colors" and third-party observations; no maker confirms it.

## Treat with caution

- **"Designed so you can use it with one hand":** credited to Jones with no source at https://theplaceswherewego.com/review-flighty-app-for-surviving-air-travel/. Not in the Apple article or the Launched summary. Discard unless found elsewhere.
- **"15 smart states" enum and full design tokens on blakecrosley.com:** that author's model, not a Flighty spec. Only the number 15 traces to TechCrunch.
- **Compact "tiny island" kept useful because passengers listen to audio in flight:** appeared only in a search summary. Two tries could not find the post. Discard.
- **Fort Lauderdale delay length:** six hours in Simple Flying; another review says four.
- **Quote wording:** two summaries of Launched gave different wordings of his product-versus-marketing line, so it is paraphrased here.
- **flightyflowsite.vercel.app:** came up in search, looks like an unofficial copy. Not used.

## 4. Every source checked

### Read: first-party (11)
| Source | Note |
|---|---|
| https://developer.apple.com/news/?id=970ncww4 | Strongest. Jones quoted; narration is Apple's |
| https://developer.apple.com/news/?id=mis6swzt | Strongest on the Dynamic Island |
| https://launchedfm.com/episode/79-flighty-ryan-jones | Transcript; also https://share.transistor.fm/s/4c633044/transcript.txt |
| https://flighty.com/ | Homepage. flighty.app redirects via flightyapp.com to here |
| https://www.flighty.com/about | Manifesto |
| https://flighty.com/press | Short; no linked interviews or brand guidance |
| https://flighty.com/careers | Culture only; no open roles |
| https://x.com/rjonesy/status/1584613473962455040 | "Status board" post |
| https://x.com/rjonesy/status/1584607888731164673 | Launch list |
| https://techcrunch.com/2022/09/08/flightys-app-will-bring-flight-tracking-and-more-to-your-ios-16-lock-screen/ | Jones quoted |
| https://simpleflying.com/flighty-app-interview/ | Jones quoted; mostly data, not design |

### Read: third-party
- https://developer.apple.com/design/awards/2023/
- https://www.apple.com/newsroom/2023/06/apple-announces-winners-of-the-2023-apple-design-awards/
- https://apps.apple.com/us/iphone/story/id1477246546 (App Store story; origin quote, no design)
- https://www.revenuecat.com/blog/growth/ryan-jones-flighty-launched-podcast-2025 (Launched recap)
- https://mercury.com/blog/flighty-app-case-study
- https://blakecrosley.com/guides/design/flighty (no first-party citations for its specifics)
- https://github.com/educlopez/design-bites/blob/main/design-mds/flighty.com/DESIGN.md (marketing site only)
- https://joshncampbell.com/flighty-on-standby-night-mode-indicators-concept/
- https://basicappleguy.com/basicappleblog/boardy
- https://theplaceswherewego.com/review-flighty-app-for-surviving-air-travel/
- https://playpodcasts.com/podcasts/airplane-geeks-podcast/722-flight-tracking-with-flighty (notes only)

### Seen in search only, not opened
- https://mobbin.com/colors/brand/flighty-llc
- https://9to5mac.com/2023/07/24/flighty-3-0-track-friends-flights/
- https://9to5mac.com/2022/10/24/flighty-dynamic-island-iphone-live-activities/
- https://upgradedpoints.com/news/flighty-improvements-2025/
- https://en.wikipedia.org/wiki/Flighty
- https://www.producthunt.com/products/flighty/makers
- https://60fps.design/apps/flighty

### Dead ends: promising but not reachable
| Source | Why | Worth a person's time? |
|---|---|---|
| https://stratechery.com/2025/an-interview-with-ryan-jones-about-flighty-and-building-apps-in-2025/ | Paywalled; teaser only. Also https://www.youtube.com/watch?v=CPwnCVcboCs, not opened | Yes |
| https://layovers.to/episodes/155-flighty-flighty-reinventing-flight-tracking-and-the-air-travel-experience-with-ryan-jones-founder-ceo-at-flighty | Two hours, no transcript. Notes list design and what to show at each stage | Yes, the best lead |
| https://www.castfox.net/podcast/sources-with-alex-heath-7488327/episode/a-top-iphone-app-developer-reacts-to-apples-new-siri-2434778 | Notes only; asks whether craft still matters | Maybe |
| https://thrifty-traveler-podcast.simplecast.com/episodes/why-flighty-is-our-favorite-travel-app-with-ceo-ryan-jones-np_O71jd | Page came back empty. Video: https://www.youtube.com/watch?v=iKl8ey3C2yg, not opened | Maybe |
| https://play.anghami.com/episode/105985364 | Sub Club episode; page failed to load | Maybe |
| https://www.youtube.com/watch?v=2IwxyP363Yw | Title only; channel unknown | Maybe |
| https://www.inc.com/jason-aten/the-most-popular-iphone-travel-app-is-an-overnight-success-12-years-in-the-making/91270108 | HTTP 403 | Low |
| https://www.traveldailynews.com/technology/flighty-wins-apple-design-award/ | HTTP 403 | Low |
| https://metacast.app/podcast/launched/6Q1xTK5r/79-flighty-ryan-jones/a0vSU935 | HTTP 403; same episode | No |
| https://radioandpodcast.com/podcast/layovers-air-travel-podcast/episode/155-flighty-flighty-reinventing-flight-tracking-and-the-air-travel-ceo-19526970 | Listing only | No |
| https://flighty.com/careers/designer | HTTP 404; a search snippet mentioned a Senior Product Designer role | No |

### Searched for, nothing found
- **Shows:** Lenny's Podcast, Design Details, Under the Radar, Layers, Figma Config. One combined search only, so absence is likely, not proven.
- **Flighty blog or changelog:** none linked from the homepage or press page. App Store release notes were not reviewed.
- **Articles or talks by Flighty's designers:** none found. Markus is known only through Jones and the manifesto.
