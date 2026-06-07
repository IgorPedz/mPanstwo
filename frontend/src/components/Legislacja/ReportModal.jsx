import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_BASE } from "../../lib/apiConfig";

export default function ReportModal({ opinionId, authorName, onClose }) {
  const { t } = useTranslation();
  const [reason,     setReason]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);
  const [error,      setError]      = useState(null);

  const submit = async () => {
    if (!reason.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await axios.post(`${API_BASE}/report/opinion/${opinionId}`, { reason }, { withCredentials: true });
      setDone(true);
    } catch (e) {
      setError(e.response?.data?.message || t("reportModal.sendError"));
    } finally {
      setSubmitting(false);
    }
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4">
        <motion.div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-md cursor-pointer"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="relative w-full sm:max-w-md bg-white dark:bg-slate-900
            rounded-t-[2rem] sm:rounded-[2.5rem]
            shadow-2xl shadow-slate-950/20 dark:shadow-slate-950/60
            border border-slate-200/60 dark:border-slate-800
            z-10 overflow-hidden color-transition"
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 28, stiffness: 340 }}
        >
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl pointer-events-none bg-red-500/10" />

          {/* Drag handle */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>

          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8 space-y-5">
            {done ? (
              /* Success state */
              <div className="flex flex-col items-center gap-4 py-2 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30
                  flex items-center justify-center">
                  <svg className="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900 dark:text-white color-transition">
                    {t("reportModal.successTitle")}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 color-transition">
                    {t("reportModal.successDesc")}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wide
                    bg-slate-900 dark:bg-white text-white dark:text-slate-900
                    hover:opacity-80 transition-opacity cursor-pointer mt-2"
                >
                  {t("reportModal.close")}
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-900/20 shrink-0">
                    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3 3v18M3 6l9-3 9 3-9 3-9-3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight color-transition">
                      {t("reportModal.title")}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 color-transition mt-0.5">
                      {t("reportModal.authorLabel")}: <strong>{authorName}</strong>
                    </p>
                  </div>
                </div>

                {/* Reason */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 color-transition">
                    {t("reportModal.reasonLabel")}
                  </p>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={t("reportModal.placeholder")}
                    maxLength={500}
                    rows={4}
                    className="w-full resize-none rounded-2xl px-4 py-3 text-sm
                      bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                      text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500
                      focus:outline-none focus:ring-2 focus:ring-red-500/30 color-transition"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 color-transition">
                      {reason.length}/500
                    </span>
                    {error && (
                      <span className="text-[10px] font-bold text-red-500">{error}</span>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={submitting}
                    className="flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-wide
                      bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                      hover:bg-slate-200 dark:hover:bg-slate-700
                      disabled:opacity-50 transition-all cursor-pointer color-transition"
                  >
                    {t("reportModal.cancel")}
                  </button>
                  <button
                    onClick={submit}
                    disabled={submitting || !reason.trim()}
                    className="flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-wide
                      bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30
                      disabled:opacity-50 transition-all cursor-pointer
                      flex items-center justify-center gap-2"
                  >
                    {submitting && (
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    )}
                    {t("reportModal.submit")}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
