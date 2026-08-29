export type ResetPasswordStatus = 'ready' | 'expired' | 'invalid';

export const GENERIC_RESET_EMAIL_MESSAGE = 'If an account exists, a reset link has been sent.';

export function isResetPasswordStatus(value: string | null): value is ResetPasswordStatus {
  return value === 'ready' || value === 'expired' || value === 'invalid';
}

export function getResetPasswordTitle(status: ResetPasswordStatus | 'missing'): string {
  switch (status) {
    case 'ready':
      return 'Reset your password';
    case 'expired':
      return 'Reset link expired';
    case 'invalid':
      return 'Invalid reset link';
    case 'missing':
    default:
      return 'Reset link unavailable';
  }
}

export function getResetPasswordMessage(status: ResetPasswordStatus | 'missing'): string {
  switch (status) {
    case 'ready':
      return 'Set a new password below.';
    case 'expired':
      return 'That reset link is no longer valid. Request a new email below.';
    case 'invalid':
      return 'We could not verify that reset link. Request a new email below.';
    case 'missing':
    default:
      return 'This reset page needs a valid reset link. Request a new email below.';
  }
}
