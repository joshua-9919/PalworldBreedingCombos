# SEO Copy Freeze v1

Status: DONE
Language: US English
Canonical origin: `https://palworldbreedingcombos.com`
Rule: design may reflow these blocks but must not silently delete, rename or rewrite search-critical copy.

## Global message contract

### Product label

Palworld Breeding Combos

### One-line positioning

Plan Palworld breeding combos you can actually make from the Pals you already own.

### Primary navigation

- Calculator
- All Combos
- Chain Planner
- Breeding Guide

### Global trust line

Independent, unofficial fan-made tool. Results are tied to the dataset version shown on each page.

### CTA vocabulary

- Primary: `Find a breeding combo`
- Calculator: `Choose two parents`
- Reverse lookup: `Find parents for this Pal`
- Chain: `Build my shortest chain`
- Entity page: `Open this Pal in the calculator`
- Empty state: `Choose a Pal to get started`
- Reset: `Clear selection`

Do not use `Learn more` where a task-specific CTA is possible.

## `/` — Homepage and calculator

### Metadata

- Title: `Palworld Breeding Calculator 1.0 – Combos & Chains`
- Meta description: `Use the Palworld breeding calculator to find offspring, parent combos, and practical breeding chains from Pals you already own. Versioned for Palworld 1.0.`
- Primary keyword: `palworld breeding calculator`
- Supporting: `palworld breeding`, `palworld breeding combos`, `palworld breeding calculator 1.0`, `palworld breeding chain`

### Hero

Badge: `Built for Palworld 1.0 data`

H1: `Palworld Breeding Calculator`

Subhead:

`Choose two parents to see their offspring, work backward from a target Pal, or build a practical breeding chain from the Pals in your Palbox.`

Primary CTA: `Choose two parents`
Secondary CTA: `Find parents for a target`

Trust note:

`Game version, dataset version, and last checked date are shown with every result.`

### Calculator mode labels

- `Parents → Child`
- `Target → Parents`
- `One Parent`
- `Owned Pals → Chain`

Field labels:

- `Parent 1`
- `Parent 2`
- `Target Pal`
- `Search by Pal name or Paldeck number`

Result labels:

- `Expected offspring`
- `Direct parent combinations`
- `Practical starting pairs`
- `Shortest available chain`
- `Special combination`
- `Calculated from breeding power`
- `Verification status`

### H2: `Find the Palworld breeding combo you need`

Body:

`Start with what you know. Pick two parents when you want to check an egg result. Pick a target when you need every direct parent pair. Add the Pals you own when a theoretical combo is not useful enough.`

Benefit cards:

1. H3 `Parents to offspring`
   `Select two Pals and see the resulting species, including special-combination handling.`
2. H3 `Target to parents`
   `Choose the Pal you want and compare validated parent pairs without scanning a spreadsheet.`
3. H3 `Chains from your Palbox`
   `Limit routes to owned Pals and exclude parents that are unavailable or too late-game for your save.`

### H2: `Why the data version matters`

Body:

`A breeding result is only useful when it matches the game data you are playing. This site publishes the supported game version, dataset revision, generated date, and verification status instead of hiding them behind a generic “updated” label.`

CTA: `View data sources and changes`

### H2: `How to use the breeding calculator`

Steps:

1. H3 `Choose a mode` — `Start with two parents, a target Pal, one known parent, or your owned-Pals list.`
2. H3 `Set practical limits` — `Exclude unavailable or legendary parents when you need a route that fits your current save.`
3. H3 `Check the result details` — `Review each step, the calculation type, and the dataset version before spending Cake.`

### H2: `Popular Palworld breeding searches`

Intro: `Open a Pal page to compare direct parent pairs, practical routes, and notable offspring.`

Design requirement: data-driven links only; do not hard-code unsupported claims such as “best” or “easiest.”

### FAQ copy

H2: `Palworld breeding calculator FAQ`

