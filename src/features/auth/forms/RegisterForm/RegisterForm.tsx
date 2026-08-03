import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { PasswordInput } from '@/components/ui/PasswordInput.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { AlertCircleIcon, Loader2Icon, MailIcon } from 'lucide-react';
import { RegisterInput, registerSchema } from '@/features/auth/forms/RegisterForm/schema.ts';
import { ApiError } from '@/shared/types/api-types.ts';
import { Logo } from '@/components/Logo.tsx';
import { AppLink } from '@/components/ui/AppLink.tsx';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';

export function RegisterForm() {
  const { register, isRegistering, registerError } = useAuth();
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const resendMutation = useMutation({
    mutationFn: async (email: string) => resendConfirmationApi(email),
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      setResendError(apiError.message || 'Unable to resend the confirmation email.');
    },
  });

  const handleRegisterSuccess = (email: string) => {
    setConfirmationEmail(email);
    setResendError(null);
    form.reset({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleResendConfirmation = () => {
    if (!confirmationEmail || resendMutation.isPending) {
      return;
    }

    setResendError(null);
    resendMutation.mutate(confirmationEmail);
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
        <div className="space-y-4 text-center">
          <div className="flex flex-col items-center space-y-3">
            <MailIcon className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Check your inbox</h3>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a confirmation email to {confirmationEmail}
              <br />
              Open it and click the confirmation link to finish creating your account.
            </p>
          </div>

          <div className="h-3" />

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              No email yet? Wait a minute or check your spam folder.
            </p>

            <Button
              type="button"
              variant="ghost"
              className="h-auto min-h-0 px-0 py-0 text-sm font-medium text-accent-foreground underline underline-offset-4 hover:bg-transparent hover:text-primary"
              disabled={resendMutation.isPending}
              onClick={handleResendConfirmation}
              data-testid="button-resend-confirmation"
            >
              {resendMutation.isPending ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send me an email again.'
              )}
            </Button>

            {resendError && <p className="text-sm text-destructive">{resendError}</p>}
          </div>

          <div className="pt-4 text-center">
            <AppLink to="/login" data-testid="link-login" className="text-sm font-medium">
              I already have an account
            </AppLink>
          </div>
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Your email"
                        disabled={isRegistering}
                        className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-foreground">Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Create a secure password"
                        disabled={isRegistering}
                        className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Confirm your password"
                        disabled={isRegistering}
                        className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                        data-testid="input-confirm-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {registerError && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
                  <p className="m-0 text-xs leading-relaxed">
                    {(registerError as ApiError).message || 'Registration failed. Please try again.'}
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
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <AppLink to="/login" data-testid="link-login" className="font-medium">
                Log in
              </AppLink>
            </p>
          </div>
        </>
      )}
    </>
  );
}
