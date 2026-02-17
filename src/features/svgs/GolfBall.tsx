import { useState } from 'react';

export default function GolfBall() {
  const [circleY, setCircleY] = useState(0);

  const handleMove = () => {
    setCircleY(20);
  };
  return (
    <>
      <svg height="100" width="100" viewBox="0 0 100 100">
        <g stroke="black" strokeWidth="2" transform={`translate(0, ${circleY})`}>
          <circle cx="20" cy="50" fill="transparent" r="15"></circle>
          <circle cx="80" cy="50" fill="black" r="15"></circle>
        </g>
      </svg>
      <button onClick={() => handleMove()}>Move them</button>
    </>
  );
}
