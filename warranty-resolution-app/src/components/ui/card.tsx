import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * THE GLASS CARD — an OPAQUE white surface on a tinted page, and the light-mode
 * half of that is new.
 *
 * It was `bg-white/55` with a `border-white/80` rim, over an `--background` of pure
 * white. White at 55% over white is white; white at 80% over white is white. So in
 * light mode the fill and the rim both measured **1.000** against the page and the
 * only separation a section had was a single `rgba(0,0,0,0.05)` shadow.
 *
 * Two things had to move together, and moving either alone does almost nothing:
 *
 *   - `--background` is tinted now (index.css) — but a 55% white card filters it,
 *     absorbing more than half the change, so the page alone reached only 1.027.
 *   - the fill is opaque — which is what lets the tint behind it do full work.
 *
 * Measured after: card-vs-page **1.102**, rim-vs-page **1.138**. Dark mode is untouched
 * and stays at 1.157: `dark:bg-white/[0.055]` still wins there, so the card is still
 * a translucent lift on a dark canvas, which is where that treatment always worked.
 *
 * `border-border` — THE FULL TOKEN, not an alpha of it. It replaced the white rim
 * (a white rim on a white fill was the same no-op as the fill) and started at `/60`,
 * which held while the page was #f7f9fc. It does not hold at #f1f4f9: the rim is a
 * fixed light grey, so a darkening page converges on it, and at `/60` over the
 * deeper canvas the rim measured 1.077 — WEAKER than before the page moved. At full
 * strength it is 1.138 and the fill is 1.102, so both went up together. index.css
 * has the argument; the two values have to move as a pair.
 *
 * TWO CLASSES ARE NOW DECORATIVE IN LIGHT MODE and are kept deliberately:
 * `backdrop-blur-sm` (the dark fill is still translucent, so the class is not dead
 * there — and dropping it is a compositing-layer question, not a contrast one) and
 * the white `inset` highlight in the shadow (invisible on an opaque white fill,
 * still doing work on the dark one).
 */
export const GLASS_CLASSES = [
  "bg-white border border-border rounded-2xl backdrop-blur-sm",
  "shadow-[0_2px_16px_2px_rgba(0,0,0,0.05),inset_0_1px_0_0_rgba(255,255,255,0.6)]",
  "dark:bg-white/[0.055] dark:border-white/[0.03]",
  "dark:shadow-[0_2px_24px_2px_rgba(0,0,0,0.12),inset_0_1px_0_0_color-mix(in_srgb,var(--sidebar)_5%,transparent)]",
] as const;

const cardVariants = cva("flex flex-col gap-6 py-6 text-card-foreground", {
  variants: {
    variant: {
      default: GLASS_CLASSES,
      solid: "bg-card rounded-xl border",
      glass: GLASS_CLASSES,
      // Dashboard cards have a consistent inner rhythm — gap between
      // sections + outer vertical padding — that other Card consumers
      // (metric-card, queue cards, comms cards, etc.) don't want.
      // Opt in with variant="dashboard"; everything else stays unaffected.
      dashboard: [...GLASS_CLASSES, "gap-6 py-6"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {
  selectable?: "standard" | "ai";
  selected?: boolean;
}

function Card({
  className,
  variant,
  selectable,
  selected = false,
  children,
  ...props
}: CardProps) {
  if (selectable) {
    const isAi = selectable === "ai";

    return (
      <div
        className="relative group/card h-full"
        data-slot="card"
        data-variant={variant}
        data-selectable={selectable}
      >
        {/* Selected glow: gradient for ai, primary for standard */}
        {isAi ? (
          <div
            className={cn(
              "absolute inset-0 rounded-2xl pointer-events-none blur-xl",
              "transition-opacity duration-150",
              selected ? "opacity-100" : "opacity-0",
            )}
            style={{ background: "var(--ai-gradient)" }}
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 rounded-2xl pointer-events-none blur-xl bg-primary-400/15 dark:bg-primary-400/30",
              "transition-opacity duration-150",
              selected ? "opacity-100" : "opacity-0",
            )}
          />
        )}

        {/* Hover glow: always primary */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl pointer-events-none blur-xl bg-primary-400/15 dark:bg-primary-400/50",
            "opacity-0 transition-opacity duration-150",
            !selected && "group-hover/card:opacity-100",
          )}
        />

        <button
          // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- intentionally spreading div-typed props onto a button for API simplicity; div and button props are not fully equivalent (e.g. ref, disabled), but Card currently shares a single props type for both render modes
          {...(props as React.ComponentProps<"button">)}
          type="button"
          aria-pressed={selected}
          className={cn(
            "relative w-full h-full flex flex-col text-left p-5 text-card-foreground",
            GLASS_CLASSES,
            "transition-all duration-150 cursor-pointer",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
            selected
              ? "border-primary dark:border-primary bg-card dark:bg-card"
              : "hover:bg-card dark:hover:bg-card",
            className,
          )}
        >
          {children}
        </button>
      </div>
    );
  }

  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};

export type { CardProps };
