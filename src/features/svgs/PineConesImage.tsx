export default function PineConesImage() {
  return (
    <svg width="200" height="200" viewBox="-100 -100 200 200">
      <defs>
        <g id="pinecone">
          <polygon points="-10,0 10,0 0,-50" fill="#38755b" />
          <line x1="0" y1="0" x2="0" y2="10" stroke="#778074" strokeWidth="2" />
        </g>
      </defs>
      <rect x="-100" y="-100" width="200" height="200" fill="#F1DBC3" />
      <circle cx="0" cy="380" r="350" fill="#F8F4E8" />
      <use xlinkHref="#pinecone" transform="scale(2.2)" x="-30" y="30" />
      <use xlinkHref="#pinecone" transform="scale(1.2)" x="-25" y="20" />
      <use xlinkHref="#pinecone" transform="scale(1.5)" x="10" y="15" />
      <use xlinkHref="#pinecone" transform="scale(2)" x="30" y="25" />
    </svg>
  );
}
