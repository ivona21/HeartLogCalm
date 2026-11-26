import { legalRelease } from '../../.generated/legal.ts';

export { legalRelease };

export const termsDocument = legalRelease.items.terms.content;
export const privacyDocument = legalRelease.items.privacy.content;
export const savedEntriesConsent = JSON.parse(legalRelease.items.savedEntriesConsent.content) as {
  schemaVersion: number;
  entries: Array<{
    id: string;
    version: string;
    checkboxLabel: string;
    statement: string;
    explanation: string;
    withdrawal: string;
  }>;
};
