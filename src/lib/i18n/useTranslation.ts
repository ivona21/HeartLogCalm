import { useI18nContext } from '@/lib/i18n/I18nContext.tsx';

interface UseTranslationResult {
  translate: (key: string) => string;
  locale: string;
}

export function useTranslation(namespace: string): UseTranslationResult {
  const { locale, getBundle } = useI18nContext();
  const translations = getBundle(namespace);

  const translate = (key: string): string => translations[key] ?? key;

  return { translate, locale };
}
