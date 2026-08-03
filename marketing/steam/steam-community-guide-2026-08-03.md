# Steam Community Guide Draft — Palworld 1.0 Breeding Workflow

## Status and publishing gate

- Status: `DRAFT_READY_FOR_OWNER_REVIEW`
- Platform: Steam Community Guides for Palworld (`appid=1623730`)
- Target market / language: US English
- Public publishing: not executed
- Owner gate: create as `Friends-only` or `Unlisted` first, verify formatting and links, then request explicit Owner confirmation before switching to `Public`
- Account prerequisite: the Steam account must own Palworld and be eligible to submit Community content
- UGC warning: a first submission may require email verification or enter Steam moderation before it becomes publicly visible

## Why this guide should exist

Current high-visibility Palworld guides tend to do one of two things:

1. catalogue new 1.0 Pals and system changes; or
2. prescribe a short list of “best” base/combat Pals and fixed breeding pairs.

This guide uses a different, task-first angle: decide what to do from the
information the player already has. It explains three separate questions—two
known parents, one desired child, or a target that must be reached from an
owned roster—and gives a reproducible example for each.

The article must remain independently useful if the optional calculator link
is removed. It must not read like an advertisement, promise in-game testing,
or reproduce other guides.

## Steam listing fields

### Title

`Palworld 1.0 Breeding Without Guesswork: Parents, Targets & Practical Chains`

### Short description

`A decision-first Palworld 1.0 breeding guide: check what two parents produce, work backward from a target Pal, and build a reachable chain from Pals already in your Palbox.`

### Language

`English`

### Suggested categories

- Gameplay Basics
- Walkthroughs
- Crafting

Do not select Modding, Cheats, Secrets, or Workshop.

### Cover image

Use the project-owned abstract breeding-tree artwork:

`marketing/itchio/assets/itchio-cover-630x500.png`

It contains no game screenshot, official logo, character art, or third-party
asset.

### Optional section images

Upload only these project-owned interface screenshots:

1. `marketing/product-hunt/assets/gallery-02-calculator.jpg`
2. `marketing/product-hunt/assets/gallery-03-reverse-lookup.jpg`
3. `marketing/product-hunt/assets/gallery-04-chain-planner-v3.jpg`

Suggested placement: one image below each matching workflow section. Do not
upload game files or third-party guide images.

## Guide index

1. Start With the Question You Actually Have
2. Case 1 — I Know Both Parents
3. Case 2 — I Want a Specific Pal
4. Case 3 — I Only Want Routes I Can Start Now
5. A 14-Step Owned-Pals Example
6. Five Checks Before Spending Cake
7. What This Workflow Does Not Predict
8. Optional Calculator and Disclosure
9. Quick FAQ

## Steam guide copy

### 1. Start With the Question You Actually Have

Breeding advice becomes confusing when three different questions are treated
as if they were the same:

[list]
[*][b]Parents → Child:[/b] I already have two Pals. What species will their egg produce?
[*][b]Target → Parents:[/b] I want one specific Pal. Which direct parent pairs can produce it?
[*][b]Owned Pals → Chain:[/b] I want one specific Pal, but I only care about routes I can begin with Pals in my current Palbox.
[/list]

Choose the question first. A giant list of combinations is useful only after
you know which direction you are searching.

This guide focuses on species results and route planning for Palworld 1.0. It
does not attempt to predict passive-skill inheritance, mutation odds, egg
timers, or every server setting.

### 2. Case 1 — I Know Both Parents

Use a direct parent check when both breeding slots are already decided.

[b]Example:[/b]

[quote]Snock + Dinossom → Reindrix[/quote]

The workflow is simple:

[olist]
[*]Select Parent 1.
[*]Select Parent 2.
[*]Read the expected child species.
[*]Check that the result is tied to Palworld 1.0 data before using Cake.
[/olist]

