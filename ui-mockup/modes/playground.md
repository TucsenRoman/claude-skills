# Playground

One live mock with a control per value, for when the user is hunting for numbers (sizes, overlaps, thresholds, counts) rather than choosing between finished options.

- **Controls:** a slider or toggle per value, a live readout, and an (i) button with a one-line explanation of what it does.
- **Test-data control:** include one that reaches the worst case (for example "N items on every row").
- **Settings box:** show the current values as text the user can paste back; when they pick, make their numbers the defaults.
- **Rebuild the model** when their answers reveal a better rule (for example "fit to width with a minimum" instead of a fixed scale).
- **Serve it over HTTP.** Viewers often block scripts in files opened from disk. Run a tiny local node server in the scratch folder and open it in the browser pane. Keep the mock self-contained: inline the tokens, no required CDN script, guard optional ones.
- **Real data through a proxy:** when the mock needs data the browser can't read cross-origin (images, APIs), add a same-origin proxy route to that server so it shows the real behavior, not a stand-in.
