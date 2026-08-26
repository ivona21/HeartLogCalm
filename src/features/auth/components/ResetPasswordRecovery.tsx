import { KeyRoundIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { AppLink } from '@/components/ui/app-link.tsx';
import { ResetPasswordForm } from '@/features/auth/forms/ResetPasswordForm/ResetPasswordForm.tsx';
import { ResetPasswordRequestForm } from '@/features/auth/forms/ResetPasswordRequestForm/ResetPasswordRequestForm.tsx';
import {
  getResetPasswordMessage,
  getResetPasswordTitle,
  type ResetPasswordStatus,
} from '@/features/auth/utils/reset-password.ts';

interface ResetPasswordRecoveryProps {
  status: ResetPasswordStatus | 'missing';
}

export function ResetPasswordRecovery({ status }: ResetPasswordRecoveryProps) {
  const title = getResetPasswordTitle(status);
  const message = getResetPasswordMessage(status);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Badge variant="outline" className="w-fit">
          Account recovery
        </Badge>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md border border-card-border bg-muted/40">
            <KeyRoundIcon className="h-5 w-5 text-foreground" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
      </div>

      {status === 'ready' ? <ResetPasswordForm /> : <ResetPasswordRequestForm />}

      <p className="text-center text-sm text-muted-foreground">
        <AppLink to="/login" className="font-medium" data-testid="link-reset-back-to-login">
          Back to login
        </AppLink>
      </p>
    </div>
  );
}
