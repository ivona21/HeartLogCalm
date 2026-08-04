import { type ReactNode } from 'react';
import {
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { cn } from '@/shared/utils/cn.ts';

type FormInputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: ReactNode;
  renderInput: (field: ControllerRenderProps<TFieldValues, TName>) => ReactNode;
  description?: ReactNode;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  messageClassName?: string;
};

export function FormInputField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  renderInput,
  description,
  className,
  labelClassName,
  descriptionClassName,
  messageClassName,
}: FormInputFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('space-y-1', className)}>
          <FormLabel className={labelClassName}>{label}</FormLabel>
          <FormControl>{renderInput(field)}</FormControl>
          {description ? (
            <FormDescription className={descriptionClassName}>{description}</FormDescription>
          ) : null}
          <FormMessage className={messageClassName} />
        </FormItem>
      )}
    />
  );
}
