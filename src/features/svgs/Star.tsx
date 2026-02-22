import VisualGrid from '@/features/svgs/VisualGrid.tsx';

export default function Star() {
  return (
    <svg height="200" width="200" viewBox="0 0 200 200">
      <g transform="scale(2)">
        <VisualGrid />
      </g>
      <g transform="translate(0, 35)">
        <g>
          <polygon points="100,60 80,30 100,0" fill="#EDD8B7" />
          <polygon
            transform="translate(200, 0) scale(-1, 1)"
            points="100,60 80,30 100,0"
            fill="#E5C39C"
          />
        </g>
        <g transform="translate(-40, -25) rotate(72, 100, 100)">
          <polygon points="100,60 80,30 100,0" fill="#EDD8B7" />
          <polygon
            transform="translate(200, 0) scale(-1, 1)"
            points="100,60 80,30 100,0"
            fill="#E5C39C"
          />
        </g>
        <g transform="translate(-25, -70) rotate(144, 100, 100)">
          <polygon points="100,60 80,30 100,0" fill="#EDD8B7" />
          <polygon
            transform="translate(200, 0) scale(-1, 1)"
            points="100,60 80,30 100,0"
            fill="#E5C39C"
          />
        </g>
        <g transform="translate(40, -25) rotate(-72, 100, 100)">
          <polygon points="100,60 80,30 100,0" fill="#EDD8B7" />
          <polygon
            transform="translate(200, 0) scale(-1, 1)"
            points="100,60 80,30 100,0"
            fill="#E5C39C"
          />
        </g>
        <g transform="translate(25, -70) rotate(-144, 100, 100)">
          <polygon points="100,60 80,30 100,0" fill="#EDD8B7" />
          <polygon
            transform="translate(200, 0) scale(-1, 1)"
            points="100,60 80,30 100,0"
            fill="#E5C39C"
          />
        </g>
      </g>
    </svg>
  );
}
