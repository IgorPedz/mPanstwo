import { create } from "zustand";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  normalize: (n) => ({
    id: String(n.id),

    title: n.title,
    body: n.message,

    icon: n.icon,
    type: n.type,

    data: typeof n.data === "string" ? JSON.parse(n.data) : n.data,

    time: n.created_at
      ? new Date(n.created_at).toLocaleTimeString()
      : new Date().toLocaleTimeString(),

    read: Boolean(n.is_read),

    urgent: Boolean(n.urgent ?? false),
  }),

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

      console.log("✅ READ UPDATED:", targetId);
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
