import { useMutation } from '@tanstack/react-query';
import { CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';
import { getPendingConfirmationEmail } from '@/features/auth/utils/pending-confirmation-email.ts';

export default function EmailSentPage() {
  const confirmationEmail = getPendingConfirmationEmail();

  const resendMutation = useMutation({
    mutationFn: async (email: string) => resendConfirmationApi(email),
  });

  const handleResend = () => {
    if (!confirmationEmail || resendMutation.isPending) {
      return;
    }

    resendMutation.mutate(confirmationEmail);
  };

  if (resendMutation.isPending) {
    return (
      <AuthLayout>
        <div className="flex min-h-[32rem] items-center justify-center">
          <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex min-h-[32rem] flex-col">
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold text-foreground">Email sent</h2>
          <div className="flex justify-center">
            <CheckCircle2Icon className="h-40 w-40 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground">
            Confirm your email so that you can login to the app.
          </p>
        </div>

        <div className="mt-auto pt-10 text-center">
          <p className="text-sm text-muted-foreground">
            No email yet? Wait a minute or{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={!confirmationEmail}
              className="text-sm text-accent-foreground hover:text-primary transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50"
              data-testid="button-email-sent-resend"
            >
              try again
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
