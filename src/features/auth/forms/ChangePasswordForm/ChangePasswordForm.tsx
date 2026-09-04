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
import { applyApiValidationErrors } from '@/shared/forms/apply-api-validation-errors.ts';
import { normalizeApiError } from '@/shared/api/api-errors.ts';
import { ApiErrorCode } from '@/shared/api/heartlog.generated.ts';
import { changePasswordApi } from '@/features/auth/api/change-password.api.ts';
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from '@/features/auth/forms/ChangePasswordForm/schema.ts';

export function ChangePasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: ChangePasswordInput) => changePasswordApi(data),
    onSuccess: () => {
      setFormError(null);
      setSuccessMessage('Password changed successfully');
      setIsComplete(true);
      form.reset({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    },
    onError: (error: unknown) => {
      setSuccessMessage(null);

      if (
        applyApiValidationErrors(error, form.setError, {
          fieldMap: {
            currentPassword: 'currentPassword',
            newPassword: 'newPassword',
            confirmNewPassword: 'confirmNewPassword',
          },
        })
      ) {
        setFormError(null);
        return;
      }

      const apiError = normalizeApiError(error);

      if (apiError.status === 401 || apiError.code === ApiErrorCode.invalidCredentials) {
        form.setError('currentPassword', {
          type: 'manual',
          message: apiError.message || 'Current password is incorrect.',
        });
        setFormError(null);
        return;
      }

      setFormError(apiError.message || 'Unable to change your password.');
    },
  });

  const handleSubmit = (data: ChangePasswordInput) => {
    setFormError(null);
    setSuccessMessage(null);
    changePasswordMutation.mutate(data);
  };

  if (isComplete) {
    return (
      <Alert variant="success" className="bg-success/10 border-success/30">
        <CheckCircle2Icon className="h-4 w-4 text-success" />
        <AlertDescription className="text-foreground">{successMessage}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormInputField
          control={form.control}
          name="currentPassword"
          label="Old password"
          renderInput={(field) => (
            <PasswordInput
              {...field}
              placeholder="Enter your current password"
              disabled={changePasswordMutation.isPending}
              className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
              data-testid="input-current-password"
              onChange={(event) => {
                field.onChange(event);
                setFormError(null);
                form.clearErrors('currentPassword');
              }}
            />
          )}
        />

        <FormInputField
          control={form.control}
          name="newPassword"
          label="New password"
          renderInput={(field) => (
            <PasswordInput
              {...field}
              placeholder="Create a new password"
              disabled={changePasswordMutation.isPending}
              className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
              data-testid="input-new-password"
              onChange={(event) => {
                field.onChange(event);
                setFormError(null);
                form.clearErrors(['newPassword', 'confirmNewPassword']);
              }}
            />
          )}
        />

        <FormInputField
          control={form.control}
          name="confirmNewPassword"
          label="Confirm new password"
          renderInput={(field) => (
            <PasswordInput
              {...field}
              placeholder="Repeat your new password"
              disabled={changePasswordMutation.isPending}
              className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
              data-testid="input-confirm-new-password"
              onChange={(event) => {
                field.onChange(event);
                setFormError(null);
                form.clearErrors('confirmNewPassword');
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

        <div className="pt-3">
          <Button
            type="submit"
            className="w-full font-medium"
            disabled={changePasswordMutation.isPending}
            data-testid="button-change-password-submit"
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Updating password...
              </>
            ) : (
              'Change password'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
