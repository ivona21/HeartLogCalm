import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';

type LegalDocument = {
  title: string;
  effectiveDate?: string;
  body: string;
};

type LegalDocumentPageProps = {
  source: string;
};

function parseDocument(source: string): LegalDocument {
  const frontMatterMatch = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!frontMatterMatch) {
    return { title: 'Legal document', body: source };
  }

  const metadata = Object.fromEntries(
    frontMatterMatch[1]
      .split('\n')
      .map((line) => {
        const separatorIndex = line.indexOf(':');
        return separatorIndex === -1
          ? []
          : [line.slice(0, separatorIndex).trim(), line.slice(separatorIndex + 1).trim()];
      })
      .filter((entry): entry is [string, string] => entry.length === 2),
  );

  return {
    title: metadata.title || 'Legal document',
    effectiveDate: metadata.effectiveDate,
    body: frontMatterMatch[2].trim(),
  };
}

export function LegalDocumentPage({ source }: LegalDocumentPageProps) {
  const document = parseDocument(source);

  return (
    <div className="mx-auto w-full max-w-4xl mt-7">
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/20">
          <CardTitle className="text-3xl">{document.title}</CardTitle>
          {document.effectiveDate ? (
            <p className="text-sm text-muted-foreground">
              Effective date: {document.effectiveDate}
            </p>
          ) : null}
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <article className="prose prose-slate max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{document.body}</ReactMarkdown>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
