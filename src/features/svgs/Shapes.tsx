export default function Shapes() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <rect x="10" y="10" width="100" height="100" fill="blue" />
      <circle cx="60" cy="60" r="50" fill="red" />
      <polygon points="50,60 20,90 80,90" fill="green" />
      <path points="50,60 20,90 80,90" fill="yellow" />
    </svg>
  );
}
