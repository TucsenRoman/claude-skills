// Automatic tests from dna.json, for one HTML screen with inline CSS.
// Usage: node check.mjs <file.html>. Exits 1 if any test fails.
// Elements are found by class name, so a build must use sign, strip, kicker and
// title in its class names. T2, T9, T10 and T12 need eyes.
import { readFileSync } from 'node:fs'

const html = readFileSync(process.argv[2], 'utf8')
const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1])
const inline = [...html.matchAll(/style="([^"]*)"/g)].map((m) => m[1])
const css = [...styleBlocks, ...inline].join('\n')
const body = html.replace(/<style[\s\S]*?<\/style>/g, '')

const uses = (name) => (body.match(new RegExp(`class="[^"]*\\b${name}\\b[^"]*"`, 'g')) ?? []).length
const sizes = [...new Set([...css.matchAll(/font-size:\s*([\d.]+)px/g)].map((m) => +m[1]))].sort((a, b) => a - b)
const shadows = [...css.matchAll(/([^{}]+)\{[^{}]*box-shadow:\s*(?!none)[^;}]+/g)].map((m) => m[1].trim())
const hasDelta = /\d+m (late|early)/i.test(body)
const kicker = body.search(/class="[^"]*\bkicker\b/)
const title = body.search(/class="[^"]*\btitle\b/)

const tests = [
  ['T1 one sign', uses('sign') === 1, `found ${uses('sign')}`],
  ['T3 one strip', uses('strip') === 1, `found ${uses('strip')}`],
  ['T4 at most 4 sizes', sizes.length <= 4, `sizes ${sizes}`],
  ['T5 ratio at most 2.5', !sizes.length || sizes.at(-1) / sizes[0] <= 2.5, `sizes ${sizes}`],
  ['T6 struck-through old value', !hasDelta || css.includes('line-through') || body.includes('<s>'), ''],
  ['T7 shadow only on sheet', shadows.every((s) => s.includes('sheet')), shadows.join(' | ')],
  ['T8 no gradients', !css.includes('gradient'), ''],
  ['T11 kicker above title', kicker >= 0 && title > kicker, ''],
]
let failed = 0
for (const [name, ok, note] of tests) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name} ${note}`)
  if (!ok) failed++
}
process.exit(failed ? 1 : 0)
