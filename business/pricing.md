# Pricing and Business Model v1

Status: DONE
Decision date: 2026-07-17

## Decision

MVP is free, no-login and has no pricing page. Core calculator, combo browsing, owned-Pals planning and shortest-chain results must not be paywalled during search-market validation.

## Why

- Direct competitors provide the core breeding calculator for free.
- The primary acquisition loop depends on fast, repeat use and shareable answers.
- MVP uses static/versioned data and browser-side computation, so marginal compute cost is near zero under the planned architecture.
- There is no validated payment trigger, retention baseline or entitlement requirement yet.
- Adding payments now would increase compliance, support and conversion friction without evidence.

## Cost model

| Cost | MVP driver | Guardrail |
|---|---|---|
| Hosting/bandwidth | static HTML, JS and compact data | Cloudflare-first; optimize/paginate assets |
| Compute | browser-side calculation | no server compute for core features |
| Database | versioned files in build | no D1 until an actual write use case exists |
| Storage | code/data/static original assets | no save-file uploads in MVP |
| Analytics | optional GA4/Clarity or equivalent | configure only after disclosure/consent review |
| Support | incorrect-data reports | structured report link; no response-time promise |

Exact monthly cost remains `[待确认]` until production traffic and Cloudflare usage exist. No unsupported cost number is asserted.

## Monetization sequence

### Phase 0 — validation

- Free core product.
- No ads during initial QA/indexing period.
- Measure organic acquisition, completed calculations, chain usage and repeat visits.

### Phase 1 — low-friction monetization

Consider only after stable traffic:

- restrained display ads outside the calculator work area;
- relevant affiliate links only where a genuine user task exists and disclosure is visible;
- voluntary support/donation if operationally appropriate.

### Phase 2 — optional advanced product

Only after demand evidence:

- local save analysis;
- advanced passive/IV optimization;
- export/share workspaces;
- cross-device saved Palbox.

If accounts or paid features are introduced, run a new pricing, entitlement, privacy, tax and refund review. Do not advertise Pro/Lifetime before implementation.

## Conversion contract for copy/design

- Primary CTA: `Start breeding` / `Find parent combos`.
- No `Upgrade`, `Buy`, `Lifetime` or fake waitlist CTA in MVP.
- State `Free to use` only while it is factually true; do not promise `free forever`.
- Ads, affiliate placement and paid offerings require Owner Review.

## QA acceptance

- No pricing route or purchase CTA appears in MVP.
- Every core task works without login.
- No hidden paywall, quota or server dependency exists.
- Analytics/ads are absent unless configured and reflected in Privacy/Cookie behavior.

[DONE]
