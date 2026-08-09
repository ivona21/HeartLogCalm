import { useEffect, useState } from 'react';
import { PaletteIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';
import {
  ButtonsSection,
  DataDisplaySection,
  ExamplePageSection,
  FeedbackSection,
  FormControlsSection,
  NavigationSection,
  OverlaysSection,
  PaletteSection,
} from '@/pages/dev/design-system';
import {
  DesignSystemTheme,
  DESIGN_SYSTEM_THEME_KEY,
  readStoredTheme,
} from '@/pages/dev/design-system/shared.tsx';

export default function DesignSystemPage() {
  const [theme, setTheme] = useState<DesignSystemTheme>(() => readStoredTheme());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(DESIGN_SYSTEM_THEME_KEY, theme);
  }, [theme]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-muted/25">
          <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <PaletteIcon className="h-4 w-4" />
                  UI inventory
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Design System
                </h1>
                <p className="text-sm leading-6 text-muted-foreground">
                  A live inventory of the core UI primitives, their variants, and the default shape
                  of the interface the app is built on.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">ui primitives</Badge>
                <Badge>components</Badge>
                <Badge variant="secondary">variants</Badge>
                <div className="ml-2 flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
                  <div className="space-y-0.5">
                    <Label htmlFor="design-theme-toggle" className="text-xs font-medium">
                      Dark mode
                    </Label>
                    <p className="text-[11px] text-muted-foreground">Persists across navigation</p>
                  </div>
                  <Switch
                    id="design-theme-toggle"
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-12 px-6 py-8 md:px-10">
          <PaletteSection />
          <ButtonsSection />
          <FormControlsSection />
          <FeedbackSection />
          <NavigationSection />
          <OverlaysSection />
          <DataDisplaySection />
          <ExamplePageSection />
        </div>
      </div>
    </TooltipProvider>
  );
}
