import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/useAuth";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ApiError } from "@/types";

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
            <AlertCircle className="h-4 w-4 text-[#E8A59C]" />
            <AlertDescription className="text-[#E8A59C]">
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
              <FormMessage className="text-[#E8A59C] text-sm" />
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
                <Input
                  {...field}
                  type="password"
                  placeholder="Your password"
                  disabled={isLoggingIn}
                  className="bg-white border-[#E8E6E3] focus-visible:ring-primary transition-all duration-200"
                  data-testid="input-password"
                />
              </FormControl>
              <FormMessage className="text-[#E8A59C] text-sm" />
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
