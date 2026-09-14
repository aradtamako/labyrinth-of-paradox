import { Check, EyeOff, NotebookPen, Plus, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { FloorMemoDialog } from '@/components/floor-memo-dialog'
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
import { useFloorMemos } from '@/lib/floor-memos'
import type { FloorMemos } from '@/lib/floor-memos'
import { useHiddenFloors } from '@/lib/hidden-floors'
import type { HiddenFloors } from '@/lib/hidden-floors'
import { useI18n } from '@/lib/i18n'
import { canonical, localizedHash } from '@/lib/locale'
import { cn } from '@/lib/utils'

const FLOOR_KEYS = FLOORS.map((floor) => floor.key)

/** 検索欄の対象。報酬名か、自分で書いたメモか。 */
type Scope = 'rewards' | 'memos'

/** メモの有無で一覧を絞る条件。 */
type MemoFilter = 'all' | 'with' | 'without'

export function FloorListPage() {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<Scope>('rewards')
  const [memoFilter, setMemoFilter] = useState<MemoFilter>('all')
  const hidden = useHiddenFloors(FLOOR_KEYS)
  const memos = useFloorMemos(FLOOR_KEYS)
  // 非表示にした区域は一覧からも検索結果からも外す。
  const visible = FLOORS.filter((floor) => !hidden.has(floor.key))
  const q = query.trim()
  const keyword = q.toLowerCase()

  // メモの有無で絞った一覧。検索中は絞り込み効かない（下のピル自体を消す）。
  const listed = useMemo(
    () =>
      memoFilter === 'all'
        ? visible
        : visible.filter((floor) => !!memos.memos[floor.key] === (memoFilter === 'with')),
    [memoFilter, visible, memos.memos],
  )

  // 報酬名で区域を絞り込む。一致した報酬はカード側でそのまま並べる。
  const rewardHits = useMemo(
    () =>
      q && scope === 'rewards'
        ? visible
            .map((floor) => ({ floor, rewards: searchAreaRewards(floor.areas, q) }))
            .filter((hit) => hit.rewards.length > 0)
        : [],
    [q, scope, visible],
  )

  // メモ本文で区域を絞り込む。部分一致だけ見ればよく、形態素解析はしない。
  const memoHits = useMemo(
    () =>
      q && scope === 'memos'
        ? visible.filter((floor) => (memos.memos[floor.key] ?? '').toLowerCase().includes(keyword))
        : [],
    [q, scope, visible, keyword, memos.memos],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.floors.title}</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">{t.floors.lead}</p>
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              scope === 'memos' ? t.floors.memoSearchPlaceholder : t.floors.searchPlaceholder
            }
            aria-label={scope === 'memos' ? t.floors.memoSearchLabel : t.floors.searchLabel}
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

        <div role="group" aria-label={t.floors.searchScopeLabel} className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">{t.floors.searchScopeLabel}</span>
          <Pill active={scope === 'rewards'} onClick={() => setScope('rewards')}>
            {t.floors.scopeRewards}
          </Pill>
          <Pill active={scope === 'memos'} onClick={() => setScope('memos')}>
            {t.floors.scopeMemos}
          </Pill>
        </div>
      </div>

      {/* メモが1件もないうちは絞り込みが空振りなので、ピル自体を出さない。 */}
      {!q && memos.count > 0 && (
        <div
          role="group"
          aria-label={t.floors.memoFilterLabel}
          className="mt-3 flex flex-wrap items-center gap-1.5"
        >
          <span className="text-xs text-muted-foreground">{t.floors.memoFilterLabel}</span>
          <Pill active={memoFilter === 'all'} onClick={() => setMemoFilter('all')}>
            {t.floors.memoFilterAll}
          </Pill>
          <Pill active={memoFilter === 'with'} onClick={() => setMemoFilter('with')}>
            {t.floors.memoFilterWith}
          </Pill>
          <Pill active={memoFilter === 'without'} onClick={() => setMemoFilter('without')}>
            {t.floors.memoFilterWithout}
          </Pill>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {t.floors.memoFilterCount(memos.count)}
          </span>
        </div>
      )}

      {/* 一覧の上に置く。下端だと非表示にした区域を戻せることに気づかれない。 */}
      {hidden.keys.length > 0 && <HiddenFloorsPanel hidden={hidden} />}

      {q && scope === 'memos' ? (
        <MemoResults query={q} floors={memoHits} hidden={hidden} memos={memos} />
      ) : q ? (
        <RewardResults query={q} hits={rewardHits} hidden={hidden} memos={memos} />
      ) : listed.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listed.map((floor) => (
            <FloorCard
              key={floor.key}
              floor={floor}
              memos={memos}
              onHide={() => hidden.hide(floor.key)}
            />
          ))}
        </div>
      ) : hidden.keys.length === FLOORS.length ? (
        <EmptyState title={t.floors.allHiddenTitle} body={t.floors.allHiddenBody} />
      ) : (
        <EmptyState
          title={t.floors.memoFilterEmptyTitle}
          body={t.floors.memoFilterEmptyBody}
        />
      )}
    </div>
  )
}

