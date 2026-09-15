import type { CaseAction, DecisionEffect, WarrantyCase } from "@/lib/warranty/types";

/**
 * THE CI SCREEN'S OWN NUMBERS, applied at the page boundary and nowhere else.
 *
 * The screen came from a fork that re-authored the claim. Its `fixture.ts` says
 * where the split is: the evidence, the recommendation and the claim history are
 * authored there, and "the money and the agreement dates are NOT here — they come
 * off the case and the action", which in the fork meant its own copy of
 * ../warranty/demoData.ts. That copy carries an $8,185 claim over four smaller
 * lines, a $5,000 signing ceiling and a $2.34M account renewing 2026-11-30.
 *
 * This app's demo set carries the original $16,272.50 claim, and the work queue,
 * the case page, the task queue and the performance tiles all print from it. So
 * the fork's figures are applied HERE, to a shallow copy, by the CI page only
 * (../../pages/cases/CoverageDecisionCiPage.tsx). Everything downstream — the
 * store, the record sections, the submit bar — reads the overlaid objects and is
 * unmodified from the fork, and every other screen reads `demoData` untouched.
 *
 * THE ALTERNATIVE WAS PORTING THE FORK'S `demoData` WHOLE, and it would have
 * moved the claim amount everywhere. The flag is meant to change one screen.
 *
 * Keyed to WR-2026-0417, the one case `coverageFixtureFor` authors, and a
 * pass-through for anything else — so this stays inert if the page is ever
 * reached with the flag on and a different case in the URL.
 */

const CASE_ID = "WR-2026-0417";

/**
 * The effect lists differ from this app's in three strings and nothing else: two
 * SAP accrual figures that follow from the smaller claim, and the approver, who
 * is the one named by the $5,000 ceiling.
 *
 * A substitution rather than four re-authored `effects` arrays (denied, approved,
 * partial, and the action's own). Those arrays are twenty-four rows between them
 * and only these three spans move, so copying them out would be twenty-one rows
 * of duplicate that a later edit upstream would silently desynchronise.
 */
const EFFECT_SUBSTITUTIONS: [string, string][] = [
  // The full claim, on Approve.
  ["$16,272.50", "$8,185.00"],
  // Parts + travel to the provider, on the recommended partial.
  ["$9,690.00", "$4,940.00"],
  ["N. Brennan-Kowalczyk", "L. Maxim"],
];

function overlayEffects(effects: DecisionEffect[] | undefined): DecisionEffect[] | undefined {
  if (!effects) return effects;
  return effects.map((e) => {
    let detail = e.detail;
    let title = e.title;
    for (const [from, to] of EFFECT_SUBSTITUTIONS) {
      if (detail) detail = detail.split(from).join(to);
      title = title.split(from).join(to);
    }
    return detail === e.detail && title === e.title ? e : { ...e, title, detail };
  });
}

/**
 * The action, with the fork's claim, finding and ceiling on it.
 *
 * `options` keeps its allocations untouched — those are identical in both copies,
 * and they are what `splitFor` reads, so the recommended partial still resolves
 * to parts and travel on the provider. Only the effect strings inside each option
 * move, for the reason above.
 *
 * Absent here and deliberately so: `folds` and `tiles`. The fork deleted four of
 * the six folds and dropped the tiles, and the CI screen renders neither — the
 * record's own sections replaced them. Overlaying data nothing reads would be
 * inventing a contract.
 */
export function ciActionOverlay(action: CaseAction): CaseAction {
  if (action.caseId !== CASE_ID) return action;

  return {
    ...action,
    title: "Coverage decision — combined cause finding",
    whyThisReachedYou:
      "Gearbox failed at 30 of 60 rated months. The drive was also reconfigured above its commissioned limits in February, unapproved. No rule covers both causes.",
    claimTotal: 8185,
    claimLineSummary: "4 lines · parts, labour, travel, freight",
    costLines: [
      { id: "parts", name: "Parts — gearbox", amount: 3980 },
      { id: "labour", name: "Labour — 7 hrs", amount: 1295 },
      { id: "travel", name: "Travel & per diem", amount: 960 },
      { id: "freight", name: "Expedited freight", amount: 1950 },
    ],
    authority: {
      limit: 5000,
      approver: "L. Maxim, VP Global Service",
    },
    // One line each, and each answers only "which side, and on what ground". The
    // evidence for the ground is the second sentence of `body`, one press away;
    // printing it on the closed line made the summary argue the case rather than
    // name it.
    causes: [
      {
        side: "covered",
        label: "Cause 1",
        title: "Component defect, inside its term",
        body:
          "Induction drive gearbox, internal failure at 30 of 60 rated months. Bearing race spalling: a defect signature, not overload or contamination. Replaced on site, first-time fix.",
        summary: "30 of 60 months - within warranty",
        points: "Points to covered",
        established: "03-20, on site",
        sources: ["FieldLink", "WT-9"],
      },
      {
        side: "excluded",
        label: "Cause 2",
        title: "Configuration change, unapproved",
        body:
          "Acceleration ramp and current limit raised above the commissioned envelope on 2026-02-14. No approval on record. ESA §4.2 requires written approval before a config change takes effect.",
        summary: "Limit raise 02/14 - no approval",
        points: "Points to excluded",
        established: "logged 02-14",
        sources: ["Vault-PLM", "Sentinel"],
      },
    ],
    // ONE SENTENCE ACROSS THE TWO FIELDS, and the comma is load-bearing: the note
    // renders `headline` bold and `detail` in secondary ink on the same line.
    verdict: {
      headline: "No rule covers both causes,",
      detail: "as they point towards opposite decisions.",
    },
    effects: overlayEffects(action.effects),
    options: action.options.map((o) => ({ ...o, effects: overlayEffects(o.effects) })),
  };
}

/**
 * The case, with the claim and the agreement the fork's screen prints.
 *
 * `standing` is optional on the type and the section folds itself away without
 * it, so this leaves a case that has none alone rather than inventing one.
 */
export function ciCaseOverlay(warrantyCase: WarrantyCase): WarrantyCase {
  if (warrantyCase.id !== CASE_ID) return warrantyCase;

  return {
    ...warrantyCase,
    claimValue: 8185,
    description: "Coverage disputed — combined cause finding",
    asset: {
      ...warrantyCase.asset,
      warrantyStatus:
        "Extended Service Agreement NRD-ESA-2024-0219 · active to 2026-11-30 · deductible $0.00",
    },
    standing: warrantyCase.standing
      ? {
          ...warrantyCase.standing,
          annualValue: 2_340_000,
          renewalDate: "2026-11-30",
        }
      : warrantyCase.standing,
  };
}
