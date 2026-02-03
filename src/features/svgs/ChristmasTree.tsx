export default function ChristmasTree() {
  return (
    <svg height="800" width="400" viewBox="-100 -200 200 400">
      <circle cx="0" cy="0" r="1" fill="black" />
      <polygon fill="green" points="-30,0 30,0 0,-30" />
      <polygon fill="lightgreen" points="-25,-10 25,-10 0,-50" />
      <polygon fill="green" points="-20,-30 20,-30 0,-70" />
      <rect x="-5" y="0" width="10" height="15" fill="saddlebrown" />
    </svg>
  );
}
