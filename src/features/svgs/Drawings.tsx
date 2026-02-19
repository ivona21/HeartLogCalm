import ChristmasOrnament from '@/features/svgs/ChristmasOrnament.tsx';
import Gingerbread from '@/features/svgs/Gingerbread.tsx';
import Shapes from '@/features/svgs/Shapes.tsx';
import HamburgerIcon from '@/features/svgs/HamburgerIcon.tsx';
import HeartIcon from '@/features/svgs/HeartIcon.tsx';
import SmileyFace from '@/features/svgs/SmileyFace.tsx';
import DotGrid from '@/features/svgs/DotGrid.tsx';
import ProfileIcon from '@/features/svgs/ProfileIcon.tsx';
import ConcentricCircles from '@/features/svgs/ConcetricCircles.tsx';
import ChristmasTree from '@/features/svgs/ChristmasTree.tsx';
import SmallSquare from '@/features/svgs/SmallSquare.tsx';
import GolfBall from '@/features/svgs/GolfBall.tsx';
import Bear from '@/features/svgs/Bear.tsx';
import Arc01 from '@/features/svgs/Arc01.tsx';
import Moon from '@/features/svgs/Moon.tsx';
import CandyCane from '@/features/svgs/CandyCane.tsx';

export default function Drawings() {
  // todo - make tabs here :)
  return (
    <div className="grid grid-cols-5 gap-4">
      <ChristmasTree />
      <SmallSquare />
      <ChristmasOrnament />
      <Gingerbread />
      <Shapes />
      <HamburgerIcon />
      <HeartIcon />
      <SmileyFace />
      <DotGrid />
      <ProfileIcon />
      <ConcentricCircles />
      <GolfBall />
      <Bear />
      <Arc01 />
      <Moon />
      <CandyCane />
    </div>
  );
}
