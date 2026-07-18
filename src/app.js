const root = document.documentElement;
const datasetUrl = root.dataset.datasetUrl;

let dataset;
let palsById;
let palsByLookup;

const combinations = () => dataset.combinations || dataset.specialCombinations.map((combo) => ({
  ...combo, parentAGender: "WILDCARD", parentBGender: "WILDCARD"
}));

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

const displayPal = (pal) => pal ? `${pal.paldexNo} · ${pal.name}` : "";
const lookupKey = (value) => String(value ?? "").trim().toLowerCase();
const resolvePal = (value) => palsByLookup.get(lookupKey(value));
const setPalInput = (input, pal) => { input.value = displayPal(pal); };

function buildLookup() {
  palsByLookup = new Map();
  for (const pal of dataset.pals) {
    [pal.id, pal.slug, pal.name, pal.paldexNo, displayPal(pal), ...(pal.aliases || [])]
      .forEach((value) => palsByLookup.set(lookupKey(value), pal));
  }
}

function updateQuery(values) {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => { if (value) params.set(key, value); });
  history.replaceState(null, "", `${location.pathname}${params.size ? `?${params}` : ""}${location.hash}`);
}

const metaMarkup = () => {
  const manifest = dataset.manifest;
  return `<div class="result-meta"><span>Game version <b>${escapeHtml(manifest.gameVersion)}</b></span><span>Dataset <b>${escapeHtml(manifest.datasetVersion)}</b></span><span>Source revision <b>${escapeHtml(manifest.sourceRevision)}</b></span><span>Verification <b>${escapeHtml(manifest.verificationStatus)}</b></span></div>`;
};

function canonicalPair(a, b) { return [a, b].sort(); }

function findChild(parentAId, parentBId) {
  const parentA = palsById.get(parentAId);
  const parentB = palsById.get(parentBId);
  if (!parentA || !parentB) return { ok: false, message: "Enter a Pal name or Paldeck number from the suggestions." };
  if (!parentA.breedable || !parentB.breedable) return { ok: false, message: "One selected Pal is marked unbreedable in this dataset." };
  if (parentAId === parentBId) return { ok: true, child: parentA, rule: "same-species", verification: parentA.verificationStatus };
  const [a, b] = canonicalPair(parentAId, parentBId);
  const matches = combinations().filter((combo) => combo.parentAId === a && combo.parentBId === b);
  if (matches.length === 1) return { ok: true, child: palsById.get(matches[0].childId), rule: "versioned lookup", verification: matches[0].verificationStatus };
  if (matches.length > 1) return { ok: true, choices: matches, rule: "gender-dependent", verification: matches[0].verificationStatus };
  return { ok: false, message: "No validated result exists for this pair in the active dataset." };
}

const parentPairs = (targetId) => combinations().filter((combo) => combo.childId === targetId)
  .map((combo) => ({ ...combo, parentA: palsById.get(combo.parentAId), parentB: palsById.get(combo.parentBId) }));

function renderError(output, message, heading = "Check this selection") {
  output.classList.remove("result-ready", "hidden");
  output.innerHTML = `<div class="empty-egg" aria-hidden="true"><span></span></div><p class="result-label">No validated result</p><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(message)}</p>${metaMarkup()}`;
}

function initParentsCalculator(params) {
  const form = document.querySelector("[data-parents-form]");
  if (!form) return;
  const output = document.querySelector("[data-result]");
  const render = () => {
    const parentAInput = form.elements.namedItem("parentA");
    const parentBInput = form.elements.namedItem("parentB");
    const parentA = resolvePal(parentAInput.value);
    const parentB = resolvePal(parentBInput.value);
    const result = findChild(parentA?.id, parentB?.id);
    if (!result.ok) return renderError(output, result.message);
    updateQuery({ mode: "parents", parentA: parentA.slug, parentB: parentB.slug });
    if (result.choices) {
      output.classList.add("result-ready");
      output.innerHTML = `<p class="result-label">Gender-dependent offspring</p><h3>Parent genders change the child</h3><div class="pair-list">${result.choices.map((choice) => `<div class="pair-row"><span>${escapeHtml(palsById.get(choice.parentAId).name)} (${escapeHtml(choice.parentAGender.toLowerCase())}) + ${escapeHtml(palsById.get(choice.parentBId).name)} (${escapeHtml(choice.parentBGender.toLowerCase())})</span><span>→</span><span>${escapeHtml(palsById.get(choice.childId).name)}</span></div>`).join("")}</div>${metaMarkup()}`;
      return;
    }
    output.classList.add("result-ready");
    output.innerHTML = `<p class="result-label">Expected offspring</p><h3 class="result-title">${escapeHtml(result.child.name)}</h3><p>Rule type: ${escapeHtml(result.rule)}. Verification: ${escapeHtml(result.verification)}.</p>${metaMarkup()}`;
  };
  form.addEventListener("submit", (event) => { event.preventDefault(); render(); });
  if (params.get("mode") === "parents" && (params.has("parentA") || params.has("parentB"))) {
    const a = resolvePal(params.get("parentA"));
    const b = resolvePal(params.get("parentB"));
    if (!a || !b) return renderError(output, "This shared URL contains a Pal that is not available in the active dataset.", "Invalid shared URL");
    setPalInput(form.elements.namedItem("parentA"), a); setPalInput(form.elements.namedItem("parentB"), b); render();
  }
}

