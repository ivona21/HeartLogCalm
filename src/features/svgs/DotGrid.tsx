export default function DotGrid() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <line
          key={num.toString()}
          stroke="gray"
          strokeOpacity="10%"
          x1="0"
          y1={num * 10}
          x2="100"
          y2={num * 10}
        />
      ))}
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <line
          key={num.toString()}
          stroke="gray"
          strokeOpacity="10%"
          x1={num * 10}
          y1="0"
          x2={num * 10}
          y2="100"
        />
      ))}
      {Array.from({ length: 5 }, (_, i) => i * 20).map((numi) => {
        return Array.from({ length: 5 }, (_, j) => j * 20).map((numj) => {
          return (
            <circle
              key={numj.toString() + numi.toString()}
              cx={10 + numj}
              cy={10 + numi}
              r="10"
              fill="none"
              stroke="black"
            />
          );
        });
      })}
    </svg>
  );
}
