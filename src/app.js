const root = document.documentElement;
const datasetUrl = root.dataset.datasetUrl;

let dataset;
let palsById;

const metaMarkup = () => {
  const manifest = dataset.manifest;
  return `<div class="result-meta">
    <span>Game version <b>${escapeHtml(manifest.gameVersion)}</b></span>
    <span>Dataset <b>${escapeHtml(manifest.datasetVersion)}</b></span>
    <span>Source revision <b>${escapeHtml(manifest.sourceRevision)}</b></span>
    <span>Verification <b>${escapeHtml(manifest.verificationStatus)}</b></span>
  </div>`;
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function canonicalPair(a, b) {
  return [a, b].sort();
}

function findChild(parentAId, parentBId) {
  const parentA = palsById.get(parentAId);
  const parentB = palsById.get(parentBId);
  if (!parentA || !parentB) return { ok: false, code: "PAL_NOT_FOUND", message: "One selected Pal is not available in this dataset." };
  if (!parentA.breedable || !parentB.breedable) return { ok: false, code: "UNBREEDABLE", message: "One selected Pal is marked unbreedable in this dataset." };
  if (parentAId === parentBId) return { ok: true, child: parentA, rule: "same-species", verification: parentA.verificationStatus };
  const [a, b] = canonicalPair(parentAId, parentBId);
  const special = dataset.specialCombinations.find((combo) => combo.parentAId === a && combo.parentBId === b);
  if (special) return { ok: true, child: palsById.get(special.childId), rule: "special", verification: special.verificationStatus };
  return { ok: false, code: "NO_RESULT", message: "No validated result exists for this pair in the active dataset." };
}

function parentPairs(targetId) {
  return dataset.specialCombinations
    .filter((combo) => combo.childId === targetId)
    .map((combo) => ({ ...combo, parentA: palsById.get(combo.parentAId), parentB: palsById.get(combo.parentBId) }));
}

function renderError(output, message) {
  output.classList.remove("result-ready");
  output.innerHTML = `<div class="empty-egg" aria-hidden="true"><span></span></div>
    <p class="result-label">No validated result</p><h3>Check this selection</h3><p>${escapeHtml(message)}</p>${metaMarkup()}`;
}

function initParentsCalculator() {
  const form = document.querySelector("[data-parents-form]");
  if (!form) return;
  const output = document.querySelector("[data-result]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = findChild(form.parentA.value, form.parentB.value);
    if (!result.ok) return renderError(output, result.message);
    output.classList.add("result-ready");
    output.innerHTML = `<p class="result-label">Expected offspring</p>
      <h3 class="result-title">${escapeHtml(result.child.name)}</h3>
      <p>Rule type: ${escapeHtml(result.rule)}. Verification: ${escapeHtml(result.verification)}.</p>${metaMarkup()}`;
  });
}

function initTargetLookup() {
  const select = document.querySelector("[data-target-select]");
  const output = document.querySelector("[data-target-result]");
  if (!select || !output) return;
  const render = () => {
    const pairs = parentPairs(select.value);
    if (!pairs.length) return renderError(output, "No direct special parent pairs are validated for this target in the active dataset.");
    output.classList.add("result-ready");
    output.innerHTML = `<p class="result-label">Direct parent combinations</p><h3>${escapeHtml(palsById.get(select.value).name)}</h3>
      <div class="pair-list">${pairs.map((pair) => `<div class="pair-row"><span>${escapeHtml(pair.parentA.name)}</span><span>+</span><span>${escapeHtml(pair.parentB.name)}</span></div>`).join("")}</div>${metaMarkup()}`;
  };
  select.addEventListener("change", render);
  if (select.value) render();
}

function initOneParent() {
  const select = document.querySelector("[data-one-parent]");
  const output = document.querySelector("[data-one-result]");
  if (!select || !output) return;
  select.addEventListener("change", () => {
    output.classList.remove("hidden");
    const results = dataset.specialCombinations
      .filter((combo) => combo.parentAId === select.value || combo.parentBId === select.value)
      .map((combo) => ({ partner: palsById.get(combo.parentAId === select.value ? combo.parentBId : combo.parentAId), child: palsById.get(combo.childId) }));
    if (!results.length) return renderError(output, "No validated partner results exist for this Pal in the active dataset.");
    output.classList.add("result-ready");
    output.innerHTML = `<p class="result-label">Partner results</p><h3>${escapeHtml(palsById.get(select.value).name)}</h3><div class="pair-list">${results.map((item) => `<div class="pair-row"><span>+ ${escapeHtml(item.partner.name)}</span><span>→</span><span>${escapeHtml(item.child.name)}</span></div>`).join("")}</div>${metaMarkup()}`;
  });
}

function findShortestChain(ownedIds, targetId) {
  const available = new Set(ownedIds);
  const steps = [];
  if (available.has(targetId)) return { ok: true, steps };
  for (let generation = 0; generation < dataset.pals.length; generation += 1) {
    let changed = false;
    for (const combo of dataset.specialCombinations) {
      if (available.has(combo.parentAId) && available.has(combo.parentBId) && !available.has(combo.childId)) {
        available.add(combo.childId);
        steps.push(combo);
        changed = true;
        if (combo.childId === targetId) return { ok: true, steps };
      }
    }
    if (!changed) break;
  }
  return { ok: false, message: "No route was found under the current owned-Pals selection." };
}

function initChain() {
  const form = document.querySelector("[data-chain-form]");
  const output = document.querySelector("[data-chain-result]");
  if (!form || !output) return;
  const saved = JSON.parse(localStorage.getItem("pbc-owned-pals") || "[]");
  form.querySelectorAll("[name=owned]").forEach((input) => { input.checked = saved.includes(input.value); });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const owned = [...form.querySelectorAll("[name=owned]:checked")].map((input) => input.value);
    localStorage.setItem("pbc-owned-pals", JSON.stringify(owned));
    const result = findShortestChain(owned, form.target.value);
    if (!result.ok) return renderError(output, result.message);
    output.classList.add("result-ready");
    output.innerHTML = `<p class="result-label">Shortest available chain</p><h3>${result.steps.length ? `${result.steps.length} breeding step${result.steps.length === 1 ? "" : "s"}` : "Already in your Palbox"}</h3>
      <div class="pair-list">${result.steps.map((step) => `<div class="pair-row"><span>${escapeHtml(palsById.get(step.parentAId).name)} + ${escapeHtml(palsById.get(step.parentBId).name)}</span><span>→</span><span>${escapeHtml(palsById.get(step.childId).name)}</span></div>`).join("")}</div>${metaMarkup()}`;
  });
  const clear = document.querySelector("[data-clear-owned]");
  clear?.addEventListener("click", () => {
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
    initParentsCalculator();
    initTargetLookup();
    initOneParent();
    initChain();
  } catch (error) {
    document.querySelectorAll("[data-result], [data-target-result], [data-one-result], [data-chain-result]").forEach((output) => {
      output.innerHTML = `<p class="result-label">Dataset unavailable</p><h3>No result calculated</h3><p>The breeding data could not be loaded. ${escapeHtml(error.message)}</p>`;
    });
  }
}

start();
