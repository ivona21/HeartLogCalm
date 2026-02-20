export default function VisualGrid() {
  return (
    <>
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
    </>
  );
}
