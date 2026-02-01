import { useForm } from 'react-hook-form';
import {
  ProfileFormValues,
  profileSchema,
} from '@/features/temp-forms/profile-form/profile.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/form/Form.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { Button } from '@/components/ui/Button.tsx';

export default function ProfileForm() {
  const formMethods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      age: 0,
    },
    mode: 'onChange',
  });

  const onSubmit = (values: ProfileFormValues) => {
    console.log(values);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="grid w-1/2 gap-4 mt-4">
        <FormField
          name="name"
          render={(field) => (
            <>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </>
          )}
        />
        <FormField
          name="lastName"
          render={(field) => (
            <div className="mt-1 grid gap-2">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </div>
          )}
        ></FormField>
        <FormField
          name="email"
          render={(field) => (
            <div className="mt-1 grid gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </div>
          )}
        ></FormField>
        <FormField
          name="age"
          render={(field) => (
            <div className="mt-1 grid gap-2">
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </div>
          )}
        ></FormField>
        <Button type="submit" className="mt-4" disabled={!formMethods.formState.isValid}>
          Save
        </Button>
      </form>
    </Form>
  );
}
