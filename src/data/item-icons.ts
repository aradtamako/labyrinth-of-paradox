/**
 * ゲーム内アイテムアイコン（public/stackable/material/）。
 * ファイル名の数字はゲームのアイテムIDに対応する。
 */

export const materialIcon = (id: number) => `/stackable/material/${id}.png`

/** 討伐券7種のアイテムID。 */
export const TICKET_ICON = {
  /** 啓示：千海を抱く天 討伐券 */
  revelationSky: 1020,
  /** 月の沈んだ湖 & アジュールメイン 討伐券 */
  moonLakeAzure: 1021,
  /** 死の女神殿 & 解放された凶夢 討伐券 */
  deathGoddessNightmare: 1022,
  /** 解放された凶夢 & 星座亀の大書庫 討伐券 */
  nightmareLibrary: 1023,
  /** 星座亀の大書庫 & 背教者の城 討伐券 */
  libraryApostate: 1024,
  /** 背教者の城 & 最後の任務 討伐券 */
  apostateFinalTask: 1025,
  /** アポカリプス：アンティエンバイ 2段階討伐券 */
  apocalypseAntienbai: 1026,
} as const

/** 나무위키側の報酬名から討伐券アイコンを引くための対応表。 */
export const SUBJUGATION_REWARD_ICON: Record<string, number> = {
  '啓示：千海を抱く天 討伐券': TICKET_ICON.revelationSky,
  '月の沈んだ湖 + アジュールメイン 討伐券': TICKET_ICON.moonLakeAzure,
  '死の女神殿 + 解放された凶夢 討伐券': TICKET_ICON.deathGoddessNightmare,
  '解放された凶夢 + 星座亀の大書庫 討伐券': TICKET_ICON.nightmareLibrary,
  '星座亀の大書庫 + 背教者の城 討伐券': TICKET_ICON.libraryApostate,
  '背教者の城 + 最後の任務 討伐券': TICKET_ICON.apostateFinalTask,
  'アポカリプス：アンティエンバイ 2段階討伐券': TICKET_ICON.apocalypseAntienbai,
}

export const materialIconForReward = (name: string) => {
  const id = SUBJUGATION_REWARD_ICON[name]
  return id === undefined ? undefined : materialIcon(id)
}

/** 報酬名からゲーム内アイコンを引く。 */
export const rewardIconForName = (name: string) => {
  const material = materialIconForReward(name)
  if (material) return material

  if (name === '外郭入場券') return '/minimap/3.png'
  if (name === '迷宮調査券') return '/minimap/4.png'
  return undefined
}
