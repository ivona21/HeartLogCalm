import { apiClient } from '@/lib/api-client';
import type { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';
import type { ApiResponse } from '@/shared/types/api-types.ts';

export async function fetchEmotions(): Promise<BackendCoreEmotion[]> {
  const response = await apiClient.get<ApiResponse<BackendCoreEmotion[]>>('/api/emotions');
  return response.data ?? [];
}
