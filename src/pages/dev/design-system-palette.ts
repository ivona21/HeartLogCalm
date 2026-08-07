export type PaletteSwatch = {
  name: string;
  className: string;
  label: string;
  hex: string;
  invert?: boolean;
};

export const paletteSwatches: readonly PaletteSwatch[] = [
  { name: 'Background', className: 'bg-background', label: 'bg-background', hex: '#faf8fc' },
  {
    name: 'Foreground',
    className: 'bg-foreground',
    label: 'bg-foreground',
    hex: '#363249',
    invert: true,
  },
  { name: 'Border', className: 'bg-border', label: 'bg-border', hex: '#ded8e9' },
  { name: 'Card', className: 'bg-card', label: 'bg-card', hex: '#fcfbfd' },
  {
    name: 'Primary',
    className: 'bg-primary',
    label: 'bg-primary',
    hex: '#9579d8',
    invert: true,
  },
  {
    name: 'Primary hover',
    className: 'bg-primary-hover',
    label: 'bg-primary-hover',
    hex: '#8665d2',
    invert: true,
  },
  { name: 'Secondary', className: 'bg-secondary', label: 'bg-secondary', hex: '#EFE4D6' },
  { name: 'Accent', className: 'bg-accent', label: 'bg-accent', hex: '#A8C3A0' },
  {
    name: 'Success',
    className: 'bg-success',
    label: 'bg-success',
    hex: '#5FAF72',
    invert: true,
  },
  { name: 'Warning', className: 'bg-warning', label: 'bg-warning', hex: '#D9A441' },
  { name: 'Muted', className: 'bg-muted', label: 'bg-muted', hex: '#f1eef7' },
  {
    name: 'Destructive',
    className: 'bg-destructive',
    label: 'bg-destructive',
    hex: '#e14747',
    invert: true,
  },
  { name: 'Popover', className: 'bg-popover', label: 'bg-popover', hex: '#fcfbfd' },
  { name: 'Sidebar', className: 'bg-sidebar', label: 'bg-sidebar', hex: '#f5f1f9' },
];
