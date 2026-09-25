import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { PoultryIcon } from './PoultryIcon';
import { ArrowLeft, Pill, AlertCircle, Fish, LogOut, ClipboardList, Syringe, Droplet, AlertTriangle, Info } from 'lucide-react';
import fishSampleImage from 'figma:asset/81061a8ea05a453e7b182b6e9e85ca8c1777b806.png';
import poultrySampleImage from 'figma:asset/dfc44b2571f492b90efd940d77993d9db48d5a82.png';
import { API_ORIGIN, getDiagnosis, getToken } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';
import type { StringKey } from '../i18n/strings';
import { getDiseaseByCode, pick } from '../services/diseaseContent';
import type { DiseaseContent } from '../services/diseaseContent';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function Treatment() {
  // This page can be reached by URL without logging in, so the back link must
  // go Home rather than into the logged-in dashboard.
  const isLoggedIn = Boolean(getToken());

  const location = useLocation();
  const navigate = useNavigate();
  const { t, lang, locale, num } = useLanguage();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const state = location.state as {
    from?: string;
    type?: string;
    disease?: string;
    treatment?: string;
    image?: string;
    diagnosisId?: string;
    confidence?: number;
    severity?: string;
  } | undefined;

  const urlParams = new URLSearchParams(window.location.search);
  const typeFromUrl = urlParams.get('type');

  const type = state?.type || typeFromUrl || 'fish';
  const cameFromNotifications = state?.from === 'notifications';
  // Back should return to wherever the user opened this from.
  const backTo = cameFromNotifications ? '/notifications'
    : state?.from === 'history' ? '/history'
    : isLoggedIn ? '/selection' : '/';
  const disease = state?.disease || '';
  const diagnosisId = state?.diagnosisId;
  const confidence = state?.confidence ?? null;
  const severity = state?.severity || '';
  const image = uploadedImage || state?.image || (type === 'fish' ? fishSampleImage : poultrySampleImage);

  useEffect(() => {
    let isMounted = true;
    async function loadDiagnosisImage() {
      if (!diagnosisId) return;
      try {
        const diagnosis = await getDiagnosis(diagnosisId);
        const latestImage = diagnosis.images?.[0]?.image_url;
        if (!latestImage || !isMounted) return;
        const resolvedImage = latestImage.startsWith('http')
          ? latestImage
          : `${API_ORIGIN}${latestImage.startsWith('/') ? latestImage : `/${latestImage}`}`;
        setUploadedImage(resolvedImage);
      } catch { /* fall back to static image */ }
    }
    loadDiagnosisImage();
    return () => { isMounted = false; };
  }, [diagnosisId]);

  // Treatment content comes from the backend (app/seeds/), in both languages.
  // Until it loads, treatmentData falls back to the veterinarian-referral text so the
  // page never shows a dosing protocol it has not actually confirmed.
  const [content, setContent] = useState<DiseaseContent | null>(null);

  useEffect(() => {
    let active = true;
    getDiseaseByCode(disease)
      .then((found) => active && setContent(found))
      .catch(() => active && setContent(null));
    return () => { active = false; };
  }, [disease]);

  const displayDisease = content ? pick(content.short_name, lang) : disease;

  const treatmentData = useMemo(() => {
    const source = content?.treatment;
    if (!source) {
      return {
        treatment_id: `TRT-${generateUUID().slice(0, 8).toUpperCase()}`,
        treatment_name: disease ? t('trt.fallback.name', { disease: displayDisease }) : t('trt.fallback.nameNoDisease'),
        medication_name: t('trt.fallback.medication'),
        application_method: null as string | null,
        dosage_text: t('trt.fallback.dosage'),
        duration_days: null as number | null,
        precaution: t('trt.fallback.precaution'),
        alternatives_note: t('trt.fallback.alternatives'),
        reference: null as string | null,
        requires_veterinarian: true,
      };
    }
    return {
      treatment_id: source.treatment_code,
      treatment_name: pick(source.name, lang),
      medication_name: pick(source.medication, lang),
      application_method: source.application_method as string | null,
      dosage_text: pick(source.dosage, lang),
      duration_days: source.duration_days,
      precaution: pick(source.precaution, lang),
      alternatives_note: pick(source.alternatives, lang),
      reference: source.reference,
      requires_veterinarian: source.requires_veterinarian,
    };
  }, [content, lang, disease, displayDisease, t]);

  const prescription = {
    id: `RX-${Date.now()}`,
    date: new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }),
  };

  const getApplicationMethodDisplay = (method: string) => {
    // Text for each method is in src/i18n/strings.ts ('method.<KEY>.text' / 'method.<KEY>.desc')
    const methodIcons: { [key: string]: any } = {
      IN_WATER: Droplet, ORAL: Pill, FEED: Pill, TOPICAL: Syringe,
      INJECTION: Syringe, DIP: Droplet, SPRAY: Droplet, BATH: Droplet,
    };
    // An unmapped method (e.g. VETERINARY_RESPONSE) has no farmer-applied form, so it
    // must not fall back to a concrete one like "Medicated Feed".
    if (!methodIcons[method]) return null;
    return {
      icon: methodIcons[method],
      text: t(`method.${method}.text` as StringKey),
      description: t(`method.${method}.desc` as StringKey),
    };
  };

  const requiresVeterinarian = Boolean(treatmentData.requires_veterinarian);
  const applicationMethod = treatmentData.application_method
    ? getApplicationMethodDisplay(treatmentData.application_method)
    : null;
  const ApplicationIcon = applicationMethod?.icon;

  const protocolSteps = useMemo(() => {
    if (requiresVeterinarian) {
      return [
        t('trt.vetStep1'),
        t('trt.vetStep2'),
        t('trt.vetStep3'),
        t('trt.vetStep4'),
        t('trt.vetStep5'),
        t('trt.vetStep6'),
      ];
    }
    return [
      t('trt.step1'),
      t('trt.step2', { dosage: treatmentData.dosage_text }),
      applicationMethod ? t('trt.step3', { method: applicationMethod.text, description: applicationMethod.description }) : t('trt.step3Default'),
      t('trt.step4'),
      t('trt.step5'),
      treatmentData.duration_days ? t('trt.step6', { n: treatmentData.duration_days }) : t('trt.step6Default'),
      t('trt.step7'),
    ];
  }, [applicationMethod, requiresVeterinarian, treatmentData, t]);


  const handleAnalyzeAnother = () => navigate(`/detection?type=${type}`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={backTo} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{t('trt.header')}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Disease Summary Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            {type === 'fish'
              ? <Fish className="w-8 h-8 text-blue-600" />
              : <PoultryIcon size="2rem" />}
            <h2 className="text-3xl font-bold text-gray-900">{t('trt.summary')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img src={image} alt="Analyzed sample" className="w-full rounded-lg object-contain bg-gray-100 max-h-80" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-6 bg-red-50 border border-red-200 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-red-800 mb-1">{t('trt.detected')}</p>
                    <p className="text-2xl font-bold text-red-600 mb-1 break-words">{displayDisease || t('trt.unknown')}</p>
                    {confidence && <p className="text-sm text-gray-500">{t('trt.confidence')} {num(typeof confidence === 'number' ? confidence.toFixed(1) : confidence)}%</p>}
                    {severity && <p className="text-sm font-semibold text-orange-600">{t('trt.severity')} {severity}</p>}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800"><span className="font-semibold">{t('trt.sampleType')}</span> {type === 'fish' ? t('trt.sampleFish') : 'Poultry'}</p>
                <p className="text-sm text-blue-800 mt-2"><span className="font-semibold">{t('trt.date')}</span> {prescription.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <Pill className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{t('trt.info')}</h2>
          </div>

          {/* Treatment ID & Name */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-600">{t('trt.id')}</p>
              <p className="font-mono text-sm font-semibold text-gray-900">{treatmentData.treatment_id}</p>
            </div>
            <p className="text-sm text-gray-600 mb-1">{t('trt.name')}</p>
            <p className="text-xl font-bold text-gray-900">{treatmentData.treatment_name}</p>
          </div>

          {/* Application Method */}
          {!requiresVeterinarian && applicationMethod && ApplicationIcon && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <ApplicationIcon className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">{t('trt.method')}</h3>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-1">{applicationMethod.text}</p>
                <p className="text-sm text-gray-700">{applicationMethod.description}</p>
              </div>
            </div>
          )}

          {/* Medication */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{requiresVeterinarian ? t('trt.recommendation') : t('trt.medName')}</p>
              <p className="font-semibold text-gray-900">{treatmentData.medication_name}</p>
            </div>
            {!requiresVeterinarian && treatmentData.duration_days && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('trt.duration')}</p>
                <p className="font-semibold text-gray-900">{t('trt.days', { n: treatmentData.duration_days })}</p>
              </div>
            )}
          </div>

          {/* Dosage */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-green-600 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">{requiresVeterinarian ? t('trt.guidance') : t('trt.dosage')}</h3>
            <p className="text-gray-700">{treatmentData.dosage_text}</p>
          </div>

          {/* Precautions */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">{t('trt.precautions')}</h3>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-line">{treatmentData.precaution}</p>
            </div>
          </div>

          {/* Alternatives */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">{t('trt.alternatives')}</h3>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-line">{treatmentData.alternatives_note}</p>
            </div>
          </div>

          {/* Reference */}
          {treatmentData.reference && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-500">{t('trt.reference')}</h3>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 break-words">{treatmentData.reference}</p>
              </div>
            </div>
          )}

          {/* Protocol */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ClipboardList className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{t('trt.steps')}</h4>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  {protocolSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>{t('trt.important')}</strong> {t('trt.disclaimer')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button onClick={handleAnalyzeAnother} className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg">
            {t('common.analyzeAnother')}
          </button>
          <Link to={backTo} className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-lg">
            {t('common.back')}
          </Link>
        </div>
      </main>
    </div>
  );
}
