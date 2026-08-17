import { RAW_FLOORS, RAW_NODE_TYPES } from './labyrinth-nodes'
import type { RawFloor, RawNode } from './labyrinth-nodes'
import { rewardIconForName } from './item-icons'
import { AREA_REWARDS, SUPPLY_BASE_REWARD, TYPE_REWARD_TEXT } from './namu'
import { canonical } from '@/lib/locale'
import type { Locale, Localized } from '@/lib/locale'

/**
 * ノード種別・等級・報酬名の訳。
 * 韓国語の原文は labyrinth-nodes.ts（自動生成）側に残してあるので、
 * 訳が付いていない項目は日本語・英語とも原文をそのまま表示する。
 *
 * アイコン対応表や報酬インデックスの ID など、言語で変わってはいけない内部キーは
 * すべて日本語表記（canonical()）を使う。
 */

export const NODE_DATA_SOURCE = {
  label: 'dnf.umi.cat — 역설의 미궁 공략',
  url: 'https://dnf.umi.cat/kr',
}

/** 装備・結晶ノードの等級。マスのアイコン色がそのまま等級に対応する。 */
export type Tier = 'uncommon' | 'rare' | 'unique' | 'legendary' | 'epic' | 'primeval' | 'key' | 'ticket'

export const TIER_LABELS: Record<string, Localized> = {
  uncommon: { ja: 'アンコモン', en: 'Uncommon' },
  rare: { ja: 'レア', en: 'Rare' },
  unique: { ja: 'ユニーク', en: 'Unique' },
  legendary: { ja: 'レジェンダリー', en: 'Legendary' },
  epic: { ja: 'エピック', en: 'Epic' },
  primeval: { ja: '太初', en: 'Primordial' },
  key: { ja: '迷宮調査券', en: 'Labyrinth Survey Ticket' },
  ticket: { ja: '外郭入場券', en: 'Outer Gate Entry Ticket' },
  fixed: { ja: '固定', en: 'Fixed' },
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
  name: Localized
  description: Localized
  /** 元データの韓国語名が区域固有で不正確な場合の差し替え。 */
  nameKr?: string
}

const CENTRAL_CHECKPOINT_DESC: Localized = {
  ja: '中央に位置する巨大な関門。次の区域へ進むには必ず通過しなければならない。',
  en: 'A huge gate at the centre of the map. You must pass through it to reach the next area.',
}

