import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";
import { useTranslation } from "react-i18next";

export default function MinistryHero({ title, institutionType, IconComponent, colorClass, accentGradient, website }) {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={sectionVariants}
      className="relative w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 shadow-sm overflow-hidden color-transition"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${accentGradient}`} />
      <div className={`absolute -right-10 -bottom-10 pointer-events-none opacity-[0.04] dark:opacity-[0.07] color-transition ${colorClass}`}>
        {IconComponent && <IconComponent className="h-72 w-72" />}
      </div>
      <div className="relative p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-6 min-w-0">
          <div className={`shrink-0 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50
            border-2 border-slate-100 dark:border-slate-700/50 color-transition ${colorClass}`}>
            {IconComponent && <IconComponent className="h-10 w-10" />}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md
                bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                {institutionType}
              </span>
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md
                bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                {t("institution.executive")}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black leading-tight text-slate-900 dark:text-white color-transition">
              {title}
            </h1>
          </div>
        </div>
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
              text-xs font-black uppercase tracking-wide
              bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
              hover:bg-slate-200 dark:hover:bg-slate-700
              border border-slate-200/70 dark:border-slate-700/50
              transition-colors cursor-pointer color-transition"
          >
            {t("institution.officialSite")}
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
