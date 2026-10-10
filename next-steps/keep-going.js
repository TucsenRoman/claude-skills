// Stop hook for next-steps: keeps the session working through an approved plan.
// Reads ~/.claude/next-steps/active-plan.json. If the plan belongs to this folder
// and the next open step doesn't need the user, it blocks the stop and names that step.
const fs = require('fs')
const path = require('path')
const os = require('os')

const MAX_NUDGES = 60
const MAX_SAME_STEP = 4
const file = process.env.NEXT_STEPS_PLAN || path.join(os.homedir(), '.claude', 'next-steps', 'active-plan.json')

let input = ''
process.stdin.on('data', (c) => { input += c })
process.stdin.on('end', () => {
  let hook = {}
  try { hook = JSON.parse(input) } catch {}

  let plan
  try { plan = JSON.parse(fs.readFileSync(file, 'utf8')) } catch { return }
  if (plan.approved !== true) return
  if (plan.cwd && hook.cwd && path.resolve(plan.cwd).toLowerCase() !== path.resolve(hook.cwd).toLowerCase()) return

  const next = (plan.steps || []).find((s) => s.status !== 'done' && s.status !== 'skipped')
  if (next == null) return
  if (next.status === 'needs-user' || next.status === 'blocked') return

  plan.nudges = (plan.nudges || 0) + 1
  plan.sameStep = plan.lastStep === next.n ? (plan.sameStep || 0) + 1 : 1
  plan.lastStep = next.n
  if (plan.nudges > MAX_NUDGES || plan.sameStep > MAX_SAME_STEP) {
    plan.approved = false
    plan.stoppedBecause = plan.nudges > MAX_NUDGES ? 'nudge cap' : `stuck on step ${next.n}`
    fs.writeFileSync(file, JSON.stringify(plan, null, 2))
    return
  }
  fs.writeFileSync(file, JSON.stringify(plan, null, 2))

  process.stdout.write(JSON.stringify({
    decision: 'block',
    reason: `next-steps plan "${plan.goal}" isn't finished. Work on step ${next.n}: ${next.title}. Update its status in ${file} when it's done (or set it to needs-user if you need the user).`,
  }))
})
