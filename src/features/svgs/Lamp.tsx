export default function Lamp() {
  return (
    <svg height="200" width="200" viewBox="0 0 200 200">
      <defs>
        <g id="lamp-arm">
          <circle r="5" />
          <path stroke="black" strokeWidth="7" strokeLinecap="round" d="M 0 0 L 0 -70" />
        </g>
        <g id="lamp-arm-short">
          <circle r="5" />
          <path stroke="black" strokeWidth="7" strokeLinecap="round" d="M 0 0 L 0 -30" />
        </g>
      </defs>
      <g transform="translate(70, 170) rotate(-25)">
        <use xlinkHref="#lamp-arm" />
        <g transform="translate(0, -70) rotate(50)">
          <use xlinkHref="#lamp-arm" />
          <g transform="translate(0, -70) rotate(50)">
            <use xlinkHref="#lamp-arm-short" />
          </g>
        </g>
      </g>
      <ellipse cx="100" cy="175" rx="30" ry="5" />
      <ellipse cx="100" cy="170" rx="30" ry="5" fill="gray" />
    </svg>
  );
}
