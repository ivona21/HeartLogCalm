import privacyPolicy from '@/content/legal/en/privacy-policy.md?raw';
import { LegalDocumentPage } from '@/components/legal/LegalDocumentPage.tsx';

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage source={privacyPolicy} />;
}
