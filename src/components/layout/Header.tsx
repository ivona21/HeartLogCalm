import { useState } from 'react';
import { LogInIcon, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useAuth } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { LogoutConfirmationDialog } from '@/components/layout/LogoutConfirmationDialog.tsx';

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
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      navigate('/change-password');
                    }}
                    data-testid="button-change-password"
                  >
                    Change your password
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

              <LogoutConfirmationDialog
                open={logoutModalOpen}
                onOpenChange={setLogoutModalOpen}
                onConfirmLogout={() => {
                  setLogoutModalOpen(false);
                  logout();
                }}
              />
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
