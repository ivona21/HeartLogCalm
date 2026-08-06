import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
import { ApiErrorCode } from '@/shared/api/heartlog.generated.ts';
import { getApiValidationErrors, normalizeApiError } from '@/shared/api/api-errors.ts';

type ApplyApiValidationErrorsOptions<TFieldValues extends FieldValues> = {
  fieldMap?: Partial<Record<string, FieldPath<TFieldValues>>>;
  fallbackField?: FieldPath<TFieldValues>;
  fallbackMessage?: string;
};

export function applyApiValidationErrors<TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  options: ApplyApiValidationErrorsOptions<TFieldValues> = {},
): boolean {
  const apiError = normalizeApiError(error);

  if (apiError.code !== ApiErrorCode.validationFailed) {
    return false;
  }

  const validationErrors = getApiValidationErrors(error);
  const fieldMap = options.fieldMap ?? {};
  let applied = false;

  if (validationErrors) {
    for (const [fieldName, messages] of Object.entries(validationErrors)) {
      const mappedField = fieldMap[fieldName];
      const message = messages[0] ?? apiError.message ?? options.fallbackMessage;

      if (!mappedField || !message) {
        continue;
      }

      setError(mappedField, {
        type: 'manual',
        message,
      });

      applied = true;
    }
  }

  if (!applied && options.fallbackField) {
    setError(options.fallbackField, {
      type: 'manual',
      message: options.fallbackMessage ?? apiError.message,
    });
    applied = true;
  }

  return applied;
}
