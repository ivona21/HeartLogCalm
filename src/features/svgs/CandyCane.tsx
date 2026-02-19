export default function CandyCane() {
  return (
    <svg width="200" height="400" viewBox="-100 -200 200 400">
      <path
        d="
        M 50 120
        L 50 -80
        A 50 50 0 0 0 -50 -80"
        fill="none"
        stroke="black"
        strokeWidth="45"
        strokeLinecap="round"
      />

      <path
        d="
        M 50 120
        L 50 -80
        A 50 50 0 0 0 -50 -80"
        fill="none"
        stroke="red"
        strokeWidth="35"
        strokeLinecap="round"
      />

      <path
        d="
        M 50 120
        L 50 -80
        A 50 50 0 0 0 -50 -80"
        fill="none"
        stroke="white"
        strokeWidth="35"
        strokeDasharray="30 30"
      />
    </svg>
  );
}
