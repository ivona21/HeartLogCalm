export default function Snowflake() {
  return (
    <svg height="200" width="200" viewBox="-100 -100 200 200">
      <path
        id="snowlake-arm"
        d="M 0 0 L 0 -90 M 0 -20 L 20 -34 M 0 -20 L -20 -34 M 0 -40 L 20 -54 M 0 -40 L -20 -54 M 0 -60 L 20 -74 M 0 -60 L -20 -74"
        stroke="#E5C39C"
        strokeWidth="5"
      />
      <use xlinkHref="#snowlake-arm" transform="rotate(60)" />
      <use xlinkHref="#snowlake-arm" transform="rotate(120)" />
      <use xlinkHref="#snowlake-arm" transform="rotate(180)" />
      <use xlinkHref="#snowlake-arm" transform="rotate(240)" />
      <use xlinkHref="#snowlake-arm" transform="rotate(300)" />
    </svg>
  );
}
