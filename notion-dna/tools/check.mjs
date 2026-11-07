// Automatic tests from dna.json, for one HTML screen with inline CSS.
// Usage: node check.mjs <file.html>. Exits 1 if any test fails.
// Emoji sizes must use class "emoji" on their CSS rule to be excluded from type
// tests. T1, T8, T9 and T10 need eyes.
import { readFileSync } from 'node:fs'

const html = readFileSync(process.argv[2], 'utf8')
const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1])
const inline = [...html.matchAll(/style="([^"]*)"/g)].map((m) => m[1])
const rulesCss = styleBlocks.join('\n').replace(/[^{}]*emoji[^{}]*\{[^{}]*\}/gi, '')
const css = [...styleBlocks, ...inline].join('\n')
const typeCss = [rulesCss, ...inline].join('\n')

const sizes = [...new Set([...typeCss.matchAll(/font-size:\s*([\d.]+)px/g)].map((m) => +m[1]))].sort((a, b) => a - b)
const shadows = [...css.matchAll(/([^{}]+)\{[^{}]*box-shadow:\s*(?!none)[^;}]+/g)].map((m) => m[1].trim())
const filled = (html.match(/class="[^"]*\b(btn-primary|primary)\b[^"]*"/g) ?? []).length

const tests = [
  ['T2 no pure black text', !/(^|[;{\s])color:\s*(#000\b|#000000|black\b)/im.test(css), ''],
  ['T3 at most 3 sizes', sizes.length <= 3, `sizes ${sizes}`],
  ['T4 ratio at most 3.2', !sizes.length || sizes.at(-1) / sizes[0] <= 3.2, `sizes ${sizes}`],
  ['T5 shadow only on menus', shadows.every((s) => /menu|popover/i.test(s)), shadows.join(' | ')],
  ['T6 no gradients', !css.includes('gradient'), ''],
  ['T7 one filled button', filled <= 1, `found ${filled}`],
]
let failed = 0
for (const [name, ok, note] of tests) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name} ${note}`)
  if (!ok) failed++
}
process.exit(failed ? 1 : 0)
