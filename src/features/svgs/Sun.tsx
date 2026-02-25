export default function Sun() {
  return (
    <svg height="200" width="200" viewBox="-15 -15 30 30">
      <circle r="6" />
      <line
        id="ray"
        x1="0"
        x2="0"
        y1="14"
        y2="10"
        stroke="black"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <use xlinkHref="#ray" transform="rotate(45)" />
      <use xlinkHref="#ray" transform="rotate(90)" />
      <use xlinkHref="#ray" transform="rotate(135)" />
      <use xlinkHref="#ray" transform="rotate(180)" />
      <use xlinkHref="#ray" transform="rotate(-45)" />
      <use xlinkHref="#ray" transform="rotate(-90)" />
      <use xlinkHref="#ray" transform="rotate(-135)" />
    </svg>
  );
}
