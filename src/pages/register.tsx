import { AuthLayout } from '@/components/layout/AuthLayout';
import { RegisterForm } from '@/features/auth/forms/RegisterForm/RegisterForm.tsx';
import { AppLink } from '@/components/ui/AppLink.tsx';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <AppLink to="/login" data-testid="link-login" className="font-medium">
            Log in
          </AppLink>
        </p>
      </div>
    </AuthLayout>
  );
}
