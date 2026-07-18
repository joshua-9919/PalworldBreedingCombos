# SEO / GEO / AEO Review

Date: 2026-07-18
Scope: full 300-Pal candidate preview from `agent/site-foundation`
Status: SEO_GO_FOR_QA / PRODUCTION_SUBMISSION_BLOCKED

## Evidence checked

- Route Contract and SEO Copy Freeze.
- Generated HTML, `robots.txt`, `sitemap.xml`, canonical and metadata.
- `npm run build:candidate -- /tmp/pbc-launch-candidate.json`, site/compliance/data checks and headless-browser candidate loading.
- Local HTTP smoke and browser screenshots.
- Production build fail-closed behavior.

## Local technical findings

### Pass

- Every contracted static route has one unique title, description, H1 and self-canonical.
- Footer/internal navigation links resolve to built pages; no `#` placeholder links remain.
- Fixture HTML is `noindex,nofollow` and fixture robots disallows crawling.
- Fixture sitemap is now empty, so no noindex canonical is submitted.
- Production mode is the only mode that can emit indexable pages and a populated sitemap.
- Candidate mode renders the complete 300-Pal / 44,851-combination graph while remaining `noindex,nofollow` with an empty sitemap.
- Open Graph title, description and URL are generated.
- Homepage visible copy has task definition, steps and FAQ suitable for answer extraction.
- Homepage now contains all five frozen FAQ answers, matching FAQ schema, and every result exposes game version, dataset revision, generated date, source revision and verification state.
- `data-sources` exposes version, source revision, verification and known gaps.
- 404, favicon and crawler files exist and return 200 locally where applicable.

### Needs production evidence

- No production URL, HTTPS redirect, canonical response, Cloudflare headers or status-code evidence.
- GSC and Bing verification/submission are not configured.
- Crawler Hints and IndexNow are not configured.
- No GA4/Clarity or equivalent acquisition baseline.
- `missing_ahrefs_access`: no Ahrefs audit was run.

### Content/schema gaps before SEO_GO

- Entity pages are intentionally absent until verified launch records meet the unique-value gate; they are an SEO expansion gate, not a blocker for candidate QA of the calculator routes.
- Route-level WebSite, WebApplication, FAQPage, CollectionPage, ItemList, Article and BreadcrumbList coverage is present for current pages; build checks parse every emitted JSON-LD block.
- Original 1200×630 OG image, app icons and manifest are present; they use the site's abstract lineage mark and no game artwork.
- Production formula/examples remain withheld. Before production, `/guide/breeding-formula/` must either receive verified unique content or be explicitly excluded from indexability and sitemap.

## Risk classification

- P0: production accidentally built from fixture — prevented by validator.
- P0: indexable thin/entity pages from unverified data — currently prevented.
- CLOSED locally: current-route schema matrix and JSON parsing validation.
- P1: no production URL/GSC/Bing/HTTPS/Crawler Hints evidence.
- P1: no verified entity-page inventory or launch sitemap.
- CLOSED locally: original OG/social image and manifest assets.
- P2: no Ahrefs audit (`missing_ahrefs_access`).

## Gate

- Local indexability safety: GO.
- Local metadata/canonical/link structure: GO.
- SEO_GO for candidate QA: GO.
- Production submission/indexing: BLOCKED until production URL, HTTPS/headers, final sitemap, formula-page indexability, GSC/Bing and Crawler Hints are verified.
- QA entry: GO when PM review is also GO_FOR_QA.

[NEEDS_REVIEW]
