import { ArrowRight, ExternalLink, Gift, KeySquare, Layers, ScrollText, Timer } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FLOORS, GUIDE_INDEX_URL, MAX_AREA, SEED_COUNT } from '@/data/floors'
import { NAMU_SOURCE } from '@/data/namu'
import { AREAS_WITH_NODES, NODE_DATA_SOURCE } from '@/data/node-types'
import { ENTRY_SPECS, OFFICIAL_SOURCE } from '@/data/official'
import { useI18n } from '@/lib/i18n'
import { localizedHash } from '@/lib/locale'

export function OverviewPage() {
  const { t, x, locale } = useI18n()
  const nodeAreas = t.common.areaList(AREAS_WITH_NODES)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <Hero />

      <section className="mt-12">
        <SectionHeading
          eyebrow={t.overview.entryEyebrow}
          title={t.overview.entryTitle}
          description={t.overview.entryDescription}
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ENTRY_SPECS.map((spec) => (
            <div key={spec.label.ja} className="rounded-xl border bg-card px-4 py-3.5">
              <div className="text-xs text-muted-foreground">{x(spec.label)}</div>
              <div className="mt-1 text-[15px] font-semibold tracking-tight">{x(spec.value)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow={t.overview.seedEyebrow}
          title={t.overview.seedTitle}
          description={t.overview.seedDescription}
        />

        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          <Step n={1} title={t.overview.seedStep1Title} body={t.overview.seedStep1Body} />
          <Step n={2} title={t.overview.seedStep2Title} body={t.overview.seedStep2Body} />
          <Step n={3} title={t.overview.seedStep3Title} body={t.overview.seedStep3Body} />
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href={localizedHash(locale, '#/floors')}>
              {t.overview.seedCta}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">{t.overview.seedSearchNote(SEED_COUNT)}</p>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading eyebrow={t.overview.featuresEyebrow} title={t.overview.featuresTitle} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Layers className="size-4" />}
            title={t.overview.featureMapsTitle(MAX_AREA)}
            body={t.overview.featureMapsBody(FLOORS.length, nodeAreas)}
            href={localizedHash(locale, '#/floors')}
            cta={t.overview.featureMapsCta}
          />
          <FeatureCard
            icon={<Gift className="size-4" />}
            title={t.overview.featureRewardsTitle}
            body={t.overview.featureRewardsBody}
            href={localizedHash(locale, '#/rewards')}
            cta={t.overview.featureRewardsCta}
          />
          <FeatureCard
            icon={<KeySquare className="size-4" />}
            title={t.overview.featureTicketsTitle}
            body={t.overview.featureTicketsBody}
            href={localizedHash(locale, '#/system')}
            cta={t.overview.featureSystemCta}
          />
          <FeatureCard
            icon={<ScrollText className="size-4" />}
            title={t.overview.featureSubjugationTitle}
            body={t.overview.featureSubjugationBody}
            href={localizedHash(locale, '#/system')}
            cta={t.overview.featureSystemCta}
          />
        </div>
      </section>

      <Separator className="mt-14" />

      <section className="mt-8">
        <h2 className="text-sm font-semibold">{t.overview.sourcesTitle}</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          <SourceLink
            href={OFFICIAL_SOURCE}
            label={t.overview.sourceOfficialLabel}
            note={t.overview.sourceOfficialNote}
          />
          <SourceLink
            href={GUIDE_INDEX_URL}
            label={t.overview.sourceGuideLabel}
            note={t.overview.sourceGuideNote}
          />
          <SourceLink
            href={NODE_DATA_SOURCE.url}
            label={NODE_DATA_SOURCE.label}
            note={t.overview.sourceNodeNote(nodeAreas)}
          />
          <SourceLink
            href={NAMU_SOURCE.url}
            label={NAMU_SOURCE.label}
            note={t.overview.sourceNamuNote(NAMU_SOURCE.license)}
          />
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          {t.overview.sourcesDisclaimer}
        </p>
      </section>
    </div>
  )
}

function Hero() {
  const { t, locale } = useI18n()

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card px-6 py-10 sm:px-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/12 blur-3xl"
      />
      <div className="relative">
        <Badge variant="secondary" className="mb-4">
          {t.overview.heroBadge}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
          {t.overview.heroTitle}
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          {t.overview.heroLead(MAX_AREA)}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href={localizedHash(locale, '#/floors')}>
              {t.overview.heroMaps}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={localizedHash(locale, '#/system')}>{t.overview.heroSystem}</a>
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Timer className="size-3.5" />
            {t.overview.heroTimeLimit}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers className="size-3.5" />
            {t.overview.heroAreaCount(MAX_AREA)}
          </span>
        </div>
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs font-medium tracking-widest text-primary uppercase">{eyebrow}</div>
      <h2 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      {description && <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  )
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="rounded-xl border bg-card p-5">
      <span className="grid size-7 place-items-center rounded-md bg-primary/12 font-mono text-sm font-semibold text-primary">
        {n}
      </span>
      <h3 className="mt-3 font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </li>
  )
}

function FeatureCard({
  icon,
  title,
  body,
  href,
  cta,
}: {
  icon: React.ReactNode
  title: string
  body: string
  href: string
  cta: string
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <span className="grid size-8 place-items-center rounded-md bg-secondary text-secondary-foreground">
          {icon}
        </span>
        <CardTitle className="mt-3 text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
        <a
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {cta}
          <ArrowRight className="size-3.5" />
        </a>
      </CardContent>
    </Card>
  )
}

function SourceLink({ href, label, note }: { href: string; label: string; note: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="group inline-flex items-start gap-1.5 hover:underline"
      >
        <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted-foreground" />
        <span>
          {label}
          <span className="block text-xs text-muted-foreground no-underline">{note}</span>
        </span>
      </a>
    </li>
  )
}
