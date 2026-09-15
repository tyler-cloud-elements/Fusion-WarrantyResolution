# Plan — styling the CI coverage decision into the app

Companion to [`ci-coverage-decision.md`](./ci-coverage-decision.md), covering
requirement 3.iii: *only update fonts/styles/spacing if necessary to blend in
with the rest of the app.*

Worked example: [`ci-coverage-decision-styles.html`](./ci-coverage-decision-styles.html)

---

## Finding: the theme is already identical, so this is a three-item list

Cartographer's `warranty-console.css` is a **generated** sheet built from this
app's own `index.css`. Every token the ported tree touches matches:

| | app `src/index.css` | cartographer sheet |
|---|---|---|
| `--font-sans` | `Inter, ui-sans-serif, sans-serif, system-ui` | identical |
| `--font-mono` | `IBM Plex Mono, ui-monospace, monospace` | identical |
| `--spacing` | `0.25rem` | identical |
| `--tracking-normal` | `0em` | identical |
| `--radius` | `0.625rem` | identical |

And the four custom properties the ported components read directly — `--border`,
`--primary`, `--ring`, `--warning` — are all defined in `src/index.css`.

**So there is no font change, no spacing-scale change, and no token to add.**
The port inherits the app's theme exactly, which is the outcome the brief asked
for. What is left is three cosmetic deltas, all cheap, all optional.

---

## 1. Page title — 20/600 vs the app's 24/700

**Leave as v3 has it. No change.**

`primitives.tsx` sets `TYPE.page` to `text-xl leading-tight font-semibold
tracking-tight` and documents why at length: the app's 24/700 `h1` on
`CaseDetailPage` carries a customer name — two or three words — while this one
carries a 41-character sentence ("Coverage decision — combined cause finding")
that also has to share its line with the case id and three status readings.

This is a deliberate departure, argued in the source, and it is scoped to one
page. Overriding it to match `text-2xl font-bold` would be undoing the author's
decision to satisfy a consistency rule the author already considered. Keeping it
also keeps the port byte-faithful.

---

## 2. Dropdown menu — the one item worth doing

`MoreMenu` is the only shared primitive where v3 and this app genuinely
disagree, and it is the one place the CI page will look *slightly* unlike
cartographer if nothing is done.

| | this app `ui/dropdown-menu.tsx` | v3 |
|---|---|---|
| surface | `bg-popover text-popover-foreground` | `bg-card text-card-foreground` |
| rim | `border` | `border-border` |
| shadow | `shadow-md` | `shadow-lg` |
| item radius | `rounded-sm` | `rounded-md` |
| item padding | `px-2 py-1.5` | `px-2.5 py-2` |
| item size | `text-sm` (14px) | `text-[13px]` |

v3 also wraps the Radix portal in a `.wrc` container lookup. **That part is
cartographer-only** — it exists because Radix portals to `document.body`, which
sits outside cartographer's scoped token element. There is no `.wrc` here, so
that hunk is dropped (it is already excluded in the main plan).

### Recommendation: scope it, do not change the shared primitive

`ui/dropdown-menu.tsx` is used across the app. Editing it to match v3 would move
every menu in the product for the sake of one page — the opposite of "should not
affect the rest of the app".

Instead, `MoreMenu.tsx` passes the six classes on its own content and items:

```tsx
<DropdownMenuContent
  align="end"
  className="bg-card text-card-foreground border-border shadow-lg"
>
  <DropdownMenuItem className="rounded-md px-2.5 py-2 text-[13px]" … />
```

Six utility classes in one file. `tailwind-merge` — already wired through `cn` —
resolves each against the base, so there is no specificity fight and no
`!important`. The rest of the app's menus are untouched.

**Cost of skipping this entirely:** the More menu's rows are 1px taller in
cartographer and one step darker against a card. Visible only side-by-side.

---

## 3. Choicebox selected ring — port verbatim, flag for later cleanup

`ui/choicebox.tsx` draws its selected state with an inline `boxShadow` rather
than `ring-*`, and its comment explains why:

> Every `ring-*` utility is DEAD inside `.wrc`. […] the console's prebuilt sheet
> never sets `--tw-ring-color`, and the shell's copy of the utility loses the
> cascade.

That is a cartographer defect. **This app has a real Tailwind 4 build, so
`ring-*` works here.** But the inline shadow also works here, and it renders the
same thing:

```ts
boxShadow: "0 0 0 3px color-mix(in oklab, var(--primary) 18%, transparent)"
```

versus the idiomatic-here equivalent:

```
border-primary ring-[3px] ring-primary/20
```

`primary/20` is a 20% alpha on `--primary`; `color-mix(… 18%, transparent)` is
18% — a 2-point difference nobody can see.

**Port the inline version verbatim.** Rewriting it during the copy means the
ported file no longer matches its source, so a future re-sync silently
reintroduces it, and the comment explaining the workaround becomes a lie about
this codebase. Leave a one-line note that the workaround is inert here and the
utilities can replace it whenever `choicebox` is next touched on purpose.

---

## 4. What is NOT on this list, and why

- **`GLASS_CLASSES`** — the hero card's glass treatment. `ui/card.tsx` is
  byte-identical between the two trees, so the CI page's header already renders
  with the app's own glass.
- **`Rows` / `CardHead` / `Pill` / fold chevrons** in `primitives.tsx` — all
  built from `border-border` / `bg-card` / `rounded-xl`, which is the shape the
  app already uses for its SLA rows and open-action cards. `primitives.tsx`
  says so itself.
- **Dark mode** — driven by the same `light`/`dark` class on the root that this
  app's `shell-theme-provider` already writes. v3's only change to that file was
  redirecting the write into `.wrc`, which is dropped.
- **The `select-text` opt-in** on the record scroller — cartographer sets
  `select-none` on `<body>`, this app does not. The opt-in is a no-op here and
  harmless; leave it, since removing it would break the capture gesture if the
  app ever adopts `select-none`.

---

## 5. Summary

| item | action | files | verdict |
|---|---|---|---|
| fonts | none | — | already identical |
| spacing scale | none | — | already identical |
| tokens | none | — | all four present |
| page title 20/600 | keep v3 | — | deliberate, documented, page-scoped |
| dropdown menu | 6 classes, via one shared constant | 4 | **done** |
| choicebox ring | ported verbatim | — | note only |

## As built

The menu classes are a `MENU` constant in `components/coverage/primitives.tsx`,
beside `TYPE` and `INK`:

```ts
export const MENU = {
  content: "bg-card text-card-foreground border-border shadow-lg",
  item: "rounded-md px-2.5 py-2 text-[13px]",
} as const;
```

Three call sites pass it — `LabelledSelect.tsx`, `decision/RationalePanel.tsx`
and `dock/MoreMenu.tsx`. §2 above only named `MoreMenu`, which was the wrong
scope: `LabelledSelect` draws the relevance and decision menus on every evidence
row, so it is the one a reviewer actually opens. A constant rather than six
literal class strings, so the next change is one edit and cannot drift between
the three.

`ui/dropdown-menu.tsx` is untouched, so every other menu in the app is unmoved.
Verified in the running app: the evidence menus render at 13px with the taller
rows, and the flag-OFF console's own menus are unchanged.
