# Motion lab

A live mock for judging how something moves: a sheet opening, a swipe, a press, a count-up. Motion can't be judged from a still, so this is the mode for `ui-feel` work.

- **Trigger it:** a button (or the real gesture, where the mock supports it) that plays the interaction, plus Replay. For gestures, make the element draggable so the user can feel the follow, the release, and the settle.
- **Dials for the motion values:** duration, easing (preset curves plus a custom cubic-bezier), spring (damping ratio and duration, or stiffness and damping), distance, stagger, delay. Same rules as the playground: a live readout, an (i) per control, a settings box to paste back, and the user's pick becomes the default.
- **Slow motion:** a 1x / 0.5x / 0.25x switch that scales every duration, so easing and overshoot are visible.
- **A/B:** two copies side by side, triggered together, each with its own settings, for "which feels better".
- **Real frequency:** a "repeat 10x" control for interactions people do all day (taps, toggles, tab switches). Motion that's fine once can be tiring the tenth time.
- **For async review:** capture a frame strip (screenshots at fixed intervals laid out in a row, through the board tool) or a short recording. On native, record the emulator or device (`adb shell screenrecord`) and send the clip or frames.
- Build it from the project's motion tokens and the values in `ui-feel`'s guide. Serve it over HTTP like the playground.
- The emulator and a slow dev machine distort timing. Use the lab to compare and tune; confirm the final feel on a real phone.
