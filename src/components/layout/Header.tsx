import { useState } from 'react';
import {
  ActivityIcon,
  BarChart3Icon,
  BookOpenIcon,
  GaugeIcon,
  HeartPulseIcon,
  LogInIcon,
  MenuIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useAuth } from '@/features/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { LogoutConfirmationDialog } from '@/components/layout/LogoutConfirmationDialog.tsx';
import { hasAuthenticatedEntryDraft } from '@/features/emotion-wheel/stores/authenticatedEntryDraftStorage.ts';
import { cn } from '@/shared/utils/cn.ts';

const navigationItems = [
  { label: 'Dashboard', href: '/dashboard', icon: GaugeIcon, disabled: true },
  { label: 'Emotion Wheel', href: '/emotion-wheel', icon: HeartPulseIcon },
  { label: 'Entries', href: '/entries', icon: BookOpenIcon },
  { label: 'Insights', href: '/insights', icon: BarChart3Icon },
  { label: 'Activity / Calendar', href: '/activity', icon: ActivityIcon },
];

export function Header() {
  const { logout, isAuthenticated, session, user } = useAuth();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [logoutHasUnsavedEntry, setLogoutHasUnsavedEntry] = useState(false);
  const loggedInEmail = user?.email ?? session?.email;
  const accountInitial = (loggedInEmail?.trim().charAt(0) || 'A').toUpperCase();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-background/85 py-2 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-center px-4">
        <div className="flex w-full items-center justify-between gap-2 rounded-full border border-border/80 bg-card/75 p-1.5 shadow-sm">
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="flex shrink-0 cursor-pointer items-center rounded-full px-2 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onClick={() => navigate('/')}
              role="link"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  navigate('/');
                }
              }}
            >
              <Logo variant="complex" className="h-10" />
            </div>

            {isAuthenticated ? (
              <>
                <div className="hidden h-7 w-px bg-border/80 xl:block" />

                <nav
                  className="hidden min-w-0 items-center gap-1 xl:flex"
                  aria-label="Primary navigation"
                >
                  {navigationItems.map(({ label, href, icon: Icon, disabled }) =>
                    disabled ? (
                      <span
                        key={href}
                        aria-disabled="true"
                        className="inline-flex h-9 cursor-not-allowed items-center gap-2 rounded-full px-3 text-sm font-medium text-muted-foreground/45"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </span>
                    ) : (
                      <NavLink
                        key={href}
                        to={href}
                        className={({ isActive }) =>
                          cn(
                            'inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium !text-muted-foreground transition-colors hover:!bg-primary-hover hover:!text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring visited:!text-muted-foreground',
                            isActive &&
                              '!bg-primary !text-white shadow-sm hover:!bg-primary-hover hover:!text-white visited:!text-white',
                          )
                        }
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </NavLink>
                    ),
                  )}
                </nav>
              </>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 border-0 xl:hidden"
                      aria-label="Open navigation menu"
                    >
                      <MenuIcon className="!h-5 !w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-64">
                    <DropdownMenuLabel>Navigate</DropdownMenuLabel>
                    {navigationItems.map(({ label, href, icon: Icon, disabled }) => (
                      <DropdownMenuItem
                        key={href}
                        disabled={disabled}
                        onSelect={(event) => {
                          event.preventDefault();
                          if (disabled) {
                            return;
                          }
                          navigate(href);
                        }}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 min-w-9 shrink-0 cursor-pointer border-0 px-3 text-sm font-semibold no-default-hover-elevate no-default-active-elevate hover:bg-muted/60 hover:text-foreground active:bg-muted/80 active:text-foreground"
                      aria-label="Open account menu"
                      data-testid="button-settings-menu"
                    >
                      <span className="hidden whitespace-nowrap sm:inline" title={loggedInEmail}>
                        {loggedInEmail ?? 'Account'}
                      </span>
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground sm:hidden">
                        {accountInitial}
                      </span>
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
                        navigate('/settings');
                      }}
                      data-testid="button-settings"
                    >
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={(event) => {
                        event.preventDefault();
                        navigate('/change-password', { state: { resetAt: Date.now() } });
                      }}
                      data-testid="button-change-password"
                    >
                      Change your password
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={(event) => {
                        event.preventDefault();
                        setLogoutHasUnsavedEntry(hasAuthenticatedEntryDraft(user?.id));
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
                  hasUnsavedEntry={logoutHasUnsavedEntry}
                  onOpenChange={setLogoutModalOpen}
                  onConfirmLogout={() => {
                    setLogoutModalOpen(false);
                    logout();
                  }}
                />
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="h-9 border-primary/25 bg-primary/5 px-4 text-primary shadow-none hover:border-primary/40 hover:bg-primary/10 hover:text-primary active:bg-primary/15"
              >
                <LogInIcon className="h-4 w-4" />
                Log in
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
