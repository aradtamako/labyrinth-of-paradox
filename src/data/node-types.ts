import { RAW_FLOORS, RAW_NODE_TYPES } from './labyrinth-nodes'
import type { RawFloor, RawNode } from './labyrinth-nodes'
import { rewardIconForName } from './item-icons'
import { AREA_REWARDS, SUPPLY_BASE_REWARD, TYPE_REWARD_TEXT } from './namu'

/**
 * ノード種別・等級・報酬名の日本語訳。
 * 韓国語の原文は labyrinth-nodes.ts（自動生成）側に残してあるので、
 * 訳が付いていない項目は原文をそのまま表示する。
 */

export const NODE_DATA_SOURCE = {
  label: 'dnf.umi.cat — 역설의 미궁 공략',
  url: 'https://dnf.umi.cat/kr',
}

/** 装備・結晶ノードの等級。マスのアイコン色がそのまま等級に対応する。 */
export type Tier = 'uncommon' | 'rare' | 'unique' | 'legendary' | 'epic' | 'primeval' | 'key' | 'ticket'

export const TIER_LABELS: Record<string, string> = {
  uncommon: 'アンコモン',
  rare: 'レア',
  unique: 'ユニーク',
  legendary: 'レジェンダリー',
  epic: 'エピック',
  primeval: '太初',
  key: '迷宮調査券',
  ticket: '外郭入場券',
  fixed: '固定',
}

/** 等級ごとの色。カード枠やバッジの着色に使う。 */
export const TIER_COLORS: Record<string, string> = {
  uncommon: 'oklch(1 0 0)',
  rare: 'oklch(0.6728 0.2142 303.58)',
  unique: 'oklch(0.7017 0.3225 328.36)',
  legendary: 'oklch(0.7201 0.191 49.76)',
  epic: 'oklch(0.819749 0.170602 78.4658)',
  primeval: 'oklch(0.7 0.1455 222.2)',
  key: 'oklch(1 0 0)',
  ticket: 'oklch(1 0 0)',
}

interface TypeTranslation {
  name: string
  description: string
  /** 元データの韓国語名が区域固有で不正確な場合の差し替え。 */
  nameKr?: string
}

const TYPE_JA: Record<string, TypeTranslation> = {
  central_checkpoint_start: {
    name: 'メイン関門（開始）',
    description: '中央に位置する巨大な関門。次の区域へ進むには必ず通過しなければならない。',
  },
  central_checkpoint: {
    name: 'メイン関門',
    description: '中央に位置する巨大な関門。次の区域へ進むには必ず通過しなければならない。',
  },
  central_checkpoint_last: {
    name: 'メイン関門（最終）',
    description: '中央に位置する巨大な関門。次の区域へ進むには必ず通過しなければならない。',
  },
  relic_excavation_zone: {
    name: '遺物発掘地帯',
    description:
      '調査によって遺物を回収できる区域。遺物を使うと戦闘を補助する力を得られるが、どの遺物が手に入るかは分からない。',
  },
  armament_warehouse: {
    name: '装備倉庫',
    description: '微かな衝撃で複数の空間が透けて見える。その向こうに未知の武具があるようだ。',
  },
  giant_armament_warehouse: {
    name: '古びた装備倉庫',
    description:
      '整理されていない装備データが入り混じって保存されている。アクセスのたびに構成が変わる。多様な装備が発見されたという報告がある。',
  },
  tuner_trace: {
    name: '調律者の痕跡',
    description: '弱い波動が感じられる区間。未知の存在が不吉な動きを観測した痕跡が残っている。',
  },
  tuner_left_trace: {
    name: '調律者の名残',
    description: '名残だけが残る微かな記録。ぼやけた破片が断続的に現れる。',
  },
  labyrinth_supply_base: {
    name: '迷宮開拓拠点',
    description:
      '未知の場所を開拓する前に、ひと息つける場所。ここを確保すれば新しい道を開く準備ができそうだ。',
  },
  chaotic_radiance_pilgrimage: {
    name: '歪んだ光輝の巡礼',
    description:
      '光へ向かっていた巡礼の残像。理由は分からないが迷宮に入り込み、本来の光輝とは異なる姿を見せている。',
  },
  chaotic_life_pilgrimage: {
    name: '歪んだ生命の巡礼',
    description:
      '本来は別の地で続いていた巡礼の痕跡。なぜか逆説の迷宮に現れ、意味を失ったまま歪んだ道として残っている。',
  },
  dual_phenomenon: {
    // 元データの名称は1区域の組み合わせ（湖と飛空艇）に固定されているが、
    // 実際は区域ごとに重なるダンジョンが変わるので総称に直している。
    name: '二重現象',
    nameKr: '이중 현상',
    description:
      '異常現象により2つの空間が同時に重なって見える。重なるダンジョンの組み合わせは区域ごとに変わる。',
  },
  deviated_thousand_seas_sky: {
    name: '離脱した千海の空',
    description: '生命の痕跡と終末の風景がともに残る場所。なぜここが迷宮に存在するのかは分からない。',
  },
  legion_compressed: {
    name: '終末の落ちた羅針盤',
    description:
      'ディレジエの気配を封じた慈悲の羅針盤にロペスが現れた。終末の力で武装したロペスを制圧しなければならない。',
  },
}

