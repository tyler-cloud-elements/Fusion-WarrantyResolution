import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GLASS_CLASSES } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

/**
 * THE PAGE'S SCALE — WHICH IS NOW THE APP'S SCALE, in one place.
 *
 * This file used to hold a design system of its own: seven type rungs, a bespoke
 * `Pill`, an opaque 14px-radius card, a tinted band, and a 10px uppercase
 * micro-label as the page's dominant caption. It looked considered on its own and
 * it looked foreign next to every other screen in warranty resolution, because
 * none of those five things exist anywhere else in the app.
 *
 * So each of them is now a thin adapter over the app's own component:
 *
 *   `Card`    → `GLASS_CLASSES` from ../ui/card.tsx (the glass every other card is)
 *   `Pill`    → the app's `Badge` (rimless, tinted, status-inked — see its note)
 *   `TYPE`    → the app's own six rungs, below
 *   `Band`    → a hairline sub-head, no tint
 *   `Label`   → a 12px caption, sentence case
 *
 * The export names and signatures did NOT change, which is the whole point of
 * doing it here: the eight components that read from this file compile unchanged,
 * and the ones that needed more than a re-skin were edited on their own terms.
 */

/**
 * SIX RUNGS, AND THEY ARE THE APP'S — 12 · 14 · 16 · 24, plus the 10px the odd chip
 * resolves to. The 11px mono stamp is gone; `meta`'s own note says why.
 *
 * Measured off the case detail page: every leaf element there renders at 10, 11,
 * 12, 14, 16 or 24px. This page had ten sizes, four of which (13, 13.5, 15, 20)
 * exist nowhere else — and 13 vs 13.5 vs 14 is three rungs inside a pixel and a
 * half, which the eye cannot resolve and which therefore carried no meaning.
 *
 * The names are unchanged so no call site had to move. What each one now means:
 *
 *   label   12px               a caption. NOT uppercase — the app has no
 *                              uppercase micro-label, and this page had ~30 of them
 *   meta    12px               ids, stamps, sources, counts (NOT mono — see below)
 *   small   12px               captions and meta prose
 *   body    14px               everything a reviewer reads
 *   title   16px semibold      a card's or a section's own heading
 *   page    24px bold          the one h1, the app's own heading rung
 *   figure  24px bold tabular  the claim, the decision
 *
 * Radii come from the app too: cards `rounded-2xl` (18px), panels `rounded-xl`
 * (14px), controls `rounded-lg` (10px), pills `rounded-full`.
 */
export const TYPE = {
  /**
   * A caption. Sentence case — see the note above on the uppercase label.
   *
   * `font-light` (300), not `font-normal`. This is `Meta`'s own weight on the case
   * page (`CaseDetailPage`'s `Status` / `Priority` / `Stage` captions all compute
   * 12px/300), and a caption at 400 sits at the same weight as the value under it,
   * which is what made these read as two lines of equal rank rather than as a
   * label and its reading.
   */
  label: "text-xs font-light",
  /**
   * NOT MONOSPACE ANY MORE, and the case page is why.
   *
   * Measured on `/cases/WR-2026-0417`: the hero prints `WR-2026-0417 · Joliet DC ·
   * Line 3 / Induct` in plain 12px muted, and the page uses a monospace face
   * **nowhere** — 0 runs against this page's 2. An id set in mono reads as a code
   * sample rather than as a fact about the case, and it was the one face on this
   * screen the app does not have.
   *
   * 12px rather than 11: `small` is the rung the case page's own meta line sits on,
   * and an 11px step under it existed only to make room for the mono face's wider
   * figures.
   */
  meta: "text-xs",
  small: "text-xs",
  /** Reading prose — the paragraphs a reviewer actually reads. */
  body: "text-sm",
  /** A section's own heading, at the same rank the app's widget headers use. */
  title: "text-base font-semibold",
  /**
   * 24/700 — THE APP'S OWN `h1`, and this reverses the note that stood here.
   *
   * It was 20/600, and the reason was real: at 24px the title took 620px of the
   * 1132 available, because it shared a line with the case id and three status
   * readings. A 41-character sentence crammed against four other things does read
   * as shouting.
   *
   * **The crowding is what changed, not the argument.** The header's readings moved
   * into `Meta` columns — caption over value, the case page's own arrangement
   * (../../pages/cases/CoverageDecisionCiPage.tsx) — which takes them off the
   * title's line entirely. The title now owns its line, so the app's rung fits at
   * its natural size and this page stops being the only screen whose heading is a
   * rung short.
   *
   * The two changes are one change: reverting either alone brings back either the
   * crowding or the odd rung.
   */
  page: "text-2xl leading-tight font-bold tracking-tight",
  /**
   * The one or two figures a screen is about — the claim, the decision.
   *
   * 20/600, DOWN FROM 24/700, and the reason is the rung above. While the page
   * title was 20px this figure was set at 24 — so the largest, boldest thing on the
   * screen was a number, one rung ABOVE the heading of the page it sits on. With
   * the title at the app's 24/700 that inversion would simply flip to a tie.
   *
   * It keeps its position, its tabular figures and its emphasis inside its own
   * panel; it is no longer competing with the page's own name.
   */
  figure: "text-xl leading-none font-semibold tracking-tight tabular-nums",
} as const;

