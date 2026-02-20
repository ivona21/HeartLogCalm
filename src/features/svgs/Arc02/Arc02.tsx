import Box from '@/features/svgs/Arc02/Box.tsx';

export default function Arc02() {
  return (
    <div className="grid grid-cols-2">
      <Box
        bg="bg-green-100"
        arcParams={{
          startX: 50,
          startY: 25,
          radius: 25,
          sweepFlag: 0,
          largeArcFlag: 0,
          endX: 25,
          endY: 50,
        }}
      />
      <Box
        bg="bg-blue-100"
        arcParams={{
          startX: 25,
          startY: 50,
          radius: 25,
          sweepFlag: 0,
          largeArcFlag: 0,
          endX: 50,
          endY: 75,
        }}
      />

      <Box
        bg="bg-pink-200"
        arcParams={{
          startX: 50,
          startY: 25,
          radius: 25,
          sweepFlag: 0,
          largeArcFlag: 0,
          endX: 50,
          endY: 75,
        }}
      />

      <Box
        bg="bg-yellow-100"
        arcParams={{
          startX: 50,
          startY: 75,
          radius: 25,
          sweepFlag: 0,
          largeArcFlag: 0,
          endX: 75,
          endY: 50,
        }}
      />

      <Box
        bg="bg-purple-200"
        arcParams={{
          startX: 50,
          startY: 25,
          radius: 25,
          sweepFlag: 0,
          largeArcFlag: 1,
          endX: 75,
          endY: 50,
        }}
      />

      <Box
        bg="bg-orange-200"
        arcParams={{
          startX: 75,
          startY: 50,
          radius: 25,
          sweepFlag: 0,
          largeArcFlag: 0,
          endX: 50,
          endY: 25,
        }}
      />
    </div>
  );
}
