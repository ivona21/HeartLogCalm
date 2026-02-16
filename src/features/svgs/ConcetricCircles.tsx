import { useState } from 'react';

export default function ConcentricCircles() {
  const [showMiddleCircle, setShowMiddleCircle] = useState(false);
  const [showLastCircle, setShowLastCircle] = useState(false);
  const [centralCircleColor, setCentralCircleColor] = useState('transparent');

  const toggleMiddleCircle = () => {
    setShowMiddleCircle((prev) => !prev);
  };

  const toggleLastCircle = () => {
    setShowLastCircle((prev) => !prev);
  };

  const handleCentralCircleClick = () => {
    setCentralCircleColor('red');
    toggleMiddleCircle();
  };

  return (
    <svg height="200" width="200" viewBox="0 0 200 200">
      {showLastCircle && showMiddleCircle && (
        <circle cx="100" cy="100" r="80" fill="none" stroke="black" />
      )}
      {showMiddleCircle && (
        <circle
          cx="100"
          cy="100"
          r="50"
          fill="black"
          stroke="black"
          onClick={() => toggleLastCircle()}
        />
      )}
      <circle
        cx="100"
        cy="100"
        r="20"
        fill={centralCircleColor}
        stroke="black"
        onClick={() => handleCentralCircleClick()}
      />
    </svg>
  );
}
