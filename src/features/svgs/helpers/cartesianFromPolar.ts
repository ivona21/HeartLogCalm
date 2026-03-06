export default function cartesianFromPolar(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  console.log(`angleInDegrees: ${angleInDegrees}, angleInRadians: ${angleInRadians}`);
  const x = centerX + radius * Math.cos(angleInRadians);
  const y = centerY + radius * Math.sin(angleInRadians);
  return { x, y };
}