Q: `How does Palworld breeding work?`
A: `Most offspring are determined from the parents’ hidden breeding values, while special combinations can override the normal calculation. The exact rules and roster must match the game and dataset version shown with the result.`

Q: `Can I find parents for a specific Pal?`
A: `Yes. Choose Target → Parents, select the Pal you want, and compare its validated direct parent pairs.`

Q: `Can the calculator use only Pals I already own?`
A: `Yes. Add Pals to your local Palbox list and use the chain planner to search within your allowed starting set. The list stays in your browser in the MVP.`

Q: `Why does an old breeding guide show a different result?`
A: `A guide may use a different game or dataset version. Compare the version and verification details before deciding which result applies to your save.`

Q: `Is this an official Palworld tool?`
A: `No. Palworld Breeding Combos is an independent, unofficial fan-made tool and is not affiliated with or endorsed by Pocketpair.`

### Final CTA

H2: `Start with your next egg`

Body: `Choose two parents or select the Pal you want to breed.`
CTA: `Open the calculator`

## `/combos/` — Combo directory

- Title: `Palworld Breeding Combos 1.0 – Search Parent Pairs`
- Meta description: `Browse Palworld breeding combos by target Pal. Compare direct parent pairs, filter practical options, and open each Pal in the breeding calculator.`
- H1: `Palworld Breeding Combos`
- Intro: `Search by target Pal to compare validated parent combinations for the dataset version shown below.`
- H2: `Browse breeding combos by Pal`
- H2: `How parent pairs are ordered`
- Supporting copy: `Default ordering favors practical, reachable options when the required data is available. It does not claim one pair is best for every save.`
- Empty state: `No validated combinations match these filters. Remove a limit or check the dataset version.`
- CTA: `Find parents for this Pal`

## `/chain/` — Chain planner

- Title: `Palworld Breeding Chain Calculator – Use Pals You Own`
- Meta description: `Build a Palworld breeding chain from Pals you already own. Find a short route to your target and exclude unavailable or late-game parents.`
- H1: `Palworld Breeding Chain Calculator`
- Intro: `Add the Pals in your Palbox, choose a target, and find a short validated route under your constraints.`
- H2: `Start with your Palbox`
- Helper: `Your owned-Pals list is stored locally in this browser for the MVP.`
- H2: `Set route limits`
- Controls: `Exclude legendary Pals`, `Exclude unavailable Pals`, `Owned starting Pals only`
- H2: `Your breeding chain`
- No-route state: `No route was found under the current limits. Remove one constraint or add more starting Pals.`
- FAQ question: `What makes a breeding chain practical?`
- FAQ answer: `A short chain is not always reachable. Practical ordering can also account for which parents you own and which late-game or unavailable Pals you choose to exclude.`

## `/guide/` — Guide hub

- Title: `Palworld Breeding Guide 1.0 – Combos, Chains & Data`
- Meta description: `Learn how Palworld breeding works, how parent values and special combos affect results, and how to plan practical breeding chains in Palworld 1.0.`
- H1: `Palworld Breeding Guide`
- Intro: `Understand the mechanics behind the calculator, then apply them to a current, versioned dataset.`
- H2: `Start with the breeding calculator`
- H2: `How offspring are determined`
- H2: `Special breeding combinations`
- H2: `Planning a multi-step chain`
- H2: `Checking data versions and changes`
- CTA: `Test a parent pair`

## `/guide/breeding-formula/`

- Title: `Palworld Breeding Formula – Power, Rounding & Exceptions`
- Meta description: `Understand the Palworld breeding formula, hidden breeding values, rounding behavior, special combinations, and why game-version data changes matter.`
- H1: `How the Palworld Breeding Formula Works`
- H2: `The normal breeding calculation`
- H2: `Why the nearest Pal matters`
- H2: `Special combinations override the formula`
- H2: `Why two calculators can disagree`
- Copy constraint: formula, rounding direction and examples remain `[DATA_VALIDATION_REQUIRED]` until verified against the production dataset/source revision.

