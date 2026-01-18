import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { cn } from '@/shared/utils/cn.ts';

export interface PasswordInputProps extends React.ComponentProps<typeof Input> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full w-9 hover:bg-transparent no-default-hover-elevate no-default-active-elevate focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.disabled}
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          ) : (
            <EyeIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          )}
          <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
