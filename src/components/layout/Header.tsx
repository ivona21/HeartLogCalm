import { LogOutIcon, LogInIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button.tsx';
import { useAuth } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo.tsx';

export function Header() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed -top-[56px] left-0 right-0 z-50 opacity-0 hover:opacity-100 transition-opacity duration-200 border-b border-border bg-background/80 backdrop-blur-sm hover:translate-y-[56px] transition-transform duration-200">
      <div className="container mx-auto px-4 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Logo variant="complex" className="h-14" />
        </div>
        {isAuthenticated ? (
          <Button
            variant="ghost"
            onClick={logout}
            className="flex items-center gap-2"
            data-testid="button-logout"
          >
            <LogOutIcon className="w-4 h-4" />
            Log out
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => navigate('/login')}
            className="flex items-center gap-2"
          >
            <LogInIcon className="w-4 h-4" />
            Log in
          </Button>
        )}
      </div>
    </header>
  );
}