## `/breeding/{pal-slug}/` — Entity template

- Title template: `How to Breed {Pal} in Palworld 1.0 – Parent Combos`
- Meta template: `Find parent combinations for {Pal} in Palworld 1.0, compare practical pairs, and open {Pal} in the breeding calculator.`
- H1: `How to Breed {Pal} in Palworld`
- Intro template: `Use the dataset version shown below to compare direct parent pairs for {Pal}. Filter the list when you need options that fit your current Palbox.`
- H2: `{Pal} parent combinations`
- H2: `Practical ways to breed {Pal}`
- H2: `Use {Pal} as a parent`
- H2: `{Pal} breeding questions`
- CTA: `Open {Pal} in the calculator`

Unique-value requirement: do not publish unless the page has validated entity facts, combinations, meaningful filters/ordering and contextual links. Never generate a name-swap-only page.

## Trust and legal pages

### `/data-sources/`

- Title: `Palworld Breeding Data Sources & Version History`
- H1: `Data Sources and Version History`
- Lead: `See which game version and dataset revision power the calculator, how records are transformed, and what has or has not been independently verified.`
- Required labels: `Game version`, `Dataset version`, `Source revision`, `Generated`, `Verification status`, `Known gaps`.

### `/about/`

- Title: `About Palworld Breeding Combos`
- H1: `About This Tool`
- Lead: `Palworld Breeding Combos is an independent, unofficial fan-made calculator built to make versioned breeding data easier to use.`

### `/privacy/`

- Title: `Privacy Policy – Palworld Breeding Combos`
- H1: `Privacy Policy`
- Required factual copy: local owned-Pals storage; hosting/security logs; actual analytics status; contact/choice route when configured; effective date.

### `/terms/`

- Title: `Terms of Use – Palworld Breeding Combos`
- H1: `Terms of Use`
- Required sections: acceptable use, data/service changes, no warranty, operator/jurisdiction fields `[OWNER_REVIEW]`.

### `/disclaimer/`

- Title: `Disclaimer – Palworld Breeding Combos`
- H1: `Unofficial Fan Tool Disclaimer`
- Frozen lead: `This is an independent, unofficial fan-made tool. It is not affiliated with, endorsed by, or sponsored by Pocketpair. Palworld and related names belong to their respective owners.`

## Structured-data contract

- FAQ schema must match visible FAQ wording exactly.
- WebApplication description must match the implemented modes; do not advertise unfinished passive, mutation, save-import or IV features.
- Entity ItemList values must come from validated page data.
- No review/rating schema without genuine first-party review collection and eligibility.

## Failure and loading copy

- Loading: `Loading the current breeding dataset…`
- Dataset unavailable: `The breeding data could not be loaded. No result has been calculated.`
- Unsupported record: `This Pal is not verified in the selected dataset version.`
- Invalid URL state: `This shared selection is no longer available in the current dataset.`
- Client error: `Something interrupted the calculation. Your selections are still in this browser.`
- Offline: `You appear to be offline. Previously loaded data may still work.`

## Compliance scan

- `Official`: prohibited except in a factual disclaimer such as “not official.”
- `100% accurate`, `guaranteed`, `always correct`: prohibited.
- `All` / `complete`: allowed only after programmatic coverage proof; launch titles currently avoid unsupported completeness claims.
- `Updated for 1.0`: requires real dataset metadata in the rendered UI.
- `Free forever`: prohibited. `Free to use` may be used while factually true.
- Competitor comparison claims: prohibited without reproducible evidence.

## Design handoff

- Mobile first: calculator H1, subhead, mode switcher and first input must appear before long editorial copy.
- Keep trust/version metadata adjacent to results, not only in the footer.
- FAQ and guide copy may use progressive disclosure but must remain crawlable and accessible.
- Do not render indexable pages as empty client-only shells.
- No pricing section in MVP.

[DONE]
