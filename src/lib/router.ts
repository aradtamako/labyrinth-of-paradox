import { useEffect, useState } from 'react'

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

/** ルート変更のたびに先頭へ戻す。階層を渡り歩くときにスクロール位置が残ると読みにくい。 */
export function useScrollReset(dep: unknown) {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [dep])
}
