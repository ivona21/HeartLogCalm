import { MessageSquareIcon, SparklesIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Section, DemoFrame } from '@/pages/dev/design-system/shared.tsx';

const badgeVariants = ['default', 'accent', 'secondary', 'destructive', 'outline'] as const;

export function FeedbackSection() {
  return (
    <Section
      title="Feedback and status"
      description="Badges, alerts, loading states, and progress indicators that surface meaning without crowding the UI."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <DemoFrame
          title="Badges and alerts"
          subtitle="Inline labels and prominent feedback states."
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {badgeVariants.map((variant) => (
                <Badge key={variant} variant={variant}>
                  {variant}
                </Badge>
              ))}
            </div>
            <Alert>
              <SparklesIcon className="h-4 w-4" />
              <AlertTitle>Draft saved</AlertTitle>
              <AlertDescription>
                The form retained its current values and can be resumed later.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <MessageSquareIcon className="h-4 w-4" />
              <AlertTitle>Connection lost</AlertTitle>
              <AlertDescription>
                The last change could not be sent. Retry when the connection recovers.
              </AlertDescription>
            </Alert>
          </div>
        </DemoFrame>

        <DemoFrame
          title="Loading and progress"
          subtitle="Used for background operations and partial completion."
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Sync</span>
                <span className="text-muted-foreground">64%</span>
              </div>
              <Progress value={64} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Import</span>
                <span className="text-muted-foreground">92%</span>
              </div>
              <Progress value={92} />
            </div>
            <div className="space-y-3 rounded-lg border border-border p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <Skeleton className="h-20 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-10 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </DemoFrame>
      </div>
    </Section>
  );
}
