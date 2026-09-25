import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { X, Loader2 } from 'lucide-react';
import { loginUser, registerUser } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';

interface LoginModalProps {
  onClose: () => void;
  startOnRegister?: boolean;
}

export function LoginModal({ onClose , startOnRegister = false}: LoginModalProps) {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href], select, textarea');
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', keyboard);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keyboard); previousFocus?.focus(); };
  }, [onClose]);
  const { t, lang } = useLanguage();
  const [isLogin, setIsLogin] = useState(!startOnRegister);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let response;
      const normalizedEmail = email.trim().toLowerCase();

      if (isLogin) {
        response = await loginUser({ email: normalizedEmail, password });
      } else {
        response = await registerUser({ name, email: normalizedEmail, password, phone, address });
      }

      // Store tokens + user info
      localStorage.setItem('authToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', normalizedEmail);
      localStorage.setItem('userName', response.user?.name ?? name ?? normalizedEmail);
      localStorage.setItem('userId', response.user?.user_id ?? '');

      onClose();
      navigate('/selection');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t('login.error');
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="login-title" tabIndex={-1} className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          aria-label={lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 id="login-title" className="text-3xl font-bold text-gray-900 mb-6">
          {isLogin ? t('login.welcomeBack') : t('login.createAccount')}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.fullName')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t('login.namePh')}
                  required={!isLogin}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.phone')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t('login.phonePh')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.address')}
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t('login.addressPh')}
                  rows={2}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('login.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={t('login.emailPh')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('login.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={t('login.passwordPh')}
              required
            />
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-1">
                {t('login.passwordHint')}
                <br/>{t('login.example')} <span className="font-mono">MyPass123</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isLogin ? t('login.loggingIn') : t('login.creating')}
              </>
            ) : (
              isLogin ? t('common.login') : t('common.register')
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            {isLogin
              ? t('login.toRegister')
              : t('login.toLogin')}
          </button>
        </div>
      </div>
    </div>
  );
}
