import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";
import InfoRow from "./JudicialInfoRow";
import { useTranslation } from "react-i18next";

export default function JudicialInfo({ infoFields, website }) {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={sectionVariants}
      className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-7 md:p-8 color-transition"
    >
      <p className="text-[10px] font-black uppercase tracking-widest mb-4
        text-slate-400 dark:text-slate-500 color-transition">
        {t("institution.information")}
      </p>
      <div className="space-y-3">
        {infoFields.map(([label, value], i) => (
          <InfoRow key={label} label={label} value={value} showDivider={i < infoFields.length - 1} />
        ))}
        {website && (
          <>
            <div className="h-px bg-slate-100 dark:bg-slate-800 color-transition" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 group cursor-pointer"
            >
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">
                {t("institution.website")}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-black
                text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-100
                transition-colors color-transition">
                {new URL(website).hostname.replace("www.", "")}
                <ArrowTopRightOnSquareIcon className="h-3 w-3" />
              </span>
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
}
