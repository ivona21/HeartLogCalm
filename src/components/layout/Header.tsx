import { HeartIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useAuth } from '@/features/auth';

export function Header() {
  const { logout } = useAuth();

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HeartIcon className="w-6 h-6 text-primary" fill="currentColor" />
          <h1 className="text-xl font-semibold text-primary">HeartLog</h1>
        </div>
        <Button
          variant="ghost"
          onClick={logout}
          className="flex items-center gap-2"
          data-testid="button-logout"
        >
          <LogOutIcon className="w-4 h-4" />
          Log out
        </Button>
      </div>
    </header>
  );
}
