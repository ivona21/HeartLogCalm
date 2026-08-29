import { type Dispatch, type ReactNode, type SetStateAction, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2Icon, Loader2Icon, RotateCcwIcon } from 'lucide-react';
import { z } from 'zod';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Form } from '@/components/ui/form.tsx';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';
import { AlreadyHaveAccountLink } from '@/features/auth/components/AlreadyHaveAccountLink.tsx';
import { CheckYourInboxSection } from '@/features/auth/components/CheckYourInboxSection.tsx';
import { FormInputField } from '@/components/form/FormInputField.tsx';
import { applyApiValidationErrors } from '@/shared/forms/apply-api-validation-errors.ts';
import { normalizeApiError } from '@/shared/api/api-errors.ts';

type ConfirmationStatus = 'success' | 'expired' | 'invalid';

type ConfirmationPageActions = {
  goToLogin: () => void;
  goToRegister: () => void;
};

type ConfirmationPageContext = ConfirmationPageActions & {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  showInboxSection: boolean;
  setShowInboxSection: Dispatch<SetStateAction<boolean>>;
};

type ConfirmationStatusContent = {
  intro: (context: ConfirmationPageContext) => ReactNode;
  panel?: (context: ConfirmationPageContext) => ReactNode;
  footer: (context: ConfirmationPageContext) => ReactNode;
};

const confirmationEmailSchema = z.string().trim().email('Please enter a valid email address.');
const confirmationEmailFormSchema = z.object({
  email: confirmationEmailSchema,
});

type ConfirmationEmailFormInput = z.infer<typeof confirmationEmailFormSchema>;

type ExpiredConfirmationResendPanelProps = {
  initialEmail: string;
  onSuccess: (email: string) => void;
};

function ExpiredConfirmationResendPanel({
  initialEmail,
  onSuccess,
}: ExpiredConfirmationResendPanelProps) {
  const form = useForm<ConfirmationEmailFormInput>({
    resolver: zodResolver(confirmationEmailFormSchema),
    defaultValues: {
      email: initialEmail,
    },
  });

  const resendMutation = useMutation({
    mutationFn: async (targetEmail: string) => resendConfirmationApi(targetEmail),
    onSuccess: (_data, targetEmail) => {
      form.reset({ email: targetEmail });
      onSuccess(targetEmail);
    },
    onError: (error: unknown) => {
      const handled = applyApiValidationErrors(error, form.setError, {
        fieldMap: {
          email: 'email',
        },
        fallbackField: 'email',
        fallbackMessage: 'Unable to resend the confirmation email.',
      });

      if (handled) {
        return;
      }

      const apiError = normalizeApiError(error);
      form.setError('email', {
        type: 'manual',
        message: apiError.message || 'Unable to resend the confirmation email.',
      });
    },
  });

  const handleSubmit = (data: ConfirmationEmailFormInput) => {
    resendMutation.mutate(data.email.trim());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 rounded-lg border border-border bg-muted/20 p-4"
      >
        <FormInputField
          control={form.control}
          name="email"
          label="Email address"
          renderInput={(field) => (
            <Input
              {...field}
              type="email"
              placeholder="Your email"
              disabled={resendMutation.isPending}
              className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
              data-testid="input-confirmation-email"
              onChange={(event) => {
                field.onChange(event);
                form.clearErrors('email');
              }}
            />
          )}
        />

        <Button
          type="submit"
          className="w-full font-medium"
          disabled={resendMutation.isPending}
          data-testid="button-confirmation-resend"
        >
          {resendMutation.isPending ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Sending confirmation email...
            </>
          ) : (
            <>
              <RotateCcwIcon className="h-4 w-4" />
              Resend confirmation email
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

const confirmationStatusContent: Record<ConfirmationStatus, ConfirmationStatusContent> = {
  success: {
    intro: () => (
      <div className="space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-foreground">Email confirmed!</h1>
          <div className="flex justify-center">
            <CheckCircle2Icon className="h-24 w-24 text-green-600" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-semibold text-foreground">
            Your account is now active.
            <br />
            <span className="text-base font-normal">
              You can now log in and start tracking your emotions.
            </span>
          </p>
        </div>
      </div>
    ),
    footer: ({ goToLogin }) => (
      <div className="flex flex-col gap-3">
        <Button
          type="button"
          className="w-full hover:to-primary text-primary-foreground font-medium transition-all duration-200"
          onClick={goToLogin}
        >
          Log In
        </Button>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          You&apos;ll use the same email address and password
          <br />
          you chose during registration.
        </p>
      </div>
    ),
  },
  expired: {
    intro: () => (
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Confirmation link expired</h1>
        <Alert className="border-border bg-muted/30">
          <AlertDescription className="text-muted-foreground">
            That link is no longer valid. Enter your email below and we will send a fresh
            confirmation email.
          </AlertDescription>
        </Alert>
      </div>
    ),
    panel: ({ email, showInboxSection, setEmail, setShowInboxSection }) =>
      showInboxSection ? (
        <CheckYourInboxSection mode="email-confirmation" email={email} />
      ) : (
        <ExpiredConfirmationResendPanel
          initialEmail={email}
          onSuccess={(targetEmail) => {
            setEmail(targetEmail);
            setShowInboxSection(true);
          }}
        />
      ),
    footer: () => (
      <div className="flex flex-col gap-3">
        <AlreadyHaveAccountLink className="mt-4 text-center" />
      </div>
    ),
  },
  invalid: {
    intro: () => (
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Invalid confirmation link</h1>
        <Alert className="bg-destructive/10 border-destructive/30">
          <AlertDescription className="text-destructive">
            We could not verify that confirmation link. Go back to register and try again.
          </AlertDescription>
        </Alert>
      </div>
    ),
    footer: ({ goToRegister }) => (
      <div className="flex flex-col gap-3">
        <Button
          type="button"
          className="w-full hover:to-primary text-primary-foreground font-medium transition-all duration-200"
          onClick={goToRegister}
        >
          Go to Register
        </Button>
        <AlreadyHaveAccountLink className="mt-4 text-center" />
      </div>
    ),
  },
};

function isConfirmationStatus(value: string | null): value is ConfirmationStatus {
  return value === 'success' || value === 'expired' || value === 'invalid';
}

export default function EmailConfirmationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const status: ConfirmationStatus = isConfirmationStatus(statusParam) ? statusParam : 'invalid';
  const [email, setEmail] = useState('');
  const [showInboxSection, setShowInboxSection] = useState(false);

  const content = confirmationStatusContent[status];

  const actions: ConfirmationPageActions = {
    goToLogin: () => navigate('/login'),
    goToRegister: () => navigate('/register'),
  };
  const context: ConfirmationPageContext = {
    ...actions,
    email,
    setEmail,
    showInboxSection,
    setShowInboxSection,
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {content.intro(context)}
        {content.panel?.(context)}
        {content.footer(context)}
      </div>
    </AuthLayout>
  );
}
