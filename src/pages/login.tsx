import { AuthLayout } from '@/components/layout/AuthLayout';
import { LoginForm } from '@/features/auth/forms/LoginForm/LoginForm.tsx';
import { AppLink } from '@/components/ui/AppLink.tsx';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <AppLink to="/register" className="font-medium" data-testid="link-register">
            Sign up
          </AppLink>
        </p>
      </div>
    </AuthLayout>
  );
}
