import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { API_BASE } from "../../lib/apiConfig";
import ConfirmModal from "./ConfirmModal";

const ROLES = ["Użytkownik", "Administrator", "Moderator", "Ekspert"];

const ROLE_BADGE = {
  Administrator: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  Moderator:     "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  Ekspert:       "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
  Użytkownik:    "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400",
  Zbanowany:     "bg-red-600 text-white",
};

function BanIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  );
}

function UnbanIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function AdminUsers() {
  const { t } = useTranslation();
  const [users,    setUsers]    = useState([]);
  const [total,    setTotal]    = useState(0);
  const [page,     setPage]     = useState(1);
  const [search,   setSearch]   = useState("");
  const [roleF,    setRoleF]    = useState("");
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [saving,   setSaving]   = useState(null);

  const [modal, setModal] = useState({ open: false, type: null, user: null, loading: false });

  const openModal = (type, user) => setModal({ open: true, type, user, loading: false });
  const closeModal = () => setModal({ open: false, type: null, user: null, loading: false });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/admin/users`, {
        params: { page, limit: 20, search, role: roleF },
        withCredentials: true,
      });
      setUsers(data.users);
      setTotal(data.total);
    } catch (e) {
      setError(e.response?.data?.message || "Błąd ładowania użytkowników");
    } finally {
      setLoading(false);
    }
  }, [page, search, roleF]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, roleF]);

  const changeRole = async (userId, newRole) => {
    setSaving(userId);
    try {
      await axios.put(`${API_BASE}/admin/users/${userId}/role`, { role: newRole }, { withCredentials: true });
      setUsers((u) => u.map((x) => x.id === userId ? { ...x, role: newRole } : x));
    } catch (e) {
      setError(e.response?.data?.message || "Błąd zmiany roli");
    } finally {
      setSaving(null);
    }
  };

  const handleConfirm = async () => {
    const { type, user } = modal;
    setModal((m) => ({ ...m, loading: true }));
    try {
      if (type === "ban") {
        await axios.put(`${API_BASE}/admin/users/${user.id}/ban`, {}, { withCredentials: true });
        setUsers((u) => u.map((x) => x.id === user.id ? { ...x, role: "Zbanowany" } : x));
      } else if (type === "unban") {
        await axios.put(`${API_BASE}/admin/users/${user.id}/unban`, {}, { withCredentials: true });
        setUsers((u) => u.map((x) => x.id === user.id ? { ...x, role: "Użytkownik" } : x));
      }
      closeModal();
    } catch (e) {
      setError(e.response?.data?.message || "Błąd operacji");
      closeModal();
    }
  };

  const pages = Math.ceil(total / 20);

  const MODAL_CONFIG = {
    ban: {
      title:        t("adminUsers.banTitle",  { name: modal.user?.name }),
      description:  t("adminUsers.banDesc",   { email: modal.user?.email }),
      confirmLabel: t("adminUsers.banConfirm"),
      variant:      "danger",
    },
    unban: {
      title:        t("adminUsers.unbanTitle", { name: modal.user?.name }),
      description:  t("adminUsers.unbanDesc",  { email: modal.user?.email }),
      confirmLabel: t("adminUsers.unbanConfirm"),
      variant:      "warning",
    },
  };

  const cfg = modal.type ? MODAL_CONFIG[modal.type] : {};

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800
        p-6 shadow-sm color-transition flex flex-wrap gap-4 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("adminUsers.searchPlaceholder")}
          className="flex-1 min-w-[220px] px-4 py-2.5 rounded-xl text-sm font-medium
            bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
            text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-red-500/40 color-transition"
        />
        <select
          value={roleF}
          onChange={(e) => setRoleF(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer
            bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
            text-slate-700 dark:text-slate-300 focus:outline-none color-transition"
        >
          <option value="">{t("adminUsers.allRoles")}</option>
          {[...ROLES, "Zbanowany"].map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition ml-auto">
          {t("adminUsers.userCount", { total })}
        </span>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50
          rounded-2xl px-5 py-4 text-sm font-bold text-red-600 dark:text-red-400 color-transition">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800
        shadow-sm overflow-hidden color-transition">
        {loading ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-40" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-56" />
                </div>
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <p className="p-12 text-center text-sm font-bold text-slate-400 color-transition">
            {t("adminUsers.noResults")}
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((u) => {
              const isBanned = u.role === "Zbanowany";
              return (
                <div key={u.id}
                  className={`flex flex-wrap items-center gap-3 px-6 py-4 transition-colors color-transition
                    ${isBanned
                      ? "bg-red-50/50 dark:bg-red-950/10 hover:bg-red-50 dark:hover:bg-red-950/20"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}>

                  <div className={`w-9 h-9 rounded-full flex items-center justify-center
                    text-sm font-black shrink-0 uppercase color-transition
                    ${isBanned
                      ? "bg-red-200 dark:bg-red-900/40 text-red-700 dark:text-red-400"
                      : "bg-slate-900 dark:bg-white text-white dark:text-slate-900"}`}>
                    {u.name?.charAt(0) || "?"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-black truncate color-transition
                      ${isBanned ? "text-red-600 dark:text-red-400 line-through" : "text-slate-900 dark:text-white"}`}>
                      {u.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate color-transition">
                      {u.email}
                    </p>
                  </div>

                  <div className="hidden md:flex items-center gap-5 text-xs font-bold
                    text-slate-400 dark:text-slate-500 color-transition">
                    <span>XP: <strong className="text-slate-600 dark:text-slate-300">{u.xp ?? 0}</strong></span>
                    <span>{new Date(u.created_at).toLocaleDateString("pl-PL")}</span>
                  </div>

                  <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black
                    uppercase tracking-wide color-transition ${ROLE_BADGE[u.role] || ROLE_BADGE["Użytkownik"]}`}>
                    {u.role}
                  </span>

                  {!isBanned && (
                    <select
                      value={u.role}
                      disabled={saving === u.id}
                      onChange={(e) => changeRole(u.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer
                        bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                        text-slate-700 dark:text-slate-300 focus:outline-none
                        disabled:opacity-50 color-transition"
                    >
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  )}

                  {isBanned ? (
                    <button
                      onClick={() => openModal("unban", u)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black
                        bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400
                        hover:bg-emerald-100 dark:hover:bg-emerald-900/40
                        transition-colors cursor-pointer color-transition"
                    >
                      <UnbanIcon />
                      {t("adminUsers.unban")}
                    </button>
                  ) : (
                    <button
                      onClick={() => openModal("ban", u)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black
                        bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400
                        hover:bg-red-100 dark:hover:bg-red-900/40
                        transition-colors cursor-pointer color-transition"
                    >
                      <BanIcon />
                      {t("adminUsers.ban")}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide
              bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
              text-slate-600 dark:text-slate-300 shadow-sm
              disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800
              transition-colors cursor-pointer color-transition">
            {t("common.prev")}
          </button>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">
            {page} / {pages}
          </span>
          <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide
              bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
              text-slate-600 dark:text-slate-300 shadow-sm
              disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800
              transition-colors cursor-pointer color-transition">
            {t("common.next")}
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={modal.open}
        onClose={closeModal}
        onConfirm={handleConfirm}
        loading={modal.loading}
        title={cfg.title || ""}
        description={cfg.description || ""}
        confirmLabel={cfg.confirmLabel}
        variant={cfg.variant}
      />
    </div>
  );
}
