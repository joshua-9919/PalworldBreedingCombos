export function findShortestChain({ ownedIds, targetId, constraints, pals, combinations }) {
  const palsById = new Map(pals.map((pal) => [pal.id, pal]));
  const available = new Set(ownedIds);
  const paths = new Map(ownedIds.map((id) => [id, []]));
  if (available.has(targetId)) return { ok: true, steps: [] };
  const allowed = (pal) => pal
    && (!constraints.excludeLegendary || pal.rarityClass !== "legendary")
    && (!constraints.excludeUnavailable || (pal.breedable && pal.availability !== "unavailable"));

  for (let generation = 0; generation < pals.length; generation += 1) {
    const discovered = new Map();
    for (const combo of combinations) {
      if (combo.parentAGender !== "WILDCARD" || combo.parentBGender !== "WILDCARD") continue;
      const involved = [combo.parentAId, combo.parentBId, combo.childId].map((id) => palsById.get(id));
      if (!involved.every(allowed)) continue;
      if (available.has(combo.parentAId) && available.has(combo.parentBId) && !available.has(combo.childId)) {
        const parentSteps = [...paths.get(combo.parentAId), ...paths.get(combo.parentBId)];
        const uniqueSteps = [...new Map([...parentSteps, combo].map((step) => [
          `${step.parentAId}|${step.parentBId}|${step.childId}`,
          step
        ])).values()];
        const existing = discovered.get(combo.childId);
        if (!existing || uniqueSteps.length < existing.length) discovered.set(combo.childId, uniqueSteps);
      }
    }
    if (!discovered.size) break;
    for (const [childId, path] of discovered) {
      available.add(childId);
      paths.set(childId, path);
    }
    if (paths.has(targetId)) return { ok: true, steps: paths.get(targetId) };
  }
  return { ok: false, message: "No route was found. Try adding owned Pals or relaxing one of the active constraints." };
}
