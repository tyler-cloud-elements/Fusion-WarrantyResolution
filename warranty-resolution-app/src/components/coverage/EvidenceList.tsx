import { useState, type ReactNode } from "react";
import { Pencil, Plus, Trash2, UserRound } from "lucide-react";
import { Band, FoldRow, Mono, Rows, TYPE } from "@/components/coverage/primitives";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CallDot, LabelledSelect, RankBars } from "@/components/coverage/LabelledSelect";
import { EvidenceComposer, draftFrom } from "@/components/coverage/EvidenceComposer";
import { COL, COL_HINT } from "@/components/coverage/evidenceColumns";
import { CALL_OPTIONS, IMPORTANCE_OPTIONS, type EvidenceItem } from "@/lib/coverage/fixture";
import type { CoverageEvent } from "@/lib/coverage/store";
import { moneyExact, timeOnly } from "@/lib/warranty/format";
import { cn } from "@/lib/utils";

/**
 * The items the recommendation rests on, each with two things the reviewer can
 * change — how much it matters, and what it argues for. A dot before each title
 * carries the call's colour so the column reads at a glance.
 *
 * ## Adding one is a form, not a blank row
 *
 * It used to append an item to the store and render a lone name field inside it.
 * The composer (./EvidenceComposer.tsx) replaced that and says why at length; what
 * matters here is where it goes. **Adding opens it at the foot of the list, where
 * the row will be. Editing opens it over the row being edited.** One component,
 * two mounts, so the two can never drift apart — and in both cases it is IN the
 * list rather than over it, because the thing being written is a row and a modal
 * would hide the rows it has to sit beside.
 *
 * `editing` and `adding` are one piece of state, not two booleans: the composer is
 * a single-occupancy slot, and two of them open at once is a state worth making
 * unrepresentable rather than remembering not to cause.
 *
 * ## A row is one line until you ask it for more
 *
 * Every item used to print its whole case whether anybody was reading it or not —
 * 111px a row, and three of them filled the card. Shut, a row is 48px: a chevron,
 * the call's dot, the title, and the two controls. The note, what it backs and
 * where it came from are one press away, which is where content belongs on a
 * surface whose first act is to scan a column and its second is to read one item.
 *
 * **Everything opens shut, the agent's items included.** Opening the most important
 * one was the obvious alternative and is worse: a list with one row open for a
 * reason nobody stated reads as a bug rather than as a hint.
 *
 * ## Every row a hand has been on is marked; only the reviewer's own can be edited
 *
 * These are two different facts and the row draws them separately. **The mark**
 * (`Hand` below) names whoever added OR changed the row, which now includes an
 * agent's item the reviewer merely re-weighted — that is the commonest edit on this
 * card and the one that moves the agent, and the list used to be silent about it.
 * **Edit / Remove in the opened body** stay on `addedByReviewer` alone: the agent's
 * items are the record this decision is being taken against, and a list where any
 * row could be deleted is one where "three items" stops meaning anything.
 *
 * So a re-weighted agent row carries a mark and no controls, which is exactly what
 * it should say — somebody moved this, and it is still not theirs to remove.
 *
 * ## A standing hazard in this app, since two passes have now hit it
 *
 * It ships a PREBUILT stylesheet (../../../warranty-console/warranty-console.css —
 * a build artifact shared with v1) nested inside `.wrc`, and the shell's Tailwind
 * ALSO compiles these files. Both emit at the same specificity, so where they
 * collide the console's sheet wins by source order — which is why a shell-only
 * variant over a base class the console also has silently loses. It cost this file
 * a `group-hover:` reveal that was invisible at every state. What is safe: a class
 * the console sheet already contains, an arbitrary value nothing competes with, or
 * a conditional class through `cn` (it is `twMerge`, so only one survives). What is
 * not: assuming a variant applies because it type-checks. `rotate-90` is absent and
 * `rotate-180` is present, which is why the chevron flips rather than turns.
 */
/* THE TWO CONTROL COLUMNS live in ./evidenceColumns.ts, with the measurements
   that produced their widths. They moved out of this file because three things
   have to agree on those edges — the headings below, every row, and the
   composer's own line — and this file already imports the composer, so it
   cannot be the one that owns them. */
