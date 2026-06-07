import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useUser } from "../../Contexts/UserContext";
import { API_BASE } from "../../lib/apiConfig";
import { containerVariants, itemVariants } from "../../Utils/Animations.jsx";

const EXPORTS_CFG = [
  { key: "opinions",          tKey: "opinions",          endpoint: "/expert/export/opinions",          color: "indigo"  },
  { key: "mp-ratings",        tKey: "mpRatings",         endpoint: "/expert/export/mp-ratings",        color: "amber"   },
  { key: "mp-ratings-summary",tKey: "mpRatingsSummary",  endpoint: "/expert/export/mp-ratings-summary",color: "emerald" },
  { key: "surveys",           tKey: "surveys",           endpoint: "/expert/export/surveys",           color: "violet"  },
  { key: "users",             tKey: "users",             endpoint: "/expert/export/users",             color: "rose", adminOnly: true },
];

const BORDER = {
  indigo:  "border-indigo-200 dark:border-indigo-800/50",
  amber:   "border-amber-200 dark:border-amber-800/50",
  emerald: "border-emerald-200 dark:border-emerald-800/50",
  violet:  "border-violet-200 dark:border-violet-800/50",
  rose:    "border-rose-200 dark:border-rose-800/50",
};

const BADGE = {
  indigo:  "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  amber:   "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  violet:  "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
  rose:    "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
};

function DownloadBtn({ label, loading, onClick }) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide
        bg-slate-900 dark:bg-white text-white dark:text-slate-900
        hover:bg-slate-700 dark:hover:bg-slate-100
        disabled:opacity-50 transition-all shadow-sm cursor-pointer color-transition"
    >
      {loading ? (
        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )}
      {label}
    </button>
  );
}

export default function ExpertPage() {
  const { user } = useUser();
  const { t } = useTranslation();
  const [loadingKey, setLoadingKey] = useState(null);
  const [error,      setError]      = useState(null);

  const EXPORTS = EXPORTS_CFG.map((e) => ({
    ...e,
    label:       t(`expert.exports.${e.tKey}.label`),
    description: t(`expert.exports.${e.tKey}.description`),
  }));

  const download = async (endpoint, format) => {
    const key = `${endpoint}-${format}`;
    setLoadingKey(key);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}${endpoint}?format=${format}`, {
        credentials: "include",
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.message || `Błąd ${res.status}`);
      }
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      const cd   = res.headers.get("Content-Disposition") || "";
      const m    = cd.match(/filename="([^"]+)"/);
      a.href     = url;
      a.download = m ? m[1] : `export.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingKey(null);
    }
  };

  const visible = EXPORTS.filter((e) => !e.adminOnly || user?.role === "Administrator");

  return (
    <motion.div
      className="w-full min-h-screen py-8 px-4 md:px-8 color-transition"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="max-w-[1800px] mx-auto">

        {/* Header */}
        <motion.header
          variants={itemVariants}
          className="flex justify-between items-end pb-6 mb-8 color-transition"
        >
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-violet-500 color-transition">
              {t("expert.panelLabel")}
            </p>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition">
              {t("expert.title")}
            </h1>
            <div className="h-1 w-20 bg-violet-500 mb-5 mt-2 color-transition" />
            <p className="text-slate-400 font-medium color-transition">
              {t("expert.description")}
            </p>
          </div>
        </motion.header>

        {error && (
          <motion.div variants={itemVariants}
            className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50
              rounded-2xl px-5 py-4 text-sm font-bold text-red-600 dark:text-red-400 color-transition">
            {error}
          </motion.div>
        )}

        {/* Export cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((exp) => (
            <motion.div
              key={exp.key}
              variants={itemVariants}
              className={`bg-white dark:bg-slate-900 rounded-[2rem] border shadow-sm
                p-8 flex flex-col gap-5 color-transition ${BORDER[exp.color]}`}
            >
              {/* Label badge */}
              <div className="flex items-start justify-between gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest
                  color-transition ${BADGE[exp.color]}`}>
                  {exp.color === "rose" ? t("expert.adminOnlyBadge") : t("expert.exportBadge")}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5 color-transition">
                  {exp.label}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed color-transition">
                  {exp.description}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap pt-2 border-t border-slate-100 dark:border-slate-800 color-transition">
                <DownloadBtn
                  label="CSV"
                  loading={loadingKey === `${exp.endpoint}-csv`}
                  onClick={() => download(exp.endpoint, "csv")}
                />
                <DownloadBtn
                  label="JSON"
                  loading={loadingKey === `${exp.endpoint}-json`}
                  onClick={() => download(exp.endpoint, "json")}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p variants={itemVariants}
          className="mt-10 text-xs text-slate-400 dark:text-slate-500 text-center color-transition">
          {t("expert.footer")}
        </motion.p>

      </div>
    </motion.div>
  );
}
