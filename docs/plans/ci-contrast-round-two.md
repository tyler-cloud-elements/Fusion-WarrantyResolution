# Plan — round two: more surface contrast, and a submit button that passes AA

Interactive example: [`ci-contrast-round-two.html`](./ci-contrast-round-two.html) — two
toggles in the bar, live on the page's own decision card.

**Two problems held to two different standards**, and it matters which is which:

- **Surface separation** is perceptibility. No WCAG threshold applies to the layering of
  panels; 1.4.11's 3:1 governs the boundary of a *control*.
- **The submit button is a measured WCAG AA text failure** (1.4.3). It is not a matter of
  taste and it should probably be fixed regardless of what is decided about surfaces.

All figures computed by compositing the real token values.

---

## 1 · More separation between sections and the page

Today, after the last change: **card 1.055 / rim 1.106**.

**The non-obvious part: the two levers pull against each other.** As the page darkens the
fill contrast rises, but the rim contrast *falls* — `--border` is a fixed light grey, so a
darkening page converges on it. Going further therefore means moving **both**: darken the
page *and* take the rim from `border-border/60` to the full token.

| option | page | card vs page | rim /60 | rim full | shadow |
|---|---|---|---|---|---|
| **now** | `#f7f9fc` | 1.055 | 1.106 | 1.189 | .05 |
| **S1** one step | `#f4f7fb` | 1.075 | 1.095 | **1.167** | .05 |
| **S2** sidebar depth | `#f1f4f9` | **1.102** | 1.077 | **1.138** | .05 |
| **S3** muted depth | `#eef1f7` | **1.131** | 1.066 | 1.109 | .08 |

### Recommended: S2 with the rim at full strength

```diff
- --background: oklch(0.982 0.004 255);
+ --background: oklch(0.966 0.007 259);
```
```diff
- "bg-white border border-border/60 rounded-2xl backdrop-blur-sm",
+ "bg-white border border-border rounded-2xl backdrop-blur-sm",
```

**fill 1.102 / rim 1.138** — both inside the 1.05–1.15 band where adjacent surfaces read
as separate, and neither pushed so far that the canvas starts reading as grey rather than
as a lighter shade of the same hue.

**S3** buys a stronger fill but its rim slips *below* S2's, and the page begins to look
like a different colour instead of a tint. **S1** is the option if this should barely move.

The shadow is an independent third lever (`.05 → .08`) and is bundled into S3 only; it can
be added to any of them if the lift wants to read as elevation rather than as a plate.

---

## 2 · The submit button — a real AA failure

White ink on `--primary` (`#009fb0`) measures **3.19:1**. The label is **13px / 600**,
which is *normal* text under 1.4.3 — large text starts at 18.66px bold — so the
requirement is **4.5:1**.

It fails, and it fails on the one control that files the decision.

### The correction worth making

`SubmitBar.tsx` already records the 3.19 and guesses that `--primary-700` "would clear
it". **Measured, it does not** — 700 is **3.65**. The first rung that clears 4.5 is **800**.

| fill | hex | white ink | AA (4.5) |
|---|---|---|---|
| `--primary-500` | `#22aebe` | 2.67 | ✗ |
| `--primary-600` ← today | `#009fb0` | 3.19 | ✗ |
| `--primary-700` | `#0093a9` | 3.65 | ✗ |
| **`--primary-800`** | `#007b92` | **4.94** | **✓** |
| `--primary-900` | `#00637c` | 6.83 | ✓ (AAA needs 7) |

### Recommended: the `default` button variant takes `primary-800`

```diff
  variant: {
-   default: "bg-primary text-primary-foreground hover:bg-primary/90",
+   default: "bg-primary-800 text-primary-foreground hover:bg-primary-900",
```

**In `ui/button.tsx`, not in `SubmitBar`, and not on `--primary` itself.** Three scopes
were possible and this is the middle one:

- Editing `SubmitBar` alone fixes one button and leaves every other primary button in the
  app failing — and that file's own note already argues the fix does not belong there.
- Editing `--primary` moves the token everywhere, including the dozens of places it is used
  for *non-text* purposes: selection rings, the authority meter, the choicebox rim, focus
  outlines. None of those have a text-contrast problem and all of them would get darker.
- The `default` variant is exactly "a filled primary button", which is the thing that
  fails.

`hover:bg-primary-900` keeps the hover a step darker than the rest, as
`hover:bg-primary/90` did.

**Knock-on to check:** `SubmitBar` adds `active:bg-primary/80` for its pressed state. On an
800 fill that alpha reads lighter than the base, inverting the press. It becomes
`active:bg-primary-900`, which is one line in that file.

---

## 3 · The same flaw is in every sibling filled variant

Not what was asked, but it is the same measurement, and knowing it should inform the scope
decision. White ink on each filled token:

| variant | hex | white ink | AA |
|---|---|---|---|
| `warning` | `#ecb344` | **1.89** | ✗ — barely legible |
| `primary` | `#009fb0` | 3.19 | ✗ |
| `info` | `#0093a9` | 3.65 | ✗ |
| `destructive` | `#d15a63` | 3.92 | ✗ |
| `success` | `#418958` | 4.25 | ✗ (close) |

**Every filled variant fails AA with white ink**, and `warning` is not close — 1.89 is
essentially unreadable. `warning` almost certainly wants dark ink rather than a darker
fill, since a yellow dark enough for white text stops being yellow.

**Deliberately a separate follow-up.** Folding five token families into this change would
make it unreviewable, and each needs its own judgement about fill-vs-ink. Recorded here so
it is a decision rather than an oversight.

---

## Files

| file | change |
|---|---|
| `src/index.css` | `--background` → `oklch(0.966 0.007 259)` |
| `components/ui/card.tsx` | `border-border/60` → `border-border` |
| `components/ui/button.tsx` | `default` variant → `bg-primary-800` / `hover:bg-primary-900` |
| `components/coverage/decision/SubmitBar.tsx` | `active:bg-primary/80` → `active:bg-primary-900`; correct the stale "700 would clear it" note |

Part 1 and part 2 are independent and can ship separately. Part 2 is the one with a
compliance argument behind it.

## Checks

- [ ] `tsc -b` and `npm run build` clean
- [ ] Card-vs-page and rim-vs-page re-measured on the running page, light and dark
- [ ] Submit label measured ≥ 4.5:1 against its own fill
- [ ] The pressed state is *darker* than the base, not lighter
- [ ] Dark mode: `--primary` is `oklch(0.69 …)` there with a dark `--primary-foreground`, so
      the dark button is a different pairing — measure it rather than assuming it moved
- [ ] Every primary button in the app eyeballed: queue, case detail, actions, dashboard
- [ ] Focus rings, the authority meter and the choicebox rim unchanged (they read
      `--primary`, which this plan does not touch)
