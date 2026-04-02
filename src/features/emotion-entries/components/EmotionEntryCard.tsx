import type { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';
import type { EmotionEntry } from '@/features/emotion-entries/types/emotion-entry.ts';
import {
  getEmotionEntryDayLabel,
  getEmotionEntryTimeLabel,
} from '@/features/emotion-entries/utils/formatEmotionEntryDate.ts';
import { formatEmotionKey } from '@/features/emotion-entries/utils/formatEmotionKey.ts';

type EmotionEntryCardProps = {
  entry: EmotionEntry;
  emotionMetaByKey: Map<string, BackendCoreEmotion>;
};

export function EmotionEntryCard({ entry, emotionMetaByKey }: EmotionEntryCardProps) {
  const occurredAt = new Date(entry.occurredAt);

  const emotions = [...entry.selectedEmotions].sort((left, right) => {
    if (left.isPrimary !== right.isPrimary) {
      return left.isPrimary ? -1 : 1;
    }

    return left.emotionKey.localeCompare(right.emotionKey);
  });

  return (
    <article className="rounded-3xl border border-border bg-card/75 p-6 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-card/90">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-foreground">
            {getEmotionEntryDayLabel(occurredAt)}
          </p>
          <p className="text-sm text-muted-foreground">{getEmotionEntryTimeLabel(occurredAt)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {emotions.map((emotion) => {
          const emotionMeta = emotionMetaByKey.get(emotion.emotionKey);

          return (
            <span
              key={`${entry.entryId}-${emotion.emotionKey}`}
              className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor: emotionMeta ? `${emotionMeta.color}18` : 'hsl(var(--secondary))',
                borderColor: emotionMeta ? `${emotionMeta.color}33` : 'hsl(var(--border))',
                color: emotionMeta?.color ?? 'hsl(var(--foreground))',
              }}
            >
              {emotionMeta?.label ?? formatEmotionKey(emotion.emotionKey)}
            </span>
          );
        })}
      </div>

      <p className="mt-5 whitespace-pre-wrap leading-7 text-card-foreground">{entry.comment}</p>
    </article>
  );
}