/**
 * THE COLUMN HEADINGS, as the band's own right-hand side.
 *
 * The compact trigger dropped the captions the form variant has and replaced them
 * with a hover hint, so the two columns are unlabelled until a reviewer thinks to
 * hover one. A heading says it without the hover — and once the columns are named,
 * their fixed edges read as a table rather than as ragged space.
 *
 * **`gap-2.5` HERE, not on the `Band`.** The headings only line up over the
 * controls if the space between them is the space between the cells, and that is
 * `FoldRow`'s `gap-2.5` (10px) — `Band`'s own gap is 12px, which would put the
 * Relevance heading 2px off its column. Grouping the two in one node keeps the
 * band's gap for the title/aside split and the row's gap for the columns. The
 * horizontal padding is shared: both use `px-3.5`.
 */
function ColumnHeads() {
  return (
    <span className="flex items-center gap-2.5">
      <ColumnHead width={COL.relevance} hint={COL_HINT.relevance}>
        Relevance
      </ColumnHead>
      <ColumnHead width={COL.decision} hint={COL_HINT.decision}>
        Decision
      </ColumnHead>
    </span>
  );
}

function ColumnHead({ width, hint, children }: { width: string; hint: string; children: string }) {
  return (
    // 1200ms, the same dwell the triggers use (../LabelledSelect.tsx) — long enough
    // that a pointer crossing the row on its way somewhere else does not raise it.
    // `delayDuration` goes on `Tooltip`, not a provider: the shared `Tooltip`
    // hardcodes a provider at 0 and a per-tooltip value beats it.
    <Tooltip delayDuration={1200}>
      <TooltipTrigger asChild>
        <span
          className={cn(
            TYPE.small,
            "shrink-0 cursor-help text-right font-medium text-muted-foreground",
            width,
          )}
        >
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-60">
        {hint}
      </TooltipContent>
    </Tooltip>
  );
}

