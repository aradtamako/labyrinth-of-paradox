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
import { cn } from '@/lib/utils'

export function FloorDetailPage({ floorKey }: { floorKey: string }) {
  const floor = FLOOR_BY_KEY.get(floorKey)

  if (!floor) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-xl font-semibold">その区域は見つからなかった</h1>
        <Button asChild variant="outline" className="mt-5">
          <a href="#/floors">
            <ArrowLeft className="size-4" />
            区域一覧に戻る
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
        href="#/floors"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        区域一覧
      </a>

      <header className="mt-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{floor.label}</h1>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {stat ? <AreaStatPanel stat={stat} /> : floor.fame && <FamePanel fame={floor.fame} />}
          {floor.rewards && floor.rewards.length > 0 && <RewardPanel rewards={floor.rewards} />}
        </div>
        {stat && floor.fame && floor.fame.to !== stat.fame && (
          <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/[0.07] px-3.5 py-2.5 text-xs leading-relaxed">
            出典によって推奨名声が食い違っている。DCインサイドの実測値は{' '}
            <span className="font-mono tabular-nums">{floor.fame.to.toLocaleString()}</span>、
            나무위키の値は <span className="font-mono tabular-nums">{stat.fame.toLocaleString()}</span>。
            {stat.estimated && ' 나무위키側は推移からの推定値。'}
          </p>
        )}
      </header>

      {(floor.notes?.length || maps.length > 0) && (
        <section className="mt-6 rounded-xl border border-primary/25 bg-primary/[0.06] p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Info className="size-4 text-primary" />
            攻略メモ
          </h2>
          <ul className="mt-3 space-y-2">
            {[...(floor.notes ?? []), ...(maps.length > 0 ? GATE_NOTES : [])].map((note) => (
              <li key={note} className="flex gap-2.5 text-sm leading-relaxed">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {maps.length > 0 ? (
        <SeedMapSection maps={maps} images={plainMaps} floorLabel={floor.label} />
      ) : (
        <ImageSection
          title="シードマップ"
          description="この区域はまだノードデータを取り込んでいないため、元記事の画像を掲載している。"
          images={plainMaps}
          floorLabel={floor.label}
          columns="lg:grid-cols-2"
        />
      )}

      {legends.length > 0 && (
        <ImageSection
          title="報酬アイコン対応表"
          description="元記事に付いていた、マスのアイコンと報酬の対応表。"
          images={legends}
          floorLabel={floor.label}
          columns="lg:grid-cols-2"
        />
      )}

      {figures.length > 0 && (
        <ImageSection
          title="シードの見分け方"
          description="配置が同じシードを区別するための手がかり。"
          images={figures}
          floorLabel={floor.label}
          columns="sm:grid-cols-2 lg:grid-cols-3"
        />
      )}

      <Separator className="mt-12" />

      <section className="mt-6 flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <a href={floor.sourceUrl} target="_blank" rel="noreferrer noopener">
            <ExternalLink className="size-3.5" />
            元記事（DCインサイド）
          </a>
        </Button>
        {maps.length > 0 && (
          <Button asChild variant="outline" size="sm">
            <a href={NODE_DATA_SOURCE.url} target="_blank" rel="noreferrer noopener">
              <ExternalLink className="size-3.5" />
              ノードデータ出典
            </a>
          </Button>
        )}
        <Button asChild variant="outline" size="sm">
          <a href={NAMU_SOURCE.url} target="_blank" rel="noreferrer noopener">
            <ExternalLink className="size-3.5" />
            나무위키（報酬・名声）
          </a>
        </Button>
        {floor.videoUrl && (
          <Button asChild variant="outline" size="sm">
            <a href={floor.videoUrl} target="_blank" rel="noreferrer noopener">
              <Play className="size-3.5" />
              攻略動画
            </a>
          </Button>
        )}
      </section>

      <nav className="mt-10 flex items-center justify-between gap-3 border-t pt-6">
        {prev ? (
          <Button asChild variant="ghost">
            <a href={`#/floors/${prev.key}`}>
              <ArrowLeft className="size-4" />
              {prev.label}
            </a>
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button asChild variant="ghost">
            <a href={`#/floors/${next.key}`}>
              {next.label}
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
  const [active, setActive] = useState(0)
  const map = maps[active]
  const sourceImage = images.find((i) => i.seed && seedDigits(i.seed) === map.seedCode)

  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold tracking-tight">シードマップ</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        ゲーム内で数えた部屋数と一致するシードを選ぶ。マスにカーソルを乗せると報酬が出る。
      </p>

      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="シードの選択">
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
            元のマップ画像を見る
            <span className="ml-auto font-mono text-xs text-muted-foreground">{map.seedCode}</span>
          </summary>
          <div className="border-t p-4">
            <a href={sourceImage.src} target="_blank" rel="noreferrer noopener">
              <img
                src={thumbFor(sourceImage.src)}
                alt={`${floorLabel} ${map.seedCode} の元画像`}
                loading="lazy"
                className="w-full rounded-lg border"
              />
            </a>
            <p className="mt-2 text-xs text-muted-foreground">
              クリックで原寸画像を開く。ノードデータの照合用。
            </p>
          </div>
        </details>
      )}
    </section>
  )
}

/** 나무위키由来の推奨名声とボス体力倍率。 */
function AreaStatPanel({ stat }: { stat: AreaStat }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <TrendingUp className="size-4 text-muted-foreground" />
        推奨名声・ボス体力
        {stat.estimated && (
          <Badge variant="outline" className="ml-auto text-[10px] font-normal">
            推定値
          </Badge>
        )}
      </h2>
      <dl className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs text-muted-foreground">推奨名声</dt>
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
          <dt className="text-xs text-muted-foreground">体力倍率</dt>
          <dd className="mt-0.5 font-mono text-lg font-semibold tabular-nums">
            ×{stat.hpMultiplier.toLocaleString(undefined, { minimumFractionDigits: 3 })}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{HP_NOTE}</p>
    </div>
  )
}

function FamePanel({ fame }: { fame: NonNullable<Floor['fame']> }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <TrendingUp className="size-4 text-muted-foreground" />
        名声上昇値
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

function RewardPanel({ rewards }: { rewards: string[] }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <Gift className="size-4 text-muted-foreground" />
        主要報酬
      </h2>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {rewards.map((r) => (
          <li key={r}>
            <Badge variant="secondary" className="font-normal">
              {r}
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
