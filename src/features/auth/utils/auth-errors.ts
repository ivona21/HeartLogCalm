import { ApiErrorCode } from '@/shared/api/heartlog.generated.ts';
import { getApiErrorCode } from '@/shared/api/api-errors.ts';

export function getAuthErrorCode(error: unknown): ApiErrorCode | null {
  return getApiErrorCode(error);
}

export function isInvalidCredentialsLoginError(error: unknown): boolean {
  return getApiErrorCode(error) === ApiErrorCode.invalidCredentials;
}

export function isUnconfirmedAccountLoginError(error: unknown): boolean {
  return getApiErrorCode(error) === ApiErrorCode.emailNotConfirmed;
}

export function isAuthenticationUnavailableError(error: unknown): boolean {
  return getApiErrorCode(error) === ApiErrorCode.authenticationUnavailable;
}

export function isValidationFailedError(error: unknown): boolean {
  return getApiErrorCode(error) === ApiErrorCode.validationFailed;
}

export function isUnexpectedError(error: unknown): boolean {
  return getApiErrorCode(error) === ApiErrorCode.unexpectedError;
}

export function isUnauthorizedError(error: unknown): boolean {
  return getApiErrorCode(error) === ApiErrorCode.unauthorized;
}
