import { Link } from 'react-router';
import { ArrowLeft, Target, Users, Microscope, Database, FileText, Bell, History } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageSwitcher';
import { getToken } from '../services/api';

export function About() {
  const { t, num } = useLanguage();
  // Public page: logged-out visitors go back to Home, not the dashboard.
  const isLoggedIn = Boolean(getToken());
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link to={isLoggedIn ? '/selection' : '/'} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{t('about.title')}</h1>
            <div className="ml-auto">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('about.heading')}
          </h2>
          <p className="text-gray-700 mb-4">
            {t('about.p1')}
          </p>
          <p className="text-gray-700">
            {t('about.p2')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t('about.mission')}</h3>
            <p className="text-sm text-gray-700">
              {t('about.missionText')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Microscope className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t('about.tech')}</h3>
            <p className="text-sm text-gray-700">
              {t('about.techText')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t('about.farmers')}</h3>
            <p className="text-sm text-gray-700">
              {t('about.farmersText')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('about.features')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="bg-blue-100 rounded-lg p-3 h-fit">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('about.f1')}</h4>
                <p className="text-sm text-gray-700">
                  {t('about.f1Text')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 rounded-lg p-3 h-fit">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('about.f2')}</h4>
                <p className="text-sm text-gray-700">
                  {t('about.f2Text')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-yellow-100 rounded-lg p-3 h-fit">
                <History className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('hist.title')}</h4>
                <p className="text-sm text-gray-700">
                  {t('about.f3Text')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-red-100 rounded-lg p-3 h-fit">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('about.f4')}</h4>
                <p className="text-sm text-gray-700">
                  {t('about.f4Text')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.how')}</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                {num(1)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t('about.s1')}</h4>
                <p className="text-sm text-gray-700">
                  {t('about.s1Text')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                {num(2)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t('about.s2')}</h4>
                <p className="text-sm text-gray-700">
                  {t('about.s2Text')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                {num(3)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t('about.s3')}</h4>
                <p className="text-sm text-gray-700">
                  {t('about.s3Text')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                {num(4)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t('about.s4')}</h4>
                <p className="text-sm text-gray-700">
                  {t('about.s4Text')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                {num(5)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t('about.s5')}</h4>
                <p className="text-sm text-gray-700">
                  {t('about.s5Text')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                {num(6)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t('about.s6')}</h4>
                <p className="text-sm text-gray-700">
                  {t('about.s6Text')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.privacy')}</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>{t('about.secureLabel')}</strong> {t('about.secureText')}
            </p>
            <p>
              <strong>{t('about.trackLabel')}</strong> {t('about.trackText')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>{t('about.rec1')}</li>
              <li>{t('about.rec2')}</li>
              <li>{t('about.rec3')}</li>
              <li>{t('about.rec4')}</li>
              <li>{t('about.rec5')}</li>
              <li>{t('about.rec6')}</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.supported')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">{t('common.fishDiseases')}</h4>
              <ul className="space-y-2 text-gray-700">
                <li>{t('about.fish1')}</li>
                <li>{t('about.fish2')}</li>
                <li>{t('about.fish3')}</li>
                <li>{t('about.fish4')}</li>
                <li>{t('about.fish5')}</li>
                <li>{t('about.fish6')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-3">Poultry Diseases</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Avian Influenza</li>
                <li>• NVD (Newcastle Disease)</li>
                <li>• Pullorum Disease</li>
                <li>• Coccidiosis</li>
                <li>• Salmonellosis</li>
                <li>• Avian influenza</li>
                <li>• Bacterial infections</li>
                <li>• Nutritional deficiencies</li>
                <li>...and more in our database</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">{t('about.disclaimer')}</h3>
          <p className="text-sm text-blue-800">
            {t('about.disclaimerText')}
          </p>
        </div>
      </main>
    </div>
  );
}