const TYPE_TEXT: Record<string, TypeTranslation> = {
  central_checkpoint_start: {
    name: { ja: 'メイン関門（開始）', en: 'Main Gate (first)' },
    description: CENTRAL_CHECKPOINT_DESC,
  },
  central_checkpoint: {
    name: { ja: 'メイン関門', en: 'Main Gate' },
    description: CENTRAL_CHECKPOINT_DESC,
  },
  central_checkpoint_last: {
    name: { ja: 'メイン関門（最終）', en: 'Main Gate (last)' },
    description: CENTRAL_CHECKPOINT_DESC,
  },
  relic_excavation_zone: {
    name: { ja: '遺物発掘地帯', en: 'Relic Excavation Zone' },
    description: {
      ja: '調査によって遺物を回収できる区域。遺物を使うと戦闘を補助する力を得られるが、どの遺物が手に入るかは分からない。',
      en: 'An area where surveying recovers relics. Using a relic grants power that assists you in battle, but there is no telling which relic you will find.',
    },
  },
  armament_warehouse: {
    name: { ja: '装備倉庫', en: 'Armament Warehouse' },
    description: {
      ja: '微かな衝撃で複数の空間が透けて見える。その向こうに未知の武具があるようだ。',
      en: 'A faint shock makes several spaces show through at once. Unknown arms seem to lie beyond them.',
    },
  },
  giant_armament_warehouse: {
    name: { ja: '古びた装備倉庫', en: 'Ancient Armament Warehouse' },
    description: {
      ja: '整理されていない装備データが入り混じって保存されている。アクセスのたびに構成が変わる。多様な装備が発見されたという報告がある。',
      en: 'Unsorted equipment data is stored here all jumbled together, and the contents change with every access. A wide variety of equipment has reportedly been found inside.',
    },
  },
  tuner_trace: {
    name: { ja: '調律者の痕跡', en: "Tuner's Trace" },
    description: {
      ja: '弱い波動が感じられる区間。未知の存在が不吉な動きを観測した痕跡が残っている。',
      en: 'A stretch where a faint wave can be felt. It bears the traces of an unknown presence observing some ominous movement.',
    },
  },
  tuner_left_trace: {
    name: { ja: '調律者の名残', en: "Tuner's Remnant" },
    description: {
      ja: '名残だけが残る微かな記録。ぼやけた破片が断続的に現れる。',
      en: 'A faint record of which only remnants survive. Blurred fragments surface on and off.',
    },
  },
  labyrinth_supply_base: {
    name: { ja: '迷宮開拓拠点', en: 'Labyrinth Supply Base' },
    description: {
      ja: '未知の場所を開拓する前に、ひと息つける場所。ここを確保すれば新しい道を開く準備ができそうだ。',
      en: 'A place to catch your breath before pushing into unknown ground. Securing it should leave you ready to open a new path.',
    },
  },
  chaotic_radiance_pilgrimage: {
    name: { ja: '歪んだ光輝の巡礼', en: 'Chaotic Radiance Pilgrimage' },
    description: {
      ja: '光へ向かっていた巡礼の残像。理由は分からないが迷宮に入り込み、本来の光輝とは異なる姿を見せている。',
      en: 'The afterimage of a pilgrimage that was heading towards the light. For reasons unknown it wandered into the labyrinth, and now wears a shape unlike the radiance it once had.',
    },
  },
  chaotic_life_pilgrimage: {
    name: { ja: '歪んだ生命の巡礼', en: 'Chaotic Life Pilgrimage' },
    description: {
      ja: '本来は別の地で続いていた巡礼の痕跡。なぜか逆説の迷宮に現れ、意味を失ったまま歪んだ道として残っている。',
      en: 'Traces of a pilgrimage that should have continued elsewhere. Somehow it surfaced in the Labyrinth of Paradox, left behind as a distorted road stripped of meaning.',
    },
  },
  dual_phenomenon: {
    // 元データの名称は1区域の組み合わせ（湖と飛空艇）に固定されているが、
    // 実際は区域ごとに重なるダンジョンが変わるので総称に直している。
    name: { ja: '二重現象', en: 'Dual Phenomenon' },
    nameKr: '이중 현상',
    description: {
      ja: '異常現象により2つの空間が同時に重なって見える。重なるダンジョンの組み合わせは区域ごとに変わる。',
      en: 'An anomaly makes two spaces appear overlapped at once. Which pair of dungeons overlaps changes from area to area.',
    },
  },
  deviated_thousand_seas_sky: {
    name: { ja: '離脱した千海の空', en: 'Deviated Thousand Seas Sky' },
    description: {
      ja: '生命の痕跡と終末の風景がともに残る場所。なぜここが迷宮に存在するのかは分からない。',
      en: 'A place where traces of life and scenes of the apocalypse remain side by side. Why it exists inside the labyrinth is unknown.',
    },
  },
  legion_compressed: {
    name: { ja: '終末の落ちた羅針盤', en: 'Compass Where Doom Fell' },
    description: {
      ja: 'ディレジエの気配を封じた慈悲の羅針盤にロペスが現れた。終末の力で武装したロペスを制圧しなければならない。',
      en: "Lopez has appeared at the Compass of Mercy that sealed away Diregie's presence. Armed with the power of doom, he must be put down.",
    },
  },
}

