import { AlertCircleIcon, HeartIcon, RefreshCwIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert.tsx';
import { EmotionEntriesSkeleton } from '@/features/emotion-entries/components/EmotionEntriesSkeleton.tsx';
import { EmotionEntryCard } from '@/features/emotion-entries/components/EmotionEntryCard.tsx';
import { useEmotionEntries } from '@/features/emotion-entries/hooks/useEmotionEntries.ts';
import { useEmotions } from '@/features/emotion-wheel/hooks/useEmotions.ts';

export function EmotionEntriesView() {
  const {
    data: entries = [],
    isPending: isEntriesPending,
    isError: isEntriesError,
    refetch: refetchEntries,
  } = useEmotionEntries();
  const { data: emotions = [], isPending: isEmotionsPending } = useEmotions();

  const emotionMetaByKey = new Map(emotions.map((emotion) => [emotion.id, emotion]));
  const sortedEntries = [...entries].sort(
    (left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime(),
  );

  const isLoading = isEntriesPending || isEmotionsPending;

  if (isLoading) {
    return <EmotionEntriesSkeleton />;
  }

  if (isEntriesError) {
    return (
      <Alert className="rounded-3xl border-destructive/20 bg-destructive/5">
        <AlertCircleIcon className="h-4 w-4 text-destructive" />
        <AlertTitle>Unable to load your reflections</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>Please try again in a moment.</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => refetchEntries()}
            className="gap-2"
          >
            <RefreshCwIcon className="h-4 w-4" />
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (sortedEntries.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card/75 px-6 py-12 text-center shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/30">
          <HeartIcon className="h-7 w-7 text-accent-foreground" fill="currentColor" />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-foreground">No reflections yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          When you log emotions, they&apos;ll appear here in a calm timeline so you can revisit how
          each day felt.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedEntries.map((entry) => (
        <EmotionEntryCard key={entry.entryId} entry={entry} emotionMetaByKey={emotionMetaByKey} />
      ))}
    </div>
  );
}
