import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { PoultryIcon } from './PoultryIcon';
import { ArrowLeft, Search, Fish, AlertCircle, Info, FileText, ShieldCheck, Pill, Sparkles, X, Siren, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/LanguageContext';
import { getToken } from '../services/api';
import { getDiseaseContent, pick, pickList } from '../services/diseaseContent';
import type { DiseaseContent } from '../services/diseaseContent';

interface Disease {
  id: string;
  name: string;
  fullName: string;
  type: 'fish' | 'poultry';
  symptoms: string[];
  diagnosis: string;
  treatment: string;
  medication: string;
  precautions: string[];
  effectiveness: string;
  notifiable: boolean;
  zoonotic: boolean;
  requiresVeterinarian: boolean;
  reference: string | null;
}

function toDisease(entry: DiseaseContent, lang: Lang): Disease {
  const treatment = entry.treatment;
  return {
    id: entry.disease_code,
    name: pick(entry.short_name, lang),
    fullName: pick(entry.name, lang),
    type: entry.species === 'POULTRY' ? 'poultry' : 'fish',
    symptoms: pickList(entry.symptoms, lang),
    diagnosis: pick(entry.diagnosis, lang),
    treatment: pick(treatment?.summary, lang),
    medication: pick(treatment?.medication_summary, lang),
    precautions: pickList(treatment?.precautions, lang),
    effectiveness: pick(treatment?.effectiveness, lang),
    notifiable: entry.notifiable,
    zoonotic: entry.zoonotic,
    requiresVeterinarian: treatment?.requires_veterinarian ?? false,
    reference: treatment?.reference ?? null,
  };
}

export function DiseaseDatabase() {
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'fish' | 'poultry'>('all');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  // This page is public: visitors who are not logged in go back to Home, not the dashboard.
  const isLoggedIn = Boolean(getToken());

  const [diseaseDatabase, setDiseaseDatabase] = useState<Disease[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getDiseaseContent()
      .then((content) => {
        if (!active) return;
        setDiseaseDatabase(content.map((entry) => toDisease(entry, lang)));
        setLoadError(false);
      })
      .catch(() => active && setLoadError(true))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [lang]);

  const shownDisease = selectedDisease
    ? diseaseDatabase.find((d) => d.id === selectedDisease.id) ?? selectedDisease
    : null;

  const filteredDiseases = diseaseDatabase.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || disease.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={isLoggedIn ? '/selection' : '/'} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{t('db.title')}</h1>
            </div>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('db.search')}</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t('db.searchPh')}
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'fish' | 'poultry')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t('db.allTypes')}</option>
              <option value="fish">{t('common.fishOnly')}</option>
              <option value="poultry">{t('common.poultryOnly')}</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredDiseases.map((disease) => (
              <div
                key={disease.id}
                onClick={() => setSelectedDisease(disease)}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${
                    disease.type === 'fish' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {disease.type === 'fish' ? (
                      <Fish className="w-6 h-6 text-blue-600" />
                    ) : (
                      <PoultryIcon size="1.5rem" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{disease.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{disease.fullName}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        disease.type === 'fish'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {disease.type === 'fish' ? t('common.fishDisease') : t('common.poultryDisease')}
                      </span>
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                        {t('db.viewDetails')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">{t('common.loading')}</p>
            </div>
          )}

          {loadError && !loading && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">{t('db.loadError')}</p>
            </div>
          )}

          {!loading && !loadError && filteredDiseases.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">{t('db.noResults')}</p>
            </div>
          )}
        </div>
      </main>

      {/* Disease Detail Modal */}
      {shownDisease && (
        <div className="fixed inset-0 bg-black/55 z-50 p-4 sm:p-6 overflow-y-auto">
          <div className="min-h-full flex items-start justify-center">
            <div className="bg-white rounded-[28px] shadow-2xl max-w-5xl w-full my-4 sm:my-8 overflow-hidden border border-white/70">
            <div className={`px-8 py-8 sm:px-10 sticky top-0 z-10 border-b border-white/70 ${
              shownDisease.type === 'fish'
                ? 'bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_40%),linear-gradient(135deg,#eff6ff_0%,#ffffff_55%,#ecfeff_100%)]'
                : 'bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.22),_transparent_40%),linear-gradient(135deg,#f0fdf4_0%,#ffffff_55%,#f0fdf4_100%)]'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-8">
                <div className="flex items-start gap-5">
                  <div className={`p-4 rounded-3xl shadow-sm ${
                    shownDisease.type === 'fish' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {shownDisease.type === 'fish' ? (
                      <Fish className="w-9 h-9" />
                    ) : (
                      <PoultryIcon size="2.25rem" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full ${
                        shownDisease.type === 'fish'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {shownDisease.type === 'fish' ? t('common.fishDisease') : t('common.poultryDisease')}
                      </span>
                      <span className="text-xs font-medium text-gray-500 bg-white/80 px-3 py-1.5 rounded-full border border-gray-200">
                        {t('db.diseaseId')} {shownDisease.id}
                      </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-950 leading-tight">
                      {shownDisease.name}
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 mt-2 max-w-3xl">
                      {shownDisease.fullName}
                    </p>

                    {(shownDisease.notifiable || shownDisease.zoonotic || shownDisease.requiresVeterinarian) && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {shownDisease.notifiable && (
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-800 bg-red-100 border border-red-200 px-3 py-1.5 rounded-full">
                            <Siren className="w-4 h-4" />
                            {t('db.notifiable')}
                          </span>
                        )}
                        {shownDisease.zoonotic && (
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-900 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full">
                            <ShieldAlert className="w-4 h-4" />
                            {t('db.zoonotic')}
                          </span>
                        )}
                        {shownDisease.requiresVeterinarian && (
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-full">
                            <ShieldCheck className="w-4 h-4" />
                            {t('db.vetRequired')}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDisease(null)}
                  className="w-11 h-11 rounded-full shadow-sm transition-colors flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #d1d5db',
                    color: '#111827',
                  }}
                  aria-label="Close disease details"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} style={{ color: '#111827' }} />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/85 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em]">{t('db.basicInfo')}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{t('db.diseaseName')}</p>
                  <p className="text-lg font-bold text-gray-900">{shownDisease.name}</p>
                  <p className="text-sm text-gray-600 mt-2">{shownDisease.fullName}</p>
                </div>

                <div className="bg-white/85 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Pill className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em]">{t('db.medication')}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{t('db.recommended')}</p>
                  <p className="text-base font-semibold text-gray-900 leading-relaxed">{shownDisease.medication}</p>
                </div>

                <div className="bg-white/85 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em]">{t('db.effectiveness')}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{t('db.expected')}</p>
                  <p className="text-base font-semibold text-gray-900 leading-relaxed">{shownDisease.effectiveness}</p>
                </div>
              </div>
            </div>

            <div className="px-8 py-8 sm:px-10 bg-white">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-red-50/80 border border-red-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t('db.symptoms')}</h3>
                      <p className="text-sm text-gray-500">{t('db.symptomsSub')}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {shownDisease.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span className="leading-relaxed">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50/80 border border-blue-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t('db.diagMethod')}</h3>
                      <p className="text-sm text-gray-500">{t('db.diagSub')}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{shownDisease.diagnosis}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 mt-6">
                <div className="bg-emerald-50/80 border border-emerald-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t('db.plan')}</h3>
                      <p className="text-sm text-gray-500">{t('db.planSub')}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{shownDisease.treatment}</p>

                  <div className="mt-5 bg-white/90 border border-emerald-200 rounded-2xl p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 mb-2">
                      {t('db.recMed')}
                    </p>
                    <p className="font-semibold text-gray-900 leading-relaxed">{shownDisease.medication}</p>
                  </div>
                </div>

                <div className="bg-amber-50/80 border border-amber-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t('db.prec')}</h3>
                      <p className="text-sm text-gray-500">{t('db.precSub')}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {shownDisease.precautions.map((precaution, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <span className="leading-relaxed">{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedDisease(null)}
                  className="px-6 py-3 rounded-2xl transition-colors font-semibold shadow-sm inline-flex items-center gap-2"
                  style={{
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    border: '1px solid #111827',
                  }}
                >
                  {t('db.close')}
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
