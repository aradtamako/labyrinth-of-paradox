import { ExternalLink, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  AREAS_WITH_NODES,
  NODE_DATA_SOURCE,
  NODE_TYPE_STATS,
  REWARDS,
  TIER_COLORS,
  TIER_LABELS,
  iconSrc,
  rewardCountLabel,
  searchRewards,
} from '@/data/node-types'
import type { RewardEntry } from '@/data/node-types'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function RewardsPage() {
  const { t, x } = useI18n()
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchRewards(query), [query])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.rewards.title}</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">{t.rewards.lead}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.rewards.coverage(t.common.areaList(AREAS_WITH_NODES))}
        </p>
      </header>

      <div className="relative mt-6 max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.rewards.searchPlaceholder}
          aria-label={t.rewards.searchLabel}
          className="pr-9 pl-9"
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

      <p className="mt-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{results.length}</span> {t.rewards.resultCount}
        {query && t.rewards.resultTotal(REWARDS.length)}
        <span className="ml-2 text-xs">{t.rewards.resultNote}</span>
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed px-6 py-14 text-center text-sm text-muted-foreground">
          {t.rewards.empty}
        </div>
      ) : (
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {results.map((entry) => (
            <RewardCard key={entry.id} entry={entry} />
          ))}
        </ul>
      )}

      <Separator className="mt-14" />

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">{t.rewards.nodeTypesTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.rewards.nodeTypesLead}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NODE_TYPE_STATS.map((stat) => (
            <li key={stat.type.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 -space-x-2">
                  {stat.icons.slice(0, 3).map((n) => (
                    <img key={n} src={iconSrc(n)} alt="" className="size-9 object-contain" />
                  ))}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm leading-tight font-semibold">{x(stat.type.name)}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.type.nameKr}</p>
                </div>
                <span className="ml-auto shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                  {stat.count}
                </span>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                {x(stat.type.description)}
              </p>
              {stat.tiers.length > 0 && (
                <ul className="mt-2.5 flex flex-wrap gap-1">
                  {stat.tiers.map((t) => (
                    <li key={t}>
                      <TierBadge tier={t} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        {t.rewards.sourceLead}
        <a
          href={NODE_DATA_SOURCE.url}
          target="_blank"
          rel="noreferrer noopener"
          className="ml-1 inline-flex items-center gap-1 text-primary hover:underline"
        >
          {NODE_DATA_SOURCE.label}
          <ExternalLink className="size-3" />
        </a>
      </p>
    </div>
  )
}

function RewardCard({ entry }: { entry: RewardEntry }) {
  const { t, x, locale } = useI18n()
  const { reward } = entry
  const countLabel = rewardCountLabel(reward, locale)

  return (
    <li className="flex gap-3 rounded-xl border bg-card p-4">
      {reward.image ? (
        <img src={reward.image} alt="" loading="lazy" className="size-11 shrink-0 object-contain" />
      ) : (
        <span aria-hidden className="size-11 shrink-0 rounded-md bg-muted" />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-1.5">
          <h3 className="font-semibold tracking-tight">{x(reward.name)}</h3>
          {countLabel && (
            <span className="font-mono text-sm text-muted-foreground tabular-nums">{countLabel}</span>
          )}
        </div>
        {reward.nameKr && <p className="mt-0.5 text-xs text-muted-foreground">{reward.nameKr}</p>}
        {reward.note && (
          <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
            {x(reward.note)}
          </p>
        )}

        <ul className="mt-2 flex flex-wrap gap-1">
          {reward.label && (
            <li>
              <Badge variant="secondary" className="font-normal">
                {x(reward.label)}
              </Badge>
            </li>
          )}
          {entry.tiers.map((t) => (
            <li key={t}>
              <TierBadge tier={t} />
            </li>
          ))}
        </ul>

        <p className="mt-2.5 text-xs text-muted-foreground">
          {entry.types.map((type) => x(type.name)).join(t.common.listSeparator)}
        </p>

        <ul className="mt-2 flex flex-wrap gap-1.5">
          {entry.byArea.map((b) => (
            <li key={b.area}>
              <a
                href={`#/floors/${b.area}`}
                className="inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] transition-colors hover:bg-secondary"
              >
                {t.common.area(b.area)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

function TierBadge({ tier, className }: { tier: string; className?: string }) {
  const { x } = useI18n()
  const color = TIER_COLORS[tier]
  const label = TIER_LABELS[tier]
  return (
    <Badge
      variant="outline"
      className={cn('font-normal', className)}
      style={color ? { color, borderColor: color } : undefined}
    >
      {label ? x(label) : tier}
    </Badge>
  )
}
