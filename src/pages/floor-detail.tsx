import { ArrowLeft, ArrowRight, ExternalLink, Gift, Image as ImageIcon, Info, Play, TrendingUp } from 'lucide-react'
import { useState } from 'react'

import { LabyrinthMap } from '@/components/labyrinth-map'
import { MapCard } from '@/components/map-viewer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FLOORS, FLOOR_BY_KEY, seedDigits, thumbFor } from '@/data/floors'
import type { Floor, FloorImage } from '@/data/floors'
import { MAPS_BY_AREA, NODE_DATA_SOURCE } from '@/data/node-types'
import type { SeedMap } from '@/data/node-types'
import { AREA_STAT_BY_AREA, GATE_NOTES, HP_NOTE, NAMU_SOURCE } from '@/data/namu'
import type { AreaStat } from '@/data/namu'
import { useI18n } from '@/lib/i18n'
import { localizedHash } from '@/lib/locale'
import { cn } from '@/lib/utils'

export function FloorDetailPage({ floorKey }: { floorKey: string }) {
  const { t, x, locale } = useI18n()
  const floor = FLOOR_BY_KEY.get(floorKey)

  if (!floor) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-xl font-semibold">{t.floorDetail.notFound}</h1>
        <Button asChild variant="outline" className="mt-5">
          <a href={localizedHash(locale, '#/floors')}>
            <ArrowLeft className="size-4" />
            {t.floorDetail.backToList}
          </a>
        </Button>
      </div>
    )
  }

  const index = FLOORS.indexOf(floor)
  const prev = FLOORS[index - 1]
  const next = FLOORS[index + 1]

  const maps = floor.areas.flatMap((a) => MAPS_BY_AREA.get(a) ?? [])
  const stat = floor.areas.length === 1 ? AREA_STAT_BY_AREA.get(floor.areas[0]) : undefined
  const legends = floor.images.filter((i) => i.legend)
  const figures = floor.images.filter((i) => i.figure)
  const plainMaps = floor.images.filter((i) => !i.legend && !i.figure)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <a
        href={localizedHash(locale, '#/floors')}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {t.floorDetail.backLink}
      </a>

      <header className="mt-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{x(floor.label)}</h1>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {stat ? <AreaStatPanel stat={stat} /> : floor.fame && <FamePanel fame={floor.fame} />}
          {floor.rewards && floor.rewards.length > 0 && <RewardPanel rewards={floor.rewards} />}
        </div>
        {stat && floor.fame && floor.fame.to !== stat.fame && (
          <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/[0.07] px-3.5 py-2.5 text-xs leading-relaxed">
            {t.floorDetail.fameConflict(
              floor.fame.to.toLocaleString(),
              stat.fame.toLocaleString(),
            )}
            {stat.estimated && t.floorDetail.fameConflictEstimated}
          </p>
        )}
      </header>

      {(floor.notes?.length || maps.length > 0) && (
        <section className="mt-6 rounded-xl border border-primary/25 bg-primary/[0.06] p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Info className="size-4 text-primary" />
            {t.floorDetail.notesTitle}
          </h2>
          <ul className="mt-3 space-y-2">
            {[...(floor.notes ?? []), ...(maps.length > 0 ? GATE_NOTES : [])].map((note) => (
              <li key={note.ja} className="flex gap-2.5 text-sm leading-relaxed">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                <span>{x(note)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {maps.length > 0 ? (
        <SeedMapSection maps={maps} images={plainMaps} floorLabel={x(floor.label)} />
      ) : (
        <ImageSection
          title={t.floorDetail.seedMapsTitle}
          description={t.floorDetail.noNodeDataDescription}
          images={plainMaps}
          floorLabel={x(floor.label)}
          columns="lg:grid-cols-2"
        />
      )}

      {legends.length > 0 && (
        <ImageSection
          title={t.floorDetail.legendTitle}
          description={t.floorDetail.legendDescription}
          images={legends}
          floorLabel={x(floor.label)}
          columns="lg:grid-cols-2"
        />
      )}

      {figures.length > 0 && (
        <ImageSection
          title={t.floorDetail.figuresTitle}
          description={t.floorDetail.figuresDescription}
          images={figures}
          floorLabel={x(floor.label)}
          columns="sm:grid-cols-2 lg:grid-cols-3"
        />
      )}

      <Separator className="mt-12" />

      <section className="mt-6 flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <a href={floor.sourceUrl} target="_blank" rel="noreferrer noopener">
            <ExternalLink className="size-3.5" />
            {t.floorDetail.linkSourcePost}
          </a>
        </Button>
        {maps.length > 0 && (
          <Button asChild variant="outline" size="sm">
            <a href={NODE_DATA_SOURCE.url} target="_blank" rel="noreferrer noopener">
              <ExternalLink className="size-3.5" />
              {t.floorDetail.linkNodeSource}
            </a>
          </Button>
        )}
        <Button asChild variant="outline" size="sm">
          <a href={NAMU_SOURCE.url} target="_blank" rel="noreferrer noopener">
            <ExternalLink className="size-3.5" />
            {t.floorDetail.linkNamu}
          </a>
        </Button>
        {floor.videoUrl && (
          <Button asChild variant="outline" size="sm">
            <a href={floor.videoUrl} target="_blank" rel="noreferrer noopener">
              <Play className="size-3.5" />
              {t.floorDetail.linkVideo}
            </a>
          </Button>
        )}
      </section>

      <nav className="mt-10 flex items-center justify-between gap-3 border-t pt-6">
        {prev ? (
          <Button asChild variant="ghost">
            <a href={localizedHash(locale, `#/floors/${prev.key}`)}>
              <ArrowLeft className="size-4" />
              {x(prev.label)}
            </a>
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button asChild variant="ghost">
            <a href={localizedHash(locale, `#/floors/${next.key}`)}>
              {x(next.label)}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        )}
      </nav>
    </div>
  )
}

/** シード切り替え + ノードグリッド。元画像は出典として下に小さく置く。 */
function SeedMapSection({
  maps,
  images,
  floorLabel,
}: {
  maps: SeedMap[]
  images: FloorImage[]
  floorLabel: string
}) {
  const { t } = useI18n()
  const [active, setActive] = useState(0)
  const map = maps[active]
  const sourceImage = images.find((i) => i.seed && seedDigits(i.seed) === map.seedCode)

  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold tracking-tight">{t.floorDetail.seedMapsTitle}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t.floorDetail.seedMapsLead}</p>

      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label={t.floorDetail.seedTablist}>
        {maps.map((m, i) => (
          <button
            key={m.seedCode}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'rounded-lg border px-3.5 py-2 font-mono text-sm font-semibold tracking-wider tabular-nums transition',
              i === active
                ? 'border-primary bg-primary/10 text-foreground'
                : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
            )}
          >
            {m.seedCode}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <LabyrinthMap key={map.seedCode} map={map} />
      </div>

      {sourceImage && (
        <details className="group mt-5 rounded-xl border bg-card">
          <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium">
            <ImageIcon className="size-4 text-muted-foreground" />
            {t.floorDetail.originalImageSummary}
            <span className="ml-auto font-mono text-xs text-muted-foreground">{map.seedCode}</span>
          </summary>
          <div className="border-t p-4">
            <a href={sourceImage.src} target="_blank" rel="noreferrer noopener">
              <img
                src={thumbFor(sourceImage.src)}
                alt={t.floorDetail.originalImageAlt(floorLabel, map.seedCode)}
                loading="lazy"
                className="w-full rounded-lg border"
              />
            </a>
            <p className="mt-2 text-xs text-muted-foreground">
              {t.floorDetail.originalImageNote}
            </p>
          </div>
        </details>
      )}
    </section>
  )
}

/** 나무위키由来の推奨名声とボス体力倍率。 */
function AreaStatPanel({ stat }: { stat: AreaStat }) {
  const { t, x } = useI18n()

  return (
    <div className="rounded-xl border bg-card p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <TrendingUp className="size-4 text-muted-foreground" />
        {t.floorDetail.statTitle}
        {stat.estimated && (
          <Badge variant="outline" className="ml-auto text-[10px] font-normal">
            {t.floorDetail.statEstimated}
          </Badge>
        )}
      </h2>
      <dl className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs text-muted-foreground">{t.floorDetail.statFame}</dt>
          <dd className="mt-0.5 flex items-baseline gap-1.5">
            <span className="font-mono text-lg font-semibold tabular-nums">
              {stat.fame.toLocaleString()}
            </span>
            {stat.delta > 0 && (
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                +{stat.delta.toLocaleString()}
              </span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">{t.floorDetail.statHp}</dt>
          <dd className="mt-0.5 font-mono text-lg font-semibold tabular-nums">
            ×{stat.hpMultiplier.toLocaleString(undefined, { minimumFractionDigits: 3 })}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{x(HP_NOTE)}</p>
    </div>
  )
}

function FamePanel({ fame }: { fame: NonNullable<Floor['fame']> }) {
  const { t } = useI18n()

  return (
    <div className="rounded-xl border bg-card p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <TrendingUp className="size-4 text-muted-foreground" />
        {t.floorDetail.fameTitle}
      </h2>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-mono text-lg tabular-nums">{fame.from.toLocaleString()}</span>
        <ArrowRight className="size-4 text-muted-foreground" />
        <span className="font-mono text-lg font-semibold tabular-nums">
          {fame.to.toLocaleString()}
        </span>
        <Badge variant={fame.delta > 0 ? 'secondary' : 'outline'} className="ml-1 font-mono tabular-nums">
          {fame.delta > 0 ? `+${fame.delta.toLocaleString()}` : '±0'}
        </Badge>
      </div>
    </div>
  )
}

function RewardPanel({ rewards }: { rewards: NonNullable<Floor['rewards']> }) {
  const { t, x } = useI18n()

  return (
    <div className="rounded-xl border bg-card p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <Gift className="size-4 text-muted-foreground" />
        {t.floorDetail.rewardTitle}
      </h2>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {rewards.map((r) => (
          <li key={r.ja}>
            <Badge variant="secondary" className="font-normal">
              {x(r)}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ImageSection({
  title,
  description,
  images,
  floorLabel,
  columns,
}: {
  title: string
  description: string
  images: FloorImage[]
  floorLabel: string
  columns: string
}) {
  if (images.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className={`mt-4 grid gap-4 ${columns}`}>
        {images.map((image, i) => (
          <MapCard key={image.src} image={image} floorLabel={floorLabel} index={i} />
        ))}
      </div>
    </section>
  )
}
