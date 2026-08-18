import { useState } from 'react'

/**
 * 区域ごとに選んだシードを localStorage に覚えさせる。テーマ（theme.ts）や
 * 言語（i18n.tsx）と同じ扱いで、ブラウザを閉じても次に開いたときに復元する。
 *
 * 保存するのは配列の添字ではなくシードコード。ノードデータを取り込み直して
 * シードの並びが変わっても、同じシードを選び直せるようにするため。
 */

const KEY = 'lop-seed-selection'

/** 区域キー → シードコード。 */
type Store = Record<string, string>

function read(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}

    const store: Store = {}
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === 'string') store[key] = value
    }
    return store
  } catch {
    // 壊れた JSON やプライベートモードでの拒否。保存が無かったものとして扱う。
    return {}
  }
}

function write(store: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    // 容量超過などで保存できなくても、その場の選択は動かしたいので握り潰す。
  }
}

export interface SeedSelection {
  /** 表示中のシードコード。保存があればそれ、無ければ先頭のシード。 */
  active: string
  /** 保存済みのシードコード。未保存なら null。 */
  saved: string | null
  /** シードを選び直して保存する。 */
  select: (seedCode: string) => void
  /** 保存だけ消す。表示中のシードはそのまま。 */
  clear: () => void
}

export function useSeedSelection(floorKey: string, seedCodes: string[]): SeedSelection {
  // 保存済みでも、そのシードが今のデータに無ければ無視する。
  const restored = () => {
    const stored = read()[floorKey]
    return stored && seedCodes.includes(stored) ? stored : null
  }

  const [saved, setSaved] = useState<string | null>(restored)
  const [active, setActive] = useState<string>(() => restored() ?? seedCodes[0])

  return {
    active,
    saved,
    select: (seedCode) => {
      setActive(seedCode)
      setSaved(seedCode)
      write({ ...read(), [floorKey]: seedCode })
    },
    clear: () => {
      setSaved(null)
      const store = read()
      delete store[floorKey]
      write(store)
    },
  }
}
