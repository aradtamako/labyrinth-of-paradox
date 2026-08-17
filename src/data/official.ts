import { TICKET_ICON } from '@/data/item-icons'
import type { Localized } from '@/lib/locale'

/**
 * 公式アップデートページ（Season12 Act0 2-2「千海天：新たな跳躍」）に記載された
 * 「逆説の迷宮」の仕様。数値はすべて公式ページ由来。
 * https://arad.nexon.co.jp/update/season12_act0/2_2/
 *
 * 公式ページは日本語のみなので、英語は日本語からの訳。
 */

export const OFFICIAL_SOURCE = 'https://arad.nexon.co.jp/update/season12_act0/2_2/'

export interface SpecRow {
  label: Localized
  value: Localized
}

export const ENTRY_SPECS: SpecRow[] = [
  {
    label: { ja: '入場レベル', en: 'Required level' },
    value: { ja: 'Lv.115 以上', en: 'Lv.115 or higher' },
  },
  {
    label: { ja: '入場名声', en: 'Required fame' },
    value: { ja: '58,950', en: '58,950' },
  },
  {
    label: { ja: '入場人数', en: 'Party size' },
    value: { ja: '1人', en: 'Solo' },
  },
  {
    label: { ja: '疲労度', en: 'Fatigue' },
    value: { ja: '消費なし', en: 'None consumed' },
  },
  {
    label: { ja: '入場制限', en: 'Entry restriction' },
    value: { ja: '入場券が必要', en: 'Entry ticket required' },
  },
  {
    label: { ja: '制限時間', en: 'Time limit' },
    value: { ja: '全区域 4分', en: '4 minutes per area' },
  },
  {
    label: { ja: '構成', en: 'Structure' },
    value: { ja: 'アカウント単位 / 1〜40区域', en: 'Account-wide / areas 1–40' },
  },
]

export interface TicketSpec {
  name: Localized
  use: Localized
  acquire: Localized
  accent: 'survey' | 'main' | 'outer'
}

export const TICKETS: TicketSpec[] = [
  {
    name: { ja: '迷宮調査券', en: 'Labyrinth Survey Ticket' },
    use: {
      ja: 'メイン関門・外郭関門のロック解除に使用する。',
      en: 'Used to unlock main gates and outer gates.',
    },
    acquire: {
      ja: '毎日2枚支給。迷宮探索および傭兵団レベル効果で追加獲得。',
      en: 'Two granted daily. More are earned by exploring the labyrinth and from mercenary level effects.',
    },
    accent: 'survey',
  },
  {
    name: { ja: '入場券（メイン関門）', en: 'Entry Ticket (Main Gate)' },
    use: { ja: 'メイン関門への入場に使用する。', en: 'Used to enter a main gate.' },
    acquire: { ja: '毎日1枚支給。', en: 'One granted daily.' },
    accent: 'main',
  },
  {
    name: { ja: '入場券（外郭関門）', en: 'Entry Ticket (Outer Gate)' },
    use: { ja: '外郭関門への入場に使用する。', en: 'Used to enter an outer gate.' },
    acquire: {
      ja: '毎日1枚支給。迷宮探索および傭兵団レベル効果で追加獲得。',
      en: 'One granted daily. More are earned by exploring the labyrinth and from mercenary level effects.',
    },
    accent: 'outer',
  },
]

export interface SubjugationTicket {
  name: Localized
  iconId: number
  effect: Localized
  acquire: Localized
  fame: Localized
  conditions: Localized[]
  /** 公式アップデートページに掲載がなく、別ソースから補った項目にのみ設定する。 */
  source?: { label: Localized; url: string }
}

/** 二重現象系の討伐券に共通する効果・入手方法・使用条件。 */
const DUAL_EFFECT: Localized = {
  ja: '該当ダンジョン2種のクリア報酬を獲得する。',
  en: 'Grants the clear rewards of both corresponding dungeons.',
}
const DUAL_ACQUIRE: Localized = {
  ja: '二重現象関門クリア時。',
  en: 'Awarded when clearing a Dual Phenomenon gate.',
}
const DUAL_CONDITION: Localized = {
  ja: '上級ダンジョン入場／報酬回数 2回が必要',
  en: 'Requires 2 advanced dungeon entry / reward counts',
}

