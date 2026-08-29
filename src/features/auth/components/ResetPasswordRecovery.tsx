import { useEffect, useState } from 'react';
import { AuthBrandHeader } from '@/features/auth/components/AuthBrandHeader.tsx';
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
  const [isPasswordResetComplete, setIsPasswordResetComplete] = useState(false);
  const title = getResetPasswordTitle(status);
  const message = getResetPasswordMessage(status);

  useEffect(() => {
    setRequestedEmail(null);
    setIsPasswordResetComplete(false);
  }, [status]);

  return (
    <div className="space-y-6">
      <AuthBrandHeader />

      {status !== 'ready' && !requestedEmail && (
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      )}

      {status === 'ready' ? (
        <div className="space-y-6">
          {!isPasswordResetComplete && (
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-foreground">Enter your new password</h1>
            </div>
          )}
          <ResetPasswordForm onSuccess={() => setIsPasswordResetComplete(true)} />
        </div>
      ) : requestedEmail ? (
        <CheckYourInboxSection mode="password-reset" email={requestedEmail} />
      ) : (
        <ResetPasswordRequestForm onSuccess={setRequestedEmail} />
      )}

      <BackToLoginLink className="text-center" />
    </div>
  );
}
