export const toRad = (deg: number): number => (deg * Math.PI) / 180;

export const getMidAngle = (start: number, end: number): number =>
  (start + end) / 2;

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
