# SEO / GEO / AEO Review

Date: 2026-07-18
Scope: local fixture build from `agent/site-foundation`
Status: LOCAL_TECHNICAL_PASS / PRODUCTION_BLOCKED

## Evidence checked

- Route Contract and SEO Copy Freeze.
- Generated HTML, `robots.txt`, `sitemap.xml`, canonical and metadata.
- `npm run build:fixture` and `npm run check`.
- Local HTTP smoke and browser screenshots.
- Production build fail-closed behavior.

## Local technical findings

### Pass

- Every contracted static route has one unique title, description, H1 and self-canonical.
- Footer/internal navigation links resolve to built pages; no `#` placeholder links remain.
- Fixture HTML is `noindex,nofollow` and fixture robots disallows crawling.
- Fixture sitemap is now empty, so no noindex canonical is submitted.
- Production mode is the only mode that can emit indexable pages and a populated sitemap.
- Open Graph title, description and URL are generated.
- Homepage visible copy has task definition, steps and FAQ suitable for answer extraction.
- `data-sources` exposes version, source revision, verification and known gaps.
- 404, favicon and crawler files exist and return 200 locally where applicable.

### Needs production evidence

- No production URL, HTTPS redirect, canonical response, Cloudflare headers or status-code evidence.
- GSC and Bing verification/submission are not configured.
- Crawler Hints and IndexNow are not configured.
- No GA4/Clarity or equivalent acquisition baseline.
- `missing_ahrefs_access`: no Ahrefs audit was run.

### Content/schema gaps before SEO_GO

- Entity pages are intentionally absent until verified launch records meet the unique-value gate.
- Route-level WebSite, WebApplication, FAQPage, CollectionPage, ItemList, Article and BreadcrumbList coverage is present for current pages; build checks parse every emitted JSON-LD block.
- OG image is absent; it requires an approved original asset before launch.
- Production formula/examples remain withheld until data validation; this is safer than publishing unsupported claims but leaves a competitive content gap.

## Risk classification

- P0: production accidentally built from fixture — prevented by validator.
- P0: indexable thin/entity pages from unverified data — currently prevented.
- CLOSED locally: current-route schema matrix and JSON parsing validation.
- P1: no production URL/GSC/Bing/HTTPS/Crawler Hints evidence.
- P1: no verified entity-page inventory or launch sitemap.
- P2: no OG image or Ahrefs audit.

## Gate

- Local indexability safety: GO.
- Local metadata/canonical/link structure: GO.
- Production SEO_GO: BLOCKED.
- QA entry: WAIT until PM and compliance reviews also GO.

[NEEDS_REVIEW]
