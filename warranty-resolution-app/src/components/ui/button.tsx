import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        /**
         * THE FILLED PRIMARY BUTTON — `primary-800` IN LIGHT, `primary` IN DARK, and
         * the split is the whole point.
         *
         * Light was `bg-primary` (#009fb0) with white ink: **3.19:1**. The labels on
         * these buttons are 13-14px at 500-600 weight, which is NORMAL text under
         * WCAG 1.4.3 — large text starts at 18.66px bold — so the bar is 4.5:1, and
         * 3.19 misses it. `primary-800` (#007b92) measures **4.94:1** and is the
         * first rung of the ramp that clears it. `primary-700` does NOT: 3.65.
         * (A note in ../coverage/decision/SubmitBar.tsx guessed 700 would be enough;
         * it has been corrected.)
         *
         * **DARK IS EXPLICITLY HELD BACK, because dark was never broken.** There
         * `--primary` is a LIGHTER teal (`oklch(0.69 …)`) and `--primary-foreground`
         * is dark ink — the inverse pairing — which measures **7.17:1**, comfortably
         * past AAA. The ramp is declared identically in `.dark`, so a blanket
         * `bg-primary-800` would have put that dark ink on a mid teal and dropped
         * dark mode to **3.87**: a fix in one theme and a regression in the other.
         *
         * NOT A CHANGE TO `--primary` ITSELF. That token is also the selection ring,
         * the authority meter, the choicebox rim and the focus outline, none of which
         * have a text-contrast problem and all of which would have darkened with it.
         * The variant is precisely "a filled primary button", which is the thing that
         * failed.
         */
        default:
          "bg-primary-800 text-primary-foreground hover:bg-primary-900 dark:bg-primary dark:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        "destructive-outline":
          "border border-destructive bg-background text-destructive shadow-xs hover:bg-destructive hover:text-white focus-visible:ring-destructive/20 dark:bg-input/30 dark:hover:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        success:
          "bg-success text-white hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:bg-success/60",
        info: "bg-info text-white hover:bg-info/90 focus-visible:ring-info/20 dark:focus-visible:ring-info/40 dark:bg-info/60",
        warning:
          "bg-warning text-white hover:bg-warning/90 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40 dark:bg-warning/60",
        ai: "text-white hover:opacity-90 [background-image:var(--ai-gradient-fill)]",
        "ai-soft":
          "text-foreground hover:opacity-90 [background-image:var(--ai-gradient)]",
        "ai-outline":
          "border border-transparent text-insight-600 dark:text-insight-400 hover:opacity-90 [background-image:linear-gradient(var(--background),var(--background)),var(--ai-gradient-strong)] [background-origin:border-box] [background-clip:padding-box,border-box]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
