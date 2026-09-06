import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(process.argv[2] || "dist");
const errors = [];
const readRoute = async (route) => {
  const path = join(root, route, "index.html");
  try { await stat(path); } catch { errors.push(`missing legal route /${route}/`); return ""; }
  return readFile(path, "utf8");
};

const pages = Object.fromEntries(await Promise.all(
  ["privacy", "terms", "disclaimer", "data-sources", "about"].map(async (route) => [route, await readRoute(route)])
));
const home = await readFile(join(root, "index.html"), "utf8");
const app = await readFile(join(root, "assets/app.js"), "utf8");
const analytics = await readFile(join(root, "assets/analytics.js"), "utf8");
const allHtml = [home, ...Object.values(pages)].join("\n");

for (const route of ["privacy", "terms", "disclaimer", "data-sources"]) {
  if (!home.includes(`href="/${route}/"`)) errors.push(`footer missing /${route}/`);
}
if (!allHtml.includes("independent, unofficial")) errors.push("unofficial fan-tool disclosure missing");
if (!pages.disclaimer.includes("not affiliated with, endorsed by, or sponsored by Pocketpair")) errors.push("Pocketpair non-affiliation disclosure missing");
if (!pages.privacy.includes("localStorage") || !pages.privacy.includes("Clear my Palbox")) errors.push("localStorage behavior/deletion instructions missing from Privacy");
if (!pages.privacy.includes("Plausible analytics") || !pages.privacy.includes("plausible.shipsolo.io")) errors.push("analytics provider not disclosed");
if (!pages["data-sources"].includes("PalCalc") || !pages["data-sources"].includes("Palworld Tools") || !pages["data-sources"].includes("PalDB")) errors.push("candidate and corroboration sources not disclosed");
if (!pages.disclaimer.includes("Guidelines for Derivative Works")) errors.push("official derivative-work guideline boundary missing");

for (const claim of ["100% accurate", "official calculator", "guaranteed accurate", "free forever"]) {
  if (allHtml.toLowerCase().includes(claim)) errors.push(`prohibited claim found: ${claim}`);
}
for (const match of allHtml.matchAll(/<script[^>]+src="([^"]+)"/g)) {
  if (/^https?:\/\//.test(match[1]) && match[1] !== "https://plausible.shipsolo.io/js/pa-Tuwmm86GExPpwNCxPPO8b.js") errors.push(`unapproved external script: ${match[1]}`);
}
if (!app.includes('localStorage.getItem("pbc-owned-pals")') || !app.includes('localStorage.removeItem("pbc-owned-pals")')) errors.push("owned-Pals local storage lifecycle is incomplete");
for (const eventName of ["calculate", "chain", "share"]) {
  if (!app.includes(`track("${eventName}"`) && !analytics.includes(`window.pbcTrack("${eventName}"`)) errors.push(`analytics event missing: ${eventName}`);
}
if (!analytics.includes('window.pbcTrack("outbound-click"') || !analytics.includes("utm_source")) errors.push("outbound-click or UTM attribution missing");

if (errors.length) {
  console.error("COMPLIANCE_CHECK_FAILED");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(JSON.stringify({ status: "pass", legalRoutes: 5, approvedExternalScripts: 1, prohibitedClaims: 0 }, null, 2));
