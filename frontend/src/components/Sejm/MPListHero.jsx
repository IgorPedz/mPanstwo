import { motion } from "framer-motion";
import { UsersIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";
import { useTranslation } from "react-i18next";

export default function MPListHero({ filteredCount, totalCount, loading }) {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={sectionVariants}
      className="relative w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 shadow-sm overflow-hidden color-transition"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-700 to-indigo-500" />
      <div className="p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5 min-w-0">
          <div className="shrink-0 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50
            border-2 border-slate-100 dark:border-slate-700/50 text-indigo-700 dark:text-indigo-400 color-transition">
            <UsersIcon className="h-8 w-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest
                rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                Sejm RP
              </span>
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest
                rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                {t("institution.mpList.term")}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white color-transition">
              {t("institution.mpList.title")}
            </h1>
          </div>
        </div>
        {!loading && (
          <div className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800
            text-slate-600 dark:text-slate-300 text-xs font-black color-transition">
            {t("institution.mpList.counter", { filtered: filteredCount, total: totalCount })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
