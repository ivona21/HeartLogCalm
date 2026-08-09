import {
  ArrowRightIcon,
  FilterIcon,
  MailIcon,
  MoreHorizontalIcon,
  SparklesIcon,
  UserIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { Section, DemoFrame } from '@/pages/dev/design-system/shared.tsx';
import { toast } from '@/shared/hooks/use-toast.ts';

const buttonVariants = ['default', 'destructive', 'outline', 'secondary', 'ghost'] as const;
const buttonSizes = ['sm', 'default', 'lg'] as const;

const toastDemoButtons = [
  {
    label: 'Show success',
    variant: 'default' as const,
    onClick: () =>
      toast({
        title: 'Saved',
        description: 'The latest changes were stored in the shared toast system.',
      }),
  },
  {
    label: 'Show info',
    variant: 'outline' as const,
    onClick: () =>
      toast({
        variant: 'info',
        title: 'Heads up',
        description: 'This is the centralized notification surface used across the app.',
      }),
  },
  {
    label: 'Show error',
    variant: 'destructive' as const,
    onClick: () =>
      toast({
        variant: 'destructive',
        title: 'Action failed',
        description: 'This uses the same global toast queue and viewport.',
      }),
  },
] as const;

export function ButtonsSection() {
  return (
    <Section
      title="Buttons"
      description="The shared button primitive plus the common size and variant combinations used across the app."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <DemoFrame title="Variant matrix" subtitle="Each row uses the shared button primitive.">
          <div className="space-y-3">
            {buttonVariants.map((variant) => (
              <div
                key={variant}
                className="grid gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0 md:grid-cols-[96px_minmax(0,1fr)] md:items-center"
              >
                <div className="text-sm font-medium capitalize text-muted-foreground">
                  {variant}
                </div>
                <div className="flex flex-wrap gap-2">
                  {buttonSizes.map((size) => (
                    <Button key={size} variant={variant} size={size}>
                      {size}
                    </Button>
                  ))}
                  <Button variant={variant} size="icon" aria-label={`${variant} icon button`}>
                    <SparklesIcon className="h-4 w-4" />
                  </Button>
                  <Button variant={variant} disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DemoFrame>

        <DemoFrame title="Common usage" subtitle="Action, icon, full-width, and loading shapes.">
          <div className="space-y-3">
            <Button className="w-full">
              <MailIcon className="h-4 w-4" />
              Continue
            </Button>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <UserIcon className="h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost">
                <MoreHorizontalIcon className="h-4 w-4" />
                More
              </Button>
              <Button variant="secondary">
                <FilterIcon className="h-4 w-4" />
                Filter
              </Button>
            </div>
            <Button disabled className="w-full">
              <ArrowRightIcon className="h-4 w-4" />
              Saving
            </Button>
          </div>
        </DemoFrame>

        <DemoFrame
          title="Notifications"
          subtitle="Buttons that trigger the shared app-wide toast system."
        >
          <div className="flex flex-wrap gap-2">
            {toastDemoButtons.map((demo) => (
              <Button key={demo.label} variant={demo.variant} onClick={demo.onClick}>
                {demo.label}
              </Button>
            ))}
          </div>
        </DemoFrame>
      </div>
    </Section>
  );
}
