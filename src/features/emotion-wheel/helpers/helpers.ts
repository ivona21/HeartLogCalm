export const toRad = (deg: number): number => (deg * Math.PI) / 180;

export const getMidAngle = (start: number, end: number): number => (start + end) / 2;

type WheelRing = 'core' | 'secondary' | 'tertiary' | 'selection';

const WHEEL_RING_ADJUSTMENTS: Record<WheelRing, { lightness: number; chromaBoost: number }> = {
  core: { lightness: -0.03, chromaBoost: 0.06 },
  secondary: { lightness: -0.06, chromaBoost: 0.12 },
  tertiary: { lightness: -0.1, chromaBoost: 0.18 },
  selection: { lightness: -0.01, chromaBoost: 0.08 },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeHex(hex: string): string {
  const trimmed = hex.trim();
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  return trimmed.toLowerCase();
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = normalizeHex(hex);
  const match = normalized.match(/^#([0-9a-f]{6})$/i);

  if (!match) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const value = match[1];
  return {
    r: Number.parseInt(value.slice(0, 2), 16) / 255,
    g: Number.parseInt(value.slice(2, 4), 16) / 255,
    b: Number.parseInt(value.slice(4, 6), 16) / 255,
  };
}

function srgbToLinear(value: number): number {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(value: number): number {
  return value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055;
}

function rgbToOklab(hex: string): { l: number; a: number; b: number } {
  const { r, g, b } = hexToRgb(hex);
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);

  return {
    l: 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot,
    a: 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot,
    b: 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot,
  };
}

function oklabToHex(l: number, a: number, b: number): string {
  const lRoot = l + 0.3963377774 * a + 0.2158037573 * b;
  const mRoot = l - 0.1055613458 * a - 0.0638541728 * b;
  const sRoot = l - 0.0894841775 * a - 1.291485548 * b;

  const lLinear = lRoot ** 3;
  const mLinear = mRoot ** 3;
  const sLinear = sRoot ** 3;

  const r = 4.0767416621 * lLinear - 3.3077115913 * mLinear + 0.2309699292 * sLinear;
  const g = -1.2684380046 * lLinear + 2.6097574011 * mLinear - 0.3413193965 * sLinear;
  const bValue = -0.0041960863 * lLinear - 0.7034186147 * mLinear + 1.707614701 * sLinear;

  const toHex = (value: number) =>
    Math.round(clamp(linearToSrgb(value), 0, 1) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(bValue)}`;
}

function oklabToOklch(l: number, a: number, b: number): { l: number; c: number; h: number } {
  const c = Math.sqrt(a * a + b * b);
  const h = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
  return { l, c, h };
}

function oklchToOklab(l: number, c: number, h: number): { l: number; a: number; b: number } {
  const hue = toRad(h);
  return {
    l,
    a: c * Math.cos(hue),
    b: c * Math.sin(hue),
  };
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const toChannel = (value: number) => {
    const linear = srgbToLinear(value);
    return linear;
  };

  return 0.2126 * toChannel(r) + 0.7152 * toChannel(g) + 0.0722 * toChannel(b);
}

function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getWheelDisplayColor(hex: string, ring: WheelRing, isDarkTheme: boolean): string {
  if (!isDarkTheme) {
    return normalizeHex(hex);
  }

  const { l, a, b } = rgbToOklab(hex);
  const { c, h } = oklabToOklch(l, a, b);
  const adjustment = WHEEL_RING_ADJUSTMENTS[ring];

  const nextL = clamp(l + adjustment.lightness, 0.22, 0.88);
  const nextC = clamp(c * (1 + adjustment.chromaBoost), 0, 0.32);

  const adjusted = oklchToOklab(nextL, nextC, h);
  return oklabToHex(adjusted.l, adjusted.a, adjusted.b);
}

export function getReadableWheelTextColor(backgroundHex: string, isDarkTheme: boolean): string {
  if (!isDarkTheme) {
    return 'hsl(var(--foreground))';
  }

  const lightText = '#f6f2fb';
  const darkText = '#18131f';
  return contrastRatio(lightText, backgroundHex) >= contrastRatio(darkText, backgroundHex)
    ? lightText
    : darkText;
}

export function buildTextArcPath(
  startDeg: number,
  endDeg: number,
  radius: number,
  reversed: boolean,
): string {
  const sx = (radius * Math.sin(toRad(startDeg))).toFixed(3);
  const sy = (-radius * Math.cos(toRad(startDeg))).toFixed(3);
  const ex = (radius * Math.sin(toRad(endDeg))).toFixed(3);
  const ey = (-radius * Math.cos(toRad(endDeg))).toFixed(3);
  const span = Math.abs(endDeg - startDeg);
  const large = span > 180 ? 1 : 0;

  if (reversed) {
    return `M ${ex} ${ey} A ${radius} ${radius} 0 ${large} 0 ${sx} ${sy}`;
  }
  return `M ${sx} ${sy} A ${radius} ${radius} 0 ${large} 1 ${ex} ${ey}`;
}

export function tintColor(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const tr = Math.round(r + (255 - r) * factor);
  const tg = Math.round(g + (255 - g) * factor);
  const tb = Math.round(b + (255 - b) * factor);
  return `#${tr.toString(16).padStart(2, '0')}${tg.toString(16).padStart(2, '0')}${tb.toString(16).padStart(2, '0')}`;
}

export function radialTextTransform(midDeg: number, radius: number): string {
  const x = radius * Math.sin(toRad(midDeg));
  const y = -radius * Math.cos(toRad(midDeg));
  const norm = ((midDeg % 360) + 360) % 360;
  const rot = norm > 180 && norm < 360 ? norm + 90 : norm - 90;
  return `translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rot.toFixed(2)})`;
}

export function keyToId(key: string): string {
  return key.replace(/\./g, '-');
}
