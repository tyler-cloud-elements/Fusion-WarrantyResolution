# Plan — `CI Coverage decision` flag

Port the cartographer `signal-collector/warranty-console-v3` coverage-decision
screen into `warranty-resolution-app`, behind a flag that is ON by default, with
zero change to the app when it is OFF.

**Source**
`cartographer/app/signal-collector/_views/warranty-console-v3/app/pages/cases/DecisionConsolePage.tsx`
plus its transitive closure.

> Naming note: the folder is `warranty-console-v3`, not `warranty-resolution-v3`.
> Its coverage-decision screen is `pages/cases/DecisionConsolePage.tsx`. The
> sibling `_views/coverage-decision-console` is a different, older, 5-file
> prototype and is **not** what this plan ports.

---

## 0. What the source actually is

`warranty-console-v3` is a **fork of this app**, not a separate codebase. Diffing
the two trees with the `@wrc3/` → `@/` alias normalised away:

| | files |
|---|---|
| byte-identical to `warranty-resolution-app/src` | 130 |
| new in v3 | 22 |
| genuinely modified | 13 |

Of the 13 modified files, 9 are cartographer **embedding** artifacts with no
bearing on the screen — `router.tsx` (browser-history factory), `app-base.ts`
(Next static export paths), `services/uipath/*` (the SDK is not installed in
cartographer, so `env()` returns `""`), `shell-theme-provider.tsx` /
`shell-sidebar.tsx` / `shell-layout.tsx` / `dropdown-menu.tsx` (all writing into
a `.wrc` scope element that does not exist here), and `flags.ts` / `RoleProvider.tsx`
(different `localStorage` keys so the fork does not share state with v1).

**None of those get ported.** That leaves a small, well-bounded job: 29 new files,
4 touched files, and one data decision (§4).

### The import closure

