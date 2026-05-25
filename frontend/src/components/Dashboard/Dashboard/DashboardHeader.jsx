import { useEffect } from "react";
import { useUser } from "../../../Contexts/UserContext";
import { useTranslation } from "react-i18next";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeDashboard({
  isLocked,
  setIsLocked,
  hasUnsavedChanges,
  saveLayout,
  setShowAddMenu,
  showAddMenu,
}) {
  const { user } = useUser();
  const { t } = useTranslation();

  const LockIcon = ICON_MAP["lock"];
  const UnlockIcon = ICON_MAP["unlock"];

  useEffect(() => {
    localStorage.setItem("layout-locked", JSON.stringify(isLocked));
  }, [isLocked]);

  const toggleLock = () => {
    setIsLocked((prev) => {
      const next = !prev;
      if (!next && hasUnsavedChanges) {
        saveLayout();
      }
      return next;
    });

    if (showAddMenu) {
      setShowAddMenu(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
      <div className="space-y-0">
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 color-transition">
          {t("dashboard.homePage")}
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none color-transition"
        >
          {t("dashboard.welcome", { name: user?.name })}
        </motion.h1>
      </div>

      <div className="flex items-center gap-3">
        <AnimatePresence>
          {!isLocked && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-[10px] font-bold py-2 px-4 rounded-full bg-indigo-500/10 text-indigo-500 uppercase tracking-widest border border-indigo-500/20"
            >
              {t("dashboard.editMode")}
            </motion.span>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={toggleLock}
          className={`
            group relative inline-flex items-center justify-center
            p-4 rounded-2xl transition-all duration-300
            ${
              isLocked
                ? "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400"
                : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-indigo-500/20"
            }
            cursor-pointer hover:scale-105 active:scale-95
          `}
        >
          <div className="relative z-10">
            {isLocked ? (
              <LockIcon className="h-6 w-6 transition-transform group-hover:rotate-12" />
            ) : (
              <UnlockIcon className="h-6 w-6 transition-transform group-hover:-rotate-12" />
            )}
          </div>

          {!isLocked && (
            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
}
