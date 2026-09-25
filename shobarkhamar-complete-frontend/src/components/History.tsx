import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { PoultryIcon } from './PoultryIcon';
import { ArrowLeft, LogOut, Clock, Fish, AlertCircle, FileText, Filter, Loader2 } from 'lucide-react';
import { getHistory, DiagnosisResponse, getToken } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';
import { getDiseaseContent, diseaseDisplayName } from '../services/diseaseContent';
import type { DiseaseContent } from '../services/diseaseContent';

export function History() {
  // This page can be reached by URL without logging in, so the back link must
  // go Home rather than into the logged-in dashboard.
  const isLoggedIn = Boolean(getToken());

  const { t, lang, locale, num } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'fish' | 'poultry'>('all');
  const [diagnoses, setDiagnoses] = useState<DiagnosisResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Disease display names for both species come from the backend.
  const navigate = useNavigate();

  const openRecord = (record: DiagnosisResponse) => {
    navigate('/treatment', {
      state: {
        from: 'history',
        type: record.target_species?.toLowerCase(),
        disease: record.ai_result?.disease_name,
        diagnosisId: record.diagnosis_id,
      },
    });
  };

  const [diseaseNames, setDiseaseNames] = useState<DiseaseContent[]>([]);

  useEffect(() => {
    let active = true;
    getDiseaseContent()
      .then((content) => active && setDiseaseNames(content))
      .catch(() => active && setDiseaseNames([]));
    return () => { active = false; };
  }, []);


  useEffect(() => {
    getHistory(0, 100)
      .then((data) => setDiagnoses(data.diagnoses))
      .catch(() => setError('hist.error'))
      .finally(() => setLoading(false));
  }, []);


  const filtered = filter === 'all'
    ? diagnoses
    : diagnoses.filter((d) => d.target_species?.toLowerCase() === filter);

  const recovered = diagnoses.filter((d) => d.status === 'CLOSED').length;
  const inProgress = diagnoses.filter((d) => d.status !== 'CLOSED').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={isLoggedIn ? '/selection' : '/'} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{t('hist.title')}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">{t('hist.records')}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'fish' | 'poultry')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">{t('hist.all')}</option>
                <option value="fish">{t('common.fishOnly')}</option>
                <option value="poultry">{t('common.poultryOnly')}</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{t('hist.loading')}</span>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{t('hist.error')}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">{t('hist.none')}</p>
              <p className="text-gray-500 mb-6">{t('hist.noneSub')}</p>
              <Link to={isLoggedIn ? '/selection' : '/'} className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                {t('hist.start')}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((record) => {
                const species = record.target_species?.toLowerCase();
                const isFish = species === 'fish';
                const disease = record.ai_result;
                const isHealthy = disease?.is_healthy ?? true;

                return (
                  <div
                    key={record.diagnosis_id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openRecord(record)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRecord(record); } }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${isFish ? 'bg-blue-100' : 'bg-green-100'}`}>
                        {isFish
                          ? <Fish className="w-6 h-6 text-blue-600" />
                          : <PoultryIcon size="1.5rem" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {isFish ? t('hist.fishDiag') : t('hist.poultryDiag')}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {new Date(record.created_at).toLocaleDateString(locale, {
                              year: 'numeric', month: 'long', day: 'numeric',
                            })}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            record.status === 'CLOSED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {record.status === 'CLOSED' ? t('hist.closed') : t('hist.open')}
                          </span>
                        </div>

                        {disease ? (
                          <div className="flex items-start gap-2 mb-3">
                            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isHealthy ? 'text-green-600' : 'text-red-600'}`} />
                            <div>
                              <p className={`font-semibold ${isHealthy ? 'text-green-600' : 'text-red-600'}`}>
                                {isHealthy ? t('common.healthy') : diseaseDisplayName(diseaseNames, disease.disease_name, lang)}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mb-3">{t('hist.noAi')}</p>
                        )}

                        {record.symptoms_text && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">{t('hist.symptoms')}</p>
                            <p className="text-sm text-gray-700">{record.symptoms_text}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!loading && !error && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('hist.summary')}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">{num(recovered)}</p>
                <p className="text-sm text-blue-800">{t('hist.closed')}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-600">{num(inProgress)}</p>
                <p className="text-sm text-yellow-800">{t('hist.inProgress')}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-600">{num(diagnoses.length)}</p>
                <p className="text-sm text-gray-800">{t('hist.total')}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
