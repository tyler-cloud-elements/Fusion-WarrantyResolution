import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Banknote,
  Check,
  Highlighter,
  Pencil,
  Scale,
} from "lucide-react";
import { INK, TONE, TYPE } from "@/components/coverage/primitives";
import { CallDot, RankBars } from "@/components/coverage/LabelledSelect";
import { CALL_OPTIONS, IMPORTANCE_OPTIONS } from "@/lib/coverage/fixture";
import { changeValueLabel, type Change } from "@/lib/coverage/store";
import { cn } from "@/lib/utils";

/**
 * THE MANIFEST'S GLYPHS — two readings per row, neither of them a word.
 *
 * The rows say what they said before, character for character. What is new sits
 * beside the text: which part moved, and how it moved.
 *
 * **Not who moved it.** `changesSince` tags every line `by: "you" | "agent"`
 * (../../../lib/coverage/store.ts), and a third mark at the row's right edge drew
 * it — `AiMark` against `UserRound`, the head's own pair. It came back out: on a
 * filed record almost every line is the reviewer's, so the column was a stack of
 * the same glyph with an occasional exception in it, and it put a third thing to
 * read on a row whose job is to say what the value used to be. The attribution
 * stays in the data for whatever wants it next; the stamp above still counts it.
 */

/** One 14px muted glyph per part. The word stays; this is the scan target. */
const PART_ICON: Record<Change["part"], typeof Scale> = {
  // The Decision head's own icon, 200px up the same card.
  Resolution: Scale,
  // The one glyph this app did not already have — there is no money icon in it.
  Refund: Banknote,
  // The folder's edit glyph (../EvidenceList.tsx, ./RationalePanel.tsx).
  Rationale: Pencil,
  // The folder's evidence glyph (../EvidenceComposer.tsx).
  Evidence: Highlighter,
};

/**
 * The enums, inverted off the store's own spelling.
 *
 * A relevance move draws `RankBars` and a call move draws `CallDot` — the exact
 * components the evidence rows above this panel draw, so neither is a vocabulary
 * the reader has to learn twice. Both need the enum back out of a printed label,
 * and `changeValueLabel` is the function that printed it, so mapping the options
 * through it is an exact inverse rather than a guess at one.
 *
 * A string in neither set — a money figure, "Added", a resolution name — falls
 * through to `null` and the row draws no value glyph, which is correct: those are
 * not points on a scale.
 */
const rankOf = (v: string | null) =>
  IMPORTANCE_OPTIONS.find((o) => changeValueLabel(o.value) === v)?.value ?? null;
const callOf = (v: string | null) =>
  CALL_OPTIONS.find((o) => changeValueLabel(o.value) === v)?.value ?? null;

/** The value's own glyph, where the value is on a scale the reader knows. */
function ValueGlyph({ value }: { value: string | null }) {
  const rank = rankOf(value);
  if (rank) return <RankBars value={rank} />;
  const call = callOf(value);
  if (call) return <CallDot value={call} />;
  return null;
}

/**
 * WHAT KIND OF CHANGE IT WAS — one badge per row, in a column of its own.
 *
 * `+` green for something filed, `−` red for something removed, `○` amber for
 * everything that moved. Three types over six kinds of row, and the third is the
 * common one, which is the right way round: a filed decision mostly consists of
 * things that shifted, and an addition or a removal is the exception worth
 * spotting.
 *
 * **It replaced an inline glyph that typed only half the rows.** A `Plus`, a
 * `Trash2` or a `Pencil` sat in the value cell keyed off `to`, which meant only
 * the three entries with no `from` were marked — a resolution change, a refund
 * change and both evidence moves carried no type at all and had to be inferred
 * from the arrow. Every row is typed now, and one marker replaces the other rather
 * than joining it.
 *
 * **It also took the emphasis off the value.** `to` was `font-semibold`, which is
 * how the row used to say "this is the new one". The badge says it, so the value
 * renders at normal weight and only `subject` stays bold — the row's identity
 * rather than its change.
 *
 * ## The hue is in the rim and the wash, and the ink is neutral
 *
 * Straight off `TONE` (../primitives.tsx), whose note carries the argument and the
 * numbers. Briefly: a hued glyph on a tint of its own hue measures **1.78:1** for
 * the amber one, and solid fills fail too — 4.25:1 for success and 3.92:1 for
 * destructive against white, both under AA, and worse in dark. `foreground` on a
 * wash is 13.2–14.7:1 and is the only treatment that passes on all three.
 *
 * The rim and wash are a step stronger than `ToneChip`'s because this is an 18px
 * square rather than a text pill, and a `/30` rim on it is close to invisible.
 *
 * **THE GLYPH IS THE PRIMARY CUE AND THE COLOUR AGREES WITH IT**, which is not a
 * compromise. The three washes are near-identical in luminance — `+` against `○`
 * is 1.06:1 — so they differ in hue alone, and in greyscale or to a red-green
 * deficient reader the fills are the same. A badge that carried the meaning in
 * colour alone would have been unreadable to those readers; `+` / `○` / `−` is
 * legible without any colour at all.
 *
 * `○` U+25CB rather than a capital O: at 11px the letter is a beat away from a
 * zero and sits on a different optical weight from the two symmetrical strokes it
 * pairs with. `−` U+2212 rather than a hyphen, for the same reason — a hyphen is
 * short and rides high against the `+`.
 */
const CHANGE_KIND = {
  added: { tone: "ok", glyph: "+", label: "added" },
  removed: { tone: "bad", glyph: "\u2212", label: "removed" },
  modified: { tone: "warn", glyph: "\u25CB", label: "modified" },
} as const;

