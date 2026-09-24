import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { ArrowLeft, Pill, AlertCircle, Fish, LogOut, ClipboardList, Syringe, Droplet, AlertTriangle, Info } from 'lucide-react';
import poultryIcon from 'figma:asset/36269bc95e30a658e2dbcacea10d1ccc3ac7bec8.png';
import fishSampleImage from 'figma:asset/81061a8ea05a453e7b182b6e9e85ca8c1777b806.png';
import poultrySampleImage from 'figma:asset/dfc44b2571f492b90efd940d77993d9db48d5a82.png';
import { API_ORIGIN, getDiagnosis } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageSwitcher';
import type { StringKey } from '../i18n/strings';
import { fishDiseaseName, FISH_TREATMENTS_BN } from '../i18n/fish';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function Treatment() {
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
  const disease = state?.disease || '';
  const displayDisease = type === 'fish' ? fishDiseaseName(disease, lang) : disease;
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

  const diseaseKey = disease?.toLowerCase().replace(/[\s-]+/g, '_') || '';

  const treatmentMap: Record<string, any> = {
    avian_influenza: {
      treatment_id: 'TRT-POULTRY-AVIAN-INFLUENZA',
      treatment_name: 'Avian Influenza Response Protocol',
      medication_name: 'No flock-level curative treatment',
      application_method: 'VETERINARY_RESPONSE',
      dosage_text: 'Do not self-medicate. Contact the local livestock authority or a licensed veterinarian immediately.',
      duration_days: 0,
      precaution: 'Isolate the flock, restrict movement, use protective equipment, and do not handle or sell sick or dead birds.',
      alternatives_note: 'Follow official testing, reporting, quarantine, and disposal instructions for the affected area.',
      reference: 'WOAH. Avian Influenza disease guidance and Terrestrial Animal Health Code.',
    },
    coccidiosis: {
      treatment_id: 'TRT-POULTRY-COCCIDIOSIS',
      treatment_name: 'Coccidiosis Treatment Protocol',
      medication_name: 'Amprolium or Sulfonamides',
      application_method: 'ORAL',
      dosage_text: 'Amprolium: 0.012% in drinking water for 5–7 days. Vitamin K supplement to reduce bleeding.',
      duration_days: 7,
      precaution: 'Keep litter dry. Isolate affected birds. Ensure clean water supply. Disinfect housing regularly.',
      alternatives_note: 'Alternative: Toltrazuril (25mg/kg bodyweight). Sulfadimethoxine in water for 6 days.',
      reference: 'Chapman et al. (2010). A review of coccidiosis in poultry. Avian Pathology, 39(1), 1–6.',
    },
    new_castle_disease: {
      treatment_id: 'TRT-POULTRY-NEWCASTLE',
      treatment_name: 'Newcastle Disease Protocol',
      medication_name: 'Supportive care under veterinary supervision',
      application_method: 'VETERINARY_RESPONSE',
      dosage_text: 'There is no specific antiviral cure. Supportive care and control of secondary infections as directed by a vet.',
      duration_days: 0,
      precaution: 'Isolate infected birds immediately. Disinfect all equipment. Protect healthy birds via vaccination.',
      alternatives_note: 'Electrolyte and vitamin supplements to prevent dehydration and boost immune support.',
      reference: 'WOAH. Newcastle Disease chapter, Terrestrial Manual.',
    },
    newcastle_disease: {
      treatment_id: 'TRT-POULTRY-NEWCASTLE',
      treatment_name: 'Newcastle Disease Protocol',
      medication_name: 'Supportive care under veterinary supervision',
      application_method: 'VETERINARY_RESPONSE',
      dosage_text: 'There is no specific antiviral cure. A veterinarian should direct supportive care.',
      duration_days: 0,
      precaution: 'Isolate affected birds, restrict movement, disinfect equipment, and protect unaffected birds through vaccination.',
      alternatives_note: 'Report severe or rapidly spreading outbreaks to local livestock officials.',
      reference: 'WOAH. Newcastle Disease chapter, Terrestrial Manual.',
    },
    pullorum_disease: {
      treatment_id: 'TRT-POULTRY-PULLORUM',
      treatment_name: 'Pullorum Disease Response Protocol',
      medication_name: 'Veterinary testing and flock control',
      application_method: 'VETERINARY_RESPONSE',
      dosage_text: 'Confirm with laboratory testing before treatment. Recovered birds remain carriers.',
      duration_days: 0,
      precaution: 'Separate affected birds, strengthen hatchery hygiene, and stop movement of eggs and birds.',
      alternatives_note: 'Prioritize sanitation, carrier removal, and sourcing disease-free stock.',
      reference: 'WOAH. Pullorum Disease and Fowl Typhoid guidance, Terrestrial Manual.',
    },
    salmonella: {
      treatment_id: 'TRT-POULTRY-SALMONELLA',
      treatment_name: 'Salmonellosis Treatment Protocol',
      medication_name: 'Enrofloxacin or Trimethoprim-Sulfamethoxazole',
      application_method: 'ORAL',
      dosage_text: 'Enrofloxacin: 10mg/kg bodyweight for 5 days. Conduct sensitivity testing first.',
      duration_days: 5,
      precaution: 'Strict biosecurity. Disinfect surfaces and prevent feed/water contamination.',
      alternatives_note: 'Alternative antibiotics under veterinary guidance based on culture sensitivity.',
      reference: 'EFSA (2019). Salmonella control in poultry flocks. EFSA Journal.',
    },
    salmonellosis: {
      treatment_id: 'TRT-POULTRY-SALMONELLOSIS',
      treatment_name: 'Salmonellosis Response Protocol',
      medication_name: 'Veterinarian-selected antimicrobial when indicated',
      application_method: 'VETERINARY_RESPONSE',
      dosage_text: 'Use culture sensitivity testing before treatment. Adhere to withdrawal periods.',
      duration_days: 0,
      precaution: 'Isolate affected birds, disinfect housing, and protect handlers.',
      alternatives_note: 'Flock sanitation and rodent control are essential to prevent recurrence.',
      reference: 'EFSA. Salmonella control in poultry flocks.',
    },
    bacterial_red_disease: {
      treatment_id: 'TRT-FISH-RED-DISEASE',
      treatment_name: 'Bacterial Red Disease (Hemorrhagic Septicemia) Protocol',
      medication_name: 'Oxytetracycline (In Feed) + Potassium Permanganate Pond Disinfection',
      application_method: 'FEED',
      dosage_text: 'Oxytetracycline medicated feed @ 50–75 mg/kg body weight daily for 7–10 days. Pond Disinfection: Apply Potassium Permanganate at 2.0–2.5 mg/L (approx. 200–250g per decimal-foot).',
      duration_days: 10,
      precaution: 'Stop feeding unmedicated commercial feed. Increase aeration immediately. Do not discharge pond water into natural drainage during treatment.',
      alternatives_note: 'Florfenicol medicated feed (10 mg/kg body weight/day for 10 days) under veterinary advice. Apply quicklime (1–2 kg/decimal) to improve water quality.',
      reference: 'FAO Fisheries Technical Paper: Disease Management in Asian Aquaculture / DoF Bangladesh Guidelines.',
    },
    bacterial_diseases___aeromoniasis: {
      treatment_id: 'TRT-FISH-AEROMONIASIS',
      treatment_name: 'Aeromoniasis Treatment Protocol',
      medication_name: 'Oxytetracycline or Florfenicol Medicated Feed',
      application_method: 'FEED',
      dosage_text: 'Oxytetracycline: 50–75 mg/kg body weight/day mixed in feed for 7–10 consecutive days. Spot treatment: Potassium Permanganate dip (10 ppm for 5–10 minutes) for severe ulcers.',
      duration_days: 10,
      precaution: 'Improve water quality immediately by reducing stocking density or exchanging 20–30% water. Observe strict withdrawal periods before harvesting.',
      alternatives_note: 'Florfenicol @ 10 mg/kg fish body weight for 10 days in feed. Liming the pond with Quicklime (1 kg/decimal).',
      reference: 'MSD Veterinary Manual: Bacterial Diseases in Aquaculture / Egyptian Journal of Aquatic Biology & Fisheries (2023).',
    },
    bacterial_gill_disease: {
      treatment_id: 'TRT-FISH-GILL-DISEASE',
      treatment_name: 'Bacterial Gill Disease Protocol',
      medication_name: 'Potassium Permanganate Bath or Oxytetracycline Feed Treatment',
      application_method: 'BATH',
      dosage_text: 'Pond Water Disinfection: Potassium Permanganate @ 2.0–2.5 mg/L or Salt (NaCl) @ 1–2% dip for 10 minutes. In-feed Oxytetracycline @ 50 mg/kg fish body weight/day for 7 days if infection is systemic.',
      duration_days: 7,
      precaution: 'Aerate pond heavily during bath treatments. Maintain low organic load by reducing feeding rate and clearing bottom sludge.',
      alternatives_note: 'Copper Sulfate bath @ 0.5–1.0 mg/L in water with total alkalinity > 50 mg/L CaCO3.',
      reference: 'FDA Approved Aquaculture Drugs / FAO Aquaculture Health Management.',
    },
    fungal_diseases_saprolegniasis: {
      treatment_id: 'TRT-FISH-SAPROLEGNIASIS',
      treatment_name: 'Saprolegniasis (Fungal) Treatment Protocol',
      medication_name: 'Sodium Chloride (Salt) Bath / Potassium Permanganate',
      application_method: 'BATH',
      dosage_text: 'Salt Bath: Dip infected fish in 10–30 g/L (1–3%) NaCl solution for 5–10 minutes. Pond Water Bath: Potassium Permanganate @ 2.0–3.0 mg/L.',
      duration_days: 7,
      precaution: 'Fungal infections are secondary to physical injury or stress. Handle fish carefully during sampling. Avoid using unbuffered chemicals on fish eggs.',
      alternatives_note: 'Hydrogen peroxide bath @ 250–500 mg/L for 15 minutes (under strict veterinary control).',
      reference: 'WOAH Aquatic Animal Health Code / Aquaculture, Fish & Fisheries Review.',
    },
    parasitic_diseases: {
      treatment_id: 'TRT-FISH-PARASITIC',
      treatment_name: 'Parasitic Disease Protocol',
      medication_name: 'Formalin or Sodium Chloride (Salt) Bath',
      application_method: 'BATH',
      dosage_text: 'Formalin: 25 mg/L (ppm) long-term pond treatment OR 150–250 mg/L short bath for 30–60 minutes under high aeration. Salt dip: 10–20 g/L NaCl for 10–15 minutes.',
      duration_days: 7,
      precaution: 'Formalin removes oxygen from water (1 ppm formalin depletes ~1 ppm dissolved oxygen); maintain vigorous aeration during and after treatment.',
      alternatives_note: 'Praziquantel @ 2 mg/L bath for fluke control. In-feed Trichlorfon or organophosphates (where approved by veterinary authorities).',
      reference: 'FDA Approved Aquaculture Drugs / PMC Parasitic Disease Treatment in Aquaculture (2023).',
    },
    viral_diseases_white_tail_disease: {
      treatment_id: 'TRT-FISH-WHITE-TAIL',
      treatment_name: 'White Tail Disease — Supportive Care & Biosecurity Only',
      medication_name: 'No Antiviral Treatment — Biosecurity & Immunity Booster',
      application_method: 'FEED',
      dosage_text: 'No antiviral cure exists. Add Vitamin C (500–1000 mg/kg feed) and immunostimulants to feed to strengthen uninfected stock.',
      duration_days: 14,
      precaution: 'White Tail Disease causes up to 100% mortality in post-larvae/prawns. Immediately quarantine infected ponds. Disinfect culture water with chlorine before discharge.',
      alternatives_note: 'Eradicate affected stock biosecurely. Dry and line-lime pond bottoms prior to re-stocking PCR-screened post-larvae.',
      reference: 'WOAH Aquatic Animal Health Code Chapter 9.8 (White Tail Disease).',
    },
  };

  const baseTreatmentData = treatmentMap[diseaseKey] || {
    treatment_id: `TRT-${generateUUID().slice(0, 8).toUpperCase()}`,
    treatment_name: disease ? t('trt.fallback.name', { disease: displayDisease }) : t('trt.fallback.nameNoDisease'),
    medication_name: t('trt.fallback.medication'),
    application_method: null,
    dosage_text: t('trt.fallback.dosage'),
    duration_days: null,
    precaution: t('trt.fallback.precaution'),
    alternatives_note: t('trt.fallback.alternatives'),
    reference: null,
    requires_veterinarian: true,
  };

  // Bangla text for fish treatments (see src/i18n/fish.ts); poultry treatments stay in English.
  const banglaTreatment = lang === 'bn' && type === 'fish' ? FISH_TREATMENTS_BN[diseaseKey] : undefined;
  const treatmentData = banglaTreatment ? { ...baseTreatmentData, ...banglaTreatment } : baseTreatmentData;

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
    const key = methodIcons[method] ? method : 'FEED';
    return {
      icon: methodIcons[key],
      text: t(`method.${key}.text` as StringKey),
      description: t(`method.${key}.desc` as StringKey),
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

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const handleAnalyzeAnother = () => navigate(`/detection?type=${type}`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={cameFromNotifications ? '/notifications' : '/selection'} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{t('trt.header')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
              <LogOut className="w-5 h-5" /><span>{t('common.logout')}</span>
            </button>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Disease Summary Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            {type === 'fish'
              ? <Fish className="w-8 h-8 text-blue-600" />
              : <img src={poultryIcon} alt="Poultry" className="w-8 h-8" />}
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
          <Link to={cameFromNotifications ? '/notifications' : '/selection'} className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-lg">
            {t('common.back')}
          </Link>
        </div>
      </main>
    </div>
  );
}