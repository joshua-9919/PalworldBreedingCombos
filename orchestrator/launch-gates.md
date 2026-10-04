# Production Launch Gate — 2026-07-18

Status: `PRODUCTION_LIVE_DOMAIN_SMOKE_PASS`（2026-09-13 复验：`QA_GO / SEO_GO_PENDING_INDEX_REFRESH`）

## Completed

- Owner publication approval recorded for an individual-operated, free, ad-free, affiliate-free, payment-free, unofficial fan tool without game media assets.
- Operator public name: `Palworld Breeding Combos`; governing law and jurisdiction: Republic of Indonesia.
- Production dataset promoted and validated: 300 Pals, 44,851 combinations, dataset `palcalc-v26-v1.17.6-owner-approved-20260718`.
- Production build, site check, compliance check, chain-engine check and pair-engine check passed.
- Git commit `985d664` pushed to `origin/agent/site-foundation`.
- Cloudflare Pages project `palworld-breeding-combos` created and production deployment completed.
- Production Pages URL: <https://palworld-breeding-combos.pages.dev/>.
- Deployment URL: <https://76fdec13.palworld-breeding-combos.pages.dev/>.
- Live smoke: HTTP 200; security headers present; homepage `index,follow`; canonical points to the primary domain; robots allows crawling; sitemap contains nine approved URLs; formula guide is `noindex,nofollow` and excluded from sitemap.
- Cloudflare custom domains attached: <https://palworldbreedingcombos.com/> and <https://www.palworldbreedingcombos.com/>.
- Final domain smoke: both hosts return HTTP 200; both publish the root-domain canonical; root robots allows search crawling and references the production sitemap.
- Public contact address: `contact@palworldbreedingcombos.com`; Cloudflare Email Routing is enabled with locked DNS records and an active route to the Owner's verified private destination. The private destination address is not published by the site or repository.

## Post-launch verification

- Google Search Console domain ownership is verified and the production sitemap was submitted successfully (10 URLs).
- Bing Webmaster Tools accepted the production sitemap successfully (10 URLs).
- Plausible privacy-friendly analytics is installed using the Owner-provided site script from `plausible.shipsolo.io`; Privacy discloses the provider and aggregate-measurement purpose. The dashboard received the first QA visit.
- Public promotion is authorized within platform rules. Pinterest, Product Hunt, and the public GitHub repository have been executed; Reddit external-link promotion remains permission-gated. The Palworld Wiki editorial-review request was publicly submitted on 2026-07-26, followed up once on 2026-08-03, and remains awaiting editor review. No further reminder is planned.
- The 2026-07-19 full-site QA covered desktop and 390 px mobile tasks, all primary controls, 10 content/legal pages and production HTTP/SEO delivery. The site now has 13 public pages and 12 indexable sitemap URLs, including `/how-to-use/`.
- An SEO defect on the generic 404 was repaired: it now emits `noindex,nofollow`, no canonical/`og:url` and no JSON-LD, with automated regression coverage.
- Production QA found no P0 or remaining P1 defects. The dataset transfers as 340 KB gzip in the current check but remains a P2 parse/cache monitor; the `www` canonical-host redirect remains P2.

## 2026-09-13 update

- The 2026-09-06 optimization build (route-level dataset lazy-loading, analytics events, copy-share-link, `_redirects`) was deployed to production by the Owner; production matches `analytics.js?v=471e067365bb` and source commit `3f68988` was pushed to `origin/agent/site-foundation`.
- `www` → root 301 now live (path+query preserved); the long-standing P2 redirect item is closed.
- Plausible site configured (`pa-Tuwmm86GExPpwNCxPPO8b.js`); `calculate` and `share` events verified reaching the endpoint via network capture during post-deploy Re-QA.
- Post-deploy independent Re-QA passed on desktop and 390×844 (no overflow, no console errors); QA gate raised to GO.
- Evidence: `orchestrator/ops-review-2026-09-13.md`.

## 2026-10-04 update

- Dataset refreshed from palcalc v1.17.6 to v1.22.0 (upstream released 2026-09-18). Full semantic diff: all 44,851 combinations identical; only user-visible change is the `ElecSnail_Ground` English display-name correction (Snock Lux → Snock Terra) plus localized-name fixes. Legacy name/slug retained as lookup aliases so pre-rename share URLs keep resolving.
- Pipeline evidence: import → validate (valid) → cross-source (6 assertions pass) → fresh palworld.tools snapshot verify (288/288 pals, 251/251 comparable combos, 0 power mismatches) → old-vs-new diff (8 metadata fields only) → promote with owner update approval `data/approvals/owner-dataset-update-2026-10-04.json` → production validation pass.
- Production dataset: `palcalc-v28-v1.22.0-owner-approved-20261004`; source ledger `data/source-ledger/palcalc-v1.22.0.candidate.json`.
- Content: `/data-sources/` gained an "Upstream review log" section; `/guide/` gained a contextual link to `/how-to-use/`; IndexNow key file shipped at site root.
- Deploy: commit `073d3fd` pushed to `origin/agent/site-foundation` (Preview `4090ee89` verified) and fast-forwarded to `origin/main` (production); production live ~45 s after push.
- Post-deploy smoke: 13 routes 200; `www`→root 301 preserved; dataset strip shows `updated 2026-10-04`; legacy `?parentA=snock-lux` share URL resolves to `163B · Snock Terra`; `calculate` event fires with new slug (`snock-terra`, result `sibelyx`); non-tool pages still lazy (0 dataset injections); console 0 errors; `analytics.js?v=471e067365bb` unchanged.
- IndexNow: submitted all 12 canonical URLs via api.indexnow.org with hosted key `4226991db07d14876d370fd11f5c3c28` — HTTP 202 accepted.
