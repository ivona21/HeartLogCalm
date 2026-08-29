import { AppLink } from '@/components/ui/app-link.tsx';

interface AlreadyHaveAccountLinkProps {
  className?: string;
  linkClassName?: string;
  testId?: string;
  showDivider?: boolean;
  prefixText?: string;
  linkText?: string;
}

export function AlreadyHaveAccountLink({
  className,
  linkClassName,
  testId = 'link-login',
  showDivider = true,
  prefixText = 'Already have an account?',
  linkText = 'Log in',
}: AlreadyHaveAccountLinkProps) {
  return (
    <div className={className}>
      {showDivider && <hr className="mb-4 border-border" />}
      <p className="text-sm text-muted-foreground">
        {prefixText}{' '}
        <AppLink to="/login" data-testid={testId} className={linkClassName ?? 'font-medium'}>
          {linkText}
        </AppLink>
      </p>
    </div>
  );
}
