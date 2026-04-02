import { EmotionEntriesView } from '@/features/emotion-entries/components/EmotionEntriesView.tsx';

export default function EmotionEntriesPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <section className="mb-8 rounded-3xl border border-border bg-gradient-to-br from-card via-card/95 to-accent/10 px-6 py-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Reflection history
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Your emotion entries
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Revisit your reflections in a gentle timeline, with the newest moments first and the exact
          time each feeling was recorded.
        </p>
      </section>

      <EmotionEntriesView />
    </div>
  );
}
