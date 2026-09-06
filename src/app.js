import { findShortestChain } from "./chain-engine.js";
import { buildParentPairs } from "./pair-engine.js";

const root = document.documentElement;
const datasetUrl = root.dataset.datasetUrl;

let dataset;
let palsById;
let palsByLookup;

const track = (name, props = {}) => window.pbcTrack?.(name, props);

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

function shareMarkup() {
  return '<div class="result-actions"><button class="button secondary share-button" type="button" data-share-result>Copy share link</button><span class="share-feedback" data-share-feedback role="status" aria-live="polite"></span></div>';
}

const metaMarkup = () => {
  const manifest = dataset.manifest;
  const generated = new Date(manifest.generatedAt).toISOString().slice(0, 10);
  return `<div class="result-meta"><span>Game version <b>${escapeHtml(manifest.gameVersion)}</b></span><span>Dataset <b>${escapeHtml(manifest.datasetVersion)}</b></span><span>Generated <b>${escapeHtml(generated)}</b></span><span>Source revision <b>${escapeHtml(manifest.sourceRevision)}</b></span><span>Verification <b>${escapeHtml(manifest.verificationStatus)}</b></span></div>`;
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

const parentPairs = (targetId) => buildParentPairs({ targetId, pals: dataset.pals, combinations: combinations() });

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
      output.innerHTML = `<p class="result-label">Gender-dependent offspring</p><h3>Parent genders change the child</h3><div class="pair-list">${result.choices.map((choice) => `<div class="pair-row"><span>${escapeHtml(palsById.get(choice.parentAId).name)} (${escapeHtml(choice.parentAGender.toLowerCase())}) + ${escapeHtml(palsById.get(choice.parentBId).name)} (${escapeHtml(choice.parentBGender.toLowerCase())})</span><span>→</span><span>${escapeHtml(palsById.get(choice.childId).name)}</span></div>`).join("")}</div>${shareMarkup()}${metaMarkup()}`;
      track("calculate", { mode: "parents", result: "gender-dependent" });
      return;
    }
    output.classList.add("result-ready");
    output.innerHTML = `<p class="result-label">Expected offspring</p><h3 class="result-title">${escapeHtml(result.child.name)}</h3><p>Rule type: ${escapeHtml(result.rule)}. Verification: ${escapeHtml(result.verification)}.</p>${shareMarkup()}${metaMarkup()}`;
    track("calculate", { mode: "parents", result: result.child.slug });
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
  const oneParentOutput = document.querySelector("[data-one-result]");
  const runButton = document.querySelector("[data-run-target]");
  if (!input || !output) return;
  const render = () => {
    output.classList.remove("hidden");
    oneParentOutput?.classList.add("hidden");
    const target = resolvePal(input.value);
    if (!target) return renderError(output, "Enter a Pal name or Paldeck number from the suggestions.");
    updateQuery({ mode: "target", target: target.slug });
    const pairs = parentPairs(target.id);
    if (!pairs.length) return renderError(output, "No direct parent pairs are available for this target in the active dataset.");
    const renderPairs = (showAll = false) => {
      const visiblePairs = showAll ? pairs : pairs.slice(0, 24);
      output.classList.add("result-ready");
      output.innerHTML = `<p class="result-label">Direct parent combinations</p><h3>${escapeHtml(target.name)}</h3><p class="result-count">Showing ${visiblePairs.length.toLocaleString()} of ${pairs.length.toLocaleString()} validated pairs</p><div class="pair-list">${visiblePairs.map((pair) => `<div class="pair-row"><span>${escapeHtml(pair.parentA.name)}${pair.parentAGender !== "WILDCARD" ? ` (${escapeHtml(pair.parentAGender.toLowerCase())})` : ""}</span><span>+</span><span>${escapeHtml(pair.parentB.name)}${pair.parentBGender !== "WILDCARD" ? ` (${escapeHtml(pair.parentBGender.toLowerCase())})` : ""}</span></div>`).join("")}</div>${!showAll && pairs.length > visiblePairs.length ? `<button class="button secondary result-more" type="button" data-show-all-pairs>Show all ${pairs.length.toLocaleString()} combinations</button>` : ""}${shareMarkup()}${metaMarkup()}`;
      output.querySelector("[data-show-all-pairs]")?.addEventListener("click", () => renderPairs(true));
    };
    track("calculate", { mode: "target", target: target.slug, resultCount: pairs.length });
    renderPairs();
  };
  input.addEventListener("change", render);
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    render();
  });
  runButton?.addEventListener("click", render);
  if (params.has("target")) {
    const target = resolvePal(params.get("target"));
    if (!target) return renderError(output, "This shared target is not available in the active dataset.", "Invalid shared URL");
    setPalInput(input, target); render();
  }
}

