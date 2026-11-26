import { LegalDocumentPage } from '@/components/legal/LegalDocumentPage.tsx';
import { privacyDocument } from '@/lib/legal.ts';

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage source={privacyDocument} />;
}
