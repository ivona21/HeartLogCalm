export type Locale = string;
export type TranslationMap = Record<string, string>;
export type Namespace = string;
export type LocaleBundle = Record<Namespace, TranslationMap>;
export type I18nRegistry = Record<Locale, LocaleBundle>;
