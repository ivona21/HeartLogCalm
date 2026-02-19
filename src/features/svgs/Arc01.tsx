export default function Arc01() {
  return (
    <svg height="200" width="200" viewBox="0 0 200 200">
      <path
        transform="translate(50, 0)"
        d="
        M 75 76
        A 25 50 100 1 1 75 75"
        stroke="black"
        fill="none"
      />
    </svg>
  );

  // A rx ry rotation large-arc-flag sweep-flag x y
  // moj zadatak - napraviti puni krug sa arcs samo
}