Traced from `DecisionConsolePage.tsx` — **55 files, zero unresolved**, and every
npm package it reaches (`react`, `@tanstack/react-router`, `@tanstack/react-query`,
`lucide-react`, `radix-ui`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-slot`,
`@radix-ui/react-tooltip`, `class-variance-authority`, `clsx`, `tailwind-merge`)
is **already a dependency of `warranty-resolution-app`**. No `package.json` change.

Of those 55, 26 are files this app already has byte-identical (`ui/button`,
`ui/card`, `ui/badge`, `ui/collapsible`, `ui/tooltip`, `ui/skeleton`,
`CaseSkeletons`, `PageContainer`, `lib/utils`, `lib/warranty/*`, `useCases`, …),
so they are reused in place rather than copied.

---

## 1. The flag

`src/lib/flags.ts`, three additions:

```ts
export interface FeatureFlags {
  // …existing
  /**
   * Swap the coverage decision for the CI build of the screen.
   *
   * On, /cases/WR-2026-0417/tasks/coverage-decision renders the rebuilt
   * single-column record — the case and its finding, then the decision with the
   * evidence it rests on underneath it, then customer, precedent and documents
   * folded. Off, the two-column console with the sticky decision card comes
   * back, unchanged.
   *
   * Only WR-2026-0417 is authored (`coverageFixtureFor`), so every other case
   * keeps the existing console either way.
   */
  ciCoverageDecision: boolean;
}
```

```ts
export const DEFAULT_FLAGS: FeatureFlags = {
  // …existing
  ciCoverageDecision: true,       // ON by default, per the brief
};
```

```ts
export const FLAG_LABELS = {
  // …existing, then LAST:
  ciCoverageDecision: {
    label: "CI Coverage decision",
    hint: "Showcase the coverage decision page for CI",
  },
};
```

**Why last in `FLAG_LABELS` specifically.** `FeatureFlagsPanel.tsx:125` renders
`Object.keys(FLAG_LABELS).map(…)`, and the panel is the shell's `sidebarFooter`
(`router.tsx:74`). Key insertion order *is* the left-nav order, so appending here
puts the row at the end of the list. `DEFAULT_FLAGS` order is irrelevant to
rendering.

Nothing else is needed: `read()` already spreads stored flags over the defaults,
so anyone with an existing `warranty-app-flags` object gets the new flag ON
rather than `undefined`.

---

## 2. Files to add — 29

Landing zones mirror the cartographer layout so a future re-sync is a copy plus
the same five rewrites (§3).

### From `warranty-console-v3/app` → `warranty-resolution-app/src`

| # | source | destination |
|---|---|---|
| 1–8 | `components/coverage/{CaseFacts,EvidenceComposer,EvidenceList,Finding,LabelledSelect,RecordSections,primitives}.tsx`, `evidenceColumns.ts` | `src/components/coverage/` |
| 9–12 | `components/coverage/decision/{DecisionSection,FiledRecord,RationalePanel,SubmitBar}.tsx` | `src/components/coverage/decision/` |
| 13 | `components/coverage/dock/MoreMenu.tsx` | `src/components/coverage/dock/` |
| 14 | `components/ui/choicebox.tsx` | `src/components/ui/` — new filename, no collision |
| 15–18 | `lib/coverage/{fixture,store,useReassessment,wordDiff}.ts` | `src/lib/coverage/` |
| 19 | `pages/cases/DecisionConsolePage.tsx` | `src/pages/cases/CoverageDecisionCiPage.tsx` — **renamed**, so it does not collide with the page it branches from |

### From the cartographer host

| # | source | destination |
|---|---|---|
| 20–22 | `_components/evidence-capture/{add-evidence-bar.tsx,evidence-templates.ts,use-screen-selection.ts}` | `src/components/coverage/evidence-capture/` |
| 23–28 | `_data/{case-sections,coverage-decision,decision-signals,evidence-anchors,precedent,case-documents}.ts` | `src/lib/coverage/data/` |

These six `_data` modules import only from each other — nothing cartographer-specific.

### Written for this port

| # | file |
|---|---|
| 29 | `src/lib/coverage/caseOverlay.ts` — see §4 |

### Deliberately NOT ported

Unreachable from the v3 screen — `DecisionDock.tsx` is referenced only by a stale
comment in v2, and the two sheets and `useSheets` exist only for it:

- `components/coverage/dock/{DecisionDock,ReasonSheet,RefundSheet}.tsx`
- `lib/coverage/useSheets.ts`
- `components/warranty/{AgentRationale,DecisionSections,ReasonCollector}.tsx`

Copying them would add ~1,700 lines of dead code and three more files to keep in
sync. Nothing on the screen loses a feature: `MoreMenu` — the one dock part the
screen does use — is imported directly by `DecisionSection.tsx:6`.

---

## 3. Mechanical rewrites during the copy

Five find-and-replace passes, scriptable, no judgement calls:

1. `@wrc3/` → `@/` — the whole point of the alias; 100% of the remaining path work.
2. `@wrc2/lib/coverage/fixture` → `@/lib/coverage/fixture`
   — one line, `evidence-templates.ts:48`, and it is a **type-only** import
   (`EvidenceCall`, `Importance`). v3's fixture exports both under the same names,
   so v2's copy does not need to come along.
3. `@/app/signal-collector/_data/<x>` → `@/lib/coverage/data/<x>`
   — two lines, `RecordSections.tsx:13-14`.
4. `@/app/signal-collector/_components/evidence-capture/<x>` → `@/components/coverage/evidence-capture/<x>`
   — three lines, in the page.
5. Strip `"use client"` — 19 of the copied files carry it. Harmless semantically,
   but esbuild warns `Module level directives cause errors when bundled` on every
   one, which is 19 lines of noise on every `npm run build`.

Plus one real edit:

6. **`case-documents.ts:48`** — `const DOCS = "/warranty-console/documents"`
   becomes `getAssetPath("documents")` from `@/lib/app-base`. All seven PDFs
   (`third-party-service-report.pdf`, `installed-asset-service-history.pdf`,
   `cobalt-ridge-warranty-terms.pdf`, `returned-part-inspection.pdf`,
   `warranty-claim-intake-email.pdf`, `warranty-SOP-v3.pdf`,
   `claim-evidence-packet-combined.pdf`) **already exist** at
   `warranty-resolution-app/public/documents/`. Nothing to copy, and
   `getAssetPath` is what keeps them resolving under a UiPath Coded App sub-path.

### Theme: nothing to do

The four CSS custom properties the ported tree reads — `--border`, `--primary`,
`--ring`, `--warning` — are all defined in `src/index.css`. Cartographer's
`warranty-console.css` is a *generated* sheet from this same source: identical
`--font-sans` (Inter), `--font-mono` (IBM Plex Mono), `--spacing: 0.25rem`,
`--tracking-normal: 0em`. The port inherits the app's theme exactly. Styling
deltas are in the companion plan and are cosmetic.

---

## 4. The data question — the one real risk

`lib/coverage/fixture.ts` says it plainly:

> The money and the agreement dates are NOT here. They come off the case and the
> action in `demoData.ts` — **v3's own copy** — so the claim total, the four
> lines, the authority limit and the renewal all print from one place.

And v3's `demoData.ts` **diverges from this app's in values, not just prose**:

| field | this app | v3 |
|---|---|---|
| `action.claimTotal` / `case.claimValue` | `16272.5` | `8185` |
| `action.costLines` | 8450 / 2682.5 / 1240 / 3900 | 3980 / 1295 / 960 / 1950 |
| | "Parts, gearbox", "Labour, 14.5 hrs" | "Parts — gearbox", "Labour — 7 hrs" |
| `action.authority.limit` | `10000` | `5000` |
| `action.authority.approver` | N. Brennan-Kowalczyk | L. Maxim |
| `case.standing.annualValue` | `184_000` | `2_340_000` |
| `case.standing.renewalDate` | `2027-09-02` | `2026-11-30` |
| `asset.warrantyStatus` | "…active to 2027-09-02…" | "…active to 2026-11-30…" |
| `action.title` | "Coverage decision: combined…" | "Coverage decision — combined…" |
| `causes[].summary` / `.established` | "ESTABLISHED 03-20 ON SITE" | "03-20, on site" |
| `verdict.headline` / `.detail` | one long paragraph | "No rule covers both causes," / "as they point towards opposite decisions." |
| `whyThisReachedYou` | longer | shorter |
| `action.effects` | "$9,690.00 accrual" | "$4,940.00 accrual" |

`demoData.ts` feeds the **whole app** — the work queue, case detail, the task
queue, the performance tiles. Porting v3's copy wholesale would change the claim
amount everywhere, which breaks requirement 4 (*flag OFF = no change*).

### Decision: a flag-scoped overlay

`src/lib/coverage/caseOverlay.ts`:

```ts
/**
 * THE CI SCREEN'S OWN NUMBERS, applied at the page boundary and nowhere else.
 *
 * v3 re-authored the claim — $8,185 over four smaller lines, a $5,000 ceiling,
 * a $2.34M account renewing 2026-11-30 — and its screen prints those figures
 * off the case and the action. This app's demo set carries the original $16,272.50
 * claim, and the work queue, the case page and the task queue all print from it.
 *
 * So the values are applied HERE, to a copy, by the CI page only. The store,
 * the record sections and the submit bar all read the overlaid objects and are
 * unmodified from v3; every other screen reads `demoData` untouched.
 *
 * Keyed to WR-2026-0417 — the one case `coverageFixtureFor` authors — and a
 * pass-through for anything else.
 */
