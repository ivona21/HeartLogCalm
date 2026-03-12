export default function generateRandomHex() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${hex.padStart(6, '0')}`;
}

export function lightenHex(hex: string, percent: number = 50): string {
  // remove #
  hex = hex.replace('#', '');

  const r: number = parseInt(hex.substring(0, 2), 16);
  const g: number = parseInt(hex.substring(2, 4), 16);
  const b: number = parseInt(hex.substring(4, 6), 16);

  const amount: number = percent / 100;

  const newR: number = Math.round(r + (255 - r) * amount);
  const newG: number = Math.round(g + (255 - g) * amount);
  const newB: number = Math.round(b + (255 - b) * amount);

  const toHex = (c: number): string => c.toString(16).padStart(2, '0');

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}
