import { create } from "zustand";
import i18n from "../i18n";

const getLocalizedEventText = (notif) => {
  const eventMap = i18n.t("notifications.events", {
    defaultValue: {},
    returnObjects: true,
  });

  const event = eventMap?.[notif?.type] || {};

  const achievementSlug = notif?.data?.achievementSlug;
  const achievementName = achievementSlug
    ? i18n.t(`achievements.achievementsData.${achievementSlug}.title`, {
      defaultValue: achievementSlug,
    })
    : "";

  const rankSlug =
    notif?.data?.newRank?.icon ||
    notif?.data?.newRank?.slug ||
    notif?.data?.newRank?.name;

  const rankName = rankSlug
    ? i18n.t(`achievements.ranks.${rankSlug}.name`, {
      defaultValue: notif?.data?.newRank?.name || rankSlug,
    })
    : "";

  return {
    title: event.title || notif?.type || "Notification",
    body: i18n.t(`notifications.events.${notif?.type}.message`, {
      defaultValue: event.message || "",
      achievementName,
      rankName,
    }),
  };
};

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  normalize: (n) => {
    const parsedData =
      typeof n.data === "string" ? JSON.parse(n.data) : n.data;

    const normalizedNotif = {
      ...n,
      data: parsedData,
    };

    const localized = getLocalizedEventText(normalizedNotif);

    return {
      id: String(n.id),

      title: localized.title,
      body: localized.body,

      icon: n.icon,
      type: n.type,
      color: n.color,

      data: parsedData,

      time: (() => {
        const raw = String(n.created_at || "").trim();

        if (!raw) return new Date().toLocaleString();

        // Parse MySQL DATETIME/TIMESTAMP format (YYYY-MM-DD HH:MM:SS) as UTC
        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d+)?$/.test(raw)) {
          // Convert MySQL format to ISO UTC format
          const isoString = raw.replace(" ", "T") + "Z";
          return new Date(isoString).toLocaleString();
        }

        // Try parsing as ISO string
        const parsed = new Date(raw);
        if (!Number.isNaN(parsed.getTime())) {
          return parsed.toLocaleString();
        }

        // Fallback: try adding 'Z' for UTC
        return new Date(raw.replace(" ", "T") + "Z").toLocaleString();
      })(),

      read: Boolean(n.is_read),

      urgent: Boolean(n.urgent ?? false),
    };
  },

  addNotification: (notif) =>
    set((state) => {
      const newNotif = get().normalize(notif);

      const exists = state.notifications.some((n) => n.id === newNotif.id);

      if (exists) return state;

      return {
        notifications: [newNotif, ...state.notifications],
      };
    }),

  setNotifications: (list) =>
    set({
      notifications: list.map(get().normalize),
    }),

  markAsRead: async (id) => {
    const targetId = String(id);

    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === targetId ? { ...n, read: true } : n,
      ),
    }));

    try {
      const res = await fetch(
        `http://localhost:5000/notifications/${targetId}/read`,
        { method: "PATCH" },
      );

      if (!res.ok) throw new Error("Server error");

    } catch (err) {
      console.error("❌ MARK AS READ ERROR:", err);

      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === targetId ? { ...n, read: false } : n,
        ),
      }));
    }
  },

  clear: () => set({ notifications: [] }),

  getUnreadCount: () => get().notifications.filter((n) => !n.read).length,

  clearRead: async (userId) => {
    try {
      await fetch(`http://localhost:5000/notifications/read?userId=${userId}`, {
        method: "DELETE",
      });

      set((state) => ({
        notifications: state.notifications.filter((n) => !n.read),
      }));
    } catch (err) {
      console.error("CLEAR READ ERROR:", err);
    }
  },
}));
