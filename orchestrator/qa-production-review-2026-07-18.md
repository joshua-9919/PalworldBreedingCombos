# Production QA Review — 2026-07-18

Status: `GO_WITH_P1`

## Acceptance result

- Build and automated checks: production build, site, compliance, chain engine and pair engine all PASS.
- Dataset: 300 Pals / 44,851 combinations; production verification label and source revision render in results.
- Core tasks: parents → child, target → parents (including Astralym same-species), one-parent lookup and invalid shared URL behavior PASS.
- Mobile 390×844 and desktop 1440×900 visual smoke PASS; no functional blocker observed.
- Site-origin console errors: 0. One logged error came from a Chrome extension and is excluded.
- Routes: 10 public routes return 200; unknown route returns 404; HTTP redirects to HTTPS.
- SEO/trust: root canonical, robots, 10-URL sitemap, legal routes, formula-guide noindex/exclusion and security headers PASS.
- Analytics: Plausible script returns 200 and the dashboard received a QA pageview.

## Defects and risks

| Priority | Finding | Impact | Required follow-up |
|---|---|---|---|
| P1 | `/assets/dataset.json` is 10,182,181 bytes; one uncached remote request took 14.1 s | Slow first interaction on weak/mobile connections; avoidable bandwidth | Minify/compress and split by use case or load indexes on demand; remeasure cold-load LCP and interaction readiness |
| P2 | `www` returns 200 instead of redirecting to root host | Duplicate-host crawl surface; canonical reduces but does not remove waste | Cloudflare Redirect Rule: `www` → root with 301, preserving path/query |
| P2 | Production is same-day and search/behavior samples are not representative | Cannot judge SEO/product-market fit | Keep baseline observation; do not Kill/Scale from QA traffic |

P0: none.

## Evidence

- `orchestrator/evidence/qa/production-mobile-2026-07-18.png`
- `orchestrator/evidence/qa/production-desktop-2026-07-18.png`
- `orchestrator/qa-review-2026-07-18.md` (candidate regression suite)

## Gate decision

The production site is safe to remain live. The next engineering action is the P1 payload optimization, followed by a cold-load production retest. Public promotion is outside this QA authorization.

[QA_GO_PRODUCTION_WITH_P1]
