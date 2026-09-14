import { useEffect, useState } from 'react'

import { RELEASE_NOTES } from '@/data/release-notes'

/**
 * 更新履歴の既読状態を localStorage に覚えさせる。
 * 最新の更新日だけを保存し、保存値より新しい更新があれば未読として扱う。
 * 新しい更新履歴を足すだけで、通知マークが再表示される。
 */

const KEY = 'lop-last-seen-release'
const EVENT = 'lop-release-notes-read'

/** 最新の更新日（ISO 形式）。更新履歴が空なら空文字。 */
export function latestReleaseKey(): string {
  return RELEASE_NOTES[0]?.date ?? ''
}

function read(): string | null {
  try {
    return localStorage.getItem(KEY)
  } catch {
    // プライベートモードでの拒否。未読として扱う。
    return null
  }
}

function write(value: string) {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    // 保存できなくても、その場の表示は切り替えたいので握り潰す。
  }
}

/** 未読の更新があれば true。保存値が最新と一致しなければ未読。 */
export function hasUnreadReleaseNotes(): boolean {
  const latest = latestReleaseKey()
  if (!latest) return false
  return read() !== latest
}

/** 更新履歴を開いたときに呼ぶ。最新まで既読にしてヘッダーに通知する。 */
export function markReleaseNotesRead() {
  const latest = latestReleaseKey()
  if (!latest) return
  write(latest)
  window.dispatchEvent(new CustomEvent(EVENT))
}

/** ヘッダーの通知マーク用。既読状態の変化を追う。 */
export function useHasUnreadReleaseNotes(): boolean {
  const [unread, setUnread] = useState(hasUnreadReleaseNotes)

  useEffect(() => {
    const update = () => setUnread(hasUnreadReleaseNotes())
    window.addEventListener('storage', update)
    window.addEventListener(EVENT, update)
    return () => {
      window.removeEventListener('storage', update)
      window.removeEventListener(EVENT, update)
    }
  }, [])

  return unread
}
