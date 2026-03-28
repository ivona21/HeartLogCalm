import { apiClient } from '@/lib/api-client';
import type { ApiResponse } from '@/shared/types/api-types.ts';
import type { EmotionEntrySummary } from '@/features/emotion-wheel/types/emotion-entry-summary.ts';
import type { CreateEmotionEntryInput } from '@/features/emotion-wheel/types/create-emotion-entry.ts';

export async function fetchEmotionEntrySummary(): Promise<EmotionEntrySummary | null> {
  const response = await apiClient.get<ApiResponse<EmotionEntrySummary>>(
    '/api/emotion-entries/summary',
  );
  return response.data ?? null;
}

export async function createEmotionEntry(input: CreateEmotionEntryInput): Promise<void> {
  await apiClient.post<ApiResponse>('/api/emotion-entries', input);
}
