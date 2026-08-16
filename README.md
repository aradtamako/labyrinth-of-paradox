# 逆説の迷宮 攻略サイト

ダンジョン&ファイター（アラド戦記）の特殊ダンジョン「逆説の迷宮」の非公式攻略データベース。
Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui による SPA。

## 収録内容

- **インタラクティブマップ**（1〜3区域）— マップをノードのグリッドとして描画し、マスにカーソルを
  乗せるとノード種別・等級・報酬が出る。クリックで固定表示。
- **1〜31区域のシードマップ画像** — ノードデータがない区域は元記事の画像を掲載。
- **シードコード検索** — ゲーム内でマップ右端の列の部屋数を上から数えた数字（例 `23333`）から、
  該当するシードを全区域横断で検索できる。
- **報酬一覧・検索** — どのマスでどの報酬が出るかを逆引きできる。報酬名・ノード種別・等級で検索。
- **名声上昇値・主要報酬** — 区域ごとの推奨名声の推移と主な報酬。
- **システム解説** — 迷宮調査券／入場券、討伐券5種、傭兵団、バッファー派遣の仕様。

## 開発

```sh
npm install
npm run dev      # 開発サーバー
npm run build    # 型チェック + 本番ビルド
npm run lint     # oxlint
```

## データについて

出典は次の2つ。

| 出典 | 内容 |
| --- | --- |
| [公式アップデートページ](https://arad.nexon.co.jp/update/season12_act0/2_2/) | 入場条件、討伐券、傭兵団、バッファー派遣などの仕様 |
| [DCインサイド 던파IP マイナーギャラリー](https://gall.dcinside.com/mgallery/board/view?id=dfip&no=5146377) | 各区域のシードマップ、名声上昇値、主要報酬 |
| [dnf.umi.cat](https://dnf.umi.cat/kr) | マスごとのノード配置・種別・等級・報酬（現在は1〜3区域を取り込み済み） |
| [나무위키 역설의 미궁/지도](https://namu.wiki/w/역설의%20미궁/지도) | 関門ごとの報酬内容、区域別の推奨名声とボス体力倍率 |

나무위키の記述は **CC BY-NC-SA 2.0 KR**。同ライセンスの条件（表示・非営利・継承）が
このサイトの該当部分にも適用される。サイト下部に出典とライセンスを表示している。

データは次のファイルに分かれている。

- `src/data/official.ts` — 公式ページ由来の仕様（手書き）
- `src/data/floors.ts` — 区域ごとの攻略メタデータ。シードコード・報酬・攻略メモは韓国語の
  元記事を日本語に訳したもの（手書き）
- `src/data/floor-images.ts` — マップ画像パスの一覧（**自動生成**）
- `src/data/labyrinth-nodes.ts` — マスごとのノード配置・報酬（**自動生成**、韓国語のまま）
- `src/data/node-types.ts` — ノード種別・等級・報酬名の日本語訳と、報酬インデックスの組み立て（手書き）
- `src/data/namu.ts` — 나무위키由来の関門別報酬、区域別の推奨名声・体力倍率（手書き）
- `public/maps/` — 元記事から取得したマップ画像（原寸）
- `public/maps/thumbs/` — 一覧表示用の WebP サムネイル（**自動生成**）
- `public/stageicon/` — マスのアイコン素材（ゲーム内 `map.img` の連番）
- `public/rewards/` — 報酬アイテムのアイコン（**自動取得**）

### データ取得パイプライン

画像は `public/maps/` にコミット済みなので通常は実行不要。区域が追加されたときは次の順に回す。

```sh
node scripts/scrape-posts.mjs      # まとめ記事から画像URL・本文を抽出 -> scripts/raw-posts.json
node scripts/download-images.mjs   # 画像を public/maps/ に保存 -> scripts/image-manifest.json
node scripts/gen-image-index.mjs   # -> src/data/floor-images.ts
npm run thumbs                     # -> public/maps/thumbs/*.webp
```

新しい区域を足すときは `scripts/scrape-posts.mjs` の `POSTS` に記事番号を追加し、
`src/data/floors.ts` の `SEEDS` にシードコードと報酬を書き足す。

### ノードデータのパイプライン

マスごとのノード種別・報酬は別系統で取り込む。区域を引数で指定する。

```sh
node scripts/scrape-nodes.mjs 1 2 3   # 対象区域 -> scripts/nodes-raw.json
node scripts/gen-nodes.mjs            # -> src/data/labyrinth-nodes.ts と public/rewards/
```

取り込む区域を増やすときは `scrape-nodes.mjs` に区域番号を渡して再実行し、`gen-nodes.mjs` をかけ直す。
新しいノード種別や報酬名が出てきた場合は、`src/data/node-types.ts` の `TYPE_JA` / `REWARD_JA` に
日本語訳を足す（訳がなければ韓国語の原文がそのまま表示される）。

区域ごとに中身が変わるマス（装備倉庫・調律者・討伐券）の具体的な報酬名は 나무위키 側にある。

```sh
node scripts/scrape-namu.mjs   # -> scripts/namu-*.txt（人が読んで転記する用）
```

転記先は `src/data/namu.ts` の `AREA_REWARDS`（キーは `区域番号:ノード種別ID`）。
記号との対応は α→装備倉庫、β→古びた装備倉庫、γ/Υ→調律者の名残・痕跡、1/2/3→歪んだ生命の巡礼。
なお 나무위키 に配置図があるのは 1〜10区域、報酬凡例があるのは 1〜20区域まで。

## ライセンス・権利

ゲーム内の画像および名称の権利は NEXON および Neople に帰属する。
マップ画像と攻略情報は上記まとめ記事の投稿者によるもの。
