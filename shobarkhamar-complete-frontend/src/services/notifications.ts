// Notification system — localStorage based (no backend endpoint needed)

export interface AppNotification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  diagnosisId?: string;
  /** AI class code, e.g. 'not_fish' — lets the notifications page tell "not a fish" apart from "healthy" */
  diseaseCode?: string;
}

const KEY = 'shobarkhamar_notifications';

function load(): AppNotification[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function save(notifications: AppNotification[]) {
  localStorage.setItem(KEY, JSON.stringify(notifications));
}

export const notificationService = {
  getAll(): AppNotification[] {
    return load().sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  getUnreadCount(): number {
    return load().filter((n) => !n.read).length;
  },

  add(notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) {
    const all = load();
    all.push({
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      timestamp: new Date().toISOString(),
      read: false,
    });
    save(all);
  },

  markAsRead(id: string) {
    const all = load().map((n) => (n.id === id ? { ...n, read: true } : n));
    save(all);
  },

  markAllAsRead() {
    const all = load().map((n) => ({ ...n, read: true }));
    save(all);
  },

  // Called after a successful diagnosis
  addDiagnosisNotification(
    isHealthy: boolean,
    diseaseName: string | undefined,
    animalType: string,
    diagnosisId?: string,
    diseaseCode?: string
  ) {
    // "Not fish" / "Non Poultry" come back as is_healthy, but they mean the image isn't the right animal.
    const code = diseaseCode?.toLowerCase().replace(/[\s-]+/g, '_');
    if (animalType === 'fish' && code === 'not_fish') {
      this.add({
        type: 'info',
        title: 'Not a Fish Image',
        message: 'The uploaded image does not appear to be a fish, so no fish disease was checked. Please upload a clear photo of the fish.',
        diagnosisId,
        diseaseCode: 'not_fish',
      });
    } else if (animalType === 'poultry' && code === 'non_poultry') {
      this.add({
        type: 'info',
        title: 'Not a Poultry Image',
        message: 'The uploaded image does not appear to be poultry, so no poultry disease was checked. Please upload a clear photo of the faeces sample.',
        diagnosisId,
        diseaseCode: 'non_poultry',
      });
    } else if (isHealthy) {
      this.add({
        type: 'success',
        title: 'Diagnosis Complete — Healthy',
        message: `Your ${animalType} appears healthy. No disease detected.`,
        diagnosisId,
      });
    } else {
      this.add({
        type: 'warning',
        title: `Disease Detected: ${diseaseName}`,
        message: `A disease was detected in your ${animalType}. Check treatment recommendations.`,
        diagnosisId,
      });
    }
  },
};