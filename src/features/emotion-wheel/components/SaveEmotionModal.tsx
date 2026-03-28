import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2Icon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/Dialog.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { Textarea } from '@/components/ui/Textarea.tsx';
import {
  formatSaveEmotionSummary,
  type PrimaryGroupSummary,
} from '@/features/emotion-wheel/helpers/format-save-emotion-summary.ts';
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
      <DialogContent className="max-w-2xl p-8">
        <DialogDescription className="pt-4 text-[15px] leading-relaxed text-foreground">
          {formatSaveEmotionSummary(primaryGroups)}
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel></FormLabel>
                  <FormDescription>Write anything you want — or nothing at all.</FormDescription>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write here..."
                      disabled={isSaving}
                      className="mt-4 min-h-[220px] resize-y text-base leading-7"
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
                  'Done'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
