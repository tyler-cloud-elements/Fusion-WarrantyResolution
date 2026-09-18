import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CHOICEBOX — a group of option cards, each with a title, a description and its own
 * control, selected by its rim and ring on an unchanging filled ground.
 *
 * Adapted rather than pasted. Three things about the source did not belong here:
 *
 * 1. **`clsx` is not a dependency of this app** — `cn` (../../lib/utils.ts) is the
 *    same job plus tailwind-merge, and it is what every other component uses.
 * 2. **The `--ds-blue-*` / `--ds-gray-*` palette is not this app's.** Adding it would
 *    put a second source of colour beside the theme and break both dark mode and
 *    `docs/theme-rules.md`. Every value here is a semantic token — `primary`,
 *    `border`, `muted-foreground` — so the group themes with the rest of the console.
 * 3. **The control is a real input, always.** The source hides one and paints a
 *    `<span>`; keeping the input as the thing that is checked (visually hidden, not
 *    absolutely positioned) is what makes arrow keys, form association and screen
 *    readers work without a second implementation.
 *
 * Radio and checkbox both, `row` or `column`, and an optional `badge` slot beside the
 * title — which is why the resolution row can carry "Agent recommended" without it
 * landing on top of the option's own name.
 *
 * A `badge` needs no special handling: the ground is the same whether or not a card
 * is selected, so a chip carrying its own tint is legible on all three.
 */

export function ChoiceboxGroup({
  name,
  type = "radio",
  value,
  onValueChange,
  direction = "row",
  ariaLabel,
  readOnly = false,
  className,
  children,
}: {
  /** Shared for radios, so the browser groups them. */
  name: string;
  type?: "radio" | "checkbox";
  /** A string for `radio`, a list for `checkbox`. */
  value: string | string[];
  onValueChange: (value: string) => void;
  direction?: "row" | "column";
  ariaLabel: string;
  /**
   * THE GROUP IS A RECORD OF A CHOICE RATHER THAN THE CHOICE.
   *
   * Set on the filed decision (../coverage/decision/FiledRecord.tsx), which shows
   * the three resolutions frozen at what was signed. It is passed down to each
   * item rather than read there, so a group cannot be half read-only.
   *
   * DISTINCT FROM `disabled` on the items, which is the wrong lever: that dims
   * whatever it is on, and here the PICKED card has to keep its full treatment
   * while the other two recede. `ChoiceboxItem`'s own note has the rest.
   */
  readOnly?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      // A radiogroup for radios; a checkbox set is just a group.
      role={type === "radio" ? "radiogroup" : "group"}
      aria-label={ariaLabel}
      data-choicebox
      data-type={type}
      data-value={Array.isArray(value) ? value.join(",") : value}
      data-name={name}
      // The fact, for a screen reader. The dimming below is a style.
      aria-readonly={readOnly || undefined}
      className={cn("flex gap-3", direction === "row" ? "flex-row items-stretch" : "flex-col", className)}
      // Belt and braces: every input is `disabled` when read-only, so nothing can
      // fire this — but a group that cannot change should not carry a handler that
      // would change it.
      onChange={
        readOnly
          ? undefined
          : (e) => {
              const t = e.target as HTMLInputElement;
              if (t.type === type) onValueChange(t.value);
            }
      }
    >
      {/* The flag reaches the cards through context-free cloning rather than a
          provider: there are three of them, they are always direct children, and a
          context for one boolean is more machinery than this needs. */}
      {readOnly
        ? Children.map(children, (child) =>
            isValidElement<{ readOnly?: boolean }>(child)
              ? cloneElement(child, { readOnly: true })
              : child,
          )
        : children}
    </div>
  );
}

