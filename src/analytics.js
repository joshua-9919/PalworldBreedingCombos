const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const storageKey = "pbc-utm-context";

function readUtmContext() {
  const fromUrl = Object.fromEntries(UTM_KEYS
    .filter((key) => new URLSearchParams(location.search).get(key))
    .map((key) => [key, new URLSearchParams(location.search).get(key)]));
  let saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(storageKey) || "{}");
  } catch {
    saved = {};
  }
  const context = { ...saved, ...fromUrl };
  if (Object.keys(fromUrl).length) {
    try { sessionStorage.setItem(storageKey, JSON.stringify(context)); } catch { /* storage is optional */ }
  }
  return context;
}

const context = readUtmContext();

window.pbcTrack = (name, props = {}) => {
  const eventProps = Object.fromEntries(Object.entries({ ...context, ...props })
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .slice(0, 12));
  if (typeof window.plausible === "function") window.plausible(name, { props: eventProps });
};

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.origin === location.origin || !/^https?:$/.test(url.protocol)) return;
  window.pbcTrack("outbound-click", { host: url.host, path: url.pathname });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-share-result]")) return;
  window.pbcTrack("share", { path: location.pathname, mode: new URLSearchParams(location.search).get("mode") || "default" });
});
