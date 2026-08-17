import type { Localized } from '@/lib/locale'

/**
 * 나무위키「역설의 미궁/지도」由来のデータ。
 * https://namu.wiki/w/역설의 미궁/지도
 *
 * 나무위키の本文は CC BY-NC-SA 2.0 KR。ここから写した記述を使うため、
 * 出典表示とライセンスの継承が必要（サイト下部に表示している）。
 *
 * 記号の対応（나무위키の凡例）:
 *   M メイン関門 / R 遺物発掘地帯 / K 迷宮開拓拠点(調査券) / O 迷宮開拓拠点(入場券)
 *   H 歪んだ光輝の巡礼 / D 離脱した千海の空 / A 二重現象 / L 終末の落ちた羅針盤
 *   α β γ 装備倉庫・調律者の痕跡系（区域ごとに中身が変わる）
 *   1 2 3 歪んだ生命の巡礼（区域ごとに中身が変わる）
 */

export const NAMU_SOURCE = {
  label: '나무위키 — 역설의 미궁/지도',
  url: 'https://namu.wiki/w/%EC%97%AD%EC%84%A4%EC%9D%98%20%EB%AF%B8%EA%B6%81/%EC%A7%80%EB%8F%84',
  license: 'CC BY-NC-SA 2.0 KR',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/2.0/kr/',
}

/**
 * ノード種別ごとの報酬。区域によらず共通のもの。
 * ここに載っている種別は、区域別の上書き（AREA_REWARDS）より優先度が低い。
 */
const CENTRAL_CHECKPOINT_TEXT: Localized = {
  ja: '中央に位置する関門。下の関門へ移動するにも、そのラインの外郭関門に入場するにも撃破が必要。',
  en: 'A gate at the centre of the map. You must clear it both to move down to the next gate and to enter the outer gates on its row.',
}

const SUBJUGATION_DROP_TEXT: Localized = {
  ja: '撃破すると対応するダンジョンの討伐券を獲得する。毎週、傭兵団レベルに比例したキャラクター数だけ撃破できる。',
  en: 'Clearing it grants the subjugation ticket for the corresponding dungeon. Each week you may clear it on as many characters as your mercenary level allows.',
}

export const TYPE_REWARD_TEXT: Record<string, Localized> = {
  central_checkpoint_start: CENTRAL_CHECKPOINT_TEXT,
  central_checkpoint: CENTRAL_CHECKPOINT_TEXT,
  central_checkpoint_last: CENTRAL_CHECKPOINT_TEXT,
  relic_excavation_zone: {
    ja: '撃破するとランダムな遺物を獲得する。特定の関門で使うと対応した効果を得られる。遺物発掘地帯1つにつき最大30回まで入場できる。',
    en: 'Clearing it grants a random relic, which produces its effect when used at the matching gate. Each relic excavation zone can be entered up to 30 times.',
  },
  chaotic_radiance_pilgrimage: {
    ja: '撃破すると終末の啓示を 100〜150個 獲得する。',
    en: 'Clearing it grants 100–150 Doom Oracles.',
  },
  deviated_thousand_seas_sky: {
    ja: '撃破すると、毎日支給される「啓示：千海を抱く天 討伐券」が1個増える。',
    en: 'Clearing it adds one more "Revelation: Sky Embracing a Thousand Seas" subjugation ticket to your daily allowance.',
  },
  dual_phenomenon: SUBJUGATION_DROP_TEXT,
  legion_compressed: SUBJUGATION_DROP_TEXT,
}

/** 迷宮開拓拠点は等級（key / ticket）で報酬が変わる。 */
export const SUPPLY_BASE_REWARD: Record<string, { name: Localized; count: number }> = {
  key: { name: { ja: '迷宮調査券', en: 'Labyrinth Survey Ticket' }, count: 2 },
  ticket: { name: { ja: '外郭入場券', en: 'Outer Gate Entry Ticket' }, count: 2 },
}