export function ciCaseOverlay(c: WarrantyCase): WarrantyCase
export function ciActionOverlay(a: CaseAction): CaseAction
```

Nine fields on the action, three on the case. Called at the top of
`CoverageDecisionCiPage`, wrapped in `useMemo` on the ids.

**Fields the screen does NOT read**, verified by grep over the closure, so the
overlay does not need them: `action.folds` (v3 deleted four of the six; the CI
screen renders none), `action.tiles` (v3 removed them), `action.recommendation`,
`case.evidence`. The remaining v3 `demoData` deltas — the `standing` blocks added
to WR-2026-0421/0422, and ~40 em-dash prose rewrites — are not on this screen and
are out of scope.

---

## 5. Wiring — 3 touched app files

### 5a. `src/pages/cases/DecisionConsolePage.tsx`

One branch, placed **after** the loading and not-found guards so both pages share
them:

```tsx
const flags = useFlags();
// …existing loading guard, existing !action || !warrantyCase guard…

// THE FLAG, AND THE CASE, AND BOTH HAVE TO HOLD.
// `coverageFixtureFor` authors WR-2026-0417 and returns null for everything
// else, so a flag-ON app still shows today's console on every other case
// rather than a page apologising for having no evidence set.
if (flags.ciCoverageDecision && coverageFixtureFor(caseId)) {
  return <CoverageDecisionCiPage action={action} warrantyCase={warrantyCase} />;
}
// …existing `rich` branch, unchanged…
```

`CoverageDecisionCiPage` is a `React.lazy` import inside a `<Suspense
fallback={<DecisionConsoleSkeleton />}>`, so the ~8,500 lines of coverage code
stay out of the main chunk for anyone who never opens that URL.

The `!rich` plain-layout branch and the `rich` console below are untouched, so
flag-OFF is byte-identical behaviour.

**The left nav is unaffected** — it is the shell wrapping the route
(`router.tsx:74`), not part of the page. Requirement 3.i holds for free.

### 5b. `src/components/warranty/AssessmentPanel.tsx`

One optional prop, for requirement 3.ii:

```ts
/** Start collapsed to the rail. Default open, which is every existing caller. */
defaultOpen?: boolean;
```
```diff
- const [open, setOpen] = useState(true);
+ const [open, setOpen] = useState(defaultOpen);
```

With `defaultOpen = true` as the parameter default, both existing callers
(`DecisionConsolePage.tsx:329`, `TaskDetail.tsx:468`) are unchanged. The
collapsed state is the panel's own existing 44px `PanelRightOpen` strip
(`AssessmentPanel.tsx:381-395`) — no new UI.

### 5c. `src/lib/flags.ts` — §1.

### The right nav on the CI page

v3's page root is `<div className="relative flex h-full min-h-0 flex-col">` with
no rail. `CoverageDecisionCiPage` wraps it:

```tsx
<div className="flex h-full min-h-0">
  <div className="min-w-0 flex-1">{/* v3's record column, verbatim */}</div>
  <AssessmentPanel
    action={action}
    warrantyCase={warrantyCase}
    // The rail is a conversation about a specific call, and on this screen the
    // call lives in the coverage store rather than on the action.
    position={state.resolution}
    defaultOpen={false}
  />
