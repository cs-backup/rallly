import { Slot } from "@radix-ui/react-slot";
import { SpinnerIcon } from "@rallly/icons";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "./lib/utils";

const buttonVariants = cva(
  "inline-flex border font-medium disabled:text-muted-foreground disabled:bg-gray-200 disabled:pointer-events-none select-none items-center justify-center gap-x-2 whitespace-nowrap rounded-md border",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-primary text-white shadow-sm hover:bg-primary-500 active:bg-primary-700",
        destructive:
          "bg-destructive text-destructive-foreground active:bg-destructive hover:bg-destructive/90",
        default:
          "rounded-md px-3.5 py-2.5 hover:shadow-sm active:shadow-none data-[state=open]:shadow-none data-[state=open]:bg-gray-100 active:bg-gray-100 hover:bg-white/50 bg-gray-50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "border-transparent hover:bg-gray-200/50 active:bg-gray-200",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-9 px-2.5 text-sm",
        sm: "h-7 text-sm px-1 rounded-md",
        lg: "h-11 text-base px-4 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      icon: Icon,
      loading,
      children,
      variant,
      type = "button",
      size,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          "pointer-events-none": loading,
        })}
        ref={ref}
        type={type}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading ? (
              <SpinnerIcon className="inline-block h-4 w-4 animate-spin" />
            ) : Icon ? (
              <Icon className="h-4 w-4" />
            ) : null}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
