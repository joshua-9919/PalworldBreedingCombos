# Palworld Breeding Combos — PRD v1

Status: DONE
Date: 2026-07-17
Primary domain: `palworldbreedingcombos.com`

## 1. Product definition

An independent, version-aware Palworld breeding planner that helps players calculate offspring, find parent combinations, and build the shortest practical route from Pals they already own.

### Site type

Hybrid calculator + versioned data product + programmatic entity guide.

### Primary ICP

Returning Palworld 1.0 players whose previous breeding combinations no longer work and who need a current answer before spending Cake and play time.

### Secondary ICPs

1. Mid-game players who own a limited Palbox and need reachable routes without legendary/late-game parents.
2. Optimizers planning multi-step chains, passives and mutations.
3. Search visitors asking how to breed one named Pal.

### Current alternatives

- General-purpose Palworld databases and calculators.
- Static spreadsheets, old guides and Reddit posts.
- Save-file tools that are powerful but desktop/PC-oriented or require extra trust.

### Differentiation

1. Start from owned Pals, not an abstract full roster.
2. Prefer practical routes and allow exclusions.
3. Show dataset version, last update and uncertainty.
4. Combine instant calculator results with indexable per-Pal answers.

## 2. P0 user tasks

### UT-01 — Calculate offspring

Given two selected parents, show the resulting child, rule type and game/data version in under one interaction cycle.

### UT-02 — Find parents

Given a target Pal, list every validated direct parent pair and allow sorting/filtering by practicality.

### UT-03 — Use what I own

Given an owned-Pals list and target, return direct options or the shortest validated multi-step chain using only allowed Pals.

### UT-04 — Understand one Pal

From an indexed Pal page, answer how to breed it, practical parent pairs, notable offspring and links into the calculator with the target preselected.

### UT-05 — Trust the result

At every result, make the supported game version, dataset version, update date and source boundary visible.

## 3. MVP scope

### Required

- Responsive English UI.
- Searchable Pal selector supporting English names, Paldeck numbers and validated aliases.
- Parents → child mode.
- Target → parents mode.
- One parent → partners/results mode.
- Owned Pals selection stored locally.
- Shortest-chain planner with constraints: owned only, exclude legendary, exclude unavailable/unbreedable.
- Shareable query state through stable URLs or parameters.
- Versioned local dataset and deterministic calculation engine.
- Static/SSR-generated combo and initial priority Pal pages.
- Data sources/changelog page.
- About, Privacy, Terms and Disclaimer pages.
- robots.txt, sitemap.xml, canonical tags, schema and analytics hooks without fake IDs.

### Post-MVP

- Passive inheritance probability calculator.
- Mutation odds/egg-count calculator.
- IV/stat planner.
- Local-only save-file import after format and security review.
- Localization after English index and UX stability.

## 4. NOT-DO

- No generic Palworld news feed.
- No account, subscription or payment in MVP.
- No server-side upload or storage of save files in MVP.
- No copying competitor HTML, datasets, descriptions or artwork.
- No claim of being official or endorsed by Pocketpair.
- No promise of `100% accurate` without evidence; use versioned verification language.
- No thousands of thin pages that only swap a Pal name.
- No indexable search/filter URLs or duplicate parameter pages.

## 5. Information architecture

### Launch indexable pages

| Page | Primary task | Primary query | CTA |
|---|---|---|---|
| `/` | calculate/funnel | palworld breeding calculator | Start calculating |
| `/combos/` | browse/filter | palworld breeding combos | Choose a target Pal |
| `/chain/` | plan route | palworld breeding chain calculator | Add owned Pals |
| `/guide/` | learn mechanics | palworld breeding guide | Open calculator |
| `/guide/breeding-formula/` | understand result | palworld breeding formula | Test a pair |
| `/breeding/{pal}/` | breed one entity | how to breed {Pal} | Calculate this Pal |
| `/data-sources/` | verify trust | data/supporting intent | View version history |
| `/about/` | identity | brand navigation | Use calculator |
| `/privacy/` | compliance | — | — |
| `/terms/` | compliance | — | — |
| `/disclaimer/` | IP/accuracy | — | — |

### Initial entity release

Only generate pages for validated roster entries with sufficient unique data. Start with 20–40 high-demand or newly changed Pals, then expand after quality validation.

## 6. Functional requirements

### Calculator

- Results update without full-page reload.
- Parent order is commutative and normalized.
- Special combinations override rank/formula results.
- Same-species and unbreedable cases have explicit labels.
- Empty, invalid, unavailable and uncertain states must never silently return a false result.

### Chain planner

- Default objective: fewest breeding generations.
- Tie-breakers: fewer unavailable/late-game parents, then stable deterministic ordering.
- Each step shows parents, result and which result feeds the next step.
- If no route exists under constraints, explain which constraint blocks it and offer removable filters.

### Owned Pals

- Stored in browser local storage only.
- Clear-all and reset controls.
- No account required.
- Privacy copy must state that local selection does not leave the device.

### Data trust

- Build must contain `gameVersion`, `datasetVersion`, `generatedAt`, `source`, `sourceRevision` and `verificationStatus`.
- UI distinguishes `verified`, `derived`, `legacy-unverified` and `unknown` where applicable.
- Data changes produce a visible changelog entry.

## 7. Non-functional requirements

- Core calculator usable on 360px viewport.
- Search/select interactions keyboard accessible.
- Core interaction works with static hosting and no backend dependency.
- Initial page content must be present for search crawlers; no empty SPA shell for indexable pages.
- Target Core Web Vitals: LCP <= 2.5s, CLS <= 0.1, INP <= 200ms under representative production conditions.
- No third-party tracking until configured; non-essential cookies require policy/consent review.

## 8. Visual style brief

- Mood: field guide + genetics workbench, not generic SaaS.
- Primary visual metaphor: breeding paths and linked parent/child cards.
- Palette: dark ink/navy foundation, warm egg/gold accent, restrained elemental colors.
- Typography: highly readable UI sans with compact data labels; avoid copying game logo typography.
- Illustration policy: use original abstract eggs, nodes and elemental glyphs until asset rights are confirmed.
- Mobile priority: calculator controls and results above editorial content.

## 9. Success measures

### Activation

- Calculator completion rate.
- Target-Pal lookup completion rate.
- Owned-Pals list created.
- Chain successfully generated.

### Acquisition

- Indexed valid pages.
- Impressions/clicks by parent vs tool vs entity keyword clusters.
- Non-brand organic landing-page distribution.

### Quality guardrails

- Reported incorrect-result rate.
- Zero-result rate by mode.
- Dataset age and unknown verification count.
- Console errors and failed client loads.

No numeric target is asserted until baseline production data exists.

## 10. Acceptance gate

PRD passes when design, copy and engineering can implement every launch route without inventing product scope, and QA can execute UT-01 through UT-05 with versioned data evidence.

[DONE]