/** 検索対象や絞り込み条件を選ぶピル。排他的な選択肢を並べる。 */
function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <Button
      size="sm"
      variant={active ? 'secondary' : 'outline'}
      aria-pressed={active}
      onClick={onClick}
      className={cn(!active && 'bg-transparent text-muted-foreground hover:text-foreground')}
    >
      {children}
    </Button>
  )
}

/** 検索結果が空・全区域非表示・絞り込みで0件で同じ形になるので、共通化しておく。 */
function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-8 rounded-xl border border-dashed px-6 py-14 text-center">
      <p className="font-medium">{title}</p>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </div>
  )
}

/**
 * 非表示にした区域を並べ、選んだものだけ表示に戻すパネル。
 * 数十件を非表示にしてもマップ一覧を押し下げないよう、普段は件数だけの1行に畳む。
 */
function HiddenFloorsPanel({ hidden }: { hidden: HiddenFloors }) {
  const { t, x } = useI18n()
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<string[]>([])
  // 表示に戻した区域は選択からも外れる。
  const selected = picked.filter((key) => hidden.has(key))
  const floors = FLOORS.filter((floor) => hidden.has(floor.key))

  const toggle = (floorKey: string) =>
    setPicked((prev) => {
      const current = prev.filter((key) => hidden.has(key))
      return current.includes(floorKey)
        ? current.filter((key) => key !== floorKey)
        : [...current, floorKey]
    })

  return (
    <section className="mt-6 rounded-xl border border-dashed px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="flex items-center gap-2 text-sm font-medium">
          <EyeOff aria-hidden className="size-4 text-muted-foreground" />
          {t.floors.hiddenTitle}
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {t.floors.hiddenCount(floors.length)}
          </span>
        </h2>

        <Button
          size="sm"
          variant="outline"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="ml-auto"
        >
          {open ? t.floors.hiddenClose : t.floors.hiddenOpen}
        </Button>
      </div>

      {open && (
        <div className="mt-3 border-t pt-3">
          <p className="text-sm text-muted-foreground">{t.floors.hiddenLead}</p>

          {/* 件数が増えてもこの枠の中でスクロールさせ、パネルの高さを抑える。 */}
          <ul className="mt-2.5 flex max-h-44 flex-wrap gap-2 overflow-y-auto pr-1 pb-1">
            {floors.map((floor) => {
              const on = selected.includes(floor.key)
              return (
                <li key={floor.key}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(floor.key)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                      on
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-accent hover:text-accent-foreground',
                    )}
                  >
                    {on ? (
                      <Check aria-hidden className="size-3.5" />
                    ) : (
                      <Plus aria-hidden className="size-3.5 text-muted-foreground" />
                    )}
                    {x(floor.label)}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              size="sm"
              disabled={selected.length === 0}
              onClick={() => {
                hidden.show(selected)
                setPicked([])
              }}
            >
              {t.floors.restoreSelected(selected.length)}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                hidden.showAll()
                setPicked([])
              }}
            >
              {t.floors.restoreAll}
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

interface FloorHit {
  floor: Floor
  /** 検索語に一致した報酬。カードにはこれを並べる。 */
  rewards: AreaHighlight[]
}

function RewardResults({
  query,
  hits,
  hidden,
  memos,
}: {
  query: string
  hits: FloorHit[]
  hidden: HiddenFloors
  memos: FloorMemos
}) {
  const { t } = useI18n()

  if (hits.length === 0) {
    return <EmptyState title={t.floors.noHitsTitle(query)} body={t.floors.noHitsBody} />
  }

  return (
    <div className="mt-8">
      <p className="text-sm text-muted-foreground">{t.floors.hits(query, hits.length)}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hits.map((hit) => (
          <FloorCard
            key={hit.floor.key}
            floor={hit.floor}
            rewards={hit.rewards}
            memos={memos}
            onHide={() => hidden.hide(hit.floor.key)}
          />
        ))}
      </div>
    </div>
  )
}

/** 検索対象を「メモ」に切り替えたときの結果。ヒットしたのはメモ本文だけで、報酬は畳む。 */
function MemoResults({
  query,
  floors,
  hidden,
  memos,
}: {
  query: string
  floors: Floor[]
  hidden: HiddenFloors
  memos: FloorMemos
}) {
  const { t } = useI18n()

  if (floors.length === 0) {
    return (
      <EmptyState title={t.floors.memoNoHitsTitle(query)} body={t.floors.memoNoHitsBody} />
    )
  }

  return (
    <div className="mt-8">
      <p className="text-sm text-muted-foreground">{t.floors.memoHits(query, floors.length)}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* カードにはメモの有無に関わらず目玉報酬も並べる。メモ本文自体は
            FloorCard が下に出しているので、一致語の強調はここでしない。 */}
        {floors.map((floor) => (
          <FloorCard
            key={floor.key}
            floor={floor}
            memos={memos}
            onHide={() => hidden.hide(floor.key)}
          />
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

/**
 * rewards を渡すと、その区域の目玉報酬の代わりに渡されたものを並べる（検索結果用）。
 *
 * 非表示ボタンもメモボタンもリンクの中に置けない（a の中の button は不正）ので、
 * カード全体を包む div の中でリンクと並べ、右上に重ねる。
 */
function FloorCard({
  floor,
  rewards,
  memos,
  onHide,
}: {
  floor: Floor
  rewards?: AreaHighlight[]
  memos: FloorMemos
  onHide: () => void
}) {
  const { t, x, locale } = useI18n()
  const thumb = floor.images.find((i) => !i.legend && !i.figure) ?? floor.images[0]
  const highlights = rewards ?? areaHighlights(floor.areas)
  const memo = memos.get(floor.key)

  return (
    <div className="group relative">
      <Button
        variant="secondary"
        size="icon-sm"
        onClick={onHide}
        aria-label={t.floors.hideCard(x(floor.label))}
        // タッチ端末でも押せるよう常に出しておき、普段は少し薄くしてサムネイルの邪魔をしない。
        className="absolute top-2 right-2 z-10 opacity-75 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        <EyeOff className="size-3.5" />
      </Button>

      <FloorMemoDialog
        label={floor.label}
        memo={memo}
        onSave={(text) => memos.set(floor.key, text)}
        className="absolute top-2 right-11 z-10"
      />

      <a
        href={localizedHash(locale, `#/floors/${floor.key}`)}
        className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
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
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold tracking-tight">{x(floor.label)}</h2>
            {memo && (
              // フォーカス対象を増やさないよう span のまま（Badge は div 由来）。
              <Badge variant="secondary" className="gap-1 font-normal">
                <NotebookPen aria-hidden className="size-3" />
                {t.floors.memoBadge}
              </Badge>
            )}
          </div>

          {memo && (
            // 省略すると「自分が何を書いたか」が読めない。メモは自分で入れたものなので
            // 長さを気にせず全文出し、本文が報酬欄と混ざらないよう箱にする。
            <p className="mt-2 rounded-md bg-muted/60 px-2.5 py-1.5 text-xs leading-relaxed whitespace-pre-line">
              {memo}
            </p>
          )}

          {floor.fame && (
            <p className={cn('font-mono text-xs text-muted-foreground tabular-nums', memo ? 'mt-2' : 'mt-1')}>
              {t.floors.cardFame} {floor.fame.from.toLocaleString()} →{' '}
              {floor.fame.to.toLocaleString()}
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
    </div>
  )
}
