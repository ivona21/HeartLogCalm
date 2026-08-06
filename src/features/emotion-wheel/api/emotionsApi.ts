import { emotionsGetTree } from '@/shared/api/heartlog.generated.ts';
import { toCoreEmotions } from '@/shared/api/heartlog-normalizers.ts';
import type { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';

export async function fetchEmotions(): Promise<BackendCoreEmotion[]> {
  return toCoreEmotions(await emotionsGetTree());
}
