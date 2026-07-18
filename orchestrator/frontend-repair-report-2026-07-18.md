# Frontend P1 Repair Report

Date: 2026-07-18

## Outcome

The locally actionable frontend and schema P1 findings are closed. The fixture build remains visibly synthetic and `noindex`; this repair does not unlock production publication.

## Implemented

- Replaced plain Pal selectors with accessible searchable text controls backed by a native datalist.
- Resolves exact Pal name, Paldeck number, display label, id, slug and aliases without fuzzy guessing.
- Added slug-based URL state for Parents to Child, Target to Parents, One Parent and Chain Planner modes.
- Added explicit invalid-shared-URL states when a slug is absent from the active dataset.
- Added Chain Planner constraints for legendary and unavailable/unbreedable Pals.
- Added route-appropriate WebSite, WebApplication, FAQPage, CollectionPage, ItemList, Article and BreadcrumbList JSON-LD.
- Extended build verification to parse each emitted JSON-LD block.

## Verification

- `node --check src/app.js`: PASS
- `node --check scripts/build-site.mjs`: PASS
- `node --check scripts/check-site.mjs`: PASS
- `npm run build:fixture`: PASS, 10 contracted pages
- `npm run check`: PASS, 11 HTML files including 404
- Headless browser shared parents URL restore/result render: PASS
- Headless browser unknown target shared URL invalid-state render: PASS
- `npm run build:production`: EXPECTED BLOCK, launch dataset is absent and fixture fallback is forbidden

## Remaining production gates

- Approved Palworld 1.0 launch dataset and completed provenance/source ledger.
- Verified normal breeding formula, rounding, tie handling and special-combination precedence.
- Production pair graph and entity-page inventory generated only after validation and uniqueness thresholds pass.
- Approved original social image, production deployment evidence, HTTPS/header checks, GSC/Bing and Owner/legal review.

[LOCAL_REPAIR_GO]