export interface AreaReward {
  name: Localized
  nameKr: string
  note?: Localized
}

/**
 * 区域別マスの報酬は同じものが何度も出てくるので、名前を付けて使い回す。
 * 韓国語名は 나무위키 の表記に合わせてある（表記ゆれは1つに寄せた）。
 */
const R = {
  legendaryFullSet: {
    name: {
      ja: '115Lvセット レジェンダリー装備 フルセット箱',
      en: 'Lv.115 Set Legendary Equipment Full Set Box',
    },
    nameKr: '115레벨 세트 레전더리 장비 풀세트 상자',
  },
  splendidUniqueJarBox: {
    name: {
      ja: '115Lvセット 華麗なユニーク〜太初 装備壺 選択箱',
      en: 'Lv.115 Set Splendid Unique–Primordial Equipment Jar Selection Box',
    },
    nameKr: '115레벨 세트 화려한 유니크~태초 장비 항아리 선택 상자',
  },
  brilliantLegendaryJarBox: {
    name: {
      ja: '115Lvセット 燦爛たるレジェンダリー〜太初 装備壺 選択箱',
      en: 'Lv.115 Set Brilliant Legendary–Primordial Equipment Jar Selection Box',
    },
    nameKr: '115레벨 세트 찬란한 레전더리~태초 장비 항아리 선택 상자',
  },
  iridescentEpicJarBox: {
    name: {
      ja: '115Lvセット 燦爛たるエピック〜太初 装備壺 選択箱',
      en: 'Lv.115 Set Iridescent Epic–Primordial Equipment Jar Selection Box',
    },
    nameKr: '115레벨 세트 영롱한 에픽~태초 장비 항아리 선택 상자',
  },
  epicEquipmentBox: {
    name: {
      ja: '115Lvセット エピック装備 選択箱',
      en: 'Lv.115 Set Epic Equipment Selection Box',
    },
    nameKr: '115레벨 세트 에픽 장비 선택 상자',
  },
  primordialAccessoryJar: {
    name: { ja: '115Lvセット 太初アクセサリー壺', en: 'Lv.115 Set Primordial Accessory Jar' },
    nameKr: '115레벨 세트 태초 악세서리 항아리',
  },
  primordialAccessoryJarBox: {
    name: {
      ja: '115Lvセット 太初アクセサリー壺 選択箱',
      en: 'Lv.115 Set Primordial Accessory Jar Selection Box',
    },
    nameKr: '115레벨 세트 태초 악세서리 항아리 선택 상자',
  },
  primordialAccessoryBox: {
    name: {
      ja: '115Lvセット 太初アクセサリー 選択箱',
      en: 'Lv.115 Set Primordial Accessory Selection Box',
    },
    nameKr: '115레벨 세트 태초 악세서리 선택 상자',
  },
  primordialWeaponBox: {
    name: { ja: '太初 一般武器 選択箱', en: 'Primordial Normal Weapon Selection Box' },
    nameKr: '태초 일반 무기 선택 상자',
  },
  splendidUniqueCrystalJar: {
    name: {
      ja: '華麗なユニーク〜太初 誓約結晶壺',
      en: 'Splendid Unique–Primordial Oath Crystal Jar',
    },
    nameKr: '화려한 유니크~태초 서약 결정 항아리',
  },
  brilliantLegendaryCrystalJar: {
    name: {
      ja: '燦爛たるレジェンダリー〜太初 誓約結晶壺',
      en: 'Brilliant Legendary–Primordial Oath Crystal Jar',
    },
    nameKr: '찬란한 레전더리~태초 서약 결정 항아리',
  },
  legendaryCrystalJar: {
    name: { ja: 'レジェンダリー誓約結晶壺', en: 'Legendary Oath Crystal Jar' },
    nameKr: '레전더리 서약 결정 항아리',
  },
  epicCrystalJar: {
    name: { ja: 'エピック誓約結晶壺', en: 'Epic Oath Crystal Jar' },
    nameKr: '에픽 서약 결정 항아리',
  },
  primordialCrystalJar: {
    name: { ja: '太初誓約結晶壺', en: 'Primordial Oath Crystal Jar' },
    nameKr: '태초 서약 결정 항아리',
  },
  legendaryCrystalBox: {
    name: { ja: 'レジェンダリー誓約結晶 選択箱', en: 'Legendary Oath Crystal Selection Box' },
    nameKr: '레전더리 서약 결정 선택 상자',
  },
  uniqueCrystalBox: {
    name: { ja: 'ユニーク誓約結晶 選択箱', en: 'Unique Oath Crystal Selection Box' },
    nameKr: '유니크 서약 결정 선택 상자',
  },
  skyTicket: {
    name: {
      ja: '啓示：千海を抱く天 討伐券',
      en: 'Revelation: Sky Embracing a Thousand Seas Subjugation Ticket',
    },
    nameKr: '계시 : 천해를 품은 하늘 토벌권',
  },
  lakeAzureTicket: {
    name: {
      ja: '月の沈んだ湖 + アジュールメイン 討伐券',
      en: 'Lake of the Sunken Moon + Azure Main Subjugation Ticket',
    },
    nameKr: '달이 잠긴 호수 + 애쥬어 메인 토벌권',
    note: {
      ja: '登場ボス：赤牙ウラド（1フェーズのみ）＆ 爆音クラッシャー + 一角獣クラーケン',
      en: 'Bosses: Red Fang Urad (phase 1 only) & Roaring Crusher + Unicorn Kraken',
    },
  },
  deathNightmareTicket: {
    name: {
      ja: '死の女神殿 + 解放された凶夢 討伐券',
      en: 'Temple of the Death Goddess + Unleashed Nightmare Subjugation Ticket',
    },
    nameKr: '죽음의 여신전 + 해방된 흉몽 토벌권',
    note: {
      ja: '登場ボス：無欠なる死 ビシマ（1フェーズのみ）＆ 黒い眼のサルポザ',
      en: 'Bosses: Flawless Death Bisima (phase 1 only) & Black-Eyed Salpoza',
    },
  },
  nightmareLibraryTicket: {
    name: {
      ja: '解放された凶夢 + 星座亀の大書庫 討伐券',
      en: 'Unleashed Nightmare + Great Library of the Star Turtle Subjugation Ticket',
    },
    nameKr: '해방된 흉몽 + 별거북 대서고 토벌권',
    note: {
      ja: '登場ボス：急襲者ジェルミオ＆ 無垢なるペカトール',
      en: 'Bosses: Raider Jelmio & Innocent Peccator',
    },
  },
  libraryApostateTicket: {
    name: {
      ja: '星座亀の大書庫 + 背教者の城 討伐券',
      en: 'Great Library of the Star Turtle + Castle of the Apostate Subjugation Ticket',
    },
    nameKr: '별거북 대서고 + 배교자의 성 토벌권',
    note: {
      ja: '登場ボス：沈黙のカラ＆ 嘘のベリディクス',
      en: 'Bosses: Silent Kara & Veridix of Lies',
    },
  },
  apostateFinalTaskTicket: {
    name: {
      ja: '背教者の城 + 最後の任務 討伐券',
      en: 'Castle of the Apostate + The Final Task Subjugation Ticket',
    },
    nameKr: '배교자의 성 + 최후의 과업 토벌권',
    note: {
      ja: '登場ボス：解放されたビオレンティア＆ シャピロ・グラシア',
      en: 'Bosses: Unleashed Violentia & Shapiro Gracia',
    },
  },
  legionTicket: {
    name: {
      ja: 'アポカリプス：アンティエンバイ 2段階討伐券',
      en: 'Apocalypse: Antienbai Stage 2 Subjugation Ticket',
    },
    nameKr: '아포칼립스 : 안티엔바이 2단계 토벌권',
    note: { ja: '登場ボス：終末の刃 ロペズ', en: 'Boss: Lopez, Blade of Doom' },
  },
} satisfies Record<string, AreaReward>

