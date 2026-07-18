import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { buildParentPairs } from "../src/pair-engine.js";

const datasetPath = process.argv[2];
if (!datasetPath) throw new Error("Usage: node scripts/check-pair-engine.mjs <candidate.json>");
const dataset = JSON.parse(await readFile(resolve(datasetPath), "utf8"));
const astralym = dataset.pals.find((pal) => pal.slug === "astralym");
if (!astralym) throw new Error("Astralym missing from candidate");
const pairs = buildParentPairs({ targetId: astralym.id, pals: dataset.pals, combinations: dataset.combinations });
if (!pairs.some((pair) => pair.parentAId === astralym.id && pair.parentBId === astralym.id && pair.childId === astralym.id)) {
  throw new Error("Astralym same-species reverse lookup missing");
}
console.log(JSON.stringify({ status: "pass", target: astralym.name, parentPairs: pairs.length, sameSpecies: true }, null, 2));
