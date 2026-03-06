import VisualGrid from '@/features/svgs/VisualGrid.tsx';
import cartesianFromPolar from '@/features/svgs/helpers/cartesianFromPolar.ts';

export default function ManualWheel() {
  const { x, y } = cartesianFromPolar(100, 100, 60, -60);

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <svg height="200" width="200" viewBox="0 0 200 200">
      <g transform="scale(2)">
        <VisualGrid />
      </g>
      <path
        onClick={() => handleClick()}
        fill="red"
        stroke="black"
        strokeWidth="1"
        d={`M 100 100 L 160 100 A 60 60 0 0 0 ${x} ${y} Z`}
      />
      <text
        x="100"
        y="100"
        fontSize="16"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        transform="translate(30, -20) rotate(-20, 100, 100)"
      >
        Hello
      </text>
    </svg>
  );
}
