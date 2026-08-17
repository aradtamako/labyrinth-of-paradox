import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FLOORS, searchSeed, seedLabel, thumbFor } from '@/data/floors'
import type { Floor } from '@/data/floors'
import { useI18n } from '@/lib/i18n'

export function FloorListPage() {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const digits = query.replace(/\D/g, '')
  const hits = useMemo(() => searchSeed(digits), [digits])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.floors.title}</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">{t.floors.lead}</p>
      </header>

      <div className="relative mt-6 max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputMode="numeric"
          placeholder={t.floors.searchPlaceholder}
          aria-label={t.floors.searchLabel}
          className="pr-9 pl-9 font-mono tracking-wider"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuery('')}
            aria-label={t.common.clearSearch}
            className="absolute top-1/2 right-1 size-7 -translate-y-1/2"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      {digits ? (
        <SeedResults digits={digits} hits={hits} />
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLOORS.map((floor) => (
            <FloorCard key={floor.key} floor={floor} />
          ))}
        </div>
      )}
    </div>
  )
}

function SeedResults({ digits, hits }: { digits: string; hits: ReturnType<typeof searchSeed> }) {
  const { t, x, locale } = useI18n()

  if (hits.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed px-6 py-14 text-center">
        <p className="font-medium">{t.floors.noHitsTitle(digits)}</p>
        <p className="mt-1.5 text-sm text-muted-foreground">{t.floors.noHitsBody}</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <p className="text-sm text-muted-foreground">{t.floors.hits(digits, hits.length)}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hits.map((hit) => (
          <a
            key={`${hit.floor.key}-${hit.image.src}`}
            href={`#/floors/${hit.floor.key}`}
            className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="overflow-hidden bg-muted/40">
              <img
                src={thumbFor(hit.image.src)}
                alt={`${x(hit.floor.label)} ${seedLabel(hit.image, locale)}`}
                loading="lazy"
                className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex items-center justify-between gap-2 border-t px-3.5 py-2.5">
              <span className="font-mono text-sm font-semibold tracking-wider">
                {seedLabel(hit.image, locale)}
              </span>
              <Badge variant="secondary">{x(hit.floor.label)}</Badge>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function FloorCard({ floor }: { floor: Floor }) {
  const { t, x } = useI18n()
  const thumb = floor.images.find((i) => !i.legend && !i.figure) ?? floor.images[0]
  const seeds = floor.images.filter((i) => i.seed).length

  return (
    <a
      href={`#/floors/${floor.key}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      {thumb && (
        <div className="aspect-[16/9] overflow-hidden bg-muted/40">
          <img
            src={thumbFor(thumb.src)}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold tracking-tight">{x(floor.label)}</h2>
          {floor.fame && floor.fame.delta > 0 && (
            <Badge variant="outline" className="ml-auto font-mono text-[11px] tabular-nums">
              +{floor.fame.delta.toLocaleString()}
            </Badge>
          )}
        </div>

        {floor.fame && (
          <p className="mt-1 font-mono text-xs text-muted-foreground tabular-nums">
            {t.floors.cardFame} {floor.fame.from.toLocaleString()} → {floor.fame.to.toLocaleString()}
          </p>
        )}

        {floor.rewards && floor.rewards.length > 0 && (
          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {floor.rewards.map(x).join(t.common.listSeparator)}
          </p>
        )}

        <div className="mt-auto pt-3 text-xs text-muted-foreground">
          {t.floors.cardMapCount(floor.images.length)}
          {seeds > 0 && <span>{t.floors.cardSeedCount(seeds)}</span>}
        </div>
      </div>
    </a>
  )
}
