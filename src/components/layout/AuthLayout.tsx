import { Header } from '@/components/layout/Header.tsx';
import { Logo } from '@/components/Logo.tsx';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gradient-sand/30 via-background to-gradient-sky/20">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-10">
          <div className="flex justify-center mb-8">
            <Logo variant="full" className="h-40" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
