import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { localeFromHash, tr } from '@/lib/locale'
import type { Locale, Localized } from '@/lib/locale'
import { UI_TEXT } from '@/lib/ui-strings'
import type { UiText } from '@/lib/ui-strings'
import { normalizeHash } from '@/lib/router'

/**
 * 表示言語の保持と切り替え。テーマ（theme.ts）と同じく localStorage に覚えさせる。
 * 保存が無ければブラウザの言語設定を見て、日本語環境なら日本語、それ以外は英語にする。
 */

const KEY = 'lop-locale'

function initial(): Locale {
  const fromHash = localeFromHash(window.location.hash)
  if (fromHash) return fromHash

  const saved = localStorage.getItem(KEY)
  if (saved === 'ja' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en'
}

interface I18n {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** 日本語 ⇄ 英語を入れ替える。 */
  toggle: () => void
  /** UI 文言の辞書（現在の言語）。 */
  t: UiText
  /** データ層の Localized を現在の言語の文字列にする。 */
  x: (text: Localized) => string
}

const I18nContext = createContext<I18n | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initial)

  useEffect(() => {
    localStorage.setItem(KEY, locale)
    normalizeHash(locale)

    // index.html は日本語で書いてあるので、言語に合わせて上書きする。
    document.documentElement.lang = locale
    document.title = UI_TEXT[locale].meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', UI_TEXT[locale].meta.description)
  }, [locale])

  const value = useMemo<I18n>(
    () => ({
      locale,
      setLocale,
      toggle: () => setLocale((l) => (l === 'ja' ? 'en' : 'ja')),
      t: UI_TEXT[locale],
      x: (text: Localized) => tr(text, locale),
    }),
    [locale],
  )

  return <I18nContext value={value}>{children}</I18nContext>
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n は I18nProvider の内側でしか使えない')
  return ctx
}
