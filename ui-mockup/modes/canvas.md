# Canvas

Every screen of a flow on one whiteboard the user can scroll and zoom, so they can critique by label and follow each path (user, 2026-11-02: "labeled each screen so I can ref them"; 2026-11-06: "a whiteboard kinda artifact… scrolling and zooming"; "connect the screens with labeled lines so I can track the flows").

## What's on it
- **Every screen in scope**, the finalized ones unless the user says otherwise, plus the edge cases (empty, error, locked, first run) so none get missed.
- **A short label on each screen**: a letter for the area and a number (G1, G2, L6). Same label every round, so feedback like "L6 is wrong" still points at the right screen. Status under it when it helps (approved, soft lock, open).
- **Labeled lines between screens.** An arrow from the thing you tap to the screen it opens, labeled with the action ("tap Start", "swipe up", "no athletes"). Branches get their own line and label. Lines go around screens, never through them.
- **Lanes by flow.** One row per flow (sign up, start a session, settings), left to right in the order the user moves through it.

## How it works
- Publish as an Artifact (load `artifact-design` first). Pan by drag or scroll, zoom by pinch, ctrl+wheel or +/− buttons, a "fit all" button, and a jump list of labels.
- Screens are the real renders (PNG from the boards, or the live mock HTML), not redrawn thumbnails.
- No highlight or selection styling unless asked (user, 2026-11-06: "set highlight to none").
- Draw lines as one SVG layer under the screens, from each screen's measured box, so they stay attached at every zoom.
- Check it in the browser pane at full view and zoomed in before sending: every label readable, no line crossing a screen.