/**
 * 区域ごとに中身が変わるマスの報酬。
 * キーは `${区域}:${ノード種別ID}`。等級で報酬が変わる場合は
 * `${区域}:${ノード種別ID}:${等級}` を使う。
 * α → 装備倉庫、β → 古びた装備倉庫、γ/Υ → 調律者の名残・痕跡 に対応する。
 */
export const AREA_REWARDS: Record<string, AreaReward> = {
  // --- 第1区域 ---
  '1:armament_warehouse': R.legendaryFullSet,
  '1:giant_armament_warehouse': R.splendidUniqueJarBox,
  '1:tuner_left_trace': R.splendidUniqueCrystalJar,
  '1:dual_phenomenon': R.lakeAzureTicket,
  '1:deviated_thousand_seas_sky': R.skyTicket,

  // --- 第2区域 ---
  '2:armament_warehouse': R.primordialWeaponBox,
  '2:giant_armament_warehouse': R.splendidUniqueJarBox,
  '2:tuner_left_trace': R.splendidUniqueCrystalJar,
  '2:deviated_thousand_seas_sky': R.skyTicket,

  // --- 第3区域 ---
  '3:armament_warehouse': R.epicEquipmentBox,
  '3:giant_armament_warehouse': R.brilliantLegendaryJarBox,
  '3:dual_phenomenon': R.deathNightmareTicket,

  // --- 第4区域 ---
  '4:giant_armament_warehouse': R.iridescentEpicJarBox,
  '4:tuner_left_trace': R.splendidUniqueCrystalJar,
  '4:deviated_thousand_seas_sky': R.skyTicket,

  // --- 第5区域 ---
  '5:armament_warehouse': R.epicEquipmentBox,
  '5:giant_armament_warehouse': R.primordialAccessoryJar,
  '5:tuner_left_trace': R.legendaryCrystalJar,
  '5:deviated_thousand_seas_sky': R.skyTicket,

  // --- 第6区域 ---
  '6:tuner_trace': R.uniqueCrystalBox,
  '6:giant_armament_warehouse': R.brilliantLegendaryJarBox,

  // --- 第7区域 ---
  '7:giant_armament_warehouse': R.iridescentEpicJarBox,
  '7:tuner_left_trace:epic': R.epicCrystalJar,
  '7:tuner_left_trace:unique': R.splendidUniqueCrystalJar,

  // --- 第8区域 ---
  '8:dual_phenomenon': R.nightmareLibraryTicket,
  '8:armament_warehouse': R.epicEquipmentBox,
  '8:giant_armament_warehouse': R.brilliantLegendaryJarBox,

  // --- 第9区域 ---
  '9:giant_armament_warehouse:epic': R.iridescentEpicJarBox,
  '9:giant_armament_warehouse:primeval': R.primordialAccessoryJarBox,

  // --- 第10区域 ---
  '10:tuner_trace:legendary': R.legendaryCrystalBox,
  '10:tuner_trace:unique': R.uniqueCrystalBox,
  '10:giant_armament_warehouse:legendary': R.brilliantLegendaryJarBox,
  '10:tuner_left_trace:unique': R.splendidUniqueCrystalJar,
  '10:deviated_thousand_seas_sky': R.skyTicket,

  // --- 第11区域 ---
  '11:tuner_trace:unique': R.uniqueCrystalBox,
  '11:giant_armament_warehouse:primeval': R.primordialAccessoryJarBox,

  // --- 第12区域 ---
  '12:giant_armament_warehouse:epic': R.iridescentEpicJarBox,
  '12:tuner_left_trace:unique': R.splendidUniqueCrystalJar,
  '12:deviated_thousand_seas_sky': R.skyTicket,

  // --- 第13区域 ---
  '13:dual_phenomenon': R.libraryApostateTicket,
  '13:deviated_thousand_seas_sky': R.skyTicket,
  '13:armament_warehouse:epic': R.epicEquipmentBox,
  '13:tuner_left_trace:legendary': R.legendaryCrystalJar,

  // --- 第14区域 ---
  '14:armament_warehouse:primeval': R.primordialAccessoryBox,
  '14:giant_armament_warehouse:legendary': R.brilliantLegendaryJarBox,

  // --- 第15区域 ---
  '15:legion_compressed': R.legionTicket,
  '15:deviated_thousand_seas_sky': R.skyTicket,

  // --- 第16区域 ---
  '16:armament_warehouse:primeval': R.primordialWeaponBox,
  '16:tuner_left_trace:legendary': R.brilliantLegendaryCrystalJar,

  // --- 第17区域 ---
  '17:armament_warehouse:epic': R.epicEquipmentBox,
  '17:giant_armament_warehouse:primeval': R.primordialAccessoryJarBox,
  '17:tuner_left_trace:epic': R.epicCrystalJar,

  // --- 第18区域 ---
  '18:tuner_left_trace:unique': R.splendidUniqueCrystalJar,

  // --- 第19区域 ---
  '19:dual_phenomenon': R.apostateFinalTaskTicket,
  '19:tuner_left_trace:legendary': R.legendaryCrystalJar,

  // --- 第20区域 ---
  '20:tuner_left_trace:legendary': R.brilliantLegendaryCrystalJar,

  // --- 第21区域 ---
  '21:tuner_trace:legendary': R.legendaryCrystalBox,
  '21:giant_armament_warehouse:primeval': R.primordialAccessoryBox,

  // --- 第22区域 ---
  '22:armament_warehouse:epic': R.epicEquipmentBox,
  '22:tuner_left_trace:unique': R.splendidUniqueCrystalJar,

  // --- 第23区域 ---
  '23:armament_warehouse:primeval': R.primordialAccessoryBox,

  // --- 第24区域 ---
  '24:tuner_trace:legendary': R.legendaryCrystalBox,
  '24:tuner_left_trace:legendary': R.brilliantLegendaryCrystalJar,

  // --- 第25区域 ---
  '25:armament_warehouse:epic': R.epicEquipmentBox,
  '25:tuner_trace:legendary': R.legendaryCrystalBox,

  // --- 第26区域 ---
  '26:tuner_left_trace:epic': R.epicCrystalJar,

  // --- 第27区域 ---
  '27:giant_armament_warehouse:primeval': R.primordialAccessoryBox,
  '27:tuner_trace:legendary': R.legendaryCrystalBox,
  '27:tuner_left_trace:legendary': R.brilliantLegendaryCrystalJar,

  // --- 第28区域 ---
  '28:armament_warehouse:epic': R.epicEquipmentBox,

  // --- 第29区域 ---
  '29:armament_warehouse:primeval': R.primordialAccessoryBox,
  '29:tuner_trace:legendary': R.legendaryCrystalBox,

  // --- 第30区域 ---
  '30:tuner_left_trace:epic': R.epicCrystalJar,
  '30:tuner_left_trace:legendary': R.legendaryCrystalJar,
  '30:tuner_left_trace:primeval': R.primordialCrystalJar,

  // --- 第31区域 ---
  '31:armament_warehouse:epic': R.epicEquipmentBox,
  '31:tuner_left_trace:primeval': R.primordialCrystalJar,
}

