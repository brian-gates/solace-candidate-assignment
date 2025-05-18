import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { getDeterministicColor } from "@/lib/get-deterministic-color";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        deterministic: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  const colorClass =
    variant === "deterministic" && children
      ? getDeterministicColor(React.Children.toArray(children).join(""))
      : undefined;
  return (
    <div
      className={cn(badgeVariants({ variant }), colorClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
