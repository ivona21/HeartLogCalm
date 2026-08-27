import { authResetPassword } from '@/shared/api/heartlog.generated.ts';
import { assertApiSuccess } from '@/shared/api/heartlog-normalizers.ts';

export async function resetPasswordApi(password: string): Promise<void> {
  assertApiSuccess(await authResetPassword({ password }, { credentials: 'include' }));
}
