# Route Contract v1

Canonical origin: `https://palworldbreedingcombos.com`

| Route | Index | Canonical | Page type | Required data | Schema |
|---|---:|---|---|---|---|
| `/` | yes | self | calculator/home | roster, combinations, dataset meta | WebApplication, FAQPage, WebSite |
| `/combos/` | yes | self | combo directory | roster, pair counts, filters | CollectionPage, ItemList |
| `/chain/` | yes | self | chain tool | roster, combinations | WebApplication, FAQPage |
| `/how-to-use/` | yes | self | product walkthrough | interface instructions, active example | HowTo, BreadcrumbList |
| `/guide/` | yes | self | guide hub | editorial facts/citations | Article, BreadcrumbList |
| `/guide/breeding-basics/` | yes | self | beginner guide | original editorial copy, official overview link | Article, FAQPage, BreadcrumbList |
| `/guide/breeding-formula/` | yes | self | guide | formula, exceptions, examples | Article, FAQPage, BreadcrumbList |
| `/breeding/{pal-slug}/` | yes | self | entity guide/tool | unique Pal record, direct pairs, notable offspring | Article, BreadcrumbList, ItemList |
| `/data-sources/` | yes | self | trust/changelog | dataset metadata and source policy | WebPage, BreadcrumbList |
| `/about/` | yes | self | identity | site ownership/contact policy | AboutPage |
| `/privacy/` | yes | self | legal | frozen policy copy | WebPage |
| `/terms/` | yes | self | legal | frozen policy copy | WebPage |
| `/disclaimer/` | yes | self | legal/trust | IP and accuracy disclaimer | WebPage |
| `/search/` | no | `/combos/` | internal search | client filters | none |
| parameter/filter states | no | owning clean route | interaction state | client state | none |
| unknown route | no | none | 404 | suggestions | none |

## URL rules

- Lowercase ASCII slugs with hyphens.
- One canonical slug per Pal; aliases redirect or resolve without creating indexable duplicates.
- Query parameters may preselect calculator state but canonicalize to the clean owning route.
- Entity pages are emitted only when validation and unique-value thresholds pass.
- Sitemap contains canonical 200-status indexable URLs only.
- Trailing slash convention is required and consistent across internal links, canonical and sitemap.

## Navigation contract

Primary: Calculator, All Combos, Chain Planner, How to Use.
Trust/footer: How to Use, Breeding Guide, Breeding Basics, Data Sources, About, Privacy, Terms, Disclaimer.

## Owner Review entry

After SEO_GO, COMPLIANCE_GO, PM_GO and QA_GO, the Owner reviews the local/preview build and explicitly approves or declines production deployment, DNS binding and public promotion.
