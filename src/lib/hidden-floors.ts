import { useState } from 'react'

/**
 * 区域マップ一覧で非表示にした区域を localStorage に覚えさせる。
 * シードの選択（seed-selection.ts）と同じく、区域キーで保存してデータの
 * 並びが変わっても対応が崩れないようにする。
 */

const KEY = 'lop-hidden-floors'

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((value): value is string => typeof value === 'string')
  } catch {
    // 壊れた JSON やプライベートモードでの拒否。保存が無かったものとして扱う。
    return []
  }
}

function write(keys: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(keys))
  } catch {
    // 容量超過などで保存できなくても、その場の表示は切り替えたいので握り潰す。
  }
}

export interface HiddenFloors {
  /** 非表示にした区域キー。非表示にした順。 */
  keys: string[]
  has: (floorKey: string) => boolean
  hide: (floorKey: string) => void
  /** 渡した区域だけ表示に戻す。 */
  show: (floorKeys: string[]) => void
  showAll: () => void
}

/** knownKeys に無い区域キーは、データ側から消えたものとして捨てる。 */
export function useHiddenFloors(knownKeys: string[]): HiddenFloors {
  const [keys, setKeys] = useState<string[]>(() => read().filter((key) => knownKeys.includes(key)))

  // 更新は必ず直前の値から作る。同じレンダーの値を捕まえると、2つの区域を
  // 続けて非表示にしたときに片方の更新が消える。
  const update = (next: (prev: string[]) => string[]) =>
    setKeys((prev) => {
      const value = next(prev)
      write(value)
      return value
    })

  return {
    keys,
    has: (floorKey) => keys.includes(floorKey),
    hide: (floorKey) =>
      update((prev) => (prev.includes(floorKey) ? prev : [...prev, floorKey])),
    show: (floorKeys) => update((prev) => prev.filter((key) => !floorKeys.includes(key))),
    showAll: () => update(() => []),
  }
}