export function ChoiceboxItem({
  name,
  type = "radio",
  value,
  selected,
  title,
  description,
  badge,
  disabled,
  readOnly = false,
  /** Shown under the card when it is the selected one. */
  children,
}: {
  name: string;
  type?: "radio" | "checkbox";
  value: string;
  selected: boolean;
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  /**
   * THE CHOICE AS SIGNED — set by the group, not usually by hand.
   *
   * **Not `disabled`.** That applies `opacity-50` to whatever card it is on, and a
   * filed record needs the opposite split: the card that was chosen keeps its rim,
   * its ring, its marker and its badge at full strength, and the two that were not
   * recede to 45%. "One of three" is part of what was decided, so the unchosen
   * cards stay on screen rather than being dropped — but they are no longer
   * offers, and full-strength offers beside a signed decision read as a control.
   *
   * The input underneath is `disabled` either way, which is what makes the group
   * inert to arrow keys, clicks and form submission.
   */
  readOnly?: boolean;
  children?: ReactNode;
}) {
  return (
    <label
      /**
       * THE SELECTED RING IS AN INLINE `boxShadow`, and it has to be.
       *
       * Every `ring-*` utility is DEAD inside `.wrc`. Measured on the running page:
       * `ring-2 ring-primary`, `ring-[3px] ring-primary`, `ring-primary/20`,
       * `ring-ring/50` and `shadow-[0_0_0_3px_var(--primary)]` all resolve to a
       * shadow list whose colours are `rgba(0,0,0,0)`, or to `none` — the console's
       * prebuilt sheet (../../../warranty-console/warranty-console.css) never sets
       * `--tw-ring-color`, and the shell's copy of the utility loses the cascade.
       * So `border-primary ring-[3px] ring-primary/20` drew a 1px border colour
       * change and nothing else, which is why the selection read as flat.
       *
       * An inline style cannot be outvoted by either sheet, and one dynamic value
       * is what inline style is for — the same reason ../coverage/primitives.tsx
       * writes its chevron rotation this way.
       */
      style={
        selected
          ? { boxShadow: "0 0 0 3px color-mix(in oklab, var(--primary) 18%, transparent)" }
          : undefined
      }
      className={cn(
        // `relative` IS LOAD-BEARING. The input below is `sr-only`, which is
        // `position: absolute` — with no positioned ancestor here its containing
        // block became the page wrapper eight levels up, so the control the browser
        // actually focuses sat hundreds of pixels away from the card it belongs to.
        // Clicking a card then scrolled the record to reveal a 1×1 box somewhere
        // else entirely, which is the page-shift this caused. Positioned here, the
        // input lands inside its own card and focusing it moves nothing.
        // `rounded-lg`, matching the Submit button. It was `rounded-xl` — 14px
        // against that button's 10 — which is part of what made three choices
        // loom larger than the control that files them.
        "group relative flex min-w-0 flex-1 flex-col rounded-lg border transition-[background-color,border-color,box-shadow] duration-150",
        /**
         * ONE FILLED GROUND, AND THE BORDER IS THE SELECTION.
         *
         * `bg-muted` on all three, always. The fill is what makes them read as
         * controls rather than as regions of the panel they sit in — they used to
         * be `bg-card`, the same surface as that panel — and it does that job
         * whether or not a card is picked, so it does not need to change when one
         * is.
         *
         * **The selected card does NOT change fill, and that is the whole point.**
         * Two earlier versions filled it: first with `primary`, then with a slate.
         * Both made a picked choice look like the Submit button 200px below it —
         * the same shape in the same ink as the control that commits it — and the
         * teal one failed AA besides, since white on `--primary` is 3.19:1. The rim
         * and the ring say "this one" without borrowing the action's dress.
         *
         * So the only moving parts are the rim, the ring (the inline `boxShadow`
         * above) and the marker. `border-transparent` when unselected rather than
         * no border at all, so the box does not resize by 2px when one is picked.
         */
        "bg-muted",
        selected ? "border-primary" : "border-transparent",
        disabled
          ? "cursor-not-allowed opacity-50"
          : readOnly
            ? // THE RECORD'S SPLIT. No pointer affordance on either — nothing here
              // can be pressed — and the unchosen two recede. The chosen one takes
              // no extra treatment: it already has the rim, the ring and the filled
              // marker, and adding to it would make the signed card louder than the
              // live one it is a record of.
              cn("cursor-default", !selected && "opacity-45")
            : selected
              ? "cursor-pointer"
              : "cursor-pointer hover:bg-muted/70",
      )}
    >
      {/* THE CONTROL LEADS, AND THE TEXT STACKS.
          Marker first and `items-start`, so the three cards read as a column of
          choices rather than as three rows with a dot trailing off the right edge;
          then the name (with its badge beside it) on one line and what the option
          means on the next. The description WRAPS — it used to truncate to fit one
          line, which is what "Cobalt Ridge funds the…" was. */}
      {/* `px-3 py-2.5` — 12 and 10, down from 14 all round. With the radius and
          the type below, the card lands near 63px against the Submit button's 61
          instead of looming 30px over it. */}
      <span className="flex min-w-0 items-start gap-2 px-3 py-2.5">
        <input
          type={type}
          name={name}
          value={value}
          checked={selected}
          // `readOnly` folded in: this is what takes the group out of the tab
          // order and off the arrow keys, and it is the half that `aria-readonly`
          // on the group cannot do.
          disabled={disabled || readOnly}
          // `sr-only`, not `absolute` — it stays in the label so a click anywhere on
          // the card reaches it, and focus lands where the marker is drawn.
          className="peer sr-only"
          readOnly
        />
        {/* The marker takes the action's hue when picked, matching the rim and the
            ring. The ground under it does not change, so it does not have to invert
            for legibility the way it did over a filled selection.

            `size-3.5` rather than `size-4`, a rung down with the rest of the box. */}
        <span
          aria-hidden
          className={cn(
            "mt-px grid size-3.5 shrink-0 place-items-center border-[1.5px] transition-colors duration-150",
            type === "radio" ? "rounded-full" : "rounded",
            selected ? "border-primary" : "border-muted-foreground/45",
            selected && type === "checkbox" && "bg-primary",
          )}
        >
          {type === "radio" ? (
            <span
              className={cn(
                "size-1.5 rounded-full bg-primary transition-transform duration-150 ease-out",
                selected ? "scale-100" : "scale-0",
              )}
            />
          ) : (
            <Check
              className={cn(
                "size-2.5 text-primary-foreground transition-opacity",
                selected ? "opacity-100" : "opacity-0",
              )}
            />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex min-w-0 flex-wrap items-center gap-1.5">
            {/* 12px, A RUNG BELOW THE SUBMIT LABEL — and that is a reversal.
                These titles and that label were brought onto one 13px rung so
                neither out-shouted the other; both files carried the argument.
                Settled the other way now: there are three of these to one of it,
                and three choices should not weigh as much as the single control
                that files them. 12 is `text-xs`, the rung the descriptions below
                used to hold, so nothing here is off-scale — everything moved down
                one step together. */}
            <span className="text-xs font-semibold">{title}</span>
            {badge}
          </span>
          {/* 11px, down a rung with the title. One ink in both states, now that
              the ground under it does not change. */}
          {description && (
            <span className="mt-px block text-[11px] text-muted-foreground">{description}</span>
          )}
        </span>
      </span>

      {children && selected && (
        <span className="block border-t border-border px-3 py-2.5">{children}</span>
      )}
    </label>
  );
}
