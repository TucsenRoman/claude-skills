# Stress lab

The real component (or a faithful mock of it) with dials that push its data to the worst case, so the user finds the breaking point live instead of reading about it. Used by `ui-stress`.

- **Dials for the data, not the design:** text length (name, label, title) from 1 character to absurd; item count from 0 to thousands; numbers from 0 to 9-figure and negative; missing fields on/off; emoji, non-Latin and right-to-left text on/off; long unbroken strings (emails, URLs, IDs) on/off; slow-loading and error states.
- Use the test values from `ui-stress`'s guide, not random text, so every setting is a realistic worst case.
- **Width control:** phone (narrowest the project supports), phone, tablet, desktop; the narrowest is where most things break.
- **Break markers:** outline anything that overflows its box, wraps where it shouldn't, or gets cut off, and list them under the controls ("Title overflows at 46 characters").
- **Settings box:** the exact data that broke it, to paste back as a test case.
- Serve it over HTTP like the playground.
