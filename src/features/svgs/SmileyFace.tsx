import { useState } from 'react';

export default function SmileyFace() {
  const [smile, setSmimle] = useState(true);

  const toggleSmile = () => {
    setSmimle((prev) => !prev);
  };

  return (
    <svg height="100" width="100">
      <circle cx={50} cy={50} r={45} fill="transparent" stroke="black" onClick={toggleSmile} />
      <ellipse cx={35} cy={35} rx="5" ry="10" />
      <ellipse cx={65} cy={35} rx="5" ry="10" />
      {smile && <path stroke="red" strokeWidth="2" fill="none" d="M 40,70 Q 50,80 60,70" />}
      {!smile && <path stroke="red" strokeWidth="2" fill="none" d="M 40 70 Q 50 60 60 70" />}
    </svg>
  );
}
