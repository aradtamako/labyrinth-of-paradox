import { CONTACT_URL, SiteHeader } from '@/components/site-header'
import { useI18n } from '@/lib/i18n'
import { useRoute, useScrollRestoration } from '@/lib/router'
import { FloorDetailPage } from '@/pages/floor-detail'
import { FloorListPage } from '@/pages/floor-list'
import { OverviewPage } from '@/pages/overview'
import { ReleaseNotesPage } from '@/pages/release-notes'
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
        {route.name === 'release-notes' && <ReleaseNotesPage />}
      </main>

      <SiteFooter />
    </div>
  )
}

function SiteFooter() {
  const { t } = useI18n()

  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground">
        <a
          href={CONTACT_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="w-fit hover:text-foreground hover:underline"
        >
          {t.nav.contact}
        </a>
        <p>{t.footer.disclaimer}</p>
      </div>
    </footer>
  )
}
