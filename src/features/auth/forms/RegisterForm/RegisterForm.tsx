import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button.tsx';
import { Form } from '@/components/ui/Form.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { PasswordInput } from '@/components/ui/PasswordInput.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { Loader2Icon } from 'lucide-react';
import { RegisterInput, registerSchema } from '@/features/auth/forms/RegisterForm/schema.ts';
import { ApiError } from '@/shared/types/api-types.ts';
import { Logo } from '@/components/Logo.tsx';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';
import { AlreadyHaveAccountLink } from '@/features/auth/components/AlreadyHaveAccountLink.tsx';
import { CheckYourInboxSection } from '@/features/auth/components/CheckYourInboxSection.tsx';
import { FormInputField } from '@/components/form/FormInputField.tsx';

export function RegisterForm() {
  const { register, isRegistering, registerError } = useAuth();
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegisterSuccess = (email: string) => {
    setConfirmationEmail(email);
    form.reset({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleResendConfirmation = async () => {
    if (!confirmationEmail) {
      return;
    }

    await resendConfirmationApi(confirmationEmail);
  };

  const onSubmit = (data: RegisterInput) => {
    register(data, {
      onSuccess: () => handleRegisterSuccess(data.email),
    });
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Create Your Account</h2>
        <p className="text-sm text-muted-foreground">
          Your private space for emotions and reflection
        </p>
      </div>
      <div className="flex justify-center mb-6">
        <Logo variant="complexFull" className="h-40" />
      </div>

      {confirmationEmail ? (
        <CheckYourInboxSection
          email={confirmationEmail}
          onResend={handleResendConfirmation}
          className="text-center"
        />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormInputField
                control={form.control}
                name="email"
                label="Email"
                renderInput={(field) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Your email"
                    disabled={isRegistering}
                    className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                    data-testid="input-email"
                  />
                )}
              />

              <FormInputField
                control={form.control}
                name="password"
                label="Password"
                renderInput={(field) => (
                  <PasswordInput
                    {...field}
                    placeholder="Create a secure password"
                    disabled={isRegistering}
                    className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                    data-testid="input-password"
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
                    placeholder="Confirm your password"
                    disabled={isRegistering}
                    className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                    data-testid="input-confirm-password"
                  />
                )}
              />

              {registerError && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
                  <p className="m-0 text-xs leading-relaxed">
                    {(registerError as ApiError).message ||
                      'Registration failed. Please try again.'}
                  </p>
                </div>
              )}

              <div className="pt-3">
                <Button
                  type="submit"
                  className="w-full text-primary-foreground font-medium transition-all duration-200"
                  disabled={isRegistering}
                  data-testid="button-submit"
                >
                  {isRegistering ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Creating your account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <AlreadyHaveAccountLink className="mt-4 text-center" />
        </>
      )}
    </>
  );
}
