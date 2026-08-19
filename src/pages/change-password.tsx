import { Badge } from '@/components/ui/badge.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { LockKeyholeIcon } from 'lucide-react';

export default function ChangePasswordPage() {
  return (
    <div className="mx-auto flex max-w-2xl items-center justify-center py-10">
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <Badge variant="outline" className="w-fit">
            Account
          </Badge>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-card-border bg-muted/40">
              <LockKeyholeIcon className="h-5 w-5 text-foreground" />
            </div>
            <div className="space-y-1">
              <CardTitle>Change your password</CardTitle>
              <CardDescription>Coming soon.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This page is reserved for the password update flow.
        </CardContent>
      </Card>
    </div>
  );
}
