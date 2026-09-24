// Language (English / Bangla) state for the whole app — no external i18n package needed.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { strings, type StringKey } from './strings';

export type Lang = 'en' | 'bn';

const STORAGE_KEY = 'shobarkhamar_language';
const BANGLA_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function readStoredLang(): Lang | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'en' || value === 'bn' ? value : null;
  } catch {
    return null;
  }
}

export function toBanglaDigits(text: string): string {
  return text.replace(/[0-9]/g, (d) => BANGLA_DIGITS[Number(d)]);
}

interface LanguageContextValue {
  lang: Lang;
  /** false until the visitor has picked a language at least once */
  hasChosen: boolean;
  /** locale for toLocaleDateString / toLocaleString */
  locale: string;
  setLang: (lang: Lang) => void;
  /** translate a key; `{name}` placeholders are filled from vars (numbers get Bangla digits in bn) */
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
  /** show a number with Bangla digits when the language is Bangla */
  num: (value: number | string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [storedLang] = useState(readStoredLang);
  const [lang, setLangState] = useState<Lang>(storedLang ?? 'en');
  const [hasChosen, setHasChosen] = useState(storedLang !== null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    setHasChosen(true);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch { /* private mode — choice lasts for this visit only */ }
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const num = (v: number | string) => (lang === 'bn' ? toBanglaDigits(String(v)) : String(v));
    const t = (key: StringKey, vars?: Record<string, string | number>) => {
      let text: string = strings[key]?.[lang] ?? strings[key]?.en ?? key;
      if (vars) {
        for (const [name, v] of Object.entries(vars)) {
          text = text.split(`{${name}}`).join(typeof v === 'number' ? num(v) : v);
        }
      }
      return text;
    };
    return { lang, hasChosen, locale: lang === 'bn' ? 'bn-BD' : 'en-US', setLang, t, num };
  }, [lang, hasChosen, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
