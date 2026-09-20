import {
  emotionEntriesCreate,
  emotionEntriesGetAll,
  emotionEntriesGetSummary,
  type EmotionEntryResponse,
} from '@/shared/api/heartlog.generated.ts';
import { toEmotionEntrySummary, unwrapApiData } from '@/shared/api/heartlog-normalizers.ts';
import type { EmotionEntry } from '@/features/emotion-wheel/types/emotion-entry.ts';
import type { EmotionEntrySummary } from '@/features/emotion-wheel/types/emotion-entry-summary.ts';
import type { CreateEmotionEntryInput } from '@/features/emotion-wheel/types/create-emotion-entry.ts';

function requireEntryValue<T>(value: T | null | undefined, field: string): T {
  if (value === null || value === undefined || value === '') {
    throw new Error(`Missing ${field}.`);
  }

  return value;
}

function toEmotionEntry(entry: EmotionEntryResponse): EmotionEntry {
  return {
    id: requireEntryValue(entry.entryId, 'entry id'),
    comment: entry.comment ?? null,
    occurredAt: requireEntryValue(entry.occurredAt, 'entry occurred at'),
    createdAt: entry.createdAt ?? null,
    selectedEmotions: (entry.selectedEmotions ?? []).map((emotion) => ({
      emotionKey: requireEntryValue(emotion.emotionKey, 'selected emotion key'),
      isPrimary: emotion.isPrimary === true,
    })),
  };
}

function getEntrySortDate(entry: EmotionEntry): number {
  return new Date(entry.occurredAt || entry.createdAt || 0).getTime();
}

export async function fetchEmotionEntries(): Promise<EmotionEntry[]> {
  const entries = unwrapApiData(await emotionEntriesGetAll());

  return entries.map(toEmotionEntry).sort((first, second) => {
    return getEntrySortDate(second) - getEntrySortDate(first);
  });
}

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
