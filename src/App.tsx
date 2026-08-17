import { SiteHeader } from '@/components/site-header'
import { useI18n } from '@/lib/i18n'
import { useRoute, useScrollReset } from '@/lib/router'
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
  const { t } = useI18n()

  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
        <p>{t.footer.disclaimer}</p>
      </div>
    </footer>
  )
}
