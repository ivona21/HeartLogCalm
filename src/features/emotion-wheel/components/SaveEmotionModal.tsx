import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2Icon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import {
  formatSaveEmotionSummary,
  type PrimaryGroupSummary,
} from '@/features/emotion-wheel/helpers/format-save-emotion-summary.ts';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form.tsx';

interface SaveEmotionModalProps {
  open: boolean;
  primaryGroups: PrimaryGroupSummary[];
  isSaving: boolean;
  onConfirm: (comment: string) => Promise<void> | void;
  onClose: () => void;
}

type SaveEmotionFormValues = {
  comment: string;
};

export function SaveEmotionModal({
  open,
  primaryGroups,
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
      <DialogContent className="max-w-[760px] overflow-hidden p-0">
        <div className="px-8 pb-8 pt-10 md:px-10 md:pb-10 md:pt-11">
          <div className="space-y-3 pb-8">
            <div className="max-w-[30ch]">
              <DialogTitle>{formatSaveEmotionSummary(primaryGroups)}</DialogTitle>
            </div>
            <div className="max-w-[42ch]">
              <DialogDescription>Write anything you want, or leave this quiet.</DialogDescription>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-7">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="sr-only">Reflection</FormLabel>
                    <div className="pb-4" aria-hidden="true" />
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={12}
                        placeholder="Write here..."
                        disabled={isSaving}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-1 sm:justify-start">
                <Button type="submit" size="lg" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Done'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
