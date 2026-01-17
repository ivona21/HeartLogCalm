import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { PasswordInput } from "@/components/ui/password-input.tsx";
import { useAuth } from "../../hooks/useAuth.ts";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";
import type { ApiError } from "@/shared/api/types.ts";
import {LoginInput, loginSchema} from "@/features/auth/forms/LoginForm/schema.ts";

export function LoginForm() {
  const { login, isLoggingIn, loginError } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-muted-foreground">
            Continue your journey to calm
          </p>
        </div>

        {loginError && (
          <Alert variant="destructive" className="bg-[#E8A59C]/10 border-[#E8A59C]/30">
            <AlertCircleIcon className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-500">
              {(loginError as ApiError).message || "Login failed. Please check your credentials."}
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Your email"
                  disabled={isLoggingIn}
                  className="bg-white border-[#E8E6E3] focus-visible:ring-primary transition-all duration-200"
                  data-testid="input-email"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="Your password"
                  disabled={isLoggingIn}
                  className="bg-white border-[#E8E6E3] focus-visible:ring-primary transition-all duration-200"
                  data-testid="input-password"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
              <div className="text-right mt-2">
                <button
                  type="button"
                  className="text-sm text-accent-foreground hover:text-primary transition-colors duration-150"
                  data-testid="link-forgot-password"
                >
                  Forgot password?
                </button>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-[#8FA888] hover:from-[#8FA888] hover:to-primary text-primary-foreground font-medium transition-all duration-200"
          disabled={isLoggingIn}
          data-testid="button-submit"
        >
          {isLoggingIn ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Log In"
          )}
        </Button>
      </form>
    </Form>
  );
}
