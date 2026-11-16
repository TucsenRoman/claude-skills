// Palette coverage for a screenshot: node measure.mjs <file> [top% bottom%]
// Run with sharp resolvable, e.g. from a repo that has it installed.
import { createRequire } from 'node:module'
const require = createRequire(process.cwd() + '/')
const sharp = require('sharp')

const [file, top = '0', bottom = '100'] = process.argv.slice(2)
const meta = await sharp(file).metadata()
const y0 = Math.round((meta.height * +top) / 100)
const y1 = Math.round((meta.height * +bottom) / 100)
const { data, info } = await sharp(file)
  .extract({ left: 0, top: y0, width: meta.width, height: y1 - y0 })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

// Buckets of 16 per channel, so anti-aliasing doesn't scatter the counts
const counts = new Map()
for (let i = 0; i < data.length; i += 3) {
  const key = [data[i], data[i + 1], data[i + 2]].map((v) => Math.round(v / 16) * 16).map((v) => Math.min(v, 255))
  const hex = '#' + key.map((v) => v.toString(16).padStart(2, '0')).join('')
  counts.set(hex, (counts.get(hex) ?? 0) + 1)
}
const total = info.width * info.height
const rows = [...counts].sort((a, b) => b[1] - a[1]).slice(0, 10)
console.log(`${file.split('/').pop()} ${meta.width}x${meta.height} rows ${top}-${bottom}%`)
for (const [hex, n] of rows) console.log(`  ${hex} ${((100 * n) / total).toFixed(1)}%`)
