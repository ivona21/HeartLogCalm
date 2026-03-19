import type { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';
import type {
  CoreSegment,
  SecondarySegment,
  TertiarySegment,
} from '@/features/emotion-wheel/types/wheel-segment.ts';

export function computeWheelLayout(emotions: BackendCoreEmotion[]): CoreSegment[] {
  const coreSpan = 360 / emotions.length;
  const startOffset = -(coreSpan / 2);

  return emotions.map((core, coreIndex): CoreSegment => {
    const coreStart = startOffset + coreIndex * coreSpan;
    const coreEnd = coreStart + coreSpan;
    const secondarySpan = coreSpan / core.children.length;

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
