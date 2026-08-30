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

interface LogoutConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmLogout: () => void;
}

export function LogoutConfirmationDialog({
  open,
  onOpenChange,
  onConfirmLogout,
}: LogoutConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md border-border/70 bg-background/95 dark:bg-card/95 dark:border-card-border/70 dark:shadow-[0_24px_70px_rgba(5,4,12,0.34)] shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-sm">
        <AlertDialogHeader className="space-y-3 text-left">
          <AlertDialogTitle className="text-xl font-medium tracking-[-0.02em] text-foreground">
            Are you sure you want to log out?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-6 text-muted-foreground">
            You will still be able to explore the wheel, but you will need to log in again to save
            emotions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmLogout}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
