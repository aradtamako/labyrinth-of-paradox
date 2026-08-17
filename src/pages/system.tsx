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
import { useI18n } from '@/lib/i18n'
import type { Localized } from '@/lib/locale'

export function SystemPage() {
  const { t, x } = useI18n()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.system.title}</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">{t.system.lead}</p>
        <a
          href={OFFICIAL_SOURCE}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <ExternalLink className="size-3.5" />
          {t.system.officialLink}
        </a>
      </header>

      <section className="mt-10">
        <SectionTitle icon={<Ticket className="size-4" />} title={t.system.ticketsTitle} />
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {TICKETS.map((ticket) => (
            <Card key={ticket.name.ja}>
              <CardHeader>
                <CardTitle className="text-base">{x(ticket.name)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">{t.system.ticketUse}</div>
                  <p className="mt-0.5 leading-relaxed">{x(ticket.use)}</p>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{t.system.ticketAcquire}</div>
                  <p className="mt-0.5 leading-relaxed">{x(ticket.acquire)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle icon={<Swords className="size-4" />} title={t.system.subjugationTitle} />
        <p className="mt-1.5 text-sm text-muted-foreground">{x(SUBJUGATION_NOTE)}</p>

        <div className="mt-4 overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-56">{t.system.colTicket}</TableHead>
                <TableHead className="min-w-48">{t.system.colEffect}</TableHead>
                <TableHead className="min-w-52">{t.system.colAcquire}</TableHead>
                <TableHead className="min-w-32">{t.system.colFame}</TableHead>
                <TableHead className="min-w-56">{t.system.colConditions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SUBJUGATION_TICKETS.map((ticket) => (
                <TableRow key={ticket.name.ja}>
                  <TableCell className="font-medium whitespace-normal">
                    <div className="flex items-center gap-3">
                      <img
                        src={materialIcon(ticket.iconId)}
                        alt=""
                        className="size-10 shrink-0 object-contain"
                      />
                      <span>{x(ticket.name)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {x(ticket.effect)}
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {x(ticket.acquire)}
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    <span className="font-mono tabular-nums">{x(ticket.fame)}</span>
                    {ticket.source && (
                      <a
                        href={ticket.source.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        title={x(ticket.source.label)}
                        className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary hover:underline"
                      >
                        <ExternalLink className="size-3" />
                        {t.system.altSource}
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    <ul className="flex flex-wrap gap-1">
                      {ticket.conditions.map((c) => (
                        <li key={c.ja}>
                          <Badge variant="secondary" className="font-normal">
                            {x(c)}
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
        <SpecCard
          icon={<Users className="size-4" />}
          title={t.system.mercenaryTitle}
          items={MERCENARY_SPECS}
        />
        <SpecCard
          icon={<Send className="size-4" />}
          title={t.system.dispatchTitle}
          items={DISPATCH_SPECS}
        />
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
  items: Localized[]
}) {
  const { x } = useI18n()

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
            <li key={item.ja} className="flex gap-2.5 text-sm leading-relaxed">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60" />
              <span>{x(item)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
