import ProfileForm from '@/features/temp-forms/profile-form/ProfileForm.tsx';
import CurrentFeelingForm from '@/features/temp-forms/current-feeling-form/CurrentFeelingForm.tsx';

export default function FormPlaygroundPage() {
  return (
    <div>
      <h1 className="title">Form Playground</h1>
      <div className="grid grid-cols-2 gap-10">
        <ProfileForm />
        <CurrentFeelingForm />
      </div>
    </div>
  );
}
