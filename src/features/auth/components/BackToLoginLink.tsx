import { AppLink } from '@/components/ui/app-link.tsx';

interface BackToLoginLinkProps {
  className?: string;
  linkClassName?: string;
  testId?: string;
  onClick?: () => void;
}

export function BackToLoginLink({
  className,
  linkClassName,
  testId = 'link-back-to-login',
  onClick,
}: BackToLoginLinkProps) {
  return (
    <div className={className}>
      <p className="text-sm text-muted-foreground">
        <AppLink
          to="/login"
          className={linkClassName ?? 'font-medium'}
          data-testid={testId}
          onClick={onClick}
        >
          Back to Login
        </AppLink>
      </p>
    </div>
  );
}
