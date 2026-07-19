# Production QA Review — 2026-07-19

Status: `GO_WITH_P2`

## Scope

- Production origin: `https://palworldbreedingcombos.com`
- Desktop and 390 px mobile user journeys
- Calculator, All Combos, Chain Planner and How to Use
- Ten content/legal pages, unknown-route 404, metadata, canonical, robots, schema, sitemap and analytics delivery
- Local production build plus live HTTP checks

## Automated gates

- `npm run build:production`: PASS — 13 public pages, 14 HTML files including 404
- `npm run check`: PASS
- `npm run check:compliance`: PASS
- `npm run check:chain`: PASS
- `npm run check:pairs`: PASS
- `git diff --check`: PASS

## Real-user task results

- Homepage communicates the tool, audience, value and primary action within the first screen: PASS
- Parent pair `Dinossom Lux + Wumpo Botan` returns `Nyafia` and preserves URL state: PASS
- Invalid calculator input shows a clear error: PASS
- All Combos target lookup, Show all, one-parent lookup, Enter-key submit and URL state: PASS
- Chain Planner empty-state validation, Palbox add, constraints, one-step route, URL state and local persistence: PASS
- How to Use navigation, FAQ disclosure and guide links: PASS
- Mobile navigation and all four primary tools at 390 px, with no horizontal overflow: PASS
- Ten content/legal routes each have one H1, title, description, correct canonical, intended robots directive and working navigation/footer: PASS

## Production delivery checks

- Root HTTPS and security headers: PASS
- Unknown route returns HTTP 404 and a useful recovery page: PASS
- `robots.txt` and sitemap are reachable; sitemap contains 12 indexable URLs: PASS
- Plausible script endpoint returns HTTP 200: PASS
- Dataset endpoint returns HTTP 200 with gzip. Measured transfer: 340,046 bytes in 0.37 s from the QA environment: PASS WITH MONITORING

## Defect found and repaired

The generic 404 initially exposed `index,follow`, a `/404/` canonical and JSON-LD. This could invite indexing of an error page. The build now emits `noindex,nofollow` for 404, omits canonical/`og:url`, and omits structured data. The site checker now enforces those rules. Local browser regression confirmed the corrected metadata, recovery link and absence of viewport overflow.

## Remaining P2 items

1. `www.palworldbreedingcombos.com` returns 200 instead of redirecting to the canonical root host. Canonicals reduce duplication risk, but a Cloudflare 301 remains preferable.
2. The source dataset is 7.54 MB uncompressed and is delivered with `max-age=0` / dynamic cache status. Gzip makes current transfer acceptable, but parse cost and cache policy should be monitored on slower devices.
3. No representative production cohort exists yet, so conversion and retention are not acceptance evidence.

## Verdict

P0: 0. P1: 0 after repair. P2: 3. The site is suitable to remain live. Public promotion is still outside the current authorization.
