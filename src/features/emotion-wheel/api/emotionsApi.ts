import { apiClient } from '@/lib/api-client';
import type { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';

export function fetchEmotions() {
  return apiClient.get<BackendCoreEmotion[]>('/api/emotions');
}
