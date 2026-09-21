# CI narrow — a flag for the card width

`ciNarrow`, **off by default**, sits directly under **CI Coverage decision** in the
left nav. On, every card-based page is held to **960px** and centred; off, the app
is exactly what it was.

## The number

960 is a measured floor, not a round number. The three resolution cards bind it:
"Approve partial + goodwill" needs **198px** to stay on one line, so the row needs
618px of content between them. 960 leaves each card 290px. Below about 900 they
wrap and the gain turns into a cost.

What it buys is horizontal travel. On the decision's evidence rows the span
between an item's name and its first control:

| window | off | on |
|---|---|---|
| 1600px | 581px | 361px (−38%) |
| 1173px | 463px | 359px (−22%) |

The cards themselves lose very little: the widest prose block on the page is
724px, set by the card's own internal split rather than by the page.

## Four places, one helper

`lib/layout.ts` holds the number and `usePageWidthClass()`. It returns a class
rather than a boolean, so `cn` — tailwind-merge — resolves it against whatever
wider `max-w-*` the site already carries.

| site | off | on |
|---|---|---|
| `PageContainer` — cases list, performance, case plans | no cap | 960 |
| `CoverageDecisionCiPage` | 1180 | 960 |
| `DecisionConsolePage` | 1460 | 960 |
| `CaseDetailPage` | no cap | 960 |

Two details worth keeping:

**In `PageContainer` the cap goes INSIDE the scroller.** Capping the scrolling
element would centre the scrollbar in the window along with the content, which
reads as a panel rather than a page. The wrapper is always rendered, even when the
flag is off and it carries no classes, so toggling does not remount the subtree.

**In `CaseDetailPage` the cap goes ON the `@container`.** Its tab layouts switch on
that element's width, so narrowing the content while leaving the query element wide
would have them pick a two-column arrangement for a one-column space. Verified: the
Overview keeps its Action-needed / Summary pair correctly at 960.

**Actions is left out.** It is a split-pane layout driven by container queries with
no single content column to cap; capping it is a different change.

## Verified

Flag off (default): the decision page resolves `max-w-[1180px]`, the app is
unchanged. Flag on: a single `max-w-[960px]`, travel 463 → 359px at a 1173px
window, resolution cards 311 → 277px — still well above the 198px floor. The nav
lists **CI narrow** at position 12, directly under **CI Coverage decision** at 11.
`tsc -b` and `npm run build` clean, no console errors.

## The one place it costs something

**The work queue's table gains a horizontal scrollbar.** Measured: the table needs
**992px** and 960 gives its scroller 958. It is `overflow-x-auto` by design so
nothing is clipped and no data is lost — but a sideways scroll on the main queue is
the opposite of the easier panning this flag is for.

Mock 2 predicted this; the number confirms it. Three ways out, all one line:

1. **Leave it.** The flag is off by default and whoever turns it on sees the trade.
2. **Exempt the cases list** — drop `usePageWidthClass()` from that one page. The
   tiles above the table stay full width too, which is the wrinkle.
3. **Raise the cap to 1024.** The table fits at 1022 and the decision page keeps
   most of the benefit — travel would be ~395px instead of 359px.

Shipped as (1), because it is what was asked for and it is reversible in a line.
