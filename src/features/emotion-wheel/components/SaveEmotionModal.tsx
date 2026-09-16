import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Loader2Icon } from 'lucide-react';
import {
  Dialog,
  DialogClose,
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
import { cn } from '@/shared/utils/cn.ts';

interface SaveEmotionModalProps {
  open: boolean;
  primaryGroups: PrimaryGroupSummary[];
  isSaving: boolean;
  comment: string;
  onCommentChange: (comment: string) => void;
  onConfirm: (comment: string) => Promise<void> | void;
  onClose: () => void;
}

type SaveEmotionFormValues = {
  comment: string;
};

const hardcodedFeelings = [
  { label: 'grateful', className: 'border-[#f1bdd9] bg-[#fff0f8] text-[#604751]' },
  { label: 'hopeful', className: 'border-[#d3c3fa] bg-[#f6f0ff] text-[#55496c]' },
  { label: 'tender', className: 'border-[#b8e5c5] bg-[#f0fff3] text-[#425d42]' },
  { label: 'unsettled', className: 'border-[#bad8f5] bg-[#eff8ff] text-[#465461]' },
];

export function SaveEmotionModal({
  open,
  primaryGroups,
  isSaving,
  comment,
  onCommentChange,
  onConfirm,
  onClose,
}: SaveEmotionModalProps) {
  const form = useForm<SaveEmotionFormValues>({
    defaultValues: {
      comment: '',
    },
  });
  const previousOpenRef = useRef(open);
  const entryDate = useMemo(() => new Date(), [open]);

  useEffect(() => {
    const wasOpen = previousOpenRef.current;

    if (open && !wasOpen) {
      form.reset({ comment });
    }

    if (!open && wasOpen) {
      form.reset({ comment: '' });
    }

    previousOpenRef.current = open;
  }, [comment, form, open]);

  const handleSubmit = async ({ comment }: SaveEmotionFormValues) => {
    await onConfirm(comment.trim());
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        overlayClassName="bg-[#17111f]/95"
        className="w-[calc(100vw-2rem)] max-w-[674px] gap-0 overflow-hidden border-[#efe2d0] bg-[#fffaf0] p-0 text-[#3f3839] shadow-[0_30px_76px_rgba(14,9,23,0.46)] sm:rounded-[24px] [&>button:last-child]:right-8 [&>button:last-child]:top-7 [&>button:last-child]:flex [&>button:last-child]:h-8 [&>button:last-child]:w-8 [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:rounded-full [&>button:last-child]:bg-[#eee7db] [&>button:last-child]:text-[#8d8072] [&>button:last-child]:opacity-100 [&>button:last-child]:ring-offset-[#fffaf0] [&>button:last-child_svg]:h-5 [&>button:last-child_svg]:w-5 max-sm:max-h-[calc(100dvh-2rem)] max-sm:overflow-y-auto max-sm:rounded-[22px] max-sm:[&>button:last-child]:right-4 max-sm:[&>button:last-child]:top-4"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="relative flex min-h-[534px] [--paper-content:64px] [--paper-line:32px] [--paper-margin:52px] [--paper-rule-offset:6px] [--paper-text-inset-top:28px] flex-col bg-[radial-gradient(circle_at_20%_16%,rgba(255,255,255,0.78),transparent_34%),linear-gradient(90deg,transparent_0,var(--paper-margin),rgba(221,184,158,0.5)_var(--paper-margin),rgba(221,184,158,0.5)_calc(var(--paper-margin)+1px),transparent_calc(var(--paper-margin)+1px)),repeating-linear-gradient(0deg,transparent_0,transparent_calc(var(--paper-line)-1px),rgba(226,201,173,0.58)_calc(var(--paper-line)-1px),rgba(226,201,173,0.58)_var(--paper-line)),linear-gradient(180deg,#fffaf0_0%,#fff8ee_100%)] bg-[position:0_0,0_0,0_var(--paper-rule-offset),0_0] max-sm:min-h-[calc(100dvh-2rem)] max-sm:[--paper-content:24px] max-sm:[--paper-margin:20px] max-sm:[--paper-text-inset-top:27px]"
          >
            <div className="min-h-[84px] border-b border-[#ecddca] pl-[var(--paper-content)] pr-16 pt-[26px] max-sm:pr-16 max-sm:pt-6">
              <DialogTitle className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[16px] font-semibold leading-6 tracking-normal text-[#3f3839]">
                <span>{format(entryDate, 'EEEE, MMMM d, yyyy')}</span>
                <span className="font-medium text-[#a58dff]">{format(entryDate, 'h:mm a')}</span>
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs font-medium uppercase tracking-[0.17em] text-[#c9ae97]">
                Personal reflection
              </DialogDescription>
              <span className="sr-only">{formatSaveEmotionSummary(primaryGroups)}</span>
            </div>

            <div className="flex min-h-[64px] items-center border-b border-[#ecddca] pl-[var(--paper-content)] pr-16 max-sm:pr-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium lowercase tracking-[0.08em] text-[#c7aa94]">
                  feeling
                </span>
                {hardcodedFeelings.map((feeling) => (
                  <span
                    key={feeling.label}
                    className={cn(
                      'inline-flex min-h-[30px] items-center rounded-full border px-3.5 text-sm font-medium leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.62)]',
                      feeling.className,
                    )}
                  >
                    {feeling.label}
                  </span>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="sr-only">Reflection</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      onChange={(event) => {
                        field.onChange(event);
                        onCommentChange(event.target.value);
                      }}
                      rows={8}
                      placeholder="Write anything you want, or leave this quiet"
                      disabled={isSaving}
                      className="min-h-[320px] resize-none rounded-none border-0 bg-transparent pl-[var(--paper-content)] pr-16 pt-[var(--paper-text-inset-top)] font-serif text-[18px] italic leading-[var(--paper-line)] text-[#5d4e49] shadow-none outline-none placeholder:text-[#bba995] focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60 max-sm:min-h-[330px] max-sm:pr-6 max-sm:text-[18px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-auto min-h-[66px] flex-row items-center justify-between gap-4 border-t border-[#ecddca] pl-[var(--paper-content)] pr-8 py-3 sm:space-x-0 max-sm:flex-col max-sm:items-stretch max-sm:pr-6">
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#b79d8d] max-sm:order-3">
                <span className="flex h-4 w-4 flex-col justify-center gap-[2px]" aria-hidden="true">
                  <span className="block h-[2px] w-3 rounded-full bg-[#b79d8d]" />
                  <span className="block h-[2px] w-2 rounded-full bg-[#b79d8d]" />
                  <span className="block h-[2px] w-[10px] rounded-full bg-[#b79d8d]" />
                </span>
                <span>Your entry is private</span>
              </div>

              <div className="flex items-center gap-5 max-sm:w-full max-sm:justify-end">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={isSaving}
                    className="text-[#715d56] hover:bg-[#efe4d5]"
                  >
                    Discard
                  </Button>
                </DialogClose>
                <Button type="submit" size="lg" disabled={isSaving} className="px-7">
                  {isSaving ? (
                    <>
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save entry'
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
