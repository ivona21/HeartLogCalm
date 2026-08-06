import { AuthLayout } from '@/components/layout/AuthLayout';
import { RegisterForm } from '@/features/auth/forms/RegisterForm/RegisterForm.tsx';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