/** ノード単位で設定されている報酬名の訳。 */
const REWARD_TEXT: Record<string, Localized> = {
  '종말의 계시 1개 상자': { ja: '終末の啓示 1個箱', en: 'Doom Oracle ×1 Box' },
  '응축된 안개의 기억 (역설의 미궁)': {
    ja: '凝縮された霧の記憶（逆説の迷宮）',
    en: 'Condensed Memory of Mist (Labyrinth of Paradox)',
  },
  '별을 품은 조율자의 저울': {
    ja: '星を抱いた調律者の天秤',
    en: "Star-Embracing Tuner's Scale",
  },
  '순례의 인장': { ja: '巡礼の印章', en: 'Pilgrimage Seal' },
  '태초 레거시 ▶ 레거시 변환서 상자': {
    ja: '太初レガシー ▶ レガシー変換書 箱',
    en: 'Primordial Legacy ▶ Legacy Conversion Scroll Box',
  },
  '태초 레거시 선택 변경권 상자': {
    ja: '太初レガシー選択変更券箱',
    en: 'Primordial Legacy Selection Change Ticket Box',
  },
  '프라임 스텔라 1개 상자': { ja: 'プライムステラ 1個箱', en: 'Prime Stella ×1 Box' },
  '보이드 소울': { ja: 'ヴォイドソウル', en: 'Void Soul' },
  '은하를 초월한 조율자의 저울': {
    ja: '銀河を超越した調律者の天秤',
    en: "Galaxy-Transcending Tuner's Scale",
  },
  '성단을 울리는 조율자의 저울': {
    ja: '星団を響かせる調律者の天秤',
    en: "Cluster-Resounding Tuner's Scale",
  },
  '검은 재앙 1개 상자': { ja: '黒い災厄 1個箱', en: 'Black Calamity ×1 Box' },
  '광휘의 흔적 1개 상자': { ja: '光輝の痕跡 1個箱', en: 'Trace of Radiance ×1 Box' },
  '광휘의 소울': { ja: '光輝のソウル', en: 'Radiance Soul' },
  '솔리드 소울': { ja: 'ソリッドソウル', en: 'Solid Soul' },
  '태초 장비 승급서 선택 상자': {
    ja: '太初昇級選択箱',
    en: 'Primordial Upgrade Scroll Selection Box',
  },
  '에픽 서약 결정 제작서 선택 상자': {
    ja: 'エピック誓約結晶製作書選択箱',
    en: 'Epic Oath Crystal Crafting Scroll Selection Box',
  },
  '검은 질병의 레거시 ▶ 디레지에 레거시 변환서 상자': {
    ja: '黒い病気のレガシー ▶ ディレジエ レガシー変換書 箱',
    en: 'Legacy of the Black Plague ▶ Diregie Legacy Conversion Scroll Box',
  },
}

/** 報酬名（日本語表記）から引く補足文。 */
const REWARD_NOTE: Record<string, Localized> = {
  '凝縮された霧の記憶（逆説の迷宮）': {
    ja: '霧ノ誓約経験値 +143,500',
    en: 'Mist Oath EXP +143,500',
  },
  太初昇級選択箱: {
    ja:
      '消耗品／アカウント帰属\n' +
      '使用時、太初武器昇級書・太初アクセサリー昇級書のいずれかを選択して獲得できる。\n' +
      'エピック 一般/レガシー武器・アクセサリーを太初装備に昇級可能。\n' +
      '- 一般/レガシー武器 ▶ 同一職業群の太初武器\n' +
      '- アクセサリー ▶ 同一セット同一部位の太初アクセサリー\n' +
      '※ 黒芽エピックアクセサリーは昇級不可。\n' +
      '※ 調律済み装備を昇級すると調律は初期化され、調律に使用した素材は返還される。',
    en:
      'Consumable / account-bound\n' +
      'On use, choose either a Primordial Weapon Upgrade Scroll or a Primordial Accessory Upgrade Scroll.\n' +
      'Upgrades epic normal/legacy weapons and accessories into primordial equipment.\n' +
      '- Normal/legacy weapon ▶ primordial weapon of the same class group\n' +
      '- Accessory ▶ primordial accessory of the same set and slot\n' +
      '※ Black Sprout epic accessories cannot be upgraded.\n' +
      '※ Upgrading tuned equipment resets its tuning, and the materials used for tuning are returned.',
  },
}

/** iconDict 側に入っている等級テンプレート報酬の訳。 */
const DEFAULT_REWARD_TEXT: Record<string, Localized> = {
  equipment_set_box: { ja: '装備セット箱', en: 'Equipment Set Box' },
  oath_crystal_box: { ja: '誓約結晶壺', en: 'Oath Crystal Jar' },
  doom_oracle: { ja: '終末の啓示', en: 'Doom Oracle' },
}

const DEFAULT_LABEL_TEXT: Record<string, Localized> = {
  自选: { ja: '選択', en: 'Selectable' },
  随机: { ja: 'ランダム', en: 'Random' },
  账绑: { ja: 'アカウント帰属', en: 'Account-bound' },
}

// ---- 公開する型 ----------------------------------------------------------

export interface Reward {
  name: Localized
  nameKr?: string
  count?: number
  /** 「100〜150」のように幅がある場合の表示用。count の代わりに使う。 */
  countRange?: [number, number]
  image?: string
  /** 「選択」「ランダム」「アカウント帰属」など、報酬の受け取り方の注記。 */
  label?: Localized
  /** 登場ボスなどの補足。 */
  note?: Localized
}

export interface NodeType {
  id: string
  name: Localized
  nameKr: string
  description: Localized
  descriptionKr: string
}

