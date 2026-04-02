import { useQuery } from '@tanstack/react-query';
import { fetchEmotionEntries } from '@/features/emotion-entries/api/emotionEntriesApi.ts';
import type { EmotionEntry } from '@/features/emotion-entries/types/emotion-entry.ts';

export function useEmotionEntries() {
  return useQuery<EmotionEntry[]>({
    queryKey: ['emotion-entries'],
    queryFn: fetchEmotionEntries,
  });
}
