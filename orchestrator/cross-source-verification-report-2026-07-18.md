# Palworld 1.0 Cross-source Verification Report

Date: 2026-07-18
Stage: 08 backend/data
Status: TECHNICAL_PASS / RIGHTS_NEEDS_REVIEW

## Outcome

The launch candidate can be technically cross-checked without installing Palworld. PalCalc v1.17.6 remains the pinned reproducible base, while two public 1.0 sources provide independent assertions and a complete snapshot comparison.

## Corrective finding

PalCalc v1.17.6 contains 299 records but omits Astralym #204. Palworld Tools exposes Astralym with rank 10, and PalDB exposes code `WorldTreeDragon`, CombiRank 10 and its same-species combination. The importer now applies one explicit, hashed overlay rather than silently editing upstream input.

## Results

| Check | Result |
|---|---:|
| Corrected candidate Pals | 300 |
| Candidate combination rows | 44,851 |
| Palworld Tools roster rows | 288 |
| Roster rows matched | 288/288 |
| Breeding-power conflicts | 0 |
| Palworld Tools unique rows | 258 |
| Rows mapped to candidate IDs | 251 |
| Comparable unique rows matched | 251/251 |
| Hand-picked assertions across two sources | 6/6 |
| Indexable candidate entities | 0 |

Seven public unique rows use source-only or drifted internal codes that cannot be safely mapped from the rendered roster; they are excluded from the comparable denominator rather than guessed.

## Reproducibility

- Base revision: `tylercamp/palcalc@v1.17.6`, commit `8b7e2f779e47fddae16ddcb973e828ba20c02b80`
- Base DB SHA-256: `803d891afdb18bd00e24332844a7276bbe5c0855170ef90ef142f2f4d7698ed1`
- Base breeding SHA-256: `1af1e4d6b461599ec3b80a2195002337ff484ed3c28ce57e27def96138262ec2`
- Overlay SHA-256: `7150c371bc6624b58dd1514b725dab91c73d27b2db2bc9a17154dbc796b47236`
- Verifiers: `scripts/verify-cross-source.mjs` and `scripts/verify-palworld-tools-snapshot.mjs`

The public HTML snapshot is temporary input and is not committed or redistributed.

## Gate decision

Technical consistency: PASS. Game installation requirement: REMOVED. Publication rights and trademark/IP review: NEEDS_REVIEW. Candidate remains `partially-verified`, all entities remain non-indexable, and production validation must continue to fail with `PROVENANCE_GATE` until the final review is recorded.

[NEEDS_REVIEW]
