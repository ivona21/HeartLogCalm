import LogoSimpleWithText from '@/assets/LogoSimpleWithText.png';
import LogoSimpleNoText from '@/assets/LogoSimpleNoText.png';
import LogoComplexWithText from '@/assets/LogoComplexWithText.png';
import LogoComplexNoText from '@/assets/LogoComplexNoText.png';

interface LogoProps {
  variant?: 'complexFull' | 'complex' | 'simple' | 'icon';
  className?: string;
}

const LOGO_MAP = {
  complexFull: { src: LogoComplexWithText, alt: 'HeartLog - Emotion Logger' },
  complex: { src: LogoComplexNoText, alt: 'HeartLog' },
  simple: { src: LogoSimpleWithText, alt: 'HeartLog' },
  icon: { src: LogoSimpleNoText, alt: 'HeartLog' },
};

export function Logo({ variant = 'simple', className = '' }: LogoProps) {
  const { src, alt } = LOGO_MAP[variant];
  return <img src={src} alt={alt} className={className} />;
}
