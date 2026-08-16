import { FLOOR_IMAGES } from './floor-images'

/**
 * 各階の攻略データ。マップ画像・シードコード・注釈は DCインサイド 던파IP マイナーギャラリー
 * のまとめ記事群（下記 sourceNo）を出典とし、注釈は日本語に訳してある。
 */

export const GUIDE_INDEX_URL = 'https://gall.dcinside.com/mgallery/board/view?id=dfip&no=5146377'

const postUrl = (no: number) => `https://gall.dcinside.com/mgallery/board/view/?id=dfip&no=${no}`

/** マップ画像1枚。seed が付くものは元記事でシードコードが明記されていたもの。 */
export interface FloorImage {
  src: string
  /** 「23333」「22322 (右右)」など、元記事の見出し。 */
  seed?: string
  /** 判別のコツなど、その画像に紐づく説明。 */
  caption?: string
  /** シードマップではなく、判別方法を説明するための図。 */
  figure?: boolean
  /** マスのアイコンと報酬の対応を示す凡例画像。 */
  legend?: boolean
}

export interface Floor {
  /** ルーティングに使うキー。'1-3' のみ3階分をまとめた記事。 */
  key: string
  /** 表示用ラベル。 */
  label: string
  /** この記事がカバーする区域番号。 */
  areas: number[]
  fame?: { from: number; to: number; delta: number }
  /** 元記事の「主要報酬」欄。 */
  rewards?: string[]
  /** 攻略の要点。 */
  notes?: string[]
  images: FloorImage[]
  sourceUrl: string
  videoUrl?: string
}

interface FloorSeed {
  key: string
  label: string
  areas: number[]
  no: number
  fame?: { from: number; to: number; delta: number }
  rewards?: string[]
  notes?: string[]
  /** 画像の添字（0 始まり）→ メタ情報。 */
  meta?: Record<number, Omit<FloorImage, 'src'>>
  videoUrl?: string
  /** FLOOR_IMAGES 上の取得元キー。省略時は key と同じ。 */
  imageKey?: string
  /** imageKey の画像から切り出す範囲 [開始, 終了)。1〜3区域は1記事に3区域分入っている。 */
  imageRange?: [number, number]
}

