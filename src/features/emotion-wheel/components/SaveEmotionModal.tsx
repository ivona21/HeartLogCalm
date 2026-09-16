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
  {
    label: 'grateful',
    className:
      'border-journal-feeling-grateful-border bg-journal-feeling-grateful text-journal-feeling-grateful-foreground',
  },
  {
    label: 'hopeful',
    className:
      'border-journal-feeling-hopeful-border bg-journal-feeling-hopeful text-journal-feeling-hopeful-foreground',
  },
  {
    label: 'tender',
    className:
      'border-journal-feeling-tender-border bg-journal-feeling-tender text-journal-feeling-tender-foreground',
  },
  {
    label: 'unsettled',
    className:
      'border-journal-feeling-unsettled-border bg-journal-feeling-unsettled text-journal-feeling-unsettled-foreground',
  },
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
        overlayClassName="bg-journal-overlay/95"
        className="w-[calc(100vw-var(--journal-entry-screen-gutter))] max-w-[var(--journal-entry-width)] gap-0 overflow-hidden border-journal-border bg-journal-paper p-0 text-journal-foreground shadow-[var(--journal-entry-shadow)] sm:rounded-[var(--journal-entry-radius)] [&>button:last-child]:right-8 [&>button:last-child]:top-7 [&>button:last-child]:flex [&>button:last-child]:h-8 [&>button:last-child]:w-8 [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:rounded-full [&>button:last-child]:bg-journal-close [&>button:last-child]:text-journal-close-foreground [&>button:last-child]:opacity-100 [&>button:last-child]:ring-offset-journal-paper [&>button:last-child_svg]:h-5 [&>button:last-child_svg]:w-5 max-sm:max-h-[calc(100dvh-var(--journal-entry-screen-gutter-mobile))] max-sm:overflow-y-auto max-sm:rounded-[var(--journal-entry-radius-mobile)] max-sm:[&>button:last-child]:right-4 max-sm:[&>button:last-child]:top-4"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="relative flex min-h-[var(--journal-entry-min-height)] [--paper-content:var(--journal-entry-paper-content)] [--paper-line:var(--journal-entry-line-height)] [--paper-margin:var(--journal-entry-paper-margin)] [--paper-rule-offset:var(--journal-entry-rule-offset)] [--paper-text-inset-top:var(--journal-entry-text-inset-top)] flex-col bg-[var(--journal-entry-highlight),linear-gradient(90deg,transparent_0,var(--paper-margin),hsl(var(--journal-entry-margin-rule)/0.5)_var(--paper-margin),hsl(var(--journal-entry-margin-rule)/0.5)_calc(var(--paper-margin)+1px),transparent_calc(var(--paper-margin)+1px)),linear-gradient(180deg,hsl(var(--journal-entry-paper))_0%,hsl(var(--journal-entry-paper-end))_100%)] bg-[position:0_0,0_0,0_0] max-sm:min-h-[calc(100dvh-var(--journal-entry-screen-gutter-mobile))] max-sm:[--paper-content:var(--journal-entry-paper-content-mobile)] max-sm:[--paper-margin:var(--journal-entry-paper-margin-mobile)] max-sm:[--paper-text-inset-top:var(--journal-entry-text-inset-top-mobile)]"
          >
            <div className="min-h-[var(--journal-entry-header-height)] border-b border-journal-border pl-[var(--paper-content)] pr-16 pt-[var(--journal-entry-header-padding-top)] max-sm:pr-16 max-sm:pt-6">
              <DialogTitle className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base font-semibold leading-6 tracking-normal text-journal-foreground">
                <span>{format(entryDate, 'EEEE, MMMM d, yyyy')}</span>
                <span className="font-medium text-journal-time">{format(entryDate, 'h:mm a')}</span>
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs font-medium uppercase tracking-[var(--journal-entry-meta-tracking)] text-journal-meta">
                Personal reflection
              </DialogDescription>
              <span className="sr-only">{formatSaveEmotionSummary(primaryGroups)}</span>
            </div>

            <div className="flex min-h-[var(--journal-entry-feelings-height)] items-center border-b border-journal-border pl-[var(--paper-content)] pr-16 max-sm:pr-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium lowercase tracking-[var(--journal-entry-label-tracking)] text-journal-meta">
                  feeling
                </span>
                {hardcodedFeelings.map((feeling) => (
                  <span
                    key={feeling.label}
                    className={cn(
                      'inline-flex min-h-[var(--journal-entry-feeling-chip-height)] items-center rounded-full border px-3.5 text-sm font-medium leading-none shadow-[var(--journal-entry-chip-gloss)]',
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
                <FormItem className="space-y-0 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_calc(var(--paper-line)-1px),hsl(var(--journal-entry-rule)/0.58)_calc(var(--paper-line)-1px),hsl(var(--journal-entry-rule)/0.58)_var(--paper-line))] bg-[position:0_var(--paper-rule-offset)]">
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
                      className="min-h-[var(--journal-entry-writing-min-height)] resize-none rounded-none border-0 bg-transparent pl-[var(--paper-content)] pr-16 pt-[var(--paper-text-inset-top)] font-serif text-lg italic leading-[var(--paper-line)] text-journal-text shadow-none outline-none placeholder:text-journal-placeholder focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60 max-sm:min-h-[var(--journal-entry-writing-min-height-mobile)] max-sm:pr-6 max-sm:text-lg"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-auto min-h-[var(--journal-entry-footer-height)] flex-row items-center justify-between gap-4 border-t border-journal-border pl-[var(--paper-content)] pr-8 py-3 sm:space-x-0 max-sm:flex-col max-sm:items-stretch max-sm:pr-6">
              <div className="flex items-center gap-2.5 text-xs font-medium text-journal-muted max-sm:order-3">
                <span className="flex h-4 w-4 flex-col justify-center gap-0.5" aria-hidden="true">
                  <span className="block h-0.5 w-3 rounded-full bg-journal-muted" />
                  <span className="block h-0.5 w-2 rounded-full bg-journal-muted" />
                  <span className="block h-0.5 w-2.5 rounded-full bg-journal-muted" />
                </span>
                <span>Your entry is private</span>
              </div>

              <div className="flex items-center gap-5 max-sm:w-full max-sm:justify-end">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={isSaving}
                    className="text-journal-text hover:bg-journal-action-hover"
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
