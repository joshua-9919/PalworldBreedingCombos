import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";

const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));
const dist = join(root, "dist");
const out = join(root, "marketing/itchio/build");
const website = "https://palworldbreedingcombos.com";
const utm = "utm_source=itchio&utm_medium=referral&utm_campaign=tool_listing_20260726";

const withUtm = (path) => {
  const [beforeHash, hash = ""] = path.split("#", 2);
  const separator = beforeHash.includes("?") ? "&" : "?";
  return `${website}${beforeHash}${separator}${utm}${hash ? `#${hash}` : ""}`;
};

await rm(out, { recursive: true, force: true });
await mkdir(join(out, "assets"), { recursive: true });
await mkdir(join(out, "brand"), { recursive: true });

for (const file of ["app.js", "chain-engine.js", "pair-engine.js", "dataset.json", "styles.css"]) {
  await cp(join(dist, "assets", file), join(out, "assets", file));
}
await cp(join(dist, "brand", "apple-touch-icon.png"), join(out, "brand", "apple-touch-icon.png"));
await cp(join(dist, "favicon.svg"), join(out, "favicon.svg"));

let html = await readFile(join(dist, "index.html"), "utf8");

html = html
  .replace(/<meta name="p:domain_verify"[^>]*>/, "")
  .replace(/<meta name="robots" content="index,follow">/, '<meta name="robots" content="noindex,nofollow">')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, "")
  .replace(/<!-- Privacy-friendly analytics by Plausible -->[\s\S]*?<script>[\s\S]*?<\/script>/, "")
  .replace(/<link rel="manifest"[^>]*>/, "")
  .replace(/data-dataset-url="\/assets\/dataset\.json\?[^"]+"/, 'data-dataset-url="assets/dataset.json"')
  .replace(/href="\/assets\/styles\.css\?[^"]+"/, 'href="assets/styles.css"')
  .replace(/src="\/assets\/app\.js\?[^"]+"/, 'src="assets/app.js"')
  .replace('href="/favicon.svg"', 'href="favicon.svg"')
  .replace('href="/brand/apple-touch-icon.png"', 'href="brand/apple-touch-icon.png"')
  .replace(/href="\/([^"]*)"/g, (_match, path) => `href="${withUtm(`/${path}`)}"`)
  .replace(
    "<body>",
    `<body><div class="itch-embed-banner"><span><strong>Embedded edition</strong> · Free, unofficial Palworld 1.0 planning tool</span><a href="${website}/?${utm}">Open the full calculator ↗</a></div>`
  )
  .replace(
    "</head>",
    `<style>
.itch-embed-banner{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px max(24px,calc((100vw - 1140px)/2));background:#10231d;border-bottom:1px solid #355246;color:#d7e2d8;font:600 14px/1.4 system-ui,sans-serif}
.itch-embed-banner strong{color:#f3b849}.itch-embed-banner a{color:#f3b849;text-decoration:none;white-space:nowrap}
@media(max-width:700px){.itch-embed-banner{align-items:flex-start;flex-direction:column;padding:12px 18px}}
</style></head>`
  );

await writeFile(join(out, "index.html"), html);

console.log(JSON.stringify({
  output: out,
  files: 8,
  entry: join(out, "index.html"),
  analyticsRemoved: !html.includes("plausible.shipsolo.io"),
  duplicateIndexingBlocked: html.includes('name="robots" content="noindex,nofollow"'),
  datasetRelative: html.includes('data-dataset-url="assets/dataset.json"')
}, null, 2));
