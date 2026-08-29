import { Logo } from '@/components/Logo.tsx';
import { cn } from '@/shared/utils/cn.ts';

interface AuthBrandHeaderProps {
  className?: string;
}

export function AuthBrandHeader({ className }: AuthBrandHeaderProps) {
  return (
    <div className={cn('flex justify-center mb-6', className)}>
      <Logo variant="complexFull" className="h-40" />
    </div>
  );
}
