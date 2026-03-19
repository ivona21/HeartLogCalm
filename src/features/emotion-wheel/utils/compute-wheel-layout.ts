import type { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';
import type {
  CoreSegment,
  SecondarySegment,
  TertiarySegment,
} from '@/features/emotion-wheel/types/wheel-segment.ts';

export function computeWheelLayout(emotions: BackendCoreEmotion[]): CoreSegment[] {
  const totalSecondary = emotions.reduce((sum, core) => sum + core.children.length, 0);
  const secondarySpan = 360 / totalSecondary;
  const startOffset = -(emotions[0].children.length * secondarySpan) / 2;

  let runningAngle = startOffset;

  return emotions.map((core): CoreSegment => {
    const coreSpan = core.children.length * secondarySpan;
    const coreStart = runningAngle;
    const coreEnd = coreStart + coreSpan;
    runningAngle = coreEnd;

    const children: SecondarySegment[] = core.children.map(
      (secondary, secIndex): SecondarySegment => {
        const secStart = coreStart + secIndex * secondarySpan;
        const secEnd = secStart + secondarySpan;
        const tertiarySpan = secondarySpan / secondary.children.length;

        const grandchildren: TertiarySegment[] = secondary.children.map(
          (tertiary, terIndex): TertiarySegment => ({
            id: tertiary.id,
            label: tertiary.label,
            coreColor: core.color,
            startAngle: secStart + terIndex * tertiarySpan,
            endAngle: secStart + (terIndex + 1) * tertiarySpan,
          }),
        );

        return {
          id: secondary.id,
          label: secondary.label,
          coreColor: core.color,
          startAngle: secStart,
          endAngle: secEnd,
          children: grandchildren,
        };
      },
    );

    return {
      id: core.id,
      label: core.label,
      color: core.color,
      startAngle: coreStart,
      endAngle: coreEnd,
      children,
    };
  });
}
