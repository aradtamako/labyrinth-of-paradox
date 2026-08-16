/**
 * download-images.mjs が書き出した image-manifest.json から
 * src/data/floor-images.ts を生成する。
 *
 *   node scripts/gen-image-index.mjs
 */
import fs from "node:fs";
import path from "node:path";

const SCRIPTS = import.meta.dirname;
const PROJECT = path.resolve(SCRIPTS, "..");

const manifest = JSON.parse(fs.readFileSync(path.join(SCRIPTS, "image-manifest.json"), "utf8"));

const byFloor = new Map();
for (const m of manifest) {
  if (!m.file) {
    // dccon.php はギャラリー用スタンプ画像。攻略には関係ないので黙って捨てる。
    if (!/dccon\.php/.test(m.src)) console.warn(`MISSING image for floor ${m.floorKey} #${m.index}`);
    continue;
  }
  if (!byFloor.has(m.floorKey)) byFloor.set(m.floorKey, []);
  byFloor.get(m.floorKey)[m.index - 1] = `/maps/${m.file}`;
}

const lines = [
  "/**",
  " * 自動生成ファイル — public/maps/ に保存した迷宮マップ画像のパス一覧。",
  " * 添字は元記事内での画像の並び順（1枚目 = index 0）に対応する。",
  " */",
  "",
  "export const FLOOR_IMAGES: Record<string, readonly string[]> = {",
];
for (const [key, arr] of byFloor) {
  const items = arr.map((s) => `    '${s}',`).join("\n");
  lines.push(`  '${key}': [`, items, "  ],");
}
lines.push("}", "");

fs.writeFileSync(path.join(PROJECT, "src/data/floor-images.ts"), lines.join("\n"), "utf8");
console.log(`wrote floor-images.ts (${byFloor.size} floors, ${manifest.filter((m) => m.file).length} images)`);
