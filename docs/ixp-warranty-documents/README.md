# Warranty case documents for IXP

Seven illustrative documents built around the FUSION 2026 keynote use case, for the IXP workshop and any IXP
portion of the demo. All content is fictional. Cobalt Ridge Automation, Northstar Retail Distribution, and
Meridian Industrial Services do not exist.

Everything here is consistent with the keynote scenario: case WR-2026-0417, a Sortation Line SR-440 that stops
at 6:40 AM on 17 April 2026 at Northstar's Joliet Distribution Center, where the evidence turns out to point at
both a real part failure and unapproved third-party work done eleven days earlier.

## The documents

| File | What it is | Pages |
|---|---|---|
| `warranty-claim-intake-email.pdf` | Northstar's outage report, with an earlier thread quoted underneath | 2 |
| `third-party-service-report.pdf` | Meridian's field work order for the drive replacement | 2 |
| `installed-asset-service-history.pdf` | Cobalt Ridge service record for the asset, six visits | 2 |
| `cobalt-ridge-warranty-terms.pdf` | The warranty terms and conditions, clause-numbered | 2 |
| `warranty-SOP-v3.pdf` | The internal procedure governing warranty resolution | 3 |
| `returned-part-inspection.pdf` | Laboratory report on the returned drive, unit 4 of 4 | 3 |
| `claim-evidence-packet-combined.pdf` | Three of the above stacked into one file, unsplit | 7 |

Each document uses a deliberately different layout, typeface, and structure, because layout variation between
documents is the condition IXP is built for. The third-party report in particular looks nothing like a Cobalt
Ridge document, which is the point.

## What each one exercises

**Free-form narrative.** The intake email and the technician notes are prose, not fields. The technician note is
set in a handwriting face.

**Complex tables.** The work order carries a parts-and-labor table and a controls-parameter table with was and
set-to columns. The inspection report has a measurement table comparing one unit against a range and a reference.

**Graphics and checkboxes.** The work order opens with a checkbox classification block. The inspection report
includes a bar chart of junction resistance across the four returned units.

**Signatures.** The work order, the terms, and the inspection report all carry signature blocks.

**Multi-document stacks.** `claim-evidence-packet-combined.pdf` is three separate documents submitted as one
file with no separator pages, which is how customers actually send evidence. Use it to demonstrate splitting and
classification without pre-processing.

## The inferred values, which are the interesting part

IXP's differentiator is extracting values that are not stated anywhere and must be derived. This document set was
built so that the decisions in the case depend on exactly that. These are worth building the workshop around:

**Was the third-party work authorized?** No document contains an authorization field. It has to be inferred from
one line in the service history saying no authorization request was received, read against clause 4.1 of the terms
requiring written authorization before a drive replacement.

**Is the installed drive an approved part?** The work order calls it an "equivalent unit". Clause 3.2 of the terms
says components described as "equivalent" or "compatible" are specifically not approved parts. Neither document
answers the question alone.

**When does the warranty expire?** Derivable from the commissioning date of 14 September 2024 plus the
twenty-four month term in clause 1.1. The service history also states it outright, so extraction can be
cross-checked against a derived value.

**How long did the line run with the thermal threshold raised?** The inspection report says the duration is not
established. A model should return nothing here. It is the negative case, and it is the one most likely to produce
a confident hallucination.

**What is the coverage position?** This needs clause 3.1 and clause 3.2, the work order showing both a
non-approved part and three controls changes, and the January service finding SF-2026-0114 recording an elevated
drive temperature *before* any third-party work happened. That last item is what makes the answer partial coverage
rather than a clean denial, and it is the whole reason the case needs a person.

**What did the non-approved part cost on its own?** $11,480 of a $13,307.50 total, which requires reading the
table rather than the summary line.

## Fields worth putting in the extraction schema

Asset serial, site, customer, commissioning date, warranty expiry, impact tier, reported failure time, claimed
daily exposure, third-party vendor name, work order number, date of service, removed part number and serial,
installed part number and serial, each changed controls parameter with its before and after value, whether full
validation was performed, parts subtotal, labor subtotal, total, open finding reference, and finding date.

## Two things to know

The alarm timeline and the controls change audit that appear in the demo as a CSV and a JSON file were left out on
purpose. Both are structured data, so they are integration inputs rather than extraction targets, and putting them
in front of IXP would misrepresent what the product is for.

There is an inconsistency in the underlying demo material worth resolving before anything ships. The storyboard and
the Confluence page put the line stop at 6:40 AM, while the demo asset file describes an alarm window of 08:41 to
09:07. These documents use 6:40 AM, since that is the time the storyline is anchored on, and they do not reproduce
the alarm window.

## Rebuilding

The generator is `build_docs.py` in the session scratchpad. It writes HTML and prints to PDF through headless
Chrome, so any edit to the scenario can be reflected by editing the strings and rerunning it.
