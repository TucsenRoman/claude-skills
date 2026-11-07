---
name: ui-art
description: Get hero art, illustrations, backgrounds and other imagery from an image generator (ChatGPT in the user's browser) instead of drawing it by hand in SVG or CSS. Use when a screen, landing page, onboarding, empty state or store listing needs art or imagery; when the user says "consult chatgpt", "get chatgpt to make it", "generate an image", "make art for this", or calls hand-drawn art cheap; or when ui-mockup needs imagery no photo, icon set or approved art covers.
---

# ui-art

Art comes from an image generator, not from Claude drawing shapes (user, 2026-10-24: "consult chatgpt again for imagery"). Claude writes the brief, runs it, judges the results and fits the pick into the product.

## 1. Check what already exists
- Reuse first: the project's approved art (brand or widget book paths, logo and icon sets), then real photos (Unsplash, as `ui-mockup` says). Generate only when neither fits.
- Load `ui-foundations` for the palette, mood and bans. The brand book wins over taste.

## 2. Write the brief
One prompt per idea, 2 to 3 ideas that differ in concept, not tweaks. Each prompt states:
- what it's for and where it sits (hero behind the headline, empty-state spot, store screenshot background), and the exact aspect ratio and size;
- the subject, style and mood in plain words, with the project's colors as hex values;
- what stays clear (space for text, the safe area, the phone mock), and a plain background or transparency when it will be cut out;
- no text, logos or brand marks in the image unless asked (generators misspell, and other brands' marks are off limits).

Show the prompts to the user in one line each before running them only if the art is for something public (landing, store listing); otherwise just run them.

## 3. Generate
- Use ChatGPT in the user's Chrome (Claude in Chrome), where they're signed in; the built-in browser pane only if Chrome isn't available. If it asks for a sign-in, ask the user to sign in, then carry on.
- One new chat per idea, so ideas don't bleed into each other. Ask for revisions in the same chat.
- Saving an image is a download: name the file and size and get a yes before the first one in a session.
- Save to the project's scratchpad, not the repo, until the user picks.

## 4. Show and pick
- Put the results on a `ui-mockup` board inside the real screen (the art in place, with the real headline and UI over it), not as loose images.
- One sentence per option. Ask for a pick, plus anything to carry from the others.
- Iterate in the picked option's chat until it's right. Never "fix" generated art by painting over it in SVG.

## 5. Land it
- Only the pick goes into the repo, named per the project's rules (`words-with-hyphens`), compressed for the platform (WebP or AVIF on web; PNG or WebP at @2x/@3x for Expo).
- Note in the brand book or the doc that owns the screen what the art is and the prompt that made it, so it can be redone in the same style.
- Delete the other downloads from the scratchpad once the pick lands.
