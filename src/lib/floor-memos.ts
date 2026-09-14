import { useState } from 'react'

/**
 * 区域ごとに自分で書く攻略メモを localStorage に覚えさせる。
 * 非表示区域（hidden-floors.ts）やシードの選択（seed-selection.ts）と同じ扱いで、
 * キーは区域キー。データの並びが変わっても対応が崩れないようにするため。
 *
 * 保存するのはこのブラウザだけ。他の人に送る機能はない。
 */

const KEY = 'lop-floor-memos'

/** 区域キー → メモ本文。空本文は持たない。 */
type Store = Record<string, string>

function read(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}

    const store: Store = {}
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === 'string' && value.trim()) store[key] = value
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
    // 容量超過などで保存できなくても、その場の入力は失いたくないので握り潰す。
  }
}

export interface FloorMemos {
  /** 区域キー → メモ本文。 */
  memos: Store
  /** メモが入っている区域の数。絞り込み用のラベルに出す。 */
  count: number
  /** 保存済みの本文。無ければ空文字。 */
  get: (floorKey: string) => string
  /** 本文を保存する。空（空白のみ）なら削除として扱う。 */
  set: (floorKey: string, text: string) => void
}

/** knownKeys に無い区域キーは、データ側から消えたものとして捨てる。 */
export function useFloorMemos(knownKeys: string[]): FloorMemos {
  const [memos, setMemos] = useState<Store>(() => {
    const stored = read()
    const next: Store = {}
    for (const key of knownKeys) {
      if (stored[key]) next[key] = stored[key]
    }
    return next
  })

  // 更新は必ず直前の値から作る。同じレンダーの値を捕まえると、
  // 続けて2つの区域にメモを書いたときに片方の保存が消える。
  const update = (next: (prev: Store) => Store) =>
    setMemos((prev) => {
      const value = next(prev)
      write(value)
      return value
    })

  return {
    memos,
    count: Object.keys(memos).length,
    get: (floorKey) => memos[floorKey] ?? '',
    set: (floorKey, text) =>
      update((prev) => {
        const trimmed = text.trim()
        const next = { ...prev }
        if (trimmed) next[floorKey] = trimmed
        else delete next[floorKey]
        return next
      }),
  }
}
