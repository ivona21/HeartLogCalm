import { useEffect, useState } from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChangePasswordForm } from '@/features/auth/forms/ChangePasswordForm/ChangePasswordForm.tsx';

export default function ChangePasswordPage() {
  const location = useLocation();
  const [resetLinkMessage, setResetLinkMessage] = useState<string | null>(null);

  useEffect(() => {
    setResetLinkMessage(null);
  }, [location.key]);

  if (resetLinkMessage) {
    return (
      <div className="mx-auto max-w-xl py-10">
        <Alert variant="success" className="bg-success/10 border-success/30">
          <CheckCircle2Icon className="h-4 w-4 text-success" />
          <AlertDescription className="text-foreground">{resetLinkMessage}</AlertDescription>
        </Alert>
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
          <ChangePasswordForm key={location.key} onResetLinkSent={setResetLinkMessage} />
        </CardContent>
      </Card>
    </div>
  );
}
