# Compliance and Site Policy Plan v1

Status: NEEDS_REVIEW before production
Market: US / English
This is an implementation policy, not legal advice.

## 1. MVP data inventory

| Data/category | MVP behavior | Storage |
|---|---|---|
| Parent/target selections | calculator operation | browser memory/URL parameters |
| Owned Pals list | user convenience | localStorage on the user's device |
| Save files | not accepted in MVP | none |
| Account/contact/payment data | not collected in MVP | none |
| Essential hosting/security logs | may be processed by hosting provider | provider-controlled, disclose before launch |
| Analytics events | disabled until real property/ID is configured | `[待确认]` provider |
| Cookies | no non-essential cookies by default | none unless analytics/ads added |

## 2. Third-party service map

| Service | Status | Required action |
|---|---|---|
| Cloudflare Pages/DNS | planned | disclose hosting/security processing and link provider policy |
| GitHub | source/deployment workflow | not a user-facing data processor unless embedded features are added |
| GA4/Clarity | unconfigured | do not load until provider, IDs, consent behavior and Privacy copy are frozen |
| Ads/affiliate | not approved | new compliance and disclosure review before activation |
| Email/contact form | not planned | use no placeholder form; publish a real contact route only when available |

Pocketpair's official derivative-work guideline permits fan derivative works subject to prohibited activities, including highly commercial/profit-oriented use and content that could be mistaken for an official product. It does not expressly grant permission for a factual calculator/database. Therefore the launch-safe scope remains free, ad-free, affiliate-free, text/data-first and clearly unofficial; monetization requires a new review or express permission.

## 3. IP, brand and asset policy

- The site is independent and unofficial; it must not imply endorsement by Pocketpair or the Palworld team.
- `Palworld` and related names remain the property of their respective owners.
- Use the name only to identify the game and user task; do not adopt official logo/trade dress as the site's brand identity.
- Do not copy competitor text, UI, datasets, exports or images.
- Until rights are verified, use original abstract eggs, nodes, elemental glyphs and text-first Pal cards instead of official art.
- Every production dataset must document source, license/permission basis, revision/hash, transformation and verification status.
- Publicly observable game facts do not automatically grant permission to copy another site's curated database or media assets.
- Public calculators and databases are corroboration only. Do not store or redistribute their page HTML, bulk exports, prose, UI or artwork.

## 4. Accuracy and claim policy

Allowed:

- `Updated for Palworld 1.0` only when the displayed dataset actually targets that version.
- `Versioned data` and `Last checked ...` when backed by recorded metadata.
- `Find parent combinations` and `Plan a breeding chain` when implemented.

Prohibited without proof:

- `Official`, `official calculator`, `endorsed`.
- `100% accurate`, `guaranteed`, `always correct`.
- `Complete` or `all combinations` before roster/combo coverage is programmatically verified.
- `Real-time` when data is build-time/versioned.
- `Free forever`, `unlimited forever`.
- Statements that another tool is wrong unless supported by reproducible version evidence.

## 5. Required legal routes

- `/privacy/`: actual data collection, localStorage, hosting logs, optional future analytics, choices and update date.
- `/terms/`: permitted use, no warranty, service/data changes, prohibited abuse, limitation language appropriate to the operator's jurisdiction `[Owner/legal review]`.
- `/disclaimer/`: unofficial fan-made status, trademark attribution, game/data accuracy boundary and no affiliation.
- `/data-sources/`: technical provenance, version/changelog and correction process; not a replacement for legal pages.

No refund route is needed while there is no payment. Add refund/cancellation terms before any paid feature.

## 6. Cookie behavior

- MVP without analytics/ads: no cookie banner merely for decoration; Privacy must accurately state the behavior.
- If non-essential analytics or ads are enabled, implement the required consent/opt-out behavior for target regions before scripts load.
- Never claim `no cookies` if Cloudflare/app configuration later sets cookies; verify production response headers.

## 7. Product and frontend requirements

- Footer links to Privacy, Terms, Disclaimer, Data Sources and About must return canonical 200 pages.
- Add concise unofficial-site language in the footer and Disclaimer, without overwhelming the calculator.
- Owned-Pals UI states that the list stays on the device for MVP.
- Do not ship a nonfunctional contact form or fake email address.
- Include a correction/report-data-issue path only after a real maintained channel is configured.

## 8. Risk register

- P0: production dataset has no documented source/permission/transformation trail — BLOCK launch.
- P0: site implies official affiliation or uses unapproved copied assets — BLOCK launch.
- P1: analytics/ads load before Privacy and consent behavior match reality — repair before launch.
- P1: `all/complete/accurate` claims exceed verified coverage — repair copy.
- P1: legal/footer routes are missing or 404 — repair before QA_GO.
- P2: formal legal review for operator identity, governing law and limitation wording remains Owner responsibility before production.
- P1: Pocketpair's published derivative-work guideline does not expressly cover this calculator/database and prohibits highly commercial or profit-oriented use — keep the MVP non-monetized and obtain a fresh review before ads, affiliate links or payments.

## 9. Compliance Gate

- MVP functional scope is sufficiently defined: PASS.
- Data inventory and third-party map: PASS WITH LAUNCH VERIFICATION.
- IP/source policy: PASS AS CONTRACT; production data evidence still required.
- Legal route contract: PASS.
- Production compliance status: NEEDS_REVIEW.

[NEEDS_REVIEW]
