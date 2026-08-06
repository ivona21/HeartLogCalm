import { LoginInput } from '@/features/auth/forms/LoginForm/schema.ts';
import { authLogin } from '@/shared/api/heartlog.generated.ts';
import { toAuthSession } from '@/shared/api/heartlog-normalizers.ts';
import type { AuthSession } from '@/features/auth/types/auth-session.ts';

export async function loginApi(data: LoginInput): Promise<AuthSession> {
  const response = await authLogin(data);
  return toAuthSession(response);
}
