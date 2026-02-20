import VisualGrid from '@/features/svgs/VisualGrid.tsx';

export default function ChristmasOrnament() {
  return (
    <svg height="200" width="200" viewBox="0 0 100 100">
      <VisualGrid />
      <g transform="translate(0, -20)">
        <circle cx="50" cy="70" r="30" fill="#D1495B" />
        <rect x="41" y="35" width="18" height="10" fill="#F79257" />
        <circle cx="50" cy="31" r="5" stroke="#F79257" fill="transparent" />
      </g>
    </svg>
  );
}
