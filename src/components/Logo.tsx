import LogoComplexFullSmallImage from '@/assets/LogoComplexFullSmall.png';
import LogoComplexSmallImage from '@/assets/LogoComplexSmall.png';
import LogoSimpleImage from '@/assets/LogoSimpleWithText.png';
import LogoIconImage from '@/assets/LogoSimpleNoText.png';

interface LogoProps {
  variant?: 'complexFull' | 'complex' | 'simple' | 'icon';
  className?: string;
}

const LOGO_MAP = {
  complexFull: { src: LogoComplexFullSmallImage, alt: 'HeartLog - Emotion Logger' },
  complex: { src: LogoComplexSmallImage, alt: 'HeartLog' },
  simple: { src: LogoSimpleImage, alt: 'HeartLog' },
  icon: { src: LogoIconImage, alt: 'HeartLog' },
};

export function Logo({ variant = 'simple', className = '' }: LogoProps) {
  const { src, alt } = LOGO_MAP[variant];
  return <img src={src} alt={alt} className={className} />;
}
