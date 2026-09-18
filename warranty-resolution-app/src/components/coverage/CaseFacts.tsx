import { Building2, Star } from "lucide-react";
import { Card, CardHead, INK, Label, Pill, TYPE } from "@/components/coverage/primitives";
import { Finding } from "@/components/coverage/Finding";
import { moneyExact } from "@/lib/warranty/format";
import type { CaseAction, WarrantyCase } from "@/lib/warranty/types";
import { cn } from "@/lib/utils";

/**
 * THE CASE BAND — who, what, where, under which agreement; the claim as the figure
 * the page is about; and the escalation reason as a lede.
 *
 * The customer is the block's headline with its segment beside it; the asset, the
 * site and the agreement follow as one label-led meta line. The claim and the
 * escalation reason then sit side by side as two bordered panels, the claim at
 * `TYPE.figure` — 20/600 since the page title took the app's 24/700 rung, so the
 * number is still the loudest thing in its own panel without outranking the name
 * of the page it sits on.
 *
 * It is a glass `Card` with `p-5` and a `CardHead`, like every other card in
 * warranty resolution. It used to be a two-column grid that bled to its own
 * corners — the claim in a `bg-muted/40` well welded to the right edge, the reason
 * in a full-bleed strip under it — which is why it could not have padding and why
 * both of those had to invent a background to separate themselves.
 */
export function CaseFacts({ action, warrantyCase }: { action: CaseAction; warrantyCase: WarrantyCase }) {
  const claim = action.claimTotal ?? warrantyCase.claimValue;
  const limit = action.authority?.limit;

  const tail = serialTail(warrantyCase.asset.model, warrantyCase.asset.serial);
  // `site` is authored as one string, "Joliet DC · Line 3 / Induct". Split for
  // display only: the place is what a reader scans for and the line qualifies it,
  // so they want different weights. The data stays one field — it is one field
  // everywhere else that reads a case.
  const [place, ...restOfSite] = warrantyCase.site.split(" · ");
  const line = restOfSite.join(" · ");
  const [agreementRef, ...restOfAgreement] = shortAgreement(
    warrantyCase.asset.warrantyStatus,
  ).split(" · ");
  const agreementRest = restOfAgreement.length ? ` · ${restOfAgreement.join(" · ")}` : "";

  return (
    <Card className="flex flex-col gap-4 p-5">
      <CardHead title="Case info" icon={<Building2 />} />

      {/* THE CUSTOMER IS THE HEADLINE; EVERYTHING ELSE IS ONE META LINE.
          It was four label-over-value facts in a 3-column grid, two rows tall, and
          each of the three besides the customer was carrying a fault:

            · Asset printed `SR-440` and then `SR440-2023-1147`, whose first six
              characters ARE the model — the row said it twice.
            · Site was one string, `Joliet DC · Line 3 / Induct`, with a middot
              standing in for a hierarchy.
            · Agreement was three facts joined by middots, opening with four words
              ("Extended Service Agreement") that `NRD-ESA-2024-0219` restates.

          Labels went with them — AND HAVE COME BACK, because the claim about the
          hero was wrong. `CaseDetailPage`'s meta line is **`**Asset** SR-440 · SN …
          · **Owner** Scott Florentino`**: bold words, no glyphs. Measured on the
          running page, that hero has no icon in its fact strip at all, so an
          icon-led row here was this screen's invention rather than the app's
          pattern. The facts, their order and their wording are unchanged; the
          glyph in front of each is now the word it stood for. */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {/* 16/700 against the card head's 16/600. Weight and ink separate them
              rather than a seventh type size: the mock drew this at 18px, which is
              a rung neither this page nor the rest of the app has. */}
          <span className={cn(TYPE.title, "font-bold")}>{warrantyCase.customer}</span>
          {/* `Pill`, which is the app's `Badge` now (./primitives.tsx). The
              `Star` keeps its own `text-primary` for the reason ./Finding.tsx's
              chip gives: the status inks the word, and a glyph left to inherit
              would stop reading as a marker. */}
          {warrantyCase.customerSegment && (
            <Pill tone="brand">
              <Star className="size-3.5 shrink-0 text-primary" aria-hidden />
              {warrantyCase.customerSegment}
            </Pill>
          )}
        </div>

        <div
          className={cn(
            TYPE.small,
            "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground",
          )}
        >
          <MetaFact label="Asset">
            <b className="font-semibold text-foreground">{warrantyCase.asset.model}</b>
            {tail && <span>·{tail}</span>}
          </MetaFact>
          <Rule />
          <MetaFact label="Site">
            <b className="font-semibold text-foreground">{place}</b>
            {line}
          </MetaFact>
          <Rule />
          <MetaFact label="Agreement">
            <b className="font-semibold text-foreground">{agreementRef}</b>
            {agreementRest}
          </MetaFact>
        </div>
      </div>

      {/* THE CLAIM AND THE REASON, AS TWO BORDERED PANELS.
          They were a tinted well bolted to the card's right edge and a full-bleed
          strip under it — `bg-muted/40` and a `border-t`, two devices this app
          uses nowhere. A panel with one rim on `bg-card` is what the rest of
          warranty resolution puts a figure or a paragraph in (see `SlaRow` and
          `OpenActionCard`), and it lets the card have padding like every other
          card instead of having to bleed to its own corners. */}
      {/* FLEX, NOT AN ARBITRARY GRID TEMPLATE — and this is the hazard this app
          keeps re-teaching. `lg:grid-cols-[300px_minmax(0,1fr)]` type-checks,
          compiles, and computes to a single 1090px column on the running page:
          the console ships a PREBUILT stylesheet nested in `.wrc`
          (../../../warranty-console/warranty-console.css) that the shell's own
          Tailwind competes with at equal specificity, and an arbitrary value the
          prebuilt sheet has never seen is not reliably generated. `lg:grid-cols-2`
          right below works because that class IS in the sheet.
          `flex` + `lg:flex-row` + `lg:w-[300px]` are all utilities the app already
          uses, so they are all in it. */}
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="rounded-xl border border-border bg-card p-4 lg:w-[300px] lg:shrink-0">
          <Label>Claim</Label>
          <span className={cn(TYPE.figure, "mt-1 block")}>{moneyExact(claim)}</span>
          {/* ONE FACT UNDER THE FIGURE, AND IT IS THE ONE THAT CONSTRAINS THE
              READER. The line count used to lead this caption — "4 lines · your
              ceiling is …" — and it answers a question nobody asks here: the
              breakdown is a disclosure inside the decision's refund panel, which
              is where somebody acting on it looks. The ceiling is what every
              control below is measured against, so it gets the caption to itself
              rather than trailing a list. Written as a label and its value, not as
              a sentence — it is a constraint the reader looks up, and "Approval
              ceiling: $5,000.00" is scanned in one movement where "Your approval
              ceiling is $5,000.00" has to be read. */}
          <span className={cn(TYPE.small, INK.ink2, "mt-1 block")}>
            {limit ? (
              <>
                Approval ceiling:{" "}
                <b className="font-semibold tabular-nums text-foreground">{moneyExact(limit)}</b>
              </>
            ) : null}
          </span>
        </div>

        <div className="min-w-0 flex-1 rounded-xl border border-border bg-card p-4">
          <Label>Description</Label>
          <p className={cn(TYPE.body, "mt-1 leading-relaxed text-foreground")}>
            {action.whyThisReachedYou}
          </p>
        </div>
      </div>

      {/* ── THE FINDING, IN THIS CARD ──────────────────────────────────────
          What was established about the claim belongs with the facts of the
          claim: the two causes and what follows from them are what the case IS.
          It used to sit in a card of its own with the evidence
          (./CaseInfo.tsx, now gone) and the evidence has moved under the
          decision it feeds (./decision/DecisionSection.tsx), which is what
          split the two apart.

          It needs no wrapper any more. The card was a two-column grid, so a
          fragment dropped in here had its band, each cause row and the verdict
          note laid out as separate grid cells in the wrong order, and a
          `col-span-2` div existed only to stop that. The card is a flex column
          now and `Finding` returns its own bordered `Rows` group, so it is just
          the next child. */}
      <Finding action={action} />
    </Card>
  );
}

/** One icon-led fact on the meta line. */
/**
 * One fact on the meta line: the word for it, then the fact.
 *
 * IT TOOK AN ICON AND NOW TAKES A LABEL. The hero this row imitates uses bold
 * words — see the note at the call site — and a glyph is only legible to somebody
 * who already knows the convention, which for a cog-versus-shield pair is a guess.
 * The label is also what a screen reader now reads out; the glyph was `aria-hidden`
 * and the fact arrived unqualified.
 */
function MetaFact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <span className="shrink-0 font-semibold text-foreground">{label}</span>
      {children}
    </span>
  );
}

