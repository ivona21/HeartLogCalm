import { Navigate } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth.ts';
import { DEFAULT_HOME_ROUTE } from '@/config/defaults.ts';

interface GuestOnlyRouteProps {
  children: React.ReactNode;
}

export function GuestOnlyRoute({ children }: GuestOnlyRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gradient-sand/30 via-background to-gradient-sky/20">
        <Loader2Icon className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={DEFAULT_HOME_ROUTE} replace />;
  }

  return <>{children}</>;
}
