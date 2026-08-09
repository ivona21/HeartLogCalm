import * as React from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';
import { cn } from '@/shared/utils/cn';

const linkClass =
  'text-link hover:text-link-hover active:text-link-active underline-offset-4 hover:underline transition-colors duration-150';

export type AppLinkProps = RouterLinkProps & {
  className?: string;
};

export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ className, ...props }, ref) => {
    return <RouterLink ref={ref} className={cn(linkClass, className)} {...props} />;
  },
);

AppLink.displayName = 'AppLink';
