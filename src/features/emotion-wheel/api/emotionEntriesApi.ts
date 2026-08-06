import { emotionEntriesCreate, emotionEntriesGetSummary } from '@/shared/api/heartlog.generated.ts';
import { toEmotionEntrySummary } from '@/shared/api/heartlog-normalizers.ts';
import type { EmotionEntrySummary } from '@/features/emotion-wheel/types/emotion-entry-summary.ts';
import type { CreateEmotionEntryInput } from '@/features/emotion-wheel/types/create-emotion-entry.ts';

export async function fetchEmotionEntrySummary(): Promise<EmotionEntrySummary | null> {
  return toEmotionEntrySummary(await emotionEntriesGetSummary());
}

export async function createEmotionEntry(input: CreateEmotionEntryInput): Promise<void> {
  await emotionEntriesCreate({
    emotionKeys: input.emotionKeys,
    primaryEmotionKey: input.primaryEmotionKey,
    comment: input.comment || null,
    occurredAt: null,
  });
}
