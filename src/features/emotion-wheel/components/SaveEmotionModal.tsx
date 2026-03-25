import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog.tsx';
import { Button } from '@/components/ui/Button.tsx';

interface SaveEmotionModalProps {
  open: boolean;
  emotionLabels: string[];
  onClose: () => void;
}

function formatEmotionSummary(emotionLabels: string[]): string {
  if (emotionLabels.length === 0) return "It seems you're feeling something right now.";
  if (emotionLabels.length > 3) return "It seems you're feeling a lot right now.";
  if (emotionLabels.length === 1) return `It seems you're feeling ${emotionLabels[0]} right now.`;
  if (emotionLabels.length === 2) {
    return `It seems you're feeling ${emotionLabels[0]} and ${emotionLabels[1]} right now.`;
  }

  return `It seems you're feeling ${emotionLabels[0]}, ${emotionLabels[1]}, and ${emotionLabels[2]} right now.`;
}

export function SaveEmotionModal({
  open,
  emotionLabels,
  onClose,
}: SaveEmotionModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogDescription className="pt-4 text-base leading-relaxed text-foreground">
          {formatEmotionSummary(emotionLabels)}
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