This is the fastest question to answer, but it is also the easiest place to
use an outdated chart accidentally. If two guides disagree, compare their
supported game/data version instead of assuming the newest-looking page is
correct.

### 3. Case 2 — I Want a Specific Pal

Reverse lookup starts with the child rather than the parents. It is useful
when you know the result you want but do not yet know which pair is practical.

[b]Example: Anubis[/b]

In the dataset used for this guide, Anubis has 234 listed direct parent pairs,
including its same-species pair. That number is not a recommendation to breed
the first row you see. Compare the results against your save:

[list]
[*]Do you already own both parents?
[*]Are either of them late-game or otherwise inconvenient?
[*]Do you need to preserve a passive carried by one specific parent?
[*]Would a different direct pair remove an unnecessary intermediate egg?
[/list]

Reverse lookup answers “what can work.” Your roster and breeding goal decide
“what is worth doing.”

### 4. Case 3 — I Only Want Routes I Can Start Now

A theoretical direct pair is not helpful when one parent is missing. For a
reachable route, begin with a small list of Pals you actually own and let each
new child become available for later steps.

A practical chain planner should:

[list]
[*]start only from the owned roster you provide;
[*]reuse children produced earlier in the route;
[*]allow unavailable or legendary parents to be excluded; and
[*]show every dependency rather than only the final pair.
[/list]

The shortest route can change when you add one more owned Pal or relax a
constraint. It is “shortest for this starting set,” not a universal best route
for every player.

### 5. A 14-Step Owned-Pals Example

Starting roster:

[quote]Dinossom Lux + Foxcicle[/quote]

Target:

[quote]Nyafia[/quote]

With legendary and unavailable parents excluded, the route used for this
example contains 14 dependency steps:

[olist]
[*]Dinossom Lux + Foxcicle → Reindrix
[*]Dinossom Lux + Reindrix → Rayhound
[*]Foxcicle + Rayhound → Rayhound Cryst
[*]Reindrix + Rayhound Cryst → Hoodle
[*]Hoodle + Rayhound Cryst → Beakon
[*]Beakon + Rayhound Cryst → Vanwyrm
[*]Vanwyrm + Beakon → Kitsun
[*]Foxcicle + Rayhound Cryst → Elizabee
[*]Dinossom Lux + Elizabee → Azurobe
[*]Azurobe + Rayhound Cryst → Petallia
[*]Vanwyrm + Foxcicle → Vanwyrm Cryst
[*]Vanwyrm Cryst + Beakon → Bushi
[*]Petallia + Bushi → Petallia Ignis
[*]Kitsun + Petallia Ignis → Nyafia
[/olist]

This route also shows why a chain is a dependency graph rather than one straight
family line: Rayhound Cryst, Beakon, and Vanwyrm are reused in later branches.
Do not discard an intermediate Pal until every downstream step that needs it is
finished.

### 6. Five Checks Before Spending Cake

[olist]
[*][b]Check the supported version.[/b] A correct result for an older dataset may be wrong for Palworld 1.0.
[*][b]Separate direct pairs from chains.[/b] A direct pair needs one egg; a chain also needs every intermediate result.
[*][b]Start with a real roster.[/b] An owned-Pals route is only as useful as the list you enter.
[*][b]Keep constraints visible.[/b] Excluding legendary or unavailable parents can lengthen a route, but may make it achievable.
[*][b]Plan traits separately.[/b] A species route does not guarantee that the final child inherits the passives you want.
[/olist]

For a long route, write down the intermediate Pals and mark each one only after
the required egg has hatched. This prevents you from losing track of a parent
that appears again several steps later.

### 7. What This Workflow Does Not Predict

The examples above answer species and route questions. They do not promise:

[list]
[*]a passive-skill inheritance result;
[*]a particular mutation;
[*]an egg on the first attempt;
[*]a breeding or incubation time; or
[*]that the same route is shortest after your Palbox changes.
[/list]

Treat the route as a plan for which species to produce. Treat traits, mutations,
and game settings as separate layers of the breeding process.

