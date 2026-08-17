import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { TierBadge } from '@/components/tier-badge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import { FLOORS, thumbFor } from '@/data/floors'
import type { Floor } from '@/data/floors'
import {
  AREAS_WITH_NODES,
  areaHighlights,
  rewardCountLabel,
  searchAreaRewards,
} from '@/data/node-types'
import type { AreaHighlight } from '@/data/node-types'
import { useI18n } from '@/lib/i18n'
import { canonical, localizedHash } from '@/lib/locale'

export function FloorListPage() {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const q = query.trim()
  // 報酬名で区域を絞り込む。一致した報酬はカード側でそのまま並べる。
  const hits = useMemo(
    () =>
      q
        ? FLOORS.map((floor) => ({ floor, rewards: searchAreaRewards(floor.areas, q) })).filter(
            (hit) => hit.rewards.length > 0,
          )
        : [],
    [q],
  )

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
          placeholder={t.floors.searchPlaceholder}
          aria-label={t.floors.searchLabel}
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

      {q ? (
        <RewardResults query={q} hits={hits} />
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

interface FloorHit {
  floor: Floor
  /** 検索語に一致した報酬。カードにはこれを並べる。 */
  rewards: AreaHighlight[]
}

function RewardResults({ query, hits }: { query: string; hits: FloorHit[] }) {
  const { t } = useI18n()

  if (hits.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed px-6 py-14 text-center">
        <p className="font-medium">{t.floors.noHitsTitle(query)}</p>
        <p className="mt-1.5 text-sm text-muted-foreground">{t.floors.noHitsBody}</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <p className="text-sm text-muted-foreground">{t.floors.hits(query, hits.length)}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hits.map((hit) => (
          <FloorCard key={hit.floor.key} floor={hit.floor} rewards={hit.rewards} />
        ))}
      </div>
    </div>
  )
}

/**
 * 報酬アイコン。ポインタを乗せるとアイテムの詳細を出す。
 * カード全体がリンクなので、中に新しいフォーカス対象は作らない
 * （アイコン1つずつ Tab で止まると区域の行き来がしにくくなる）。
 * 読み上げ用の情報は img の alt に入れてある。
 */
function RewardIcon({ highlight }: { highlight: AreaHighlight }) {
  const { t, x, locale } = useI18n()
  const { reward, types, tiers, areaCount } = highlight
  const countLabel = rewardCountLabel(reward, locale)
  const [open, setOpen] = useState(false)

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={80} closeDelay={40}>
      <HoverCardTrigger asChild>
        <span className="block" onPointerLeave={() => setOpen(false)}>
          {reward.image ? (
            <img
              src={reward.image}
              alt={[x(reward.name), countLabel].filter(Boolean).join(' ')}
              loading="lazy"
              className="size-8 object-contain transition-transform hover:scale-110"
            />
          ) : (
            <span aria-hidden className="block size-8 rounded bg-muted" />
          )}
        </span>
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        className="w-72"
        onPointerEnter={(event) => event.preventDefault()}
      >
        <div className="flex items-start gap-3">
          {reward.image && (
            <img src={reward.image} alt="" className="size-11 shrink-0 object-contain" />
          )}
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <h3 className="leading-tight font-semibold">{x(reward.name)}</h3>
              {countLabel && (
                <span className="font-mono text-sm text-muted-foreground tabular-nums">
                  {countLabel}
                </span>
              )}
            </div>
            {reward.nameKr && <p className="mt-0.5 text-xs text-muted-foreground">{reward.nameKr}</p>}
          </div>
        </div>

        {(reward.label || tiers.length > 0) && (
          <ul className="mt-2.5 flex flex-wrap gap-1">
            {reward.label && (
              <li>
                <Badge variant="secondary" className="font-normal">
                  {x(reward.label)}
                </Badge>
              </li>
            )}
            {tiers.map((tier) => (
              <li key={tier}>
                <TierBadge tier={tier} />
              </li>
            ))}
          </ul>
        )}

        {reward.note && (
          <p className="mt-2.5 whitespace-pre-line text-[11px] leading-relaxed text-muted-foreground">
            {x(reward.note)}
          </p>
        )}

        <div className="mt-2.5 space-y-0.5 border-t pt-2.5 text-[11px] text-muted-foreground">
          <p>{t.floors.rewardNodeTypes(types.map((type) => x(type.name)).join(t.common.listSeparator))}</p>
          <p>{t.floors.rewardAreaCount(areaCount, AREAS_WITH_NODES.length)}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

/** rewards を渡すと、その区域の目玉報酬の代わりに渡されたものを並べる（検索結果用）。 */
function FloorCard({ floor, rewards }: { floor: Floor; rewards?: AreaHighlight[] }) {
  const { t, x, locale } = useI18n()
  const thumb = floor.images.find((i) => !i.legend && !i.figure) ?? floor.images[0]
  const highlights = rewards ?? areaHighlights(floor.areas)

  return (
    <a
      href={localizedHash(locale, `#/floors/${floor.key}`)}
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
        </div>

        {floor.fame && (
          <p className="mt-1 font-mono text-xs text-muted-foreground tabular-nums">
            {t.floors.cardFame} {floor.fame.from.toLocaleString()} → {floor.fame.to.toLocaleString()}
          </p>
        )}

        {highlights.length > 0 ? (
          <div className="mt-2.5">
            <ul
              className="flex flex-wrap gap-1"
              aria-label={rewards ? t.floors.cardMatchedLabel : t.floors.cardRewardsLabel}
            >
              {highlights.map((h) => (
                <li key={canonical(h.reward.name)}>
                  <RewardIcon highlight={h} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          floor.rewards &&
          floor.rewards.length > 0 && (
            <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {floor.rewards.map(x).join(t.common.listSeparator)}
            </p>
          )
        )}
      </div>
    </a>
  )
}
