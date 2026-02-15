export default function SmileyFace() {
  return (
    <svg height="100" width="100">
      <circle cx={50} cy={50} r={45} fill="none" stroke="black" />
      <ellipse cx={35} cy={35} rx="5" ry="10" />
      <ellipse cx={65} cy={35} rx="5" ry="10" />
      <path stroke="red" strokeWidth="2" fill="none" d="M 40,60 Q 50,70 60,60" />
    </svg>
  );
}
