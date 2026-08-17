import { FLOOR_IMAGES } from './floor-images'
import type { Locale, Localized } from '@/lib/locale'

/**
 * 各階の攻略データ。マップ画像・シードコード・注釈は DCインサイド 던파IP マイナーギャラリー
 * のまとめ記事群（下記 sourceNo）を出典とし、注釈は日本語・英語に訳してある。
 */

export const GUIDE_INDEX_URL = 'https://gall.dcinside.com/mgallery/board/view?id=dfip&no=5146377'

const postUrl = (no: number) => `https://gall.dcinside.com/mgallery/board/view/?id=dfip&no=${no}`

/** マップ画像1枚。seed が付くものは元記事でシードコードが明記されていたもの。 */
export interface FloorImage {
  src: string
  /** 「23333」など、元記事の見出しにあったシードコード。数字のみ。 */
  seed?: string
  /** 同じコードのシードを区別するための注記（「右右」など）。 */
  seedNote?: Localized
  /** 判別のコツなど、その画像に紐づく説明。 */
  caption?: Localized
  /** シードマップではなく、判別方法を説明するための図。 */
  figure?: boolean
  /** マスのアイコンと報酬の対応を示す凡例画像。 */
  legend?: boolean
}

export interface Floor {
  /** ルーティングに使うキー。 */
  key: string
  /** 表示用ラベル。areas から組み立てる。 */
  label: Localized
  /** この記事がカバーする区域番号。 */
  areas: number[]
  fame?: { from: number; to: number; delta: number }
  /** 元記事の「主要報酬」欄。 */
  rewards?: Localized[]
  /** 攻略の要点。 */
  notes?: Localized[]
  images: FloorImage[]
  sourceUrl: string
  videoUrl?: string
}

interface FloorSeed {
  key: string
  areas: number[]
  no: number
  fame?: { from: number; to: number; delta: number }
  rewards?: Localized[]
  notes?: Localized[]
  /** 画像の添字（0 始まり）→ メタ情報。 */
  meta?: Record<number, Omit<FloorImage, 'src'>>
  videoUrl?: string
  /** FLOOR_IMAGES 上の取得元キー。省略時は key と同じ。 */
  imageKey?: string
  /** imageKey の画像から切り出す範囲 [開始, 終了)。1〜3区域は1記事に3区域分入っている。 */
  imageRange?: [number, number]
}

/** 凡例画像に共通の説明。 */
const LEGEND_CAPTION: Localized = {
  ja: 'このマップのアイコンと報酬の対応表。',
  en: 'The icon / reward table for this map.',
}

/** 「1区域」「1〜3区域」のような表示名を区域番号から組み立てる。 */
function labelFor(areas: number[]): Localized {
  if (areas.length === 1) return { ja: `${areas[0]}区域`, en: `Area ${areas[0]}` }
  const first = areas[0]
  const last = areas[areas.length - 1]
  return { ja: `${first}〜${last}区域`, en: `Areas ${first}–${last}` }
}

