# Design Handoff v1

Status: DONE
Source: `design/prototype/index.html` + `design/prototype/styles.css`

## Page family

### Tool shell

Used by `/`, `/combos/`, `/chain/` and calculator portions of entity pages.

- Sticky top header with compact text brand and four primary routes.
- Tool-first hero: message left, dataset/version card right.
- Calculator workbench immediately follows hero.
- Dark result canvas keeps version metadata adjacent to output.
- Paper editorial band below preserves SEO copy and FAQ.

### Guide shell

Used by `/how-to-use/`, `/guide/`, `/guide/breeding-formula/`, `/data-sources/`, legal and About pages.

- Narrower reading column on paper canvas.
- Dark page masthead with breadcrumb, title and last-updated metadata.
- Sticky in-page contents only when more than four H2 sections.

### Entity shell

Used by `/breeding/{pal-slug}/`.

- Pal identity is text/data first; no portrait dependency.
- Immediate CTA preselects the target in calculator mode.
- Parent combinations use the same node language as the homepage.
- Unique facts and version metadata appear before long combo lists.

## Responsive behavior

### Desktop >= 1024px

- Hero grid 7/5 columns.
- Workbench controls form two columns; result spans full width.
- Editorial steps use a connected three-column sequence.

### Tablet 700–1023px

- Hero remains two columns with reduced heading size.
- Workbench input and result stack vertically.
- Navigation may wrap but remains visible.

### Mobile <= 699px

- Header becomes brand + menu control; primary route drawer is an implementation task.
- Hero, version card and workbench become one column.
- H1/subhead/mode switcher/first input remain above editorial content.
- Mode switcher scrolls horizontally with visible focus.
- Parent nodes stack around a vertical connector.
- Result metadata becomes a two-column definition list.
- Sticky bottom task action is allowed only if it does not cover fields or legal content.

## Required states

| State | Design behavior | Copy source |
|---|---|---|
| Initial empty | muted egg outline, no invented result | `Choose a Pal to get started` |
| Loading dataset | skeleton rows + non-animated text under reduced motion | frozen loading copy |
| Partial selection | selected parent emphasized; second input remains primary next action | field labels |
| Result | child node, rule type, verified badge, dataset metadata | result labels |
| Multiple parent pairs | sortable compact rows with practical filters | combo copy |
| No result | warning field, filters to remove, no fake approximation | frozen no-route/unsupported copy |
| Dataset error | error panel replaces result and explicitly states no calculation occurred | frozen failure copy |
| Offline | slim persistent status strip; previously loaded data may work | frozen offline copy |
| Invalid shared URL | preserve valid portions, identify unavailable selection | frozen invalid-state copy |
| Owned Pals saved | local-only note next to control, clear/reset visible | compliance copy |
| Legal/permissions | no login/payment state in MVP | PRD NOT-DO |

## Content-fit matrix

| Route | Above fold | Mid page | Lower page | Mobile priority |
|---|---|---|---|---|
| `/` | H1, subhead, version card, mode controls | calculator/result, benefit sequence | data trust, how-to, popular links, FAQ | tool first |
| `/combos/` | H1, target search, version | filter/sort + result list | ordering explanation, links | search + first results |
| `/chain/` | H1, Palbox entry, target | constraints + lineage | explanation + FAQ | owned list + target |
| `/guide/` | H1, intro, calculator CTA | mechanics sections | version/source guidance | readable TOC |
| entity | H1, identity/version, CTA | parent pairs | offspring/context/FAQ | target + first pair |
| legal/trust | H1, effective date | complete policy content | footer | readable text |

## Asset inventory

- CSS-only original brand mark: linked nodes around an egg.
- CSS-only egg/result node.
- Monoline arrows/connectors.
- Text elemental labels only in MVP.
- No third-party raster assets required for Design v1.
- If Pal imagery is later added, each asset needs source, license/permission and attribution fields before use.

## Frontend implementation notes

- Prototype is visual truth, not production application architecture.
- Preserve frozen copy and canonical route matrix.
- Convert static mode buttons to accessible tabs.
- Use semantic `form`, `label`, `button`, `output`, `details` and heading order.
- Never show example result data as real production data; prototype labels are explicitly demonstrative.
- Render crawlable page copy at build time; hydrate calculator interactions separately.
- Version bar and result metadata must consume Data Contract fields rather than hard-coded strings.

## Design Gate

- Visual Style Rationale: PASS.
- Desktop source: PASS.
- Mobile rules: PASS.
- Empty/loading/error/result states: PASS.
- SEO copy placement: PASS.
- Asset/IP policy: PASS.
- Desktop render evidence: PASS — `design/evidence/home-desktop.png` at 1440px.
- Mobile render evidence: PASS — `design/evidence/home-mobile-500.png` at 500px with the <=520px layout active.
- Narrow viewport hardening: PASS in CSS; `home-mobile-2x.png` records a macOS headless Chrome sub-500px window-capture limitation and is not the acceptance image.

[DONE]
