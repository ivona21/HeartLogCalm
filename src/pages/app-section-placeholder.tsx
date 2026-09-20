import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';

type AppSectionPlaceholderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

export default function AppSectionPlaceholder({
  title,
  eyebrow,
  description,
}: AppSectionPlaceholderProps) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-4xl items-center">
      <Card className="w-full overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/20">
          {eyebrow ? <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p> : null}
          <CardTitle className="text-3xl">{title}</CardTitle>
        </CardHeader>
        {description ? (
          <CardContent className="p-6">
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
          </CardContent>
        ) : null}
      </Card>
    </div>
  );
}
