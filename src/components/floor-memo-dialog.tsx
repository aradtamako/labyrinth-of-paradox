import { NotebookPen } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useI18n } from '@/lib/i18n'
import type { Localized } from '@/lib/locale'
import { cn } from '@/lib/utils'

/**
 * 区域カード上のメモボタンと、その編集ダイアログ。
 *
 * カード全体が `<a>` なので、ボタンはリンクの中に置けない。呼び出し側で
 * リンクと並べて `className` に絶対配置を渡す（非表示ボタンと同じ扱い）。
 */
export function FloorMemoDialog({
  label,
  memo,
  onSave,
  className,
}: {
  /** 区域名（ダイアログの見出しと aria-label に出す）。 */
  label: Localized
  /** 保存済みのメモ本文。無ければ空文字。 */
  memo: string
  /** 本文を保存する。空文字は削除。 */
  onSave: (text: string) => void
  className?: string
}) {
  const { t, x } = useI18n()
  const name = x(label)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(memo)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleOpenChange = (next: boolean) => {
    if (next) {
      // 開くたびに残存している保存値から始めればよく、下書きをまたぐ同期は不要。
      setDraft(memo)
      setOpen(true)
      return
    }
    // 閉じる動線がどれ（保存ボタン・Esc・背景クリック・×）でも保存とみなす。
    // Esc で書いたものが消える仕様だと、長いメモを書くときに気が気でなくなる。
    onSave(draft)
    setOpen(false)
  }

  const remove = () => {
    onSave('')
    setDraft('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon-sm"
          aria-label={t.floors.memoButton(name)}
          // 非表示ボタンと同じ見た目にして、メモの有無はカード内のバッジで示す
          // （サムネイルの上に色を増らすと読みづらくなる）。
          className={cn(
            'opacity-75 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100',
            className,
          )}
        >
          <NotebookPen className="size-3.5" />
        </Button>
      </DialogTrigger>

      <DialogContent
        // × ボタンではなく本文を最初に見たい（Radix は既定で最初のフォーカス対象を拾う）
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          inputRef.current?.focus()
        }}
      >
        <DialogHeader>
          <DialogTitle>{t.floors.memoDialogTitle(name)}</DialogTitle>
          <DialogDescription>{t.floors.memoDialogLead}</DialogDescription>
        </DialogHeader>

        <Textarea
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t.floors.memoPlaceholder}
          aria-label={t.floors.memoLabel(name)}
          className="min-h-32 resize-y text-sm"
        />

        <DialogFooter className="gap-2">
          {memo ? (
            <Button variant="ghost" size="sm" className="mr-auto" onClick={remove}>
              {t.floors.memoDelete}
            </Button>
          ) : (
            <span />
          )}
          <Button size="sm" onClick={() => handleOpenChange(false)}>
            {t.floors.memoSave}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
