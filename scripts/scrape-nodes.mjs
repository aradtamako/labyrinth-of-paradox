/**
 * dnf.umi.cat から各区域・各シードのノード配置データ（グリッド座標／アイコン種別／報酬）を取得する。
 * ページは Next.js の RSC ペイロードに JSON がそのまま載っているので、それを復元して抜き出す。
 *
 *   node scripts/scrape-nodes.mjs            # 既定の対象区域
 *   node scripts/scrape-nodes.mjs 1 2 3      # 区域を指定
 *
 * 出力: scripts/nodes-raw.json
 * 取得済みの HTML は scripts/umi-cache/ に残るので、再実行時は再取得しない。
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const SCRIPTS = import.meta.dirname
const CACHE = path.join(SCRIPTS, 'umi-cache')
fs.mkdirSync(CACHE, { recursive: true })

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const areas = process.argv.slice(2).map(Number)
const AREAS = areas.length ? areas : [1, 2, 3]
const SEEDS = [1, 2, 3, 4, 5]

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)

function fetchPage(area, seed) {
  const file = path.join(CACHE, `${area}-${seed}.html`)
  if (fs.existsSync(file) && fs.statSync(file).size > 50000) {
    const cached = fs.readFileSync(file, 'utf8')
    if (cached.includes('schema_version')) return cached
  }
  const url = `https://dnf.umi.cat/kr/labyrinth/${area}/${seed}`
  execFileSync('curl.exe', ['-s', '--max-time', '60', '-o', file, '-A', UA, '-L', url], { stdio: 'ignore' })
  sleep(1500) // 相手のサーバーに負担をかけないよう間隔を空ける
  return fs.readFileSync(file, 'utf8')
}

/** self.__next_f.push([1,"..."]) に分割された RSC ペイロードを1本の文字列に戻す。 */
function decodePayload(html) {
  const re = /self\.__next_f\.push\(\[1,\s*("(?:[^"\\]|\\.)*")\s*\]\)/g
  let out = ''
  let m
  while ((m = re.exec(html)) !== null) {
    try {
      out += JSON.parse(m[1])
    } catch {
      /* 壊れたチャンクは無視 */
    }
  }
  return out
}

/** text の start 位置から始まる JSON オブジェクトを、波括弧の対応を見て切り出す。 */
function sliceObject(text, start) {
  let depth = 0
  let inStr = false
  let esc = false
  for (let i = start; i < text.length; i++) {
    const c = text[i]
    if (inStr) {
      if (esc) esc = false
      else if (c === '\\') esc = true
      else if (c === '"') inStr = false
      continue
    }
    if (c === '"') inStr = true
    else if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) return text.slice(start, i + 1)
    }
  }
  return null
}

function extract(payload, key) {
  const marker = `"${key}":`
  const at = payload.indexOf(marker)
  if (at < 0) return null
  const braceAt = payload.indexOf('{', at + marker.length)
  if (braceAt < 0) return null
  const raw = sliceObject(payload, braceAt)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch (e) {
    console.warn(`  parse failed for ${key}: ${e.message}`)
    return null
  }
}

const floors = []
let iconDict = null

for (const area of AREAS) {
  for (const seed of SEEDS) {
    process.stdout.write(`area ${area} seed ${seed} ... `)
    try {
      const html = fetchPage(area, seed)
      const payload = decodePayload(html)
      const floor = extract(payload, 'floor')
      if (!floor) {
        console.log('NO FLOOR DATA')
        continue
      }
      if (!iconDict) iconDict = extract(payload, 'iconDict')
      floors.push({ area, seedIndex: seed, ...floor })
      const code = /_(\d+)$/.exec(floor.floor_id)?.[1] ?? '?'
      console.log(`${floor.nodes.length} nodes, ${floor.edges?.length ?? 0} edges, code ${code}`)
    } catch (e) {
      console.log(`ERR ${e.message}`)
    }
  }
}

fs.writeFileSync(
  path.join(SCRIPTS, 'nodes-raw.json'),
  JSON.stringify({ floors, iconDict }, null, 2),
  'utf8',
)
console.log(`\nwrote nodes-raw.json — ${floors.length} floors, ${Object.keys(iconDict ?? {}).length} icon types`)