/**
 * Secondary prose (≥ 8:1 on the card); the muted-foreground token is for meta
 * only and never carries a sentence.
 */
export const INK = { ink2: "text-foreground/75" } as const;

/**
 * THE MENU SURFACE THIS SCREEN WANTS, and it is a per-call-site override rather
 * than a change to `ui/dropdown-menu.tsx`.
 *
 * The copy this screen came from edited that primitive directly — `bg-card` over
 * `bg-popover`, a heavier shadow, and 13px rows with a point more padding, which
 * is the density the rest of this screen's rows read at. But the primitive is used
 * across the whole app, and moving every menu in the product to suit one page is
 * the opposite of what a flag is for.
 *
 * So the classes live here and the three consumers in this folder pass them:
 * ./LabelledSelect.tsx, ./decision/RationalePanel.tsx and ./dock/MoreMenu.tsx.
 * `cn` is `tailwind-merge`, so each of these replaces its counterpart on the base
 * rather than fighting it — no specificity games, and no `!important`.
 *
 * `bg-card` is worth stating even though it is the same white as `bg-popover` in
 * light mode: the two tokens diverge in dark, where a menu opened from a card
 * should be the card's surface and not the page's.
 */
export const MENU = {
  content: "bg-card text-card-foreground border-border shadow-lg",
  item: "rounded-md px-2.5 py-2 text-[13px]",
} as const;

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn(TYPE.label, "text-muted-foreground", className)}>{children}</span>;
}

/**
 * THE NAME IS HISTORICAL AND THE FACE IS NOT MONOSPACE ANY MORE.
 *
 * It wraps `TYPE.meta`, which dropped the mono face when this page was measured
 * against the case detail hero — that page sets ids, stamps and sources in its
 * plain 12px muted and uses a monospace face nowhere. See `TYPE.meta`'s note.
 *
 * Kept as `Mono` on purpose rather than renamed: it has callers in five files and
 * the job it does — "this is a reference, not prose" — did not change, only the
 * face it does it with. Renaming it is a churn-only diff across those five, and
 * this note is what stops the name being read as a promise.
 */
export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn(TYPE.meta, "text-muted-foreground", className)}>{children}</span>;
}

/**
 * A CARD, AND IT IS THE APP'S CARD.
 *
 * `GLASS_CLASSES` rather than a copy of its values: the fill, the rim,
 * `rounded-2xl`, `backdrop-blur-sm` and the two-part shadow are one decision made
 * in ../ui/card.tsx, and a second copy here is a second thing to keep in step —
 * which the data table proved by carrying one and drifting the moment the card's
 * fill changed. No values are named here on purpose; that file owns them. It stays
 * a `<section>` — the app's `Card` is a `div`, and the landmark is worth more here
 * than the shared element.
 *
 * It carries NO padding or layout, deliberately: this page's cards want different
 * insides (a grid of facts, a column of panels, a bare list), so each caller says
 * what it is. `p-5` and `gap-4` are the page's convention where there is nothing
 * to argue.
 */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn(...GLASS_CLASSES, className)}>{children}</section>;
}

