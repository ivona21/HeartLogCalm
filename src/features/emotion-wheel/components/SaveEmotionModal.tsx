import { type CSSProperties, useEffect, useMemo, useRef } from 'react';
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
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form.tsx';
import type { SelectedEmotionChip } from '@/features/emotion-wheel/hooks/useWheelSelectionDecorations.ts';

interface SaveEmotionModalProps {
  open: boolean;
  selectedEmotionChips: SelectedEmotionChip[];
  isSaving: boolean;
  comment: string;
  onCommentChange: (comment: string) => void;
  onConfirm: (comment: string) => Promise<void> | void;
  onClose: () => void;
}

type SaveEmotionFormValues = {
  comment: string;
};

type EmotionChipStyle = CSSProperties & {
  '--journal-emotion-chip-background': string;
  '--journal-emotion-chip-border': string;
  '--journal-emotion-chip-foreground': string;
};

function getEmotionChipStyle(chip: SelectedEmotionChip): EmotionChipStyle {
  return {
    '--journal-emotion-chip-background': chip.backgroundColor,
    '--journal-emotion-chip-border': chip.borderColor,
    '--journal-emotion-chip-foreground': chip.textColor,
  };
}

export function SaveEmotionModal({
  open,
  selectedEmotionChips,
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

  const selectedEmotionLabel = selectedEmotionChips.map((chip) => chip.label).join(', ');

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        overlayClassName="bg-journal-overlay/95"
        className="w-[calc(100vw-var(--journal-entry-screen-gutter))] max-w-[var(--journal-entry-width)] gap-0 overflow-hidden border-journal-border bg-journal-paper p-0 text-journal-foreground shadow-[var(--journal-entry-shadow)] sm:rounded-[var(--journal-entry-radius)] [&>button:last-child]:right-8 [&>button:last-child]:top-7 [&>button:last-child]:flex [&>button:last-child]:h-8 [&>button:last-child]:w-8 [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:rounded-full [&>button:last-child]:bg-journal-close [&>button:last-child]:text-journal-close-foreground [&>button:last-child]:opacity-100 [&>button:last-child]:ring-offset-journal-paper [&>button:last-child_svg]:h-5 [&>button:last-child_svg]:w-5 max-sm:max-h-[calc(100dvh-var(--journal-entry-screen-gutter-mobile))] max-sm:overflow-y-auto max-sm:rounded-[var(--journal-entry-radius-mobile)] max-sm:[&>button:last-child]:right-4 max-sm:[&>button:last-child]:top-4"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="relative flex min-h-[var(--journal-entry-min-height)] [--paper-content:var(--journal-entry-paper-content)] [--paper-margin:var(--journal-entry-paper-margin)] flex-col bg-[var(--journal-entry-highlight),linear-gradient(90deg,transparent_0,var(--paper-margin),hsl(var(--journal-entry-margin-rule)/0.5)_var(--paper-margin),hsl(var(--journal-entry-margin-rule)/0.5)_calc(var(--paper-margin)+1px),transparent_calc(var(--paper-margin)+1px)),linear-gradient(180deg,hsl(var(--journal-entry-paper))_0%,hsl(var(--journal-entry-paper-end))_100%)] bg-[position:0_0,0_0,0_0] max-sm:min-h-[calc(100dvh-var(--journal-entry-screen-gutter-mobile))] max-sm:[--paper-content:var(--journal-entry-paper-content-mobile)] max-sm:[--paper-margin:var(--journal-entry-paper-margin-mobile)]"
          >
            <div className="min-h-[var(--journal-entry-header-height)] border-b border-journal-border pl-[var(--paper-content)] pr-16 pt-[var(--journal-entry-header-padding-top)] max-sm:pr-16 max-sm:pt-6">
              <DialogTitle className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm font-semibold leading-6 tracking-normal text-journal-foreground">
                <span>{format(entryDate, 'EEEE, MMMM d, yyyy')}</span>
                <span className="font-medium text-journal-time">{format(entryDate, 'h:mm a')}</span>
              </DialogTitle>
              <DialogDescription className="mt-1 text-[0.6875rem] font-medium uppercase tracking-[var(--journal-entry-meta-tracking)] text-journal-meta">
                Personal reflection
              </DialogDescription>
              <span className="sr-only">Selected emotions: {selectedEmotionLabel}</span>
            </div>

            <div className="flex min-h-[var(--journal-entry-feelings-height)] items-center border-b border-journal-border pl-[var(--paper-content)] pr-16 max-sm:pr-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium tracking-[var(--journal-entry-label-tracking)] text-journal-meta">
                  Current emotions:
                </span>
                {selectedEmotionChips.map((chip) => (
                  <span
                    key={chip.id}
                    style={getEmotionChipStyle(chip)}
                    className="inline-flex min-h-[var(--journal-entry-feeling-chip-height)] items-center rounded-full border border-[var(--journal-emotion-chip-border)] bg-[var(--journal-emotion-chip-background)] px-2.5 text-xs font-semibold leading-none text-[var(--journal-emotion-chip-foreground)] shadow-[var(--journal-entry-chip-gloss)]"
                  >
                    {chip.label}
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
                      className="journal-writing-area rounded-none border-0 pl-[var(--paper-content)] pr-16 text-journal-text shadow-none outline-none placeholder:text-journal-placeholder focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60 max-sm:pr-6"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-auto min-h-[var(--journal-entry-footer-height)] flex-row items-center justify-between gap-4 border-t border-journal-border pl-[var(--paper-content)] pr-8 py-3 sm:justify-between sm:space-x-0 max-sm:flex-col max-sm:items-stretch max-sm:pr-6">
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
