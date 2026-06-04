import { motion } from "framer-motion";
import { sectionVariants } from "../../Utils/Animations";
import { useTranslation } from "react-i18next";

export default function MinistryAbout({ description, institutionType, label: labelProp }) {
  const { t } = useTranslation();
  const label = labelProp ?? (institutionType === "Ministerstwo" ? t("institution.ministry.about") : t("institution.about"));

  return (
    <motion.div
      variants={sectionVariants}
      className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-7 md:p-8 color-transition"
    >
      <p className="text-[10px] font-black uppercase tracking-widest mb-4
        text-slate-400 dark:text-slate-500 color-transition">
        {label}
      </p>
      <p className="leading-relaxed text-slate-700 dark:text-slate-300 color-transition">
        {description}
      </p>
    </motion.div>
  );
}
