import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2Icon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/Dialog.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { Textarea } from '@/components/ui/Textarea.tsx';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form.tsx';

interface SaveEmotionModalProps {
  open: boolean;
  emotionLabels: string[];
  isSaving: boolean;
  onConfirm: (comment: string) => Promise<void> | void;
  onClose: () => void;
}

type SaveEmotionFormValues = {
  comment: string;
};

function getEmotionSummary(emotionLabels: string[]): string {
  if (emotionLabels.length > 3) return "It seems you're feeling a lot right now.";
  if (emotionLabels.length === 2) {
    return `It seems you're feeling ${emotionLabels[0]} and ${emotionLabels[1]} right now.`;
  }
  if (emotionLabels.length === 3) {
    return `It seems you're feeling ${emotionLabels[0]}, ${emotionLabels[1]}, and ${emotionLabels[2]} right now.`;
  }
  if (emotionLabels.length === 1) {
    return `It seems you're feeling ${emotionLabels[0]} right now.`;
  }
  return "It seems you're feeling something right now.";
}

export function SaveEmotionModal({
  open,
  emotionLabels,
  isSaving,
  onConfirm,
  onClose,
}: SaveEmotionModalProps) {
  const form = useForm<SaveEmotionFormValues>({
    defaultValues: {
      comment: '',
    },
  });

  useEffect(() => {
    if (!open) form.reset({ comment: '' });
  }, [form, open]);

  const handleSubmit = async ({ comment }: SaveEmotionFormValues) => {
    await onConfirm(comment.trim());
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl p-8">
        <DialogDescription className="pt-4 text-lg leading-relaxed text-foreground">
          {getEmotionSummary(emotionLabels)}
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormDescription>
                    Write as much or as little as you want. This space is here if you want to
                    unpack what is going on.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add an optional note"
                      disabled={isSaving}
                      className="min-h-[220px] resize-y text-base leading-7"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full sm:w-auto" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'OK'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