export const SUBJUGATION_TICKETS: SubjugationTicket[] = [
  {
    name: {
      ja: '啓示：千海を抱く天 討伐券',
      en: 'Revelation: Sky Embracing a Thousand Seas — Subjugation Ticket',
    },
    iconId: TICKET_ICON.revelationSky,
    effect: {
      ja: '一日／限定ミッションをクリア扱いにする。',
      en: 'Counts a daily / limited mission as cleared.',
    },
    acquire: {
      ja: '歪んだ千海の天 関門のクリア回数分。傭兵団レベル効果で増加。',
      en: 'One per clear of a Deviated Thousand Seas Sky gate. Increased by mercenary level effects.',
    },
    fame: { ja: '33,249 以上', en: '33,249 or higher' },
    conditions: [
      { ja: '一日ミッション帰属 20回以下', en: 'Daily mission binding, 20 uses or fewer' },
      { ja: '疲労度 16 が必要', en: 'Requires 16 fatigue' },
    ],
  },
  {
    name: {
      ja: '月の沈んだ湖 & アジュールメイン 討伐券',
      en: 'Lake of the Sunken Moon & Azure Main — Subjugation Ticket',
    },
    iconId: TICKET_ICON.moonLakeAzure,
    effect: DUAL_EFFECT,
    acquire: DUAL_ACQUIRE,
    fame: { ja: '44,929 以上', en: '44,929 or higher' },
    conditions: [
      DUAL_CONDITION,
      { ja: 'アカウント報酬回数 1回が必要', en: 'Requires 1 account reward count' },
    ],
  },
  {
    name: {
      ja: '死の女神殿 & 解放された凶夢 討伐券',
      en: 'Temple of the Death Goddess & Unleashed Nightmare — Subjugation Ticket',
    },
    iconId: TICKET_ICON.deathGoddessNightmare,
    effect: DUAL_EFFECT,
    acquire: DUAL_ACQUIRE,
    fame: { ja: '71,179 以上', en: '71,179 or higher' },
    conditions: [DUAL_CONDITION],
  },
  {
    name: {
      ja: '解放された凶夢 & 星座亀の大書庫 討伐券',
      en: 'Unleashed Nightmare & Great Library of the Star Turtle — Subjugation Ticket',
    },
    iconId: TICKET_ICON.nightmareLibrary,
    effect: DUAL_EFFECT,
    acquire: DUAL_ACQUIRE,
    fame: { ja: '91,582 以上', en: '91,582 or higher' },
    conditions: [DUAL_CONDITION],
  },
  {
    name: {
      ja: '星座亀の大書庫 & 背教者の城 討伐券',
      en: 'Great Library of the Star Turtle & Castle of the Apostate — Subjugation Ticket',
    },
    iconId: TICKET_ICON.libraryApostate,
    effect: DUAL_EFFECT,
    acquire: DUAL_ACQUIRE,
    fame: { ja: '101,853 以上', en: '101,853 or higher' },
    conditions: [DUAL_CONDITION],
  },
  {
    // 「最後の過業」実装後に追加された6番目の討伐券。公式アップデートページ未掲載のため、
    // 必要名声は「最後の過業」の入場名声から採る。
    name: {
      ja: '背教者の城 & 最後の任務 討伐券',
      en: 'Castle of the Apostate & The Final Task — Subjugation Ticket',
    },
    iconId: TICKET_ICON.apostateFinalTask,
    effect: DUAL_EFFECT,
    acquire: DUAL_ACQUIRE,
    fame: { ja: '108,921 以上', en: '108,921 or higher' },
    conditions: [DUAL_CONDITION],
    source: {
      label: {
        ja: '必要名声は「最後の過業」ガイドの入場名声より（公式アップデートページ未掲載）',
        en: 'Required fame taken from the entry fame in the "The Final Task" guide (not listed on the official update page)',
      },
      url: 'https://df.pure-db.com/guide?no=1537',
    },
  },
  {
    // レギオン（アポカリプス：アンティエンバイ）系の討伐券。二重現象系6種とは別カウントで、
    // クリア報酬も2段階分まとめて獲得する点が異なる。公式アップデートページ未掲載のため、
    // 必要名声は「アポカリプス：アンティエンバイ」ガイドの入場名声から採る。
    name: {
      ja: 'アポカリプス：アンティエンバイ 2段階討伐券',
      en: 'Apocalypse: Antienbai — Stage 2 Subjugation Ticket',
    },
    iconId: TICKET_ICON.apocalypseAntienbai,
    effect: {
      ja: '該当ダンジョンの2段階分のクリア報酬をまとめて獲得する。',
      en: 'Grants the clear rewards for both stages of the corresponding dungeon at once.',
    },
    acquire: {
      ja: 'レギオン関門（アポカリプス：アンティエンバイ）撃破時。毎週、傭兵団レベルに比例したキャラクター数だけ撃破できる（スロット数 = 傭兵団レベル − 3）。',
      en: 'Awarded for defeating the Legion gate (Apocalypse: Antienbai). Each week you may defeat it on as many characters as your mercenary level allows (slots = mercenary level − 3).',
    },
    fame: { ja: '73,993 以上', en: '73,993 or higher' },
    conditions: [
      {
        ja: 'レギオンと二重現象は別カウント',
        en: 'Legion and Dual Phenomenon are counted separately',
      },
    ],
    source: {
      label: {
        ja: '必要名声は「アポカリプス：アンティエンバイ」ガイドの入場名声より（公式アップデートページ未掲載）',
        en: 'Required fame taken from the entry fame in the "Apocalypse: Antienbai" guide (not listed on the official update page)',
      },
      url: 'https://df.pure-db.com/guide?no=1534',
    },
  },
]

