import { AppLink } from '@/components/ui/app-link.tsx';

interface AlreadyHaveAccountLinkProps {
  className?: string;
  linkClassName?: string;
  testId?: string;
  showDivider?: boolean;
}

export function AlreadyHaveAccountLink({
  className,
  linkClassName,
  testId = 'link-login',
  showDivider = true,
}: AlreadyHaveAccountLinkProps) {
  return (
    <div className={className}>
      {showDivider && <hr className="mb-4 border-border" />}
      <p className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <AppLink to="/login" data-testid={testId} className={linkClassName ?? 'font-medium'}>
          Log in
        </AppLink>
      </p>
    </div>
  );
}
