import { findShortestChain } from "../src/chain-engine.js";

const pal = (id, overrides = {}) => ({ id, breedable: true, rarityClass: "common", availability: "available", ...overrides });
const combo = (parentAId, parentBId, childId) => ({ parentAId, parentBId, childId, parentAGender: "WILDCARD", parentBGender: "WILDCARD" });
const pals = [pal("a"), pal("b"), pal("c"), pal("d"), pal("target"), pal("noise"), pal("legend", { rarityClass: "legendary" })];
const combinations = [combo("a", "b", "c"), combo("a", "b", "noise"), combo("b", "c", "d"), combo("c", "d", "target"), combo("a", "legend", "target")];
const result = findShortestChain({ ownedIds: ["a", "b"], targetId: "target", constraints: { excludeLegendary: true, excludeUnavailable: true }, pals, combinations });
if (!result.ok) throw new Error(result.message);
if (result.steps.length !== 3) throw new Error(`Expected 3 dependency steps, got ${result.steps.length}`);
if (result.steps.some((step) => step.childId === "noise")) throw new Error("Returned an irrelevant discovered branch");
if (result.steps.some((step) => step.parentAId === "legend" || step.parentBId === "legend")) throw new Error("Legendary exclusion was ignored");
console.log(JSON.stringify({ status: "pass", dependencySteps: result.steps.length, irrelevantBranches: 0 }, null, 2));
