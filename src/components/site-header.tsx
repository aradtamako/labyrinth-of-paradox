import { Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import type { Route } from '@/lib/router'
import { useTheme } from '@/lib/theme'

const NAV = [
  { href: '#/', label: '概要', match: 'overview' },
  { href: '#/floors', label: '区域マップ', match: 'floors' },
  { href: '#/rewards', label: '報酬一覧', match: 'rewards' },
  { href: '#/system', label: 'システム', match: 'system' },
] as const

export function SiteHeader({ route }: { route: Route }) {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  const isActive = (match: string) =>
    match === 'floors' ? route.name === 'floors' || route.name === 'floor' : route.name === match

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <a href="#/" className="group flex min-w-0 items-center gap-2.5">
          <LabyrinthMark />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-[15px] font-semibold tracking-tight">逆説の迷宮</span>
            <span className="truncate text-[11px] text-muted-foreground">攻略データベース</span>
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
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'ライトテーマに切り替え' : 'ダークテーマに切り替え'}
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden" aria-label="メニューを開く">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>メニュー</SheetTitle>
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
                    {item.label}
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
