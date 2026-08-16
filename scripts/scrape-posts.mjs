/**
 * DCインサイド 던파IP マイナーギャラリーの各区域まとめ記事から、
 * 画像 URL と本文テキストを順序どおりに抜き出して raw-posts.json に保存する。
 * 取得済みの HTML は scripts/html-cache/ に残るので、再実行しても再取得しない。
 *
 *   node scripts/scrape-posts.mjs
 */
import fs from "node:fs";
import path from "node:path";

const OUT = import.meta.dirname;

const POSTS = [
  { key: "1-3", no: 4738329, title: "역설의 미궁 1~3층 지도" },
  { key: "4", no: 4771857, title: "4구역" },
  { key: "5", no: 4793763, title: "5구역" },
  { key: "6", no: 4818704, title: "6구역" },
  { key: "7", no: 4853018, title: "7구역" },
  { key: "8", no: 4889996, title: "8구역" },
  { key: "9", no: 4926562, title: "9구역" },
  { key: "10", no: 4956365, title: "10구역" },
  { key: "11", no: 4984071, title: "11구역" },
  { key: "12", no: 5016381, title: "12층" },
  { key: "13", no: 5047994, title: "13층" },
  { key: "14", no: 5078698, title: "14층" },
  { key: "15", no: 5117743, title: "15층" },
  { key: "16", no: 5147720, title: "16층" },
  { key: "17", no: 5172713, title: "17층" },
  { key: "18", no: 5206325, title: "18층" },
  { key: "19", no: 5235859, title: "19층" },
  { key: "20", no: 5261213, title: "20층" },
  { key: "21", no: 5280894, title: "21층" },
  { key: "22", no: 5303443, title: "22층" },
  { key: "23", no: 5322498, title: "23층" },
  { key: "24", no: 5340396, title: "24층" },
  { key: "25", no: 5363357, title: "25층" },
  { key: "26", no: 5381891, title: "26층" },
  { key: "27", no: 5399690, title: "27층" },
  { key: "28", no: 5433285, title: "28층" },
  { key: "29", no: 5460256, title: "29층" },
  { key: "30", no: 5491826, title: "30층" },
  { key: "31", no: 5522816, title: "31층" },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

import { execFileSync } from "node:child_process";

const CACHE = path.join(OUT, "html-cache");
fs.mkdirSync(CACHE, { recursive: true });

function fetchPost(no) {
  const file = path.join(CACHE, `${no}.html`);
  if (fs.existsSync(file) && fs.statSync(file).size > 100000) {
    const cached = fs.readFileSync(file, "utf8");
    if (cached.includes('<div class="write_div"')) return cached;
  }
  const url = `https://gall.dcinside.com/mgallery/board/view/?id=dfip&no=${no}`;
  for (let attempt = 0; attempt < 4; attempt++) {
    execFileSync("curl.exe", ["-s", "-o", file, "-A", UA, "-e", "https://gall.dcinside.com/", "-L", url], {
      stdio: "ignore",
    });
    const html = fs.readFileSync(file, "utf8");
    if (html.includes('<div class="write_div"')) return html;
    execFileSync("cmd", ["/c", "timeout", "/t", String(5 * (attempt + 1)), "/nobreak"], { stdio: "ignore" });
  }
  throw new Error(`blocked after retries`);
}

function extractBody(html) {
  const start = html.indexOf('<div class="write_div"');
  if (start < 0) return null;
  const markers = ["<script", '<div class="appending_file_box"', '<div class="btn_recommend_box', "<style"];
  const stop = markers
    .map((m) => html.indexOf(m, start + 20))
    .filter((x) => x > 0)
    .sort((a, b) => a - b)[0];
  return html.slice(start, stop ?? start + 400000);
}

function stripTags(s) {
  return s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

// Walk the body, emitting a linear stream of {type:'img'|'text', value}
function tokenize(body) {
  const tokens = [];
  const re = /<img\b[^>]*>/gi;
  let last = 0;
  let m;
  while ((m = re.exec(body)) !== null) {
    const between = body.slice(last, m.index);
    const t = stripTags(between);
    if (t) tokens.push({ type: "text", value: t });
    const tag = m[0];
    const orig = /data-original="([^"]+)"/i.exec(tag);
    const src = /\bsrc="([^"]+)"/i.exec(tag);
    let u = orig ? orig[1] : src ? src[1] : null;
    if (u && !/gallview_loading|nstatic\.dcinside/.test(u)) {
      tokens.push({ type: "img", value: u.replace(/&amp;/g, "&") });
    }
    last = m.index + tag.length;
  }
  const tail = stripTags(body.slice(last));
  if (tail) tokens.push({ type: "text", value: tail });
  return tokens;
}

const result = [];
for (const p of POSTS) {
  process.stdout.write(`fetching ${p.key} ... `);
  try {
    const html = fetchPost(p.no);
    const body = extractBody(html);
    if (!body) {
      console.log("NO BODY");
      result.push({ ...p, error: "no body" });
      continue;
    }
    const tokens = tokenize(body);
    const imgs = tokens.filter((t) => t.type === "img").length;
    console.log(`${imgs} imgs, ${tokens.length} tokens`);
    result.push({ ...p, url: `https://gall.dcinside.com/mgallery/board/view/?id=dfip&no=${p.no}`, tokens });
  } catch (e) {
    console.log("ERR " + e.message);
    result.push({ ...p, error: String(e.message) });
  }
  await new Promise((r) => setTimeout(r, 700));
}

fs.writeFileSync(path.join(OUT, "raw-posts.json"), JSON.stringify(result, null, 2), "utf8");
console.log("\nwrote raw-posts.json");
