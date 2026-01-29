import {
  FormProvider,
  useFormContext,
  FieldPath,
  FieldValues,
  Controller,
  ControllerRenderProps,
} from 'react-hook-form';
import React from 'react';
import { Label } from '@/components/ui/Label.tsx';

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

type FormFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  render: (field: ControllerRenderProps<TFieldValues>) => React.ReactNode;
};

export function FormField<TFieldValues extends FieldValues>({
  name,
  render,
}: FormFieldProps<TFieldValues> & {
  render: (field: any) => React.ReactNode;
}) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} render={({ field }) => <>{render(field)}</>} />
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

  return <p style={{ color: 'red' }}>{String(error.message)}</p>;
}

export const Form = FormProvider;
