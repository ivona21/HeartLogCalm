import { authResendConfirmation } from '@/shared/api/heartlog.generated.ts';
import { assertApiSuccess } from '@/shared/api/heartlog-normalizers.ts';

export async function resendConfirmationApi(email: string): Promise<void> {
  assertApiSuccess(await authResendConfirmation({ email }));
}
