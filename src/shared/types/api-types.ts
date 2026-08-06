import type { NormalizedApiError } from '@/shared/api/api-errors.ts';

export interface ApiResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}

export type ApiError = NormalizedApiError;
