import { useForm } from 'react-hook-form';
import {
  defaultProfileFormValues,
  ProfileFormValues,
  profileSchema,
} from '@/features/temp-forms/profile-form/profile.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/form/Form.tsx';
import { Button } from '@/components/ui/Button.tsx';

export default function ProfileForm() {
  const formMethods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultProfileFormValues,
    mode: 'onChange',
  });

  const onSubmit = (values: ProfileFormValues) => {
    console.log(values);
    formMethods.reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="grid w-1/2 gap-4 mt-4">
        <FormField name="name" label="Name" type="text" />
        <FormField name="lastName" label="Last Name" type="text" />
        <FormField name="email" label="Email" type="text" />
        <FormField name="age" label="Age" type="number" />
        <Button type="submit" className="mt-4" disabled={!formMethods.formState.isValid}>
          Save
        </Button>
      </form>
    </Form>
  );
}
