import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils/cn.ts';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border border-primary-border hover:bg-primary-hover active:bg-primary-active',

        destructive:
          'bg-destructive text-destructive-foreground border border-destructive-border hover:bg-destructive-hover active:bg-destructive-active',

        outline:
          'border [border-color:var(--button-outline)] bg-transparent text-foreground shadow-xs active:shadow-none hover:bg-accent hover:text-accent-foreground active:bg-accent-active',

        secondary:
          'bg-secondary text-secondary-foreground border border-secondary-border hover:bg-accent hover:text-accent-foreground active:bg-accent-active',

        ghost:
          'border border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent-active',
      },

      size: {
        default: 'min-h-9 px-4 py-2',
        sm: 'min-h-8 rounded-md px-3 text-xs',
        lg: 'min-h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
