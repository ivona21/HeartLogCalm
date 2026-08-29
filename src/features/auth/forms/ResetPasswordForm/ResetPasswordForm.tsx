import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';
import { Button } from '@/components/ui/button.tsx';
import { PasswordInput } from '@/components/ui/password-input.tsx';
import { Form } from '@/components/ui/form.tsx';
import { FormInputField } from '@/components/form/FormInputField.tsx';
import { resetPasswordApi } from '@/features/auth/api/reset-password.api.ts';
import { applyApiValidationErrors } from '@/shared/forms/apply-api-validation-errors.ts';
import { normalizeApiError } from '@/shared/api/api-errors.ts';
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from '@/features/auth/forms/ResetPasswordForm/schema.ts';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
}

export function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const resetMutation = useMutation({
    mutationFn: async (password: string) => resetPasswordApi(password),
    onSuccess: () => {
      setFormError(null);
      setSuccessMessage('Your password has been updated.');
      setIsComplete(true);
      onSuccess?.();
    },
    onError: (error: unknown) => {
      setSuccessMessage(null);

      if (
        applyApiValidationErrors(error, form.setError, {
          fieldMap: {
            password: 'password',
            confirmPassword: 'confirmPassword',
          },
        })
      ) {
        setFormError(null);
        return;
      }

      const apiError = normalizeApiError(error);
      setFormError(apiError.message || 'Unable to update your password.');
    },
  });

  const handleSubmit = (data: ResetPasswordInput) => {
    setFormError(null);
    setSuccessMessage(null);
    resetMutation.mutate(data.password);
  };

  if (isComplete) {
    return (
      <Alert className="border-border bg-muted/30">
        <CheckCircle2Icon className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-muted-foreground">{successMessage}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormInputField
          control={form.control}
          name="password"
          label="New password"
          renderInput={(field) => (
            <PasswordInput
              {...field}
              placeholder="Create a new password"
              disabled={resetMutation.isPending}
              className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
              data-testid="input-new-password"
            />
          )}
        />

        <FormInputField
          control={form.control}
          name="confirmPassword"
          label="Confirm password"
          renderInput={(field) => (
            <PasswordInput
              {...field}
              placeholder="Confirm your new password"
              disabled={resetMutation.isPending}
              className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
              data-testid="input-confirm-new-password"
            />
          )}
        />

        {formError && (
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
            <AlertCircleIcon className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">{formError}</AlertDescription>
          </Alert>
        )}

        <div className="pt-3">
          <Button
            type="submit"
            className="w-full font-medium"
            disabled={resetMutation.isPending}
            data-testid="button-reset-password-submit"
          >
            {resetMutation.isPending ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Updating password...
              </>
            ) : (
              'Update password'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
