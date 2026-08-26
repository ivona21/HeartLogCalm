import { AlertCircleIcon, Loader2Icon } from 'lucide-react';
import { type Control } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { PasswordInput } from '@/components/ui/password-input.tsx';
import { FormInputField } from '@/components/form/FormInputField.tsx';
import { LoginInput } from '@/features/auth/forms/LoginForm/schema.ts';

export interface CredentialsState {
  isLoggingIn: boolean;
  isForgotPasswordMode: boolean;
  isSendingRestartLink: boolean;
  loginErrorMessage: string;
  showLoginPasswordError: boolean;
  showLoginErrorAlert: boolean;
  restartLinkError: string | null;
  restartLinkMessage: string | null;
}

interface LoginCredentialsSectionProps {
  control: Control<LoginInput>;
  state: CredentialsState;
  onForgotPasswordClick: () => void;
  onSendRestartLink: () => void;
}

export function LoginCredentialsSection({
  control,
  state,
  onForgotPasswordClick,
  onSendRestartLink,
}: LoginCredentialsSectionProps) {
  const {
    isLoggingIn,
    isForgotPasswordMode,
    isSendingRestartLink,
    loginErrorMessage,
    showLoginPasswordError,
    showLoginErrorAlert,
    restartLinkError,
    restartLinkMessage,
  } = state;

  return (
    <>
      {isForgotPasswordMode && (
        <div className="space-y-1">
          <div className="text-sm font-semibold leading-none text-foreground">
            Forgot your password?
          </div>
          <p className="text-sm leading-6 text-foreground">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>
      )}

      <FormInputField
        control={control}
        name="email"
        label="Email"
        renderInput={(field) => (
          <Input
            {...field}
            type="email"
            placeholder="Your email"
            disabled={isLoggingIn}
            onKeyDown={(event) => {
              if (isForgotPasswordMode && event.key === 'Enter') {
                event.preventDefault();
                onSendRestartLink();
              }
            }}
            className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
            data-testid="input-email"
          />
        )}
      />

      {isForgotPasswordMode ? (
        <div className="space-y-3 pt-3">
          {restartLinkError && (
            <p className="pl-0.5 text-xs font-medium text-destructive">{restartLinkError}</p>
          )}

          {restartLinkMessage && (
            <p className="pl-0.5 text-xs font-medium text-primary">{restartLinkMessage}</p>
          )}

          <Button
            type="button"
            variant="default"
            className="w-full font-medium"
            onClick={onSendRestartLink}
            disabled={isSendingRestartLink}
            data-testid="button-send-restart-link"
          >
            {isSendingRestartLink ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              'Send reset link'
            )}
          </Button>
        </div>
      ) : (
        <>
          <FormInputField
            control={control}
            name="password"
            label="Password"
            renderInput={(field) => (
              <PasswordInput
                {...field}
                placeholder="Your password"
                disabled={isLoggingIn}
                className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                data-testid="input-password"
              />
            )}
          />
          {showLoginPasswordError && (
            <div className="mb-4 flex justify-end text-right" style={{ marginTop: '-20px' }}>
              <button
                type="button"
                className="text-sm text-accent-foreground hover:text-primary transition-colors duration-150"
                onClick={onForgotPasswordClick}
                data-testid="link-forgot-password"
              >
                Forgot password?
              </button>
            </div>
          )}

          {showLoginErrorAlert && (
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
              <AlertCircleIcon className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                {loginErrorMessage || 'Login failed. Please check your credentials.'}
              </AlertDescription>
            </Alert>
          )}

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full hover:to-primary text-primary-foreground font-medium transition-all duration-200"
              disabled={isLoggingIn}
              data-testid="button-submit"
            >
              {isLoggingIn ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Log In'
              )}
            </Button>
          </div>
        </>
      )}
    </>
  );
}
