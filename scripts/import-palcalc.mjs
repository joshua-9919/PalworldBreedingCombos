import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = Object.fromEntries(process.argv.slice(2).map((value, index, all) => value.startsWith("--") ? [value.slice(2), all[index + 1]] : null).filter(Boolean));
if (!args.db || !args.breeding || !args.out || !args.revision) {
  console.error("Usage: node scripts/import-palcalc.mjs --db <db.json> --breeding <breeding.json> --revision <tag-or-sha> --out <candidate.json>");
  process.exit(2);
}

const dbBuffer = await readFile(resolve(args.db));
const breedingBuffer = await readFile(resolve(args.breeding));
const db = JSON.parse(dbBuffer);
const breeding = JSON.parse(breedingBuffer);
const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const rarityClass = (rarity) => rarity >= 20 ? "legendary" : rarity >= 10 ? "epic" : rarity >= 5 ? "rare" : rarity >= 2 ? "uncommon" : "common";

const nameCounts = new Map(db.Pals.map((source) => [source.Name, db.Pals.filter((pal) => pal.Name === source.Name).length]));
const pals = db.Pals.map((source) => ({
  id: slugify(source.InternalName),
  slug: nameCounts.get(source.Name) > 1 ? `${slugify(source.Name)}-${slugify(source.InternalName)}` : slugify(source.Name),
  name: source.Name,
  paldexNo: `${source.Id.PalDexNo}${source.Id.IsVariant ? "B" : ""}`,
  breedingPower: source.BreedingPower,
  breedable: breeding.Breeding.some((combo) => combo.ChildInternalName === source.InternalName),
  rarityClass: rarityClass(source.Rarity),
  availability: "unknown",
  aliases: [...new Set(Object.values(source.LocalizedNames || {}).filter((name) => name && name !== source.Name))],
  verificationStatus: "derived",
  indexable: false
}));

const idByInternalName = new Map(db.Pals.map((pal) => [pal.InternalName, slugify(pal.InternalName)]));
const combinations = breeding.Breeding.map((source) => {
  const parentA = { id: idByInternalName.get(source.Parent1InternalName), gender: source.Parent1Gender };
  const parentB = { id: idByInternalName.get(source.Parent2InternalName), gender: source.Parent2Gender };
  const [a, b] = [parentA, parentB].sort((left, right) => left.id.localeCompare(right.id));
  return {
    parentAId: a.id,
    parentAGender: a.gender,
    parentBId: b.id,
    parentBGender: b.gender,
    childId: idByInternalName.get(source.ChildInternalName),
    verificationStatus: "unverified"
  };
});

const generatedAt = new Date().toISOString();
const dataset = {
  manifest: {
    contractVersion: "1.0.0",
    environment: "launch",
    gameVersion: "1.0",
    datasetVersion: `palcalc-${db.Version}-${args.revision}`.replace(/[^a-zA-Z0-9._-]/g, "-"),
    generatedAt,
    sourceRevision: `tylercamp/palcalc@${args.revision};db-sha256:${sha256(dbBuffer)};breeding-sha256:${sha256(breedingBuffer)}`,
    verificationStatus: "partially-verified",
    recordCounts: { pals: pals.length, specialCombinations: 0, combinations: combinations.length }
  },
  pals,
  specialCombinations: [],
  combinations,
  knownGaps: [
    "Candidate is normalized from a pinned third-party MIT repository; independent extraction from locally owned Palworld 1.0 game files is still required.",
    "Combination rule classification is not inferred; rows are treated as a versioned lookup table.",
    "One parent pair is gender-dependent and must retain parent gender in the product result.",
    "Availability and entity-page indexability remain unverified."
  ]
};

await writeFile(resolve(args.out), `${JSON.stringify(dataset)}\n`);
console.log(JSON.stringify({
  status: "candidate-generated",
  output: resolve(args.out),
  dbVersion: db.Version,
  pals: pals.length,
  combinations: combinations.length,
  dbSha256: sha256(dbBuffer),
  breedingSha256: sha256(breedingBuffer),
  datasetSha256: sha256(Buffer.from(JSON.stringify(dataset)))
}, null, 2));
