import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AlertTriangleIcon, Loader2Icon, ShieldCheckIcon, Trash2Icon } from 'lucide-react';
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
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { PasswordInput } from '@/components/ui/password-input.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { ChangePasswordForm } from '@/features/auth/forms/ChangePasswordForm/ChangePasswordForm.tsx';
import { deleteAccountApi } from '@/features/auth/api/delete-account.api.ts';
import { normalizeApiError } from '@/shared/api/api-errors.ts';
import { useAuth } from '@/features/auth';

export default function AccountPage() {
  const { logout } = useAuth();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: () => deleteAccountApi(currentPassword),
    onSuccess: () => {
      setDeleteDialogOpen(false);
      setCurrentPassword('');
      logout({ reason: 'account-deletion' });
    },
    onError: (error: unknown) => {
      setDeleteError(normalizeApiError(error).message || 'Unable to delete your profile.');
    },
  });

  const openDeleteDialog = () => {
    setDeleteError(null);
    setCurrentPassword('');
    setDeleteDialogOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-4xl py-8 md:py-10">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Account</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <ShieldCheckIcon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <CardTitle>Change password</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ChangePasswordForm />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangleIcon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <CardTitle>Delete your account</CardTitle>
                <CardDescription>
                  Your account and all your saved emotion entries will be permanently deleted. This
                  action cannot be undone.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Separator className="mb-5" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                variant="destructive"
                onClick={openDeleteDialog}
                className="shrink-0 border-[hsl(var(--destructive))]"
              >
                <Trash2Icon className="h-4 w-4" />
                Delete account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes your account and emotion entries. Enter your current password
              to confirm. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <label htmlFor="delete-account-password" className="text-sm font-medium">
              Current password
            </label>
            <PasswordInput
              id="delete-account-password"
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.target.value);
                setDeleteError(null);
              }}
              placeholder="Enter your current password"
              disabled={deleteMutation.isPending}
              autoComplete="current-password"
            />
          </div>
          {deleteError ? (
            <Alert variant="destructive">
              <AlertDescription>{deleteError}</AlertDescription>
            </Alert>
          ) : null}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={!currentPassword || deleteMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                deleteMutation.mutate();
              }}
              className="border-[hsl(var(--destructive))] bg-destructive text-destructive-foreground hover:bg-destructive-hover"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete account'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
