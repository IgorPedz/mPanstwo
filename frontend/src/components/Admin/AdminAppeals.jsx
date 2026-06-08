import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_BASE } from "../../lib/apiConfig";
import ConfirmModal from "./ConfirmModal";
import StatusFilter from "./StatusFilter";

const STATUS_COLORS = {
  pending:  "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/40",
  approved: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40",
  rejected: "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
};

function fmtDate(raw, locale) {
  if (!raw) return "";
  return new Date(raw).toLocaleDateString(locale || "pl-PL", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminAppeals({ onPendingCount }) {
  const { t, i18n } = useTranslation();
  const [items,   setItems]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(1);
  const [status,  setStatus]  = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const APPEAL_FILTER_OPTIONS = [
    { value: "pending",  label: t("appeals.pending")  },
    { value: "all",      label: t("appeals.all")      },
    { value: "approved", label: t("appeals.approved") },
    { value: "rejected", label: t("appeals.rejected") },
  ];

  const STATUS_LABELS = {
    pending:  { label: t("appeals.pending"),  color: STATUS_COLORS.pending  },
    approved: { label: t("appeals.approved"), color: STATUS_COLORS.approved },
    rejected: { label: t("appeals.rejected"), color: STATUS_COLORS.rejected },
  };

  const [approveModal, setApproveModal] = useState({ open: false, item: null, loading: false });
  const [rejectPanel, setRejectPanel]   = useState({ id: null, response: "" });
  const [rejectLoading, setRejectLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/admin/appeals`, {
        params: { status, page, limit: 20 },
        withCredentials: true,
      });
      setItems(data.appeals);
      setTotal(data.total);
      if (status === "pending" && onPendingCount) onPendingCount(data.total);
    } catch (e) {
      setError(e.response?.data?.message || "Błąd ładowania odwołań");
    } finally {
      setLoading(false);
    }
  }, [status, page, onPendingCount]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [status]);

  /* Approve */
  const handleApprove = async () => {
    setApproveModal((m) => ({ ...m, loading: true }));
    try {
      await axios.put(`${API_BASE}/admin/appeals/${approveModal.item.id}/approve`, {}, { withCredentials: true });
      setItems((o) => o.filter((x) => x.id !== approveModal.item.id));
      setTotal((t) => t - 1);
      if (status === "pending" && onPendingCount) onPendingCount(Math.max(0, total - 1));
      setApproveModal({ open: false, item: null, loading: false });
    } catch (e) {
      setError(e.response?.data?.message || "Błąd zatwierdzania");
      setApproveModal({ open: false, item: null, loading: false });
    }
  };

  /* Reject */
  const handleReject = async (id) => {
    setRejectLoading(true);
    try {
      await axios.put(
        `${API_BASE}/admin/appeals/${id}/reject`,
        { response: rejectPanel.response },
        { withCredentials: true }
      );
      setItems((o) => o.filter((x) => x.id !== id));
      setTotal((t) => t - 1);
      if (status === "pending" && onPendingCount) onPendingCount(Math.max(0, total - 1));
      setRejectPanel({ id: null, response: "" });
    } catch (e) {
      setError(e.response?.data?.message || "Błąd odrzucania");
    } finally {
      setRejectLoading(false);
    }
  };

  const pages = Math.ceil(total / 20);

  return (
    <div className="space-y-6">
      {/* Filtry */}
      <StatusFilter
        options={APPEAL_FILTER_OPTIONS}
        value={status}
        onChange={setStatus}
        count={total}
        noun={t("appeals.noun")}
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
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 space-y-3">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-48" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-full" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="p-12 text-center text-sm font-bold text-slate-400 color-transition">
            {t("appeals.noAppeals")}
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => {
              const st = STATUS_LABELS[item.status] || STATUS_LABELS.pending;
              const isRejectOpen = rejectPanel.id === item.id;

              return (
                <div key={item.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors color-transition">
                  {/* Nagłówek */}
                  <div className="flex flex-wrap items-start gap-3 mb-4">
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black text-slate-900 dark:text-white color-transition">
                          {item.user_name}
                        </p>
                        <span className="text-xs text-slate-400 dark:text-slate-500 color-transition">
                          {item.user_email}
                        </span>
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${st.color} color-transition`}>
                          {st.label}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                        {t("appeals.submitted")}: {fmtDate(item.created_at, i18n.language)}
                        {item.reviewed_at && <> · {t("appeals.reviewed")}: {fmtDate(item.reviewed_at, i18n.language)}</>}
                        {item.reviewer_name && <> {t("appeals.reviewedBy")} <strong>{item.reviewer_name}</strong></>}
                      </p>
                    </div>

                    {/* Akcje tylko dla pending */}
                    {item.status === "pending" && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setApproveModal({ open: true, item, loading: false })}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black
                            bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400
                            hover:bg-emerald-100 dark:hover:bg-emerald-900/40
                            border border-emerald-200 dark:border-emerald-800/50
                            transition-colors cursor-pointer color-transition"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                          {t("appeals.unban")}
                        </button>
                        <button
                          onClick={() => setRejectPanel(isRejectOpen ? { id: null, response: "" } : { id: item.id, response: "" })}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black
                            transition-colors cursor-pointer color-transition
                            ${isRejectOpen
                              ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                              : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800/50"
                            }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zM10 10V7a2 2 0 114 0v3" />
                          </svg>
                          {t("appeals.reject")}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Treść odwołania */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700
                    rounded-2xl px-4 py-3 mb-3 color-transition">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 color-transition">
                      {t("appeals.appealContent")}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed color-transition">
                      {item.reason}
                    </p>
                  </div>

                  {/* Odpowiedź admina (jeśli jest) */}
                  {item.admin_response && (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30
                      rounded-2xl px-4 py-3 mb-3 color-transition">
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">
                        {t("appeals.adminResponse")}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed color-transition">
                        {item.admin_response}
                      </p>
                    </div>
                  )}

                  {/* Panel odrzucenia */}
                  <AnimatePresence>
                    {isRejectOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-1 space-y-3">
                          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30
                            rounded-2xl p-4 color-transition">
                            <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">
                              {t("appeals.rejectResponseLabel")}
                            </p>
                            <textarea
                              value={rejectPanel.response}
                              onChange={(e) => setRejectPanel((p) => ({ ...p, response: e.target.value }))}
                              placeholder={t("appeals.rejectPlaceholder")}
                              maxLength={1000}
                              rows={3}
                              className="w-full resize-none rounded-xl px-3 py-2.5 text-sm
                                bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800/50
                                text-slate-900 dark:text-white
                                placeholder:text-slate-400 dark:placeholder:text-slate-500
                                focus:outline-none focus:ring-2 focus:ring-red-500/30
                                color-transition"
                            />
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[10px] font-bold text-slate-400 color-transition">
                                {rejectPanel.response.length}/1000
                              </span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setRejectPanel({ id: null, response: "" })}
                                  className="px-4 py-2 rounded-xl text-xs font-black
                                    bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400
                                    border border-slate-200 dark:border-slate-700
                                    hover:bg-slate-50 dark:hover:bg-slate-700
                                    transition-colors cursor-pointer color-transition"
                                >
                                  {t("appeals.cancel")}
                                </button>
                                <button
                                  onClick={() => handleReject(item.id)}
                                  disabled={rejectLoading}
                                  className="px-4 py-2 rounded-xl text-xs font-black
                                    bg-red-500 hover:bg-red-600 text-white
                                    disabled:opacity-50 transition-colors cursor-pointer
                                    flex items-center gap-1.5"
                                >
                                  {rejectLoading && (
                                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                  )}
                                  {t("appeals.rejectConfirm")}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
        isOpen={approveModal.open}
        onClose={() => setApproveModal({ open: false, item: null, loading: false })}
        onConfirm={handleApprove}
        loading={approveModal.loading}
        variant="warning"
        title={t("appeals.confirmUnbanTitle")}
        description={t("appeals.confirmUnbanDesc", { name: approveModal.item?.user_name })}
        confirmLabel={t("appeals.unban")}
      />
    </div>
  );
}
