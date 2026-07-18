# Data Contract v1

Status: CONTRACT_DONE / LAUNCH_DATA_BLOCKED
Architecture: build-time versioned JSON + browser-side deterministic queries

## Decision

The MVP does not need Workers, D1, R2, authentication, payments, uploads, or server-side persistence. Cloudflare Pages can serve statically rendered pages and immutable versioned data files. A backend may be introduced later only for a proven write, account, upload, or asynchronous workload.

## Data zones

```text
data/contracts/       machine-readable schemas and query contract
data/fixtures/        synthetic development-only data
data/source-ledger/   pinned candidate source evidence and production ledger
data/launch/          production candidate data; absent until provenance gate passes
scripts/              deterministic validation/build tooling
```

Rules:

1. `fixtures` must always declare `environment: "fixture"` and must never be published as launch results.
2. `launch` must declare `environment: "launch"` and pass schema, reference, uniqueness, provenance and checksum checks.
3. The frontend must display `gameVersion`, `datasetVersion`, `generatedAt`, `verificationStatus` and known gaps from the active manifest.
4. No production build may silently fall back from missing launch data to fixtures.
5. Every published source must have a ledger record with a reviewable rights/provenance basis.
6. Third-party candidates are generated outside `data/launch/`; `partially-verified` candidates may pass structural validation but must fail `--production`.

## Candidate intake

The current reproducible candidate is pinned to `tylercamp/palcalc` v1.17.6 / commit `8b7e2f779e47fddae16ddcb973e828ba20c02b80`.

```bash
node scripts/import-palcalc.mjs \
  --db /path/to/PalCalc.Model/db.json \
  --breeding /path/to/PalCalc.Model/breeding.json \
  --overrides data/verification/palworld-1.0-overrides.json \
  --revision v1.17.6 \
  --out /tmp/pbc-launch-candidate.json

node scripts/validate-data.mjs /tmp/pbc-launch-candidate.json
node scripts/verify-cross-source.mjs /tmp/pbc-launch-candidate.json data/verification/cross-source-samples.json
node scripts/verify-palworld-tools-snapshot.mjs /tmp/pbc-launch-candidate.json /tmp/palworld-tools-breeding.html
node scripts/validate-data.mjs /tmp/pbc-launch-candidate.json --production # must remain blocked until independently verified
```

The importer preserves gender-specific combinations, emits no images, marks every Pal non-indexable and does not copy competitor pages. The snapshot verifier compares the complete roster/ranks and all comparable unique combinations from a temporary public-page download without committing or redistributing that page.

## Build behavior

- Development: explicitly load `data/fixtures/dataset.fixture.json` and render a permanent `Fixture data` warning.
- Preview/production: require an explicit launch dataset path; fail the build when missing or invalid.
- Entity pages: generate only for records with `indexable: true`, sufficient unique content and accepted verification status.
- Filter/search URL state does not create new canonical documents.

## Current gate

- Machine-readable schema: PASS.
- Synthetic fixture: PASS after `node scripts/validate-data.mjs data/fixtures/dataset.fixture.json`.
- Production source ledger: MISSING.
- Production launch dataset: MISSING.
- Cloudflare deployment: BLOCKED by setup and Owner Review.

[NEEDS_REVIEW]