</div>
```

No `onClose`, so `hostControlled` stays false and the panel owns its own
open/closed exactly as it does today.

---

## 6. Settled during implementation

**`src/lib/warranty/format.ts` — not touched.** The fork carried a timezone fix
(`new Date("2027-09-02")` parses as UTC midnight, so a calendar date prints a day
early west of Greenwich). Called, and the call was to leave it: the CI page uses
this app's existing `formatDate` like every other screen. The visible consequence
is the customer section reading "renews Nov 29, 2026" rather than Nov 30 in a
US timezone — the same off-by-one the app already has everywhere else, and now
requirement 4 holds with nothing to qualify.

**Three unused imports had to go.** `ReactNode` and `Button` in `DecisionSection.tsx`
and `Hand` in `RationalePanel.tsx` are dead in the source too — Next tolerates
them, this app has `noUnusedLocals` on. Dropping the three names is the whole edit.

**The menu classes landed on three call sites, not one.** The styles plan named
`MoreMenu`, but `LabelledSelect` and `RationalePanel` open menus on this screen
too — and `LabelledSelect` is the one a reviewer actually uses, on every evidence
row. So the classes are a `MENU` constant in `components/coverage/primitives.tsx`,
beside `TYPE` and `INK`, and all three pass it. Still nothing outside the folder,
and one place to change rather than six.

## 7. Verification

| requirement | check |
|---|---|
| flag in left nav, end of list | last row of the sidebar footer, label `CI Coverage decision`, hint `Showcase the coverage decision page for CI` |
| ON by default | fresh profile *and* a profile with a pre-existing `warranty-app-flags` object both show it on |
| ON → new page | `/cases/WR-2026-0417/tasks/coverage-decision` renders the single reading column; side-by-side against cartographer at `/signal-collector/warranty-resolution-v3/cases/WR-2026-0417/tasks/coverage-decision` |
| no functionality lost | evidence add / edit / remove / re-weight; the agent reassessment firing on a high-importance change; rationale panel and its word-diff; submit → filed record → reopen; MoreMenu notices; drag-to-capture bar **and** the customer-row capture button |
| left nav present | visible, and its links navigate |
| right nav collapsed | 44px strip on load; opens on click; conversation works; closes again |
| rest of app unaffected | `/cases`, `/cases/WR-2026-0417`, `/actions`, `/performance` identical with the flag ON — in particular **$16,272.50 everywhere outside the CI page**. (There is no `/actions/<taskId>` route; the queue renders the task inline.) |
| OFF → no change | the two-column console with the sticky decision card, AssessmentPanel open |
| build | `npm run build` — `tsc -b` clean, no esbuild directive warnings |

Order of work: §1 flag → §2/§3 copy + rewrites → §4 overlay → §5 wiring → §7.
The flag lands first so every later step is verifiable in both states.

---

## 8. Built, and what was verified in the running app

| requirement | result |
|---|---|
| flag last in the left nav | last row of the sidebar footer: **CI Coverage decision** / "Showcase the coverage decision page for CI" |
| ON by default | fresh load opens the CI screen |
| ON → the ported screen | 20/600 title + case id, the three readings with the SLA ring, Case info at **$8,185.00** with an **approval ceiling of $5,000.00** and the ESA **active to 2026-11-30**, the two one-line causes with the fork's summaries, the verdict tag, the decision with its choiceboxes, refund field and ceiling meter, the evidence rows, the three folded sections |
| evidence editing + reassessment | raising a row's relevance to High flipped the submit bar to "Change in position · 1 of 4 parts: 1 evidence change" and re-drafted the rationale through its word-diff |
| submit → filed record → reopen | "Deny coverage — $0.00 refunded", stamped "Sarah Chen · submitted with no changes", **$0.00 of $5,000.00 — your authority**, read-only evidence, What changed, Reopen. (The Recorded/effects block stays hidden: `SHOW_RECORDED` is `false` in the source, as upstream.) |
| capture, both routes | a drag over the customer section raised the bar centred on the selection; a row's own **+ Add evidence** raised it right-anchored and filed "No goodwill drawn this year · Sarah Chen" at Medium/Approve, taking the submit bar to 4 items |
| documents | 7 attached · 4 considered, and `/documents/third-party-service-report.pdf` returns 200 `application/pdf` through `assetUrl` |
| back link | the row above the hero reads `‹ WR-2026-0417` and lands on `/cases/WR-2026-0417` — the page the reviewer arrived from. The copy this came from sent it to `/cases`, skipping the case; it is now the same breadcrumb the flag-OFF console draws |
| left nav | present and navigating; expands and collapses as before |
| right nav collapsed | 44px strip on load, opens on click, and the conversation is position-aware — it read back "you've moved to deny coverage, which puts the whole $8,185.00 on the customer" |
| OFF → no change | the two-column console returns whole: **$16,272.50**, limit **$10,000.00**, ESA to **2027-09-02**, the tiles, the six detail folds, the long-form verdict, rail open |
| rest of app, flag ON | `/cases` and `/cases/WR-2026-0417` show "Coverage disputed: combined cause finding" and a $16,273 claim; `/actions` shows $16,272.50 splitting to $9,690.00 |
| build | `tsc -b` clean, `npm run build` clean, no esbuild directive warnings, and the screen is its own 81.7 kB chunk |
| console | zero errors on a fresh load |

Three files modified — `flags.ts`, `DecisionConsolePage.tsx`, `AssessmentPanel.tsx`
— and everything else is new.
