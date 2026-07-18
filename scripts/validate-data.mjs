import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const target = process.argv[2];
if (!target) {
  console.error("Usage: node scripts/validate-data.mjs <dataset.json> [--production]");
  process.exit(2);
}

const production = process.argv.includes("--production");
const errors = [];
const fail = (message) => errors.push(message);
const isString = (value) => typeof value === "string" && value.length > 0;

let dataset;
try {
  dataset = JSON.parse(await readFile(resolve(target), "utf8"));
} catch (error) {
  console.error(`DATASET_INVALID: ${error.message}`);
  process.exit(1);
}

if (!dataset || typeof dataset !== "object") fail("root must be an object");
if (!dataset.manifest || typeof dataset.manifest !== "object") fail("manifest is required");
if (!Array.isArray(dataset.pals)) fail("pals must be an array");
if (!Array.isArray(dataset.specialCombinations)) fail("specialCombinations must be an array");
if (dataset.combinations !== undefined && !Array.isArray(dataset.combinations)) fail("combinations must be an array when provided");
if (!Array.isArray(dataset.knownGaps)) fail("knownGaps must be an array");

const manifest = dataset.manifest ?? {};
if (manifest.contractVersion !== "1.0.0") fail("manifest.contractVersion must be 1.0.0");
if (!["fixture", "launch"].includes(manifest.environment)) fail("manifest.environment must be fixture or launch");
if (!isString(manifest.gameVersion)) fail("manifest.gameVersion is required");
if (!isString(manifest.datasetVersion)) fail("manifest.datasetVersion is required");
if (!isString(manifest.generatedAt) || Number.isNaN(Date.parse(manifest.generatedAt))) fail("manifest.generatedAt must be an ISO date-time");
if (!isString(manifest.sourceRevision)) fail("manifest.sourceRevision is required");
if (production && manifest.environment !== "launch") fail("FIXTURE_FORBIDDEN: production validation requires environment=launch");
if (production && manifest.verificationStatus === "fixture") fail("FIXTURE_FORBIDDEN: fixture verification status cannot ship");
if (production && manifest.verificationStatus !== "verified") fail("PROVENANCE_GATE: production requires manifest.verificationStatus=verified");

const pals = Array.isArray(dataset.pals) ? dataset.pals : [];
const ids = new Set();
const slugs = new Set();
for (const [index, pal] of pals.entries()) {
  const label = `pals[${index}]`;
  if (!isString(pal?.id)) fail(`${label}.id is required`);
  if (!isString(pal?.slug)) fail(`${label}.slug is required`);
  if (!isString(pal?.name)) fail(`${label}.name is required`);
  if (ids.has(pal?.id)) fail(`${label}.id duplicates ${pal.id}`);
  if (slugs.has(pal?.slug)) fail(`${label}.slug duplicates ${pal.slug}`);
  ids.add(pal?.id);
  slugs.add(pal?.slug);
  if (!Array.isArray(pal?.aliases)) fail(`${label}.aliases must be an array`);
  if (production && pal?.verificationStatus === "fixture") fail(`${label} contains fixture verification status`);
  if (production && pal?.indexable && !["verified", "derived"].includes(pal?.verificationStatus)) {
    fail(`${label} is indexable without accepted verification status`);
  }
}

const combos = Array.isArray(dataset.specialCombinations) ? dataset.specialCombinations : [];
const comboKeys = new Set();
for (const [index, combo] of combos.entries()) {
  const label = `specialCombinations[${index}]`;
  for (const field of ["parentAId", "parentBId", "childId"]) {
    if (!ids.has(combo?.[field])) fail(`${label}.${field} references missing Pal ${combo?.[field]}`);
  }
  if (combo?.parentAId > combo?.parentBId) fail(`${label} parents must use canonical ascending ID order`);
  const key = `${combo?.parentAId}|${combo?.parentBId}|${combo?.childId}`;
  if (comboKeys.has(key)) fail(`${label} duplicates ${key}`);
  comboKeys.add(key);
}

const combinations = Array.isArray(dataset.combinations) ? dataset.combinations : [];
const combinationKeys = new Set();
for (const [index, combo] of combinations.entries()) {
  const label = `combinations[${index}]`;
  for (const field of ["parentAId", "parentBId", "childId"]) {
    if (!ids.has(combo?.[field])) fail(`${label}.${field} references missing Pal ${combo?.[field]}`);
  }
  if (combo?.parentAId > combo?.parentBId) fail(`${label} parents must use canonical ascending ID order`);
  for (const field of ["parentAGender", "parentBGender"]) {
    if (!["WILDCARD", "MALE", "FEMALE"].includes(combo?.[field])) fail(`${label}.${field} is invalid`);
  }
  const key = `${combo?.parentAId}|${combo?.parentAGender}|${combo?.parentBId}|${combo?.parentBGender}|${combo?.childId}`;
  if (combinationKeys.has(key)) fail(`${label} duplicates ${key}`);
  combinationKeys.add(key);
  if (production && manifest.verificationStatus === "verified" && combo?.verificationStatus !== "verified") fail(`${label} is not verified for production`);
}

if (manifest.recordCounts?.pals !== pals.length) fail("manifest.recordCounts.pals does not match pals length");
if (manifest.recordCounts?.specialCombinations !== combos.length) fail("manifest.recordCounts.specialCombinations does not match combinations length");
if (manifest.recordCounts?.combinations !== undefined && manifest.recordCounts.combinations !== combinations.length) fail("manifest.recordCounts.combinations does not match combinations length");
if (production && combinations.length === 0) fail("production dataset requires a non-empty combinations lookup table");

if (errors.length) {
  console.error("DATASET_INVALID");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(JSON.stringify({
  status: "valid",
  environment: manifest.environment,
  datasetVersion: manifest.datasetVersion,
  pals: pals.length,
  specialCombinations: combos.length,
  combinations: combinations.length,
  productionChecked: production
}, null, 2));
