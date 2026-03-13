import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Locale, LocaleBundle } from '@/lib/i18n/types.ts';
import enEmotions from '@/lib/i18n/locales/en/emotions.ts';
import enCommon from '@/lib/i18n/locales/en/common.ts';

const LOCALE_BUNDLES: Record<Locale, LocaleBundle> = {
  en: {
    emotions: enEmotions,
    common: enCommon,
  },
};

const DEFAULT_LOCALE: Locale = 'en';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  getBundle: (namespace: string) => LocaleBundle[string];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  const getBundle = (namespace: string) => {
    const bundle = LOCALE_BUNDLES[locale] ?? LOCALE_BUNDLES[DEFAULT_LOCALE];
    return bundle[namespace] ?? {};
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, getBundle }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18nContext must be used within an I18nProvider');
  }
  return context;
}
