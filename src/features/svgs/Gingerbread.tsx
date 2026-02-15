export default function Gingerbread() {
  const gingerbreadColor = '#cd803d';
  const moveTop = 20;
  return (
    <svg height="200" width="200" viewBox="0 0 200 200">
      <circle cx="100" cy={70 - moveTop} r="30" fill={gingerbreadColor} />
      <line
        stroke={gingerbreadColor}
        strokeWidth="40"
        strokeLinecap="round"
        x1="50"
        y1={115 - moveTop}
        x2="150"
        y2={115 - moveTop}
      />
      <line
        stroke={gingerbreadColor}
        strokeWidth="40"
        strokeLinecap="round"
        x1="70"
        y1={170}
        x2="100"
        y2={115}
      />
      <line
        stroke={gingerbreadColor}
        strokeWidth="40"
        strokeLinecap="round"
        x1="130"
        y1={170}
        x2="100"
        y2={115}
      />
    </svg>
  );
}
