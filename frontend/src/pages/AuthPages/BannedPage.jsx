import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../../lib/apiConfig";
import { useUser } from "../../Contexts/UserContext";
import { useTranslation } from "react-i18next";

const STATUS_STYLES = {
  pending:  { color: "border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10",     badge: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30" },
  rejected: { color: "border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/10",             badge: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30" },
  approved: { color: "border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-900/10", badge: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30" },
};

function fmtDate(raw, locale) {
  if (!raw) return "";
  return new Date(raw).toLocaleDateString(locale || "pl-PL", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function BannedPage() {
  const { logout } = useUser();
  const { t, i18n } = useTranslation();

  const [appeal,     setAppeal]     = useState(undefined); 
  const [reason,     setReason]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState(null);
  const [done,       setDone]       = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/appeal/status`, { withCredentials: true })
      .then((r) => setAppeal(r.data.appeal))
      .catch(() => setAppeal(null));
  }, []);

  const submit = async () => {
    if (!reason.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await axios.post(`${API_BASE}/appeal`, { reason }, { withCredentials: true });
      setDone(true);
      setAppeal({ status: "pending", reason, created_at: new Date().toISOString() });
    } catch (e) {
      setError(e.response?.data?.message || t("banned.sendError"));
    } finally {
      setSubmitting(false);
    }
  };

  const canAppeal = appeal?.status !== "pending";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 color-transition">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
          rounded-full bg-red-500/5 dark:bg-red-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className="relative w-full max-w-lg"
      >
        {/* Karta główna */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem]
          border border-slate-200 dark:border-slate-800
          shadow-2xl shadow-slate-950/10 dark:shadow-slate-950/60
          overflow-hidden color-transition">

          {/* Pasek górny */}
          <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-red-400 to-red-600" />

          <div className="p-8 space-y-7">
            {/* Nagłówek */}
            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 shrink-0">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-1">
                  {t("banned.accountBlocked")}
                </p>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight color-transition">
                  {t("banned.noAccess")}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed color-transition">
                  {t("banned.description")}
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800 color-transition" />

            {/* Status odwołania */}
            <AnimatePresence mode="wait">
              {appeal === undefined ? (
                /* Ładowanie */
                <motion.div key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />
                  ))}
                </motion.div>
              ) : appeal && appeal.status !== "approved" && (
                /* Istniejące odwołanie */
                <motion.div key="appeal"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border p-5 space-y-3 color-transition ${STATUS_STYLES[appeal.status]?.color ?? ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-black text-slate-900 dark:text-white color-transition">
                        {t("banned.yourAppeal")}
                      </span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-xl ${STATUS_STYLES[appeal.status]?.badge ?? ""}`}>
                      {t(`banned.status${appeal.status.charAt(0).toUpperCase() + appeal.status.slice(1)}`)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 color-transition">
                    {t("banned.submitted")}: {fmtDate(appeal.created_at, i18n.language)}
                  </p>

                  <div className="bg-white/60 dark:bg-slate-900/60 rounded-xl px-4 py-3 color-transition">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 color-transition">
                      {t("banned.appealContent")}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed color-transition">
                      {appeal.reason}
                    </p>
                  </div>

                  {appeal.admin_response && (
                    <div className="bg-white/60 dark:bg-slate-900/60 rounded-xl px-4 py-3 color-transition">
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">
                        {t("banned.adminResponse")}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed color-transition">
                        {appeal.admin_response}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Formularz nowego odwołania */}
            <AnimatePresence>
              {canAppeal && !done && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 color-transition">
                      {appeal?.status === "rejected" ? t("banned.newAppeal") : t("banned.appealLabel")}
                    </p>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder={t("banned.placeholder")}
                      maxLength={1000}
                      rows={4}
                      className="w-full resize-none rounded-2xl px-4 py-3 text-sm
                        bg-slate-50 dark:bg-slate-800
                        border border-slate-200 dark:border-slate-700
                        text-slate-900 dark:text-white
                        placeholder:text-slate-400 dark:placeholder:text-slate-500
                        focus:outline-none focus:ring-2 focus:ring-red-500/30
                        color-transition"
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] font-bold text-slate-400 color-transition">
                        {reason.length}/1000
                      </span>
                      {error && (
                        <span className="text-[10px] font-bold text-red-500">{error}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={submit}
                    disabled={submitting || !reason.trim()}
                    className="w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest
                      bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25
                      disabled:opacity-50 transition-all cursor-pointer
                      flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    )}
                    {t("banned.sendAppeal")}
                  </button>
                </motion.div>
              )}

              {done && (
                <motion.p
                  key="done"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-sm font-bold text-emerald-600 dark:text-emerald-400 text-center color-transition"
                >
                  ✓ {t("banned.appealSent")}
                </motion.p>
              )}

              {appeal?.status === "pending" && (
                <motion.p
                  key="waiting"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-xs font-bold text-slate-400 dark:text-slate-500 text-center color-transition"
                >
                  {t("banned.waiting")}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="h-px bg-slate-100 dark:bg-slate-800 color-transition" />

            {/* Wyloguj */}
            <button
              onClick={logout}
              className="w-full py-3 rounded-2xl text-xs font-black uppercase tracking-widest
                bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                hover:bg-slate-200 dark:hover:bg-slate-700
                transition-colors cursor-pointer color-transition"
            >
              {t("banned.logout")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
