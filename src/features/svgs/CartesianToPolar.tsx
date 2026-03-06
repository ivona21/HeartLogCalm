import VisualGrid from '@/features/svgs/VisualGrid.tsx';

//todo - refactor this
function DotAndLine({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="2" fill="red" />
      <path d={`M 100 100 L ${x} ${y}`} stroke="black" strokeWidth="1" />
    </g>
  );
}

export function OneDot() {
  const getCartesianFromPolar = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    console.log(`angleInDegrees: ${angleInDegrees}, angleInRadians: ${angleInRadians}`);
    const x = centerX + radius * Math.cos(angleInRadians);
    const y = centerY + radius * Math.sin(angleInRadians);
    return { x, y };
  };

  const centerX = 100;
  const centerY = 100;
  const radiusSmall = 60;
  const radiusBig = 80;
  const angleInDegrees0 = 0;
  const angleInDegrees90 = 90;
  const angleInDegrees180 = 180;
  const angleInDegrees270 = 270;

  const { x: x0, y: y0 } = getCartesianFromPolar(centerX, centerY, radiusSmall, angleInDegrees0);
  const { x: x90, y: y90 } = getCartesianFromPolar(centerX, centerY, radiusSmall, angleInDegrees90);
  const { x: x180, y: y180 } = getCartesianFromPolar(
    centerX,
    centerY,
    radiusSmall,
    angleInDegrees180,
  );
  const { x: x270, y: y270 } = getCartesianFromPolar(
    centerX,
    centerY,
    radiusSmall,
    angleInDegrees270,
  );

  return (
    <svg height="200" width="200" viewBox="0 0 200 200" className="bg-amber-50">
      <g transform="scale(2)">
        <VisualGrid />
      </g>
      <circle cx={x0} cy={y0} r="5" fill="black" />
      <circle cx={x90} cy={y90} r="5" fill="black" />
      <circle cx={x180} cy={y180} r="5" fill="black" />
      <circle cx={x270} cy={y270} r="5" fill="black" />
      <circle cx="100" cy="100" r={radiusSmall} fill="none" stroke="black" />
      <circle cx="100" cy="100" r={radiusBig} fill="none" stroke="black" />
      {Array.from({ length: 360 / 45 }).map((_, i) => {
        const angle = i * 45;
        const { x, y } = getCartesianFromPolar(centerX, centerY, radiusSmall, angle);

        return <DotAndLine key={angle} x={x} y={y} />;
      })}
      {Array.from({ length: 360 / 45 }).map((_, i) => {
        const angle = i * 45;
        const { x, y } = getCartesianFromPolar(centerX, centerY, radiusBig, angle);

        return <DotAndLine key={angle} x={x} y={y} />;
      })}
    </svg>
  );
}
