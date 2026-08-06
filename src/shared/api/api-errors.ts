import {
  ApiErrorCode,
  type ErrorResponse,
  type ErrorResponseErrors,
} from '@/shared/api/heartlog.generated.ts';

export const DEFAULT_NETWORK_ERROR_MESSAGE =
  "Something went wrong on our end. We're working on fixing it. Please try again in a few minutes.";

export const DEFAULT_UNEXPECTED_ERROR_MESSAGE = 'Unexpected error';

export type ApiErrorKind = 'backend' | 'network' | 'unexpected';

export interface NormalizedApiError extends Partial<ErrorResponse> {
  message: string;
  status?: number;
  kind: ApiErrorKind;
  isNetworkError: boolean;
  isBackendError: boolean;
  raw?: unknown;
}

type ApiErrorLike = {
  response?: unknown;
  data?: unknown;
  error?: unknown;
  body?: unknown;
  status?: unknown;
  message?: unknown;
  code?: unknown;
  errors?: unknown;
  traceId?: unknown;
  Message?: unknown;
  Errors?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isErrorResponseErrors(value: unknown): value is ErrorResponseErrors {
  if (value === null) {
    return true;
  }

  if (!isRecord(value)) {
    return false;
  }

  return Object.values(value).every(isStringArray);
}

function isApiErrorCode(value: unknown): value is ApiErrorCode {
  return typeof value === 'string' && Object.values(ApiErrorCode).includes(value as ApiErrorCode);
}

function toOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function toNullableString(value: unknown): string | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  return typeof value === 'string' ? value : undefined;
}

function toStatus(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function extractStatus(error: unknown): number | undefined {
  if (!isRecord(error)) {
    return undefined;
  }

  const directStatus = toStatus(error.status);
  if (directStatus !== undefined) {
    return directStatus;
  }

  const response = error.response;
  if (isRecord(response)) {
    const responseStatus = toStatus(response.status);
    if (responseStatus !== undefined) {
      return responseStatus;
    }
  }

  return undefined;
}

function readCandidate(value: unknown): ErrorResponse | null {
  if (!isRecord(value)) {
    return null;
  }

  const code = value.code;
  const message = toOptionalString(value.message ?? value.Message);
  const errors = value.errors ?? value.Errors;
  const traceId = toNullableString(value.traceId);

  if (isApiErrorCode(code)) {
    return {
      code,
      message,
      errors: isErrorResponseErrors(errors) ? errors : null,
      traceId,
    };
  }

  if (isErrorResponseErrors(errors)) {
    const status = extractStatus(value);

    if (status === 401 || status === 403) {
      return {
        code: ApiErrorCode.unauthorized,
        message,
        errors,
        traceId,
      };
    }

    if (status !== undefined && status < 500) {
      return {
        code: ApiErrorCode.validationFailed,
        message,
        errors,
        traceId,
      };
    }

    if (status !== undefined && status >= 500) {
      return {
        code: ApiErrorCode.unexpectedError,
        message,
        errors,
        traceId,
      };
    }
  }

  return null;
}

function findErrorResponse(value: unknown, visited = new Set<unknown>()): ErrorResponse | null {
  if (!isRecord(value) || visited.has(value)) {
    return null;
  }

  visited.add(value);

  const direct = readCandidate(value);
  if (direct) {
    return direct;
  }

  for (const key of ['response', 'data', 'error', 'body'] as const) {
    const nested = findErrorResponse((value as ApiErrorLike)[key], visited);
    if (nested) {
      return nested;
    }
  }

  return null;
}

function isNetworkFailure(error: unknown): boolean {
  if (error instanceof TypeError) {
    return true;
  }

  if (!isRecord(error)) {
    return false;
  }

  if (typeof error.name === 'string' && error.name === 'TypeError') {
    return true;
  }

  if (typeof error.code === 'string' && ['ERR_NETWORK', 'ECONNABORTED'].includes(error.code)) {
    return true;
  }

  if ('request' in error && !('response' in error)) {
    return true;
  }

  return false;
}

function messageFromUnknown(error: unknown): string | undefined {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (isRecord(error) && typeof error.message === 'string') {
    return error.message;
  }

  return undefined;
}

export function createApiError(input: {
  message: string;
  code?: ApiErrorCode;
  errors?: ErrorResponseErrors;
  traceId?: string | null;
  status?: number;
  kind?: ApiErrorKind;
  raw?: unknown;
}): NormalizedApiError {
  const kind = input.kind ?? (input.code ? 'backend' : 'unexpected');

  return {
    message: input.message,
    code: input.code,
    errors: input.errors ?? null,
    traceId: input.traceId ?? null,
    status: input.status,
    kind,
    isBackendError: kind === 'backend',
    isNetworkError: kind === 'network',
    raw: input.raw,
  };
}

export function extractBackendErrorResponse(error: unknown): ErrorResponse | null {
  return findErrorResponse(error);
}

export function getApiErrorCode(error: unknown): ApiErrorCode | null {
  const backendError = extractBackendErrorResponse(error);
  return backendError?.code ?? null;
}

export function getApiValidationErrors(error: unknown): ErrorResponseErrors | null {
  const backendError = extractBackendErrorResponse(error);

  if (!backendError || backendError.code !== ApiErrorCode.validationFailed) {
    return null;
  }

  return backendError.errors ?? null;
}

export function normalizeApiError(
  error: unknown,
  options: {
    status?: number;
    fallbackMessage?: string;
  } = {},
): NormalizedApiError {
  const status = options.status ?? extractStatus(error);
  const backendError = extractBackendErrorResponse(error);

  if (backendError) {
    return createApiError({
      message: backendError.message ?? options.fallbackMessage ?? DEFAULT_UNEXPECTED_ERROR_MESSAGE,
      code: backendError.code,
      errors: backendError.errors ?? null,
      traceId: backendError.traceId ?? null,
      status,
      kind: 'backend',
      raw: error,
    });
  }

  if (isNetworkFailure(error)) {
    return createApiError({
      message: options.fallbackMessage ?? DEFAULT_NETWORK_ERROR_MESSAGE,
      status,
      kind: 'network',
      raw: error,
    });
  }

  const fallbackMessage =
    options.fallbackMessage ??
    messageFromUnknown(error) ??
    (status && status >= 500 ? DEFAULT_UNEXPECTED_ERROR_MESSAGE : DEFAULT_UNEXPECTED_ERROR_MESSAGE);

  const fallbackCode =
    status === 401 || status === 403
      ? ApiErrorCode.unauthorized
      : status !== undefined && status >= 500
        ? ApiErrorCode.unexpectedError
        : undefined;

  return createApiError({
    message: fallbackMessage,
    code: fallbackCode,
    status,
    kind: fallbackCode ? 'backend' : 'unexpected',
    raw: error,
  });
}
