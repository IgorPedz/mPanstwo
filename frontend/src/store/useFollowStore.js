import { create } from "zustand";
import { persist } from "zustand/middleware";

const API = "http://localhost:5000";

export const useFollowStore = create(
  persist(
    (set, get) => ({
      followed: [],

      follow: async (institution, userId) => {
        set((state) => {
          if (state.followed.some((f) => f.id === institution.id)) return state;
          return { followed: [...state.followed, institution] };
        });
        if (userId) {
          try {
            await fetch(`${API}/follows`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId,
                institutionId: institution.id,
                title: institution.title,
                titleKey: institution.titleKey,
                type: institution.type || "ministry",
                icon: institution.icon,
                accent: institution.accent,
                path: institution.path,
              }),
            });
          } catch (err) {
            console.error("Follow sync error:", err);
          }
        }
      },

      unfollow: async (id, userId) => {
        set((state) => ({ followed: state.followed.filter((f) => f.id !== id) }));
        if (userId) {
          try {
            await fetch(`${API}/follows/${encodeURIComponent(id)}?userId=${userId}`, {
              method: "DELETE",
            });
          } catch (err) {
            console.error("Unfollow sync error:", err);
          }
        }
      },

      isFollowed: (id) => get().followed.some((f) => f.id === id),

      toggleFollow: (institution, userId) => {
        if (get().isFollowed(institution.id)) {
          get().unfollow(institution.id, userId);
        } else {
          get().follow(institution, userId);
        }
      },

      syncFromServer: async (userId) => {
        if (!userId) return;
        try {
          const res = await fetch(`${API}/follows?userId=${userId}`);
          if (!res.ok) return;
          const data = await res.json();
          if (Array.isArray(data)) set({ followed: data });
        } catch (err) {
          console.error("Sync follows error:", err);
        }
      },
    }),
    { name: "mpanstwo-followed" }
  )
);
