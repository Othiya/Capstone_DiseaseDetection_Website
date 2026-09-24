// First-visit language picker + the language button shown in page headers.
// Inline styles are used on purpose: the project's CSS is a prebuilt Tailwind file,
// so new utility classes would not exist in it.
import type { CSSProperties } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function LanguageChooser() {
  const { hasChosen, setLang } = useLanguage();
  if (hasChosen) return null;

  const buttonStyle: CSSProperties = {
    flex: 1,
    padding: '16px 12px',
    borderRadius: 12,
    fontSize: 20,
    fontWeight: 600,
    cursor: 'pointer',
    border: '2px solid #16a34a',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-chooser-title"
      style={{
        position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
    >
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 420, textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Languages style={{ width: 28, height: 28, color: '#16a34a' }} />
        </div>
        <h2 id="language-chooser-title" style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 4, fontFamily: "'Hind Siliguri', sans-serif" }}>
          ভাষা নির্বাচন করুন
        </h2>
        <p style={{ fontSize: 16, color: '#4b5563', marginBottom: 24 }}>Choose your language</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setLang('bn')}
            style={{ ...buttonStyle, background: '#16a34a', color: '#fff', fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            বাংলা
          </button>
          <button onClick={() => setLang('en')} style={{ ...buttonStyle, background: '#fff', color: '#166534' }}>
            English
          </button>
        </div>
      </div>
    </div>
  );
}

/** Language button for page headers. `tone="dark"` is for the see-through home header over the photo. */
export function LanguageToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { lang, setLang, t } = useLanguage();
  const dark = tone === 'dark';

  return (
    <button
      onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
      title={t('lang.switchLabel')}
      aria-label={t('lang.switchLabel')}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 14px', borderRadius: 8, cursor: 'pointer',
        fontWeight: 500, fontSize: 15, whiteSpace: 'nowrap',
        transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
        background: dark ? 'rgba(255,255,255,0.12)' : '#ffffff',
        color: dark ? '#ffffff' : '#374151',
        border: dark ? '1px solid rgba(255,255,255,0.35)' : '1px solid #d1d5db',
        fontFamily: lang === 'bn' ? 'inherit' : "'Hind Siliguri', sans-serif",
      }}
    >
      <Languages style={{ width: 18, height: 18 }} />
      {t('lang.switchTo')}
    </button>
  );
}