function initTargetLookup(params) {
  const input = document.querySelector("[data-target-select]");
  const output = document.querySelector("[data-target-result]");
  if (!input || !output) return;
  const render = () => {
    const target = resolvePal(input.value);
    if (!target) return renderError(output, "Enter a Pal name or Paldeck number from the suggestions.");
    updateQuery({ mode: "target", target: target.slug });
    const pairs = parentPairs(target.id);
    if (!pairs.length) return renderError(output, "No direct parent pairs are available for this target in the active dataset.");
    output.classList.add("result-ready");
    output.innerHTML = `<p class="result-label">Direct parent combinations</p><h3>${escapeHtml(target.name)}</h3><div class="pair-list">${pairs.map((pair) => `<div class="pair-row"><span>${escapeHtml(pair.parentA.name)}${pair.parentAGender !== "WILDCARD" ? ` (${escapeHtml(pair.parentAGender.toLowerCase())})` : ""}</span><span>+</span><span>${escapeHtml(pair.parentB.name)}${pair.parentBGender !== "WILDCARD" ? ` (${escapeHtml(pair.parentBGender.toLowerCase())})` : ""}</span></div>`).join("")}</div>${metaMarkup()}`;
  };
  input.addEventListener("change", render);
  if (params.has("target")) {
    const target = resolvePal(params.get("target"));
    if (!target) return renderError(output, "This shared target is not available in the active dataset.", "Invalid shared URL");
    setPalInput(input, target); render();
  }
}

function initOneParent(params) {
  const input = document.querySelector("[data-one-parent]");
  const output = document.querySelector("[data-one-result]");
  if (!input || !output) return;
  const render = () => {
    output.classList.remove("hidden");
    const parent = resolvePal(input.value);
    if (!parent) return renderError(output, "Enter a Pal name or Paldeck number from the suggestions.");
    updateQuery({ mode: "one-parent", parent: parent.slug });
    const results = combinations().filter((combo) => combo.parentAId === parent.id || combo.parentBId === parent.id)
      .map((combo) => {
        const parentIsA = combo.parentAId === parent.id;
        return {
          partner: palsById.get(parentIsA ? combo.parentBId : combo.parentAId),
          parentGender: parentIsA ? combo.parentAGender : combo.parentBGender,
          partnerGender: parentIsA ? combo.parentBGender : combo.parentAGender,
          child: palsById.get(combo.childId)
        };
      });
    if (!results.length) return renderError(output, "No validated partner results exist for this Pal in the active dataset.");
    output.classList.add("result-ready");
    output.innerHTML = `<p class="result-label">Partner results</p><h3>${escapeHtml(parent.name)}</h3><div class="pair-list">${results.map((item) => `<div class="pair-row"><span>${item.parentGender !== "WILDCARD" ? `${escapeHtml(item.parentGender.toLowerCase())} + ` : "+ "}${escapeHtml(item.partner.name)}${item.partnerGender !== "WILDCARD" ? ` (${escapeHtml(item.partnerGender.toLowerCase())})` : ""}</span><span>→</span><span>${escapeHtml(item.child.name)}</span></div>`).join("")}</div>${metaMarkup()}`;
  };
  input.addEventListener("change", render);
  if (params.has("parent")) {
    const parent = resolvePal(params.get("parent"));
    if (!parent) return renderError(output, "This shared parent is not available in the active dataset.", "Invalid shared URL");
    setPalInput(input, parent); render();
  }
}

