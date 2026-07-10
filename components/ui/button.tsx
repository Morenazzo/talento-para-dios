import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado-claro focus-visible:ring-offset-2 focus-visible:ring-offset-noche disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // CTA principal: dorado brillante sobre fondo oscuro (contraste AA)
        dorado:
          "bg-dorado text-noche shadow-[0_0_24px_rgba(212,175,55,0.35)] hover:bg-dorado-claro hover:shadow-[0_0_36px_rgba(245,216,122,0.45)]",
        // CTA secundario, más discreto
        contorno:
          "border border-dorado/50 bg-transparent text-dorado-claro hover:border-dorado hover:bg-dorado/10",
        fantasma: "text-marfil-suave hover:text-marfil hover:bg-white/5",
      },
      size: {
        default: "h-11 px-6",
        lg: "h-14 px-8 py-3.5 text-base",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "dorado",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