export function EvidenceList({
  evidence,
  dispatch,
  actorName,
  readOnly = false,
}: {
  evidence: EvidenceItem[];
  /**
   * Optional ONLY because a read-only list has nothing to dispatch. Every live
   * caller passes it, and every path that would use it is behind `!readOnly`.
   */
  dispatch?: (e: CoverageEvent) => void;
  /**
   * WHOSE HAND IS ON THE MARKED ROWS — the signed-in reviewer, passed in.
   *
   * `addedByReviewer` and `touchedByReviewer` are booleans, so the item itself does
   * not know a name, and every row either is true of was added or edited in this
   * session by the person looking at the screen. Threaded from the decider name the
   * decision is already signed with rather than read from the role hook here: one
   * source for "who is acting", and this file stays a renderer. Switching persona
   * therefore re-labels these rows, which is correct — the demo's whole point is
   * that the record says who.
   *
   * `addedByName` until it named one verb only. It now stands behind two — added
   * and edited — and the name is the same string in both, which is the point.
   */
  actorName: string;
  /**
   * THE LIST AS FILED — same band, same columns, same rows, no controls.
   *
   * Used by the filed decision (./decision/FiledRecord.tsx), which used to draw its
   * own flat copy of this list. That copy had drifted: 64px and 84px control
   * columns against this file's 136 and 160, no column headings, and the two values
   * printed as words where the record's own manifest 200px below prints them as
   * `RankBars` and `CallDot`. One list, rendered two ways, disagreeing with itself.
   *
   * **The rows still OPEN.** Freezing the list was right — a record that can be
   * edited after it is signed is not a record — but freezing it was never meant to
   * mean hiding what each item rested on, which is the question somebody coming
   * back to a filed decision arrives with.
   *
   * What goes: the two selects become their values, the Edit/Remove pair in the
   * opened body, and the composer with its "Add evidence" trigger.
   */
  readOnly?: boolean;
}) {
  const [composer, setComposer] = useState<{ mode: "add" } | { mode: "edit"; id: string } | null>(
    null,
  );
  const close = () => setComposer(null);

  return (
    <Rows>
      {/* THE ASIDE IS THE TWO COLUMN HEADINGS — one strip, not two.
          The slot has now held three things. It briefly tallied the list ("4 items
          · 1 yours"), which is the list saying its own length twice. Then it held
          the Add trigger, which freed the foot but left the headings on a fenced
          strip of their own directly underneath: two mostly-empty lines and three
          rules before the first piece of evidence, 69px of chrome.

          The headings earn the slot because they are the only thing up here that
          has to align with something below it. The trigger does not, so it goes
          back to the foot. */}
      {/* THE HEADINGS STAY IN BOTH STATES. They are captions over two fixed cells,
          and the cells are still there when what sits in them is a value rather
          than a control — the filed copy dropped them, which is how a reader lost
          the only thing naming those two columns. The count joins them on a filed
          list, where the list's length is a fact about what was submitted. */}
      <Band
        title="Evidence"
        aside={
          <span className="flex items-center gap-3">
            {readOnly && (
              <span className={cn(TYPE.small, "shrink-0 text-muted-foreground")}>
                {evidence.length} {evidence.length === 1 ? "item" : "items"}
              </span>
            )}
            <ColumnHeads />
          </span>
        }
      />
      <div>
        {evidence.map((e) =>
          !readOnly && composer?.mode === "edit" && composer.id === e.id ? (
            <div key={e.id} className="[&+*]:border-t [&+*]:border-t-border">
              <EvidenceComposer
                initial={draftFrom(e)}
                submitLabel="Save"
                onCommit={(item) => {
                  dispatch?.({ type: "evidence.update", id: e.id, patch: item });
                  close();
                }}
                onCancel={close}
              />
            </div>
          ) : (
            <Row
              key={e.id}
              item={e}
              dispatch={dispatch}
              actorName={actorName}
              readOnly={readOnly}
              onEdit={() => setComposer({ mode: "edit", id: e.id })}
            />
          ),
        )}
      </div>

      {/* THE TRIGGER AND THE FORM ARE IN THE SAME PLACE AGAIN, which is the
          quiet win of moving the headings up: the form opens exactly where the
          button was pressed and exactly where the row it makes will live. While
          the trigger sat in the title bar the two were ~150px apart. */}
      {/* NO FOOT ON A FILED LIST. The trigger and the form are the one thing on
          this card you can press, and there is nothing to add to a decision that
          has been signed. */}
      {readOnly ? null : composer?.mode === "add" ? (
        <div className="border-t border-border">
          <EvidenceComposer
            /* "Add", not "Add evidence". The card is called Evidence, the button
               that opened this form said Add evidence, and the form is sitting in
               the list — the noun is established three times over by the time
               anybody reaches this button. */
            submitLabel="Add"
            onCommit={(item) => {
              dispatch?.({ type: "evidence.create", item });
              close();
            }}
            onCancel={close}
          />
        </div>
      ) : (
        <div className="border-t border-border px-2.5 py-2">
          {/* Outline, and 28px — the style chosen for it in the title bar, kept
              here so the control did not change identity when it moved. A rim at
              the foot risks reading as a fourth row, which is why it was ghost the
              first time; against the headings' 12px captions above, the rim is
              what keeps it legible as the one thing on this card you can press. */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setComposer({ mode: "add" })}
            className="h-7 gap-1.5 px-2.5 text-xs [&_svg]:size-3"
          >
            <Plus /> Add evidence
          </Button>
        </div>
      )}
    </Rows>
  );
}

/**
 * ONE FILED VALUE — the glyph the live select shows, and its own word.
 *
 * The SAME vocabulary the live trigger uses and the same the record's `What changed`
 * manifest uses: `RankBars` for a rank, `CallDot` for a call. The copy this replaces
 * printed "High" and "✓ Approve" as text, so one card spoke about relevance in two
 * grammars depending on which block you were reading.
 *
 * `null` on either half is a real state — an item can be committed with neither
 * judgement made (`Importance | null` in ../../lib/coverage/fixture.ts) — and an
 * em-dash says "not decided" where an empty cell would read as a rendering fault.
 *
 * `font-semibold` at 12px matches the compact trigger's own label, so the value sits
 * at the weight it sat at while it was still a control.
 */
function FiledValue({ glyph, label }: { glyph: ReactNode; label: string | null }) {
  return (
    <span className={cn(TYPE.small, "flex items-center gap-1.5 font-semibold")}>
      {glyph}
      <span className={label ? undefined : "text-muted-foreground"}>{label ?? "—"}</span>
    </span>
  );
}

