import { TICKET_ICON } from '@/data/item-icons'

/**
 * 公式アップデートページ（Season12 Act0 2-2「千海天：新たな跳躍」）に記載された
 * 「逆説の迷宮」の仕様。数値はすべて公式ページ由来。
 * https://arad.nexon.co.jp/update/season12_act0/2_2/
 */

export const OFFICIAL_SOURCE = 'https://arad.nexon.co.jp/update/season12_act0/2_2/'

export interface SpecRow {
  label: string
  value: string
}

export const ENTRY_SPECS: SpecRow[] = [
  { label: '入場レベル', value: 'Lv.115 以上' },
  { label: '入場名声', value: '58,950' },
  { label: '入場人数', value: '1人' },
  { label: '疲労度', value: '消費なし' },
  { label: '入場制限', value: '入場券が必要' },
  { label: '制限時間', value: '全区域 4分' },
  { label: '構成', value: 'アカウント単位 / 1〜40区域' },
]

export interface TicketSpec {
  name: string
  use: string
  acquire: string
  accent: 'survey' | 'main' | 'outer'
}

export const TICKETS: TicketSpec[] = [
  {
    name: '迷宮調査券',
    use: 'メイン関門・外郭関門のロック解除に使用する。',
    acquire: '毎日2枚支給。迷宮探索および傭兵団レベル効果で追加獲得。',
    accent: 'survey',
  },
  {
    name: '入場券（メイン関門）',
    use: 'メイン関門への入場に使用する。',
    acquire: '毎日1枚支給。',
    accent: 'main',
  },
  {
    name: '入場券（外郭関門）',
    use: '外郭関門への入場に使用する。',
    acquire: '毎日1枚支給。迷宮探索および傭兵団レベル効果で追加獲得。',
    accent: 'outer',
  },
]

export interface SubjugationTicket {
  name: string
  iconId: number
  effect: string
  acquire: string
  fame: string
  conditions: string[]
  /** 公式アップデートページに掲載がなく、別ソースから補った項目にのみ設定する。 */
  source?: { label: string; url: string }
}

export const SUBJUGATION_TICKETS: SubjugationTicket[] = [
  {
    name: '啓示：千海を抱く天 討伐券',
    iconId: TICKET_ICON.revelationSky,
    effect: '一日／限定ミッションをクリア扱いにする。',
    acquire: '歪んだ千海の天 関門のクリア回数分。傭兵団レベル効果で増加。',
    fame: '33,249 以上',
    conditions: ['一日ミッション帰属 20回以下', '疲労度 16 が必要'],
  },
  {
    name: '月の沈んだ湖 & アジュールメイン 討伐券',
    iconId: TICKET_ICON.moonLakeAzure,
    effect: '該当ダンジョン2種のクリア報酬を獲得する。',
    acquire: '二重現象関門クリア時。',
    fame: '44,929 以上',
    conditions: ['上級ダンジョン入場／報酬回数 2回が必要', 'アカウント報酬回数 1回が必要'],
  },
  {
    name: '死の女神殿 & 解放された凶夢 討伐券',
    iconId: TICKET_ICON.deathGoddessNightmare,
    effect: '該当ダンジョン2種のクリア報酬を獲得する。',
    acquire: '二重現象関門クリア時。',
    fame: '71,179 以上',
    conditions: ['上級ダンジョン入場／報酬回数 2回が必要'],
  },
  {
    name: '解放された凶夢 & 星座亀の大書庫 討伐券',
    iconId: TICKET_ICON.nightmareLibrary,
    effect: '該当ダンジョン2種のクリア報酬を獲得する。',
    acquire: '二重現象関門クリア時。',
    fame: '91,582 以上',
    conditions: ['上級ダンジョン入場／報酬回数 2回が必要'],
  },
  {
    name: '星座亀の大書庫 & 背教者の城 討伐券',
    iconId: TICKET_ICON.libraryApostate,
    effect: '該当ダンジョン2種のクリア報酬を獲得する。',
    acquire: '二重現象関門クリア時。',
    fame: '101,853 以上',
    conditions: ['上級ダンジョン入場／報酬回数 2回が必要'],
  },
  {
    // 「最後の過業」実装後に追加された6番目の討伐券。公式アップデートページ未掲載のため、
    // 必要名声は「最後の過業」の入場名声から採る。
    name: '背教者の城 & 最後の任務 討伐券',
    iconId: TICKET_ICON.apostateFinalTask,
    effect: '該当ダンジョン2種のクリア報酬を獲得する。',
    acquire: '二重現象関門クリア時。',
    fame: '108,921 以上',
    conditions: ['上級ダンジョン入場／報酬回数 2回が必要'],
    source: {
      label: '必要名声は「最後の過業」ガイドの入場名声より（公式アップデートページ未掲載）',
      url: 'https://df.pure-db.com/guide?no=1537',
    },
  },
  {
    // レギオン（アポカリプス：アンティエンバイ）系の討伐券。二重現象系6種とは別カウントで、
    // クリア報酬も2段階分まとめて獲得する点が異なる。公式アップデートページ未掲載のため、
    // 必要名声は「アポカリプス：アンティエンバイ」ガイドの入場名声から採る。
    name: 'アポカリプス：アンティエンバイ 2段階討伐券',
    iconId: TICKET_ICON.apocalypseAntienbai,
    effect: '該当ダンジョンの2段階分のクリア報酬をまとめて獲得する。',
    acquire:
      'レギオン関門（アポカリプス：アンティエンバイ）撃破時。毎週、傭兵団レベルに比例したキャラクター数だけ撃破できる（スロット数 = 傭兵団レベル − 3）。',
    fame: '73,993 以上',
    conditions: ['レギオンと二重現象は別カウント'],
    source: {
      label: '必要名声は「アポカリプス：アンティエンバイ」ガイドの入場名声より（公式アップデートページ未掲載）',
      url: 'https://df.pure-db.com/guide?no=1534',
    },
  },
]

export const SUBJUGATION_NOTE = '討伐券は週間で最大100回まで使用できる。'

export const MERCENARY_SPECS: string[] = [
  '「逆説の迷宮」専用の傭兵団特性と傭兵団レベルが追加される。',
  '傭兵団には最大20体まで登録できる。',
  '登録キャラクターの誓約ポイント合計が高いほど傭兵団レベルが上昇する。',
  '傭兵団レベルが上がるほど、迷宮調査に役立つ効果が強化される。',
]

export const DISPATCH_SPECS: string[] = [
  'バッファーの派遣登録は初期状態で1名。傭兵団レベル効果により最大3名まで拡張される。',
  '上級ダンジョンの入場回数・報酬回数に関係なく登録できる。',
  '毎週水曜 05:00〜06:00 は登録できない。',
  '派遣報酬は登録した翌週水曜 06:00 以降に獲得できる。',
  '手数料として傭兵団レベルに応じて 30%〜10% が差し引かれる。',
  '1キャラクターにつき1回支給。報酬は最大1週間保管され、次の精算までに受け取る必要がある。',
]
