/**
 * public/maps/ のマップ画像から一覧表示用のサムネイル（WebP）を作る。
 * 一覧ページで原寸 PNG を 31 枚並べると数 MB になるため、
 * カード表示にはこちらを使い、拡大表示のときだけ原寸を読む。
 *
 *   node scripts/make-thumbs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const MAPS = path.resolve(import.meta.dirname, '../public/maps')
const THUMBS = path.join(MAPS, 'thumbs')
const WIDTH = 560

fs.mkdirSync(THUMBS, { recursive: true })

const files = fs.readdirSync(MAPS).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))

let made = 0
let srcBytes = 0
let outBytes = 0

for (const file of files) {
  const src = path.join(MAPS, file)
  const out = path.join(THUMBS, file.replace(/\.\w+$/, '.webp'))

  srcBytes += fs.statSync(src).size

  if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(src).mtimeMs) {
    await sharp(src).resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out)
    made++
  }
  outBytes += fs.statSync(out).size
}

const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(`thumbnails: ${made} generated, ${files.length} total`)
console.log(`originals ${mb(srcBytes)} MB -> thumbs ${mb(outBytes)} MB`)
