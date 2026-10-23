import { toCoreEmotions } from '@/shared/api/heartlog-normalizers.ts';
import type { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';
import type { EmotionTreeNodeDtoIEnumerableApiResponse } from '@/shared/api/heartlog.generated.ts';

export async function fetchEmotions(): Promise<BackendCoreEmotion[]> {
  const response = await fetch('/emotions.json');

  if (!response.ok) {
    throw new Error(`Failed to load emotions (${response.status}).`);
  }

  return toCoreEmotions((await response.json()) as EmotionTreeNodeDtoIEnumerableApiResponse);
}
