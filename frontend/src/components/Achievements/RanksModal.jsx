import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Icons } from "../../Utils/Dynamic/RankIcons";
import { useRanks } from "../../Hooks/useRanks";

const RanksModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { ranks, loading } = useRanks();
  if (!isOpen || typeof window === "undefined") return null;
  if (loading) return null;

  const normalizeIcon = (icon) =>
    typeof icon === "string" ? icon.toLowerCase() : "";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative w-full sm:max-w-lg bg-white dark:bg-slate-900
              rounded-t-[2rem] sm:rounded-[2.5rem]
              shadow-2xl shadow-slate-950/10 dark:shadow-slate-950/50
              border border-slate-200/60 dark:border-slate-800
              z-10 text-slate-900 dark:text-white overflow-hidden color-transition
              flex flex-col max-h-[85vh] sm:max-h-[80vh]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Drag handle – mobile only */}
            <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-6 sm:px-8 pt-4 sm:pt-8 pb-4 shrink-0">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <span className="p-2 rounded-xl text-amber-500 text-lg">★</span>
                {t("achievements.ranksList")}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 hover:text-red-700 dark:hover:text-red-500 cursor-pointer color-transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable list */}
            <div className="overflow-y-auto px-6 sm:px-8 pb-2 flex-1 space-y-3">
              {ranks.map((r) => {
                const IconComponent =
                  (typeof r.icon === "function" ? r.icon : Icons[normalizeIcon(r.icon)]) ||
                  Icons.rank1 ||
                  Icons.user;

                return (
                  <div
                    key={r.id ?? r.nr ?? r.level}
                    className="flex items-center justify-between p-4 rounded-2xl
                      bg-slate-50 dark:bg-slate-800/50
                      border border-slate-200 dark:border-slate-700
                      transition-all duration-200 color-transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0"
                        style={{ backgroundColor: r.color || "#94a3b8" }}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">
                          {r.nameKey ? t(r.nameKey, { defaultValue: r.slug }) : r.name || r.slug}
                        </p>
                        {r.descriptionKey && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {t(r.descriptionKey, { defaultValue: "" })}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                        {r.xpKey ? t(r.xpKey, { defaultValue: r.xp }) : r.xp || r.required_xp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer button */}
            <div className="px-6 sm:px-8 pt-4 pb-6 sm:pb-8 shrink-0">
              <button
                onClick={onClose}
                className="w-full px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900
                  rounded-2xl font-black text-xs uppercase cursor-pointer
                  hover:scale-[1.02] active:scale-[0.98] transition"
              >
                {t("achievements.understand")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default RanksModal;
