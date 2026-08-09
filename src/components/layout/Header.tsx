import { useState } from 'react';
import { LogOutIcon, LogInIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
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
} from '@/components/ui/alert-dialog.tsx';

export function Header() {
  const { logout, isAuthenticated, session, user } = useAuth();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const loggedInEmail = user?.email ?? session?.email;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm py-1">
      <div className="container mx-auto px-4 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Logo variant="complex" className="h-14" />
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated && loggedInEmail ? (
            <span
              className="max-w-[50vw] truncate text-sm text-muted-foreground"
              data-testid="text-logged-in-email"
              title={loggedInEmail}
            >
              {loggedInEmail}
            </span>
          ) : null}
          {isAuthenticated ? (
            <AlertDialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  data-testid="button-logout"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Log out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md border-border/70 bg-background/95 dark:bg-card/95 dark:border-card-border/70 dark:shadow-[0_24px_70px_rgba(5,4,12,0.34)] shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-sm">
                <AlertDialogHeader className="space-y-3 text-left">
                  <AlertDialogTitle className="text-xl font-medium tracking-[-0.02em] text-foreground">
                    Are you sure you want to log out?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm leading-6 text-muted-foreground">
                    You will still be able to explore the wheel, but you will need to log in again
                    to save emotions.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
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
      </div>
    </header>
  );
}
