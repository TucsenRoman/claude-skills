---
name: ping-me
description: Send the user a push notification when the current task finishes or gets blocked. Use when the user types /ping-me, says "ping me", "notify me when you're done", "let me know when it's finished", or is stepping away while a task runs.
---

# Ping me

The user wants to walk away and get notified when there is something to come back for.

## What to do

0. **Make sure the ping can reach the phone.** Phone pushes only go out while Remote Control is on for this session. At the start, turn it on with `mcp__ccd_session_mgmt__set_remote_control` (`session_id: "self"`, `enabled: true`; load it via ToolSearch if deferred). If that tool is unavailable or returns anything but "on", tell the user right away: "Remote Control is off, so I can't reach your phone. Turn it on from the toolbar (or set it as the default in the app's Code settings)." Then continue the task.
1. **Pick the task.**
   - If arguments were passed (`/ping-me run the build and fix errors`), that is the task. Start it now.
   - With no arguments, the task is whatever is in progress or was just agreed on in this conversation.
2. **Work it to a stopping point without waiting on the user.** Make reasonable calls instead of asking small questions, since the user isn't watching. Still stop and ask for anything that needs their approval: merges (use the Approve/Deny button), database writes, deleting things, sign-ins, spending money.
3. **Send exactly one notification** with the `PushNotification` tool (load it via ToolSearch `select:PushNotification` if it is deferred) at the first of these:
   - **Done:** the task is finished and verified.
   - **Blocked:** you need a decision, an approval, or a sign-in only the user can do.
   - **Failed:** something broke and you can't fix it on your own.
4. **Then write the full summary in the chat** as usual. The notification is only the doorbell.

## Writing the notification

- One line, under 200 characters, no markdown.
- Start with the outcome and what they need to do, not "task complete".
  - Good: `Supabase schema pulled + PR #6 ready. Tap to approve merge.`
  - Good: `Blocked: run "npx supabase login" so I can link the database.`
  - Good: `Build failed: 2 type errors in HeroB.tsx, fix needs your call on copy.`
  - Bad: `Done!` / `Task finished, see chat for details.`
- Don't send progress pings along the way. One ping per /ping-me unless the user asks for more.

If the tool reports the notification was not sent because the user is at the screen, that is fine. Do not retry. If it says "Remote Control inactive", say so in the chat summary so the user knows the phone never got it.
