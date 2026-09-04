import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { ChangePasswordForm } from '@/features/auth/forms/ChangePasswordForm/ChangePasswordForm.tsx';

export default function ChangePasswordPage() {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <CardTitle>Change your password</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
