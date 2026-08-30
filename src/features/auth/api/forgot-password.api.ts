import { authForgotPassword } from '@/shared/api/heartlog.generated.ts';
import { assertApiSuccess } from '@/shared/api/heartlog-normalizers.ts';

export async function forgotPasswordApi(email: string): Promise<void> {
  assertApiSuccess(await authForgotPassword({ email }));
}
