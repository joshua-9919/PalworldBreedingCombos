# Palworld 1.0 Data Candidate Report

Date: 2026-07-18
Stage: 08 backend/data
Status: NEEDS_REVIEW

## Outcome

A reproducible, pinned candidate path now exists, but production remains blocked. The candidate is based on `tylercamp/palcalc` v1.17.6 at commit `8b7e2f779e47fddae16ddcb973e828ba20c02b80`, released July 15, 2026 under the MIT repository license.

Primary evidence:

- Repository and generation method: https://github.com/tylercamp/palcalc
- Fixed release: https://github.com/tylercamp/palcalc/releases/tag/v1.17.6
- Official game release date/version context: https://store.steampowered.com/app/1623730/Palworld/

PalCalc documents that `db.json` is generated from a local Palworld installation using `PalCalc.GenDB`. Its source reader maps `CombiRank`, duplicate priority and `DT_PalCombiUnique`; its generated `breeding.json` contains the complete lookup table.

## Pinned evidence

| Artifact | Result |
|---|---|
| PalCalc tag | `v1.17.6` |
| Commit | `8b7e2f779e47fddae16ddcb973e828ba20c02b80` |
| Upstream database version | `v26` |
| `db.json` SHA-256 | `803d891afdb18bd00e24332844a7276bbe5c0855170ef90ef142f2f4d7698ed1` |
| `breeding.json` SHA-256 | `1af1e4d6b461599ec3b80a2195002337ff484ed3c28ce57e27def96138262ec2` |
| Pal records after reviewed overlay | 300 |
| Combination rows | 44,851 |
| Unique unordered parent pairs | 44,850 |
| Gender-specific rows | 2 |
| Parent pairs with different children by gender | 1 |

The gender-dependent internal pair is `CatMage` / `FoxMage`, displayed in English as Katress / Wixen. The normalized contract therefore retains parent genders instead of silently returning one child. A headless-browser check rendered both Katress Ignis and Wixen Noct with their required parent genders.

## Implemented controls

- `scripts/import-palcalc.mjs` produces a deterministic local candidate from explicitly supplied pinned files.
- Candidate Pals are `derived`, `indexable: false`; combinations are `unverified`.
- Full combination lookup is supported without mislabeling all rows as special combinations.
- Production validation requires `manifest.verificationStatus=verified` and verified combination rows.
- The existing fixture remains isolated and production cannot fall back to it.
- Source ledger records locator, commit, retrieval time, rights boundary and both checksums.

## Rights and verification boundary

MIT covers the upstream repository code. It does not automatically grant rights to Pocketpair game data embedded in generated files. This candidate is suitable for engineering and cross-checking, not yet for public production publication.

Independent public-source comparison found that the pinned upstream omitted Astralym #204. A narrow reviewed overlay adds Astralym with breeding power 10, supported by both Palworld Tools and PalDB. The corrected 300-Pal candidate then matched all 288 roster/rank records exposed by Palworld Tools with zero power conflicts, plus all 251 unique-combination rows that could be mapped to candidate internal IDs.

Installing the game is no longer required for this pipeline stage. The remaining hard gate is Owner/IP review of the right to publish the compiled game facts; public calculators are corroboration evidence, not a transfer of publication rights.

## Gate

- Machine-readable contract: PASS
- Reproducible candidate importer: PASS
- Candidate structural validation: PASS
- Gender-dependent result preservation: PASS
- Browser rendering of both gender-dependent outcomes: PASS
- Independent public-source cross-check: PASS (288/288 ranks; 251/251 comparable unique combinations)
- PalCalc omission repair: PASS (Astralym #204; two-source evidence)
- Production provenance/right-to-publish: BLOCKED
- Entity indexability: BLOCKED

[NEEDS_REVIEW]
