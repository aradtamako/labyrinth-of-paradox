import type { Locale, Localized } from '@/lib/locale'

/**
 * 更新履歴。コミットログを機械的に写したものではなく、PR マージ単位の変更を
 * 「サイトの見どころが変わった時点」に畳んで手書きしている。
 * 区域を収録したとき・操作を変えたときは、配列の先頭に1件足す。
 */

/** 更新の分類。Timeline のマーカーの色とアイコンが決まる。 */
export type ReleaseKind = 'data' | 'feature' | 'fix' | 'internal'

export interface ReleaseEntry {
  kind: ReleaseKind
  text: Localized
}

export interface ReleaseNote {
  /** ISO 形式（YYYY-MM-DD）。マージ日。 */
  date: string
  /** その更新全体の要約。Timeline の見出しになる。 */
  title: Localized
  /** 該当する GitHub PR の番号（新しい順）。リンクに使う。 */
  prs?: number[]
  /** 個別の変更。kind 順に「追加 → 変更 → 修正 → 内部」で並べておく。 */
  entries: ReleaseEntry[]
}

export const REPOSITORY_URL = 'https://github.com/aradtamako/labyrinth-of-paradox'

export const prUrl = (no: number) => `${REPOSITORY_URL}/pull/${no}`

export const RELEASE_NOTES: ReleaseNote[] = [
  {
    date: '2026-09-14',
    title: { ja: '36区域を収録', en: 'Area 36 added' },
    prs: [22, 23, 24],
    entries: [
      {
        kind: 'data',
        text: {
          ja: '36-37区域のシードマップ画像とサムネイルを追加し、収録範囲を1〜37区域に拡大。',
          en: 'Seed map images and thumbnails for area 36-37, extending coverage to areas 1-37.',
        },
      },
      {
        kind: 'data',
        text: {
          ja: '36-37区域のノードデータ（マスごとの種別・等級・報酬）を取り込み、報酬一覧の逆引き対象も拡大。',
          en: 'Node data — per-cell type, tier and reward — imported for area 36-37, widening the reward index.',
        },
      },
      {
        kind: 'data',
        text: {
          ja: '区域別の推奨名声とボス体力倍率を37区域まで延長。',
          en: 'Per-area recommended fame and boss HP multipliers extended through area 37.',
        },
      },
      {
        kind: 'feature',
        text: {
          ja: '更新履歴をタイムラインで見られるページを追加。種類（データ・機能・修正・開発）での絞り込みに対応。',
          en: 'A new page showing the update history as a timeline, filterable by kind (data, feature, fix or internal).',
        },
      },
      {
        kind: 'feature',
        text: {
          ja: 'ヘッダーと概要ページから更新履歴へ飛べるように。未読がある間はヘッダーにドットが出て、開くと既読になる。',
          en: 'The header and the overview page link to the release notes. The header shows a dot while there are unread entries, cleared once you open the page.',
        },
      },
      {
        kind: 'feature',
        text: {
          ja: '区域カードに自分用のメモを書けるように。自分のブラウザにだけ保存され、他人には見えない。',
          en: 'Each area card accepts a private note, kept in your own browser and never shown to anyone else.',
        },
      },
      {
        kind: 'feature',
        text: {
          ja: 'メモ本文での検索と、メモの有無での絞り込みに対応。',
          en: 'Search within note text and filter the list by whether an area has a note.',
        },
      },
    ],
  },
  {
    date: '2026-09-02',
    title: { ja: '34・35区域を収録', en: 'Areas 34 and 35 added' },
    prs: [21],
    entries: [
      {
        kind: 'data',
        text: {
          ja: '34・35区域のシードマップ画像とサムネイルを追加し、収録範囲を1〜35区域に拡大。',
          en: 'Seed map images and thumbnails for areas 34-35, extending coverage to areas 1-35.',
        },
      },
      {
        kind: 'data',
        text: {
          ja: '34・35区域のノードデータ（マスごとの種別・等級・報酬）を取り込み、報酬一覧の逆引き対象も拡大。',
          en: 'Node data — per-cell type, tier and reward — imported for areas 34-35, widening the reward index.',
        },
      },
      {
        kind: 'data',
        text: {
          ja: '区域別の推奨名声とボス体力倍率を35区域まで延長。',
          en: 'Per-area recommended fame and boss HP multipliers extended through area 35.',
        },
      },
      {
        kind: 'fix',
        text: {
          ja: '32〜35区域で元記事の添付リストの並び順と本文の画像順がズレており、シードコードの割り当てを画像内容で照合して付け直した。',
          en: 'For areas 32-35 the attachment list and the in-body image order disagreed; seed codes were re-assigned by matching the images themselves.',
        },
      },
    ],
  },
  {
    date: '2026-08-23',
    title: { ja: '32・33区域を収録', en: 'Areas 32 and 33 added' },
    prs: [20],
    entries: [
      {
        kind: 'data',
        text: {
          ja: '32・33区域のマップ画像、ノードデータ、区域別報酬、推奨名声を追加。',
          en: 'Map images, node data, area rewards and recommended fame for areas 32-33.',
        },
      },
      {
        kind: 'internal',
        text: {
          ja: '開発用メモを AGENTS.md に整理し、区域を足すときに触るファイルの一覧を明文化した。',
          en: 'Developer notes consolidated into AGENTS.md, spelling out which files an area addition touches.',
        },
      },
    ],
  },
  {
    date: '2026-08-18',
    title: { ja: '一覧とマップを使いやすく', en: 'A more workable list and map' },
    prs: [19, 18, 17, 16],
    entries: [
      {
        kind: 'feature',
        text: {
          ja: '区域カードを非表示にできるように。伏せておきたい区域を一覧から外し、まとめて戻せる。',
          en: 'Floor cards can be hidden, so you can set aside the areas you do not need and bring them back in bulk.',
        },
      },
      {
        kind: 'feature',
        text: {
          ja: 'マップの各マスに報酬アイコンを重ねて表示。何が出るマスかを色と形で追いやすくなった。',
          en: 'Reward icons overlaid on each map cell, making what drops where readable at a glance.',
        },
      },
      {
        kind: 'feature',
        text: {
          ja: '選んだシードをブラウザに保存。区域を開き直すと前回見ていたマップがそのまま出る。',
          en: 'The selected seed is stored per area, so reopening a floor brings back the map you were reading.',
        },
      },
      {
        kind: 'fix',
        text: {
          ja: '報酬ごとにアイコンを上書きできるようにし、「既存の誓約の結晶」系の箱のアイコンを実物に合わせた。',
          en: 'Per-reward icon overrides added, correcting the icons used for the boxes of existing oath crystals.',
        },
      },
    ],
  },
  {
    date: '2026-08-17',
    title: { ja: '報酬から区域を引けるように', en: 'Searching areas by reward' },
    prs: [15, 14, 9],
    entries: [
      {
        kind: 'feature',
        text: {
          ja: '区域マップの検索を報酬名ベースに切り替え。狙いの報酬名を入れると、それが出る区域だけが残る。',
          en: 'The floor list search now works on reward names: type what you are after and only the areas holding it remain.',
        },
      },
      {
        kind: 'feature',
        text: {
          ja: '区域カードに、その区域で特筆すべき報酬をハイライト表示。',
          en: 'Floor cards highlight the rewards worth noting for that area.',
        },
      },
      {
        kind: 'fix',
        text: {
          ja: 'カタカナ表記をひらがなに寄せてから照合するようにし、表記ゆれでヒットしない検索を減らした。',
          en: 'Search normalises katakana to hiragana before matching, cutting misses caused by spelling variants.',
        },
      },
    ],
  },
  {
    date: '2026-08-17',
    title: { ja: '移動しても見失わないように', en: 'Staying put when moving around' },
    prs: [13, 12, 11],
    entries: [
      {
        kind: 'feature',
        text: {
          ja: 'ハッシュURLに言語を含める形式（#/ja/floors など）にし、内部リンクを辿っても言語が落ちないようにした。',
          en: 'Hash URLs carry the language (#/ja/floors and the like) so internal navigation no longer drops it.',
        },
      },
      {
        kind: 'feature',
        text: {
          ja: '戻る／進むで離れたときのスクロール位置を復元するようにした。',
          en: 'Back and forward navigation returns you to the scroll position you left.',
        },
      },
    ],
  },
  {
    date: '2026-08-17',
    title: { ja: '日本語・英語の2言語表示', en: 'Japanese and English throughout' },
    prs: [10],
    entries: [
      {
        kind: 'feature',
        text: {
          ja: 'UI 文言とデータ由来の表示テキストを2言語化。ヘッダーの切り替えで表示言語を変えられる。',
          en: 'UI labels and data-derived text are both bilingual; the switch in the header changes the displayed language.',
        },
      },
      {
        kind: 'feature',
        text: {
          ja: '報酬の検索は表示言語にかかわらず日本語・英語・韓国語のすべてで引ける。',
          en: 'Reward search works in Japanese, English and Korean regardless of the displayed language.',
        },
      },
    ],
  },
  {
    date: '2026-08-17',
    title: { ja: 'システムデータの追記と報酬一覧の整理', en: 'System data and the reward list' },
    prs: [8, 7, 6, 4, 3],
    entries: [
      {
        kind: 'data',
        text: {
          ja: '討伐券を2種追加（背教者の城 & 最後の任務、アポカリプス：アンティエンバイの軍団討伐）。',
          en: 'Two subjugation tickets added (Castle of the Apostate & The Final Task, and the Legion gate Apocalypse: Antienbai).',
        },
      },
      {
        kind: 'data',
        text: {
          ja: '太初装備強化箱などの報酬と、複数行になる注記に対応。',
          en: 'Primordial upgrade boxes and similar rewards added, along with multi-line notes.',
        },
      },
      {
        kind: 'data',
        text: {
          ja: '新区域の区域別報酬データを追加し、報酬一覧の区域バッジから見やすい表記に整理した。',
          en: 'Area-specific reward data added for the newer floors, with the area badges on the reward list cleaned up.',
        },
      },
    ],
  },
  {
    date: '2026-08-17',
    title: { ja: 'Cloudflare Workers で配信', en: 'Served from Cloudflare Workers' },
    prs: [5, 2],
    entries: [
      {
        kind: 'feature',
        text: {
          ja: 'ヘッダーにリポジトリへのリンクを追加。',
          en: 'A link to the repository was added to the header.',
        },
      },
      {
        kind: 'internal',
        text: {
          ja: 'Cloudflare Workers の静的アセット配信を整備（wrangler 経由の preview / deploy）。',
          en: 'Static asset delivery through Cloudflare Workers set up (preview and deploy via wrangler).',
        },
      },
    ],
  },
  {
    date: '2026-08-16',
    title: { ja: 'サイトを公開', en: 'Site launch' },
    prs: [1],
    entries: [
      {
        kind: 'data',
        text: {
          ja: '1〜31区域のシードマップ、名声上昇値、主要報酬を掲載。マップ画像を参照するところから始まった。',
          en: 'Seed maps, fame gains and key rewards for areas 1-31 — the site began as a way to browse map images.',
        },
      },
      {
        kind: 'feature',
        text: {
          ja: '区域マップ・報酬一覧・システム解説の3ページ構成。',
          en: 'Three pages to start with: area maps, the reward list and the system guide.',
        },
      },
    ],
  },
]

/** ISO 形式の日付を「2026年9月2日」／「Sep 2, 2026」に整形する。Timeline の見出し用。 */
export function formatDate(date: string, locale: Locale): string {
  const [y, m, d] = date.split('-').map(Number)
  if (locale === 'ja') return `${y}年${m}月${d}日`
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(Date.UTC(y, m - 1, d))
}
