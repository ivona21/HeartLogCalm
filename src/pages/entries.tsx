import { format, isValid, parseISO } from 'date-fns';
import { AlertCircleIcon, BookOpenIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { useEmotionEntries } from '@/features/emotion-wheel/hooks/useEmotionEntries.ts';
import { useEmotions } from '@/features/emotion-wheel/hooks/useEmotions.ts';
import type { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';
import type { EmotionEntry } from '@/features/emotion-wheel/types/emotion-entry.ts';

type EmotionDisplay = {
  label: string;
  color?: string;
};

type GroupedEntries = {
  dateKey: string;
  dateLabel: string;
  entries: EmotionEntry[];
};

function parseEntryDate(value: string): Date {
  const date = parseISO(value);
  return isValid(date) ? date : new Date(value);
}

function getEntryDate(entry: EmotionEntry): Date {
  return parseEntryDate(entry.occurredAt || entry.createdAt || new Date().toISOString());
}

function buildEmotionMap(emotions: BackendCoreEmotion[]): Map<string, EmotionDisplay> {
  const emotionMap = new Map<string, EmotionDisplay>();

  emotions.forEach((core) => {
    emotionMap.set(core.id, { label: core.label, color: core.color });

    core.children.forEach((secondary) => {
      emotionMap.set(secondary.id, { label: secondary.label, color: core.color });

      secondary.children.forEach((tertiary) => {
        emotionMap.set(tertiary.id, { label: tertiary.label, color: core.color });
      });
    });
  });

  return emotionMap;
}

function groupEntriesByDate(entries: EmotionEntry[]): GroupedEntries[] {
  const groups = new Map<string, GroupedEntries>();

  entries.forEach((entry) => {
    const date = getEntryDate(entry);
    const dateKey = format(date, 'yyyy-MM-dd');

    if (!groups.has(dateKey)) {
      groups.set(dateKey, {
        dateKey,
        dateLabel: format(date, 'EEEE, MMMM d, yyyy'),
        entries: [],
      });
    }

    groups.get(dateKey)?.entries.push(entry);
  });

  return Array.from(groups.values());
}

function LoadingEntries() {
  return (
    <div className="space-y-6">
      {[0, 1].map((groupIndex) => (
        <section key={groupIndex} className="space-y-3">
          <Skeleton className="h-5 w-56" />
          <div className="space-y-3">
            {[0, 1].map((entryIndex) => (
              <Card key={entryIndex}>
                <CardHeader className="space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-48" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function EmptyEntries() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <BookOpenIcon className="h-5 w-5" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">No entries yet</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Save your first emotion check-in and it will appear here.
        </p>
        <Button className="mt-5" onClick={() => navigate('/emotion-wheel')}>
          Open Emotion Wheel
        </Button>
      </div>
    </div>
  );
}

function EmotionChip({
  emotion,
  emotionMap,
}: {
  emotion: EmotionEntry['selectedEmotions'][number];
  emotionMap: Map<string, EmotionDisplay>;
}) {
  const display = emotionMap.get(emotion.emotionKey);
  const label = display?.label ?? emotion.emotionKey;

  return (
    <span
      className="inline-flex min-h-6 items-center rounded-full border px-2.5 text-xs font-semibold leading-none shadow-[inset_0_1px_0_hsl(var(--color-white)/0.55)]"
      style={{
        backgroundColor: display?.color ? `${display.color}24` : undefined,
        borderColor: display?.color ? `${display.color}55` : undefined,
        color: display?.color ?? undefined,
      }}
    >
      {label}
    </span>
  );
}

function EntryCard({
  entry,
  emotionMap,
}: {
  entry: EmotionEntry;
  emotionMap: Map<string, EmotionDisplay>;
}) {
  const entryDate = getEntryDate(entry);
  const primaryEmotion = entry.selectedEmotions.find((emotion) => emotion.isPrimary);
  const primaryLabel = primaryEmotion
    ? (emotionMap.get(primaryEmotion.emotionKey)?.label ?? primaryEmotion.emotionKey)
    : null;
  const comment = entry.comment?.trim();

  return (
    <Card className="overflow-hidden bg-card/80">
      <CardHeader className="border-b border-border/70 bg-muted/15 p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">{format(entryDate, 'h:mm a')}</p>
          {primaryLabel ? (
            <p className="text-xs font-medium text-muted-foreground">Primary: {primaryLabel}</p>
          ) : null}
        </div>
        {entry.selectedEmotions.length > 0 ? (
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {entry.selectedEmotions.map((emotion) => (
              <EmotionChip
                key={`${entry.id}-${emotion.emotionKey}`}
                emotion={emotion}
                emotionMap={emotionMap}
              />
            ))}
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="p-4">
        {comment ? (
          <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">{comment}</p>
        ) : (
          <p className="text-sm italic text-muted-foreground">No written note.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function EntriesPage() {
  const entriesQuery = useEmotionEntries();
  const emotionsQuery = useEmotions();

  const emotionMap = useMemo(() => buildEmotionMap(emotionsQuery.data ?? []), [emotionsQuery.data]);
  const groupedEntries = useMemo(
    () => groupEntriesByDate(entriesQuery.data ?? []),
    [entriesQuery.data],
  );

  if (entriesQuery.isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Entries</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your reflections, newest first.</p>
        </div>
        <LoadingEntries />
      </div>
    );
  }

  if (entriesQuery.isError) {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Entries</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your reflections, newest first.</p>
        </div>
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Unable to load entries</AlertTitle>
          <AlertDescription>Please try again in a moment.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (groupedEntries.length === 0) {
    return <EmptyEntries />;
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Entries</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your reflections, newest first.</p>
      </div>

      <div className="space-y-8">
        {groupedEntries.map((group) => (
          <section key={group.dateKey} className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {group.dateLabel}
            </h2>
            <div className="space-y-3">
              {group.entries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} emotionMap={emotionMap} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
