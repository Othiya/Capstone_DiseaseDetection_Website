import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getHistory, getToken } from "../services/api";
import { notificationService } from "../services/notifications";
import {
  getStoredIds,
  DISMISSED_STORAGE_KEY,
  READ_STORAGE_KEY,
  isClearedNotification,
} from "../utils/notifications";
const SYSTEM_NOTIFICATIONS = [
  { id: "sys-1", read: false },
  { id: "info-1", read: true },
];

export function useUnreadCount() {
  const { pathname } = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnreadCount = async () => {
    const token = getToken();
    const dismissedIds = new Set(getStoredIds(DISMISSED_STORAGE_KEY));
    const readIds = new Set(getStoredIds(READ_STORAGE_KEY));
    const localUnread = notificationService
      .getAll()
      .filter(
        (n) =>
          !n.read &&
          !readIds.has(n.id) &&
          !dismissedIds.has(n.id) &&
          !isClearedNotification(n.timestamp),
      ).length;

    const countServerUnread = (
      diagnoses: { diagnosis_id: string; created_at?: string }[],
    ) =>
      diagnoses.filter(
        (d) =>
          !readIds.has(d.diagnosis_id) &&
          !dismissedIds.has(d.diagnosis_id) &&
          !isClearedNotification(d.created_at ?? new Date().toISOString()),
      ).length;

    const countSystemUnread = () =>
      SYSTEM_NOTIFICATIONS.filter(
        (n) => !n.read && !readIds.has(n.id) && !dismissedIds.has(n.id),
      ).length;

    if (!token) {
      setUnreadCount(countSystemUnread() + localUnread);
      return;
    }
    try {
      const data = await getHistory(0, 50);
      setUnreadCount(
        countServerUnread(data.diagnoses) + countSystemUnread() + localUnread,
      );
    } catch {
      setUnreadCount(countSystemUnread() + localUnread);
    }
  };

  useEffect(() => {
    loadUnreadCount();
    window.addEventListener("focus", loadUnreadCount);
    window.addEventListener("storage", loadUnreadCount);
    return () => {
      window.removeEventListener("focus", loadUnreadCount);
      window.removeEventListener("storage", loadUnreadCount);
    };
  }, [pathname]);

  return unreadCount;
}