/**
 * A card header, on the app's `WidgetHeader` pattern: an optional icon, a 16px
 * semibold title, and a count or a stamp on the right.
 *
 * `icon` is new and optional, so the one existing caller keeps working.
 */
export function CardHead({
  title,
  icon,
  aside,
}: {
  title: string;
  icon?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 className={cn(TYPE.title, "flex items-center gap-2")}>
        {icon ? (
          <span className="flex shrink-0 text-muted-foreground [&>svg]:size-4">{icon}</span>
        ) : null}
        {title}
      </h2>
      {aside}
    </div>
  );
}

/**
 * THE GROUP A LIST OF FOLD ROWS SITS IN.
 *
 * New, and it is what replaces the full-bleed list. The rows used to run edge to
 * edge inside the card, which is why the card could not have padding and why the
 * band needed a tint to separate itself from them. One bordered panel — the shape
 * the app already uses for its SLA rows and its open-action cards — gives the rows
 * a rim of their own, so the card can be padded like every other card in the app
 * and the band can stop being a coloured stripe.
 */
export function Rows({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}>
      {children}
    </div>
  );
}

/**
 * A BAND — a sub-heading inside a `Rows` group that holds more than one list.
 *
 * It was `border-y border-border/60 bg-muted/50` with a 10px uppercase label: a
 * tinted stripe, which is a device this app uses nowhere. It is now a hairline and
 * a 14px semibold title — quieter than a `CardHead` by a rung rather than by a
 * wash, which is how the app separates a group from its parent everywhere else.
 */
export function Band({ title, aside }: { title: string; aside?: ReactNode }) {
  return (
    /**
     * `min-h-10 py-1.5`, NOT `py-2.5` — so the bar measures the same whatever the
     * aside is. It holds a 24px chip in the finding group and a 28px button in the
     * evidence group, and at 10px of padding the taller of the two would have made
     * one bar 48px against the other's 41. The floor sets the height; the padding
     * only stops a tall aside touching the rules. Both land on 40px.
     */
    <div className="flex min-h-10 items-center justify-between gap-3 border-b border-border px-3.5 py-1.5">
      <span className={cn(TYPE.body, "font-semibold")}>{title}</span>
      {aside}
    </div>
  );
}

/**
 * ONE FOLDED ROW — the line both lists on this page are made of.
 *
 * A 48px header and a body that opens under it: a chevron, a dot for the row's own
 * verdict, a title, whatever the row puts on the right, and the content one press
 * away.
 *
 * **The verdict is a DOT now, not a 3px rule down the left edge.** The rule was
 * this page's own invention and it read as a coloured gutter that nothing else in
 * the app has; a 6px dot before the title is the marker the app already uses (see
 * `QueueReasonPill` in ../warranty/badges.tsx). The colour language is untouched —
 * green argues for cover, amber splits, red argues against — so a reader who has
 * learned the column has not lost anything but the stripe.
 *
 * **`right` is a slot rather than a prop set.** Evidence puts two selects there and
 * the finding puts a summary and a side pill. Anything interactive in there sits
 * OUTSIDE the toggle button — a button cannot contain a button.
 *
 * **The rotation is an inline transform.** Not because the utility form is broken
 * in general, but because on THIS element `rotate-180` computes to `0deg`, and a
 * cascade split across two stylesheets is not something to relitigate per
 * component. See the note in ./EvidenceList.tsx on why a class here is only real if
 * the prebuilt sheet (../../../warranty-console/warranty-console.css) contains it.
 */
