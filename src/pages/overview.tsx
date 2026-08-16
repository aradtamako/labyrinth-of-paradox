import { ArrowRight, ExternalLink, Gift, KeySquare, Layers, ScrollText, Timer } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FLOORS, GUIDE_INDEX_URL, MAX_AREA, SEED_COUNT } from '@/data/floors'
import { NAMU_SOURCE } from '@/data/namu'
import { AREAS_WITH_NODES, NODE_DATA_SOURCE } from '@/data/node-types'
import { ENTRY_SPECS, OFFICIAL_SOURCE } from '@/data/official'

export function OverviewPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <Hero />

      <section className="mt-12">
        <SectionHeading
          eyebrow="入場条件"
          title="ダンジョン基本情報"
          description="公式アップデートページに記載された仕様。"
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ENTRY_SPECS.map((spec) => (
            <div key={spec.label} className="rounded-xl border bg-card px-4 py-3.5">
              <div className="text-xs text-muted-foreground">{spec.label}</div>
              <div className="mt-1 text-[15px] font-semibold tracking-tight">{spec.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="攻略の基本"
          title="シードの見分け方"
          description="各区域には5種類の配置パターン（シード）があり、どれを引いたかを最初に特定するのが攻略の起点になる。"
        />

        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          <Step
            n={1}
            title="右端の列を数える"
            body="マップの右端の列について、上から順に各行の部屋数を数える。5桁の数字（例：23333）がそのままシードコードになる。"
          />
          <Step
            n={2}
            title="重複したら青い線を見る"
            body="4区域以降は配置が同一で数字が重複するシードが出てくる。その場合はマップ上の青い点線2本の位置で区別する。"
          />
          <Step
            n={3}
            title="1マス開けて確定させる"
            body="7区域のように青い線まで一致する場合は、どちらのシードでも開ける必要があるマスを1つ開け、中身（調査券か入場券か）で判定する。"
          />
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href="#/floors">
              区域マップを開く
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            シードコードでの検索にも対応（全 {SEED_COUNT} パターン）。
          </p>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading eyebrow="収録データ" title="このサイトで見られるもの" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Layers className="size-4" />}
            title={`1〜${MAX_AREA}区域のマップ`}
            body={`${FLOORS.length} 区域分のシードマップを収録。${AREAS_WITH_NODES.join('・')}区域はマスごとの報酬まで表示できる。`}
            href="#/floors"
            cta="区域一覧へ"
          />
          <FeatureCard
            icon={<Gift className="size-4" />}
            title="報酬から逆引き"
            body="どのマスでどの報酬が手に入るかを一覧・検索できる。報酬名・ノード種別・等級で絞り込める。"
            href="#/rewards"
            cta="報酬一覧へ"
          />
          <FeatureCard
            icon={<KeySquare className="size-4" />}
            title="調査券・入場券の仕様"
            body="関門のロック解除に使う迷宮調査券と、メイン／外郭それぞれの入場券の入手方法。"
            href="#/system"
            cta="システムへ"
          />
          <FeatureCard
            icon={<ScrollText className="size-4" />}
            title="討伐券と傭兵団"
            body="討伐券5種の必要名声・入手条件、傭兵団レベルとバッファー派遣の仕様。"
            href="#/system"
            cta="システムへ"
          />
        </div>
      </section>

      <Separator className="mt-14" />

      <section className="mt-8">
        <h2 className="text-sm font-semibold">出典</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          <SourceLink
            href={OFFICIAL_SOURCE}
            label="ダンジョン&ファイター 公式 — Season12 Act0 2-2 アップデート"
            note="入場条件・討伐券・傭兵団などの仕様"
          />
          <SourceLink
            href={GUIDE_INDEX_URL}
            label="DCインサイド 던파IP マイナーギャラリー — 미궁 1~31층 모음"
            note="各区域のシードマップと報酬情報"
          />
          <SourceLink
            href={NODE_DATA_SOURCE.url}
            label={NODE_DATA_SOURCE.label}
            note={`マスごとのノード配置・報酬データ（${AREAS_WITH_NODES.join('・')}区域）`}
          />
          <SourceLink
            href={NAMU_SOURCE.url}
            label={NAMU_SOURCE.label}
            note={`関門ごとの報酬内容、区域別の推奨名声とボス体力倍率（${NAMU_SOURCE.license}）`}
          />
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          マップ画像および攻略情報は上記まとめ記事の投稿者によるもの。ゲーム内アップデートにより
          内容が変わる場合があるため、最新情報は出典元を確認してほしい。
        </p>
      </section>
    </div>
  )
}

function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card px-6 py-10 sm:px-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/12 blur-3xl"
      />
      <div className="relative">
        <Badge variant="secondary" className="mb-4">
          Season12 Act0 2-2 「千海天：新たな跳躍」
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">逆説の迷宮 攻略</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          1〜{MAX_AREA}区域のシードマップ、報酬構成、調査券・討伐券まわりの仕様をまとめた
          非公式データベース。区域ごとに5種類あるマップ配置を、ゲーム内で数えた部屋数から特定できる。
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href="#/floors">
              区域マップを見る
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#/system">システム解説</a>
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Timer className="size-3.5" />
            制限時間 4分／区域
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers className="size-3.5" />
            全40区域（マップ収録は {MAX_AREA} 区域まで）
          </span>
        </div>
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs font-medium tracking-widest text-primary uppercase">{eyebrow}</div>
      <h2 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      {description && <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  )
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="rounded-xl border bg-card p-5">
      <span className="grid size-7 place-items-center rounded-md bg-primary/12 font-mono text-sm font-semibold text-primary">
        {n}
      </span>
      <h3 className="mt-3 font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </li>
  )
}

function FeatureCard({
  icon,
  title,
  body,
  href,
  cta,
}: {
  icon: React.ReactNode
  title: string
  body: string
  href: string
  cta: string
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <span className="grid size-8 place-items-center rounded-md bg-secondary text-secondary-foreground">
          {icon}
        </span>
        <CardTitle className="mt-3 text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
        <a
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {cta}
          <ArrowRight className="size-3.5" />
        </a>
      </CardContent>
    </Card>
  )
}

function SourceLink({ href, label, note }: { href: string; label: string; note: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="group inline-flex items-start gap-1.5 hover:underline"
      >
        <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted-foreground" />
        <span>
          {label}
          <span className="block text-xs text-muted-foreground no-underline">{note}</span>
        </span>
      </a>
    </li>
  )
}
