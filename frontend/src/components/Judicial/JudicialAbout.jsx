import { motion } from "framer-motion";
import { sectionVariants } from "../../Utils/Animations";
import { useTranslation } from "react-i18next";

export default function JudicialAbout({ description }) {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={sectionVariants}
      className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-7 md:p-8 color-transition"
    >
      <p className="text-[10px] font-black uppercase tracking-widest mb-4
        text-slate-400 dark:text-slate-500 color-transition">
        {t("institution.about")}
      </p>
      <p className="leading-relaxed text-slate-700 dark:text-slate-300 color-transition">
        {description}
      </p>
    </motion.div>
  );
}
