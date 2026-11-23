import terms from '@/content/legal/en/terms.md?raw';
import { LegalDocumentPage } from '@/components/legal/LegalDocumentPage.tsx';

export default function TermsPage() {
  return <LegalDocumentPage source={terms} />;
}
