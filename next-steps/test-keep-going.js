// Checks keep-going.js against sample plans. Run: node test-keep-going.js
// Uses a temp plan file (NEXT_STEPS_PLAN), never the real active plan.
const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')

const hook = path.join(__dirname, 'keep-going.js')
const planFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'next-steps-test-')), 'plan.json')
const here = 'C:/dev/project'

const plan = (steps, extra = {}) => ({ goal: 'test', cwd: here, approved: true, steps, ...extra })
const write = (p) => fs.writeFileSync(planFile, JSON.stringify(p))
const run = (cwd = here) => {
  const out = execFileSync('node', [hook], {
    input: JSON.stringify({ cwd }),
    env: { ...process.env, NEXT_STEPS_PLAN: planFile },
  }).toString()
  return out === '' ? 'allow' : JSON.parse(out).decision
}

const open = [{ n: 1, title: 'A', status: 'done' }, { n: 2, title: 'B', status: 'todo' }]
const cases = [
  ['blocks on an open step', () => { write(plan(open)); return run() }, 'block'],
  ['allows in another folder', () => { write(plan(open)); return run('C:/dev/other') }, 'allow'],
  ['allows when the next step needs the user', () => { write(plan([{ n: 1, title: 'A', status: 'needs-user' }])); return run() }, 'allow'],
  ['allows when the next step is blocked', () => { write(plan([{ n: 1, title: 'A', status: 'blocked' }])); return run() }, 'allow'],
  ['allows when every step is done or skipped', () => { write(plan([{ n: 1, title: 'A', status: 'done' }, { n: 2, title: 'B', status: 'skipped' }])); return run() }, 'allow'],
  ['allows when the plan is not approved', () => { write(plan(open, { approved: false })); return run() }, 'allow'],
  ['allows when there is no plan file', () => { fs.rmSync(planFile, { force: true }); return run() }, 'allow'],
  ['allows when the plan file is broken', () => { fs.writeFileSync(planFile, '{not json'); return run() }, 'allow'],
  ['gives up after 4 nudges on one step', () => {
    write(plan(open))
    const got = [1, 2, 3, 4, 5].map(() => run()).join(',')
    const saved = JSON.parse(fs.readFileSync(planFile, 'utf8'))
    return `${got} ${saved.approved} ${saved.stoppedBecause}`
  }, 'block,block,block,block,allow false stuck on step 2'],
  ['gives up after 60 nudges in total', () => {
    write(plan(open, { nudges: 60 }))
    return run()
  }, 'allow'],
]

let failed = 0
for (const [name, fn, want] of cases) {
  const got = fn()
  const ok = got === want
  if (ok === false) failed++
  console.log(`${ok ? 'pass' : 'FAIL'}  ${name}${ok ? '' : `  (wanted ${want}, got ${got})`}`)
}
fs.rmSync(path.dirname(planFile), { recursive: true, force: true })
console.log(failed === 0 ? `All ${cases.length} passed.` : `${failed} of ${cases.length} failed.`)
process.exit(failed === 0 ? 0 : 1)
