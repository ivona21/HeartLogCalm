import { useState } from 'react';
import { LogOutIcon, LogInIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button.tsx';
import { useAuth } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo.tsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog.tsx';

export function Header() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm py-1">
      <div className="container mx-auto px-4 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Logo variant="complex" className="h-14" />
        </div>
        {isAuthenticated ? (
          <AlertDialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2" data-testid="button-logout">
                <LogOutIcon className="w-4 h-4" />
                Log out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md border-border/70 bg-background/95 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-sm">
              <AlertDialogHeader className="space-y-3 text-left">
                <AlertDialogTitle className="text-xl font-medium tracking-[-0.02em] text-foreground">
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm leading-6 text-muted-foreground">
                  You will still be able to explore the wheel, but you will need to log in again to save emotions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="rounded-full"
                  onClick={() => {
                    setLogoutModalOpen(false);
                    logout();
                  }}
                >
                  Log out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
