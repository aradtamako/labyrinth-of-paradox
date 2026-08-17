import { ExternalLink, Send, Swords, Ticket, Users } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DISPATCH_SPECS,
  MERCENARY_SPECS,
  OFFICIAL_SOURCE,
  SUBJUGATION_NOTE,
  SUBJUGATION_TICKETS,
  TICKETS,
} from '@/data/official'
import { materialIcon } from '@/data/item-icons'

export function SystemPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">システム</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          逆説の迷宮を支える各種チケット、傭兵団、討伐、バッファー派遣の仕様。
          すべて公式アップデートページの記載に基づく。
        </p>
        <a
          href={OFFICIAL_SOURCE}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <ExternalLink className="size-3.5" />
          公式アップデートページ
        </a>
      </header>

      <section className="mt-10">
        <SectionTitle icon={<Ticket className="size-4" />} title="チケット" />
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {TICKETS.map((t) => (
            <Card key={t.name}>
              <CardHeader>
                <CardTitle className="text-base">{t.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">用途</div>
                  <p className="mt-0.5 leading-relaxed">{t.use}</p>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">入手方法</div>
                  <p className="mt-0.5 leading-relaxed">{t.acquire}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle icon={<Swords className="size-4" />} title="討伐券" />
        <p className="mt-1.5 text-sm text-muted-foreground">{SUBJUGATION_NOTE}</p>

        <div className="mt-4 overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-56">討伐券</TableHead>
                <TableHead className="min-w-48">効果</TableHead>
                <TableHead className="min-w-52">入手方法</TableHead>
                <TableHead className="min-w-32">必要名声</TableHead>
                <TableHead className="min-w-56">使用条件</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SUBJUGATION_TICKETS.map((t) => (
                <TableRow key={t.name}>
                  <TableCell className="font-medium whitespace-normal">
                    <div className="flex items-center gap-3">
                      <img
                        src={materialIcon(t.iconId)}
                        alt=""
                        className="size-10 shrink-0 object-contain"
                      />
                      <span>{t.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">{t.effect}</TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">{t.acquire}</TableCell>
                  <TableCell className="whitespace-normal">
                    <span className="font-mono tabular-nums">{t.fame}</span>
                    {t.source && (
                      <a
                        href={t.source.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        title={t.source.label}
                        className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary hover:underline"
                      >
                        <ExternalLink className="size-3" />
                        別ソース
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    <ul className="flex flex-wrap gap-1">
                      {t.conditions.map((c) => (
                        <li key={c}>
                          <Badge variant="secondary" className="font-normal">
                            {c}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-2">
        <SpecCard icon={<Users className="size-4" />} title="傭兵団" items={MERCENARY_SPECS} />
        <SpecCard icon={<Send className="size-4" />} title="バッファー派遣" items={DISPATCH_SPECS} />
      </section>
    </div>
  )
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
      <span className="grid size-7 place-items-center rounded-md bg-secondary text-secondary-foreground">
        {icon}
      </span>
      {title}
    </h2>
  )
}

function SpecCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode
  title: string
  items: string[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="grid size-7 place-items-center rounded-md bg-secondary text-secondary-foreground">
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
