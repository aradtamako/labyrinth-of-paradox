import { useEffect, useLayoutEffect, useState } from 'react'

/**
 * ごく小さなハッシュルーター。SPA なのでサーバー側の設定なしで動かせるよう
 * history API ではなく location.hash を使う。
 */

export type Route =
  | { name: 'overview' }
  | { name: 'floors' }
  | { name: 'floor'; key: string }
  | { name: 'rewards' }
  | { name: 'system' }

function parse(hash: string): Route {
  const path = hash.replace(/^#\/?/, '').split('?')[0]
  const parts = path.split('/').filter(Boolean)

  if (parts[0] === 'floors') {
    return parts[1] ? { name: 'floor', key: decodeURIComponent(parts[1]) } : { name: 'floors' }
  }
  if (parts[0] === 'rewards') return { name: 'rewards' }
  if (parts[0] === 'system') return { name: 'system' }
  return { name: 'overview' }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash))

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export function navigate(to: string) {
  window.location.hash = to
}

export function hrefFor(route: Route): string {
  switch (route.name) {
    case 'floors':
      return '#/floors'
    case 'floor':
      return `#/floors/${encodeURIComponent(route.key)}`
    case 'rewards':
      return '#/rewards'
    case 'system':
      return '#/system'
    default:
      return '#/'
  }
}

/**
 * スクロール位置の記録。ブラウザ標準の復元は React が中身を描く前に走って効かないので自前でやる。
 *
 * 「戻る/進む」かどうかは popstate では判別できない（Chromium はハッシュリンクを踏んだだけでも
 * popstate を投げる）ので、history エントリごとに印（`lopKey`）を付けて見分ける。
 * 印が既にあるエントリ＝一度訪れたエントリ＝戻る/進む、無ければ新規遷移。
 */
const scrollPositions = new Map<string, number>()

type HistoryState = { lopKey?: string } | null

function newKey(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

/** 現在の history エントリのキー。印が無ければ付ける。 */
function stampCurrentEntry(): string {
  const state = window.history.state as HistoryState
  if (state?.lopKey) return state.lopKey

  const lopKey = newKey()
  window.history.replaceState({ ...state, lopKey }, '')
  return lopKey
}

let currentKey = ''

if (typeof window !== 'undefined') {
  // 自前で復元するのでブラウザの自動復元は切る
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  currentKey = stampCurrentEntry()

  window.addEventListener('hashchange', () => {
    // ハッシュに対応する id は無いのでブラウザは勝手にスクロールしない。
    // つまりこの時点ではまだ離れる直前のページの位置が残っている。
    scrollPositions.set(currentKey, window.scrollY)
    currentKey = stampCurrentEntry()
  })
}

/**
 * 戻る/進むなら元のスクロール位置へ、リンクでの遷移なら先頭へ。
 * 新規エントリには保存済みの位置が無いので、同じ引き方で先頭に戻る。
 * 階層を渡り歩くときに位置が残ると読みにくいので、新規遷移は先頭のままにしておく。
 */
export function useScrollRestoration(route: Route) {
  const href = hrefFor(route)

  useLayoutEffect(() => {
    // html { scroll-behavior: smooth } が効くと復元がアニメーションしてしまうので instant
    window.scrollTo({ top: scrollPositions.get(currentKey) ?? 0, behavior: 'instant' })
  }, [href])
}
