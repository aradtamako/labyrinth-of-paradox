import { Languages, Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import type { UiText } from '@/lib/ui-strings'
import type { Route } from '@/lib/router'
import { useTheme } from '@/lib/theme'

const NAV = [
  { href: '#/', label: (t: UiText) => t.nav.overview, match: 'overview' },
  { href: '#/floors', label: (t: UiText) => t.nav.floors, match: 'floors' },
  { href: '#/rewards', label: (t: UiText) => t.nav.rewards, match: 'rewards' },
  { href: '#/system', label: (t: UiText) => t.nav.system, match: 'system' },
] as const

export function SiteHeader({ route }: { route: Route }) {
  const { theme, toggle } = useTheme()
  const { t, toggle: toggleLocale } = useI18n()
  const [open, setOpen] = useState(false)

  const isActive = (match: string) =>
    match === 'floors' ? route.name === 'floors' || route.name === 'floor' : route.name === match

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <a href="#/" className="group flex min-w-0 items-center gap-2.5">
          <LabyrinthMark />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-[15px] font-semibold tracking-tight">{t.brand.title}</span>
            <span className="truncate text-[11px] text-muted-foreground">{t.brand.subtitle}</span>
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-1 sm:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                isActive(item.match)
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
              )}
            >
              {item.label(t)}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLocale}
            aria-label={t.nav.switchLanguage}
            className="px-2 text-xs font-medium"
          >
            <Languages className="size-4" />
            {t.nav.otherLanguage}
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/aradtamako/labyrinth-of-paradox"
              target="_blank"
              rel="noreferrer"
              aria-label={t.nav.github}
            >
              <GithubMark className="size-4" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark}
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden" aria-label={t.nav.openMenu}>
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>{t.nav.menu}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive(item.match)
                        ? 'bg-secondary text-secondary-foreground'
                        : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
                    )}
                  >
                    {item.label(t)}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

/** GitHub のロゴマーク（lucide-react にブランドアイコンが無いため自前で用意）。 */
function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.16.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.26 5.69.42.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.67.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

/** 迷宮を思わせる小さな渦巻きマーク。 */
function LabyrinthMark() {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/12 ring-1 ring-primary/25">
      <svg viewBox="0 0 24 24" className="size-5 text-primary" aria-hidden="true">
        <path
          d="M12 21a9 9 0 1 1 9-9v0a3 3 0 0 1-3 3h-1.5a1.5 1.5 0 0 1-1.5-1.5V12a3 3 0 1 0-3 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
