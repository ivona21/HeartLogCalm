import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AlertCircleIcon, Loader2Icon, RotateCcwIcon } from 'lucide-react';
import { Form } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { FormInputField } from '@/components/form/FormInputField.tsx';
import { forgotPasswordApi } from '@/features/auth/api/forgot-password.api.ts';
import { applyApiValidationErrors } from '@/shared/forms/apply-api-validation-errors.ts';
import { normalizeApiError } from '@/shared/api/api-errors.ts';
import { GENERIC_RESET_EMAIL_MESSAGE } from '@/features/auth/utils/reset-password.ts';
import {
  resetPasswordRequestSchema,
  type ResetPasswordRequestInput,
} from '@/features/auth/forms/ResetPasswordRequestForm/schema.ts';
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';

interface ResetPasswordRequestFormProps {
  className?: string;
}

export function ResetPasswordRequestForm({ className }: ResetPasswordRequestFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ResetPasswordRequestInput>({
    resolver: zodResolver(resetPasswordRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  const resendMutation = useMutation({
    mutationFn: async (email: string) => forgotPasswordApi(email),
    onSuccess: () => {
      setFormError(null);
      setSuccessMessage(GENERIC_RESET_EMAIL_MESSAGE);
    },
    onError: (error: unknown) => {
      setSuccessMessage(null);

      if (
        applyApiValidationErrors(error, form.setError, {
          fieldMap: {
            email: 'email',
          },
          fallbackField: 'email',
          fallbackMessage: 'Unable to send the reset link.',
        })
      ) {
        setFormError(null);
        return;
      }

      const apiError = normalizeApiError(error);
      setFormError(apiError.message || 'Unable to send the reset link.');
    },
  });

  const handleSubmit = (data: ResetPasswordRequestInput) => {
    setFormError(null);
    setSuccessMessage(null);
    resendMutation.mutate(data.email.trim());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={className ?? 'space-y-4 rounded-lg border border-border bg-muted/20 p-4'}
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
              data-testid="input-reset-email"
              onChange={(event) => {
                field.onChange(event);
                setFormError(null);
                setSuccessMessage(null);
                form.clearErrors('email');
              }}
            />
          )}
        />

        {formError && (
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
            <AlertCircleIcon className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">{formError}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="border-border bg-muted/30">
            <AlertDescription className="text-muted-foreground">{successMessage}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full font-medium"
          disabled={resendMutation.isPending}
          data-testid="button-reset-email-send"
        >
          {resendMutation.isPending ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Sending reset link...
            </>
          ) : (
            <>
              <RotateCcwIcon className="h-4 w-4" />
              Send reset link
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