function findShortestChain(ownedIds, targetId, constraints) {
  const available = new Set(ownedIds);
  const steps = [];
  if (available.has(targetId)) return { ok: true, steps };
  const allowed = (pal) => pal && (!constraints.excludeLegendary || pal.rarityClass !== "legendary") && (!constraints.excludeUnavailable || (pal.breedable && pal.availability !== "unavailable"));
  for (let generation = 0; generation < dataset.pals.length; generation += 1) {
    let changed = false;
    for (const combo of combinations()) {
      if (combo.parentAGender !== "WILDCARD" || combo.parentBGender !== "WILDCARD") continue;
      const involved = [combo.parentAId, combo.parentBId, combo.childId].map((id) => palsById.get(id));
      if (!involved.every(allowed)) continue;
      if (available.has(combo.parentAId) && available.has(combo.parentBId) && !available.has(combo.childId)) {
        available.add(combo.childId); steps.push(combo); changed = true;
        if (combo.childId === targetId) return { ok: true, steps };
      }
    }
    if (!changed) break;
  }
  return { ok: false, message: "No route was found. Try adding owned Pals or relaxing one of the active constraints." };
}

function initChain(params) {
  const form = document.querySelector("[data-chain-form]");
  const output = document.querySelector("[data-chain-result]");
  if (!form || !output) return;
  const saved = JSON.parse(localStorage.getItem("pbc-owned-pals") || "[]");
  form.querySelectorAll("[name=owned]").forEach((input) => { input.checked = saved.includes(input.value); });
  const render = () => {
    const targetInput = form.elements.namedItem("target");
    const target = resolvePal(targetInput.value);
    if (!target) return renderError(output, "Enter a target Pal name or Paldeck number from the suggestions.");
    const owned = [...form.querySelectorAll("[name=owned]:checked")].map((input) => input.value);
    localStorage.setItem("pbc-owned-pals", JSON.stringify(owned));
    const constraints = {
      excludeLegendary: form.elements.namedItem("excludeLegendary").checked,
      excludeUnavailable: form.elements.namedItem("excludeUnavailable").checked
    };
    updateQuery({ target: target.slug, excludeLegendary: constraints.excludeLegendary ? "1" : "", excludeUnavailable: constraints.excludeUnavailable ? "1" : "" });
    const result = findShortestChain(owned, target.id, constraints);
    if (!result.ok) return renderError(output, result.message);
    output.classList.add("result-ready");
    output.innerHTML = `<p class="result-label">Shortest available chain</p><h3>${result.steps.length ? `${result.steps.length} breeding step${result.steps.length === 1 ? "" : "s"}` : "Already in your Palbox"}</h3><div class="pair-list">${result.steps.map((step) => `<div class="pair-row"><span>${escapeHtml(palsById.get(step.parentAId).name)} + ${escapeHtml(palsById.get(step.parentBId).name)}</span><span>→</span><span>${escapeHtml(palsById.get(step.childId).name)}</span></div>`).join("")}</div>${metaMarkup()}`;
  };
  form.addEventListener("submit", (event) => { event.preventDefault(); render(); });
  if (params.has("target")) {
    const target = resolvePal(params.get("target"));
    if (!target) renderError(output, "This shared target is not available in the active dataset.", "Invalid shared URL");
    else setPalInput(form.elements.namedItem("target"), target);
    form.elements.namedItem("excludeLegendary").checked = params.get("excludeLegendary") === "1";
    form.elements.namedItem("excludeUnavailable").checked = params.get("excludeUnavailable") === "1";
  }
  document.querySelector("[data-clear-owned]")?.addEventListener("click", () => {
    localStorage.removeItem("pbc-owned-pals");
    form.querySelectorAll("[name=owned]").forEach((input) => { input.checked = false; });
  });
}

async function start() {
  try {
    const response = await fetch(datasetUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    dataset = await response.json();
    palsById = new Map(dataset.pals.map((pal) => [pal.id, pal]));
    buildLookup();
    const params = new URLSearchParams(location.search);
    initParentsCalculator(params); initTargetLookup(params); initOneParent(params); initChain(params);
  } catch (error) {
    document.querySelectorAll("[data-result], [data-target-result], [data-one-result], [data-chain-result]").forEach((output) => {
      output.innerHTML = `<p class="result-label">Dataset unavailable</p><h3>No result calculated</h3><p>The breeding data could not be loaded. ${escapeHtml(error.message)}</p>`;
    });
  }
}

start();
