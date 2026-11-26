import { LegalDocumentPage } from '@/components/legal/LegalDocumentPage.tsx';
import { termsDocument } from '@/lib/legal.ts';

export default function TermsPage() {
  return <LegalDocumentPage source={termsDocument} />;
}
