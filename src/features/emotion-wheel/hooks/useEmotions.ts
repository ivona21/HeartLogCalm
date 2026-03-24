import { useQuery } from '@tanstack/react-query';
import { fetchEmotions } from '@/features/emotion-wheel/api/emotionsApi';
import type { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';

export function useEmotions() {
  return useQuery<BackendCoreEmotion[]>({
    queryKey: ['emotions'],
    queryFn: fetchEmotions,
  });
}
