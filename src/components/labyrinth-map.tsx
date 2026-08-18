import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { TIER_COLORS, iconSrc, rewardCountLabel } from '@/data/node-types'
import type { MapNode, Reward, SeedMap } from '@/data/node-types'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * 区域マップを画像ではなくノードのグリッドとして描く。
 * マスにポインタを乗せる（キーボードなら Tab で移動する）と、そのマスの種別と報酬が出る。
 */
export function LabyrinthMap({ map }: { map: SeedMap }) {
  const { t } = useI18n()
  const [selected, setSelected] = useState<MapNode | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selected])

  const at = new Map(map.nodes.map((n) => [`${n.row}:${n.col}`, n]))
  const has = (row: number, col: number) => at.has(`${row}:${col}`)

  /** 元データの edges は既定の接続に対して追加される縦のつながり。 */
  const extraEdges = new Set(
    map.edges.map((e) => `${e.from[0]}:${e.from[1]}->${e.to[0]}:${e.to[1]}`),
  )
  const hasExtraEdgeDown = (row: number, col: number) =>
    extraEdges.has(`${row}:${col}->${row + 1}:${col}`)

  /** 中央の関門列は縦につながっている。 */
  const gateCol = map.nodes.find((n) => n.type.id.startsWith('central_checkpoint'))?.col ?? 3

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1 overflow-x-auto rounded-xl border bg-card p-4 sm:p-6">
        <div
          className="grid min-w-[520px] gap-x-6 gap-y-6"
          style={{ gridTemplateColumns: `repeat(${map.cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: map.rows }).flatMap((_, row) =>
            Array.from({ length: map.cols }).map((__, col) => {
              const node = at.get(`${row}:${col}`)
              if (!node) return <div key={`${row}:${col}`} aria-hidden />

              const linkRight = has(row, col + 1)
              const linkDown =
                (col === gateCol && has(row + 1, col)) || hasExtraEdgeDown(row, col)
              const isExtra = hasExtraEdgeDown(row, col)

              return (
                <NodeCell
                  key={`${row}:${col}`}
                  node={node}
                  linkRight={linkRight}
                  linkDown={linkDown}
                  linkDownAccent={isExtra}
                  selected={selected === node}
                  onSelect={() => setSelected(node)}
                />
              )
            }),
          )}
        </div>
      </div>

      <aside className="w-full lg:w-72 lg:shrink-0">
        {selected ? (
          <NodeDetail node={selected} onClose={() => setSelected(null)} />
        ) : (
          <div className="rounded-xl border border-dashed px-4 py-6 text-sm leading-relaxed text-muted-foreground">
            {t.map.emptyPanel}
          </div>
        )}
      </aside>
    </div>
  )
}

function NodeCell({
  node,
  linkRight,
  linkDown,
  linkDownAccent,
  selected,
  onSelect,
}: {
  node: MapNode
  linkRight: boolean
  linkDown: boolean
  linkDownAccent: boolean
  selected: boolean
  /**
   * クリックとフォーカスの両方でこのマスを選ぶ。
   * クリック時は focus → click の順に発火するので、ここでトグルすると
   * focus で選んだ直後に click が解除してしまい、初回クリックで何も出なくなる。
   * そのため解除はパネル側の閉じるボタンと Esc に任せて、ここでは選択のみ行う。
   */
  onSelect: () => void
}) {
  const { t, x } = useI18n()
  const tierColor = node.tier ? TIER_COLORS[node.tier] : undefined
  const [hoverOpen, setHoverOpen] = useState(false)

  return (
    <div className="relative aspect-square">
      {linkRight && (
        <span
          aria-hidden
          className="absolute top-1/2 left-full h-0 w-6 border-t-2 border-dotted border-amber-400/50"
        />
      )}
      {linkDown && (
        <span
          aria-hidden
          className={cn(
            'absolute top-full left-1/2 h-6 w-0 border-l-2 border-dotted',
            linkDownAccent ? 'border-emerald-400/60' : 'border-amber-400/50',
          )}
        />
      )}

      <HoverCard
        open={hoverOpen}
        onOpenChange={setHoverOpen}
        openDelay={80}
        closeDelay={40}
      >
        <HoverCardTrigger asChild>
          <button
            type="button"
            onClick={onSelect}
            onFocus={onSelect}
            onBlur={() => setHoverOpen(false)}
            onPointerLeave={() => setHoverOpen(false)}
            aria-label={t.map.nodeLabel(x(node.type.name), node.tierLabel && x(node.tierLabel))}
            style={tierColor ? ({ '--tier': tierColor } as React.CSSProperties) : undefined}
            className={cn(
              'relative grid size-full place-items-center rounded-lg transition',
              'hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              selected && 'bg-accent ring-2 ring-primary',
            )}
          >
            <span className="relative grid size-full max-h-14 max-w-14 place-items-center">
              <img
                src={iconSrc(node.icon)}
                alt=""
                loading="lazy"
                className="size-full object-contain drop-shadow-sm"
              />
              <RewardOverlay rewards={node.rewards} />
            </span>
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          side="top"
          className="w-72 p-0"
          onPointerEnter={(event) => event.preventDefault()}
        >
          <NodeDetail node={node} compact />
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

/** 上限を超えた分は出さない。マス自体が小さいので3つ並べると横幅を使い切る。 */
const MAX_OVERLAY_REWARDS = 3

/**
 * マスのアイコンに報酬アイコンを重ねる。
 * 中央に置くとマスの絵が読めなくなるので、上端に寄せて絵の下半分を残す。
 */
function RewardOverlay({ rewards }: { rewards: Reward[] }) {
  const images = rewards.flatMap((r) => (r.image ? [{ key: r.name.ja, src: r.image }] : []))
  if (images.length === 0) return null

  return (
    // 行間は gap-y-6（24px）なので、16px 持ち上げても上のマスにはぶつからない。
    <span aria-hidden className="pointer-events-none absolute top-10 flex -space-x-2 drop-shadow-sm">
      {/* ring-border は薄すぎて背後のマス絵に埋もれるので、輪郭は muted-foreground で取る。 */}
      {images.slice(0, MAX_OVERLAY_REWARDS).map((image) => (
        <img
          key={image.key}
          src={image.src}
          alt=""
          loading="lazy"
          className="size-8 rounded-full bg-card object-contain ring-2 ring-muted-foreground/60"
        />
      ))}
    </span>
  )
}

function NodeDetail({
  node,
  compact,
  onClose,
}: {
  node: MapNode
  compact?: boolean
  onClose?: () => void
}) {
  const { t, x } = useI18n()
  const tierColor = node.tier ? TIER_COLORS[node.tier] : undefined

  return (
    <div className={cn('rounded-xl bg-card p-4', !compact && 'border')}>
      <div className="flex items-start gap-3">
        <img src={iconSrc(node.icon)} alt="" className="size-11 shrink-0 object-contain" />
        <div className="min-w-0 flex-1">
          <h3 className="leading-tight font-semibold">{x(node.type.name)}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{node.type.nameKr}</p>
          {node.tierLabel && (
            <Badge
              variant="outline"
              className="mt-1.5"
              style={tierColor ? { color: tierColor, borderColor: tierColor } : undefined}
            >
              {x(node.tierLabel)}
            </Badge>
          )}
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label={t.map.close}
            className="-mt-1 -mr-1 size-7 shrink-0"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {x(node.type.description)}
      </p>

      {(node.rewards.length > 0 || node.rewardText) && (
        <div className="mt-3 border-t pt-3">
          <div className="text-xs font-medium text-muted-foreground">{t.map.rewardsHeading}</div>
          {node.rewards.length > 0 && (
            <ul className="mt-2 space-y-2">
              {node.rewards.map((r) => (
                <RewardRow key={r.name.ja} reward={r} />
              ))}
            </ul>
          )}
          {node.rewardText && (
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {x(node.rewardText)}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function RewardRow({ reward }: { reward: Reward }) {
  const { x, locale } = useI18n()
  const countLabel = rewardCountLabel(reward, locale)

  return (
    <li className="flex items-start gap-2.5">
      {reward.image && (
        <img src={reward.image} alt="" loading="lazy" className="size-7 shrink-0 object-contain" />
      )}
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-1.5 text-sm">
          <span className="font-medium">{x(reward.name)}</span>
          {countLabel && (
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{countLabel}</span>
          )}
          {reward.label && (
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-normal">
              {x(reward.label)}
            </Badge>
          )}
        </span>
        {reward.note && (
          <span className="mt-0.5 block whitespace-pre-line text-[11px] leading-relaxed text-muted-foreground">
            {x(reward.note)}
          </span>
        )}
      </span>
    </li>
  )
}
