import LogoFullImage from '@/assets/LogoFullTransparent.png';
import LogoSimpleImage from '@/assets/LogoSimpleWithText.png';

interface LogoProps {
  variant?: 'full' | 'simple';
  className?: string;
}

export function Logo({ variant = 'simple', className = '' }: LogoProps) {
  const src = variant === 'full' ? LogoFullImage : LogoSimpleImage;
  const altText = variant === 'full' ? 'HeartLog - Emotion Logger' : 'HeartLog';

  return <img src={src} alt={altText} className={className} />;
}