const SEEDS: FloorSeed[] = [
  {
    key: '1',
    label: '1区域',
    areas: [1],
    no: 4738329,
    imageKey: '1-3',
    imageRange: [0, 6],
    notes: [
      '1〜3区域は右端の列の部屋数を上から数えるだけでシードを判別できる。',
      'ひし形のモンスター配置マスは3種類の報酬のうち1つが出るが、どのマスで何が出たかを記録している人がほとんどおらず、後から確認する手段もないため判別できない。',
    ],
    meta: {
      0: { legend: true, caption: 'このマップのアイコンと報酬の対応表。' },
      1: { seed: '13322' },
      2: { seed: '22113' },
      3: { seed: '23132' },
      4: { seed: '11221' },
      5: { seed: '12321' },
    },
  },
  {
    key: '2',
    label: '2区域',
    areas: [2],
    no: 4738329,
    imageKey: '1-3',
    imageRange: [6, 12],
    notes: ['右端の列の部屋数でシードを判別できる。'],
    meta: {
      0: { legend: true, caption: 'このマップのアイコンと報酬の対応表。' },
      1: { seed: '31222' },
      2: { seed: '22232' },
      3: { seed: '12322' },
      4: { seed: '22222' },
      5: { seed: '32122' },
    },
  },
  {
    key: '3',
    label: '3区域',
    areas: [3],
    no: 4738329,
    imageKey: '1-3',
    imageRange: [12, 18],
    notes: ['右端の列の部屋数でシードを判別できる。ここまでは青い線を見る必要はない。'],
    meta: {
      0: { legend: true, caption: 'このマップのアイコンと報酬の対応表。' },
      1: { seed: '12322' },
      2: { seed: '21223' },
      3: { seed: '21211' },
      4: { seed: '22221' },
      5: { seed: '11222' },
    },
  },
  {
    key: '4',
    label: '4区域',
    areas: [4],
    no: 4771857,
    notes: [
      '4区域から判別方法が変わる。5つのシードすべてが 5×5 配置で同じ形をしているため、右端の部屋数では見分けられない。',
      '青い点線2本の位置でシードを判別する。',
    ],
    meta: {
      0: { figure: true, caption: '5つのシードすべてが 5×5 配置で同一。右端の数だけでは判別できない。' },
      1: { figure: true, caption: 'この青い点線2本の位置でシードを見分ける。' },
    },
    videoUrl: 'https://youtu.be/PIreX-3oZx4',
  },
  {
    key: '5',
    label: '5区域',
    areas: [5],
    no: 4793763,
    notes: [
      'いつも通り右端の部屋数を数えれば判別できる。',
      '33122 は右下2マスがロックされたままだが、残っているのが「啓示100個」と「遺物」なので開ける価値は薄い。',
    ],
    videoUrl: 'https://youtu.be/eiNfBn4hA2I',
  },
  {
    key: '6',
    label: '6区域',
    areas: [6],
    no: 4818704,
    notes: [
      '2区域で左から数えると重複が出たため右端基準に統一したが、6区域では右端でもシードが重複する。',
      '左右で数え方を変えると混乱しやすいので、右端を基準にしつつ青い線の位置を補助的に使う。',
      '自分のシードが 21222 の場合は、青い線の位置も併せて確認すること。',
      '残る2マスは「遺物」と「啓示100個」なのでスルーでよい。',
    ],
    meta: {
      1: { figure: true, caption: '21222 は重複するため、青い線の位置も確認する。' },
    },
    videoUrl: 'https://youtu.be/-zKToWmeyIE',
  },
  {
    key: '7',
    label: '7区域',
    areas: [7],
    no: 4853018,
    notes: [
      '7区域は5つのシードすべてが 5×5 で配置が同一なうえ、青い線の位置まで一致するシードが存在する。',
      '青い線が一致する2つのシードは、1行目の右から1番目のマスを開けて中身で判別する（どちらのシードでも開ける必要があるマス）。',
      '残りのシードは青い線の位置で判別できる。',
    ],
    meta: {
      1: { figure: true, caption: '青い線の位置まで同じシードが存在する。' },
      2: { figure: true, caption: '1行目の右から1番目が「調査券」ならこちらのシード。' },
      3: { figure: true, caption: '1行目の右から1番目が「入場券」ならこちらのシード。' },
    },
    videoUrl: 'https://youtu.be/qGkB5G1ZKQs',
  },
  {
    key: '8',
    label: '8区域',
    areas: [8],
    no: 4889996,
    notes: [
      '不自然なほど 22222 の重複が多い。31222 ではなく 22222 だった場合は、青い線を見てシードを判別する。',
    ],
    videoUrl: 'https://youtu.be/UkK1I8MOdIM',
  },
  {
    key: '9',
    label: '9区域',
    areas: [9],
    no: 4926562,
    notes: ['9区域は 21222 の重複が3つある。重複した場合はいつも通り青い線まで確認すれば判別できる。'],
    videoUrl: 'https://youtu.be/OUZiRLSiNsQ',
  },
  {
    key: '10',
    label: '10区域',
    areas: [10],
    no: 4956365,
    notes: ['10区域に重複シードはない。'],
    videoUrl: 'https://youtu.be/rJkNahZAaiU',
  },
  {
    key: '11',
    label: '11区域',
    areas: [11],
    no: 4984071,
    notes: [
      '11区域は 23212 が重複する。23212 だった場合は青い線も確認するか、左端の部屋数で判別する。',
    ],
    videoUrl: 'https://youtu.be/chw510ToJX8',
  },
  {
    key: '12',
    label: '12区域',
    areas: [12],
    no: 5016381,
  },
  {
    key: '13',
    label: '13区域',
    areas: [13],
    no: 5047994,
    rewards: ['誓約経験値', '配列別 討伐券', 'レジェンダリー誓約結晶', '幻妖 討伐券'],
  },
  {
    key: '14',
    label: '14区域',
    areas: [14],
    no: 5078698,
    rewards: ['ヴォイドソウル 100個', 'レジェンダリー〜太初 誓約結晶壺', '太初アクセサリー選択箱'],
  },
  {
    key: '15',
    label: '15区域',
    areas: [15],
    no: 5117743,
    fame: { from: 107000, to: 110000, delta: 3000 },
    rewards: ['啓示 1,000個', 'プライムステラ'],
    notes: [
      '緑色のマスは「歪んだ生命の巡礼」。',
      'レギオンと二重現象は別カウント。アポカリプス討伐券は2段階報酬。',
      'レギオン討伐券のスロット数 =「傭兵団レベル − 3」（例：Lv.11 なら8個、Lv.10 なら7個）。',
    ],
    meta: {
      0: { seed: '22322（右右）' },
      1: { seed: '22322（左左）' },
      2: { seed: '22222' },
      3: { seed: '33333' },
      4: { seed: '22233' },
    },
  },
  {
    key: '16',
    label: '16区域',
    areas: [16],
    no: 5147720,
    rewards: [
      'ユニーク天秤',
      '太初装備への変換確定選択券',
      '太初別 誓約結晶セット壺（レジェンダリー〜太初）',
      '印章 1,000個',
    ],
    meta: {
      0: { seed: '23322' },
      1: { seed: '33322' },
      2: { seed: '23233' },
      3: { seed: '22332' },
      4: { seed: '23232' },
    },
  },
  {
    key: '17',
    label: '17区域',
    areas: [17],
    no: 5172713,
    fame: { from: 112000, to: 114000, delta: 2000 },
    rewards: [
      '太初アクセサリー壺選択箱',
      'エピック装備選択箱',
      'エピック誓約結晶壺',
      '誓約経験値 143,500',
      'レジェンダリー天秤',
    ],
    meta: {
      0: { seed: '22323' },
      1: { seed: '32222' },
      2: { seed: '33222' },
      3: { seed: '33322' },
      4: { seed: '33223' },
    },
  },
  {
    key: '18',
    label: '18区域',
    areas: [18],
    no: 5206325,
    fame: { from: 114000, to: 116000, delta: 2000 },
    rewards: [
      '太初レガシー → レガシー変換書',
      'エピック天秤',
      '啓示 1,000個',
      'ヴォイドソウル 100個',
      '誓約結晶壺（ユニーク〜太初）',
    ],
    notes: ['32232 が重複しているので、青い線での判別に注意。'],
    meta: {
      0: { seed: '32232 (A)' },
      1: { seed: '32232 (B)' },
      2: { seed: '32322' },
      3: { seed: '33332' },
      4: { seed: '33222' },
    },
  },
  {
    key: '19',
    label: '19区域',
    areas: [19],
    no: 5235859,
    fame: { from: 116000, to: 118000, delta: 2000 },
    rewards: [
      '太初レガシー → デガシー変換書（ランダム）',
      '誓約経験値 143,500',
      'レジェンダリー誓約結晶壺',
      '交配者ストライキ 討伐券',
    ],
    meta: {
      0: { seed: '32322' },
      1: { seed: '32332' },
      2: { seed: '32323' },
      3: { seed: '23323' },
      4: { seed: '23233' },
    },
  },
  {
    key: '20',
    label: '20区域',
    areas: [20],
    no: 5261213,
    fame: { from: 118000, to: 120000, delta: 2000 },
    rewards: [
      'レジェンダリー〜太初 全体ランダム結晶壺 1個',
      'ヴォイドソウル 100個',
      'プライムステラ 1個',
      '啓示 1,000個',
      '印章 1,000個',
    ],
    meta: {
      0: { seed: '23333 (A)' },
      1: { seed: '23333 (B)' },
      2: { seed: '23332' },
      3: { seed: '32323' },
      4: { seed: '22332' },
    },
  },
  {
    key: '21',
    label: '21区域',
    areas: [21],
    no: 5280894,
    fame: { from: 120000, to: 122000, delta: 2000 },
    rewards: [
      'ユニーク天秤',
      'レジェンダリー誓約結晶選択箱',
      '誓約経験値 14万',
      '太初アクセサリー「壺」選択箱',
    ],
    meta: {
      0: { seed: '22323' },
      1: { seed: '23323' },
      2: { seed: '23233' },
      3: { seed: '32233' },
      4: { seed: '22333' },
    },
  },
  {
    key: '22',
    label: '22区域',
    areas: [22],
    no: 5303443,
    fame: { from: 122000, to: 124000, delta: 2000 },
    rewards: [
      'セットエピック装備選択箱',
      'レジェンダリー天秤',
      'ユニーク〜太初 誓約結晶壺',
      'プライムステラ',
    ],
    meta: {
      0: { seed: '32222 (A)' },
      1: { seed: '32222 (B)' },
      2: { seed: '23233' },
      3: { seed: '22322' },
      4: { seed: '22333' },
    },
  },
  {
    key: '23',
    label: '23区域',
    areas: [23],
    no: 5322498,
    fame: { from: 124000, to: 125000, delta: 1000 },
    rewards: ['太初アクセサリー選択箱', '誓約経験値 14万', '啓示 1,000個', 'ヴォイドソウル 100個'],
    meta: {
      0: { seed: '23333' },
      1: { seed: '22232' },
      2: { seed: '23232' },
      3: { seed: '22223' },
      4: { seed: '23322' },
    },
  },
  {
    key: '24',
    label: '24区域',
    areas: [24],
    no: 5340396,
    fame: { from: 125000, to: 126000, delta: 1000 },
    rewards: [
      'レジェンダリー〜太初 誓約結晶壺',
      'レジェンダリー誓約結晶選択箱',
      '印章 1,000個',
      'ユニーク天秤',
    ],
    meta: {
      0: { seed: '32322' },
      1: { seed: '22333' },
      2: { seed: '23223' },
      3: { seed: '33323' },
      4: { seed: '33333' },
    },
  },
  {
    key: '25',
    label: '25区域',
    areas: [25],
    no: 5363357,
    fame: { from: 126000, to: 127000, delta: 1000 },
    rewards: [
      'エピック装備選択箱',
      'レジェンダリー誓約結晶選択箱',
      '誓約経験値 14万',
      '黒い災厄 12個',
    ],
    meta: {
      0: { seed: '21223' },
      1: { seed: '22123' },
      2: { seed: '22122' },
      3: { seed: '23222' },
      4: { seed: '12122' },
    },
  },
  {
    key: '26',
    label: '26区域',
    areas: [26],
    no: 5381891,
    fame: { from: 127000, to: 127500, delta: 500 },
    rewards: [
      'エピック誓約書',
      'エピック誓約結晶壺',
      'ソリッドソウル 100個',
      '太初装備昇級書',
      '啓示 1,000個',
    ],
  },
  {
    key: '27',
    label: '27区域',
    areas: [27],
    no: 5399690,
    fame: { from: 127500, to: 128000, delta: 500 },
    rewards: [
      '光輝の痕跡 1個（太初誓約書の定価素材）',
      '太初アクセサリー「壺」選択箱',
      'エピック天秤',
      '黒い災厄 12個',
      'レジェンダリー誓約結晶選択箱',
      'レジェンダリー〜太初 誓約結晶壺',
    ],
  },
  {
    key: '28',
    label: '28区域',
    areas: [28],
    no: 5433285,
    fame: { from: 128000, to: 128500, delta: 500 },
    rewards: [
      '太初レガシー選択変換券',
      'ソリッドソウル 100個',
      '光輝のソウル 100個',
      '誓約経験値 143,500',
      'セットエピック選択箱',
    ],
    notes: ['太初レガシー選択変換券はデガシーにも使用できる。'],
  },
  {
    key: '29',
    label: '29区域',
    areas: [29],
    no: 5460256,
    fame: { from: 125500, to: 126000, delta: 500 },
    rewards: [
      '光輝の痕跡 1個（太初誓約書の定価素材）',
      '太初レガシー武器「選択」箱',
      'レジェンダリー誓約結晶選択箱',
      '啓示 1,000個',
    ],
    notes: ['名声上昇値は 30% パッチ以降に下方修正された。'],
  },
  {
    key: '30',
    label: '30区域',
    areas: [30],
    no: 5491826,
    fame: { from: 126500, to: 127000, delta: 500 },
    rewards: [
      '太初結晶壺',
      'エピック結晶製作書（素材の欠片を使用）',
      'エピック結晶壺',
      'レジェンダリー誓約結晶壺',
    ],
    notes: ['以前まで討伐券があったマスには、代わりに結晶壺が追加された。'],
  },
  {
    key: '31',
    label: '31区域',
    areas: [31],
    no: 5522816,
    fame: { from: 127000, to: 127000, delta: 0 },
    rewards: [
      '太初 光輝の意志',
      '誓約経験値 143,500',
      '黒い災厄 12個',
      '啓示 1,000個',
      'エピックセット装備選択箱',
    ],
    notes: ['31区域からは名声（体力）の上昇がない。'],
  },
]

