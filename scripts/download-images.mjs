/**
 * scrape-posts.mjs が書き出した raw-posts.json のマップ画像を public/maps/ に落とす。
 * すでに保存済みのファイルはスキップするので、中断しても再実行すれば続きから進む。
 *
 *   node scripts/download-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const SCRIPTS = import.meta.dirname;
const MAPS = path.resolve(SCRIPTS, "../public/maps");
fs.mkdirSync(MAPS, { recursive: true });

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const posts = JSON.parse(fs.readFileSync(path.join(SCRIPTS, "raw-posts.json"), "utf8"));

function sniffExt(file) {
  const fd = fs.openSync(file, "r");
  const buf = Buffer.alloc(12);
  fs.readSync(fd, buf, 0, 12, 0);
  fs.closeSync(fd);
  if (buf[0] === 0x89 && buf[1] === 0x50) return ".png";
  if (buf[0] === 0xff && buf[1] === 0xd8) return ".jpg";
  if (buf.slice(0, 3).toString("ascii") === "GIF") return ".gif";
  if (buf.slice(0, 4).toString("ascii") === "RIFF" && buf.slice(8, 12).toString("ascii") === "WEBP") return ".webp";
  return null;
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

const manifest = [];
let total = 0;
let downloaded = 0;

for (const p of posts) {
  let idx = 0;
  for (const tok of p.tokens) {
    if (tok.type !== "img") continue;
    idx++;
    total++;
    const base = `f${p.key}-${String(idx).padStart(2, "0")}`;
    const existing = fs.readdirSync(MAPS).find((f) => f.startsWith(base + "."));
    if (existing && fs.statSync(path.join(MAPS, existing)).size > 2000) {
      manifest.push({ floorKey: p.key, index: idx, file: existing, src: tok.value });
      continue;
    }
    const tmp = path.join(SCRIPTS, "img.tmp");
    let ok = false;
    for (let a = 0; a < 3 && !ok; a++) {
      try {
        execFileSync(
          "curl.exe",
          ["-s", "--max-time", "60", "-o", tmp, "-A", UA, "-e", "https://gall.dcinside.com/", "-L", tok.value],
          { stdio: "ignore" },
        );
        if (fs.existsSync(tmp) && fs.statSync(tmp).size > 2000 && sniffExt(tmp)) ok = true;
      } catch {
        /* retry */
      }
      if (!ok) sleep(4000);
    }
    if (!ok) {
      console.log(`  FAILED ${base}`);
      manifest.push({ floorKey: p.key, index: idx, file: null, src: tok.value });
      continue;
    }
    const ext = sniffExt(tmp);
    const name = base + ext;
    fs.renameSync(tmp, path.join(MAPS, name));
    downloaded++;
    manifest.push({ floorKey: p.key, index: idx, file: name, src: tok.value });
    sleep(400);
  }
  console.log(`floor ${p.key}: ${idx} images`);
}

fs.writeFileSync(path.join(SCRIPTS, "image-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
const bytes = manifest
  .filter((m) => m.file)
  .reduce((s, m) => s + fs.statSync(path.join(MAPS, m.file)).size, 0);
console.log(`\ntotal=${total} newly-downloaded=${downloaded} failed=${manifest.filter((m) => !m.file).length}`);
console.log(`size=${(bytes / 1024 / 1024).toFixed(1)} MB`);
