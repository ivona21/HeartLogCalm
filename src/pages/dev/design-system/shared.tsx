import type { ReactNode } from 'react';

import { cn } from '@/shared/utils/cn.ts';

export type DesignSystemTheme = 'light' | 'dark';

export const DESIGN_SYSTEM_THEME_KEY = 'design-system-theme';

export function readStoredTheme(): DesignSystemTheme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.localStorage.getItem(DESIGN_SYSTEM_THEME_KEY) === 'dark' ? 'dark' : 'light';
}

type SectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <div className="max-w-3xl space-y-2">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

type DemoFrameProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function DemoFrame({ title, subtitle, children, className }: DemoFrameProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-card/60 p-4 shadow-sm', className)}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          {subtitle ? <p className="text-xs leading-5 text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </div>
  );
}
