import { Badge } from '@/components/ui/badge'
import { TIER_COLORS, TIER_LABELS } from '@/data/node-types'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/** 等級バッジ。ゲーム内と同じ等級色で縁取る。 */
export function TierBadge({ tier, className }: { tier: string; className?: string }) {
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
