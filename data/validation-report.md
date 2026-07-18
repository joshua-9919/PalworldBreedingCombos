# Data Contract Validation Report

Date: 2026-07-18

## Commands

```bash
node scripts/validate-data.mjs data/fixtures/dataset.fixture.json
node scripts/validate-data.mjs data/fixtures/dataset.fixture.json --production
```

## Results

- Development fixture validation: PASS, exit 0.
- Dataset version: `fixture.v1`.
- Synthetic records: 4 Pals, 1 special combination.
- Production validation of fixture: EXPECTED FAIL, exit 1.
- Fail-closed reason: `FIXTURE_FORBIDDEN` at manifest, verification and record levels.
- Markdown/Git whitespace check: PASS.

## Gate conclusion

The contract and validator are ready for frontend development. Production remains blocked until a launch dataset and source ledger pass the same validator with `--production`, plus rights/provenance and calculation-rule review.

[NEEDS_REVIEW]
