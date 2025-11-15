import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Link } from "wouter";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:text-[#8FA888] font-medium transition-colors duration-150" data-testid="link-register">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
