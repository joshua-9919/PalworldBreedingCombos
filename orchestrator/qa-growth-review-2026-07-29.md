# Production QA, Data Review, and Backlink Audit — 2026-07-29

## Decision

- QA: `CONDITIONAL_GO`
- Growth: `ITERATE_WITH_EARLY_SEARCH_TRACTION`
- P0: 0
- P1: 0
- P2: 3
- No new public submission or outreach was performed in this audit.

## Functional and technical QA

- Production build: PASS — 300 Pals, 44,851 combinations, approved Palworld 1.0 dataset.
- Automated checks: PASS — site, compliance, chain engine, and pair engine.
- HTTP smoke: PASS — home, combos, chain, how-to, guide, data sources, Privacy, Terms, robots.txt, and sitemap.xml returned 200.
- Parent calculation: PASS — `Snock + Dinossom → Reindrix`, with URL state and Palworld 1.0 label.
- Reverse lookup: PASS — Anubis loaded 234 validated parent pairs, with 24 initially shown.
- Chain planner: PASS — saved `Dinossom Lux + Foxcicle` Palbox produced a 14-step route to Nyafia.
- Console: no page-level errors or warnings were observed on the tested core routes.
- Mobile 390 px: home, combos, chain, how-to, and guide had no document-level horizontal overflow.
- Defect found and fixed: `/data-sources/` expanded to 694 px because the source checksum could not wrap. `.prose code` now uses `overflow-wrap:anywhere` and `word-break:break-word`.

## SEO and indexing

- robots.txt: search crawling allowed; sitemap declared.
- sitemap.xml: 12 canonical URLs present and returned 200.
- Canonical/robots: tested pages use the root domain and `index,follow`.
- GSC performance available through 2026-07-27:
  - 65 clicks
  - 3,820 impressions
  - 1.7% CTR
  - average position 9.4
- Leading visible queries include `palworld breeding calculator 1.0`, `palworld breeding chain calculator`, `palworld 1.0 breeding calculator`, and `palworld breeding chain`.
- GSC page indexing, last updated 2026-07-24:
  - indexed: 5
  - discovered, not indexed: 7
  - redirect: 2
  - alternate with canonical: 1
- GSC external-links report was still processing and asked to check again later; it must not be treated as a zero-link report.

## Analytics review

Plausible, last 28 days:

- unique visitors: 225
- visits: 246
- pageviews: 482
- views per visit: 1.96
- bounce rate: 67%
- visit duration: 3m 22s

Visible sources:

- Direct / None: 154 visitors
- Google: 53
- Product Hunt: 6
- Baidu: 5
- Bing: 4
- DEV: 3
- Pinterest: 2
- GitHub: 1
- ChatGPT: 1

The direct cohort includes QA and owner traffic, so it is not valid to treat all 225 visitors as independent product-market evidence. Search traffic and the GSC query set are nevertheless confirmed early traction.

## Public backlink verification

| Surface | Status | Evidence |
|---|---|---|
| GitHub repository | LIVE | HTTP 200; README contains clickable links to the calculator and key routes; GitHub adds `nofollow`. |
| DEV article | LIVE | HTTP 200; main site and data-sources links visible; Plausible shows 3 visitors. |
| itch.io project | LIVE | HTTP 200; calculator and data-sources links visible; itch.io adds `nofollow`. It did not appear in the currently displayed Plausible top-source list. |
| Product Hunt | LIVE | Public product page, Upvote control, and two `Visit website` links verified; Plausible shows 6 visitors. |
| Pinterest | LIVE | Two earlier Pins plus nine scheduled Pins are public; all nine batch Pins returned 200 and contain the intended destination; Plausible shows 2 visitors. |
| Palworld Wiki Talk:Breeding | DISCUSSION_LINK_ONLY | Public request contains homepage and data-source links with `nofollow`; the single planned follow-up was published on 2026-08-03. No editor reply or editorial placement in the Breeding article yet. |
| Reddit r/Palworld | NO_BACKLINK | External-link promotion remains permission-gated. Current Rule 5 signals prohibit self-promotion; do not post the site without explicit moderator approval. |
| GSC external-links report | WAITING_PLATFORM_REFRESH | Report is still processing. |

## P2 follow-ups

1. Configure `www.palworldbreedingcombos.com` to 301 redirect to the root domain; it currently returns 200 even though canonical points to root.
2. Recheck the seven `Discovered - currently not indexed` URLs after Google refreshes the 2026-07-24 indexing report; do not resubmit the sitemap merely because the report is delayed.
3. Increase small mobile navigation/footer hit areas toward a 44 px touch target in a later design pass.

## Next backlink sequence

1. Wait for the Palworld Wiki editorial response. The one-time follow-up was completed on `2026-08-03`; do not follow up again or add the link directly to the article.
2. Prepare an original Palworld 1.0 Steam Community Guide focused on two-parent lookup, reverse lookup, and Owned Pals chains. Include one disclosed tool link only after the guide itself is complete and useful.
3. Ask a relevant Palworld Discord/community resource moderator for permission to share the free tool in a tools/resources channel. Treat this as referral/user-feedback acquisition, not guaranteed SEO equity.
4. Continue Reddit account warming and ordinary participation. Do not publish an external link unless r/Palworld moderators explicitly approve it.

Avoid bulk directory submissions, paid links, comment spam, copied guides, and unrelated AI-tool directories. The current evidence favors topical player communities over generic domain-count growth.
