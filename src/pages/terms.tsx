import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';

export default function TermsPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-4xl items-center">
      <Card className="w-full overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/20">
          <CardTitle className="text-3xl">Terms</CardTitle>
        </CardHeader>
        <CardContent className="p-6">{/* Terms content will be added here. */}</CardContent>
      </Card>
    </div>
  );
}