export interface MapNode {
  row: number
  col: number
  type: NodeType
  tier?: string
  tierLabel?: Localized
  icon: number
  rewards: Reward[]
  /** 報酬の獲得条件など、나무위키由来の補足文。 */
  rewardText?: Localized
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

/** 訳が無い項目は韓国語の原文をそのまま両言語に入れる。 */
function fallback(text: string): Localized {
  return { ja: text, en: text }
}

export const NODE_TYPES: Map<string, NodeType> = new Map(
  RAW_NODE_TYPES.map((t) => {
    const translated = TYPE_TEXT[t.id]
    return [
      t.id,
      {
        id: t.id,
        name: translated?.name ?? fallback(t.nameKr),
        nameKr: translated?.nameKr ?? t.nameKr,
        description: translated?.description ?? fallback(t.descriptionKr),
        descriptionKr: t.descriptionKr,
      },
    ]
  }),
)

const RAW_TYPE_BY_ID = new Map(RAW_NODE_TYPES.map((t) => [t.id, t]))

function translateReward(nameKr: string): Localized {
  return REWARD_TEXT[nameKr] ?? fallback(nameKr)
}

/** 等級テンプレート（equipment_set_box_{tier} など）から報酬名を組み立てる。 */
function defaultRewardsFor(typeId: string, tier: string | undefined): Reward[] {
  const raw = RAW_TYPE_BY_ID.get(typeId)
  if (!raw?.defaultRewards.length) return []

  return raw.defaultRewards.flatMap((r) => {
    if (!r.image) return []
    const base = r.image.replace(/^\/rewards\//, '').replace(/\.PNG$/i, '')
    const stem = base.replace(/_\{tier\}$/, '')
    const baseName = DEFAULT_REWARD_TEXT[stem]
    if (!baseName) return []

    const resolved = tier && base.includes('{tier}') ? base.replace('{tier}', tier) : base
    // 日本語は「エピック誓約結晶壺」と続けて書くが、英語は語の区切りに空白がいる。
    const tierLabel = TIER_LABELS[tier ?? '']
    const name: Localized = base.includes('{tier}')
      ? {
          ja: `${tierLabel?.ja ?? ''}${baseName.ja}`.trim(),
          en: `${tierLabel?.en ?? ''} ${baseName.en}`.trim(),
        }
      : baseName

    return [
      {
        name,
        image: `/rewards/${resolved}.PNG`,
        ...(r.label ? { label: DEFAULT_LABEL_TEXT[r.label] ?? fallback(r.label) } : {}),
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
      const image = rewardIconForName(canonical(base.name))
      return [{ name: base.name, count: base.count, ...(image ? { image } : {}) }]
    }
  }

  // 歪んだ光輝の巡礼はどの区域でも終末の啓示 100〜150個。
  if (raw.typeId === 'chaotic_radiance_pilgrimage') {
    return [
      {
        name: DEFAULT_REWARD_TEXT.doom_oracle,
        nameKr: '종말의 계시',
        countRange: [100, 150],
        image: '/rewards/doom_oracle.PNG',
        label: DEFAULT_LABEL_TEXT.账绑,
      },
    ]
  }

  // 区域ごとに中身が変わるマス（装備倉庫・調律者・討伐券系）。
  const override =
    AREA_REWARDS[`${area}:${raw.typeId}:${raw.tier ?? ''}`] ??
    AREA_REWARDS[`${area}:${raw.typeId}`]
  if (override) {
    const template = defaultRewardsFor(raw.typeId, raw.tier)[0]
    const image = rewardIconForName(canonical(override.name)) ?? template?.image
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
    const image = rewardIconForName(canonical(name)) ?? r.image
    const note = REWARD_NOTE[canonical(name)]
    return {
      name,
      nameKr: r.nameKr,
      ...(r.count ? { count: r.count } : {}),
      ...(image ? { image } : {}),
      ...(note ? { note } : {}),
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
    key: [raw.typeId, raw.tier ?? '', rewards.map((r) => canonical(r.name)).join('+')].join('|'),
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

/** 言語を切り替えても同じ報酬が同じエントリに畳まれるよう、ID は日本語表記で作る。 */
function rewardId(r: Reward): string {
  return `${canonical(r.name)}#${r.count ?? ''}#${r.countRange?.join('-') ?? ''}`
}

/** 「×1,000」「×100〜150」のような個数表記。個数指定がなければ空。 */
export function rewardCountLabel(r: Reward, locale: Locale): string {
  if (r.countRange) {
    const dash = locale === 'ja' ? '〜' : '–'
    return `×${r.countRange[0]}${dash}${r.countRange[1]}`
  }
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
  (a, b) =>
    b.occurrences.length - a.occurrences.length ||
    canonical(a.reward.name).localeCompare(canonical(b.reward.name)),
)

/** カタカナをひらがなに変換する（検索時の表記ゆれ吸収用）。 */
function toHiragana(s: string): string {
  return s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
}

/** 検索語・検索対象の正規化。カタカナ/ひらがなと大文字小文字は区別しない。 */
function normalize(s: string): string {
  return toHiragana(s.trim().toLowerCase())
}

/**
 * 報酬1件ぶんの検索対象文字列（報酬名・韓国語名・ノード種別名・等級）。
 * 表示中の言語にかかわらず日本語・英語・韓国語すべてを引けるようにまとめてある。
 */
const HAYSTACKS = new Map<string, string>(
  REWARDS.map((e) => [
    e.id,
    normalize(
      [
        e.reward.name.ja,
        e.reward.name.en,
        e.reward.nameKr ?? '',
        ...e.types.flatMap((t) => [t.name.ja, t.name.en, t.nameKr]),
        ...e.tiers.flatMap((t) => {
          const label = TIER_LABELS[t]
          return label ? [label.ja, label.en] : [t]
        }),
      ].join(' '),
    ),
  ]),
)

/** query は normalize() 済みであること。 */
function matchesQuery(entry: RewardEntry, query: string): boolean {
  return HAYSTACKS.get(entry.id)?.includes(query) ?? false
}

/** 報酬名・韓国語名・ノード種別名のいずれかに引っかかれば拾う。 */
export function searchRewards(query: string): RewardEntry[] {
  const q = normalize(query)
  if (!q) return REWARDS
  return REWARDS.filter((e) => matchesQuery(e, q))
}

// ---- 区域ごとの目玉報酬 --------------------------------------------------

export interface AreaHighlight {
  reward: Reward
  /** この報酬が出るノード種別（重複なし）。 */
  types: NodeType[]
  tiers: string[]
  /** この報酬が出現する区域数。少ないほどその区域固有。 */
  areaCount: number
}

function toHighlight(e: RewardEntry): AreaHighlight {
  return { reward: e.reward, types: e.types, tiers: e.tiers, areaCount: e.areas.length }
}

/** 区域ごとの報酬（目玉に限らない全件）。REWARDS と同じく出現数の多い順。 */
const areaRewardIndex = new Map<number, RewardEntry[]>()
for (const area of AREAS_WITH_NODES) {
  areaRewardIndex.set(
    area,
    REWARDS.filter((e) => e.areas.includes(area)),
  )
}

/**
 * 区域の性格を表す報酬。迷宮調査券・外郭入場券・終末の啓示のように
 * ノードデータを持つ全区域で同じように出るものは、区域を選ぶ判断材料に
 * ならないので除く。
 */
const areaHighlightIndex = new Map<number, AreaHighlight[]>()
for (const area of AREAS_WITH_NODES) {
  // REWARDS は出現数の多い順。sort は安定なので、区域数が並んだものは
  // その区域で見かけやすい順のまま残る。
  areaHighlightIndex.set(
    area,
    (areaRewardIndex.get(area) ?? [])
      .filter((e) => e.areas.length < AREAS_WITH_NODES.length)
      .map(toHighlight)
      .sort((a, b) => a.areaCount - b.areaCount),
  )
}

/** 区域（複数可）の目玉報酬を、その区域固有のものから順に返す。 */
export function areaHighlights(areas: number[]): AreaHighlight[] {
  if (areas.length === 1) return areaHighlightIndex.get(areas[0]) ?? []

  const merged = new Map<string, AreaHighlight>()
  for (const area of areas) {
    for (const highlight of areaHighlightIndex.get(area) ?? []) {
      const id = rewardId(highlight.reward)
      if (!merged.has(id)) merged.set(id, highlight)
    }
  }
  return [...merged.values()].sort((a, b) => a.areaCount - b.areaCount)
}

/**
 * 区域（複数可）で手に入る報酬を、報酬名で絞り込む。
 * 一致が無ければ空配列。区域一覧の検索はこれを引く。
 */
export function searchAreaRewards(areas: number[], query: string): AreaHighlight[] {
  const q = normalize(query)
  if (!q) return []

  const merged = new Map<string, AreaHighlight>()
  for (const area of areas) {
    for (const entry of areaRewardIndex.get(area) ?? []) {
      if (merged.has(entry.id) || !matchesQuery(entry, q)) continue
      merged.set(entry.id, toHighlight(entry))
    }
  }
  return [...merged.values()].sort((a, b) => a.areaCount - b.areaCount)
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
