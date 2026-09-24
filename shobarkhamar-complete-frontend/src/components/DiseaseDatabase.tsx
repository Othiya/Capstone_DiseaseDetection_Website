import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, LogIn, LogOut, Search, Fish, Bird, AlertCircle, Info, FileText, ShieldCheck, Pill, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageSwitcher';
import { FISH_DATABASE_BN } from '../i18n/fish';
import { getToken } from '../services/api';
import { LoginModal } from './LoginModal';

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
}

export function DiseaseDatabase() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'fish' | 'poultry'>('all');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // This page is public: visitors who are not logged in get a Login button and go back to Home.
  const isLoggedIn = Boolean(getToken());

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    navigate('/');
  };

  // Mock disease database - reflects the Disease table structure from ERD
  const diseaseDatabase: Disease[] = [
    {
      id: 'F1',
      name: 'Bacterial Red Disease',
      fullName: 'Bacterial Red Disease (Hemorrhagic Septicemia)',
      type: 'fish',
      symptoms: [
        '2–5 small reddish spots/patches limited to specific areas of the body (each less than 1 cm across)',
        'Reddish marks at the base of the fins (fin edges still intact)',
        'Little change in behaviour at first, but fish gradually become lethargic'
      ],
      diagnosis: 'Visual signs of haemorrhage on skin and fins, confirmed by isolating the bacteria (Aeromonas / Pseudomonas) from kidney or blood in a fisheries laboratory',
      treatment: 'Oxytetracycline medicated feed, potassium permanganate pond disinfection and improved water quality',
      medication: 'Oxytetracycline 50–75 mg/kg body weight/day in feed for 7–10 days',
      precautions: [
        'Increase aeration immediately',
        'Stop feeding unmedicated commercial feed',
        'Remove dead and weak fish every day',
        'Do not discharge pond water into natural drainage during treatment',
        'Apply quicklime (1–2 kg/decimal) to improve water quality'
      ],
      effectiveness: 'Good when treated early; recovery depends on water quality and prompt medicated feeding'
    },
    {
      id: 'F2',
      name: 'Aeromoniasis',
      fullName: 'Bacterial Disease – Aeromoniasis (Motile Aeromonas Septicemia)',
      type: 'fish',
      symptoms: [
        'Widespread bleeding or deep ulcers/sores over the whole body',
        'Swollen belly',
        'Swollen eyes',
        'Sudden deaths without any warning signs',
        'Scales coming off',
        'Fin edges turning pale and tearing',
        'Heavy bleeding on the fins',
        'Pale gills (as if anaemic)',
        'Lethargic, swimming slowly at the water surface and losing balance',
        'Fish stop eating completely'
      ],
      diagnosis: 'Clinical signs of ulcers and haemorrhage, confirmed by isolating Aeromonas hydrophila from lesions or internal organs',
      treatment: 'Oxytetracycline or florfenicol medicated feed, potassium permanganate dip for severe ulcers, and water quality correction',
      medication: 'Oxytetracycline 50–75 mg/kg body weight/day in feed for 7–10 days',
      precautions: [
        'Reduce stocking density',
        'Exchange 20–30% of the pond water',
        'Handle fish gently to avoid wounds',
        'Observe withdrawal periods before harvesting',
        'Lime the pond with quicklime (1 kg/decimal)'
      ],
      effectiveness: 'Good with early medicated feeding and better water quality; stressed ponds may relapse'
    },
    {
      id: 'F3',
      name: 'Bacterial Gill Disease',
      fullName: 'Bacterial Gill Disease',
      type: 'fish',
      symptoms: [
        'Swollen gills that are reddish or bleeding',
        'Sudden, widespread deaths among the fish (across a large part of the pond)',
        'Gill filaments stuck together',
        'Gill cover (operculum) staying open',
        'Fish facing into the water current or crowding at the water surface'
      ],
      diagnosis: 'Microscopic gill examination showing bacterial mats on the gill filaments; usually linked to poor water quality and high organic load',
      treatment: 'Potassium permanganate or salt bath, with oxytetracycline feed if the infection is systemic',
      medication: 'Potassium permanganate 2.0–2.5 mg/L, or salt (NaCl) 1–2% dip for 10 minutes',
      precautions: [
        'Aerate heavily during bath treatments',
        'Reduce the feeding rate',
        'Clear bottom sludge to lower the organic load',
        'Avoid overcrowding',
        'Test water quality (oxygen, ammonia) regularly'
      ],
      effectiveness: 'Good once water quality is corrected; comes back if the organic load stays high'
    },
    {
      id: 'F4',
      name: 'Saprolegniasis',
      fullName: 'Fungal Disease – Saprolegniasis (Cotton Wool Disease)',
      type: 'fish',
      symptoms: [
        'White or grey cotton-like coating on the skin',
        'The coating turning brown or green',
        'Cotton-like white coating on the fins, with worn fin edges',
        'Cotton-like white coating on the gills',
        'In severe cases, floating head-down'
      ],
      diagnosis: 'Visible cotton-like growth, confirmed by microscopic examination of a wet mount showing fungal hyphae',
      treatment: 'Salt bath or potassium permanganate bath, and removing the cause of stress or injury',
      medication: 'Salt bath: 10–30 g/L (1–3%) NaCl for 5–10 minutes',
      precautions: [
        'Handle fish carefully to avoid injuries',
        'Remove dead fish and eggs quickly',
        'Keep water clean and avoid sudden temperature drops',
        'Do not use unbuffered chemicals on fish eggs',
        'Treat the underlying wounds or parasites'
      ],
      effectiveness: 'Good for early skin infections; severe gill infection is often fatal'
    },
    {
      id: 'F5',
      name: 'Parasitic Diseases',
      fullName: 'Parasitic Diseases',
      type: 'fish',
      symptoms: [
        'Pinhead-sized white dots on the skin (about 0.5–1 mm)',
        'More grey mucus (slime) on the body than normal',
        'Small white dots on the fins',
        'Heavy parasite load on the gills, fish struggling to breathe',
        'Rubbing or scratching the body against objects',
        'Swimming abnormally'
      ],
      diagnosis: 'Microscopic examination of skin and gill scrapings to identify the parasite',
      treatment: 'Formalin or salt bath; praziquantel for flukes',
      medication: 'Formalin 25 mg/L long-term pond treatment, or salt dip 10–20 g/L NaCl for 10–15 minutes',
      precautions: [
        'Keep strong aeration — formalin lowers oxygen in the water',
        'Quarantine new fish before stocking',
        'Dry and lime the pond between crops',
        'Avoid overstocking',
        'Repeat treatment as advised by a fisheries officer if the parasite has a long life cycle'
      ],
      effectiveness: 'High when the parasite is correctly identified and treatment is repeated as needed'
    },
    {
      id: 'F6',
      name: 'White Tail Disease',
      fullName: 'Viral Disease – White Tail Disease (Macrobrachium rosenbergii nodavirus)',
      type: 'fish',
      symptoms: [
        'Milky white tail muscle in post-larvae and prawns',
        'Whiteness spreads from the tail towards the head',
        'Reduced feeding and weak swimming',
        'Sudden mass deaths in hatcheries and nurseries',
        'Mortality can reach 100% in post-larvae'
      ],
      diagnosis: 'Clinical signs confirmed by PCR testing for Macrobrachium rosenbergii nodavirus (MrNV)',
      treatment: 'No cure; supportive care, immunity boosters and strict biosecurity',
      medication: 'No antiviral treatment — Vitamin C 500–1000 mg/kg feed to support uninfected stock',
      precautions: [
        'Quarantine infected ponds immediately',
        'Disinfect water with chlorine before discharge',
        'Stock only PCR-screened post-larvae',
        'Dry and lime pond bottoms before restocking',
        'Destroy affected stock biosecurely'
      ],
      effectiveness: 'Very low once infected — prevention through biosecurity is the only control'
    },
    {
      id: '2',
      name: 'NVD',
      fullName: 'Newcastle Disease',
      type: 'poultry',
      symptoms: [
        'Respiratory distress and gasping',
        'Greenish watery diarrhea',
        'Twisted neck and paralysis',
        'Swelling around eyes and neck',
        'Sudden death in acute cases'
      ],
      diagnosis: 'Clinical signs, post-mortem examination, virus isolation, serological tests',
      treatment: 'Use antibiotics, supportive therapy, vaccination of healthy birds',
      medication: 'Oxytetracycline 250mg - 50mg per kg body weight',
      precautions: [
        'Immediate quarantine of affected birds',
        'Vaccinate all healthy birds',
        'Proper disposal of dead birds',
        'Enhanced biosecurity measures',
        'Thorough disinfection of premises'
      ],
      effectiveness: 'Moderate - 60-70% with treatment, prevention through vaccination is key'
    },
    {
      id: '4',
      name: 'Coccidiosis',
      fullName: 'Coccidiosis',
      type: 'poultry',
      symptoms: [
        'Bloody diarrhea',
        'Ruffled feathers and depression',
        'Reduced feed consumption',
        'Dehydration',
        'Poor growth rate'
      ],
      diagnosis: 'Fecal examination for oocysts, post-mortem intestinal lesions',
      treatment: 'Anticoccidial medication, supportive care',
      medication: 'Amprolium or Sulfonamides',
      precautions: [
        'Maintain dry litter conditions',
        'Proper ventilation',
        'Regular cleaning and disinfection',
        'Avoid overcrowding',
        'Prophylactic medication in feed'
      ],
      effectiveness: 'High - 85% recovery with early treatment'
    },
    {
      id: '5',
      name: 'Avian Influenza',
      fullName: 'Avian Influenza',
      type: 'poultry',
      symptoms: [
        'Sudden death or severe weakness',
        'Respiratory distress',
        'Swelling or discoloration of the comb and wattles',
        'Drop in egg production',
        'Diarrhea and neurological signs'
      ],
      diagnosis: 'Urgent veterinary assessment and laboratory confirmation are required',
      treatment: 'No flock-level curative treatment; follow official outbreak-control instructions',
      medication: 'Not applicable without veterinary direction',
      precautions: [
        'Immediately isolate the flock',
        'Restrict movement of birds and equipment',
        'Use personal protective equipment',
        'Do not handle or sell sick or dead birds',
        'Notify the local livestock authority'
      ],
      effectiveness: 'Control depends on rapid reporting, quarantine, and official response'
    },
    {
      id: '6',
      name: 'Pullorum',
      fullName: 'Pullorum Disease',
      type: 'poultry',
      symptoms: [
        'White diarrhea in young chicks',
        'Pasted vents',
        'Weakness and huddling',
        'Poor growth',
        'High chick mortality'
      ],
      diagnosis: 'Veterinary examination with bacterial culture or approved serological testing',
      treatment: 'Testing, removal of carriers, sanitation, and disease-free breeding stock',
      medication: 'Only under veterinary and regulatory direction',
      precautions: [
        'Separate affected birds',
        'Stop movement of eggs and birds',
        'Disinfect incubators and housing',
        'Test breeding flocks',
        'Source chicks from certified disease-free stock'
      ],
      effectiveness: 'Best controlled through testing and carrier elimination'
    },
    {
      id: '7',
      name: 'Salmonellosis',
      fullName: 'Salmonellosis',
      type: 'poultry',
      symptoms: [
        'Diarrhea and dehydration',
        'Reduced appetite',
        'Weakness and poor growth',
        'Reduced egg production',
        'Increased mortality in young birds'
      ],
      diagnosis: 'Bacterial culture and antimicrobial sensitivity testing',
      treatment: 'Veterinary-directed flock management and targeted treatment when indicated',
      medication: 'Selected from laboratory sensitivity results',
      precautions: [
        'Isolate affected birds',
        'Disinfect housing and equipment',
        'Protect feed and water from contamination',
        'Control rodents and wild birds',
        'Follow food-safety and withdrawal-period rules'
      ],
      effectiveness: 'Varies; sanitation and prevention are essential for long-term control'
    }
  ];

  // Bangla text for fish entries (see src/i18n/fish.ts); poultry entries stay in English.
  const localizedDatabase = diseaseDatabase.map((disease) =>
    lang === 'bn' && disease.type === 'fish' && FISH_DATABASE_BN[disease.id]
      ? { ...disease, ...FISH_DATABASE_BN[disease.id] }
      : disease
  );
  const shownDisease = selectedDisease
    ? localizedDatabase.find((d) => d.id === selectedDisease.id) ?? selectedDisease
    : null;

  const filteredDiseases = localizedDatabase.filter(disease => {
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
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t('common.logout')}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>{t('common.login')}</span>
                </button>
              )}
              <LanguageToggle />
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
              <option value="poultry">Poultry Only</option>
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
                      <Bird className="w-6 h-6 text-green-600" />
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
                        {disease.type === 'fish' ? t('common.fishDisease') : 'Poultry Disease'}
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

          {filteredDiseases.length === 0 && (
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
                      <Bird className="w-9 h-9" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full ${
                        shownDisease.type === 'fish'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {shownDisease.type === 'fish' ? t('common.fishDisease') : 'Poultry Disease'}
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

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}
