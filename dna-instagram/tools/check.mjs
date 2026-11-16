// Automatic tests for dna-instagram: node check.mjs <file.html>
// Static scan of inline CSS and markup. Exits 1 if any test fails.
import { readFileSync } from 'node:fs'

const file = process.argv[2]
if (!file) { console.error('usage: node check.mjs <file.html>'); process.exit(2) }
const html = readFileSync(file, 'utf8')
const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n') +
  [...html.matchAll(/style="([^"]*)"/gi)].map((m) => m[1]).join('\n')

const results = []
const test = (id, label, ok, detail = '') => results.push({ id, label, ok, detail })

// T1: exactly one gradient rule, and it is a conic or linear ring
const gradients = css.match(/(linear|conic|radial)-gradient\(/gi) || []
test('T1', 'one gradient only (the ring)', gradients.length === 1, `${gradients.length} found`)

// T2: no shadows
const shadows = css.match(/(box-shadow|text-shadow|drop-shadow)\s*[:(]\s*(?!none)/gi) || []
test('T2', 'no shadows', shadows.length === 0, `${shadows.length} found`)

// T3 / T7: font sizes
const sizes = [...new Set([...css.matchAll(/font-size\s*:\s*([\d.]+)px/gi)].map((m) => +m[1]))].sort((a, b) => a - b)
test('T3', 'at most 3 font sizes', sizes.length <= 3, sizes.join(', '))
const ratio = sizes.length ? sizes[sizes.length - 1] / sizes[0] : 1
test('T7', 'type ratio at most 1.8:1', ratio <= 1.8, ratio.toFixed(2))

// T4: at most one solid action-blue fill
const blue = (css.match(/background(-color)?\s*:\s*#4150f7/gi) || []).length
test('T4', 'at most one action-blue fill rule', blue <= 1, `${blue} found`)

// T5: grid gutter 0-2px, no cell radius (only grid rules count; radius 0 is fine)
const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }))
const gridRules = rules.filter((r) => /display\s*:\s*grid/i.test(r.body))
const gaps = gridRules.flatMap((r) => [...r.body.matchAll(/(?:grid-)?gap\s*:\s*([\d.]+)px/gi)].map((m) => +m[1]))
const radiusOf = (body) => (body.match(/border-radius\s*:\s*([^;}]+)/i) || [])[1]
const cellRadius = rules.some((r) => /(cell|tile|post|grid-item)/i.test(r.sel) && radiusOf(r.body) && parseFloat(radiusOf(r.body)) > 0)
test('T5', 'grid gutter 0-2px, square cells', gaps.every((g) => g <= 2) && !cellRadius, 'grid gaps ' + (gaps.join(',') || 'none'))

// T6: body 14px / 18px
const body = /(body|\.body|p)\s*\{[^}]*font-size\s*:\s*14px[^}]*line-height\s*:\s*18px/i.test(css) ||
  /font-size\s*:\s*14px[^;}]*;[^}]*line-height\s*:\s*18px/i.test(css)
test('T6', 'body 14px on 18px line height', body)

// T9: no uppercase
test('T9', 'no uppercase', !/text-transform\s*:\s*uppercase/i.test(css))

for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'} ${r.id} ${r.label}${r.detail ? ' (' + r.detail + ')' : ''}`)
process.exit(results.every((r) => r.ok) ? 0 : 1)