/** ノード単位で設定されている報酬名の訳。 */
const REWARD_JA: Record<string, string> = {
  '종말의 계시 1개 상자': '終末の啓示 1個箱',
  '응축된 안개의 기억 (역설의 미궁)': '凝縮された霧の記憶（逆説の迷宮）',
  '별을 품은 조율자의 저울': '星を抱いた調律者の天秤',
  '순례의 인장': '巡礼の印章',
  '태초 레거시 ▶ 레거시 변환서 상자': '太初レガシー ▶ レガシー変換書 箱',
  '태초 레거시 선택 변경권 상자': '太初レガシー選択変更券箱',
  '프라임 스텔라 1개 상자': 'プライムステラ 1個箱',
  '보이드 소울': 'ヴォイドソウル',
  '은하를 초월한 조율자의 저울': '銀河を超越した調律者の天秤',
  '성단을 울리는 조율자의 저울': '星団を響かせる調律者の天秤',
  '검은 재앙 1개 상자': '黒い災厄 1個箱',
  '광휘의 흔적 1개 상자': '光輝の痕跡 1個箱',
  '광휘의 소울': '光輝のソウル',
  '솔리드 소울': 'ソリッドソウル',
  '태초 장비 승급서 선택 상자': '太初昇級選択箱',
  '에픽 서약 결정 제작서 선택 상자': 'エピック誓約結晶製作書選択箱',
  '검은 질병의 레거시 ▶ 디레지에 레거시 변환서 상자':
    '黒い病気のレガシー ▶ ディレジエ レガシー変換書 箱',
}

const REWARD_NOTE: Record<string, string> = {
  '凝縮された霧の記憶（逆説の迷宮）': '霧ノ誓約経験値 +143,500',
  '太初昇級選択箱':
    '消耗品／アカウント帰属\n' +
    '使用時、太初武器昇級書・太初アクセサリー昇級書のいずれかを選択して獲得できる。\n' +
    'エピック 一般/レガシー武器・アクセサリーを太初装備に昇級可能。\n' +
    '- 一般/レガシー武器 ▶ 同一職業群の太初武器\n' +
    '- アクセサリー ▶ 同一セット同一部位の太初アクセサリー\n' +
    '※ 黒芽エピックアクセサリーは昇級不可。\n' +
    '※ 調律済み装備を昇級すると調律は初期化され、調律に使用した素材は返還される。',
}