### 8. Optional Calculator and Disclosure

If you prefer searching instead of working through the combinations manually,
I maintain [url=https://palworldbreedingcombos.com/?utm_source=steam&utm_medium=community_guide&utm_campaign=palworld_1_0_breeding_workflow]Palworld Breeding Combos[/url].
It supports the three workflows in this guide and displays the game version,
dataset revision, generated date, and verification status with its results.

[b]Disclosure:[/b] I am the maintainer of that site. It is an independent,
unofficial fan-made tool, free to use, with no account, ads, affiliate links,
payments, or save-file uploads. The link is optional; the full workflow and the
14-step example are included above so this guide remains useful without it.

### 9. Quick FAQ

[b]Why does another guide give a different child?[/b]

Check which game/data version each guide supports. Do not mix a pre-1.0 chart
with a Palworld 1.0 route.

[b]Why are there so many parent pairs for one target?[/b]

Reverse lookup lists what can produce the target. You still need to choose the
pair that fits your roster, progress, and passive-skill plan.

[b]Does the 14-step example mean Nyafia always needs 14 eggs?[/b]

No. It is a route from the two-Pal starting roster shown above with the stated
constraints. A different owned roster can produce a shorter route.

[b]Does a species result guarantee the passive I want?[/b]

No. Species planning and passive inheritance are separate problems.

## Publishing checklist

### Before creating the guide

- [x] QA, SEO, compliance, production URL, and Owner launch gates already passed.
- [x] Copy is original and useful without the product link.
- [x] No game files, official logos, character art, or third-party images are included.
- [x] Only one disclosed product link appears in the guide.
- [x] Feature and dataset claims match the production site.
- [x] Exact examples were regenerated from `data/launch/dataset.json` on 2026-08-03.
- [ ] Confirm the Steam account owns Palworld and can create a guide.

### Private/unlisted QA

- [ ] Create the guide as non-public first.
- [ ] Upload the cover and three interface screenshots.
- [ ] Confirm the title, short description, categories, language, and section order.
- [ ] Confirm all BBCode renders correctly.
- [ ] Confirm the single UTM link opens the production site.
- [ ] Check desktop and narrow-window readability.
- [ ] Confirm Steam does not show an account restriction, security warning, CAPTCHA, or moderation error.
- [ ] Record the draft URL and item ID.

### Public-release gate

- [ ] Request explicit Owner confirmation after private QA.
- [ ] Switch to Public only after confirmation.
- [ ] Verify the logged-out public URL, HTTP response, guide content, disclosure, and outbound link.
- [ ] Record publication time, final URL, moderation state, and first follow-up date.

## Evidence and risk notes

- Steam Community rules prohibit spam, off-topic contributions, unauthorized
  images, and commercial advertising. This guide therefore avoids sales copy,
  contains no monetization, and uses only project-owned abstract/interface art.
- Steam may require email verification or moderation for new UGC. A submitted
  draft is not `LIVE` until logged-out public access is verified.
- The strongest comparable guides are list-driven. Their traffic demonstrates
  interest in Palworld 1.0 breeding, but their factual claims were not copied
  into this draft.
- Do not repost this copy into discussions or comments. The guide is the only
  intended Steam surface.

## Source links used for preparation

- Steam Community Rules and Guidelines:
  <https://help.steampowered.com/en/faqs/view/6862-8119-C23E-EA7B>
- Steam UGC verification and approval:
  <https://help.steampowered.com/en/wizard/HelpWithUGCSubmission>
- Comparable 1.0 guide, catalogue angle:
  <https://steamcommunity.com/sharedfiles/filedetails/?id=3765158240>
- Comparable 1.0 guide, recommended-combinations angle:
  <https://steamcommunity.com/sharedfiles/filedetails/?id=3768141612>

These preparation links are internal evidence for the launch record. They do
not need to be pasted into the public Steam guide.