/**
 * A hairline between two facts on the meta line.
 *
 * It wraps with its neighbours rather than being suppressed at a line end: a 1px
 * 14px-tall tick that lands first on a wrapped line reads as part of the rhythm,
 * and suppressing it would need to know where the browser broke, which CSS cannot
 * say. At 1180px the line does not wrap at all.
 */
function Rule() {
  return <span aria-hidden className="h-3.5 w-px shrink-0 bg-border" />;
}

/**
 * THE SERIAL MINUS THE MODEL IT REPEATS.
 *
 * `SR440-2023-1147` on an `SR-440` is the model, a separator, and then the four
 * characters that actually identify the unit. Printing both put the same six
 * characters on the line twice.
 *
 * Compares alphanumerics only, so `SR-440` matches the `SR440` the serial spells
 * without the hyphen. Returns the serial UNTOUCHED whenever it does not start with
 * the model, or when stripping the model would leave nothing — a serial that is not
 * built this way is not this function's business, and a blank is worse than a
 * repeat.
 */
function serialTail(model: string, serial: string): string {
  const key = model.replace(/[^a-z0-9]/gi, "").toLowerCase();
  if (!key) return serial;
  let seen = "";
  for (let i = 0; i < serial.length; i++) {
    if (/[a-z0-9]/i.test(serial[i])) seen += serial[i].toLowerCase();
    if (seen === key) return serial.slice(i + 1).replace(/^[^a-z0-9]+/i, "") || serial;
    if (!key.startsWith(seen)) return serial;
  }
  return serial;
}

/**
 * The agreement string without its type name.
 *
 * "Extended Service Agreement NRD-ESA-2024-0219 · active to …" opens with four
 * words that the reference immediately after them restates — the `ESA` is right
 * there in the id — and the row carries a shield. So the type name goes and nothing
 * else is touched: no re-ordering, no re-wording, and an unrecognised opening is
 * returned whole rather than guessed at.
 */
function shortAgreement(status: string): string {
  return status.replace(/^(Extended Service|Standard|Master|Service)\s+(Service\s+)?Agreement\s+/i, "");
}
