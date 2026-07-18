export function buildParentPairs({ targetId, pals, combinations }) {
  const palsById = new Map(pals.map((pal) => [pal.id, pal]));
  const target = palsById.get(targetId);
  const pairs = combinations.filter((combo) => combo.childId === targetId)
    .map((combo) => ({ ...combo, parentA: palsById.get(combo.parentAId), parentB: palsById.get(combo.parentBId) }));
  if (target?.breedable && !pairs.some((pair) => pair.parentAId === targetId && pair.parentBId === targetId)) {
    pairs.unshift({
      parentAId: targetId,
      parentAGender: "WILDCARD",
      parentBId: targetId,
      parentBGender: "WILDCARD",
      childId: targetId,
      verificationStatus: target.verificationStatus,
      parentA: target,
      parentB: target
    });
  }
  return pairs;
}
