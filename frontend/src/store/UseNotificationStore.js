import { create } from "zustand";

export const useNotificationStore = create((set, get) => ({
  notifications: [],

  // 🔥 1. JEDYNE MIEJSCE MAPOWANIA
  normalize: (n) => ({
    id: String(n.id), // 🔥 zawsze string = brak bugów
    title: n.title,
    body: n.message,
    time: n.created_at
      ? new Date(n.created_at).toLocaleTimeString()
      : new Date().toLocaleTimeString(),
    urgent: Boolean(n.urgent),
    type: n.type,
    read: Boolean(n.is_read),
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

  // 🔥 3. INITIAL LOAD
  setNotifications: (list) =>
    set({
      notifications: list.map(get().normalize),
    }),

  // 🔥 4. MARK AS READ (OPTIMISTIC + SAFE)
  markAsRead: async (id) => {
    const targetId = String(id);

    // optimistic update
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

      // rollback (opcjonalne ale PRO)
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
