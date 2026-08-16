/**
 * 나무위키「역설의 미궁/지도」とその区域別サブページを取得してテキスト化する。
 * 関門（ノード）種別ごとの報酬と、区域別の推奨名声・体力倍率が載っている。
 *
 *   node scripts/scrape-namu.mjs
 *
 * 出力: scripts/namu-cache/*.html と scripts/namu-*.txt
 * 나무위키の本文は CC BY-NC-SA 2.0 KR。利用時は出典表示とライセンス継承が要る。
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const SCRIPTS = import.meta.dirname
const CACHE = path.join(SCRIPTS, 'namu-cache')
fs.mkdirSync(CACHE, { recursive: true })

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)

const BASE = '역설의 미궁/지도'
const PAGES = [
  { key: 'index', title: BASE },
  { key: '1-5', title: `${BASE}/제 1~5구역` },
  { key: '6-10', title: `${BASE}/제 6~10구역` },
  { key: '11-15', title: `${BASE}/제 11~15구역` },
  { key: '16-20', title: `${BASE}/제 16~20구역` },
  { key: '21-25', title: `${BASE}/제 21~25구역` },
  { key: '26-30', title: `${BASE}/제 26~30구역` },
  { key: '31-35', title: `${BASE}/제 31~35구역` },
]

function fetchPage(key, title) {
  const file = path.join(CACHE, `${key}.html`)
  if (fs.existsSync(file) && fs.statSync(file).size > 30000) return fs.readFileSync(file, 'utf8')

  const url = `https://namu.wiki/w/${encodeURIComponent(title)}`
  execFileSync(
    'curl.exe',
    [
      '-s',
      '--max-time',
      '60',
      '-o',
      file,
      '-A',
      UA,
      '-H',
      'Accept-Language: ko-KR,ko;q=0.9',
      '-H',
      'Accept: text/html,application/xhtml+xml',
      '-L',
      url,
    ],
    { stdio: 'ignore' },
  )
  sleep(2000)
  return fs.readFileSync(file, 'utf8')
}

function toText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br[^>]*>/gi, '\n')
    .replace(/<\/(tr|div|p|h1|h2|h3|li)>/gi, '\n')
    .replace(/<\/t[dh]>/gi, ' | ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#91;/g, '[')
    .replace(/&#93;/g, ']')
    .replace(/[ \t]+/g, ' ')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && l !== '|')
    .join('\n')
}

for (const p of PAGES) {
  process.stdout.write(`${p.key} ... `)
  try {
    const html = fetchPage(p.key, p.title)
    const text = toText(html)
    fs.writeFileSync(path.join(SCRIPTS, `namu-${p.key}.txt`), text, 'utf8')
    const ok = /구역|관문/.test(text)
    console.log(`${text.length} chars ${ok ? '' : '(CONTENT MISSING?)'}`)
  } catch (e) {
    console.log(`ERR ${e.message}`)
  }
}
