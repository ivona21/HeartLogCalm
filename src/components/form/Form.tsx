import { FormProvider, useFormContext } from 'react-hook-form';
import React from 'react';
import { Label } from '@/components/ui/Label.tsx';

type FormFieldContextValue = {
  name: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

type FormFieldProps = {
  name: string;
  children: React.ReactNode;
};

export function FormField({ name, children }: FormFieldProps) {
  return <FormFieldContext.Provider value={{ name }}>{children}</FormFieldContext.Provider>;
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
