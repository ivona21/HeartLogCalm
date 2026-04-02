export function EmotionEntriesSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="space-y-2">
              <div className="h-5 w-28 rounded-full bg-muted" />
              <div className="h-4 w-20 rounded-full bg-muted/80" />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-24 rounded-full bg-muted" />
              <div className="h-8 w-20 rounded-full bg-muted" />
              <div className="h-8 w-16 rounded-full bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded-full bg-muted/80" />
              <div className="h-4 w-11/12 rounded-full bg-muted/80" />
              <div className="h-4 w-4/5 rounded-full bg-muted/80" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
