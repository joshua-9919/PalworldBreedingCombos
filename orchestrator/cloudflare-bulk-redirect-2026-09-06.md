# Cloudflare Bulk Redirect — `www` → apex

## Desired rule

| Field | Value |
|---|---|
| Source URL | `www.palworldbreedingcombos.com` |
| Target URL | `https://palworldbreedingcombos.com` |
| Status | `301` |
| Preserve query string | On |
| Subpath matching | On |
| Preserve path suffix | On |
| Include subdomains | Off |

## DNS prerequisite

Cloudflare's Pages guidance requires a proxied `A` record for `www` using `192.0.2.1` when the hostname is only being used for the redirect. Confirm that `www` is proxied and that no competing DNS record overrides it.

## Verification

After saving the Bulk Redirect rule and DNS record, verify:

```text
curl -I https://www.palworldbreedingcombos.com/
curl -I https://www.palworldbreedingcombos.com/combos/?target=astralym
```

Expected: `301`, `Location: https://palworldbreedingcombos.com/...`, and preserved query string.

The Pages `_redirects` file intentionally contains only a comment because Pages does not support domain-level matching there. See the official Cloudflare procedure: https://developers.cloudflare.com/pages/how-to/www-redirect/

