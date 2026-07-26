---
title: How I Built an Auditable Palworld 1.0 Breeding Calculator Without Shipping Game Files
published: false
description: A practical workflow for versioning breeding data, documenting corrections, cross-checking results, and keeping automated validation separate from gameplay claims.
tags:
  - gamedev
  - webdev
  - opensource
  - javascript
cover_image: ./assets/palworld-breeding-data-cover.png
canonical_url:
status: PUBLISHED
dev_draft_id: 2669635
dev_account: joshua-9919
prepared_at: 2026-07-26
published_at: 2026-07-26
public_url: https://dev.to/joshua9919/how-i-built-an-auditable-palworld-10-breeding-calculator-without-shipping-game-files-1jde
---

Breeding calculators look simple from the outside: choose two parents and display a child. The harder engineering problem is trust.

If the game changes, how does a player know which data a result came from? If a public dataset has a gap, should the calculator guess? And if automated tests pass, is it fair to say the results were verified in the game?

I maintain [Palworld Breeding Combos](https://palworldbreedingcombos.com/?utm_source=devto&utm_medium=referral&utm_campaign=engineering_devlog_20260726), the independent, unofficial project discussed here. This post explains the data and product decisions behind it. The project is free, has no ads or affiliate links, and is not affiliated with Pocketpair.

## 1. Treat game data as a versioned dependency

The first design decision was to stop treating breeding data as anonymous JSON.

Every generated dataset carries a small manifest:

```json
{
  "gameVersion": "1.0",
  "dataset": "palcalc-v26-v1.17.6-owner-approved-20260718",
  "generatedAt": "2026-07-18T10:55:00.000Z",
  "verificationStatus": "verified"
}
```

The current normalized dataset pins the public `tylercamp/palcalc` v1.17.6 release instead of silently following its latest branch. That makes a result reproducible: the site can say which game version, source revision, generation time, and validation state produced it.

This information is useful, but it should not compete with the calculator itself. The UI therefore keeps the short version near the footer and links to a dedicated [data sources and changes page](https://palworldbreedingcombos.com/data-sources/) for people who want the full record.

## 2. Prefer lookup data over reimplementing a formula

There are two tempting ways to build this kind of calculator:

1. Reimplement the breeding formula.
2. Import a known combination table.

Formula implementations are compact, but special combinations, gender direction, and version changes can produce edge cases. For this project I used the public lookup data as the primary source, normalized it, and retained the explicit exceptions.

The build pipeline:

- imports the pinned upstream data;
- normalizes parent ordering where direction does not matter;
- preserves directional or special combinations where it does;
- rejects unresolved internal identifiers;
- generates the browser dataset and its manifest;
- runs deterministic integrity checks before the site build.

The important policy is conservative transformation. If a value cannot be mapped confidently, the pipeline excludes it and reports the gap instead of manufacturing a plausible answer.

## 3. Make corrections visible

The pinned upstream release had one known omission involving Astralym. Rather than silently patching it, I treated the correction as a small overlay with its own evidence.

The overlay was accepted only after two public sources agreed on the missing relationship. The project records the correction in its source documentation and keeps it separate from the upstream snapshot.

This creates a useful boundary:

- upstream data remains attributable and reproducible;
- project-specific corrections are reviewable;
- later upstream releases can replace the overlay cleanly;
- users are not asked to trust an unexplained edited file.

That approach is slightly more work than editing a row in place, but it makes future maintenance much safer.

## 4. Cross-check with explicit denominators

“Verified” is too vague unless the comparison set is stated.

The validation scripts compare the normalized candidate dataset with independently structured public reference data. For the portions that could be mapped directly, the current report found:

- 288 of 288 comparable breeding ranks matched, with zero conflicts;
- 251 of 251 comparable unique combinations matched;
- seven source-only or drifted internal codes were excluded instead of guessed.

Those denominators matter. Saying “everything matched” would hide the unmappable records and overstate the evidence.

The repository includes the verification scripts and generated reports, including `scripts/verify-cross-source.mjs` and `scripts/verify-palworld-tools-snapshot.mjs`, so the comparison is repeatable rather than a one-time manual claim.

## 5. Automated verification is not gameplay verification

This is the most important disclaimer in the project.

Cross-source agreement, schema checks, row counts, deterministic builds, and browser tests can show that the site faithfully serves the reviewed data. They do not prove that every combination was personally reproduced inside Palworld.

I have not installed the game or extracted data from a local game installation. The project does not ship game files, official art, or screenshots. Its validation status refers to automated data checks against documented public sources.

Keeping that distinction visible is better than turning a green test suite into a stronger claim than the evidence supports.

## 6. Keep the player’s data in the browser

The site is a static client-side application. It does not require an account, and users do not upload save files.

The chain planner lets a player create an “Owned Pals” list, but that list stays in local browser storage. This reduces both privacy risk and operational complexity:

- no save parser;
- no account database;
- no personal inventory on a server;
- no sign-in barrier before using the calculator.

For a focused utility, fewer data flows are a feature.

## 7. Model the chain planner as a graph problem

Direct lookup answers: “What child do these two parents produce?” Reverse lookup answers: “Which parent pairs produce this target?”

The chain planner adds a different question:

> Given the Pals I already own, what is a short route to the target?

The implementation treats breeding relationships as graph edges. Starting from the owned set, a deterministic breadth-first search discovers reachable results under the active constraints. When the target is found, the planner reconstructs only the dependency path required for that target.

Determinism matters here. The same owned set and constraints should produce the same route, which makes both testing and user explanations easier.

## 8. What I would improve next

The current build favors transparency and simplicity, but there are still useful next steps:

- split or lazily load the larger combination dataset for slower mobile devices;
- add real-user performance telemetry without collecting identifying data;
- publish machine-readable validation summaries alongside human-readable reports;
- make dataset-to-game-version compatibility even harder to miss;
- add community-reported discrepancy tracking without turning reports into unreviewed corrections.

The broader lesson is that calculators built on changing public data need more than correct UI logic. They need provenance, correction policy, explicit comparison boundaries, and claims that match the evidence.

If you want to inspect the implementation, the [source repository is public](https://github.com/joshua-9919/PalworldBreedingCombos). If you only want to calculate a combination or plan a route, use [Palworld Breeding Combos](https://palworldbreedingcombos.com/?utm_source=devto&utm_medium=referral&utm_campaign=engineering_devlog_20260726).

---

Editorial note: This article was prepared with AI-assisted editing based on the project’s public repository, validation reports, and deployment records. All factual claims and links were checked against those sources before publication.
