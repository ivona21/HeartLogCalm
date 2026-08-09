import { useState } from 'react';
import { LogInIcon, SettingsIcon } from 'lucide-react';
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
} from '@/components/ui/alert-dialog.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';

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
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 cursor-pointer border-0 no-default-hover-elevate no-default-active-elevate hover:bg-muted/60 hover:text-foreground active:bg-muted/80 active:text-foreground"
                    aria-label="Open account menu"
                    data-testid="button-settings-menu"
                  >
                    <SettingsIcon className="!h-5 !w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48">
                  <DropdownMenuItem disabled className="flex flex-col items-start gap-0.5">
                    <span>Account</span>
                    {loggedInEmail ? (
                      <span
                        className="max-w-48 truncate text-xs font-normal text-muted-foreground"
                        data-testid="text-logged-in-email"
                        title={loggedInEmail}
                      >
                        {loggedInEmail}
                      </span>
                    ) : null}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      setLogoutModalOpen(true);
                    }}
                    data-testid="button-logout"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
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
            </>
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
