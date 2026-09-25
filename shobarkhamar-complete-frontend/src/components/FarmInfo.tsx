import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { PoultryIcon } from './PoultryIcon';
import { ArrowLeft, LogOut, Fish, Save, Loader2 } from 'lucide-react';
import { createFarm, getFarms, getToken } from '../services/api';
import type { Farm } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';

export function FarmInfo() {
  // This page can be reached by URL without logging in, so the back link must
  // go Home rather than into the logged-in dashboard.
  const isLoggedIn = Boolean(getToken());

  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'fish';

  const [farmName, setFarmName] = useState('');
  const [address, setAddress] = useState('');
  const [areaSize, setAreaSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Farms the user already registered for this species, so they don't have to
  // create a duplicate every time they run a detection.
  const [savedFarms, setSavedFarms] = useState<Farm[]>([]);

  useEffect(() => {
    let active = true;
    if (!isLoggedIn) return;
    const wanted = type === 'fish' ? 'FISH' : 'POULTRY';
    getFarms()
      .then((farms) => active && setSavedFarms(farms.filter((f) => f.farm_type === wanted)))
      .catch(() => active && setSavedFarms([]));
    return () => { active = false; };
  }, [isLoggedIn, type]);



  const handleSave = async () => {
    if (!farmName.trim()) {
      setError(t('farm.errName'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const farm = await createFarm({
        farm_name: farmName.trim(),
        farm_type: type === 'fish' ? 'FISH' : 'POULTRY',
        address: address.trim() || undefined,
        area_size: areaSize ? parseFloat(areaSize) : undefined,
      });

      // Farm created — go straight to detection with it selected
      navigate(`/detection?type=${type}&farm=${farm.farm_id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('farm.errCreate'));
    } finally {
      setIsLoading(false);
    }
  };

  const accentColor = type === 'fish' ? 'blue' : 'green';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={isLoggedIn ? '/selection' : '/'} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center gap-2">
                {type === 'fish'
                  ? <Fish className="w-6 h-6 text-blue-600" />
                  : <PoultryIcon size="1.5rem" />}
                <h1 className="text-2xl font-bold text-gray-900">
                  {type === 'fish' ? t('farm.titleFish') : t('farm.titlePoultry')}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {type === 'fish' ? t('farm.registerFish') : t('farm.registerPoultry')}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {t('farm.needFarm')}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {savedFarms.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-1">{t('farm.saved')}</p>
              <p className="text-xs text-gray-500 mb-3">{t('farm.savedHint')}</p>
              <div className="flex flex-wrap gap-2">
                {savedFarms.map((farm) => (
                  <button
                    key={farm.farm_id}
                    type="button"
                    onClick={() => navigate(`/detection?type=${type}&farm=${farm.farm_id}`)}
                    className="px-4 py-2 rounded-full border border-gray-300 bg-white hover:border-gray-500 hover:shadow-sm transition text-sm font-medium text-gray-800"
                  >
                    {farm.farm_name}
                    {farm.address && <span className="text-gray-500 font-normal"> — {farm.address}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-5">
            {/* Farm Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('farm.name')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${accentColor}-500`}
                placeholder={type === 'fish' ? t('farm.namePhFish') : t('farm.namePhPoultry')}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('common.address')} <span className="text-gray-400 font-normal">{t('common.optional')}</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${accentColor}-500`}
                placeholder={t('farm.addressPh')}
              />
            </div>

            {/* Area Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('farm.area')} <span className="text-gray-400 font-normal">{t('common.optional')}</span>
              </label>
              <input
                type="number"
                value={areaSize}
                onChange={(e) => setAreaSize(e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${accentColor}-500`}
                placeholder={t('farm.areaPh')}
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading
                ? <><Loader2 className="w-5 h-5 animate-spin" />{t('farm.creating')}</>
                : <><Save className="w-5 h-5" />{t('farm.save')}</>}
            </button>
            <button
              onClick={() => navigate(`/detection?type=${type}`)}
              className="bg-gray-200 text-gray-800 px-6 py-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              {t('farm.skip')}
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>{t('farm.noteLabel')}</strong> {t('farm.note')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
