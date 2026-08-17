import { numberRuns } from '@/lib/locale'
import type { Locale } from '@/lib/locale'

/**
 * UI 文言の辞書。日本語版を基準の型として定義し、英語版はその型に合わせる。
 * こうしておくと英語側の訳漏れが `tsc` で落ちる。
 *
 * データ由来の文言（報酬名・区域メモなど）はここではなく src/data/ 側に
 * Localized として持たせてある。
 */

const ja = {
  brand: {
    title: '逆説の迷宮',
    subtitle: '攻略データベース',
  },

  meta: {
    title: '逆説の迷宮 攻略 | ダンジョン&ファイター',
    description:
      'ダンジョン&ファイター「逆説の迷宮」の攻略データベース。1〜31区域のシードマップ、名声上昇値、主要報酬、調査券・討伐券・傭兵団の仕様をまとめています。',
  },

  nav: {
    overview: '概要',
    floors: '区域マップ',
    rewards: '報酬一覧',
    system: 'システム',
    menu: 'メニュー',
    openMenu: 'メニューを開く',
    github: 'GitHub リポジトリを開く',
    themeToLight: 'ライトテーマに切り替え',
    themeToDark: 'ダークテーマに切り替え',
    /** 言語切り替えボタンの aria-label。 */
    switchLanguage: '言語を切り替え',
    /** 切り替え先の言語名。ボタンにはこれが出る。 */
    otherLanguage: 'English',
  },

  footer: {
    disclaimer:
      'ダンジョン&ファイター「逆説の迷宮」の非公式攻略データベース。ゲーム内の画像・名称の権利は NEXON および Neople に帰属する。',
  },

  common: {
    /** 「12区域」のような区域名。 */
    area: (n: number) => `${n}区域`,
    /** 区域番号の並びを畳んだもの。「1〜3・7区域」 */
    areaList: (areas: number[]) =>
      `${numberRuns(areas)
        .map(([from, to]) => (from === to ? `${from}` : `${from}〜${to}`))
        .join('・')}区域`,
    /** 主要報酬などの箇条書きを1行に畳むときの区切り。 */
    listSeparator: '／',
    clearSearch: '検索をクリア',
  },

  overview: {
    heroBadge: 'Season12 Act0 2-2 「千海天：新たな跳躍」',
    heroTitle: '逆説の迷宮 攻略',
    heroLead: (maxArea: number) =>
      `1〜${maxArea}区域のシードマップ、報酬構成、調査券・討伐券まわりの仕様をまとめた非公式データベース。区域ごとに5種類あるマップ配置を、ゲーム内で数えた部屋数から特定できる。`,
    heroMaps: '区域マップを見る',
    heroSystem: 'システム解説',
    heroTimeLimit: '制限時間 4分／区域',
    heroAreaCount: (maxArea: number) => `全40区域（マップ収録は ${maxArea} 区域まで）`,

    entryEyebrow: '入場条件',
    entryTitle: 'ダンジョン基本情報',
    entryDescription: '公式アップデートページに記載された仕様。',

    seedEyebrow: '攻略の基本',
    seedTitle: 'シードの見分け方',
    seedDescription:
      '各区域には5種類の配置パターン（シード）があり、どれを引いたかを最初に特定するのが攻略の起点になる。',
    seedStep1Title: '右端の列を数える',
    seedStep1Body:
      'マップの右端の列について、上から順に各行の部屋数を数える。5桁の数字（例：23333）がそのままシードコードになる。',
    seedStep2Title: '重複したら青い線を見る',
    seedStep2Body:
      '4区域以降は配置が同一で数字が重複するシードが出てくる。その場合はマップ上の青い点線2本の位置で区別する。',
    seedStep3Title: '1マス開けて確定させる',
    seedStep3Body:
      '7区域のように青い線まで一致する場合は、どちらのシードでも開ける必要があるマスを1つ開け、中身（調査券か入場券か）で判定する。',
    seedCta: '区域マップを開く',
    seedCountNote: (count: number) => `収録しているシードマップは全 ${count} パターン。`,

    featuresEyebrow: '収録データ',
    featuresTitle: 'このサイトで見られるもの',
    featureMapsTitle: (maxArea: number) => `1〜${maxArea}区域のマップ`,
    featureMapsBody: (floorCount: number, areas: string) =>
      `${floorCount} 区域分のシードマップを収録。${areas}はマスごとの報酬まで表示できる。`,
    featureMapsCta: '区域一覧へ',
    featureRewardsTitle: '報酬から逆引き',
    featureRewardsBody:
      'どのマスでどの報酬が手に入るかを一覧・検索できる。報酬名・ノード種別・等級で絞り込める。',
    featureRewardsCta: '報酬一覧へ',
    featureTicketsTitle: '調査券・入場券の仕様',
    featureTicketsBody:
      '関門のロック解除に使う迷宮調査券と、メイン／外郭それぞれの入場券の入手方法。',
    featureSystemCta: 'システムへ',
    featureSubjugationTitle: '討伐券と傭兵団',
    featureSubjugationBody: '討伐券7種の必要名声・入手条件、傭兵団レベルとバッファー派遣の仕様。',

    sourcesTitle: '出典',
    sourceOfficialLabel: 'ダンジョン&ファイター 公式 — Season12 Act0 2-2 アップデート',
    sourceOfficialNote: '入場条件・討伐券・傭兵団などの仕様',
    sourceGuideLabel: 'DCインサイド 던파IP マイナーギャラリー — 미궁 1~31층 모음',
    sourceGuideNote: '各区域のシードマップと報酬情報',
    sourceNodeNote: (areas: string) => `マスごとのノード配置・報酬データ（${areas}）`,
    sourceNamuNote: (license: string) =>
      `関門ごとの報酬内容、区域別の推奨名声とボス体力倍率（${license}）`,
    sourcesDisclaimer:
      'マップ画像および攻略情報は上記まとめ記事の投稿者によるもの。ゲーム内アップデートにより内容が変わる場合があるため、最新情報は出典元を確認してほしい。',
  },

  floors: {
    title: '区域マップ',
    lead: '区域を選ぶと5種類のシードマップを表示する。報酬名で検索すれば、その報酬が出る区域だけを絞り込める。',
    searchPlaceholder: '報酬名で検索（例：終末の啓示）',
    searchLabel: '報酬名で検索',
    noHitsTitle: (query: string) => `「${query}」に一致する報酬は見つからなかった。`,
    noHitsBody:
      '報酬名の一部だけでも検索できる。日本語・英語・韓国語のほか、マスの種別名や等級でも引ける。',
    hits: (query: string, n: number) => `「${query}」の報酬がある区域 ${n} 件`,
    cardFame: '名声',
    cardMapCount: (n: number) => `マップ ${n} 枚`,
    cardSeedCount: (n: number) => `・シード ${n} 種`,
    cardRewardsLabel: '主要報酬',
    /** 検索結果のカードで、検索語に一致した報酬を並べるリストの見出し。 */
    cardMatchedLabel: '一致した報酬',
    cardRewardsMore: (n: number) => `ほか ${n} 件`,
    rewardNodeTypes: (types: string) => `出るマス：${types}`,
    rewardAreaCount: (n: number, total: number) => `${total}区域中 ${n} 区域に出現`,
  },

  floorDetail: {
    notFound: 'その区域は見つからなかった',
    backToList: '区域一覧に戻る',
    backLink: '区域一覧',
    fameConflict: (dc: string, namu: string) =>
      `出典によって推奨名声が食い違っている。DCインサイドの実測値は ${dc}、나무위키の値は ${namu}。`,
    fameConflictEstimated: ' 나무위키側は推移からの推定値。',

    notesTitle: '攻略メモ',

    seedMapsTitle: 'シードマップ',
    seedMapsLead: 'ゲーム内で数えた部屋数と一致するシードを選ぶ。マスにカーソルを乗せると報酬が出る。',
    seedTablist: 'シードの選択',
    originalImageSummary: '元のマップ画像を見る',
    originalImageAlt: (floor: string, seed: string) => `${floor} ${seed} の元画像`,
    originalImageNote: 'クリックで原寸画像を開く。ノードデータの照合用。',

    noNodeDataDescription:
      'この区域はまだノードデータを取り込んでいないため、元記事の画像を掲載している。',
    legendTitle: '報酬アイコン対応表',
    legendDescription: '元記事に付いていた、マスのアイコンと報酬の対応表。',
    figuresTitle: 'シードの見分け方',
    figuresDescription: '配置が同じシードを区別するための手がかり。',

    linkSourcePost: '元記事（DCインサイド）',
    linkNodeSource: 'ノードデータ出典',
    linkNamu: '나무위키（報酬・名声）',
    linkVideo: '攻略動画',

    statTitle: '推奨名声・ボス体力',
    statEstimated: '推定値',
    statFame: '推奨名声',
    statHp: '体力倍率',
    fameTitle: '名声上昇値',
    rewardTitle: '主要報酬',
  },

  rewards: {
    title: '報酬一覧',
    lead: 'ノードデータを取り込んだ区域に出現する報酬をまとめたもの。報酬名・ノード種別・等級で検索できる。',
    coverage: (areas: string) => `収録範囲：${areas}`,
    searchPlaceholder: '報酬名・ノード種別・等級で検索',
    searchLabel: '報酬を検索',
    resultCount: '件',
    resultTotal: (total: number) => ` / 全 ${total} 件`,
    resultNote: '（区域バッジの数字は該当マスの総数。その区域の全シード合計）',
    empty: '該当する報酬が見つからなかった。',
    nodeTypesTitle: 'ノード種別',
    nodeTypesLead: 'マップ上のマスの種類。等級を持つマスはアイコンの色で等級が分かる。',
    sourceLead: 'ノード配置・報酬データの出典：',
  },

  map: {
    emptyPanel:
      'マスをクリックすると、ここに内容を表示する。カーソルを乗せるだけでも吹き出しで確認できる。',
    nodeLabel: (name: string, tier?: string) => (tier ? `${name}（${tier}）` : name),
    close: '表示を閉じる',
    rewardsHeading: '報酬',
  },

  viewer: {
    mapIndex: (n: number) => `マップ ${n}`,
    expand: (label: string) => `${label} を拡大表示`,
    zoomIn: '拡大',
    zoomOut: '縮小',
  },

  system: {
    title: 'システム',
    lead: '逆説の迷宮を支える各種チケット、傭兵団、討伐、バッファー派遣の仕様。すべて公式アップデートページの記載に基づく。',
    officialLink: '公式アップデートページ',
    ticketsTitle: 'チケット',
    ticketUse: '用途',
    ticketAcquire: '入手方法',
    subjugationTitle: '討伐券',
    colTicket: '討伐券',
    colEffect: '効果',
    colAcquire: '入手方法',
    colFame: '必要名声',
    colConditions: '使用条件',
    altSource: '別ソース',
    mercenaryTitle: '傭兵団',
    dispatchTitle: 'バッファー派遣',
  },
}

