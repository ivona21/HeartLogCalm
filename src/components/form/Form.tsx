import { FormProvider, useFormContext, FieldPath, FieldValues, Controller } from 'react-hook-form';
import React from 'react';
import { Label } from '@/components/ui/Label.tsx';
import { Input } from '@/components/ui/Input.tsx';

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

type FormFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: string;
  type: string;
};

export function FormField<TFieldValues extends FieldValues>({
  name,
  label,
  type,
}: FormFieldProps<TFieldValues>) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        name={name}
        render={({ field }) => (
          <div className="mt-1 grid gap-2">
            {' '}
            <div className="mt-1 grid gap-2">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input {...field} type={type} />
              </FormControl>
              <FormMessage />
            </div>
          </div>
        )}
      />
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const field = React.useContext(FormFieldContext);
  const { formState } = useFormContext();

  if (!field) {
    throw new Error('useFormField must be used inside FormField');
  }

  return {
    error: formState.errors[field.name],
  };
}

export function FormLabel({ children }: { children: React.ReactNode }) {
  return <Label>{children}</Label>;
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function FormMessage() {
  const { error } = useFormField();

  if (!error) return null;

  return <p className="text-red-500 font-medium text-xs">{String(error.message)}</p>;
}

export const Form = FormProvider;