export const SUBJUGATION_NOTE: Localized = {
  ja: '討伐券は週間で最大100回まで使用できる。',
  en: 'Subjugation tickets can be used up to 100 times per week.',
}

export const MERCENARY_SPECS: Localized[] = [
  {
    ja: '「逆説の迷宮」専用の傭兵団特性と傭兵団レベルが追加される。',
    en: 'The Labyrinth of Paradox adds its own mercenary traits and mercenary level.',
  },
  {
    ja: '傭兵団には最大20体まで登録できる。',
    en: 'Up to 20 characters can be registered to the mercenary group.',
  },
  {
    ja: '登録キャラクターの誓約ポイント合計が高いほど傭兵団レベルが上昇する。',
    en: 'The higher the combined oath points of the registered characters, the higher the mercenary level.',
  },
  {
    ja: '傭兵団レベルが上がるほど、迷宮調査に役立つ効果が強化される。',
    en: 'Higher mercenary levels strengthen the effects that help with labyrinth exploration.',
  },
]

export const DISPATCH_SPECS: Localized[] = [
  {
    ja: 'バッファーの派遣登録は初期状態で1名。傭兵団レベル効果により最大3名まで拡張される。',
    en: 'You can dispatch one buffer to begin with, expandable to three through mercenary level effects.',
  },
  {
    ja: '上級ダンジョンの入場回数・報酬回数に関係なく登録できる。',
    en: 'Registration is possible regardless of advanced dungeon entry or reward counts.',
  },
  {
    ja: '毎週水曜 05:00〜06:00 は登録できない。',
    en: 'Registration is closed every Wednesday from 05:00 to 06:00.',
  },
  {
    ja: '派遣報酬は登録した翌週水曜 06:00 以降に獲得できる。',
    en: 'Dispatch rewards become available from 06:00 on the Wednesday after registration.',
  },
  {
    ja: '手数料として傭兵団レベルに応じて 30%〜10% が差し引かれる。',
    en: 'A fee of 30% down to 10% is deducted depending on mercenary level.',
  },
  {
    ja: '1キャラクターにつき1回支給。報酬は最大1週間保管され、次の精算までに受け取る必要がある。',
    en: 'Granted once per character. Rewards are held for at most a week and must be collected before the next settlement.',
  },
]
