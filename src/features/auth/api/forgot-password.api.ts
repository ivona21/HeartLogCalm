import { authForgotPassword } from '@/shared/api/heartlog.generated.ts';
import { assertApiSuccess } from '@/shared/api/heartlog-normalizers.ts';
import { apiClient } from '@/lib/api-client.ts';
import type { ApiResponse } from '@/shared/api/heartlog.generated.ts';

export async function forgotPasswordApi(email: string): Promise<void> {
  assertApiSuccess(await authForgotPassword({ email }));
}

export async function forgotPasswordMeApi(): Promise<void> {
  assertApiSuccess(
    await apiClient.request<ApiResponse>('/api/auth/forgot-password/me', {
      method: 'POST',
    }),
  );
}
