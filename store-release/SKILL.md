---
name: store-release
description: Take an Expo app from a finished change to "Submitted for Review" on the App Store — EAS production build, TestFlight, version match, screenshots at the accepted size, a listing mockup to approve, listing text, App Privacy and the other required forms, then submit. Use when the user says "get it live", "submit it", "ship to the App Store", "TestFlight", "make the app store page legit", "app store screenshots", or pastes an App Store Connect "Unable to Add for Review" list.
---

# store-release

Get the app from code to "Submitted for Review" without the user having to learn App Store Connect. One step at a time: say the next thing they do, wait, then the next. Never a wall of steps.

## 0. Which kind of build?
- **Trying changes on the phone:** a dev build plus a running dev server (tunnel). One build, then every change hot-reloads. Never start a store build for this.
- **Going live or TestFlight:** a production build. Only this skill's path.
Ask if it's unclear; a production build every time a change is tested is the thing the user wants to avoid.

## 1. Before the build
- The working tree is what gets packaged. Hold the build until in-progress work is merged or set aside.
- The app's version must match the App Store Connect version (an App Store Connect "1.0" needs app version 1.0.0). Bump it before the build, not after.
- Run every `eas` command from the app's folder (for example `mobile/`), never the repo root: the root creates stray app.json/eas.json files.
- Give the user the build command in its own block to run themselves:
  `npx eas-cli build -p ios --profile production --auto-submit`
- When the build is done, give the build page link only (the user taps Install). No QR codes.

## 2. Screenshots
- Mock them; don't ask the user to take them. Build each from the current approved screens (`ui-mockup`), in sample-data mode with no real bank or personal data, with a short headline per shot.
- Five shots, each selling one thing. Every shot matches today's app: an outdated screen can get flagged as misleading.
- Size: the required iPhone slot is "6.1 or 6.3 inch", which takes **1206 × 2622** or **1179 × 2556**. 1320 × 2868 is rejected there. Render 1206 × 2622 first.
- Real brand logos showing the user's own data are usually fine; say so in one line and have generic marks ready if review flags them.

## 3. The listing
- Show the whole App Store page as a phone mockup (icon, name, subtitle, screenshot carousel, description, privacy summary) for the user to approve before anything is pushed.
- Listing text lives in the project (for example `STORE.md` / `store.config.json`). Push it with `eas metadata:push` only after an OK; it stays private until approval.

## 4. Required forms (App Store Connect)
One form per message, with the exact clicks:
- **Content Rights:** "Yes, it contains third-party content" when the app shows data from other services (bank data, logos).
- **App Privacy:** derive the answers from the code, not a guess. Grep for every kind of data the app collects (email, name, phone, photos such as avatars, device IDs, diagnostics or crash reports, financial data) and list each with its use, whether it's linked to the user, and tracking (usually none). Show that list before the user fills the form.
- **Pricing** (Free unless told otherwise) and **Age Rating**.
- **Review notes:** how a reviewer gets in without real credentials (a sample-data mode or a demo account).
Then: attach the build to the version, **Add for Review**, **Submit**.

## 5. After
- Record the release state in the project's memory (app id, version, build number, what was answered), so the next release starts from it.
- Review usually takes 1–2 days. Recommend what's next in one line (for example a security pass, or production access for a third-party service).

## Rules
- The user signs in, types passwords, and taps Submit. Claude prepares, explains, and pushes text only after an OK.
- Credential prompts in EAS (Apple login, provisioning profiles) are the user's to answer; explain each choice in one line.
- Short replies: the next step only.
