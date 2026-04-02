import { apiClient } from '@/lib/api-client.ts';
import type { ApiResponse } from '@/shared/types/api-types.ts';
import type { EmotionEntry } from '@/features/emotion-entries/types/emotion-entry.ts';

export async function fetchEmotionEntries(): Promise<EmotionEntry[]> {
  const response = await apiClient.get<ApiResponse<EmotionEntry[]>>('/api/emotion-entries');
  return response.data ?? [];
}