export const FLOORS: Floor[] = SEEDS.map((s) => {
  const all = FLOOR_IMAGES[s.imageKey ?? s.key] ?? []
  const slice = s.imageRange ? all.slice(s.imageRange[0], s.imageRange[1]) : all

  return {
    key: s.key,
    label: s.label,
    areas: s.areas,
    fame: s.fame,
    rewards: s.rewards,
    notes: s.notes,
    videoUrl: s.videoUrl,
    sourceUrl: postUrl(s.no),
    images: slice.map((src, i) => ({ src, ...(s.meta?.[i] ?? {}) })),
  }
})

export const FLOOR_BY_KEY = new Map(FLOORS.map((f) => [f.key, f]))

/** 区域番号（1〜31）から、その区域を扱う記事を引く。 */
export const FLOOR_BY_AREA = new Map<number, Floor>(
  FLOORS.flatMap((f) => f.areas.map((a) => [a, f] as const)),
)

export const MAX_AREA = 31

/**
 * 一覧表示用の軽量サムネイル（scripts/make-thumbs.mjs で生成）のパス。
 * 原寸 PNG は拡大表示のときだけ読み込む。
 */
export function thumbFor(src: string): string {
  return src.replace('/maps/', '/maps/thumbs/').replace(/\.\w+$/, '.webp')
}

/** シードコードの数字部分だけを取り出す。'22322（右右）' → '22322' */
export function seedDigits(seed: string): string {
  return seed.replace(/\D/g, '')
}

export interface SeedHit {
  floor: Floor
  image: FloorImage
  digits: string
}

const SEED_INDEX: SeedHit[] = FLOORS.flatMap((floor) =>
  floor.images
    .filter((image) => image.seed)
    .map((image) => ({ floor, image, digits: seedDigits(image.seed!) })),
)

/**
 * ゲーム内で数えた部屋数（例 '23333'）から該当マップを引く。
 * 途中まで入力した段階でも前方一致で候補を出す。
 */
export function searchSeed(query: string): SeedHit[] {
  const q = query.replace(/\D/g, '')
  if (!q) return []
  return SEED_INDEX.filter((hit) => hit.digits.startsWith(q))
}

export const SEED_COUNT = SEED_INDEX.length
