import { useEffect, useState } from 'react';
import { CheckYourInboxSection } from '@/features/auth/components/CheckYourInboxSection.tsx';
import { BackToLoginLink } from '@/features/auth/components/BackToLoginLink.tsx';
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
  const [requestedEmail, setRequestedEmail] = useState<string | null>(null);
  const title = getResetPasswordTitle(status);
  const message = getResetPasswordMessage(status);

  useEffect(() => {
    setRequestedEmail(null);
  }, [status]);

  return (
    <div className="space-y-6">
      {status !== 'ready' && !requestedEmail && (
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      )}

      {status === 'ready' ? (
        <div className="space-y-6">
          <ResetPasswordForm />
          <BackToLoginLink className="text-center" />
        </div>
      ) : requestedEmail ? (
        <CheckYourInboxSection mode="password-reset" email={requestedEmail} />
      ) : (
        <ResetPasswordRequestForm onSuccess={setRequestedEmail} />
      )}
    </div>
  );
}
