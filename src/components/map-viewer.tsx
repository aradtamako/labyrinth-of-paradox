import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { seedLabel, thumbFor } from '@/data/floors'
import type { FloorImage } from '@/data/floors'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface MapCardProps {
  image: FloorImage
  floorLabel: string
  index: number
}

/**
 * マップ1枚分のカード。マップは細部（アイコンの種類・青い点線）を見ないと
 * シード判別ができないので、クリックで等倍拡大できるようにしている。
 */
export function MapCard({ image, floorLabel, index }: MapCardProps) {
  const { t, x, locale } = useI18n()
  const [open, setOpen] = useState(false)

  const seed = seedLabel(image, locale)
  const caption = seed || t.viewer.mapIndex(index + 1)

  return (
    <>
      <figure className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block cursor-zoom-in overflow-hidden bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label={t.viewer.expand(`${floorLabel} ${caption}`)}
        >
          <img
            src={thumbFor(image.src)}
            alt={`${floorLabel} ${caption}`}
            loading="lazy"
            decoding="async"
            className="w-full transition-transform duration-300 group-hover:scale-[1.015]"
          />
          <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-md bg-background/75 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <Maximize2 className="size-3.5" />
          </span>
        </button>

        {(seed || image.caption) && (
          <figcaption className="flex flex-col gap-1.5 border-t px-3 py-2.5">
            {seed && (
              <span className="font-mono text-sm font-semibold tracking-wider tabular-nums">
                {seed}
              </span>
            )}
            {image.caption && (
              <span className="text-xs leading-relaxed text-muted-foreground">
                {x(image.caption)}
              </span>
            )}
          </figcaption>
        )}
      </figure>

      <MapLightbox
        open={open}
        onOpenChange={setOpen}
        image={image}
        title={`${floorLabel} · ${caption}`}
      />
    </>
  )
}

function MapLightbox({
  open,
  onOpenChange,
  image,
  title,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  image: FloorImage
  title: string
}) {
  const { t } = useI18n()
  const [zoom, setZoom] = useState(1)

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) setZoom(1)
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[92vh] w-[min(96vw,1400px)] max-w-none gap-0 overflow-hidden p-0 sm:max-w-none"
      >
        <div className="flex items-center gap-2 border-b px-4 py-2.5">
          <DialogTitle className="truncate text-sm font-medium">{title}</DialogTitle>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
              aria-label={t.viewer.zoomOut}
            >
              <ZoomOut className="size-4" />
            </Button>
            <Badge variant="secondary" className="w-14 justify-center font-mono tabular-nums">
              {Math.round(zoom * 100)}%
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)))}
              aria-label={t.viewer.zoomIn}
            >
              <ZoomIn className="size-4" />
            </Button>
          </div>
        </div>

        <div className="max-h-[calc(92vh-3.25rem)] overflow-auto bg-muted/30 p-4">
          <img
            src={image.src}
            alt={title}
            style={{ width: `${zoom * 100}%` }}
            className={cn('mx-auto block max-w-none', zoom === 1 && 'w-full')}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