/** iconDict 側に入っている等級テンプレート報酬の訳。 */
const DEFAULT_REWARD_JA: Record<string, string> = {
  equipment_set_box: '装備セット箱',
  oath_crystal_box: '誓約結晶壺',
  doom_oracle: '終末の啓示',
}

const DEFAULT_LABEL_JA: Record<string, string> = {
  自选: '選択',
  随机: 'ランダム',
  账绑: 'アカウント帰属',
}

// ---- 公開する型 ----------------------------------------------------------

export interface Reward {
  name: string
  nameKr?: string
  count?: number
  /** 「100〜150」のように幅がある場合の表示用。count の代わりに使う。 */
  countRange?: [number, number]
  image?: string
  /** 「選択」「ランダム」「アカウント帰属」など、報酬の受け取り方の注記。 */
  label?: string
  /** 登場ボスなどの補足。 */
  note?: string
}

export interface NodeType {
  id: string
  name: string
  nameKr: string
  description: string
  descriptionKr: string
}

export interface MapNode {
  row: number
  col: number
  type: NodeType
  tier?: string
  tierLabel?: string
  icon: number
  rewards: Reward[]
  /** 報酬の獲得条件など、나무위키由来の補足文。 */
  rewardText?: string
  /** 同じ内容のノードをまとめるためのキー。 */
  key: string
}

export interface SeedMap {
  area: number
  seedCode: string
  cols: number
  rows: number
  nodes: MapNode[]
  edges: RawFloor['edges']
}

// ---- 変換 ----------------------------------------------------------------

export const NODE_TYPES: Map<string, NodeType> = new Map(
  RAW_NODE_TYPES.map((t) => {
    const ja = TYPE_JA[t.id]
    return [
      t.id,
      {
        id: t.id,
        name: ja?.name ?? t.nameKr,
        nameKr: ja?.nameKr ?? t.nameKr,
        description: ja?.description ?? t.descriptionKr,
        descriptionKr: t.descriptionKr,
      },
    ]
  }),
)

const RAW_TYPE_BY_ID = new Map(RAW_NODE_TYPES.map((t) => [t.id, t]))

function translateReward(nameKr: string): string {
  return REWARD_JA[nameKr] ?? nameKr
}

function rewardNoteForName(name: string): string | undefined {
  return REWARD_NOTE[name]
}

