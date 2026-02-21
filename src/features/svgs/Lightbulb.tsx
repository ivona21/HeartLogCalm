import VisualGrid from '@/features/svgs/VisualGrid.tsx';

export default function Lightbulb() {
  return (
    <svg height="200" width="200" viewBox="0 0 200 200">
      <g transform="scale(2)">
        <VisualGrid />
      </g>
      <path
        stroke="black"
        strokeWidth="10"
        fill="gold"
        strokeLinecap="round"
        d="M 60, 120 A 50 50 0 1 1 140 120 Q 120 130 120 160 L 80 160 Q 80 130 60 120 M 80 175 L 120 175 M 90 190 L 110 190 M 70 80 A 30 30 0 0 1 90 60"
      />
    </svg>
  );
}
