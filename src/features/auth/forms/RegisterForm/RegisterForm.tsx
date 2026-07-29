import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
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
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon, RotateCcwIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert.tsx';
import { RegisterInput, registerSchema } from '@/features/auth/forms/RegisterForm/schema.ts';
import { ApiError } from '@/shared/types/api-types.ts';
import { Logo } from '@/components/Logo.tsx';
import { AppLink } from '@/components/ui/AppLink.tsx';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';

export function RegisterForm() {
  const { register, isRegistering, registerError, registerSuccessEmail } = useAuth();
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);

  const resendMutation = useMutation({
    mutationFn: async (email: string) => resendConfirmationApi(email),
    onSuccess: (_data, email) => {
      setResendError(null);
      setResendMessage(`We sent another confirmation email to ${email}.`);
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      setResendMessage(null);
      setResendError(apiError.message || 'Unable to resend the confirmation email.');
    },
  });

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (registerSuccessEmail) {
    const handleResendConfirmation = () => {
      setResendError(null);
      setResendMessage(null);
      resendMutation.mutate(registerSuccessEmail);
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Create Your Oasis</h2>
          <p className="text-sm text-muted-foreground">Start your emotional wellness journey</p>
        </div>
        <div className="flex justify-center mb-8">
          <Logo variant="complexFull" className="h-40" />
        </div>
        <Alert className="border-primary/30 bg-primary/10">
          <CheckCircle2Icon className="h-4 w-4 text-primary" />
          <AlertTitle className="text-foreground">Check your inbox</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            We created your account and sent a confirmation email to{' '}
            <span className="font-medium text-foreground">{registerSuccessEmail}</span>. Confirm
            your email before logging in.
          </AlertDescription>
        </Alert>
        <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
          {resendError && <p className="text-sm text-destructive">{resendError}</p>}

          {resendMessage && <p className="text-sm text-primary">{resendMessage}</p>}

          <Button
            type="button"
            variant="secondary"
            className="w-full font-medium"
            disabled={resendMutation.isPending}
            onClick={handleResendConfirmation}
            data-testid="button-register-resend-confirmation"
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
        </div>
        <Button asChild className="w-full text-primary-foreground font-medium">
          <AppLink to="/login">Go to login</AppLink>
        </Button>
      </div>
    );
  }

  const onSubmit = (data: RegisterInput) => {
    register(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Create Your Oasis</h2>
          <p className="text-sm text-muted-foreground">Start your emotional wellness journey</p>
        </div>
        <div className="flex justify-center mb-8">
          <Logo variant="complexFull" className="h-40" />
        </div>
        {registerError && (
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
            <AlertCircleIcon className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              {(registerError as ApiError).message || 'Registration failed. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
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
              <FormMessage className="text-destructive text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
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
              <FormMessage className="text-destructive text-sm" />
            </FormItem>
          )}
        />

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
      </form>
    </Form>
  );
}
