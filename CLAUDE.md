# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

ダンジョン&ファイター（アラド戦記）の特殊ダンジョン「逆説の迷宮」の非公式攻略サイト。
Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui の SPA を Cloudflare Workers に静的配信する。

**UI テキスト・コード内コメントは日本語で書く。** データ由来の韓国語原文は訳を付けず残す設計になっている箇所があるので、既存の書き分けに従う。

## コマンド

```sh
npm run dev      # Vite 開発サーバー（:5173）
npm run build    # tsc -b + vite build
npm run lint     # oxlint（ESLint ではない）
npm run preview  # build + wrangler dev（Workers 上での確認）
npm run deploy   # build + wrangler deploy
npm run thumbs   # public/maps/thumbs/*.webp を再生成（sharp）
```

テストは存在しない。型チェックは `npm run build`（`tsc -b`）が兼ねる。
開発サーバーは Browser pane から `preview_start {name: "labyrinth-of-paradox"}` で起動できる（`.claude/launch.json` 済み）。

## アーキテクチャ

### ルーティング

React Router は使わない。`src/lib/router.ts` の自前ハッシュルーター（`#/`, `#/floors`, `#/floors/:key`, `#/rewards`, `#/system`）を `App.tsx` が直接分岐する。ページを足すときは `Route` 型・`parse()`・`hrefFor()`・`App.tsx` の4箇所を揃える。

### データ層が本体

`src/data/` が実質このリポジトリの中身で、UI は薄い。**生成ファイルと手書きファイルが混在しているので編集前に必ず区別すること。**

| ファイル | 種別 | 内容 |
| --- | --- | --- |
| `labyrinth-nodes.ts` (34k行) | **自動生成** | マスごとのノード配置・報酬。韓国語のまま。`scripts/gen-nodes.mjs` が出力。直接編集しない |
| `floor-images.ts` | **自動生成** | マップ画像パス一覧。`scripts/gen-image-index.mjs` が出力 |
| `node-types.ts` | 手書き | 訳と変換ロジック（後述）。実質のデータ層エントリポイント |
| `namu.ts` | 手書き | 나무위키由来の区域別報酬。CC BY-NC-SA 2.0 KR |
| `floors.ts` | 手書き | 区域ごとの攻略メタ・シードコード。`searchSeed()` もここ |
| `official.ts` | 手書き | 公式ページ由来の仕様 |
| `item-icons.ts` | 手書き | 報酬名 → ゲーム内アイコンパスの対応 |

`node-types.ts` が生の `labyrinth-nodes.ts` を読み、`namu.ts` の訳・区域別上書き・`item-icons.ts` のアイコンを重ねて、UI が使う `SEED_MAPS` / `REWARDS` / `NODE_TYPE_STATS` をモジュール初期化時に組み立てる。**UI コンポーネントは `labyrinth-nodes.ts` を直接 import しない。**

報酬解決の優先順位（`resolveRewards()`）は固定で、上から順に:
1. 等級で決まるもの（迷宮開拓拠点＝調査券/入場券、歪んだ光輝の巡礼＝終末の啓示 100〜150）
2. `namu.ts` の `AREA_REWARDS`（キー `区域:種別ID` または `区域:種別ID:等級`）
3. 元データのマス単位報酬（`REWARD_JA` で訳す）
4. 等級テンプレート（`equipment_set_box_{tier}` など）

訳が無い項目は韓国語原文にフォールバックする。新しいノード種別・報酬が出てきたら `node-types.ts` の `TYPE_JA` / `REWARD_JA` に足すだけでよく、生成ファイル側は触らない。

`REWARDS` は全シードマップを走査して作る逆引きインデックス（報酬名+個数で1エントリ、区域ごとに畳んだ `byArea` 付き）。報酬ページの検索はこれを引く。

### データ取得パイプライン

画像・生成物はコミット済みなので通常は実行不要。区域を追加するときのみ回す。実行順は README の「データ取得パイプライン」「ノードデータのパイプライン」節を参照。要点:

- マップ画像系: `scrape-posts.mjs` → `download-images.mjs` → `gen-image-index.mjs` → `npm run thumbs`
- ノード系: `node scripts/scrape-nodes.mjs <区域番号...>` → `node scripts/gen-nodes.mjs`
- `gen-nodes.mjs` は `curl.exe` を呼ぶ Windows 前提のスクリプト
- `scripts/*-cache/` はスクレイプ結果のキャッシュ（`umi-cache/` は gitignore 済み）

### UI

- shadcn/ui (new-york, neutral, CSS 変数) — `src/components/ui/` は生成物なので基本触らない。`components.json` 経由で追加する
- Tailwind v4（設定ファイルなし、`src/index.css` にトークン）
- ダークモードは `src/lib/theme.ts` が `documentElement` に `.dark` を付ける（localStorage `lop-theme`）
- React Compiler が babel plugin として有効（`vite.config.ts`）。手動 memo 化は基本不要
- パスエイリアスは `@/` → `src/`

### デプロイ

Cloudflare Workers の静的アセット配信。`wrangler.jsonc` の `not_found_handling: "single-page-application"` で SPA フォールバック。`@cloudflare/vite-plugin` が dev/build 双方に噛んでいる。

## ライセンス上の注意

나무위키由来の記述（`src/data/namu.ts` と、そこから表示される内容）は **CC BY-NC-SA 2.0 KR**。出典表示とライセンス継承が必要で、サイト下部に表示している。この表示を削らないこと。
