import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/Dialog.tsx';
import { Button } from '@/components/ui/Button.tsx';

interface SaveEmotionModalProps {
  open: boolean;
  emotionLabels: string[];
  onClose: () => void;
}

export function SaveEmotionModal({ open, emotionLabels, onClose }: SaveEmotionModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogDescription className="pt-4 text-base leading-relaxed text-foreground">
          It seems you're feeling {emotionLabels[0]} right now.
        </DialogDescription>
        <DialogFooter>
          <Button onClick={onClose} className="w-full sm:w-auto">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
