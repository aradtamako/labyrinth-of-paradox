/**
 * scrape-nodes.mjs が取った nodes-raw.json から
 * src/data/labyrinth-nodes.ts（生成物）を書き出す。
 * 併せて報酬アイコンを public/rewards/ に保存する。
 *
 *   node scripts/gen-nodes.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const SCRIPTS = import.meta.dirname
const ROOT = path.resolve(SCRIPTS, '..')
const REWARDS = path.join(ROOT, 'public/rewards')
fs.mkdirSync(REWARDS, { recursive: true })

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)

const { floors, iconDict } = JSON.parse(fs.readFileSync(path.join(SCRIPTS, 'nodes-raw.json'), 'utf8'))

/** アイコン番号は public/stageicon/{n}.png と一致する。tier 付きの場合は tier 別の番号を引く。 */
function iconNumber(typeId, tier) {
  const icons = iconDict[typeId]?.icon ?? {}
  if (tier && icons[tier]) return Number(icons[tier])
  if (icons.fixed) return Number(icons.fixed)
  const first = Object.entries(icons).find(([k]) => !k.endsWith('_hover'))
  return first ? Number(first[1]) : null
}

const TIERS = ['uncommon', 'rare', 'unique', 'legendary', 'epic', 'primeval']

// ---- 報酬アイコンの収集とダウンロード ------------------------------------
const imagePaths = new Set()
for (const f of floors) {
  for (const n of f.nodes) for (const r of n.rewards ?? []) if (r.image) imagePaths.add(r.image)
}
for (const def of Object.values(iconDict)) {
  for (const r of def.rewards ?? []) {
    if (!r.image) continue
    if (r.image.includes('{tier}')) for (const t of TIERS) imagePaths.add(r.image.replace('{tier}', t))
    else imagePaths.add(r.image)
  }
}

let got = 0
let missing = 0
for (const p of imagePaths) {
  const name = path.basename(p)
  const dest = path.join(REWARDS, name)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 500) continue
  execFileSync('curl.exe', ['-s', '--max-time', '45', '-o', dest, '-A', UA, '-L', `https://dnf.umi.cat${p}`], {
    stdio: 'ignore',
  })
  if (fs.existsSync(dest) && fs.statSync(dest).size > 500) got++
  else {
    fs.rmSync(dest, { force: true })
    missing++
    console.warn(`  reward image not found: ${p}`)
  }
  sleep(500)
}
console.log(`reward images: ${got} downloaded, ${imagePaths.size - missing} available, ${missing} missing`)

// ---- TypeScript 生成 -----------------------------------------------------
const seen = new Set()
const typeEntries = []
for (const f of floors) for (const n of f.nodes) seen.add(n.icon_id)

for (const [id, def] of Object.entries(iconDict)) {
  if (!seen.has(id)) continue
  typeEntries.push({
    id,
    nameKr: def.name_kr,
    descriptionKr: (def.description_kr ?? '').replace(/\n/g, ' '),
    icons: Object.fromEntries(
      Object.entries(def.icon ?? {}).filter(([k]) => !k.endsWith('_hover')).map(([k, v]) => [k, Number(v)]),
    ),
    defaultRewards: (def.rewards ?? []).map((r) => ({
      image: r.image ?? null,
      label: r.label ?? null,
    })),
  })
}

const out = []
out.push('/**')
out.push(' * 自動生成ファイル — scripts/gen-nodes.mjs で出力。直接編集しないこと。')
out.push(' * 出典: https://dnf.umi.cat/ （区域ごとのノード配置・報酬データ）')
out.push(' */')
out.push('')
out.push('export interface RawReward {')
out.push('  nameKr: string')
out.push('  count?: number')
out.push('  image?: string')
out.push('}')
out.push('')
out.push('export interface RawNode {')
out.push('  row: number')
out.push('  col: number')
out.push('  typeId: string')
out.push('  tier?: string')
out.push('  icon: number')
out.push('  rewards?: RawReward[]')
out.push('}')
out.push('')
out.push('export interface RawFloor {')
out.push('  area: number')
out.push('  seedCode: string')
out.push('  cols: number')
out.push('  rows: number')
out.push('  nodes: RawNode[]')
out.push('  edges: { from: [number, number]; to: [number, number] }[]')
out.push('}')
out.push('')
out.push('export interface RawNodeType {')
out.push('  id: string')
out.push('  nameKr: string')
out.push('  descriptionKr: string')
out.push('  icons: Record<string, number>')
out.push('  defaultRewards: { image: string | null; label: string | null }[]')
out.push('}')
out.push('')
out.push(`export const RAW_NODE_TYPES: RawNodeType[] = ${JSON.stringify(typeEntries, null, 2)}`)
out.push('')

const rawFloors = floors.map((f) => ({
  area: f.area,
  seedCode: /_(\d+)$/.exec(f.floor_id)?.[1] ?? `配置${f.seedIndex}`,
  cols: f.grid.cols,
  rows: f.grid.rows,
  nodes: f.nodes.map((n) => ({
    row: n.row,
    col: n.col,
    typeId: n.icon_id,
    ...(n.tier ? { tier: n.tier } : {}),
    icon: iconNumber(n.icon_id, n.tier),
    ...(n.rewards?.length
      ? {
          rewards: n.rewards.map((r) => ({
            nameKr: r.name_kr,
            ...(r.count ? { count: r.count } : {}),
            ...(r.image ? { image: `/rewards/${path.basename(r.image)}` } : {}),
          })),
        }
      : {}),
  })),
  edges: (f.edges ?? []).map((e) => ({ from: e.from, to: e.to })),
}))

out.push(`export const RAW_FLOORS: RawFloor[] = ${JSON.stringify(rawFloors, null, 2)}`)
out.push('')

fs.writeFileSync(path.join(ROOT, 'src/data/labyrinth-nodes.ts'), out.join('\n'), 'utf8')
console.log(
  `wrote src/data/labyrinth-nodes.ts — ${rawFloors.length} floors, ${typeEntries.length} node types`,
)
