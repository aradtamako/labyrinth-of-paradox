import { Children, createContext, Fragment, isValidElement, useContext } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'

/**
 * 年表（タイムライン）。HeroUI の Timeline を参考にした自前のコンポーネント。
 * shadcn/ui に相当する部品が無いので components/ui ではなくここに置いている。
 *
 * 構成は `Timeline` > `Timeline.Item` > `Timeline.Marker` + `Timeline.Content`。
 * Item が Marker / Content を拾って左右2列のグリッドに組み直すので、接続線は
 * 常にマーカーの真下を通る。Marker を省略すると点マーカーになる。
 *
 * 基準線は左に1本だけ（HeroUI でいう axis="start"、placement="start"）。
 * 更新履歴のように本文を読む前提なら、交互配置より1列のほうが読みやすい。
 */

type TimelineSize = 'sm' | 'md'
type TimelineDensity = 'compact' | 'normal'
type TimelineAlign = 'start' | 'center'

/** マーカーの色。サイトの等级色と同じトークンに寄せてある。 */
export type TimelineTone = 'default' | 'primary' | 'success' | 'warning' | 'danger'

const TimelineContext = createContext<{ size: TimelineSize; density: TimelineDensity }>({
  size: 'md',
  density: 'normal',
})

const markerVariants = cva('relative grid shrink-0 place-items-center rounded-full border leading-none', {
  variants: {
    tone: {
      default: 'border-border bg-secondary text-secondary-foreground',
      primary: 'border-primary/40 bg-primary/12 text-primary',
      success: 'border-rarity-legendary/45 bg-rarity-legendary/12 text-rarity-legendary',
      warning: 'border-rarity-unique/45 bg-rarity-unique/12 text-rarity-unique',
      danger: 'border-destructive/40 bg-destructive/12 text-destructive',
    },
    size: {
      sm: 'size-6',
      md: 'size-7',
    },
  },
  defaultVariants: { tone: 'default', size: 'md' },
})

interface TimelineItemProps extends ComponentPropsWithoutRef<'li'> {
  /** マーカーを先頭行に揃えるか、内容に対して上下中央に置くか。 */
  align?: TimelineAlign
  /** Timeline 側が詰める連番（0始まり）。 */
  index?: number
  /** Timeline 側が詰めるアイテム総数。無いと最終項目を判定できない。 */
  total?: number
}

function TimelineRoot({
  size = 'md',
  density = 'normal',
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'ol'> & { size?: TimelineSize; density?: TimelineDensity }) {
  const kids = Children.toArray(children)
  // Item だけを数えて連番と総数を渡す。間に注釈などが入っても末尾判定が崩れないようにするため、
  // 各要素より前に Item がいくつあるかを先に揃えておく。
  const isItem = (node: ReactNode): node is ReactElement<TimelineItemProps> =>
    isValidElement<TimelineItemProps>(node) && node.type === TimelineItemInner
  const total = kids.filter(isItem).length
  const preceding = kids.map((_, i) => kids.slice(0, i).filter(isItem).length)

  return (
    <TimelineContext.Provider value={{ size, density }}>
      <ol
        data-slot="timeline"
        data-size={size}
        data-density={density}
        className={cn('flex flex-col', className)}
        {...props}
      >
        {kids.map((child, i) =>
          isItem(child) ? (
            <TimelineItemInner
              key={child.key ?? i}
              {...child.props}
              index={preceding[i]}
              total={total}
            />
          ) : (
            child
          ),
        )}
      </ol>
    </TimelineContext.Provider>
  )
}

function TimelineItemInner({
  align = 'start',
  index = 0,
  total,
  className,
  children,
  ...props
}: TimelineItemProps) {
  const { size, density } = useContext(TimelineContext)
  const isLast = total === undefined ? false : index >= total - 1
  // Marker / Content を拾って左右2列に組み直す。素の children は本文として Content 側に入れる。
  const kids = Children.toArray(children)
  const isMarker = (node: ReactNode): node is ReactElement =>
    isValidElement(node) && node.type === TimelineMarker
  const isContent = (node: ReactNode): node is ReactElement =>
    isValidElement(node) && node.type === TimelineContent
  const marker = kids.find(isMarker) ?? <TimelineMarker />
  const body = kids.filter((node) => !isMarker(node))

  const gap = density === 'compact' ? 'gap-x-3' : 'gap-x-4'
  const tail = density === 'compact' ? 'pb-5' : 'pb-8'
  const connector = 'min-h-3 w-px flex-1 rounded-full bg-border'

  return (
    <li
      data-slot="timeline-item"
      data-align={align}
      data-last={isLast || undefined}
      className={cn('grid grid-cols-[auto_minmax(0,1fr)]', gap, className)}
      {...props}
    >
      {/* レール：マーカーと、次のマーカーまで伸びる接続線。
          align="center" は内容を挟んで上下に線を伸ばし、マーカーを中央に寄せる。 */}
      <div
        className={cn(
          'flex flex-col items-center self-stretch',
          align === 'center' && 'justify-center',
        )}
      >
        {align === 'center' && index > 0 && (
          <span aria-hidden className={cn(connector, 'mb-1 min-h-0')} />
        )}
        {marker}
        {!isLast && <span aria-hidden className={cn(connector, size === 'sm' ? 'mt-1' : 'mt-1.5')} />}
      </div>
      <div
        className={cn(
          'min-w-0',
          isLast ? 'pb-0' : tail,
          align === 'start' ? 'pt-0.5' : 'py-1',
        )}
      >
        {body.map((node, i) =>
          isContent(node) ? node : <Fragment key={i}>{node}</Fragment>,
        )}
      </div>
    </li>
  )
}

function TimelineMarker({
  tone = 'default',
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'span'> & { tone?: TimelineTone }) {
  const { size } = useContext(TimelineContext)

  return (
    <span
      data-slot="timeline-marker"
      data-tone={tone}
      className={cn(
        markerVariants({ tone, size }),
        '[&>svg]:pointer-events-none [&>svg]:shrink-0',
        size === 'sm' ? '[&_svg]:size-3.5' : '[&_svg]:size-4',
        className,
      )}
      {...props}
    >
      {children ?? <span aria-hidden className="size-1.5 rounded-full bg-current opacity-70" />}
    </span>
  )
}

function TimelineContent({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="timeline-content" className={cn('min-w-0', className)} {...props} />
}

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItemInner,
  Marker: TimelineMarker,
  Content: TimelineContent,
})

export type { TimelineItemProps }
