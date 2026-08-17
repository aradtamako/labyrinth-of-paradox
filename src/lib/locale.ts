/**
 * 表示言語の基本型。React に依存しないので、データ層からも読み込める。
 * UI 文言の辞書は ui-strings.ts、React 側の受け渡しは i18n.tsx が担当する。
 */

export type Locale = 'ja' | 'en'

export const LOCALES: Locale[] = ['ja', 'en']

/** 日本語と英語を1組にした表示用テキスト。データ層の文言はすべてこの形で持つ。 */
export interface Localized {
  ja: string
  en: string
}

/** Localized を現在の言語の文字列に落とす。 */
export function tr(text: Localized, locale: Locale): string {
  return text[locale]
}

/**
 * データ層の内部キー（アイコン対応表・報酬インデックスの ID など）は
 * 言語を切り替えても変わらないよう、常に日本語表記を使う。
 */
export function canonical(text: Localized): string {
  return text.ja
}

/**
 * 連続する番号を [開始, 終了] の区間にまとめる。[1,2,3,5] → [[1,3],[5,5]]
 * 区域番号を「1〜31区域」と畳んで見せるために使う。
 */
export function numberRuns(numbers: number[]): [number, number][] {
  const runs: [number, number][] = []
  for (const n of [...numbers].sort((a, b) => a - b)) {
    const last = runs[runs.length - 1]
    if (last && n === last[1] + 1) last[1] = n
    else runs.push([n, n])
  }
  return runs
}
