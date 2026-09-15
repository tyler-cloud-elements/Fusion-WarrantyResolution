/**
 * THE DOCUMENTS THE CASE RESTS ON — the seven things a reviewer can open and check.
 *
 * The fifth contract in this folder, and the split from its neighbours is the one
 * they already argue for each other:
 *
 *  - `./decision-signals.ts` is the EVIDENCE a position rests on — a reading.
 *  - `./coverage-decision.ts` is the DECISION and its options.
 *  - `./canned-responses.ts` is what the reviewer has not said yet.
 *  - this file is the SOURCE MATERIAL: the papers the reading was taken from.
 *
 * A signal and a document are not the same object and collapsing them would lose
 * the distinction that matters most here. A signal is an argument — "§4.2 fails, and
 * it fails on exactly the costs the change caused" — and carries an importance, a
 * thing it backs, and anchors on screen. A document is a PDF with an issuer and a
 * page count, and its whole claim is that it exists and says what it says. The
 * widget shows both, in two sections, because "what did you conclude" and "what did
 * you read" are two questions.
 *
 * ## Where these came from, and why they are authored here
 *
 * They are the seven attached to WR-2026-0417 in the warranty console's own case
 * data, and they used to be rendered by that app on the decision page — a second
 * evidence surface on a screen whose assistant already answers "where did this come
 * from?". They moved into the widget, and the data moved here rather than being read
 * across: the widget is shared by all three views in this space, and importing from
 * `@wrc/*` would make this repo's assistant depend on a copied application. The
 * embedding exists precisely so that dependency runs one way.
 *
 * The consequence, worth stating: all three views now show this section, because the
 * widget reads module data rather than per-view props. That is coherent — every one
 * of them is WR-2026-0417 and these are that case's documents.
 *
 * **Authored and pure.** No clock, no counters, no reader state — `/signal-collector`
 * is prerendered, and a value that differed between build and hydration would be a
 * mismatch. Which documents have been OPENED is runtime state and belongs beside the
 * render.
 */

/**
 * Where the PDFs are served from.
 *
 * `public/documents/`, which is where this app's own demo set already points its
 * `fileUrl`s — the same seven files, so nothing was copied in for this screen.
 *
 * BARE AND RELATIVE, with no leading slash, because that is this app's
 * convention: the mount point is applied at the point of use by `assetUrl()`
 * (../../app-base.ts), which is what lets a document open from any route depth
 * and from a UiPath Coded App served under `/<routing-name>/`. The embedded copy
 * this came from hardcoded `/warranty-console/documents` instead, since Next
 * serves `public/` from a fixed prefix and there was no mount point to read.
 */
const DOCS = "documents";

export interface CaseDocument {
  /** Unique — the React key. */
  id: string;
  /** What to print. The document's own name, not a description of it. */
  title: string;
  /** Who produced it. Half of these are not ours, which is the point of showing it. */
  issuer: string;
  /** Pages, for the reader deciding whether to open it now or later. */
  pages: number;
  /** Served from `public/`; opens in a new tab. */
  href: string;
  /**
   * What was read off it, in one line — or `null` where it is reference material
   * rather than a finding.
   *
   * The field that stops this being a file list. A row saying only "Third-party
   * service report · 2pp" tells a reviewer nothing about why it is in the pile;
   * this says what it contributed. `null` is honest for the SOP and the warranty
   * terms: nothing was extracted from them, they are what the case is tested
   * against.
   */
  readOff: string | null;
}

/**
 * In the order the case assembled them: what happened, what the asset had done
 * before, what the contract says, what the part showed, how it was reported, the
 * procedure it is judged by, and the packet holding all of it.
 */
export const CASE_DOCUMENTS: CaseDocument[] = [
  {
    id: "doc-third-party-service",
    title: "Third-party service report",
    issuer: "Meridian Industrial Services",
    pages: 2,
    href: `${DOCS}/third-party-service-report.pdf`,
    readOff:
      "Three control parameters raised on 2026-02-14, no OEM commissioning, no written authorisation",
  },
  {
    id: "doc-asset-service-history",
    title: "Installed asset service history",
    issuer: "Cobalt Ridge Automation · Installed Base Records",
    pages: 2,
    href: `${DOCS}/installed-asset-service-history.pdf`,
    readOff: "Commissioned 2023-09-02; 30 months into a 60-month rated life",
  },
  {
    id: "doc-warranty-terms",
    title: "Cobalt Ridge warranty terms",
    issuer: "Cobalt Ridge Automation",
    pages: 2,
    href: `${DOCS}/cobalt-ridge-warranty-terms.pdf`,
    readOff: null,
  },
  {
    id: "doc-part-inspection",
    title: "Returned part inspection",
    issuer: "Cobalt Ridge Component Analysis Laboratory",
    pages: 3,
    href: `${DOCS}/returned-part-inspection.pdf`,
    readOff:
      "Bearing race spalling consistent with a manufacturing defect, not with overload or contamination",
  },
  {
    id: "doc-intake-email",
    title: "Warranty claim intake email",
    issuer: "Northstar Retail Distribution",
    pages: 2,
    href: `${DOCS}/warranty-claim-intake-email.pdf`,
    readOff: "Reported as a full line stop with no divert path available",
  },
  {
    id: "doc-sop",
    title: "Warranty resolution SOP v3",
    issuer: "Cobalt Ridge Automation",
    pages: 3,
    href: `${DOCS}/warranty-SOP-v3.pdf`,
    readOff: null,
  },
  {
    id: "doc-evidence-packet",
    title: "Claim evidence packet (combined)",
    issuer: "Northstar Retail Distribution",
    pages: 7,
    href: `${DOCS}/claim-evidence-packet-combined.pdf`,
    readOff: null,
  },
];

/**
 * How many of the seven contributed a finding.
 *
 * Derived rather than written down, so adding a document changes the count the
 * widget prints without anybody editing a second place — the rule this folder keeps
 * for `CLAIM_TOTAL` and `signalTally`.
 */
export function documentTally(docs: CaseDocument[] = CASE_DOCUMENTS): {
  total: number;
  read: number;
} {
  return { total: docs.length, read: docs.filter((d) => d.readOff !== null).length };
}
