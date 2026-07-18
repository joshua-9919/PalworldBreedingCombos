import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const [datasetPath, evidencePath] = process.argv.slice(2);
if (!datasetPath || !evidencePath) {
  console.error("Usage: node scripts/verify-cross-source.mjs <candidate.json> <cross-source-samples.json>");
  process.exit(2);
}

const dataset = JSON.parse(await readFile(resolve(datasetPath), "utf8"));
const evidence = JSON.parse(await readFile(resolve(evidencePath), "utf8"));
const failures = [];
let assertions = 0;

for (const source of evidence.sources) {
  for (const assertion of source.assertions) {
    assertions += 1;
    const pal = dataset.pals.find((entry) => entry.name === assertion.name && entry.paldexNo === assertion.paldexNo);
    if (!pal) failures.push(`${source.sourceId}: missing ${assertion.name} #${assertion.paldexNo}`);
    else if (pal.breedingPower !== assertion.breedingPower) failures.push(`${source.sourceId}: ${assertion.name} expected ${assertion.breedingPower}, got ${pal.breedingPower}`);
  }
}

const astralym = dataset.pals.filter((pal) => pal.name === "Astralym" && pal.paldexNo === "204");
if (astralym.length !== 1) failures.push(`roster invariant: expected exactly one Astralym #204, got ${astralym.length}`);
if (astralym[0]?.indexable !== false) failures.push("safety invariant: Astralym must remain non-indexable during candidate review");

if (failures.length) {
  console.error("CROSS_SOURCE_CHECK_FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(JSON.stringify({
  status: "pass",
  evidenceSources: evidence.sources.length,
  assertions,
  candidatePals: dataset.pals.length,
  candidateCombinations: dataset.combinations?.length || 0,
  indexablePals: dataset.pals.filter((pal) => pal.indexable).length
}, null, 2));
