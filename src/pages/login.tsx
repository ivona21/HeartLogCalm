import { AuthLayout } from '@/components/layout/AuthLayout';
import { LoginForm } from '@/features/auth/forms/LoginForm/LoginForm.tsx';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
