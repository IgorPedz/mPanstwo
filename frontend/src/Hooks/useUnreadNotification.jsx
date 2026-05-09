import { useEffect, useCallback } from "react";
import axios from "axios";
import { useNotificationStore } from "../store/useNotificationStore";

export default function useUnreadNotifications(userId) {
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications,
  );

  const fetchNotifications = useCallback(async (id) => {
    if (!id) return;

    try {
      const res = await axios.get(
        "http://localhost:5000/notifications",
        {
          params: { userId: id },
        },
      );

      // 🔥 INIT ONLY — nie w trakcie działania socketów
      setNotifications(res.data);
    } catch (err) {
      console.error("❌ [HOOK] Axios error:", err.message);
    }
  }, [setNotifications]);

  useEffect(() => {
    fetchNotifications(userId);
  }, [userId, fetchNotifications]);

  const refetch = useCallback(() => {
    fetchNotifications(userId);
  }, [fetchNotifications, userId]);

  return { refetch };
}