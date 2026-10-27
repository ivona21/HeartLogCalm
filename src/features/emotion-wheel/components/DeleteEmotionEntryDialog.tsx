import { Loader2Icon } from 'lucide-react';
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
import { Button } from '@/components/ui/button.tsx';

interface DeleteEmotionEntryDialogProps {
  open: boolean;
  isDeleting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export function DeleteEmotionEntryDialog({
  open,
  isDeleting,
  onOpenChange,
  onConfirmDelete,
}: DeleteEmotionEntryDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md border-border/70 bg-background/95 backdrop-blur-sm dark:bg-card/95">
        <AlertDialogHeader className="space-y-3 text-left">
          <AlertDialogTitle className="text-xl font-medium tracking-[-0.02em] text-foreground">
            Delete this entry?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-6 text-muted-foreground">
            This entry will be permanently deleted. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={(event) => {
              event.preventDefault();
              onConfirmDelete();
            }}
          >
            <Button variant="destructive" disabled={isDeleting}>
              {isDeleting ? <Loader2Icon className="animate-spin" /> : null}
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
