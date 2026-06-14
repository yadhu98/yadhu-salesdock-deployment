import { en } from './en';
import { nl } from './nl';
import type { LocaleType } from '../context/CartContext'; 

export interface LanguageItem {
  code: LocaleType;
  verbiage: typeof en;
}

export const supportedLanguages: LanguageItem[] = [
  { code: 'en', verbiage: en },
  { code: 'nl', verbiage: nl }
];

export const verbiageRegistry: Record<LocaleType, typeof en> = {
  en: en,
  nl: nl
};