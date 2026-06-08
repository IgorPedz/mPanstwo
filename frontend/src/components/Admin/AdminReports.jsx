import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { API_BASE } from "../../lib/apiConfig";
import ConfirmModal from "./ConfirmModal";
import StatusFilter from "./StatusFilter";

const STATUS_COLORS = {
  pending:   "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/40",
  reviewed:  "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40",
  dismissed: "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
  all:       "",
};

function FlagIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18M3 6l9-3 9 3-9 3-9-3z" />
    </svg>
  );
}
function DeleteIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function AdminReports({ onPendingCount }) {
  const { t } = useTranslation();
  const [items,   setItems]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(1);
  const [status,  setStatus]  = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [modal,   setModal]   = useState({ open: false, type: null, item: null, loading: false });

  const REPORT_FILTER_OPTIONS = [
    { value: "pending",   label: t("reports.pending")  },
    { value: "all",       label: t("reports.all")      },
    { value: "reviewed",  label: t("reports.reviewed") },
    { value: "dismissed", label: t("reports.dismissed")},
  ];

  const STATUS_LABELS = {
    pending:   { label: t("reports.pending"),   color: STATUS_COLORS.pending   },
    reviewed:  { label: t("reports.reviewed"),  color: STATUS_COLORS.reviewed  },
    dismissed: { label: t("reports.dismissed"), color: STATUS_COLORS.dismissed },
    all:       { label: t("reports.all"),       color: STATUS_COLORS.all       },
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/admin/reports`, {
        params: { status, page, limit: 20 },
        withCredentials: true,
      });
      setItems(data.reports);
      setTotal(data.total);
      if (status === "pending" && onPendingCount) onPendingCount(data.total);
    } catch (e) {
      setError(e.response?.data?.message || "Błąd ładowania zgłoszeń");
    } finally {
      setLoading(false);
    }
  }, [status, page, onPendingCount]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => { setPage(1); }, [status]);

  const openDismiss = (item) => setModal({ open: true, type: "dismiss", item, loading: false });
  const openDelete  = (item) => setModal({ open: true, type: "delete",  item, loading: false });
  const closeModal  = () => setModal({ open: false, type: null, item: null, loading: false });

  const handleConfirm = async () => {
    setModal((m) => ({ ...m, loading: true }));
    try {
      if (modal.type === "dismiss") {
        await axios.put(`${API_BASE}/admin/reports/${modal.item.id}/dismiss`, {}, { withCredentials: true });
        setItems((o) => o.filter((x) => x.id !== modal.item.id));
        setTotal((t) => t - 1);
        if (status === "pending" && onPendingCount) onPendingCount(Math.max(0, total - 1));
      } else {
        await axios.delete(`${API_BASE}/admin/reports/${modal.item.id}/delete-opinion`, { withCredentials: true });
        setItems((o) => o.filter((x) => x.opinion_id !== modal.item.opinion_id));
        setTotal((t) => t - 1);
        if (status === "pending" && onPendingCount) onPendingCount(Math.max(0, total - 1));
      }
      closeModal();
    } catch (e) {
      setError(e.response?.data?.message || "Błąd akcji");
      closeModal();
    }
  };

  const pages = Math.ceil(total / 20);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <StatusFilter
        options={REPORT_FILTER_OPTIONS}
        value={status}
        onChange={setStatus}
        count={total}
        noun={t("reports.noun")}
      />

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
              <div key={i} className="p-6 space-y-3">
                <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-48" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-full" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="p-12 text-center text-sm font-bold text-slate-400 color-transition">
            {t("reports.noReports")}
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => {
              const st = STATUS_LABELS[item.status] || STATUS_LABELS.pending;
              return (
                <div key={item.id}
                  className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors color-transition">

                  {/* Top row */}
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black text-slate-900 dark:text-white color-transition">
                          {t("reports.reportId", { id: item.id })}
                        </p>
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest
                          border ${st.color} color-transition`}>
                          {st.label}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                          {new Date(item.created_at).toLocaleString("pl-PL")}
                        </span>
                        {item.reviewer_name && (
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                            · {t("reports.reviewedBy")}:{" "}
                            <strong className="text-slate-600 dark:text-slate-300">
                              {item.reviewer_name}
                            </strong>
                            {item.reviewed_at && (
                              <span className="ml-1">
                                ({new Date(item.reviewed_at).toLocaleString("pl-PL")})
                              </span>
                            )}
                          </span>
                        )}
                      </div>

                      {/* Reporter */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 color-transition">
                        {t("reports.reportedBy")}:{" "}
                        <strong className="text-slate-700 dark:text-slate-200 color-transition">
                          {item.reporter_name}
                        </strong>{" "}
                        <span className="text-slate-400 dark:text-slate-500">({item.reporter_email})</span>
                      </p>
                    </div>

                    {/* Actions (only for pending) */}
                    {item.status === "pending" && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openDismiss(item)}
                          title={t("reports.confirmDismissTitle")}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black
                            bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                            hover:bg-slate-200 dark:hover:bg-slate-700
                            transition-colors cursor-pointer color-transition"
                        >
                          <CheckIcon />
                          {t("reports.dismiss")}
                        </button>
                        <button
                          onClick={() => openDelete(item)}
                          title={t("reports.deleteOpinion")}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black
                            bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400
                            hover:bg-red-100 dark:hover:bg-red-900/40
                            border border-red-200 dark:border-red-800/50
                            transition-colors cursor-pointer color-transition"
                        >
                          <DeleteIcon />
                          {t("reports.deleteOpinion")}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Reason */}
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30
                    rounded-2xl px-4 py-3 mb-3 color-transition">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1 color-transition">
                      {t("reports.reason")}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed color-transition">
                      {item.reason}
                    </p>
                  </div>

                  {/* Opinion */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700
                    rounded-2xl px-4 py-3 color-transition">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition">
                        {t("reports.opinionLabel", { num: item.print_num })}
                      </p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 color-transition">
                        {t("reports.author")}:{" "}
                        <strong className="text-slate-600 dark:text-slate-300 color-transition">
                          {item.author_name}
                        </strong>{" "}
                        {item.author_role === "Zbanowany" && (
                          <span className="text-red-500 font-black">· {t("reports.banned")}</span>
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed line-clamp-3 color-transition">
                      {item.opinion_content}
                    </p>
                  </div>
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
        variant={modal.type === "delete" ? "danger" : "warning"}
        title={modal.type === "delete" ? t("reports.confirmDeleteTitle") : t("reports.confirmDismissTitle")}
        description={
          modal.type === "delete"
            ? t("reports.confirmDeleteMsg", { author: modal.item?.author_name })
            : t("reports.confirmDismissMsg", { id: modal.item?.id })
        }
        confirmLabel={modal.type === "delete" ? t("reports.confirmDeleteConfirm") : t("reports.confirmDismissConfirm")}
      />
    </div>
  );
}