/**
 * WHOSE HAND IS ON THIS ROW — one mark, two verbs, and the glyph IS the verb.
 *
 * ## What it replaced, and what it keeps
 *
 * A `Badge` with a tinted ground, an initials avatar and the words "Added by".
 * All three came off: a tinted ground is the shape this console gives a STATE —
 * the recommendation tag, the on-us/on-them markers, the eval verdicts — and this
 * is not a state, it is a note about a hand. Dressing it as a badge gave it a
 * verdict's weight. The prose went with the ground, because a person glyph
 * followed by a name already says somebody put this here.
 *
 * All of that still holds, and holds harder now that roughly twice as many rows
 * carry a mark.
 *
 * ## The second verb
 *
 * The mark used to fire on `addedByReviewer` only, so the list announced the rarer
 * act and stayed silent on the commoner one. Re-weighting is what moves the agent —
 * `rationaleFor` in ../../lib/coverage/store.ts reads `importance === "high"` on the
 * renewal item, which is the beat this whole screen is built around — and the row it
 * happened to looked identical to one nobody had touched.
 *
 * `touchedByReviewer` covers every way a reviewer can change an item: both the row's
 * two selects (`evidence.set`) and the composer editing a row back
 * (`evidence.update`) set it. So the second verb needed no new state, only drawing.
 *
 * ## ONE MARK FOR BOTH VERBS — the same avatar, by decision
 *
 * A `Pencil` on the edited state was built first, on the argument that the glyph
 * should carry the verb. It was rejected: the mark answers *whose hand is on this
 * row*, and the answer is the same person either way, so drawing two glyphs made one
 * question look like two. The silhouette is the mark; the verb is a detail about it.
 *
 * **What follows from that:** the visible difference between an added row and an
 * edited one is nothing. Both read `👤 Scott Florentino`. The verb survives only in
 * the tooltip and the `aria-label` — which is a deliberate trade, not an oversight,
 * and the reason `Added wins when a row is both` below still matters: it decides
 * which sentence the invisible-to-the-eye states tell.
 *
 * **Filled, not the outline.** A hairline person at 12px against 10.5px type reads
 * as a smudge; a solid one reads as a mark. The inline style matters as much as the
 * prop, because lucide writes `strokeWidth` as a presentation attribute and any CSS
 * rule anywhere (a stylesheet this app cannot see the source of included) beats one
 * of those; an inline declaration does not lose that race.
 *
 * ## Added wins when a row is both
 *
 * `evidence.set` sets `touchedByReviewer` on any row, the reviewer's own included, so
 * re-weighting a row you filed leaves both flags true. Authorship outranks revision:
 * it is one fact — the row is yours — and editing your own row is not news. With one
 * glyph this decides nothing visible; it decides which sentence the tooltip tells,
 * and `Added by …` is the truer one about a row its owner went back to.
 *
 * ## The verb and the time live in the tooltip
 *
 * "Edited by Scott Florentino" is 120px against the bare name's 74px, on a line whose
 * title already truncates. The sentence goes where it costs no width — `aria-label`
 * for a reader who cannot see the glyph, which is where it has always been, and now a
 * tooltip for a pointer. 1200ms, the dwell the column heads and the triggers use, and
 * for the same reason: this mark sits on a 48px row that is itself a toggle, so a
 * pointer crossing it on the way somewhere else must not raise anything.
 *
 * An unmarked row is the case as the agent filed it. That absence only started
 * meaning something with the second verb — before it, a blank row was either
 * untouched or edited-invisibly, which is worth nothing to read.
 */
function Hand({ item: e, name }: { item: EvidenceItem; name: string }) {
  const added = Boolean(e.addedByReviewer);
  if (!added && !e.touchedByReviewer) return null;

  // The stamp that matches the verb, never the later of the two: a row added at
  // 10:44 and edited at 10:51 prints "Added by … · 10:44 AM", which is what the
  // glyph beside it just said. `addedAt`/`touchedAt` in ../../lib/coverage/fixture.ts
  // are separate fields for exactly this.
  const at = added ? e.addedAt : e.touchedAt;
  const sentence = `${added ? "Added" : "Edited"} by ${name}${at ? ` · ${timeOnly(at)}` : ""}`;

  return (
    <Tooltip delayDuration={1200}>
      <TooltipTrigger asChild>
        <span
          aria-label={sentence}
          className={cn(
            TYPE.small,
            "flex shrink-0 items-center gap-1 text-[10.5px] text-muted-foreground",
          )}
        >
          <UserRound
            className="size-3 shrink-0"
            fill="currentColor"
            strokeWidth={0}
            style={{ strokeWidth: 0 }}
            aria-hidden
          />
          {name}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top">{sentence}</TooltipContent>
    </Tooltip>
  );
}

