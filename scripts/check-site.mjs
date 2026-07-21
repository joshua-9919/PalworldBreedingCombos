import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(process.argv[2] || "dist");
const errors = [];
const htmlFiles = [];

async function walk(dir) {
  for (const entry of await readdir(dir)) {
    const path = join(dir, entry);
    const info = await stat(path);
    if (info.isDirectory()) await walk(path);
    else if (entry.endsWith(".html")) htmlFiles.push(path);
  }
}

await walk(root);
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const required of ["<title>", "name=\"description\"", "name=\"robots\"", "property=\"og:title\"", "property=\"og:description\"", "property=\"og:image\"", "name=\"twitter:image\""]) {
    if (!html.includes(required)) errors.push(`${file}: missing ${required}`);
  }
  if (!html.includes('name="p:domain_verify" content="876c1aee0d58498f8f084d242da8b83d"')) errors.push(`${file}: missing Pinterest domain verification`);
  const is404 = file.endsWith("404.html");
  if (!is404 && (!html.includes('rel="canonical"') || !html.includes('property="og:url"'))) errors.push(`${file}: missing canonical URL metadata`);
  if (is404 && (!html.includes('name="robots" content="noindex,nofollow"') || html.includes('rel="canonical"') || html.includes('type="application/ld+json"'))) errors.push(`${file}: 404 must be noindex without canonical or schema`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const schema = JSON.parse(match[1]);
      if (schema["@context"] !== "https://schema.org") errors.push(`${file}: JSON-LD missing schema.org context`);
    } catch (error) {
      errors.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }
  if (!is404 && !html.includes('<script type="application/ld+json">')) errors.push(`${file}: missing JSON-LD`);
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (href === "#" || href.startsWith("javascript:")) errors.push(`${file}: invalid internal link ${href}`);
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split(/[?#]/)[0];
    if (/\.[a-z]+$/i.test(clean)) continue;
    const target = clean === "/" ? join(root, "index.html") : join(root, clean.slice(1), "index.html");
    try { await stat(target); } catch { errors.push(`${file}: broken route ${href}`); }
  }
}

const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (!html.includes('name="robots" content="noindex,nofollow"')) continue;
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical && sitemap.includes(`<loc>${canonical}</loc>`)) errors.push(`${file}: noindex canonical appears in sitemap`);
}

for (const required of ["robots.txt", "sitemap.xml", "404.html", "favicon.svg", "site.webmanifest", "brand/logo-mark.png", "brand/logo-mark-512.png", "brand/apple-touch-icon.png", "brand/og-default.png", "assets/dataset.json", "assets/app.js", "assets/chain-engine.js", "assets/pair-engine.js", "assets/styles.css"]) {
  try { await stat(join(root, required)); } catch { errors.push(`missing build artifact ${required}`); }
}

if (errors.length) {
  console.error("SITE_CHECK_FAILED");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(JSON.stringify({ status: "pass", htmlFiles: htmlFiles.length }, null, 2));
