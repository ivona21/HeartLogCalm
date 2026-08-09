import { paletteSwatches } from '@/pages/dev/design-system-palette.ts';
import { Section } from '@/pages/dev/design-system/shared.tsx';
import { cn } from '@/shared/utils/cn.ts';

function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const light = l / 100;
  const chroma = (1 - Math.abs(2 * light - 1)) * sat;
  const hue = h / 60;
  const x = chroma * (1 - Math.abs((hue % 2) - 1));
  const match = light - chroma / 2;

  let [r, g, b] = [0, 0, 0];

  if (hue >= 0 && hue < 1) [r, g, b] = [chroma, x, 0];
  else if (hue < 2) [r, g, b] = [x, chroma, 0];
  else if (hue < 3) [r, g, b] = [0, chroma, x];
  else if (hue < 4) [r, g, b] = [0, x, chroma];
  else if (hue < 5) [r, g, b] = [x, 0, chroma];
  else [r, g, b] = [chroma, 0, x];

  const toHex = (value: number) =>
    Math.round((value + match) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function cssVarToHex(token: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const match = raw.match(/^(-?\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);

  if (!match) {
    return token;
  }

  const [, h, s, l] = match;
  return hslToHex(Number(h), Number(s), Number(l));
}

export function PaletteSection() {
  return (
    <Section
      title="Palette"
      description="The actual theme tokens behind the interface. These swatches reflect the app's light palette and core semantic colors."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {paletteSwatches.map((swatch) => (
          <div key={swatch.name} className="space-y-2">
            <div
              className={cn(
                'flex h-24 flex-col justify-end rounded-lg border border-border p-3 shadow-sm',
                swatch.className,
                swatch.invert ? 'text-primary-foreground' : 'text-foreground',
              )}
            >
              <div
                className={cn(
                  'text-sm font-medium',
                  swatch.invert ? 'text-white' : 'text-foreground',
                )}
              >
                {swatch.name}
              </div>
              <div
                className={cn('text-xs', swatch.invert ? 'text-white/80' : 'text-muted-foreground')}
              >
                {cssVarToHex(swatch.token)}
              </div>
              <div
                className={cn(
                  'text-[11px]',
                  swatch.invert ? 'text-white/60' : 'text-muted-foreground/80',
                )}
              >
                {swatch.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
