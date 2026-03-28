import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2Icon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/Dialog.tsx';
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
      <DialogContent className="max-w-[760px] overflow-hidden border-border/60 bg-background/95 p-0 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-sm">
        <div className="px-8 pb-8 pt-10 md:px-10 md:pb-10 md:pt-11">
          <div className="space-y-3 pb-8">
            <DialogTitle className="max-w-[30ch] text-[26px] font-medium leading-[1.15] tracking-[-0.025em] text-foreground">
              {formatSaveEmotionSummary(primaryGroups)}
            </DialogTitle>
            <DialogDescription className="max-w-[42ch] text-[14px] leading-6 text-muted-foreground">
              Write anything you want, or leave this quiet.
            </DialogDescription>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-7">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                  <FormLabel className="sr-only">Reflection</FormLabel>
                    <FormDescription className="pb-4 text-[13px] leading-6 text-transparent select-none">
                      placeholder
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write here..."
                        disabled={isSaving}
                        className="min-h-[280px] resize-y rounded-[22px] border-border/70 bg-muted/20 px-5 py-4 text-[15px] leading-7 text-foreground shadow-inner placeholder:text-muted-foreground/55 focus-visible:border-foreground/15 focus-visible:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-1 sm:justify-start">
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="min-w-[120px] rounded-full border-border/70 bg-background/80 px-6 text-sm font-medium text-foreground shadow-sm hover:bg-muted/50"
                  disabled={isSaving}
                >
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
