import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex justify-center items-center rounded-lg text-base font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "absolute bg-bt-default text-white hover:bg-dfbt-hover disabled:bg-dfbt-disabled bottom-0",
        destructive:
          "bg-bt-cancel text-white hover:bg-ccbt-hover disabled:bg-ccbt-disabled",
        naver: "justify-center items-center gap-4 bg-[#03c75a] text-white ",
        kakao:
          "flex justify-center items-center gap-4 bg-[#fee500] text-black85 ",
        apple: "flex justify-center items-center bg-[#000000] ",
        link: "text-slate-900 underline-offset-4 hover:underline ",
      },
      size: {
        default: "h-14 w-full",
        sm: "h-14 w-full bg-white bg-[#eeefff] border",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
