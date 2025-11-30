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
import { useAuth } from "../../hooks/useAuth.ts";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";
import type { ApiError } from "@/types";
import {RegisterInput, registerSchema} from "@/features/auth/forms/RegisterForm/schema.ts";

export function RegisterForm() {
  const { register, isRegistering, registerError } = useAuth();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterInput) => {
    register(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Create Your Oasis
          </h2>
          <p className="text-sm text-muted-foreground">
            Start your emotional wellness journey
          </p>
        </div>

        {registerError && (
          <Alert variant="destructive" className="bg-[#E8A59C]/10 border-[#E8A59C]/30">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-500">
              {(registerError as ApiError).message || "Registration failed. Please try again."}
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
                  disabled={isRegistering}
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Choose a username"
                  disabled={isRegistering}
                  className="bg-white border-[#E8E6E3] focus-visible:ring-primary transition-all duration-200"
                  data-testid="input-username"
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
                <Input
                  {...field}
                  type="password"
                  placeholder="Create a secure password"
                  disabled={isRegistering}
                  className="bg-white border-[#E8E6E3] focus-visible:ring-primary transition-all duration-200"
                  data-testid="input-password"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-[#8FA888] hover:from-[#8FA888] hover:to-primary text-primary-foreground font-medium transition-all duration-200"
          disabled={isRegistering}
          data-testid="button-submit"
        >
          {isRegistering ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating your account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
}
