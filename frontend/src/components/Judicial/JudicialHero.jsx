import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";
import { useTranslation } from "react-i18next";

export default function JudicialHero({
  data,
  IconComponent,
  colorClass,
  accentGradient,
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={sectionVariants}
      className="relative w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${accentGradient}`} />

      <div
        className={`absolute -right-10 -bottom-10 pointer-events-none opacity-[0.04] dark:opacity-[0.07] ${colorClass}`}
      >
        <IconComponent className="h-72 w-72" />
      </div>

      <div className="relative p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div
            className={`p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 ${colorClass}`}
          >
            <IconComponent className="h-10 w-10" />
          </div>

          <div>
            <div className="flex gap-2 mb-2 flex-wrap">
              <span className="badge">{data.type}</span>
              <span className="badge">{t("institution.ministry.authority")} {data.powerType}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black">{data.type}</h1>
          </div>
        </div>

        {data.website && (
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl"
          >
            {t("institution.officialSite")}
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
