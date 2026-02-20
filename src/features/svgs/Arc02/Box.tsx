import { Switch } from '@/components/ui/Switch.tsx';
import buildArc, { ArcParams } from '@/features/svgs/Arc02/helpers/arc-builder.ts';
import { useState } from 'react';

export type BoxProps = {
  bg: string;
  arcParams: ArcParams;
};

export default function Box({ bg, arcParams }: BoxProps) {
  const [arc, setArc] = useState<ArcParams>(arcParams);

  const toggleLong = () => {
    setArc((prev: ArcParams) => {
      return { ...prev, largeArcFlag: prev.largeArcFlag === 0 ? 1 : 0 };
    });
  };

  const toggleDirection = () => {
    setArc((prev: ArcParams) => {
      return { ...prev, sweepFlag: prev.sweepFlag === 0 ? 1 : 0 };
    });
  };

  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          Long
          <Switch onClick={() => toggleLong()} defaultChecked={Boolean(arc.largeArcFlag)} />
        </div>
        <div>
          Cws
          <Switch onClick={() => toggleDirection()} defaultChecked={Boolean(arc.sweepFlag)} />
        </div>
      </div>
      <svg height="100" width="100" viewBox="0 0 100 100" className={bg}>
        <path stroke="black" fill="none" d={buildArc(arc)} />
      </svg>
    </div>
  );
}
