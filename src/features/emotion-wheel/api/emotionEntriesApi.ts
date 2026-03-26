import { apiClient } from '@/lib/api-client';
import type { ApiResponse } from '@/shared/types/api-types.ts';
import type { EmotionEntrySummary } from '@/features/emotion-wheel/types/emotion-entry-summary.ts';

export async function fetchEmotionEntrySummary(): Promise<EmotionEntrySummary | null> {
  const response = await apiClient.get<ApiResponse<EmotionEntrySummary>>('/api/emotion-entries/summary');
  return response.data ?? null;
}
