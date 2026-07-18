import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const [datasetPath, snapshotPath] = process.argv.slice(2);
if (!datasetPath || !snapshotPath) {
  console.error("Usage: node scripts/verify-palworld-tools-snapshot.mjs <candidate.json> <palworld-tools-breeding.html>");
  process.exit(2);
}

const dataset = JSON.parse(await readFile(resolve(datasetPath), "utf8"));
const encodedPage = await readFile(resolve(snapshotPath), "utf8");
const page = encodedPage.replace(/\\\"/g, '"').replace(/\\\\/g, "\\");

function extractArray(marker, from = 0) {
  const start = page.indexOf(marker, from);
  if (start < 0) throw new Error(`Snapshot marker not found: ${marker}`);
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < page.length; index += 1) {
    const character = page[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "[") depth += 1;
    else if (character === "]" && --depth === 0) {
      return { value: JSON.parse(page.slice(start, index + 1)), end: index + 1 };
    }
  }
  throw new Error(`Unterminated array at ${start}`);
}

const sourcePalsResult = extractArray('[{"code"');
const uniqueLabel = page.indexOf('"unique":', sourcePalsResult.end);
if (uniqueLabel < 0) throw new Error("Snapshot unique-combination property not found");
const sourcePals = sourcePalsResult.value;
const sourceUnique = extractArray("[", uniqueLabel + '"unique":'.length).value;

const paldexBase = (value) => String(value).match(/^\d+/)?.[0] || String(value);
const candidateByName = new Map(dataset.pals.map((pal) => [pal.name, pal]));
const candidateById = new Map(dataset.pals.map((pal) => [pal.id, pal]));
const normalizeCode = (value) => value.replaceAll("_", "-").toLowerCase();
const sourceCodeToCandidate = new Map();
const missingPals = [];
const powerMismatches = [];

for (const sourcePal of sourcePals) {
  const candidate = candidateByName.get(sourcePal.name);
  if (!candidate || paldexBase(candidate.paldexNo) !== paldexBase(sourcePal.paldex)) {
    missingPals.push(`${sourcePal.name} #${sourcePal.paldex}`);
    continue;
  }
  sourceCodeToCandidate.set(sourcePal.code, candidate);
  if (candidate.breedingPower !== sourcePal.rank) {
    powerMismatches.push(`${sourcePal.name} #${sourcePal.paldex}: expected ${sourcePal.rank}, got ${candidate.breedingPower}`);
  }
}

const gender = (value) => value ? value.toUpperCase() : "WILDCARD";
const comboKey = (parentAId, genderA, parentBId, genderB, childId) => {
  const parents = [`${parentAId}:${gender(genderA)}`, `${parentBId}:${gender(genderB)}`].sort();
  return `${parents.join("+")}=>${childId}`;
};
const candidateCombos = new Set(dataset.combinations.map((combo) => comboKey(
  combo.parentAId, combo.parentAGender, combo.parentBId, combo.parentBGender, combo.childId
)));
const missingUnique = [];
let comparableUnique = 0;

for (const combo of sourceUnique) {
  const parentA = sourceCodeToCandidate.get(combo.parentA) || candidateById.get(normalizeCode(combo.parentA));
  const parentB = sourceCodeToCandidate.get(combo.parentB) || candidateById.get(normalizeCode(combo.parentB));
  const child = sourceCodeToCandidate.get(combo.child) || candidateById.get(normalizeCode(combo.child));
  if (!parentA || !parentB || !child) continue;
  comparableUnique += 1;
  const key = comboKey(parentA.id, combo.genderA, parentB.id, combo.genderB, child.id);
  if (!candidateCombos.has(key)) {
    missingUnique.push(`${parentA.name} (${gender(combo.genderA)}) + ${parentB.name} (${gender(combo.genderB)}) -> ${child.name}`);
  }
}

const failures = [
  ...missingPals.map((item) => `missing pal: ${item}`),
  ...powerMismatches.map((item) => `power mismatch: ${item}`),
  ...missingUnique.map((item) => `missing unique combo: ${item}`)
];
console.log(JSON.stringify({
  status: failures.length ? "fail" : "pass",
  sourcePals: sourcePals.length,
  matchedPals: sourcePals.length - missingPals.length,
  powerMismatches: powerMismatches.length,
  sourceUniqueCombinations: sourceUnique.length,
  comparableUniqueCombinations: comparableUnique,
  matchedUniqueCombinations: comparableUnique - missingUnique.length,
  candidatePals: dataset.pals.length,
  candidateCombinations: dataset.combinations.length
}, null, 2));
if (failures.length) {
  failures.slice(0, 50).forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
