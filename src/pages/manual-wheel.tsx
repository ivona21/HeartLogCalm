import ManualWheel from '@/features/svgs/ManualWheel.tsx';
import { useState } from 'react';

export default function ManualWheelPage() {
  const [angles, setAngles] = useState<number[]>([60, 120, 180, 240, 300, 360]);
  const getAngles = (numberOfSegments: number) => {
    const oneAngle = 360 / numberOfSegments;
    return Array.from({ length: numberOfSegments }).map((_, index, arr) => {
      return oneAngle * (index + 1);
    });
  };

  const handleNumberChange = (e: any) => {
    const numberOfSegments = Math.floor(e.target.value);
    setAngles(getAngles(numberOfSegments));
  };

  return (
    <div>
      <input type="number" onChange={handleNumberChange} />
      <svg height="1600" width="1600">
        <g transform="translate(500) scale(2)">
          <ManualWheel angles={angles} />
        </g>
      </svg>
    </div>
  );
}
