import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FLOORS, searchSeed, thumbFor } from '@/data/floors'
import type { Floor } from '@/data/floors'

export function FloorListPage() {
  const [query, setQuery] = useState('')
  const digits = query.replace(/\D/g, '')
  const hits = useMemo(() => searchSeed(digits), [digits])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">区域マップ</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          区域を選ぶと5種類のシードマップを表示する。マップ右端の列の部屋数を上から数えた数字を
          入力すれば、該当するシードを横断検索できる。
        </p>
      </header>

      <div className="relative mt-6 max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputMode="numeric"
          placeholder="シードコードで検索（例：23333）"
          aria-label="シードコードで検索"
          className="pr-9 pl-9 font-mono tracking-wider"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuery('')}
            aria-label="検索をクリア"
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
  if (hits.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed px-6 py-14 text-center">
        <p className="font-medium">
          「<span className="font-mono">{digits}</span>」に一致するシードは見つからなかった。
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">
          右端の列を上から数えた数字か確認してほしい。1〜3区域は 1 を含むコードもある。
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <p className="text-sm text-muted-foreground">
        <span className="font-mono font-semibold text-foreground">{digits}</span> で始まるシード{' '}
        <span className="font-semibold text-foreground">{hits.length}</span> 件
      </p>
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
                alt={`${hit.floor.label} ${hit.image.seed}`}
                loading="lazy"
                className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex items-center justify-between gap-2 border-t px-3.5 py-2.5">
              <span className="font-mono text-sm font-semibold tracking-wider">{hit.image.seed}</span>
              <Badge variant="secondary">{hit.floor.label}</Badge>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function FloorCard({ floor }: { floor: Floor }) {
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
          <h2 className="font-semibold tracking-tight">{floor.label}</h2>
          {floor.fame && floor.fame.delta > 0 && (
            <Badge variant="outline" className="ml-auto font-mono text-[11px] tabular-nums">
              +{floor.fame.delta.toLocaleString()}
            </Badge>
          )}
        </div>

        {floor.fame && (
          <p className="mt-1 font-mono text-xs text-muted-foreground tabular-nums">
            名声 {floor.fame.from.toLocaleString()} → {floor.fame.to.toLocaleString()}
          </p>
        )}

        {floor.rewards && floor.rewards.length > 0 && (
          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {floor.rewards.join('／')}
          </p>
        )}

        <div className="mt-auto pt-3 text-xs text-muted-foreground">
          マップ {floor.images.length} 枚
          {seeds > 0 && <span>・シード {seeds} 種</span>}
        </div>
      </div>
    </a>
  )
}
