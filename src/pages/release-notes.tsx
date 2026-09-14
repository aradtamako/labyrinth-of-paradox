import { Database, ExternalLink, FileText, Sparkles, Wrench } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Timeline } from '@/components/timeline'
import {
  RELEASE_NOTES,
  REPOSITORY_URL,
  formatDate,
  prUrl,
  type ReleaseKind,
} from '@/data/release-notes'
import { useI18n } from '@/lib/i18n'
import { canonical } from '@/lib/locale'
import { cn } from '@/lib/utils'
import type { TimelineTone } from '@/components/timeline'

/** 更新の種類ごとのマーカー。色はサイト全体の等級色と同じトークンに寄せている。 */
const KIND_TONE: Record<ReleaseKind, TimelineTone> = {
  data: 'primary',
  feature: 'success',
  fix: 'warning',
  internal: 'default',
}

const KIND_ICON: Record<ReleaseKind, typeof Database> = {
  data: Database,
  feature: Sparkles,
  fix: Wrench,
  internal: FileText,
}

const FILTERS = ['all', 'data', 'feature', 'fix', 'internal'] as const

type Filter = (typeof FILTERS)[number]

export function ReleaseNotesPage() {
  const { t, x, locale } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')

  // 該当する更新が入ったリリース自体を残す。リリース内の他の行も文脈として見せる。
  const notes =
    filter === 'all'
      ? RELEASE_NOTES
      : RELEASE_NOTES.filter((note) => note.entries.some((e) => e.kind === filter))

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.releaseNotes.title}</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">{t.releaseNotes.lead}</p>
        <a
          href={`${REPOSITORY_URL}/commits/main`}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <ExternalLink className="size-3.5" />
          {t.releaseNotes.repoLink}
        </a>
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">{t.releaseNotes.filterLabel}</span>
        {FILTERS.map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? 'secondary' : 'outline'}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(filter !== f && 'bg-transparent text-muted-foreground hover:text-foreground')}
          >
            {f === 'all' ? t.releaseNotes.filterAll : t.releaseNotes.kinds[f]}
          </Button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {t.releaseNotes.count(notes.length)}
        </span>
      </div>

      {notes.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed px-6 py-14 text-center text-sm text-muted-foreground">
          {t.releaseNotes.empty}
        </p>
      ) : (
        <Timeline
          size="sm"
          density="compact"
          aria-label={t.releaseNotes.timelineLabel}
          className="mt-8"
        >
          {notes.map((note) => {
            // マーカーは先頭の分類から。entries は 追加 → 機能 → 修正 → 開発 の順で書いている。
            const kind = note.entries[0]?.kind ?? 'internal'
            const Icon = KIND_ICON[kind]
            return (
              <Timeline.Item key={`${note.date}-${canonical(note.title)}`}>
                <Timeline.Marker tone={KIND_TONE[kind]} aria-hidden>
                  <Icon />
                </Timeline.Marker>
                <Timeline.Content className="flex flex-col gap-2.5">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <time
                      dateTime={note.date}
                      className="font-mono text-xs text-muted-foreground tabular-nums"
                    >
                      {formatDate(note.date, locale)}
                    </time>
                    <h2 className="text-[15px] font-semibold leading-snug tracking-tight">
                      {x(note.title)}
                    </h2>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {note.entries.map((entry) => (
                      <li key={entry.text.ja} className="flex gap-2 text-sm leading-relaxed">
                        <Badge variant="outline" className={cnBadge(entry.kind)}>
                          {t.releaseNotes.kinds[entry.kind]}
                        </Badge>
                        <span className="min-w-0">{x(entry.text)}</span>
                      </li>
                    ))}
                  </ul>

                  {note.prs && note.prs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {note.prs.map((pr) => (
                        <a
                          key={pr}
                          href={prUrl(pr)}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          <ExternalLink className="size-3" />
                          {t.releaseNotes.prLabel(pr)}
                        </a>
                      ))}
                    </div>
                  )}
                </Timeline.Content>
              </Timeline.Item>
            )
          })}
        </Timeline>
      )}

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t.releaseNotes.footnote}</p>
    </div>
  )
}

/** バッジもマーカーと同じ色系にして、本文の中で分類が対応取る。 */
function cnBadge(kind: ReleaseKind): string {
  const tone = KIND_TONE[kind]
  return cn(
    'shrink-0 font-normal',
    tone === 'primary' && 'border-primary/40 text-primary',
    tone === 'success' && 'border-rarity-legendary/45 text-rarity-legendary',
    tone === 'warning' && 'border-rarity-unique/45 text-rarity-unique',
    tone === 'default' && 'text-muted-foreground',
  )
}
