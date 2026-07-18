# Data Contract v1

Status: CONTRACT_DONE / LAUNCH_DATA_BLOCKED
Architecture: build-time versioned JSON + browser-side deterministic queries

## Decision

The MVP does not need Workers, D1, R2, authentication, payments, uploads, or server-side persistence. Cloudflare Pages can serve statically rendered pages and immutable versioned data files. A backend may be introduced later only for a proven write, account, upload, or asynchronous workload.

## Data zones

```text
data/contracts/       machine-readable schemas and query contract
data/fixtures/        synthetic development-only data
data/launch/          production candidate data; absent until provenance gate passes
data/source-ledger/   source, license, revision, transform and verification evidence
scripts/              deterministic validation/build tooling
```

Rules:

1. `fixtures` must always declare `environment: "fixture"` and must never be published as launch results.
2. `launch` must declare `environment: "launch"` and pass schema, reference, uniqueness, provenance and checksum checks.
3. The frontend must display `gameVersion`, `datasetVersion`, `generatedAt`, `verificationStatus` and known gaps from the active manifest.
4. No production build may silently fall back from missing launch data to fixtures.
5. Every published source must have a ledger record with a reviewable rights/provenance basis.

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
