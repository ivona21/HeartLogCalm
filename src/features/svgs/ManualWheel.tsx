import VisualGrid from '@/features/svgs/VisualGrid.tsx';
import cartesianFromPolar from '@/features/svgs/helpers/cartesianFromPolar.ts';
import generateRandomHex, { lightenHex } from '@/features/svgs/helpers/generateRandomHex.ts';
import { useState } from 'react';

export default function ManualWheel() {
  const center = 100;
  const radius = 60;
  const angles = [60, 120, 180, 240, 300, 360];
  const [colors, setColors] = useState<string[]>(() =>
    Array.from({ length: 6 }, generateRandomHex),
  );

  const changeColorToLighter = (color: string) => {
    return lightenHex(color);
  };

  const onSegmentClick = (index: number) => {
    const newColor = changeColorToLighter(colors[index]);
    setColors((prev) => {
      const copy = [...prev];
      copy[index] = newColor;
      return copy;
    });
  };

  return (
    <svg height="200" width="200" viewBox="0 0 200 200">
      <g transform="scale(2)">
        <VisualGrid />
      </g>
      {angles.map((angle, index) => {
        const currentCoordinates = cartesianFromPolar(center, center, radius, angle);
        const previusCoordinats =
          index - 1 >= 0
            ? cartesianFromPolar(center, center, radius, angles[index - 1])
            : { x: 160, y: 100 };

        return (
          <path
            onClick={() => {
              onSegmentClick(index);
            }}
            key={angle}
            fill={colors[index]}
            stroke="black"
            strokeWidth="1"
            d={`M ${center} ${center} L ${previusCoordinats.x} ${previusCoordinats.y} A ${radius} ${radius} 0 0 1 ${currentCoordinates.x} ${currentCoordinates.y} Z`}
          />
        );
      })}
    </svg>
  );
}