function initOneParent(params) {
  const input = document.querySelector("[data-one-parent]");
  const output = document.querySelector("[data-one-result]");
  const targetOutput = document.querySelector("[data-target-result]");
  const runButton = document.querySelector("[data-run-one-parent]");
  if (!input || !output) return;
  const render = () => {
    output.classList.remove("hidden");
    targetOutput?.classList.add("hidden");
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
    output.innerHTML = `<p class="result-label">Partner results</p><h3>${escapeHtml(parent.name)}</h3><div class="pair-list">${results.map((item) => `<div class="pair-row"><span>${item.parentGender !== "WILDCARD" ? `${escapeHtml(item.parentGender.toLowerCase())} + ` : "+ "}${escapeHtml(item.partner.name)}${item.partnerGender !== "WILDCARD" ? ` (${escapeHtml(item.partnerGender.toLowerCase())})` : ""}</span><span>→</span><span>${escapeHtml(item.child.name)}</span></div>`).join("")}</div>${shareMarkup()}${metaMarkup()}`;
    track("calculate", { mode: "one-parent", parent: parent.slug, resultCount: results.length });
  };
  input.addEventListener("change", render);
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    render();
  });
  runButton?.addEventListener("click", render);
  if (params.has("parent")) {
    const parent = resolvePal(params.get("parent"));
    if (!parent) return renderError(output, "This shared parent is not available in the active dataset.", "Invalid shared URL");
    setPalInput(input, parent); render();
  }
}