export type UiText = typeof ja

const en: UiText = {
  brand: {
    title: 'Labyrinth of Paradox',
    subtitle: 'Strategy Database',
  },

  meta: {
    title: 'Labyrinth of Paradox Guide | Dungeon & Fighter',
    description:
      'A strategy database for the Dungeon & Fighter dungeon "Labyrinth of Paradox": seed maps for areas 1–31, fame gains, key rewards, and the rules behind survey tickets, subjugation tickets and the mercenary group.',
  },

  nav: {
    overview: 'Overview',
    floors: 'Area Maps',
    rewards: 'Rewards',
    system: 'System',
    menu: 'Menu',
    openMenu: 'Open menu',
    github: 'Open the GitHub repository',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    switchLanguage: 'Switch language',
    otherLanguage: '日本語',
  },

  footer: {
    disclaimer:
      'An unofficial strategy database for the Dungeon & Fighter dungeon "Labyrinth of Paradox". All in-game images and names are the property of NEXON and Neople.',
  },

  common: {
    area: (n: number) => `Area ${n}`,
    areaList: (areas: number[]) => {
      const runs = numberRuns(areas)
      const body = runs.map(([from, to]) => (from === to ? `${from}` : `${from}–${to}`)).join(', ')
      return runs.length === 1 && runs[0][0] === runs[0][1] ? `Area ${body}` : `Areas ${body}`
    },
    listSeparator: ' / ',
    clearSearch: 'Clear search',
  },

  overview: {
    heroBadge: 'Season 12 Act 0 2-2 "Thousand Seas Sky: A New Leap"',
    heroTitle: 'Labyrinth of Paradox Guide',
    heroLead: (maxArea: number) =>
      `An unofficial database covering the seed maps for areas 1–${maxArea}, their reward layouts, and the rules around survey and subjugation tickets. Each area has five possible map layouts, and you can pin down which one you got by counting rooms in game.`,
    heroMaps: 'View area maps',
    heroSystem: 'System guide',
    heroTimeLimit: '4-minute limit per area',
    heroAreaCount: (maxArea: number) => `40 areas total (maps cover areas 1–${maxArea})`,

    entryEyebrow: 'Entry requirements',
    entryTitle: 'Dungeon basics',
    entryDescription: 'Specifications as listed on the official update page.',

    seedEyebrow: 'Where to start',
    seedTitle: 'Identifying the seed',
    seedDescription:
      'Every area has five possible layouts (seeds). Working out which one you drew is the first step of any run.',
    seedStep1Title: 'Count the rightmost column',
    seedStep1Body:
      'Going down the rightmost column, count the rooms in each row. The resulting five digits (e.g. 23333) are the seed code.',
    seedStep2Title: 'On a tie, check the blue lines',
    seedStep2Body:
      'From area 4 on, some seeds share the same layout and therefore the same digits. Tell them apart by where the two blue dotted lines sit on the map.',
    seedStep3Title: 'Open one room to confirm',
    seedStep3Body:
      'When even the blue lines match — as in area 7 — open a room that both candidate seeds require you to open anyway, and identify the seed from what is inside (a survey ticket or an entry ticket).',
    seedCta: 'Open area maps',
    seedCountNote: (count: number) => `${count} seed map patterns are covered in total.`,

    featuresEyebrow: "What's inside",
    featuresTitle: 'What you can look up here',
    featureMapsTitle: (maxArea: number) => `Maps for areas 1–${maxArea}`,
    featureMapsBody: (floorCount: number, areas: string) =>
      `Seed maps for ${floorCount} areas. ${areas} also show the reward on every single room.`,
    featureMapsCta: 'Browse areas',
    featureRewardsTitle: 'Reverse lookup by reward',
    featureRewardsBody:
      'List and search which rooms drop which rewards. Filter by reward name, node type or tier.',
    featureRewardsCta: 'Browse rewards',
    featureTicketsTitle: 'Survey & entry tickets',
    featureTicketsBody:
      'How to obtain the labyrinth survey tickets used to unlock gates, plus the main and outer entry tickets.',
    featureSystemCta: 'Go to System',
    featureSubjugationTitle: 'Subjugation tickets & mercenaries',
    featureSubjugationBody:
      'Required fame and unlock conditions for all seven subjugation tickets, plus mercenary levels and buffer dispatch.',

    sourcesTitle: 'Sources',
    sourceOfficialLabel: 'Dungeon & Fighter official — Season 12 Act 0 2-2 update',
    sourceOfficialNote: 'Entry requirements, subjugation tickets, mercenary group',
    sourceGuideLabel: 'DCInside 던파IP minor gallery — 미궁 1~31층 모음',
    sourceGuideNote: 'Seed maps and reward information for each area',
    sourceNodeNote: (areas: string) => `Per-room node layout and reward data (${areas})`,
    sourceNamuNote: (license: string) =>
      `Rewards per gate, recommended fame and boss HP multipliers per area (${license})`,
    sourcesDisclaimer:
      'The map images and strategy information come from the authors of the posts linked above. In-game updates may change the contents, so check the original sources for the latest information.',
  },

  floors: {
    title: 'Area Maps',
    lead: 'Pick an area to see its five seed maps. Search by reward name to narrow the list down to the areas that drop it.',
    searchPlaceholder: 'Search by reward name (e.g. Revelation)',
    searchLabel: 'Search by reward name',
    noHitsTitle: (query: string) => `No reward matches "${query}".`,
    noHitsBody:
      'Part of a reward name is enough. Japanese, English and Korean names all work, as do node type names and tiers.',
    hits: (query: string, n: number) =>
      n === 1 ? `1 area drops "${query}"` : `${n} areas drop "${query}"`,
    cardFame: 'Fame',
    cardMapCount: (n: number) => (n === 1 ? '1 map' : `${n} maps`),
    cardSeedCount: (n: number) => (n === 1 ? ' · 1 seed' : ` · ${n} seeds`),
    cardRewardsLabel: 'Key rewards',
    cardMatchedLabel: 'Matching rewards',
    cardRewardsMore: (n: number) => (n === 1 ? '1 more' : `${n} more`),
    rewardNodeTypes: (types: string) => `Found in: ${types}`,
    rewardAreaCount: (n: number, total: number) => `Appears in ${n} of ${total} areas`,
  },

  floorDetail: {
    notFound: 'That area could not be found',
    backToList: 'Back to the area list',
    backLink: 'Area list',
    fameConflict: (dc: string, namu: string) =>
      `The sources disagree on the recommended fame. DCInside measured ${dc}, while NamuWiki lists ${namu}.`,
    fameConflictEstimated: ' The NamuWiki figure is extrapolated from the surrounding areas.',

    notesTitle: 'Strategy notes',

    seedMapsTitle: 'Seed maps',
    seedMapsLead:
      'Pick the seed matching the room counts you read in game. Hover a room to see its reward.',
    seedTablist: 'Select a seed',
    originalImageSummary: 'View the original map image',
    originalImageAlt: (floor: string, seed: string) => `Original image for ${floor} ${seed}`,
    originalImageNote: 'Click to open the full-size image, for cross-checking the node data.',

    noNodeDataDescription:
      'Node data has not been imported for this area yet, so the images from the original post are shown instead.',
    legendTitle: 'Reward icon legend',
    legendDescription: 'The room icon / reward table that came with the original post.',
    figuresTitle: 'Telling the seeds apart',
    figuresDescription: 'Clues for distinguishing seeds that share the same layout.',

    linkSourcePost: 'Original post (DCInside)',
    linkNodeSource: 'Node data source',
    linkNamu: 'NamuWiki (rewards & fame)',
    linkVideo: 'Walkthrough video',

    statTitle: 'Recommended fame & boss HP',
    statEstimated: 'Estimated',
    statFame: 'Recommended fame',
    statHp: 'HP multiplier',
    fameTitle: 'Fame gain',
    rewardTitle: 'Key rewards',
  },

  rewards: {
    title: 'Rewards',
    lead: 'Every reward found in the areas whose node data has been imported. Search by reward name, node type or tier.',
    coverage: (areas: string) => `Covers ${areas}`,
    searchPlaceholder: 'Search by reward, node type or tier',
    searchLabel: 'Search rewards',
    resultCount: 'results',
    resultTotal: (total: number) => ` / of ${total}`,
    resultNote: '(The area badges count every matching room across all seeds of that area.)',
    empty: 'No matching rewards found.',
    nodeTypesTitle: 'Node types',
    nodeTypesLead:
      'The kinds of rooms found on the map. For rooms that have a tier, the icon colour tells you which.',
    sourceLead: 'Node layout and reward data from: ',
  },

  map: {
    emptyPanel:
      'Click a room to show its contents here. Hovering alone brings up a tooltip with the same information.',
    nodeLabel: (name: string, tier?: string) => (tier ? `${name} (${tier})` : name),
    close: 'Close',
    rewardsHeading: 'Rewards',
  },

  viewer: {
    mapIndex: (n: number) => `map ${n}`,
    expand: (label: string) => `Expand ${label}`,
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
  },

  system: {
    title: 'System',
    lead: 'The tickets, mercenary group, subjugation and buffer dispatch systems behind the Labyrinth of Paradox — all as described on the official update page.',
    officialLink: 'Official update page',
    ticketsTitle: 'Tickets',
    ticketUse: 'Use',
    ticketAcquire: 'How to obtain',
    subjugationTitle: 'Subjugation tickets',
    colTicket: 'Ticket',
    colEffect: 'Effect',
    colAcquire: 'How to obtain',
    colFame: 'Required fame',
    colConditions: 'Requirements',
    altSource: 'Other source',
    mercenaryTitle: 'Mercenary group',
    dispatchTitle: 'Buffer dispatch',
  },
}

export const UI_TEXT: Record<Locale, UiText> = { ja, en }
