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
import { AlertCircleIcon, Loader2Icon } from 'lucide-react';
import { RegisterInput, registerSchema } from '@/features/auth/forms/RegisterForm/schema.ts';
import { ApiError } from '@/shared/types/api-types.ts';
import { Logo } from '@/components/Logo.tsx';
import { AppLink } from '@/components/ui/AppLink.tsx';

export function RegisterForm() {
  const { register, isRegistering, registerError } = useAuth();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterInput) => {
    register(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Create Your Account</h2>
            <p className="text-sm text-muted-foreground">
              Your private space for emotions and reflection
            </p>
          </div>
          <div className="flex justify-center mb-6">
            <Logo variant="complexFull" className="h-40" />
          </div>
          {registerError && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
              <AlertCircleIcon className="h-4 w-4 text-destructive" />
              <p className="m-0 text-xs leading-relaxed">
                {(registerError as ApiError).message || 'Registration failed. Please try again.'}
              </p>
            </div>
          )}

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
                <FormMessage className="text-destructive !text-xs" />
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
                <FormMessage className="text-destructive !text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm font-medium text-foreground">Confirm password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Confirm your password"
                    disabled={isRegistering}
                    className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                    data-testid="input-confirm-password"
                  />
                </FormControl>
                <FormMessage className="text-destructive !text-xs" />
              </FormItem>
            )}
          />

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
  );
}