/** 等級テンプレート（equipment_set_box_{tier} など）から報酬名を組み立てる。 */
function defaultRewardsFor(typeId: string, tier: string | undefined): Reward[] {
  const raw = RAW_TYPE_BY_ID.get(typeId)
  if (!raw?.defaultRewards.length) return []

  return raw.defaultRewards.flatMap((r) => {
    if (!r.image) return []
    const base = r.image.replace(/^\/rewards\//, '').replace(/\.PNG$/i, '')
    const stem = base.replace(/_\{tier\}$/, '')
    const jaBase = DEFAULT_REWARD_JA[stem]
    if (!jaBase) return []

    const resolved = tier && base.includes('{tier}') ? base.replace('{tier}', tier) : base
    const name = base.includes('{tier}')
      ? `${TIER_LABELS[tier ?? ''] ?? ''}${jaBase}`.trim()
      : jaBase

    return [
      {
        name,
        image: `/rewards/${resolved}.PNG`,
        ...(r.label ? { label: DEFAULT_LABEL_JA[r.label] ?? r.label } : {}),
      },
    ]
  })
}

/**
 * マスの報酬を決める。優先度は
 * 「等級で決まるもの」＞「나무위키の区域別対応表」＞「元データのマス単位報酬」＞「等級テンプレート」。
 */
function resolveRewards(area: number, raw: RawNode): Reward[] {
  // 迷宮開拓拠点は等級（調査券／入場券）がそのまま報酬になる。
  if (raw.typeId === 'labyrinth_supply_base' && raw.tier) {
    const base = SUPPLY_BASE_REWARD[raw.tier]
    if (base) {
      const image = rewardIconForName(base.name)
      return [{ name: base.name, count: base.count, ...(image ? { image } : {}) }]
    }
  }

  // 歪んだ光輝の巡礼はどの区域でも終末の啓示 100〜150個。
  if (raw.typeId === 'chaotic_radiance_pilgrimage') {
    return [
      {
        name: '終末の啓示',
        nameKr: '종말의 계시',
        countRange: [100, 150],
        image: '/rewards/doom_oracle.PNG',
        label: 'アカウント帰属',
      },
    ]
  }

  // 区域ごとに中身が変わるマス（装備倉庫・調律者・討伐券系）。
  const override =
    AREA_REWARDS[`${area}:${raw.typeId}:${raw.tier ?? ''}`] ??
    AREA_REWARDS[`${area}:${raw.typeId}`]
  if (override) {
    const template = defaultRewardsFor(raw.typeId, raw.tier)[0]
    const image = rewardIconForName(override.name) ?? template?.image
    return [
      {
        name: override.name,
        nameKr: override.nameKr,
        ...(override.note ? { note: override.note } : {}),
        ...(image ? { image } : {}),
        ...(template?.label ? { label: template.label } : {}),
      },
    ]
  }

  const explicit: Reward[] = (raw.rewards ?? []).map((r) => {
    const name = translateReward(r.nameKr)
    const image = rewardIconForName(name) ?? r.image
    return {
      name,
      nameKr: r.nameKr,
      ...(r.count ? { count: r.count } : {}),
      ...(image ? { image } : {}),
      ...(rewardNoteForName(name) ? { note: rewardNoteForName(name) } : {}),
    }
  })
  if (explicit.length) return explicit

  return defaultRewardsFor(raw.typeId, raw.tier)
}

function buildNode(area: number, raw: RawNode): MapNode {
  const type = NODE_TYPES.get(raw.typeId)!
  const rewards = resolveRewards(area, raw)

  return {
    row: raw.row,
    col: raw.col,
    type,
    tier: raw.tier,
    tierLabel: raw.tier ? TIER_LABELS[raw.tier] : undefined,
    icon: raw.icon,
    rewards,
    rewardText: TYPE_REWARD_TEXT[raw.typeId],
    key: [raw.typeId, raw.tier ?? '', rewards.map((r) => r.name).join('+')].join('|'),
  }
}

export const SEED_MAPS: SeedMap[] = RAW_FLOORS.map((f) => ({
  area: f.area,
  seedCode: f.seedCode,
  cols: f.cols,
  rows: f.rows,
  nodes: f.nodes.map((n) => buildNode(f.area, n)),
  edges: f.edges,
}))

/** 区域番号 → その区域のシードマップ一覧。 */
export const MAPS_BY_AREA = new Map<number, SeedMap[]>()
for (const m of SEED_MAPS) {
  const list = MAPS_BY_AREA.get(m.area) ?? []
  list.push(m)
  MAPS_BY_AREA.set(m.area, list)
}
for (const list of MAPS_BY_AREA.values()) list.sort((a, b) => a.seedCode.localeCompare(b.seedCode))

/** ノードデータを持っている区域。 */
export const AREAS_WITH_NODES = [...MAPS_BY_AREA.keys()].sort((a, b) => a - b)

export function mapFor(area: number, seedCode: string): SeedMap | undefined {
  return MAPS_BY_AREA.get(area)?.find((m) => m.seedCode === seedCode)
}

export const iconSrc = (n: number) => `/stageicon/${n}.png`

// ---- 報酬インデックス ----------------------------------------------------

export interface RewardOccurrence {
  area: number
  seedCode: string
  row: number
  col: number
}

/** 区域単位の出現数。生の座標を並べても読めないので、ここまで畳んで表示する。 */
export interface AreaBreakdown {
  area: number
  /** その区域での総マス数。 */
  count: number
  /** シードごとのマス数。全シードで同数なら「どのシードでも同じ」と分かる。 */
  perSeed: { seedCode: string; count: number }[]
}

export interface RewardEntry {
  /** 報酬名 + 個数で1件とする。 */
  id: string
  reward: Reward
  /** この報酬が出るノード種別（重複なし）。 */
  types: NodeType[]
  tiers: string[]
  occurrences: RewardOccurrence[]
  /** 出現する区域番号（昇順・重複なし）。 */
  areas: number[]
  byArea: AreaBreakdown[]
}

function rewardId(r: Reward): string {
  return `${r.name}#${r.count ?? ''}#${r.countRange?.join('-') ?? ''}`
}

/** 「×1,000」「×100〜150」のような個数表記。個数指定がなければ空。 */
export function rewardCountLabel(r: Reward): string {
  if (r.countRange) return `×${r.countRange[0]}〜${r.countRange[1]}`
  if (r.count) return `×${r.count.toLocaleString()}`
  return ''
}

const rewardIndex = new Map<string, RewardEntry>()

for (const map of SEED_MAPS) {
  for (const node of map.nodes) {
    for (const reward of node.rewards) {
      const id = rewardId(reward)
      let entry = rewardIndex.get(id)
      if (!entry) {
        entry = { id, reward, types: [], tiers: [], occurrences: [], areas: [], byArea: [] }
        rewardIndex.set(id, entry)
      }
      if (!entry.types.some((t) => t.id === node.type.id)) entry.types.push(node.type)
      if (node.tier && !entry.tiers.includes(node.tier)) entry.tiers.push(node.tier)
      if (!entry.areas.includes(map.area)) entry.areas.push(map.area)
      entry.occurrences.push({
        area: map.area,
        seedCode: map.seedCode,
        row: node.row,
        col: node.col,
      })
    }
  }
}

for (const entry of rewardIndex.values()) {
  entry.areas.sort((a, b) => a - b)
  entry.byArea = entry.areas.map((area) => {
    const inArea = entry.occurrences.filter((o) => o.area === area)
    const perSeed = new Map<string, number>()
    for (const o of inArea) perSeed.set(o.seedCode, (perSeed.get(o.seedCode) ?? 0) + 1)
    return {
      area,
      count: inArea.length,
      perSeed: [...perSeed]
        .map(([seedCode, count]) => ({ seedCode, count }))
        .sort((a, b) => a.seedCode.localeCompare(b.seedCode)),
    }
  })
}

export const REWARDS: RewardEntry[] = [...rewardIndex.values()].sort(
  (a, b) => b.occurrences.length - a.occurrences.length || a.reward.name.localeCompare(b.reward.name),
)

/** 報酬名・韓国語名・ノード種別名のいずれかに引っかかれば拾う。 */
export function searchRewards(query: string): RewardEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return REWARDS
  return REWARDS.filter((e) => {
    const haystack = [
      e.reward.name,
      e.reward.nameKr ?? '',
      ...e.types.flatMap((t) => [t.name, t.nameKr]),
      ...e.tiers.map((t) => TIER_LABELS[t] ?? t),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

/** ノード種別ごとの出現数。種別一覧の表示に使う。 */
export interface NodeTypeStat {
  type: NodeType
  count: number
  tiers: string[]
  icons: number[]
}

const typeStats = new Map<string, NodeTypeStat>()
for (const map of SEED_MAPS) {
  for (const node of map.nodes) {
    let stat = typeStats.get(node.type.id)
    if (!stat) {
      stat = { type: node.type, count: 0, tiers: [], icons: [] }
      typeStats.set(node.type.id, stat)
    }
    stat.count++
    if (node.tier && !stat.tiers.includes(node.tier)) stat.tiers.push(node.tier)
    if (!stat.icons.includes(node.icon)) stat.icons.push(node.icon)
  }
}

export const NODE_TYPE_STATS: NodeTypeStat[] = [...typeStats.values()].sort(
  (a, b) => b.count - a.count,
)
