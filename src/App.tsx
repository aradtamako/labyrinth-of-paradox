import { SiteHeader } from '@/components/site-header'
import { useRoute, useScrollRestoration } from '@/lib/router'
import { FloorDetailPage } from '@/pages/floor-detail'
import { FloorListPage } from '@/pages/floor-list'
import { OverviewPage } from '@/pages/overview'
import { RewardsPage } from '@/pages/rewards'
import { SystemPage } from '@/pages/system'

export default function App() {
  const route = useRoute()
  useScrollRestoration(route)

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader route={route} />

      <main className="flex-1">
        {route.name === 'overview' && <OverviewPage />}
        {route.name === 'floors' && <FloorListPage />}
        {route.name === 'floor' && <FloorDetailPage floorKey={route.key} />}
        {route.name === 'rewards' && <RewardsPage />}
        {route.name === 'system' && <SystemPage />}
      </main>

      <SiteFooter />
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
        <p>
          ダンジョン&ファイター「逆説の迷宮」の非公式攻略データベース。
          ゲーム内の画像・名称の権利は NEXON および Neople に帰属する。
        </p>
      </div>
    </footer>
  )
}
