import { motion } from "framer-motion";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { sectionVariants } from "../../Utils/Animations";

export default function ClubsHero({ count }) {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={sectionVariants}
      className="relative w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden color-transition"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-800 to-indigo-600" />

      <div className="absolute -right-10 -bottom-10 opacity-[0.04] dark:opacity-[0.07] pointer-events-none text-indigo-800">
        <UserGroupIcon className="h-72 w-72" />
      </div>

      <div className="relative p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-6 min-w-0">
          <div className="shrink-0 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 text-indigo-800 color-transition">
            <UserGroupIcon className="h-10 w-10" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                Sejm RP
              </span>
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                {t("institution.legislative")}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white color-transition">
              {t("institution.clubs.heading")}
            </h1>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-3xl font-black text-slate-900 dark:text-white color-transition">
            {count}
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition">
            {t("institution.clubs.groupsLabel")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
