import { useQuery } from '@tanstack/react-query';
import { fetchEmotionEntries } from '@/features/emotion-wheel/api/emotionEntriesApi.ts';
import type { EmotionEntry } from '@/features/emotion-wheel/types/emotion-entry.ts';

export const emotionEntriesQueryKey = ['emotion-entries'] as const;

export function useEmotionEntries(enabled: boolean, userKey?: string) {
  return useQuery<EmotionEntry[]>({
    queryKey: [...emotionEntriesQueryKey, userKey ?? 'anonymous'],
    queryFn: fetchEmotionEntries,
    enabled,
  });
}
