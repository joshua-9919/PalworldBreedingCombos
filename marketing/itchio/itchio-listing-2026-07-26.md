# itch.io Project Listing

## Status

- Account: logged in; primary email verification pending
- Project state: private draft saved (`project 4827906`)
- Upload state: blocked by itch.io email-verification requirement; verification email resent on 2026-07-26
- Public release: requires final Owner confirmation
- Intended URL slug: `palworld-breeding-combos`
- Website UTM: `https://palworldbreedingcombos.com/?utm_source=itchio&utm_medium=referral&utm_campaign=tool_listing_20260726`

## Basic information

- Title: `Palworld Breeding Combos`
- Classification: browser-based tool / HTML project
- Pricing: free; no donations requested
- Short description: `A free Palworld 1.0 breeding calculator for offspring, parent pairs, and routes from Pals you own.`
- Saved tags: `strategy`, `fangame`, `open-source`, `educational`, `simulation`, `ai-generated`

## Project description

### Plan Palworld 1.0 breeding without a spreadsheet

Palworld Breeding Combos is a free, independent browser tool for checking species combinations and planning breeding routes.

Use it to:

- choose two parents and see the expected offspring;
- choose a target Pal and compare direct parent combinations;
- start with one known parent and explore possible partners;
- add Pals from your Palbox and build a short route to a target.

The current release covers 300 Pals and 44,851 normalized breeding combinations. Every result is tied to the displayed Palworld 1.0 dataset version and verification status.

### Privacy-friendly by design

- No account is required.
- No save-file upload is used.
- The Owned Pals list stays in this browser.
- No ads, affiliate links, or payments.

### Data and accuracy boundary

The data is normalized from a pinned public open-source source and cross-checked against independently structured public references. Automated verification does not mean that every combination was personally reproduced inside the game.

This is an independent, unofficial fan-made tool. It is not affiliated with, endorsed by, or sponsored by Pocketpair. Palworld and related names belong to their respective owners. This project page uses original interface artwork and does not ship game files or official game media.

### Links

- Full calculator: https://palworldbreedingcombos.com/?utm_source=itchio&utm_medium=referral&utm_campaign=tool_listing_20260726
- Data sources: https://palworldbreedingcombos.com/data-sources/?utm_source=itchio&utm_medium=referral&utm_campaign=tool_listing_20260726
- Source code: https://github.com/joshua-9919/PalworldBreedingCombos
- Contact: contact@palworldbreedingcombos.com

## Upload assets

- HTML package: `marketing/itchio/palworld-breeding-combos-itchio.zip`
- Cover: `marketing/itchio/assets/itchio-cover-630x500.png`
- Screenshots:
  - `public/product-hunt/gallery-01-overview.jpg`
  - `public/product-hunt/gallery-02-calculator.jpg`
  - `public/product-hunt/gallery-03-reverse-lookup.jpg`
  - `public/product-hunt/gallery-04-chain-planner-v3.jpg`

## QA gate

- ZIP root contains `index.html`.
- Embedded build uses relative asset URLs.
- Parent-to-child calculation works inside an iframe/static server.
- Internal guide and advanced-mode links open the full production website with the itch.io UTM.
- Plausible is removed from the embedded copy to avoid measuring the itch.io iframe as the production domain.
- Embedded copy is `noindex,nofollow`; the itch.io project page is the intended discoverable listing.
- Public release remains unconfirmed.
- Next gate: verify the itch.io account email, upload the ZIP/cover/screenshots, run the private embed QA, then request Owner confirmation before selecting Public.
