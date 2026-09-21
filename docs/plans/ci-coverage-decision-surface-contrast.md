# Plan — three proposals for section / background contrast

Interactive mock: [`ci-coverage-decision-surface-contrast.html`](./ci-coverage-decision-surface-contrast.html)
— flip between all three on a real page fragment.

Every figure below was computed by compositing the actual token values through a
canvas, not estimated.

---

## What is actually happening

In light mode `--background` is **pure white** (`oklch(1 0 89.88)`), and the glass card
is `bg-white/55` with a `border-white/80` rim.

**White at 55% over white is white. White at 80% over white is white.** So the card's
fill and its rim contribute *nothing*: measured card-vs-page is **1.000** and
rim-vs-page is **1.000**. The only thing separating a section from the page is a single
`rgba(0,0,0,0.05)` shadow.

**Dark mode does not have this problem.** There the same `white/[0.055]` lands on
`oklch(0.21 …)` and lifts the card to **1.157**. Light is the outlier — which is the
tell: the glass system was designed for a tinted page, and in light mode it is not
getting one. Your instinct about the background is the right diagnosis.

---

## The three options

| | page | card | card vs page | rim vs page | scope |
|---|---|---|---|---|---|
| **0 · today** | `#ffffff` | `#ffffff` | **1.000** | **1.000** | — |
| **A · darker page** | `#f7f9fc` | `#fbfcfe` | 1.027 | 1.044 | 1 token, global |
| **B · real rim** | `#ffffff` | `#ffffff` | 1.000 | **1.165** | `GLASS_CLASSES` |
| **C · both** | `#f7f9fc` | `#ffffff` | **1.055** | 1.044 | 1 token + `GLASS_CLASSES` |

### A · Darken the page, leave the glass alone

```diff
- --background: oklch(1 0 89.88);
+ --background: oklch(0.982 0.004 255);
```

One token. Your suggestion, and the smallest possible step.

**Why it is modest on its own:** the card is 55% white, so darkening the page behind it
is *filtered* — 45% of the change reaches the surface and the card's own fill absorbs
the rest. `#ffffff → #f7f9fc` is a 1.055 step on the page but only **1.027** between
card and page.

### B · Leave the page, make the rim real

```diff
- "bg-white/55 border border-white/80 rounded-2xl backdrop-blur-sm",
+ "bg-white/55 border border-border/70 rounded-2xl backdrop-blur-sm",
- "shadow-[0_2px_16px_2px_rgba(0,0,0,0.05),…]",
+ "shadow-[0_2px_16px_2px_rgba(0,0,0,0.07),…]",
```

The page is untouched, so the sidebar relationship is untouched too. On a white page a
*whiter* card is a no-op, so the only lever left is the edge — and at **1.165** this is
the strongest boundary of the three.

It is also the only option that moves the number WCAG would actually care about: 1.4.11
governs the boundary of a **control**, and the queue's cards are `selectable` buttons.

**Cost:** the card reads as an outlined card rather than as glass. That is a character
change, not just a contrast change.

### C · Darken the page *and* make the card opaque — recommended

```diff
- --background: oklch(1 0 89.88);
+ --background: oklch(0.982 0.004 255);
```
```diff
- "bg-white/55 border border-white/80 rounded-2xl backdrop-blur-sm",
+ "bg-white border border-border/60 rounded-2xl backdrop-blur-sm",
```

At **1.055** the fill does real work for the first time, and the rim still helps at
1.044. This is what the glass system was drawn for: a light surface floating on a tinted
page.

**Recommended** because it fixes the cause rather than compensating for it — but it is
the largest change of the three, and `backdrop-blur-sm` becomes decorative once the fill
is opaque (worth removing in the same pass, or keeping only for the `glass` variant).

---

## Two things worth knowing before choosing

**A and C spend some of the sidebar's separation.** The sidebar is already `#f3f6fb`,
*darker* than the page. Darkening the page to `#f7f9fc` narrows page-vs-sidebar from
**1.083 to 1.027**. It still reads as three layers — sidebar darkest → page → card
lightest, which is a more coherent elevation model than today's — but it is a trade, not
a free win. If it matters, the sidebar can go a step darker in the same change.

**None of these are WCAG pass/fail numbers, and it would be easy to overclaim.** WCAG
1.4.11's 3:1 applies to the boundary of a control and to state changes, not to
decorative layering of panels; no surface-vs-surface ratio is mandated. These figures
are perceptibility, and for adjacent surfaces the useful band is roughly **1.05–1.15**.
On that scale today's 1.000 is below anything, A lands just under the band, and B and C
land inside it.

---

## Scope note

All three are **global** — `--background` is every screen and `GLASS_CLASSES` is every
card. None of them is scoped to `ciCoverageDecision`.

That is deliberate. A flag-scoped tint on this page's own canvas is possible and is the
zero-risk option, but it would make this page the only one in the app with a tinted
canvas — reintroducing exactly the kind of divergence the last change removed. If the
appetite is only for a local fix, say so and I will write that variant up instead; but
the honest reading is that this is an app-wide bug that happens to be most visible here.

**Whichever is chosen, it wants eyes on the other screens** — the work queue's table
card, the actions list, and the dashboard metric cards — since they all read from the
same two values.

## Checks, once one is picked

- [ ] `tsc -b` and `npm run build` clean
- [ ] Card-vs-page and rim-vs-page measured on the running page, light and dark
- [ ] Dark mode unchanged — it is already at 1.157 and none of these should move it
- [ ] Page-vs-sidebar re-measured (A and C only)
- [ ] Work queue, actions, case detail and dashboard eyeballed
- [ ] `selectable` cards' hover and selected states still read (they add a primary rim)
