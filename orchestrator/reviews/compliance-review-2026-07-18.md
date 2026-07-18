# Compliance Recheck

Date: 2026-07-18
Scope: implemented fixture build and source contracts
Status: COMPLIANCE_GO_FOR_QA / OWNER_REVIEW_BEFORE_PRODUCTION

## Data-flow comparison

| Contract | Implemented behavior | Result |
|---|---|---|
| Owned Pals local only | localStorage key `pbc-owned-pals`; no upload | PASS |
| No login/payment/upload | none implemented | PASS |
| No analytics/ads by default | no analytics or advertising scripts | PASS |
| Hosting logs disclosed | Privacy describes future hosting/security logs | PASS, verify provider at launch |
| Legal routes | Privacy, Terms, Disclaimer and Data Sources return 200 | PASS |
| Unofficial status | footer, FAQ, About and Disclaimer disclose it | PASS |
| Asset policy | original CSS/SVG graphics; no Pal art/screenshots | PASS |
| Dataset provenance | pinned ledger, hashes, transform, two-source correction and full public snapshot comparison recorded | PASS for QA; Owner publication-risk review before launch |
| Official fan-content boundary | Pocketpair guideline reviewed; free/ad-free/unofficial/no-art scope enforced | PASS for current MVP |

## Claim scan

- No `official`, endorsement, `100% accurate`, guaranteed or `free forever` claim is used as a product promise.
- Fixture status is prominent and cannot be confused with launch data.
- Production formula and completeness claims are withheld pending evidence.
- WebApplication schema states only implemented free functionality.

## Remaining decisions/evidence

- P1: operator identity, governing law and jurisdiction-specific limitation wording require Owner/legal review.
- P1: Pocketpair's derivative-work guideline does not expressly approve calculator databases and restricts highly commercial/profit-oriented use; keep launch free of ads, affiliate links and payments unless separately reviewed or permitted.
- P1: verify actual Cloudflare cookies/logs/headers against Privacy after deployment.
- P1: any future analytics/ads require provider disclosure and consent/opt-out review before scripts load.
- P2: establish a real maintained data-correction/contact channel before publishing one.

## Gate

- Local implementation compliance: GO.
- COMPLIANCE_GO for QA: GO for the current free, ad-free, text/data-first MVP.
- Production publication: WAITING_OWNER for operator/legal fields and explicit publication-risk acceptance.
- No payment/refund policy is required for the current free MVP.

[DONE]
