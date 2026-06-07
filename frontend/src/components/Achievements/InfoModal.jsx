import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { reputationSources } from "./AchievementsData";

const InfoModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen || typeof window === "undefined") return null;

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
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Drag handle – mobile only */}
            <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-6 sm:px-8 pt-4 sm:pt-8 pb-4 shrink-0">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-3 color-transition">
                <span className="p-2 rounded-xl text-blue-600 text-lg color-transition">⚡</span>
                {t("achievements.reputationSources.heading")}
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

            {/* Scrollable content */}
            <div className="overflow-y-auto px-6 sm:px-8 pb-2 flex-1">
              <p className="font-medium text-sm text-slate-500 dark:text-slate-400 color-transition mb-4">
                {t("achievements.reputationSources.subtitle")}
              </p>

              <div className="space-y-2.5">
                {reputationSources.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-4 p-4 rounded-2xl
                      bg-blue-50/40 dark:bg-blue-950/10
                      border border-blue-100/40 dark:border-blue-950/30
                      color-transition"
                  >
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-0.5 color-transition">
                        {t(item.titleKey)}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 color-transition">
                        {t(item.descKey)}
                      </p>
                    </div>
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-500/20 px-2.5 py-1 rounded-lg shrink-0 color-transition">
                      {t(item.valKey)}
                    </span>
                  </div>
                ))}
              </div>
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

export default InfoModal;