export function FoldRow({
  tone,
  title,
  badge,
  right,
  open,
  onToggle,
  children,
}: {
  /** The verdict this row carries, as the colour of its dot. */
  tone: "ok" | "warn" | "bad" | null;
  title: string;
  /** A chip beside the title — the reviewer's marker, where there is one. */
  badge?: ReactNode;
  /** The row's own controls or readings, on the line. */
  right?: ReactNode;
  open: boolean;
  /** Omitted where the row has nothing to open; the chevron then hides. */
  onToggle?: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="[&+&]:border-t [&+&]:border-t-border">
      <div
        className={cn(
          "flex min-h-12 items-center gap-2.5 px-3.5 transition-colors",
          onToggle && "hover:bg-muted/50",
        )}
      >
        {/* The whole strip toggles. A 48px line whose only hit target is a 16px
            glyph is a target nobody hits, so the button spans the title and the
            chevron travels with it. */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={onToggle ? open : undefined}
          disabled={!onToggle}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 py-2 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-default"
        >
          {/* THE ROTATION IS AN INLINE STYLE. `rotate-180` is in the prebuilt sheet
              and still computes to `0deg` on this element, so something in a
              cascade split across two stylesheets is winning. A transform written
              here cannot be outvoted by either of them. (Measure `rotate`, not
              `transform` — Tailwind v4 writes `rotate-*` to the standalone
              property, and reading the wrong one is how this was misdiagnosed the
              first time.) */}
          <ChevronDown
            aria-hidden
            style={{ transform: open ? "rotate(180deg)" : undefined }}
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              !onToggle && "opacity-0",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              tone === "ok" && "bg-success",
              tone === "warn" && "bg-warning",
              tone === "bad" && "bg-destructive",
              // A neutral dot where there is no verdict yet. Unlike a fourth rule
              // colour, a grey dot in a row of coloured ones reads as "not yet"
              // rather than as a fourth meaning to learn.
              tone === null && "bg-border",
            )}
          />
          <span className={cn(TYPE.body, "min-w-0 truncate font-medium")}>{title}</span>
          {badge}
        </button>
        {right}
      </div>
      {open && children ? <div className="pr-3.5 pb-3.5 pl-10">{children}</div> : null}
    </div>
  );
}

/** A count in a card head, as the app's own neutral badge. */
export function Count({ children }: { children: ReactNode }) {
  return <Badge variant="outline">{children}</Badge>;
}

/**
 * A collapsible card, shut by default — the shape Similar claims, This customer and
 * Documents share. The closed row carries a summary that answers the question the
 * section is for, so opening it is optional.
 *
 * It is a glass card like every other card on the page now, and its head is a 56px
 * line with a 16px title: the same rank the two open cards above it use, so the
 * five blocks read as five of one thing rather than as two cards and three strips.
 */