const SEEDS: FloorSeed[] = [
  {
    key: '1',
    areas: [1],
    no: 4738329,
    imageKey: '1-3',
    imageRange: [0, 6],
    notes: [
      {
        ja: '1〜3区域は右端の列の部屋数を上から数えるだけでシードを判別できる。',
        en: 'For areas 1–3, counting the rooms in the rightmost column from the top is enough to identify the seed.',
      },
      {
        ja: 'ひし形のモンスター配置マスは3種類の報酬のうち1つが出るが、どのマスで何が出たかを記録している人がほとんどおらず、後から確認する手段もないため判別できない。',
        en: 'The diamond-shaped monster rooms drop one of three rewards, but hardly anyone records which room gave what and there is no way to check afterwards, so they cannot be pinned down.',
      },
    ],
    meta: {
      0: { legend: true, caption: LEGEND_CAPTION },
      1: { seed: '13322' },
      2: { seed: '22113' },
      3: { seed: '23132' },
      4: { seed: '11221' },
      5: { seed: '12321' },
    },
  },
  {
    key: '2',
    areas: [2],
    no: 4738329,
    imageKey: '1-3',
    imageRange: [6, 12],
    notes: [
      {
        ja: '右端の列の部屋数でシードを判別できる。',
        en: 'The room counts in the rightmost column identify the seed.',
      },
    ],
    meta: {
      0: { legend: true, caption: LEGEND_CAPTION },
      1: { seed: '31222' },
      2: { seed: '22232' },
      3: { seed: '12322' },
      4: { seed: '22222' },
      5: { seed: '32122' },
    },
  },
  {
    key: '3',
    areas: [3],
    no: 4738329,
    imageKey: '1-3',
    imageRange: [12, 18],
    notes: [
      {
        ja: '右端の列の部屋数でシードを判別できる。ここまでは青い線を見る必要はない。',
        en: 'The room counts in the rightmost column identify the seed. Up to this point you never need to look at the blue lines.',
      },
    ],
    meta: {
      0: { legend: true, caption: LEGEND_CAPTION },
      1: { seed: '12322' },
      2: { seed: '21223' },
      3: { seed: '21211' },
      4: { seed: '22221' },
      5: { seed: '11222' },
    },
  },
  {
    key: '4',
    areas: [4],
    no: 4771857,
    notes: [
      {
        ja: '4区域から判別方法が変わる。5つのシードすべてが 5×5 配置で同じ形をしているため、右端の部屋数では見分けられない。',
        en: 'From area 4 the method changes. All five seeds share the same 5×5 layout, so the rightmost room counts cannot tell them apart.',
      },
      {
        ja: '青い点線2本の位置でシードを判別する。',
        en: 'Identify the seed from the positions of the two blue dotted lines.',
      },
    ],
    meta: {
      0: {
        figure: true,
        caption: {
          ja: '5つのシードすべてが 5×5 配置で同一。右端の数だけでは判別できない。',
          en: 'All five seeds share the same 5×5 layout — the rightmost counts alone are not enough.',
        },
      },
      1: {
        figure: true,
        caption: {
          ja: 'この青い点線2本の位置でシードを見分ける。',
          en: 'Tell the seeds apart by where these two blue dotted lines sit.',
        },
      },
    },
    videoUrl: 'https://youtu.be/PIreX-3oZx4',
  },
  {
    key: '5',
    areas: [5],
    no: 4793763,
    notes: [
      {
        ja: 'いつも通り右端の部屋数を数えれば判別できる。',
        en: 'Counting the rightmost rooms as usual is enough to identify the seed.',
      },
      {
        ja: '33122 は右下2マスがロックされたままだが、残っているのが「啓示100個」と「遺物」なので開ける価値は薄い。',
        en: 'In 33122 the bottom-right two rooms stay locked, but all that is left there is "100 oracles" and a relic, so opening them is hardly worth it.',
      },
    ],
    videoUrl: 'https://youtu.be/eiNfBn4hA2I',
  },
  {
    key: '6',
    areas: [6],
    no: 4818704,
    notes: [
      {
        ja: '2区域で左から数えると重複が出たため右端基準に統一したが、6区域では右端でもシードが重複する。',
        en: 'Counting from the left produced duplicates back in area 2, so this guide standardised on the right edge — but in area 6 even the right edge yields duplicate seeds.',
      },
      {
        ja: '左右で数え方を変えると混乱しやすいので、右端を基準にしつつ青い線の位置を補助的に使う。',
        en: 'Switching sides mid-way is confusing, so stick with the right edge and use the blue line positions as a tiebreaker.',
      },
      {
        ja: '自分のシードが 21222 の場合は、青い線の位置も併せて確認すること。',
        en: 'If your seed reads 21222, check the blue line positions as well.',
      },
      {
        ja: '残る2マスは「遺物」と「啓示100個」なのでスルーでよい。',
        en: 'The two remaining rooms hold a relic and "100 oracles", so they can be skipped.',
      },
    ],
    meta: {
      1: {
        figure: true,
        caption: {
          ja: '21222 は重複するため、青い線の位置も確認する。',
          en: '21222 is duplicated, so check the blue line positions too.',
        },
      },
    },
    videoUrl: 'https://youtu.be/-zKToWmeyIE',
  },
  {
    key: '7',
    areas: [7],
    no: 4853018,
    notes: [
      {
        ja: '7区域は5つのシードすべてが 5×5 で配置が同一なうえ、青い線の位置まで一致するシードが存在する。',
        en: 'In area 7 all five seeds share the same 5×5 layout, and some of them even share the same blue line positions.',
      },
      {
        ja: '青い線が一致する2つのシードは、1行目の右から1番目のマスを開けて中身で判別する（どちらのシードでも開ける必要があるマス）。',
        en: 'For the two seeds whose blue lines match, open the first room from the right in row 1 and identify the seed from its contents — a room both seeds require you to open anyway.',
      },
      {
        ja: '残りのシードは青い線の位置で判別できる。',
        en: 'The remaining seeds can be identified from the blue line positions.',
      },
    ],
    meta: {
      1: {
        figure: true,
        caption: {
          ja: '青い線の位置まで同じシードが存在する。',
          en: 'Some seeds match right down to the blue line positions.',
        },
      },
      2: {
        figure: true,
        caption: {
          ja: '1行目の右から1番目が「調査券」ならこちらのシード。',
          en: 'If the first room from the right in row 1 holds a survey ticket, it is this seed.',
        },
      },
      3: {
        figure: true,
        caption: {
          ja: '1行目の右から1番目が「入場券」ならこちらのシード。',
          en: 'If the first room from the right in row 1 holds an entry ticket, it is this seed.',
        },
      },
    },
    videoUrl: 'https://youtu.be/qGkB5G1ZKQs',
  },
  {
    key: '8',
    areas: [8],
    no: 4889996,
    notes: [
      {
        ja: '不自然なほど 22222 の重複が多い。31222 ではなく 22222 だった場合は、青い線を見てシードを判別する。',
        en: '22222 turns up an unusual number of times. If you read 22222 rather than 31222, use the blue lines to identify the seed.',
      },
    ],
    videoUrl: 'https://youtu.be/UkK1I8MOdIM',
  },
  {
    key: '9',
    areas: [9],
    no: 4926562,
    notes: [
      {
        ja: '9区域は 21222 の重複が3つある。重複した場合はいつも通り青い線まで確認すれば判別できる。',
        en: 'Area 9 has three seeds reading 21222. As always, checking the blue lines resolves the tie.',
      },
    ],
    videoUrl: 'https://youtu.be/OUZiRLSiNsQ',
  },
  {
    key: '10',
    areas: [10],
    no: 4956365,
    notes: [{ ja: '10区域に重複シードはない。', en: 'Area 10 has no duplicate seeds.' }],
    videoUrl: 'https://youtu.be/rJkNahZAaiU',
  },
  {
    key: '11',
    areas: [11],
    no: 4984071,
    notes: [
      {
        ja: '11区域は 23212 が重複する。23212 だった場合は青い線も確認するか、左端の部屋数で判別する。',
        en: 'Area 11 has duplicate 23212 seeds. If you read 23212, check the blue lines as well, or count the rooms in the leftmost column.',
      },
    ],
    videoUrl: 'https://youtu.be/chw510ToJX8',
  },
  {
    key: '12',
    areas: [12],
    no: 5016381,
  },
  {
    key: '13',
    areas: [13],
    no: 5047994,
    rewards: [
      { ja: '誓約経験値', en: 'Oath EXP' },
      { ja: '配列別 討伐券', en: 'Subjugation tickets by layout' },
      { ja: 'レジェンダリー誓約結晶', en: 'Legendary Oath Crystal' },
      { ja: '幻妖 討伐券', en: 'Phantom Subjugation Ticket' },
    ],
  },
  {
    key: '14',
    areas: [14],
    no: 5078698,
    rewards: [
      { ja: 'ヴォイドソウル 100個', en: 'Void Soul ×100' },
      { ja: 'レジェンダリー〜太初 誓約結晶壺', en: 'Legendary–Primordial Oath Crystal Jar' },
      { ja: '太初アクセサリー選択箱', en: 'Primordial Accessory Selection Box' },
    ],
  },
  {
    key: '15',
    areas: [15],
    no: 5117743,
    fame: { from: 107000, to: 110000, delta: 3000 },
    rewards: [
      { ja: '啓示 1,000個', en: 'Doom Oracle ×1,000' },
      { ja: 'プライムステラ', en: 'Prime Stella' },
    ],
    notes: [
      { ja: '緑色のマスは「歪んだ生命の巡礼」。', en: 'The green rooms are Chaotic Life Pilgrimages.' },
      {
        ja: 'レギオンと二重現象は別カウント。アポカリプス討伐券は2段階報酬。',
        en: 'Legion and Dual Phenomenon are counted separately. The Apocalypse subjugation ticket covers both stages.',
      },
      {
        ja: 'レギオン討伐券のスロット数 =「傭兵団レベル − 3」（例：Lv.11 なら8個、Lv.10 なら7個）。',
        en: 'Legion subjugation ticket slots = mercenary level − 3 (e.g. 8 at Lv.11, 7 at Lv.10).',
      },
    ],
    meta: {
      0: { seed: '22322', seedNote: { ja: '右右', en: 'right / right' } },
      1: { seed: '22322', seedNote: { ja: '左左', en: 'left / left' } },
      2: { seed: '22222' },
      3: { seed: '33333' },
      4: { seed: '22233' },
    },
  },
  {
    key: '16',
    areas: [16],
    no: 5147720,
    rewards: [
      { ja: 'ユニーク天秤', en: 'Unique Scale' },
      {
        ja: '太初装備への変換確定選択券',
        en: 'Guaranteed Primordial Equipment Conversion Selection Ticket',
      },
      {
        ja: '太初別 誓約結晶セット壺（レジェンダリー〜太初）',
        en: 'Oath Crystal Set Jar by primordial type (Legendary–Primordial)',
      },
      { ja: '印章 1,000個', en: 'Seal ×1,000' },
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
    areas: [17],
    no: 5172713,
    fame: { from: 112000, to: 114000, delta: 2000 },
    rewards: [
      { ja: '太初アクセサリー壺選択箱', en: 'Primordial Accessory Jar Selection Box' },
      { ja: 'エピック装備選択箱', en: 'Epic Equipment Selection Box' },
      { ja: 'エピック誓約結晶壺', en: 'Epic Oath Crystal Jar' },
      { ja: '誓約経験値 143,500', en: 'Oath EXP 143,500' },
      { ja: 'レジェンダリー天秤', en: 'Legendary Scale' },
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
    areas: [18],
    no: 5206325,
    fame: { from: 114000, to: 116000, delta: 2000 },
    rewards: [
      { ja: '太初レガシー → レガシー変換書', en: 'Primordial Legacy → Legacy Conversion Scroll' },
      { ja: 'エピック天秤', en: 'Epic Scale' },
      { ja: '啓示 1,000個', en: 'Doom Oracle ×1,000' },
      { ja: 'ヴォイドソウル 100個', en: 'Void Soul ×100' },
      { ja: '誓約結晶壺（ユニーク〜太初）', en: 'Oath Crystal Jar (Unique–Primordial)' },
    ],
    notes: [
      {
        ja: '32232 が重複しているので、青い線での判別に注意。',
        en: '32232 is duplicated, so take care when telling them apart by the blue lines.',
      },
    ],
    meta: {
      0: { seed: '32232', seedNote: { ja: 'A', en: 'A' } },
      1: { seed: '32232', seedNote: { ja: 'B', en: 'B' } },
      2: { seed: '32322' },
      3: { seed: '33332' },
      4: { seed: '33222' },
    },
  },
  {
    key: '19',
    areas: [19],
    no: 5235859,
    fame: { from: 116000, to: 118000, delta: 2000 },
    rewards: [
      {
        ja: '太初レガシー → デガシー変換書（ランダム）',
        en: 'Primordial Legacy → Degacy Conversion Scroll (random)',
      },
      { ja: '誓約経験値 143,500', en: 'Oath EXP 143,500' },
      { ja: 'レジェンダリー誓約結晶壺', en: 'Legendary Oath Crystal Jar' },
      { ja: '交配者ストライキ 討伐券', en: 'Crossbreeder Strike Subjugation Ticket' },
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
    areas: [20],
    no: 5261213,
    fame: { from: 118000, to: 120000, delta: 2000 },
    rewards: [
      {
        ja: 'レジェンダリー〜太初 全体ランダム結晶壺 1個',
        en: 'Legendary–Primordial fully random Crystal Jar ×1',
      },
      { ja: 'ヴォイドソウル 100個', en: 'Void Soul ×100' },
      { ja: 'プライムステラ 1個', en: 'Prime Stella ×1' },
      { ja: '啓示 1,000個', en: 'Doom Oracle ×1,000' },
      { ja: '印章 1,000個', en: 'Seal ×1,000' },
    ],
    meta: {
      0: { seed: '23333', seedNote: { ja: 'A', en: 'A' } },
      1: { seed: '23333', seedNote: { ja: 'B', en: 'B' } },
      2: { seed: '23332' },
      3: { seed: '32323' },
      4: { seed: '22332' },
    },
  },
  {
    key: '21',
    areas: [21],
    no: 5280894,
    fame: { from: 120000, to: 122000, delta: 2000 },
    rewards: [
      { ja: 'ユニーク天秤', en: 'Unique Scale' },
      { ja: 'レジェンダリー誓約結晶選択箱', en: 'Legendary Oath Crystal Selection Box' },
      { ja: '誓約経験値 14万', en: 'Oath EXP 140,000' },
      { ja: '太初アクセサリー「壺」選択箱', en: 'Primordial Accessory "Jar" Selection Box' },
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
    areas: [22],
    no: 5303443,
    fame: { from: 122000, to: 124000, delta: 2000 },
    rewards: [
      { ja: 'セットエピック装備選択箱', en: 'Set Epic Equipment Selection Box' },
      { ja: 'レジェンダリー天秤', en: 'Legendary Scale' },
      { ja: 'ユニーク〜太初 誓約結晶壺', en: 'Unique–Primordial Oath Crystal Jar' },
      { ja: 'プライムステラ', en: 'Prime Stella' },
    ],
    meta: {
      0: { seed: '32222', seedNote: { ja: 'A', en: 'A' } },
      1: { seed: '32222', seedNote: { ja: 'B', en: 'B' } },
      2: { seed: '23233' },
      3: { seed: '22322' },
      4: { seed: '22333' },
    },
  },
  {
    key: '23',
    areas: [23],
    no: 5322498,
    fame: { from: 124000, to: 125000, delta: 1000 },
    rewards: [
      { ja: '太初アクセサリー選択箱', en: 'Primordial Accessory Selection Box' },
      { ja: '誓約経験値 14万', en: 'Oath EXP 140,000' },
      { ja: '啓示 1,000個', en: 'Doom Oracle ×1,000' },
      { ja: 'ヴォイドソウル 100個', en: 'Void Soul ×100' },
    ],
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
    areas: [24],
    no: 5340396,
    fame: { from: 125000, to: 126000, delta: 1000 },
    rewards: [
      { ja: 'レジェンダリー〜太初 誓約結晶壺', en: 'Legendary–Primordial Oath Crystal Jar' },
      { ja: 'レジェンダリー誓約結晶選択箱', en: 'Legendary Oath Crystal Selection Box' },
      { ja: '印章 1,000個', en: 'Seal ×1,000' },
      { ja: 'ユニーク天秤', en: 'Unique Scale' },
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
    areas: [25],
    no: 5363357,
    fame: { from: 126000, to: 127000, delta: 1000 },
    rewards: [
      { ja: 'エピック装備選択箱', en: 'Epic Equipment Selection Box' },
      { ja: 'レジェンダリー誓約結晶選択箱', en: 'Legendary Oath Crystal Selection Box' },
      { ja: '誓約経験値 14万', en: 'Oath EXP 140,000' },
      { ja: '黒い災厄 12個', en: 'Black Calamity ×12' },
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
    areas: [26],
    no: 5381891,
    fame: { from: 127000, to: 127500, delta: 500 },
    rewards: [
      { ja: 'エピック誓約書', en: 'Epic Oath Scroll' },
      { ja: 'エピック誓約結晶壺', en: 'Epic Oath Crystal Jar' },
      { ja: 'ソリッドソウル 100個', en: 'Solid Soul ×100' },
      { ja: '太初装備昇級書', en: 'Primordial Equipment Upgrade Scroll' },
      { ja: '啓示 1,000個', en: 'Doom Oracle ×1,000' },
    ],
  },
  {
    key: '27',
    areas: [27],
    no: 5399690,
    fame: { from: 127500, to: 128000, delta: 500 },
    rewards: [
      {
        ja: '光輝の痕跡 1個（太初誓約書の定価素材）',
        en: 'Trace of Radiance ×1 (material for the Primordial Oath Scroll)',
      },
      { ja: '太初アクセサリー「壺」選択箱', en: 'Primordial Accessory "Jar" Selection Box' },
      { ja: 'エピック天秤', en: 'Epic Scale' },
      { ja: '黒い災厄 12個', en: 'Black Calamity ×12' },
      { ja: 'レジェンダリー誓約結晶選択箱', en: 'Legendary Oath Crystal Selection Box' },
      { ja: 'レジェンダリー〜太初 誓約結晶壺', en: 'Legendary–Primordial Oath Crystal Jar' },
    ],
  },
  {
    key: '28',
    areas: [28],
    no: 5433285,
    fame: { from: 128000, to: 128500, delta: 500 },
    rewards: [
      { ja: '太初レガシー選択変換券', en: 'Primordial Legacy Selection Conversion Ticket' },
      { ja: 'ソリッドソウル 100個', en: 'Solid Soul ×100' },
      { ja: '光輝のソウル 100個', en: 'Radiance Soul ×100' },
      { ja: '誓約経験値 143,500', en: 'Oath EXP 143,500' },
      { ja: 'セットエピック選択箱', en: 'Set Epic Selection Box' },
    ],
    notes: [
      {
        ja: '太初レガシー選択変換券はデガシーにも使用できる。',
        en: 'The Primordial Legacy Selection Conversion Ticket works on Degacies as well.',
      },
    ],
  },
  {
    key: '29',
    areas: [29],
    no: 5460256,
    fame: { from: 125500, to: 126000, delta: 500 },
    rewards: [
      {
        ja: '光輝の痕跡 1個（太初誓約書の定価素材）',
        en: 'Trace of Radiance ×1 (material for the Primordial Oath Scroll)',
      },
      { ja: '太初レガシー武器「選択」箱', en: 'Primordial Legacy Weapon "Selection" Box' },
      { ja: 'レジェンダリー誓約結晶選択箱', en: 'Legendary Oath Crystal Selection Box' },
      { ja: '啓示 1,000個', en: 'Doom Oracle ×1,000' },
    ],
    notes: [
      {
        ja: '名声上昇値は 30% パッチ以降に下方修正された。',
        en: 'The fame gain was reduced from the 30% patch onwards.',
      },
    ],
  },
  {
    key: '30',
    areas: [30],
    no: 5491826,
    fame: { from: 126500, to: 127000, delta: 500 },
    rewards: [
      { ja: '太初結晶壺', en: 'Primordial Crystal Jar' },
      {
        ja: 'エピック結晶製作書（素材の欠片を使用）',
        en: 'Epic Crystal Crafting Scroll (uses material shards)',
      },
      { ja: 'エピック結晶壺', en: 'Epic Crystal Jar' },
      { ja: 'レジェンダリー誓約結晶壺', en: 'Legendary Oath Crystal Jar' },
    ],
    notes: [
      {
        ja: '以前まで討伐券があったマスには、代わりに結晶壺が追加された。',
        en: 'The rooms that used to hold subjugation tickets now hold crystal jars instead.',
      },
    ],
  },
  {
    key: '31',
    areas: [31],
    no: 5522816,
    fame: { from: 127000, to: 127000, delta: 0 },
    rewards: [
      { ja: '太初 光輝の意志', en: 'Primordial Will of Radiance' },
      { ja: '誓約経験値 143,500', en: 'Oath EXP 143,500' },
      { ja: '黒い災厄 12個', en: 'Black Calamity ×12' },
      { ja: '啓示 1,000個', en: 'Doom Oracle ×1,000' },
      { ja: 'エピックセット装備選択箱', en: 'Epic Set Equipment Selection Box' },
    ],
    notes: [
      {
        ja: '31区域からは名声（体力）の上昇がない。',
        en: 'From area 31 onwards there is no further fame (HP) increase.',
      },
    ],
  },
]

export const FLOORS: Floor[] = SEEDS.map((s) => {
  const all = FLOOR_IMAGES[s.imageKey ?? s.key] ?? []
  const slice = s.imageRange ? all.slice(s.imageRange[0], s.imageRange[1]) : all

  return {
    key: s.key,
    label: labelFor(s.areas),
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

/** シードコードの数字部分だけを取り出す。念のため数字以外を落とす。 */
export function seedDigits(seed: string): string {
  return seed.replace(/\D/g, '')
}

/** 表示用のシード名。同じコードが複数あるものには注記を添える。'22322（右右）' */
export function seedLabel(image: FloorImage, locale: Locale): string {
  if (!image.seed) return ''
  if (!image.seedNote) return image.seed
  return locale === 'ja'
    ? `${image.seed}（${image.seedNote.ja}）`
    : `${image.seed} (${image.seedNote.en})`
}

export interface SeedHit {
  floor: Floor
  image: FloorImage
  digits: string
}

/** シードコードを持つマップ画像の一覧。収録パターン数の表示に使う。 */
const SEED_INDEX: SeedHit[] = FLOORS.flatMap((floor) =>
  floor.images
    .filter((image) => image.seed)
    .map((image) => ({ floor, image, digits: seedDigits(image.seed!) })),
)

export const SEED_COUNT = SEED_INDEX.length
