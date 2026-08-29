import { forgotPasswordApi } from '@/features/auth/api/forgot-password.api.ts';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';
import type { CheckYourInboxMode } from '@/features/auth/components/check-your-inbox-section.config.tsx';

export async function resendCheckYourInboxEmail(mode: CheckYourInboxMode, email: string) {
  if (mode === 'email-confirmation') {
    await resendConfirmationApi(email);
    return;
  }

  await forgotPasswordApi(email);
}
