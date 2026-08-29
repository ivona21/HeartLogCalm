import type { ReactNode } from 'react';

export type CheckYourInboxMode = 'email-confirmation' | 'password-reset';

export type CheckYourInboxContent = {
  description: (email: string) => ReactNode;
  resendSuccessMessage: string;
  resendErrorMessage: string;
};

export const CHECK_YOUR_INBOX_CONTENT: Record<CheckYourInboxMode, CheckYourInboxContent> = {
  'email-confirmation': {
    description: (email: string) => (
      <>
        We&apos;ve sent a confirmation email to <span className="font-semibold">{email}</span>
        <br />
        Open it and click the confirmation link to finish creating your account.
      </>
    ),
    resendSuccessMessage: 'A new confirmation email has been sent to your inbox.',
    resendErrorMessage: 'Unable to resend the confirmation email.',
  },
  'password-reset': {
    description: (email: string) => (
      <>
        If an account exists for <span className="font-semibold">{email}</span>, a password reset
        link is on its way.
        <br />
        Open it to change your password safely.
      </>
    ),
    resendSuccessMessage: 'A new reset link has been sent to your inbox.',
    resendErrorMessage: 'Unable to resend the reset link.',
  },
};
