# Frontend Query Contract v1

## Runtime interface

The production frontend imports one validated dataset and exposes pure functions. No function may mutate source data or silently substitute fixture records.

```ts
type VerificationStatus = "fixture" | "unverified" | "derived" | "verified" | "unknown";

type QueryMeta = {
  gameVersion: string;
  datasetVersion: string;
  generatedAt: string;
  sourceRevision: string;
  verificationStatus: VerificationStatus;
};

type QuerySuccess<T> = { ok: true; data: T; meta: QueryMeta };
type QueryFailure = {
  ok: false;
  error: {
    code: "PAL_NOT_FOUND" | "UNBREEDABLE" | "NO_RESULT" | "NO_ROUTE" | "DATASET_INVALID" | "FIXTURE_FORBIDDEN";
    message: string;
    removableConstraints?: string[];
  };
  meta?: QueryMeta;
};
```

## Functions

### `findChild(parentAId, parentBId)`

Order-independent. Resolve canonical sorted parent IDs, check special combinations first, then apply the verified normal-rule implementation. Returns rule type (`special`, `same-species`, `breeding-power`) and verification status.

### `findParentPairs(targetId, filters)`

Returns deterministic pairs sorted by:

1. constraint eligibility;
2. practical availability score when supported;
3. parent Paldeck identifiers for stable ties.

It must not label a result `best` without a defined and visible criterion.

### `findOneParentResults(parentId, filters)`

Returns valid partner/result triples, deduplicated by canonical pair and result.

### `findShortestChain(ownedIds, targetId, constraints)`

Breadth-first search by breeding generation. Stable tie-breaker uses the same practical availability score and canonical IDs. The response contains ordered steps and a clear no-route failure with removable constraints.

## URL state

- `/`: `?mode=parents&parentA={slug}&parentB={slug}` or `?mode=target&target={slug}`.
- `/chain/`: `?target={slug}`; owned list stays in localStorage and is not placed in indexable URLs.
- Invalid aliases resolve to canonical slugs in UI; canonical document URL remains the clean route.
- Query states are `noindex` by canonical policy and are not added to the sitemap.

## Environment safety

- Development UI must show `Fixture data` when `manifest.environment === "fixture"`.
- Production build must throw `FIXTURE_FORBIDDEN` before rendering/publishing calculator results.
- Dataset load/validation failures render frozen error copy and no calculated approximation.
