import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function LessonSidebar({ modulesCount, doneCount, allDone }) {
  const { t } = useTranslation();

  const percent = modulesCount
    ? Math.round((doneCount / modulesCount) * 100)
    : 0;

  return (
    <div className="hidden lg:block sticky top-8 space-y-6 h-fit w-full">
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-sm color-transition">
        
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {t("lessonSidebar.progressTitle")}
        </h3>

        <div className="mt-5 h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {t("lessonSidebar.completedModules")}
          </p>
          <p className="text-sm font-black text-slate-900 dark:text-white">
            {doneCount} / {modulesCount}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-4 text-sm font-medium">

          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span>📘 {t("lessonSidebar.allSections")}</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {modulesCount}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span>🧠 {t("lessonSidebar.quiz")}</span>
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                allDone
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400"
              }`}
            >
              {allDone ? t("lessonSidebar.ready") : t("lessonSidebar.locked")}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span>📊 {t("lessonSidebar.percentage")}</span>
            <span className="font-black text-indigo-500 text-base">
              {percent}%
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 p-6 color-transition">
        
        <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-4">
          {t("lessonSidebar.navigation")}
        </h4>

        <div className="space-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">

          <div className="flex items-center justify-between">
            <span>{t("lessonSidebar.closeModule")}</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border text-[10px]">
              ESC
            </kbd>
          </div>

          <div className="flex items-center justify-between">
            <span>{t("lessonSidebar.confirmChanges")}</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border text-[10px]">
              ENTER
            </kbd>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-2 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
            💡 {t("lessonSidebar.hintText")}
          </p>
        </div>
      </div>
    </div>
  );
}