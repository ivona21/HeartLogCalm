export type PaletteSwatch = {
  name: string;
  className: string;
  label: string;
  token: string;
  invert?: boolean;
};

export const paletteSwatches: readonly PaletteSwatch[] = [
  {
    name: 'Background',
    className: 'bg-background',
    label: 'var(--background)',
    token: '--background',
  },
  {
    name: 'Foreground',
    className: 'bg-foreground',
    label: 'var(--foreground)',
    token: '--foreground',
    invert: true,
  },
  { name: 'Border', className: 'bg-border', label: 'var(--border)', token: '--border' },
  { name: 'Card', className: 'bg-card', label: 'var(--card)', token: '--card' },
  {
    name: 'Primary',
    className: 'bg-primary',
    label: 'var(--primary)',
    token: '--primary',
    invert: true,
  },
  {
    name: 'Primary hover',
    className: 'bg-primary-hover',
    label: 'var(--primary-hover)',
    token: '--primary-hover',
    invert: true,
  },
  { name: 'Secondary', className: 'bg-secondary', label: 'var(--secondary)', token: '--secondary' },
  { name: 'Accent', className: 'bg-accent', label: 'var(--accent)', token: '--accent' },
  {
    name: 'Success',
    className: 'bg-success',
    label: 'var(--success)',
    token: '--success',
    invert: true,
  },
  { name: 'Warning', className: 'bg-warning', label: 'var(--warning)', token: '--warning' },
  { name: 'Muted', className: 'bg-muted', label: 'var(--muted)', token: '--muted' },
  {
    name: 'Destructive',
    className: 'bg-destructive',
    label: 'var(--destructive)',
    token: '--destructive',
    invert: true,
  },
  { name: 'Popover', className: 'bg-popover', label: 'var(--popover)', token: '--popover' },
  { name: 'Sidebar', className: 'bg-sidebar', label: 'var(--sidebar)', token: '--sidebar' },
];
