import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { API_BASE } from "../../lib/apiConfig";
import ConfirmModal from "./ConfirmModal";

function DeleteIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

export default function AdminOpinions() {
  const { t } = useTranslation();
  const [items,   setItems]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(1);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [modal,   setModal]   = useState({ open: false, item: null, loading: false });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/admin/opinions`, {
        params: { page, limit: 20 },
        withCredentials: true,
      });
      setItems(data.opinions);
      setTotal(data.total);
    } catch (e) {
      setError(e.response?.data?.message || "Błąd ładowania opinii");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const openModal  = (item) => setModal({ open: true, item, loading: false });
  const closeModal = () => setModal({ open: false, item: null, loading: false });

  const handleConfirm = async () => {
    setModal((m) => ({ ...m, loading: true }));
    try {
      await axios.delete(`${API_BASE}/admin/opinions/${modal.item.id}`, { withCredentials: true });
      setItems((o) => o.filter((x) => x.id !== modal.item.id));
      setTotal((t) => t - 1);
      closeModal();
    } catch (e) {
      setError(e.response?.data?.message || "Błąd usuwania");
      closeModal();
    }
  };

  const pages = Math.ceil(total / 20);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">
          {t("adminOpinions.count", { total })}
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
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-6 space-y-2">
                <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-48" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-full" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-3/4" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="p-12 text-center text-sm font-bold text-slate-400 color-transition">
            {t("adminOpinions.noOpinions")}
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => (
              <div key={item.id}
                className="flex gap-4 px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors color-transition">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm font-black text-slate-900 dark:text-white color-transition">
                      {item.user_name}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 color-transition">
                      {item.user_email}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-black
                      bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 color-transition">
                      Druk {item.print_num}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                      {new Date(item.created_at).toLocaleDateString("pl-PL")}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed color-transition">
                    {item.content}
                  </p>
                </div>
                <button
                  onClick={() => openModal(item)}
                  className="shrink-0 self-start p-2 rounded-xl text-slate-400 hover:text-red-500
                    hover:bg-red-50 dark:hover:bg-red-900/20
                    transition-colors cursor-pointer color-transition"
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}
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
        title={t("adminOpinions.deleteTitle")}
        description={modal.item ? t("adminOpinions.deleteDesc", { user: modal.item.user_name, num: modal.item.print_num }) : ""}
        confirmLabel={t("adminOpinions.deleteConfirm")}
        variant="danger"
      />
    </div>
  );
}
