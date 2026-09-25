import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { PoultryIcon } from './PoultryIcon';
import { Upload, ArrowLeft, Loader2, Fish, LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import fishImage from 'figma:asset/62f52d45234fa34e0569cc9cc6fc66e654838740.png';
import { analyzeImage, quickAnalyzeImage, getFarms, DiagnosisResponse, TargetSpecies, getToken } from '../services/api';
import { notificationService } from '../services/notifications';
import { useLanguage } from '../i18n/LanguageContext';
import { getDiseaseContent, diseaseDisplayName } from '../services/diseaseContent';
import type { DiseaseContent } from '../services/diseaseContent';

export function Detection() {
  // This page can be reached by URL without logging in, so the back link must
  // go Home rather than into the logged-in dashboard.
  const isLoggedIn = Boolean(getToken());

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const type = (searchParams.get('type') || 'fish') as TargetSpecies;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [symptomsText, setSymptomsText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // A diagnosis has to belong to a farm for the uploaded image to be stored, which is
  // what lets the treatment page show it again later (e.g. opened from a notification).
  const [farmId, setFarmId] = useState<string | null>(null);
  const [farmsLoaded, setFarmsLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    if (!isLoggedIn) { setFarmsLoaded(true); return; }
    const wanted = searchParams.get('farm');
    getFarms()
      .then((farms) => {
        if (!active) return;
        const forSpecies = farms.filter((f) => f.farm_type === (type === 'fish' ? 'FISH' : 'POULTRY'));
        const chosen = wanted && farms.find((f) => f.farm_id === wanted);
        setFarmId((chosen || forSpecies[0] || farms[0])?.farm_id ?? null);
      })
      .catch(() => active && setFarmId(null))
      .finally(() => active && setFarmsLoaded(true));
    return () => { active = false; };
  }, [isLoggedIn, type, searchParams]);

  // Disease display names for both species come from the backend.
  const [diseaseNames, setDiseaseNames] = useState<DiseaseContent[]>([]);

  useEffect(() => {
    let active = true;
    getDiseaseContent()
      .then((content) => active && setDiseaseNames(content))
      .catch(() => active && setDiseaseNames([]));
    return () => { active = false; };
  }, []);

  const [apiError, setApiError] = useState<string | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDiseaseModal, setShowDiseaseModal] = useState(false);
  const [showTreatmentPromptModal, setShowTreatmentPromptModal] = useState(false);

  const [result, setResult] = useState<Partial<DiagnosisResponse> | null>(null);


  const setFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setSelectedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setApiError(null);

    try {
      // With a farm we store the diagnosis and its image server-side; without one we can
      // still predict, but the image only lives in this page's state.
      const diagnosis = farmId
        ? await analyzeImage(selectedFile, type, farmId, symptomsText)
        : await quickAnalyzeImage(selectedFile, type);
      setResult(diagnosis);
      // Create notification
      const ai = diagnosis.ai_result;
      notificationService.addDiagnosisNotification(
        ai?.is_healthy ?? true,
        ai?.disease_name,
        type === 'fish' ? 'fish' : 'poultry',
        diagnosis.diagnosis_id,
      );
      setShowSuccessModal(true);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : t('det.errAnalysis'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSuccessOk = () => {
    setShowSuccessModal(false);
    setShowDiseaseModal(true);
  };

  const handleTreatmentYes = () => {
    setShowTreatmentPromptModal(false);
    navigate('/treatment', {
      state: {
        type,
        disease: result?.ai_result?.disease_name,
        image: selectedImage,
        diagnosisId: result?.diagnosis_id,
      },
    });
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setResult(null);
    setApiError(null);
    setSymptomsText('');
    setShowSuccessModal(false);
    setShowDiseaseModal(false);
    setShowTreatmentPromptModal(false);
  };

  const disease = result?.ai_result;
  const NON_DISEASE_CODES = new Set([
    'healthy',
    'healthy_fish',
    'healthy fish',
    'non_poultry',
    'not_fish',
    'not fish',
    'non poultry',
    'non-poultry',
    'not-fish',
    'non poultry detected',
    'invalid image',
  ]);

  const normalizedDiseaseCode = disease?.disease_code?.toLowerCase().replace(/[\s-]+/g, '_');
  const normalizedDiseaseName = disease?.disease_name?.toLowerCase().replace(/[\s-]+/g, '_');
  const isAnalysisUnavailable = !!result && !disease;

  const isActuallyHealthy =
    !disease ||
    disease.is_healthy ||
    NON_DISEASE_CODES.has(normalizedDiseaseCode ?? '') ||
    NON_DISEASE_CODES.has(normalizedDiseaseName ?? '');

  const hasTreatableDisease =
    !!disease &&
    !isActuallyHealthy &&
    disease.needs_treatment !== false;

  const handleDiseaseOk = () => {
    setShowDiseaseModal(false);
    if (result?.ai_result && !isActuallyHealthy) {
      setShowTreatmentPromptModal(true);
    } else {
      handleReset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={isLoggedIn ? '/selection' : '/'} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-2">
              {type === 'fish' ? (
                <Fish className="w-6 h-6 text-blue-600" />
              ) : (
                <PoultryIcon size="2rem" />
              )}
              <h1 className="text-2xl font-bold text-gray-900">
                {type === 'fish' ? t('det.titleFish') : t('det.titlePoultry')}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {isLoggedIn && farmsLoaded && !farmId && (
          <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-900">{t('det.noFarm')}</p>
              <Link to={`/farm-info?type=${type}`} className="inline-block mt-2 font-semibold text-amber-900 underline underline-offset-2">
                {t('det.registerFarm')}
              </Link>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          {type === 'fish' && (
            <div className="rounded-lg overflow-hidden">
              <img src={fishImage} alt="Underwater fish" className="w-full h-48 object-cover" />
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-900">
            {type === 'fish' ? t('det.uploadFish') : t('det.uploadPoultry')}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('det.symptoms')} <span className="text-gray-400 font-normal">{t('common.optional')}</span>
            </label>
            <textarea
              value={symptomsText}
              onChange={(e) => setSymptomsText(e.target.value)}
              rows={2}
              placeholder={t('det.symptomsPh')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{apiError}</div>
          )}

          {!selectedImage ? (
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-700 mb-2">{t('det.drag')}</p>
              <p className="text-sm text-gray-500 mb-4">{t('det.supports')}</p>
              <label className="inline-block">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                <span className="bg-green-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-green-700 transition-colors inline-block">
                  {t('det.select')}
                </span>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <img src={selectedImage} alt="Selected" className="w-full rounded-lg max-h-96 object-contain bg-gray-100" />
              <div className="flex gap-4">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !farmsLoaded}
                  className="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? <><Loader2 className="w-6 h-6 animate-spin" />{t('det.analyzing')}</> : t('det.analyze')}
                </button>
                <button onClick={handleReset} className="bg-gray-200 text-gray-800 px-6 py-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                  {t('det.remove')}
                </button>
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">{t('det.tips')}</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• {t('det.tip1')}</li>
              <li>• {t('det.tip2')}</li>
              <li>• {type === 'fish' ? t('det.tip3Fish') : t('det.tip3Poultry')}</li>
              <li>• {t('det.tip4')}</li>
            </ul>
          </div>
        </div>
      </main>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('det.uploadOk')}</h3>
            <p className="text-gray-600 mb-6">{t('det.uploadOkDesc')}</p>
            <button onClick={handleSuccessOk} className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
              {t('common.ok')}
            </button>
          </div>
        </div>
      )}

      {showDiseaseModal && result && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
            {isActuallyHealthy ? (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                {selectedImage && (
                  <div className="mb-5 overflow-hidden rounded-xl border border-green-100 bg-green-50">
                    <img
                      src={selectedImage}
                      alt="Uploaded sample"
                      className="w-full max-h-56 object-contain bg-white"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('det.allClear')}</h3>
                <p className="text-gray-600 mb-6">
                  {isAnalysisUnavailable
                    ? t('det.unavailable')
                    : normalizedDiseaseCode === 'non_poultry' || normalizedDiseaseName === 'non_poultry'
                      ? 'This image does not appear to be poultry, so no poultry disease was detected.'
                      : normalizedDiseaseCode === 'not_fish' || normalizedDiseaseName === 'not_fish'
                        ? t('det.notFish')
                        : t('det.noDisease')}
                </p>
                <button onClick={handleDiseaseOk} className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  {t('common.ok')}
                </button>
              </>
            ) : (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <AlertCircle className="h-10 w-10 text-red-600" />
                </div>
                {selectedImage && (
                  <div className="mb-5 overflow-hidden rounded-xl border border-red-100 bg-red-50">
                    <img
                      src={selectedImage}
                      alt="Uploaded sample"
                      className="w-full max-h-56 object-contain bg-white"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('det.diseaseDetected')}</h3>
                <p className="text-xl font-bold text-red-600 mb-2 break-words leading-tight px-2">
                  {diseaseDisplayName(diseaseNames, disease.disease_name, lang)}
                </p>
                <p className="text-sm text-gray-600">{t('det.diseaseDesc')}</p>
                <button onClick={handleDiseaseOk} className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold mt-6">
                  {t('common.ok')}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showTreatmentPromptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('det.seeTreatment')}</h3>
            <div className="flex gap-4">
              <button onClick={handleTreatmentYes} className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                {t('common.yes')}
              </button>
              <button onClick={() => { setShowTreatmentPromptModal(false); handleReset(); }} className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold">
                {t('common.no')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