function Row({
  item: e,
  dispatch,
  actorName,
  readOnly = false,
  onEdit,
}: {
  item: EvidenceItem;
  dispatch?: (ev: CoverageEvent) => void;
  actorName: string;
  readOnly?: boolean;
  onEdit: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasBody = Boolean(e.note || e.backs || e.sources.length > 0 || e.addedByReviewer);

  return (
    <FoldRow
      // The row's own verdict, as the colour of its rule — the same three the
      // finding's causes use above it.
      tone={e.call === "approve" ? "ok" : e.call === "partial" ? "warn" : e.call === "deny" ? "bad" : null}
      title={e.name}
      open={open}
      onToggle={hasBody ? () => setOpen((o) => !o) : undefined}
      badge={<Hand item={e} name={actorName} />}
      right={
        /* `width={0}` STAYS — the trigger still sizes itself from the inside out.
           What changed is that it now sits in a fixed cell (`COL` above), so its
           own width no longer decides where the column is.

           NO HINT ON THE CONTROLS. They each carried one naming the axis, off the
           same `COL_HINT` the column heads use — which meant one sentence repeated
           on every row, on hover targets that sat in front of the menu the reviewer
           was reaching for. The heading says it once for the column
           (`ColumnHead` above, which keeps its tooltip). */
        <>
          {/* FIXED CELL, CONTROL RIGHT-ALIGNED IN IT. The cell holds the column
              edge; the trigger keeps its own width and its own styling — nothing
              about the control changed, only where it is allowed to sit.

              READ-ONLY USES THE SAME TWO CELLS, which is the whole point: the
              column edges do not move between the live list and the filed one, so
              the headings above keep sitting over their values. Only the trigger's
              chrome goes. */}
          <span className={cn("flex shrink-0 justify-end", COL.relevance)}>
            {readOnly ? (
              <FiledValue
                glyph={e.importance ? <RankBars value={e.importance} /> : null}
                label={IMPORTANCE_OPTIONS.find((o) => o.value === e.importance)?.label ?? null}
              />
            ) : (
              <LabelledSelect
                compact
                caption="Relevance"
                value={e.importance}
                options={IMPORTANCE_OPTIONS}
                onChange={(importance) => dispatch?.({ type: "evidence.set", id: e.id, patch: { importance } })}
                icon={(v) => <RankBars value={v} />}
                width={0}
                ariaLabel={`Relevance — ${e.name}`}
              />
            )}
          </span>
          <span className={cn("flex shrink-0 justify-end", COL.decision)}>
            {readOnly ? (
              <FiledValue
                glyph={e.call ? <CallDot value={e.call} /> : null}
                label={CALL_OPTIONS.find((o) => o.value === e.call)?.label ?? null}
              />
            ) : (
              <LabelledSelect
                compact
                caption="Decision"
                value={e.call}
                options={CALL_OPTIONS}
                onChange={(call) => dispatch?.({ type: "evidence.set", id: e.id, patch: { call } })}
                icon={(v) => <CallDot value={v} />}
                width={0}
                ariaLabel={`Decision — ${e.name}`}
              />
            )}
          </span>
        </>
      }
    >
      {e.note && <p className={cn(TYPE.body, "leading-relaxed text-muted-foreground")}>{e.note}</p>}
      {(e.backs || e.sources.length > 0) && (
        <div className="mt-2 flex flex-wrap items-baseline gap-3.5">
          {e.backs && (
            <span className={cn(TYPE.small, "text-muted-foreground")}>
              {e.backs.label}{" "}
              <b className="ml-0.5 font-semibold tabular-nums text-foreground">{moneyExact(e.backs.amount)}</b>
            </span>
          )}
          {e.sources.length > 0 && <Mono>{e.sources.join(" · ")}</Mono>}
        </div>
      )}

      {/* Edit and Remove live in the opened body. They were always about the
          item's content, and the content is what has just been opened — which
          also makes them findable, where a hover-only control on a 44px line
          never would be. */}
      {/* `!readOnly`: the body still opens on a filed record, and it still shows
          the note, what the item backs and where it came from — but a signed row
          cannot be edited or removed. */}
      {!readOnly && e.addedByReviewer && (
        <div className="mt-2.5 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil aria-hidden /> Edit
          </Button>
          {/* No confirm. It is one row, it belongs to the person pressing it, and
              a dialog over a list this short costs more than it protects. */}
          <Button
            variant="destructive-outline"
            size="sm"
            onClick={() => dispatch?.({ type: "evidence.remove", id: e.id })}
          >
            <Trash2 aria-hidden /> Remove
          </Button>
        </div>
      )}
    </FoldRow>
  );
}
