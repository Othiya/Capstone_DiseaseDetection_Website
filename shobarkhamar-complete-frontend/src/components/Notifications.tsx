import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { PoultryIcon } from './PoultryIcon';
import {
  ArrowLeft, LogOut, Bell, Fish, AlertTriangle, CheckCircle2, Info, Loader2,
  Clock, Microscope, Activity, X, Trash2,
} from 'lucide-react';
import { getHistory, getToken } from '../services/api';
import type { DiagnosisResponse } from '../services/api';
import { notificationService } from '../services/notifications';
import {
  DISMISSED_STORAGE_KEY, getStoredIds,
  READ_STORAGE_KEY, isClearedNotification, setClearedAt, storeIds,
} from '../utils/notifications';
import { useLanguage } from '../i18n/LanguageContext';
import type { StringKey } from '../i18n/strings';
import { getDiseaseContent, diseaseDisplayName } from '../services/diseaseContent';
import type { DiseaseContent } from '../services/diseaseContent';

type Translate = ReturnType<typeof useLanguage>['t'];

type NotifKind = 'disease' | 'healthy' | 'system' | 'info';

interface Notification {
  id: string;
  kind: NotifKind;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  diagnosisId?: string;
  species?: 'fish' | 'poultry';
  diseaseName?: string;
}

function appNotificationToNotification(n: {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  diagnosisId?: string;
}): Notification {
  const lowered = n.message.toLowerCase();
  const species = lowered.includes('poultry') ? 'poultry' : lowered.includes('fish') ? 'fish' : undefined;
  const diseaseName = n.title.startsWith('Disease Detected:')
    ? n.title.replace('Disease Detected:', '').trim()
    : undefined;
  return {
    id: n.id,
    kind: n.type === 'success' ? 'healthy' : n.type === 'warning' ? 'disease' : n.type === 'error' ? 'system' : 'info',
    title: n.title,
    message: n.message,
    timestamp: new Date(n.timestamp),
    read: n.read,
    diagnosisId: n.diagnosisId,
    species,
    diseaseName,
  };
}

const HEALTHY_CODES = new Set(['', 'healthy', 'healthy_fish', 'non_poultry', 'not_fish']);

function diagnosisToNotification(d: DiagnosisResponse): Notification {
  const species = d.target_species?.toLowerCase().includes('poultry') ? 'poultry' : 'fish';
  const date = new Date(d.created_at);
  const code = (d.ai_result?.disease_code ?? d.ai_disease_code ?? '').toLowerCase().replace(/[\s-]+/g, '_');
  const isHealthy = d.ai_result ? d.ai_result.is_healthy : HEALTHY_CODES.has(code);
  const name = d.ai_result?.disease_name ?? (code.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Unknown');

  if (isHealthy) {
    return {
      id: d.diagnosis_id, kind: 'healthy',
      title: 'All Clear — No Disease Detected',
      message: `Your ${species} sample on ${date.toLocaleDateString()} came back healthy.`,
      timestamp: date, read: false, diagnosisId: d.diagnosis_id, species,
    };
  }
  return {
    id: d.diagnosis_id, kind: 'disease',
    title: `Disease Detected — ${name}`,
    message: `${species === 'fish' ? 'Fish' : 'Poultry'} sample: ${name}.`,
    timestamp: date, read: false, diagnosisId: d.diagnosis_id,
    species, diseaseName: name,
  };
}

const SYSTEM_NOTIFICATIONS: Notification[] = [
  {
    id: 'sys-1', kind: 'system',
    title: 'AI Models Updated',
    message: 'Fish and poultry detection models updated for higher accuracy.',
    timestamp: new Date('2026-04-01T08:00:00'), read: false,
  },
  {
    id: 'info-1', kind: 'info',
    title: 'Tip: Upload clear images',
    message: 'Well-lit, focused images increase detection accuracy by up to 30%.',
    timestamp: new Date('2026-03-28T10:00:00'), read: true,
  },
];

function KindIcon({ kind, species }: { kind: NotifKind; species?: string }) {
  if (kind === 'disease') return <AlertTriangle className="w-5 h-5 text-red-500" />;
  if (kind === 'healthy') return species === 'poultry'
    ? <PoultryIcon size="1.25rem" />
    : <Fish className="w-5 h-5 text-green-500" />;
  if (kind === 'system') return <Activity className="w-5 h-5 text-violet-500" />;
  return <Info className="w-5 h-5 text-blue-500" />;
}

function kindStyles(kind: NotifKind, read: boolean) {
  if (read) return 'bg-gray-50 border-gray-200';
  switch (kind) {
    case 'disease': return 'bg-red-50 border-red-200 border-l-4';
    case 'healthy': return 'bg-emerald-50 border-emerald-200 border-l-4';
    case 'system':  return 'bg-violet-50 border-violet-200 border-l-4';
    default:        return 'bg-blue-50 border-blue-200 border-l-4';
  }
}

function timeAgo(date: Date, t: Translate, locale: string | undefined): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return t('notif.justNow');
  if (mins < 60) return t('notif.minsAgo', { n: mins });
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return t('notif.hoursAgo', { n: hrs });
  const days = Math.floor(hrs / 24);
  return days < 7 ? t('notif.daysAgo', { n: days }) : date.toLocaleDateString(locale);
}

