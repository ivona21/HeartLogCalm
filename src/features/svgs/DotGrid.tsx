import VisualGrid from '@/features/svgs/VisualGrid.tsx';
import { useState } from 'react';
import { useColorStore } from '@/features/svgs/stores/useColorStore.ts';

export default function DotGrid() {
  const color = useColorStore((state) => state.color);
  const [circles, setCircles] = useState(() => {
    return Array.from({ length: 5 }, (_, row) =>
      Array.from({ length: 5 }, (_, col) => ({
        id: `${row}-${col}`,
        cx: 10 + col * 20,
        cy: 10 + row * 20,
        color: 'black',
      })),
    ).flat();
  });

  const changeCircleColor = (id: string) => {
    setCircles((prev) => prev.map((c) => (c.id === id ? { ...c, color } : c)));
  };

  return (
    <svg width="204" height="204" viewBox="0 0 204 204">
      <g transform="scale(2) translate(1, 1)">
        <VisualGrid />
        {circles.map((circle) => (
          <circle
            key={circle.id}
            cx={circle.cx}
            cy={circle.cy}
            r="10"
            fill={circle.color}
            stroke="black"
            onClick={() => changeCircleColor(circle.id)}
          />
        ))}
      </g>
    </svg>
  );
}
