import ChristmasTree from '@/features/svgs/ChristmasTree.tsx';

export default function Drawings() {
  return (
    <div>
      <h1>My space for drawings</h1>
      <svg width={400} height={400} viewBox="-0 0 100 100">
        <circle cx="50" cy="50" r="25" fill="red" />
      </svg>
      <ChristmasTree />
    </div>
  );
}
