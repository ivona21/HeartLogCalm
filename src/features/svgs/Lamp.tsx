export default function Lamp() {
  return (
    <svg height="200" width="200" viewBox="0 0 200 200">
      <g transform="translate(70, 170) rotate(-25)">
        <circle r="5" />
        <path stroke="black" strokeWidth="7" strokeLinecap="round" d="M 0 0 L 0 -70" />
        <g transform="translate(0, -70)">
          <g transform="rotate(50)">
            <circle r="5" />
            <path stroke="black" strokeWidth="7" strokeLinecap="round" d="M 0 0 L 0 -70" />
          </g>
        </g>
      </g>
      <ellipse cx="100" cy="175" rx="30" ry="5" />
      <ellipse cx="100" cy="170" rx="30" ry="5" fill="gray" />
    </svg>
  );
}