/** 区域ごとの推奨名声と、ボス体力の倍率。 */
export interface AreaStat {
  area: number
  /** 推奨名声。 */
  fame: number
  /** 前の区域からの増分。 */
  delta: number
  /** 体力倍率。「倍率 × 体力係数 × 10万」が該当区域のボス体力の目安。 */
  hpMultiplier: number
  /** 나무위키の時点で未確定、推移からの推定値。 */
  estimated?: boolean
}

export const AREA_STATS: AreaStat[] = [
  { area: 1, fame: 55950, delta: 0, hpMultiplier: 0.017 },
  { area: 2, fame: 64500, delta: 5550, hpMultiplier: 0.03 },
  { area: 3, fame: 69000, delta: 4500, hpMultiplier: 0.047 },
  { area: 4, fame: 73500, delta: 4500, hpMultiplier: 0.074 },
  { area: 5, fame: 78000, delta: 4500, hpMultiplier: 0.115 },
  { area: 6, fame: 82500, delta: 4500, hpMultiplier: 0.18 },
  { area: 7, fame: 87000, delta: 4500, hpMultiplier: 0.279 },
  { area: 8, fame: 91500, delta: 4500, hpMultiplier: 0.434 },
  { area: 9, fame: 94000, delta: 2500, hpMultiplier: 0.555 },
  { area: 10, fame: 96000, delta: 2000, hpMultiplier: 0.675 },
  { area: 11, fame: 98000, delta: 2000, hpMultiplier: 0.822 },
  { area: 12, fame: 100000, delta: 2000, hpMultiplier: 1.0 },
  { area: 13, fame: 102000, delta: 2000, hpMultiplier: 1.216 },
  { area: 14, fame: 107000, delta: 5000, hpMultiplier: 1.985 },
  { area: 15, fame: 110000, delta: 3000, hpMultiplier: 2.663 },
  { area: 16, fame: 112000, delta: 2000, hpMultiplier: 3.24 },
  { area: 17, fame: 114000, delta: 2000, hpMultiplier: 3.941 },
  { area: 18, fame: 116000, delta: 2000, hpMultiplier: 4.794 },
  { area: 19, fame: 118000, delta: 2000, hpMultiplier: 5.832 },
  { area: 20, fame: 120000, delta: 2000, hpMultiplier: 7.095 },
  { area: 21, fame: 122000, delta: 2000, hpMultiplier: 8.631 },
  { area: 22, fame: 124000, delta: 2000, hpMultiplier: 10.493 },
  { area: 23, fame: 125000, delta: 1000, hpMultiplier: 11.58 },
  { area: 24, fame: 126000, delta: 1000, hpMultiplier: 12.771 },
  { area: 25, fame: 127000, delta: 1000, hpMultiplier: 14.086 },
  { area: 26, fame: 127500, delta: 500, hpMultiplier: 14.793, estimated: true },
  { area: 27, fame: 128000, delta: 500, hpMultiplier: 15.536, estimated: true },
  { area: 28, fame: 128500, delta: 500, hpMultiplier: 16.316, estimated: true },
  { area: 29, fame: 129000, delta: 500, hpMultiplier: 17.135, estimated: true },
  { area: 30, fame: 129500, delta: 500, hpMultiplier: 17.996, estimated: true },
  { area: 31, fame: 130000, delta: 500, hpMultiplier: 17.996, estimated: true },
]

export const AREA_STAT_BY_AREA = new Map(AREA_STATS.map((s) => [s.area, s]))

export const HP_NOTE: Localized = {
  ja: '体力倍率 × 体力係数 × 10万 ＝ その区域のボス体力の目安（名声基準 100,000）。',
  en: 'HP multiplier × HP coefficient × 100,000 gives a rough boss HP for the area (based on 100,000 fame).',
}

/** ＊が付いた関門は、迷宮調査券で開けると上下どちらかの関門も同時に開く。 */
export const GATE_NOTES: Localized[] = [
  {
    ja: '＊印の関門は、迷宮調査券を使って開放すると上または下にある関門も同時に開放される。',
    en: 'Gates marked ＊ also open the gate above or below them when unlocked with a labyrinth survey ticket.',
  },
  {
    ja: 'すべての関門は、初回入場以降の再挑戦・再入場では入場券を消費しない。',
    en: 'No gate consumes an entry ticket when you retry or re-enter after the first entry.',
  },
]
