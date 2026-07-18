import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const [debugOrigin = "http://127.0.0.1:9223", siteOrigin = "http://127.0.0.1:4173", datasetPath = "/tmp/pbc-launch-candidate.json", screenshotPath = "orchestrator/evidence/qa/candidate-mobile.png"] = process.argv.slice(2);
const dataset = JSON.parse(await readFile(resolve(datasetPath), "utf8"));
const firstCombo = dataset.combinations.find((combo) => combo.parentAGender === "WILDCARD" && combo.parentBGender === "WILDCARD");
const pals = new Map(dataset.pals.map((pal) => [pal.id, pal]));
const failures = [];
const consoleErrors = [];
const networkErrors = [];

const targets = await fetch(`${debugOrigin}/json/list`).then((response) => response.json());
const target = targets.find((entry) => entry.type === "page");
if (!target) throw new Error("No Chrome page target found");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolveOpen, reject) => {
  socket.addEventListener("open", resolveOpen, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let sequence = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve: resolveCall, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message)); else resolveCall(message.result);
  }
  if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") consoleErrors.push(JSON.stringify(message.params.args));
  if (message.method === "Runtime.exceptionThrown") consoleErrors.push(message.params.exceptionDetails.text);
  if (message.method === "Network.loadingFailed" && !message.params.canceled) networkErrors.push(message.params.errorText);
});
const call = (method, params = {}) => new Promise((resolveCall, reject) => {
  const id = ++sequence;
  pending.set(id, { resolve: resolveCall, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression, awaitPromise = false) => {
  const result = await call("Runtime.evaluate", { expression, awaitPromise, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
const navigate = async (path) => {
  await call("Page.navigate", { url: `${siteOrigin}${path}` });
  await delay(1200);
};
const check = (condition, label) => { if (!condition) failures.push(label); };

await call("Page.enable");
await call("Runtime.enable");
await call("Network.enable");
await call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });

await navigate("/");
const home = await evaluate(`({
  h1: document.querySelector('h1')?.textContent,
  banner: document.querySelector('.fixture-banner')?.textContent,
  noindex: document.querySelector('meta[name=robots]')?.content,
  overflow: document.documentElement.scrollWidth > innerWidth,
  faq: document.querySelectorAll('.faq details').length
})`);
check(home.h1 === "Palworld Breeding Calculator", "5-second test: homepage H1");
check(home.banner?.includes("Candidate preview"), "candidate review banner");
check(home.noindex === "noindex,nofollow", "candidate noindex");
check(home.overflow === false, "390px horizontal overflow");
check(home.faq === 5, "homepage five visible FAQs");

const parentA = pals.get(firstCombo.parentAId);
const parentB = pals.get(firstCombo.parentBId);
const child = pals.get(firstCombo.childId);
await navigate(`/?mode=parents&parentA=${parentA.slug}&parentB=${parentB.slug}`);
const parentResult = await evaluate(`({ title:document.querySelector('[data-result] .result-title')?.textContent, generated:document.querySelector('[data-result]')?.textContent.includes('Generated') })`);
check(parentResult.title === child.name, `parents→child expected ${child.name}`);
check(parentResult.generated, "result generated-date metadata");

await navigate("/combos/?target=astralym");
const targetResult = await evaluate(`document.querySelector('[data-target-result]')?.textContent`);
check(targetResult?.includes("Astralym") && !targetResult.includes("No direct parent pairs"), "Astralym target→parents same-species result");

await navigate(`/combos/?mode=one-parent&parent=${parentA.slug}`);
const oneParentResult = await evaluate(`({ hidden:document.querySelector('[data-one-result]')?.classList.contains('hidden'), text:document.querySelector('[data-one-result]')?.textContent })`);
check(!oneParentResult.hidden && oneParentResult.text?.includes(parentA.name), "one-parent partner results");

await navigate("/?mode=parents&parentA=not-a-real-pal&parentB=lamball");
const invalidResult = await evaluate(`document.querySelector('[data-result]')?.textContent`);
check(invalidResult?.includes("Invalid shared URL"), "invalid shared parent URL state");

await navigate("/chain/");
await evaluate(`localStorage.setItem('pbc-owned-pals', ${JSON.stringify(JSON.stringify([firstCombo.parentAId, firstCombo.parentBId]))})`);
await navigate(`/chain/?target=${child.slug}`);
await evaluate(`document.querySelector('[data-chain-form]').requestSubmit()`);
await delay(500);
const chainResult = await evaluate(`document.querySelector('[data-chain-result]')?.textContent`);
check(chainResult?.includes(child.name) && chainResult.includes("1 breeding step"), "owned Pals→chain direct result");
await evaluate(`document.querySelector('[data-clear-owned]').click()`);
check(await evaluate(`localStorage.getItem('pbc-owned-pals') === null`), "clear owned-Pals localStorage");

const routeStatuses = await evaluate(`Promise.all(['/privacy/','/terms/','/disclaimer/','/data-sources/','/about/','/404.html','/robots.txt','/sitemap.xml'].map(async path => [path,(await fetch(path)).status]))`, true);
for (const [path, status] of routeStatuses) check(status === 200, `${path} HTTP ${status}`);
const sitemapEmpty = await evaluate(`fetch('/sitemap.xml').then(r=>r.text()).then(t=>!t.includes('<url>'))`, true);
check(sitemapEmpty, "candidate sitemap must be empty");

const screenshot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
const absoluteScreenshot = resolve(screenshotPath);
await mkdir(dirname(absoluteScreenshot), { recursive: true });
await writeFile(absoluteScreenshot, Buffer.from(screenshot.data, "base64"));

check(consoleErrors.length === 0, `console errors: ${consoleErrors.join("; ")}`);
check(networkErrors.length === 0, `network errors: ${networkErrors.join("; ")}`);
socket.close();

const report = {
  status: failures.length ? "fail" : "pass",
  viewport: "390x844",
  tasks: 8,
  consoleErrors: consoleErrors.length,
  networkErrors: networkErrors.length,
  screenshot: absoluteScreenshot,
  failures
};
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
