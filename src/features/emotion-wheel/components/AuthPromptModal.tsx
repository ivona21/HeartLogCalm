import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Logo } from '@/components/Logo.tsx';
import { savePendingAuthEmotionSelection } from '@/features/emotion-wheel/stores/pendingAuthEmotionSelectionStorage.ts';

interface AuthPromptModalProps {
  open: boolean;
  selectionOrder: string[];
  onClose: () => void;
}

export function AuthPromptModal({ open, selectionOrder, onClose }: AuthPromptModalProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    savePendingAuthEmotionSelection(selectionOrder);
    onClose();
    navigate('/login');
  };

  const handleRegister = () => {
    savePendingAuthEmotionSelection(selectionOrder);
    onClose();
    navigate('/register');
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader className="items-center gap-3">
          <DialogTitle className="text-xl">Save your emotions</DialogTitle>
          <Logo variant="complexFull" className="h-24" />
          <DialogDescription className="text-base leading-relaxed">
            Log in or create a free account to track and revisit your emotional journey over time.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-2">
          <Button onClick={handleLogin} className="w-full">
            Log in
          </Button>
          <Button onClick={handleRegister} variant="outline" className="w-full">
            Create account
          </Button>
          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
          >
            Continue browsing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