function initChain(params) {
  const form = document.querySelector("[data-chain-form]");
  const output = document.querySelector("[data-chain-result]");
  if (!form || !output) return;
  const ownedInputs = [...form.querySelectorAll("[name=owned]")];
  const ownedSearch = form.querySelector("[data-owned-search]");
  const addOwnedButton = form.querySelector("[data-add-owned]");
  const ownedFeedback = form.querySelector("[data-owned-feedback]");
  const ownedSummary = form.querySelector("[data-owned-summary]");
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem("pbc-owned-pals") || "[]");
    if (!Array.isArray(saved)) saved = [];
  } catch {
    localStorage.removeItem("pbc-owned-pals");
  }
  ownedInputs.forEach((input) => { input.checked = saved.includes(input.value); });

  const selectedOwned = () => ownedInputs.filter((input) => input.checked);
  const refreshOwned = () => {
    const selected = selectedOwned();
    localStorage.setItem("pbc-owned-pals", JSON.stringify(selected.map((input) => input.value)));
    if (!ownedSummary) return;
    if (!selected.length) {
      ownedSummary.innerHTML = "<p>No owned Pals added yet.</p>";
      return;
    }
    ownedSummary.innerHTML = `<div class="owned-summary-head"><strong>${selected.length} selected</strong><span>Ready to plan</span></div><div class="owned-chips">${selected.map((input) => {
      const pal = palsById.get(input.value);
      return `<button type="button" data-remove-owned="${escapeHtml(input.value)}" aria-label="Remove ${escapeHtml(pal.name)} from my Palbox">${escapeHtml(pal.name)} <span aria-hidden="true">×</span></button>`;
    }).join("")}</div>`;
  };

  const addOwned = () => {
    const pal = resolvePal(ownedSearch?.value);
    const checkbox = pal && ownedInputs.find((input) => input.value === pal.id);
    if (!pal || !checkbox) {
      if (ownedFeedback) ownedFeedback.textContent = "Choose a breedable Pal from the suggestions first.";
      ownedSearch?.focus();
      return;
    }
    const wasSelected = checkbox.checked;
    checkbox.checked = true;
    if (ownedSearch) ownedSearch.value = "";
    if (ownedFeedback) ownedFeedback.textContent = wasSelected ? `${pal.name} is already in your Palbox.` : `${pal.name} added to your Palbox.`;
    refreshOwned();
    ownedSearch?.focus();
  };

  addOwnedButton?.addEventListener("click", addOwned);
  ownedSearch?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addOwned();
  });
  ownedInputs.forEach((input) => input.addEventListener("change", refreshOwned));
  ownedSummary?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-owned]");
    if (!button) return;
    const checkbox = ownedInputs.find((input) => input.value === button.dataset.removeOwned);
    if (checkbox) checkbox.checked = false;
    const pal = palsById.get(button.dataset.removeOwned);
    if (ownedFeedback && pal) ownedFeedback.textContent = `${pal.name} removed from your Palbox.`;
    refreshOwned();
  });
  refreshOwned();
  const render = () => {
    const targetInput = form.elements.namedItem("target");
    const target = resolvePal(targetInput.value);
    if (!target) return renderError(output, "Enter a target Pal name or Paldeck number from the suggestions.");
    const owned = selectedOwned().map((input) => input.value);
    if (!owned.length) return renderError(output, "Add at least one Pal you already own before building a chain.");
    localStorage.setItem("pbc-owned-pals", JSON.stringify(owned));
    const constraints = {
      excludeLegendary: form.elements.namedItem("excludeLegendary").checked,
      excludeUnavailable: form.elements.namedItem("excludeUnavailable").checked
    };
    updateQuery({ target: target.slug, excludeLegendary: constraints.excludeLegendary ? "1" : "", excludeUnavailable: constraints.excludeUnavailable ? "1" : "" });
    const result = findShortestChain({ ownedIds: owned, targetId: target.id, constraints, pals: dataset.pals, combinations: combinations() });
    if (!result.ok) return renderError(output, result.message);
    output.classList.add("result-ready");
    output.innerHTML = `<p class="result-label">Shortest available chain</p><h3>${result.steps.length ? `${result.steps.length} breeding step${result.steps.length === 1 ? "" : "s"}` : "Already in your Palbox"}</h3><div class="pair-list">${result.steps.map((step) => `<div class="pair-row"><span>${escapeHtml(palsById.get(step.parentAId).name)} + ${escapeHtml(palsById.get(step.parentBId).name)}</span><span>→</span><span>${escapeHtml(palsById.get(step.childId).name)}</span></div>`).join("")}</div>${shareMarkup()}${metaMarkup()}`;
    track("chain", { target: target.slug, steps: result.steps.length });
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
    ownedInputs.forEach((input) => { input.checked = false; });
    if (ownedSearch) ownedSearch.value = "";
    if (ownedFeedback) ownedFeedback.textContent = "Your Palbox is empty. Add at least one starting Pal.";
    refreshOwned();
  });
}

async function start() {
  if (!document.querySelector("[data-parents-form], [data-target-select], [data-one-parent], [data-chain-form]")) return;
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

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-share-result]");
  if (!button) return;
  const feedback = button.parentElement?.querySelector("[data-share-feedback]");
  try {
    await navigator.clipboard.writeText(location.href);
    if (feedback) feedback.textContent = "Link copied";
  } catch {
    if (feedback) feedback.textContent = "Copy failed — copy the URL from your address bar";
  }
});

start();