function kindOf(change: Change): keyof typeof CHANGE_KIND {
  if (change.to === "Added") return "added";
  if (change.to === "Removed") return "removed";
  return "modified";
}

function ChangeBadge({ change }: { change: Change }) {
  const { tone, glyph, label } = CHANGE_KIND[kindOf(change)];
  return (
    <span
      // The row's own text says what moved and to what; this says which of the
      // three kinds it is, and a screen reader needs that in words.
      aria-label={label}
      className={cn(
        "inline-grid size-[18px] shrink-0 place-items-center rounded-md border text-[11px] leading-none font-bold",
        TONE[tone],
      )}
    >
      <span aria-hidden>{glyph}</span>
    </span>
  );
}


/**
 * THE MANIFEST, DRAWN ONCE FOR BOTH CARDS.
 *
 * This lived inside ./FiledRecord.tsx, which was fine while the filed record was the
 * only thing that told the diff. `ciDiff` (../../../lib/flags.ts) puts the same panel
 * on the LIVE card, and a second copy of ninety lines of grid is the mistake this
 * folder has now made twice — the filed record was a bespoke copy of the live form
 * and disagreed with it in eight places, and ../../ui/data-table/data-table.tsx
 * carried its own copy of `GLASS_CLASSES` and drifted the moment the card's fill
 * changed. One definition, one place.
 *
 * **Nothing about WHERE it sits is in here.** The seam above it
 * (`border-t border-border/70 pt-3.5`) and the argument for the slot are facts about
 * each card's own order, so both callers keep them. That is also what lets the live
 * card drop the seam along with the panel when there is nothing to show.
 *
 * **The empty branch is the RECORD'S, and the live card never reaches it.** A record
 * saying "nothing moved" is a positive statement worth making; a live card saying it
 * before the reviewer has started is noise. So the tick sentence stays here for the
 * one caller that wants it, and the other simply does not render the component when
 * `changes` is empty — see `ciDiff` in ./DecisionSection.tsx.
 */
export function ChangeManifest({
  changes,
  evidenceCount,
}: {
  changes: Change[];
  /**
   * For the empty sentence's "all N evidence items", and nothing else.
   *
   * A count rather than the list: this panel never draws evidence rows, and handing
   * it `EvidenceItem[]` would let a later edit reach for something the manifest has
   * no business reading.
   */
  evidenceCount: number;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* NO TALLY. It read "2 by you · 1 by the agent in answer" over a list of
          exactly those rows — a count of the thing directly beneath it, which a
          reader can do by looking. The empty case said "nothing — filed as the
          agent proposed it" and the paragraph below already says that in full,
          so nothing is lost there either. */}
      <div className="flex items-baseline gap-2 border-b border-border/60 px-3.5 py-2">
        <span className={cn(TYPE.body, "font-semibold")}>What changed</span>
      </div>
      {changes.length === 0 ? (
        /* THE SENTENCE IS UNCHANGED; the tick is what it gained. A paragraph on
           its own read as prose the reader has to finish to learn it says
           "nothing" — the mark says it before the words do. */
        <p className={cn(TYPE.small, INK.ink2, "m-0 flex items-start gap-2 px-3.5 py-2.5")}>
          <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
          <span>
            The resolution, the refund, the rationale and all {evidenceCount} evidence items are
            as the case opened.
          </span>
        </p>
      ) : (
        changes.map((c, i) => {
          const PartIcon = PART_ICON[c.part];
          return (
            /* A GRID, NOT A FLEX ROW WITH A SPACER.
               The part used to sit in a `w-[88px]` box inside a flex row, which
               is a grid column done by hand — and it only held while every row
               started with plain text. Rows carry glyphs of different widths
               now, so the four readings are four real columns and they line up
               down the whole list.

               `items-center` for the same reason: `items-baseline` aligned text
               that no longer sits alone on its line. */
            <div
              key={`${c.part}-${i}`}
              // A COLUMN FOR THE BADGE, not an inline chip at the head of the
              // value cell. Inline it would sit at a different x on every row,
              // because `subject` lengths differ — and scanning the column is the
              // whole point of a type marker.
              className="grid grid-cols-[14px_88px_20px_minmax(0,1fr)] items-center gap-x-2.5 border-b border-border/50 px-3.5 py-2 transition-colors last:border-0 hover:bg-muted/40"
            >
              <PartIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
              <span className={cn(TYPE.small, "text-muted-foreground")}>{c.part}</span>
              <ChangeBadge change={c} />
              <span className={cn(TYPE.small, "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1")}>
                {/* The subject leads, because on an evidence row "Low → High" is
                    meaningless until you know which row moved. */}
                {c.subject ? <span className="font-semibold">{c.subject} ·</span> : null}
                {c.from ? (
                  <>
                    <ValueGlyph value={c.from} />
                    <span className="text-muted-foreground line-through">{c.from}</span>
                    {/* An icon rather than the `→` character: with glyphs either
                        side of it, a text arrow sits on the wrong baseline. */}
                    <ArrowRight className="size-3 shrink-0 text-muted-foreground" aria-hidden />
                  </>
                ) : null}
                <ValueGlyph value={c.to} />
                {/* Normal weight — the badge in the column to the left carries
                    the emphasis this used to. */}
                <span>{c.to}</span>
                {/* AFTER the figure, because it reads as a verdict on the move
                    rather than as part of the value: "$4,940.00, and that is
                    up". Only the refund sets it — the store's note says why. */}
                {c.up === true ? (
                  <ArrowUp className="size-3.5 shrink-0 text-success" aria-label="up" />
                ) : c.up === false ? (
                  <ArrowDown className="size-3.5 shrink-0 text-muted-foreground" aria-label="down" />
                ) : null}
                {c.detail ? <span className="text-muted-foreground">· {c.detail}</span> : null}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}
