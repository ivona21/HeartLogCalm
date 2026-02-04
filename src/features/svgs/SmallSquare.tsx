import { useState } from 'react';

export default function SmallSquare() {
  const [color, setColor] = useState<string>('blue');

  const turnAllRed = () => {
    setColor('red');
  };

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {[0, 20, 40, 60, 80].map((i) => (
        <rect key={i} width="20" height="20" fill={color} x={i} y={i} onClick={turnAllRed} />
      ))}
    </svg>
  );
}
