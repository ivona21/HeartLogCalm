export type ArcParams = {
  startX: number;
  startY: number;
  radius: number;
  largeArcFlag: 0 | 1;
  sweepFlag: 0 | 1;
  endX: number;
  endY: number;
};

export default function buildArc({
  startX,
  startY,
  radius,
  largeArcFlag,
  sweepFlag,
  endX,
  endY,
}: ArcParams) {
  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
}

export function updateArcFlags(
  params: ArcParams,
  flags: Partial<Pick<ArcParams, 'largeArcFlag' | 'sweepFlag'>>,
) {
  return buildArc({
    ...params,
    ...flags,
  });
}
