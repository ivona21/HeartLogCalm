import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChangePasswordForm } from '@/features/auth/forms/ChangePasswordForm/ChangePasswordForm.tsx';

export default function ChangePasswordPage() {
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);

  if (isResetLinkSent) {
    return (
      <div className="mx-auto max-w-xl py-10">
        <ChangePasswordForm onResetLinkSent={() => setIsResetLinkSent(true)} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl py-10">
      <Card className="w-full mt-4">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <CardTitle>Change your password</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm onResetLinkSent={() => setIsResetLinkSent(true)} />
        </CardContent>
      </Card>
    </div>
  );
}
