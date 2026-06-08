import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { containerVariants, itemVariants } from "../../Utils/Animations.jsx";
import AdminUsers from "../../components/Admin/AdminUsers";
import AdminOpinions from "../../components/Admin/AdminOpinions";
import AdminRatings from "../../components/Admin/AdminRatings";
import AdminStats from "../../components/Admin/AdminStats";
import AdminReports from "../../components/Admin/AdminReports";
import AdminAppeals from "../../components/Admin/AdminAppeals";

const TAB_KEYS = ["stats", "users", "opinions", "ratings", "reports", "appeals"];

const TAB_ANIM = {
  initial: (dir) => ({ opacity: 0, x: dir > 0 ? 24 : -24, filter: "blur(2px)" }),
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit:    (dir) => ({ opacity: 0, x: dir > 0 ? -24 : 24, filter: "blur(2px)" }),
  transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
};

export default function AdminPage() {
  const { t } = useTranslation();
  const [tab,              setTab]              = useState("stats");
  const [prevTab,          setPrevTab]          = useState("stats");
  const [pendingReports,   setPendingReports]   = useState(null);
  const [pendingAppeals,   setPendingAppeals]   = useState(null);

  const handlePendingCount  = useCallback((n) => setPendingReports(n), []);
  const handleAppealsCount  = useCallback((n) => setPendingAppeals(n), []);

  const TABS = [
    { key: "stats",    label: t("admin.tabs.stats") },
    { key: "users",    label: t("admin.tabs.users") },
    { key: "opinions", label: t("admin.tabs.opinions") },
    { key: "ratings",  label: t("admin.tabs.ratings") },
    { key: "reports",  label: t("admin.tabs.reports") },
    { key: "appeals",  label: t("admin.tabs.appeals") },
  ];

  const changeTab = (key) => {
    setPrevTab(tab);
    setTab(key);
  };

  const dir = TAB_KEYS.indexOf(tab) - TAB_KEYS.indexOf(prevTab);

  return (
    <motion.div
      className="w-full min-h-screen py-8 px-4 md:px-8 color-transition"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="max-w-[1800px] mx-auto">

        <motion.header
          variants={itemVariants}
          className="flex justify-between items-end pb-6 mb-8 color-transition"
        >
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 color-transition">
              {t("admin.panelLabel")}
            </p>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition">
              {t("admin.title")}
            </h1>
            <div className="h-1 w-20 bg-red-500 mb-5 mt-2 color-transition" />
            <p className="text-slate-400 font-medium color-transition">
              {t("admin.description")}
            </p>
          </div>
        </motion.header>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap gap-1 p-1 rounded-2xl bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800 w-fit color-transition shadow-sm">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => changeTab(t.key)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest
                  transition-all duration-200 cursor-pointer
                  ${tab === t.key
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  } color-transition`}
              >
                {t.label}
                {t.key === "reports" && pendingReports > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1
                      rounded-full text-[9px] font-black flex items-center justify-center
                      ${tab === t.key ? "bg-white text-red-600" : "bg-red-500 text-white"}`}
                  >
                    {pendingReports > 99 ? "99+" : pendingReports}
                  </motion.span>
                )}
                {t.key === "appeals" && pendingAppeals > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1
                      rounded-full text-[9px] font-black flex items-center justify-center
                      ${tab === t.key ? "bg-white text-amber-600" : "bg-amber-500 text-white"}`}
                  >
                    {pendingAppeals > 99 ? "99+" : pendingAppeals}
                  </motion.span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={tab}
              custom={dir}
              variants={TAB_ANIM}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TAB_ANIM.transition}
            >
              {tab === "stats"    && <AdminStats />}
              {tab === "users"    && <AdminUsers />}
              {tab === "opinions" && <AdminOpinions />}
              {tab === "ratings"  && <AdminRatings />}
              {tab === "reports"  && <AdminReports onPendingCount={handlePendingCount} />}
              {tab === "appeals"  && <AdminAppeals onPendingCount={handleAppealsCount} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.div>
  );
}