export function Notifications() {
  // This page can be reached by URL without logging in, so the back link must
  // go Home rather than into the logged-in dashboard.
  const isLoggedIn = Boolean(getToken());

  const navigate = useNavigate();
  const { t, lang, locale, num } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // Disease names for both species come from the backend so notifications can be
  // shown in Bangla without a second copy of the name list in the frontend.
  const [diseases, setDiseases] = useState<DiseaseContent[]>([]);

  useEffect(() => {
    let active = true;
    getDiseaseContent()
      .then((content) => active && setDiseases(content))
      .catch(() => active && setDiseases([]));
    return () => { active = false; };
  }, []);

  const loadNotifications = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    else setLoading(true);
    setError(null);

    const readIds = new Set(getStoredIds(READ_STORAGE_KEY));
    const dismissedIds = new Set(getStoredIds(DISMISSED_STORAGE_KEY));
    const applyMeta = (n: Notification): Notification => ({ ...n, read: readIds.has(n.id) ? true : n.read });
    const isVisible = (n: Notification) => !dismissedIds.has(n.id) && !isClearedNotification(n.timestamp);

    const token = getToken();
    if (!token) {
      setNotifications(SYSTEM_NOTIFICATIONS.map(applyMeta).filter(isVisible));
      setLoading(false);
      return;
    }

    try {
      const data = await getHistory(0, 50);
      const fromApi = data.diagnoses.map(diagnosisToNotification).map(applyMeta).filter(isVisible);
      const local = notificationService.getAll()
        .map(appNotificationToNotification)
        .map(applyMeta)
        .filter(isVisible);
      const system = SYSTEM_NOTIFICATIONS.map(applyMeta).filter(isVisible);
      const merged = [...local, ...fromApi, ...system].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      setNotifications(merged);
    } catch {
      setError('Could not load notifications from server.');
      const local = notificationService.getAll()
        .map(appNotificationToNotification)
        .map(applyMeta)
        .filter(isVisible);
      setNotifications([
        ...local,
        ...SYSTEM_NOTIFICATIONS.map(applyMeta).filter(isVisible),
      ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadNotifications(); }, []);


  const markAsRead = (id: string) => {
    storeIds(READ_STORAGE_KEY, [...getStoredIds(READ_STORAGE_KEY), id]);
    if (id.startsWith('notif_')) {
      notificationService.markAsRead(id);
    }
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    storeIds(READ_STORAGE_KEY, [...getStoredIds(READ_STORAGE_KEY), ...notifications.map(n => n.id)]);
    notificationService.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismiss = (id: string) => {
    storeIds(DISMISSED_STORAGE_KEY, [...getStoredIds(DISMISSED_STORAGE_KEY), id]);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setClearedAt(Date.now());
    setNotifications([]);
    setSuccessMessage(t('notif.cleared'));
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Fish, poultry and system notifications are all shown in the chosen language.
  const localize = (n: Notification): { title: string; message: string } => {
    if (lang === 'en') return { title: n.title, message: n.message };
    if (n.id === 'sys-1') return { title: t('notif.sys1Title'), message: t('notif.sys1Msg') };
    if (n.id === 'info-1') return { title: t('notif.info1Title'), message: t('notif.info1Msg') };
    if (n.species !== 'fish' && n.species !== 'poultry') return { title: n.title, message: n.message };

    const prefix = n.species === 'poultry' ? 'poultry' : 'fish';
    const isLocal = n.id.startsWith('notif_');
    const name = diseaseDisplayName(diseases, n.diseaseName, lang);
    if (n.kind === 'disease') {
      return {
        title: t(`notif.${prefix}DiseaseTitle` as StringKey, { name }),
        message: isLocal
          ? t(`notif.${prefix}DiseaseLocalMsg` as StringKey)
          : t(`notif.${prefix}DiseaseMsg` as StringKey, { name }),
      };
    }
    if (n.kind === 'healthy') {
      return isLocal
        ? {
            title: t(`notif.${prefix}HealthyLocalTitle` as StringKey),
            message: t(`notif.${prefix}HealthyLocalMsg` as StringKey),
          }
        : {
            title: t(`notif.${prefix}HealthyTitle` as StringKey),
            message: t(`notif.${prefix}HealthyMsg` as StringKey, { date: n.timestamp.toLocaleDateString(locale) }),
          };
    }
    return { title: n.title, message: n.message };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={isLoggedIn ? '/selection' : '/'} className="text-gray-600 hover:text-gray-900"><ArrowLeft className="w-6 h-6" /></Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-900" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? num('9+') : num(unreadCount)}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{t('sel.notifications')}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('notif.yours')}
              {unreadCount > 0 && <span className="ml-3 text-sm font-normal text-gray-500">{t('notif.unread', { n: unreadCount })}</span>}
            </h2>
            <div className="flex gap-3 items-center">
              <button onClick={() => loadNotifications(true)} disabled={refreshing}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <Loader2 className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /> {t('notif.refresh')}
              </button>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-sm text-green-600 hover:text-green-700 font-medium">{t('notif.markAll')}</button>
              )}
              {notifications.length > 0 && (
                <button onClick={clearAll} className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                  <Trash2 className="w-4 h-4" /> {t('notif.clearAll')}
                </button>
              )}
            </div>
          </div>

          {error && <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">{t('notif.loadError')}</div>}
          {successMessage && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">{successMessage}</div>}

          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin" /><span>{t('notif.loading')}</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500 mb-2">{t('notif.none')}</p>
              <p className="text-gray-400 text-sm">{t('notif.noneSub')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} onClick={() => !n.read && markAsRead(n.id)}
                  className={`border rounded-lg p-5 transition-all cursor-pointer relative ${kindStyles(n.kind, n.read)}`}>
                  <button onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                    className="absolute top-3 right-3 text-gray-300 hover:text-gray-500">
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-start gap-4 pr-6">
                    <div className="flex-shrink-0 mt-0.5"><KindIcon kind={n.kind} species={n.species} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className={`text-gray-900 ${!n.read ? 'font-bold' : 'font-medium'}`}>
                          {localize(n).title}
                          {!n.read && <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full align-middle" />}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                          <Clock className="w-3 h-3" /><span>{timeAgo(n.timestamp, t, lang === 'bn' ? locale : undefined)}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{localize(n).message}</p>
                      <div className="mt-2 flex gap-3">
                        {n.kind === 'disease' && (
                          <button onClick={(e) => {
                            e.stopPropagation(); markAsRead(n.id);
                            navigate('/treatment', { state: { type: n.species, disease: n.diseaseName, diagnosisId: n.diagnosisId } });
                          }} className="text-xs font-semibold text-red-600 hover:text-red-700 underline underline-offset-2 flex items-center gap-1">
                            <Microscope className="w-3 h-3" /> {t('notif.viewTreatment')}
                          </button>
                        )}
                        {n.kind === 'healthy' && (
                          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {t('common.healthy')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