export function Section({
  title,
  summary,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  summary: string;
  /** Optional, so existing callers keep working. */
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  /**
   * CONTROLLED, so the chevron can be an inline transform.
   *
   * Radix keeps the open state internally and exposes it as `data-state`, which is
   * fine for styling the panel but leaves the rotation depending on a
   * `group-data-[state=open]:*` utility resolving through two stylesheets. It does
   * resolve here — but ./FoldRow's does not, and the two folds on this page should
   * not turn out to be the same gesture wired two different ways.
   */
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={cn(...GLASS_CLASSES)}>
      <CollapsibleTrigger
        /**
         * THE BOTTOM CORNERS ARE SET BY OMISSION, NOT BY OVERRIDE.
         *
         * This read `rounded-2xl` with `open && "rounded-b-none"`, and it did not
         * work: both classes land in the attribute — `twMerge` keeps them, since
         * `rounded` and `rounded-b` are separate groups — and the winner is then
         * decided by their order in the generated stylesheet, where `rounded-2xl`
         * comes last. Measured open: `border-bottom-left-radius: 18px`, with
         * `rounded-b-none` present and losing. So the head kept a curved bottom
         * edge over a square body.
         *
         * Naming only the corners that should be round emits one declaration and
         * has nothing to lose a cascade fight with. The same trap as the arbitrary
         * `bg-[color-mix(...)]` classes elsewhere in this folder: Tailwind's output
         * order is not the attribute's order, so conflicts have to be avoided
         * rather than resolved.
         */
        className={cn(
          "flex min-h-14 w-full cursor-pointer items-center gap-2.5 rounded-t-2xl px-5 py-3 text-left transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          // OPEN, THE HEAD DRAWS NO BOTTOM EDGE AT ALL — no rule and no radius.
          // It had a `border-b`, which put a hard line between a head and a body
          // that are one card; the body's own first rule is enough of a boundary
          // where there is one, and where there is not, none is wanted.
          !open && "rounded-b-2xl",
        )}
      >
        <ChevronDown
          aria-hidden
          style={{ transform: open ? "rotate(180deg)" : undefined }}
          className="size-4 shrink-0 text-muted-foreground transition-transform"
        />
        {icon ? (
          <span className="flex shrink-0 text-muted-foreground [&>svg]:size-4">{icon}</span>
        ) : null}
        <span className={cn(TYPE.title, "shrink-0")}>{title}</span>
        <span className={cn(TYPE.small, "ml-auto min-w-0 truncate text-right text-muted-foreground")}>
          {summary}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}

/**
 * LABEL / VALUE FACTS, TWO UP.
 *
 * **Values wrap; they never truncate.** This is the shape the page uses for facts,
 * and a fact behind an ellipsis is a fact the reviewer has to go and find. So a
 * pair that needs two lines takes two lines and its partner sits beside it — rows
 * are uneven by design, which is cheaper than losing a value.
 *
 * The label is a 12px caption and the value 14px reading size, which is the app's
 * own `Meta` pairing; it was 11px over 12.5px, two sizes this app does not have.
 *
 * The bottom rule is dropped from the last *row* rather than the last child, since
 * with an even count that is two elements.
 */
export function KeyValueGrid({ rows }: { rows: [string, ReactNode][] }) {
  const lastRowStart = rows.length - (rows.length % 2 === 0 ? 2 : 1);

  return (
    <div className="grid grid-cols-2 gap-x-8">
      {rows.map(([k, v], i) => (
        <div
          key={k}
          className={cn(
            "flex min-w-0 items-baseline gap-3 py-2",
            i < lastRowStart && "border-b border-border",
          )}
        >
          <span className={cn(TYPE.small, "w-[136px] shrink-0 text-muted-foreground")}>{k}</span>
          <span className={cn(TYPE.body, "min-w-0 flex-1")}>{v}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * ONE TINTED-OUTLINE CHIP, for the whole page.
 *
 * A 1px rim at 30%, a 10% wash, 12px/500, `rounded-full`, 10px of padding.
 *
 * It started life inside ./Finding.tsx for that group's three chips, moved here the
 * moment a fourth call site appeared (the customer's segment in ./CaseFacts.tsx),
 * and is now the page's ONLY chip: `Pill` below is an alias over it, so the two
 * header pills speak the same language as the findings group under them.
 *
 * **The tone lives in the rim and the wash. The ink is the page's own.**
 * The side markers kept their status ink at first — `text-success` on
 * `bg-success/10` — and that is the "status ink on a tint of itself" trap
 * ../primitives.tsx `Pill` has a long note about. Measured on the running page,
 * flattening the wash over the card on a canvas and computing WCAG:
 *
 *   On manufacturer   success ink on success/10       3.77:1
 *   Customer fault    destructive ink on destructive/10  3.46:1
 *   No rule covers…   foreground ink on primary/10      14.70:1
 *
 * 12px type needs 4.5:1, so two of the three failed and the one that passed is the
 * one already using `foreground`. All three take `foreground` now: they stay
 * plainly colour-coded — three different rims and washes — and all three are
 * legible. That is also what "the same text style as the pill above" asks for.
 *
 * **The tones are a lookup of LITERAL strings, not a template.** Tailwind finds
 * classes by scanning this file as text, so `border-${tone}/30` would compile,
 * type-check and emit nothing — another trap that same `Pill` note covers. Every
 * value below appears here verbatim, and each was measured on the running page
 * before it was used: `/10` and `/30` resolve for every tone below.
 */
/**
 * THE FOLDER'S CHIP HUES — exported, so there is one definition of them.
 *
 * `ToneChip` below is the main consumer, and the filed record's change badges are
 * the second (./decision/FiledRecord.tsx). Those carry the same three status
 * meanings at a very different size, and a private copy of this map over there
 * would be a second source of the folder's colour language, free to drift from
 * this one.
 *
 * THE HUE IS IN THE RIM AND THE WASH AND THE INK IS `foreground`, which is the
 * part worth not re-deriving: status ink on a tint of itself is the contrast trap
 * `Pill` has a long note about, and it is worst on `warn` — a warning-coloured
 * glyph on a warning wash measures 1.78:1 in light mode. The ink stays neutral and
 * the colour stays around it.
 */
export const TONE = {
  brand: "border-primary/30 bg-primary/10 text-foreground",
  ok: "border-success/30 bg-success/10 text-foreground",
  bad: "border-destructive/30 bg-destructive/10 text-foreground",
  warn: "border-warning/30 bg-warning/10 text-foreground",
  info: "border-info/30 bg-info/10 text-foreground",
  // The one tone with no hue. A rim and a wash of the same neutral would be
  // invisible, so this keeps the muted fill and takes the border token.
  plain: "border-border bg-muted text-muted-foreground",
} as const;

export function ToneChip({
  tone,
  className,
  children,
}: {
  tone: keyof typeof TONE;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        TYPE.small,
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-[3px] font-medium whitespace-nowrap",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * A STATUS CHIP — AND IT IS THE APP'S `Badge` AGAIN.
 *
 * This is a reversal of the note that used to stand here, so the argument on both
 * sides is worth keeping.
 *
 * It was `Badge`; it became `ToneChip` because the findings group had grown a
 * bordered chip for its verdict and its two cause sides, and the page ended up
 * speaking two chip languages at once. Unifying on the bordered one made the page
 * internally consistent — and left it inconsistent with everything around it.
 *
 * **Measured against the case page, the rimmed chip is the outlier.** Every status
 * on `/cases/WR-2026-0417` is rimless, on a `/15` wash, with the INK carrying the
 * tone: `Action required` is warning-inked, `P1` is destructive-inked. This page's
 * chips were a 1px `/30` rim over a `/10` wash with neutral `foreground` ink, so
 * the tone survived only as a pale border and a paler fill, and the word itself
 * said nothing. That is the difference a reader registers first.
 *
 * So the unification stands and only its target moved: the three direct `ToneChip`
 * callers on this page — the findings verdict, the two cause markers
 * (./Finding.tsx) and the customer segment (./CaseFacts.tsx) — came across in the
 * same change. `ToneChip` keeps no callers here; `TONE` is still read by
 * ./decision/FiledRecord.tsx's change badges, which are 18px glyph squares rather
 * than text pills and are right to stay bordered.
 *
 * **`badges.tsx` has its own unrelated `Pill`**, also wrapping `Badge`, used by the
 * case and actions pages. The two now agree by construction rather than by
 * coincidence.
 */
const BADGE_STATUS = {
  ok: "success",
  bad: "error",
  warn: "warning",
  info: "info",
  // No brand status on `Badge`, and `info` is the nearest reading: both mean "a
  // fact about where this sits" rather than a verdict on it.
  brand: "info",
} as const;

export function Pill({
  tone,
  children,
  className,
}: {
  tone: keyof typeof TONE;
  children: ReactNode;
  className?: string;
}) {
  // `plain` is the one tone with no hue, and `Badge`'s answer to that is the
  // outline variant rather than a status — a rim and no wash, which is what a
  // toneless chip should be.
  if (tone === "plain") {
    return (
      <Badge variant="outline" className={className}>
        {children}
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" status={BADGE_STATUS[tone]} className={className}>
      {children}
    </Badge>
  );
}
