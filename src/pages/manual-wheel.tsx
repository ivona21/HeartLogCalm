import ManualWheel from '@/features/svgs/ManualWheel.tsx';

export default function ManualWheelPage() {
  return (
    <div>
      <svg height="1600" width="1600">
        <g transform="translate(500) scale(2)">
          <ManualWheel />
        </g>
      </svg>
    </div>
  );
}
