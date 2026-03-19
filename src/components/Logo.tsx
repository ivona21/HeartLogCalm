import LogoComplexImage from '@/assets/LogoComplex-optimized.png';
import LogoSimpleImage from '@/assets/LogoSimpleWithText.png';
import LogoIconImage from '@/assets/LogoSimpleNoText.png';

interface LogoProps {
  variant?: 'complex' | 'simple' | 'icon';
  className?: string;
}

const LOGO_MAP = {
  complex: { src: LogoComplexImage, alt: 'HeartLog - Emotion Logger' },
  simple:  { src: LogoSimpleImage,  alt: 'HeartLog' },
  icon:    { src: LogoIconImage,    alt: 'HeartLog' },
};

export function Logo({ variant = 'simple', className = '' }: LogoProps) {
  const { src, alt } = LOGO_MAP[variant];
  return <img src={src} alt={alt} className={className} />;
}
