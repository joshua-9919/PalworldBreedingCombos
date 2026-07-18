import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const [candidateArg = "/tmp/pbc-launch-candidate.json", approvalArg = "data/approvals/owner-publication-2026-07-18.json", outputArg = "data/launch/dataset.json"] = process.argv.slice(2);
const candidatePath = resolve(candidateArg);
const approvalPath = resolve(approvalArg);
const outputPath = resolve(outputArg);

const [candidate, approval] = await Promise.all([
  readFile(candidatePath, "utf8").then(JSON.parse),
  readFile(approvalPath, "utf8").then(JSON.parse)
]);

const requiredScope = {
  free: true,
  advertising: false,
  affiliateMarketing: false,
  payments: false,
  officialAffiliationClaim: false,
  gameMediaAssets: false
};

for (const [key, expected] of Object.entries(requiredScope)) {
  if (approval?.approvedScope?.[key] !== expected) {
    throw new Error(`Approval scope mismatch: ${key} must be ${expected}`);
  }
}
if (!approval?.productionActions?.cloudflareDeploy || !approval?.productionActions?.bindPrimaryDomain) {
  throw new Error("Owner approval does not authorize production deployment and domain binding");
}
if (candidate?.manifest?.environment !== "launch" || !Array.isArray(candidate?.combinations) || candidate.combinations.length === 0) {
  throw new Error("Candidate is not a non-empty launch dataset");
}

const promoted = structuredClone(candidate);
promoted.manifest.datasetVersion = `${candidate.manifest.datasetVersion}-owner-approved-20260718`;
promoted.manifest.generatedAt = approval.approvedAt;
promoted.manifest.verificationStatus = "verified";
promoted.combinations = promoted.combinations.map((row) => ({ ...row, verificationStatus: "verified" }));
promoted.knownGaps = [
  "The factual lookup dataset was accepted by the owner for publication under the documented free, non-commercial, unofficial fan-tool scope; this is not Pocketpair approval.",
  "Combination rule classification is not inferred; rows are treated as a versioned lookup table.",
  "One parent pair is gender-dependent and retains parent gender in the product result.",
  "Availability remains unknown and Pal entity pages remain non-indexable for the initial release.",
  "The explanatory breeding-formula page remains non-indexable until its editorial source evidence is separately reviewed."
];

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(promoted, null, 2)}\n`);
console.log(JSON.stringify({
  status: "promoted",
  candidate: candidatePath,
  approval: approvalPath,
  output: outputPath,
  datasetVersion: promoted.manifest.datasetVersion,
  combinations: promoted.combinations.length
}, null, 2));
