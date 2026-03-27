import { useQuery } from '@tanstack/react-query';
import { fetchEmotionEntrySummary } from '@/features/emotion-wheel/api/emotionEntriesApi.ts';
import type { EmotionEntrySummary } from '@/features/emotion-wheel/types/emotion-entry-summary.ts';

export function useEmotionEntrySummary(enabled: boolean, userKey?: string) {
  return useQuery<EmotionEntrySummary | null>({
    queryKey: ['emotion-entry-summary', userKey ?? 'anonymous'],
    queryFn: fetchEmotionEntrySummary,
    enabled,
  });
}
