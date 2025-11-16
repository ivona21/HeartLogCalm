import { AuthLayout } from "@/components/layout/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Link } from "wouter";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-[#8FA888] font-medium transition-colors duration-150" data-testid="link-login">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
